// Elements, and sending them to the screen.
//
// What the bar taught us (times measured on the bar, from inside an app):
//  - every draw request costs about 40 ms before it has drawn anything, and then only 5-10 ms per element;
//  - while the bar works through ONE request it shows each element the moment it is drawn, in the order of the
//    request and on top of everything; z-indexes only count once the request is done;
//  - an element that is no longer sent disappears when its timeout runs out, and a screen with nothing on it turns
//    into the bar's own "Loading..."  -> old elements are taken away only after the new ones are in place.

import { APP, call, ctl, errs, report } from "./bar.js";
import { D } from "./tables.js";

export const T = 20, STILL = 120;   // seconds an element lives without being sent again: moving parts, still parts
export const WHITE = "#FFFFFFFF", SOFT = "#FFFFFFB0";

// ---------- widths of text, for layout ----------
export function smallWidth(s) {
  let w = 0;
  for (let i = 0; i < s.length; i++) {
    w += D.small[s[i]] || 4;
  }
  return w + D.smallGap * (s.length - 1);
}

function fontWidth(s, table, other) {
  let w = 0;
  for (let i = 0; i < s.length; i++) {
    w += s[i] === ":" ? 1 : (table[s[i]] || other);
  }
  return w + s.length - 1;
}

export function textWidth(s, font) {
  if (font === "small") return smallWidth(s);
  return fontWidth(s, D.normal, 5);
}

// ---------- elements. Keys that start with "_" are ours and are not sent ----------
export function text(id, s, font, x, y, color, align, z) {
  return { id: id, type: "text", text: s, font: font, x: x, y: y, align: align || "top_left", color: color,
    timeout: T, z_index: z === undefined ? 4 : z };
}

export function bar(id, x, y, w, h, color, z) {
  return { id: id, type: "rectangle", x: x, y: y, width: w, height: h, fill: "solid", fill_colors: [color],
    border_width: 0, timeout: T, z_index: z };
}

function skipOurs(key, value) {
  return key.charCodeAt(0) === 95 ? undefined : value;
}

/** The element as the bar wants it; dx / dy move it (dx = OFF parks it off-screen). */
export function wire(el, dx, dy) {
  if (dx || dy) {
    const moved = Object.assign({}, el);
    moved.x = el.x + (dx || 0);
    moved.y = el.y + (dy || 0);
    return JSON.stringify(moved, skipOurs);
  }
  return JSON.stringify(el, skipOurs);
}

// ---------- drawing ----------
export const live = new Map();      // id -> { s: the element as last sent, t: when, el }

export async function post(parts) {
  const got = await call("POST", "display/draw",
    '{"application_name":"' + APP + '","priority":50,"elements":[' + parts.join(",") + "]}");
  if (!got.ok) {
    errs.draw++;
    report("draw", got.status + " " + got.text.slice(0, 80));
  }
  return got.ok;
}

export async function drop(ids) {
  for (let i = 0; i < ids.length; i++) {
    live.delete(ids[i]);
  }
  if (ids.length === 0) return;
  const got = await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
  if (got.ok || got.status !== 400 || ids.length === 1) return;
  for (let i = 0; i < ids.length; i++) {     // one id that is already gone makes the bar refuse the whole list
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: [ids[i]] }));
  }
}

/** Notes that these elements are now what is on screen (after a change that sent them by itself). */
export function remember(els) {
  const at = Date.now();
  live.clear();
  for (let i = 0; i < els.length; i++) {
    live.set(els[i].id, { s: wire(els[i]), t: at, el: els[i] });
  }
}

// "Staying" (OK was pressed): two small dim bars in the top left corner, above the card.
const MARK = ["zz_h1", "zz_h2"];
let markOn = false, markAt = 0;

export async function mark() {
  if (ctl.held && (!markOn || Date.now() - markAt > 40000)) {
    await post(MARK.map((id, n) => '{"id":"' + id + '","type":"rectangle","x":' + (n * 2) + ',"y":0,"width":1,"height":3,' +
      '"fill":"solid","fill_colors":["#FFFFFF8C"],"border_width":0,"timeout":' + STILL + ',"z_index":2147482000}'));
    markOn = true;
    markAt = Date.now();
  } else if (!ctl.held && markOn) {
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: MARK }));
    markOn = false;
  }
}

/** Puts a page on screen, sending only what changed or is getting old. Unless `partial`, elements of ours that are
 *  not in the list are taken away afterwards (never before: the screen must not go empty). */
export async function show(els, partial) {
  if (ctl.held !== markOn || markOn) await mark();
  const now = Date.now();
  let batch = [];
  const flush = async () => {
    if (batch.length === 0) return;
    const sent = batch;
    batch = [];
    if (await post(sent.map((b) => b.s))) {
      const at = Date.now();
      for (let i = 0; i < sent.length; i++) {
        live.set(sent[i].el.id, { s: sent[i].s, t: at, el: sent[i].el });
      }
    }
  };
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    const s = wire(el);
    const old = live.get(el.id);
    if (old && old.s === s && now - old.t < 400 * el.timeout) continue;
    batch.push({ el: el, s: s });
    if (batch.length === 3) await flush();
  }
  await flush();
  if (partial) return;
  const keep = new Set();
  for (let i = 0; i < els.length; i++) keep.add(els[i].id);
  const stale = [];
  for (const id of live.keys()) {
    if (!keep.has(id)) stale.push(id);
  }
  await drop(stale);
}

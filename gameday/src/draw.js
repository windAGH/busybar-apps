// Elements, and how one picture gives way to the next.
//
// What the bar taught us, and how this file answers it (times measured on the bar, from inside an app):
//  - every draw request costs about 40 ms before it has drawn anything, and then only 5-10 ms per element; a
//    request to delete a dozen elements takes 55 ms. Nothing an app sends one request at a time can move faster
//    than 15-20 steps a second  -> what has to MOVE smoothly is an animation file the bar plays by itself;
//  - while the bar works through ONE request it shows each element the moment it is drawn, in the order of the
//    request and on top of everything; z-indexes only count once the request is done. So a new page cannot be
//    put together unseen underneath the old one (it would flash on top, then vanish again). Instead a new page
//    is ONE request, placed above the old page, with its elements in the order in which they may appear: a
//    black column, the writing that ends in that column, the next column... - the old page is wiped away
//    sideways as the bar works through the request, and only then deleted, hidden underneath (change);
//  - an element that is no longer sent disappears when its timeout runs out, and a screen with nothing on it turns
//    into the bar's own "Loading..."  -> old elements are taken away only after the new ones are in place.

import { APP, call, errs, report, run, sleep } from "./bar.js";
import { D } from "./tables.js";

export const OFF = 300;             // where elements wait off-screen
export const T = 20, STILL = 120;   // seconds an element lives without being sent again: moving parts, still parts
export const WHITE = "#FFFFFFFF", SOFT = "#FFFFFFB0", FAINT = "#FFFFFF66";

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
  if (font === "bold") return fontWidth(s, D.bold, 6);
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

/** w = its width. A picture with a width is a full-height, solid one (a background strip, an end of the score
 *  strip, a title card): it hides whatever is under it, like a piece of backdrop. */
export function image(id, path, x, y, z, w) {
  return { id: id, type: "image", path: path, x: x, y: y, align: "top_left", timeout: STILL, z_index: z, _w: w,
    _solid: w !== undefined };
}

/** The columns an element covers: [first, last]. */
function span(el) {
  let w = el._w;
  if (w === undefined) {
    w = el.type === "text" ? textWidth(el.text, el.font) : el.type === "rectangle" ? el.width
      : el.type === "xpmbitmap" ? Number(el.data.split("\n")[1].split(" ")[0]) : 16;
  }
  if (el.align === "top_right") return [el.x - w + 1, el.x];
  if (el.align === "top_mid") return [el.x - (w >> 1), el.x - (w >> 1) + w - 1];
  return [el.x, el.x + w - 1];
}

// Every page (and every score strip) is solid: where none of its own full-height pictures covers a column of 12,
// it gets a black one. Each new page gets a band of z-indexes ABOVE the one before: it covers the old page column
// by column while the bar draws it, and the old page is deleted afterwards, unseen.
let band = 1000000000;           // pages can go above the one on screen (nextBand) or under it (roll)
const COLS = 6, COL_W = 12;

export function nextBand() {
  band += 20;
  return band;
}

/** Puts a page's elements (z 0-9 among themselves) into band z and fills its uncovered columns with black
 *  (ids p + "bk0".."bk5"; column 0 is always there: it carries the page's band). */
export function lift(els, p, z) {
  for (let i = 0; i < els.length; i++) els[i].z_index += z + 1;
  for (let n = COLS - 1; n >= 0; n--) {
    const a = n * COL_W, b = a + COL_W - 1;
    if (n > 0 && els.some((el) => el._solid && el.x <= a && el.x + el._w - 1 >= b)) continue;
    els.unshift({ id: p + "bk" + n, type: "rectangle", x: a, y: 0, width: COL_W, height: 16, fill: "solid",
      fill_colors: ["#000000FF"], border_width: 0, timeout: STILL, z_index: z, _bk: true, _solid: true, _w: COL_W });
  }
  return els;
}

/** The band of the page that is on screen under prefix p, or a new band. */
export function bandOf(p) {
  const rec = live.get(p + "bk0");
  return rec ? rec.el.z_index : nextBand();
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

async function drop(ids) {
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
function remember(els) {
  const at = Date.now();
  live.clear();
  for (let i = 0; i < els.length; i++) {
    live.set(els[i].id, { s: wire(els[i]), t: at, el: els[i] });
  }
}

/** Puts a page on screen, sending only what changed or is getting old. Unless `partial`, elements of ours that are
 *  not in the list are taken away afterwards (never before: the screen must not go empty). */
export async function show(els, partial) {
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

/** A page's elements in the order in which the bar should draw them for a change that travels `dir` (1 = left to
 *  right, -1 = right to left): column by column, in each column first the solid pieces that BEGIN there (they hide
 *  the old page), then the writing that ENDS there (so it never lies on old content, nor under a later piece). */
function inOrder(els, dir) {
  const out = [];
  const col = (x) => Math.floor(Math.max(0, Math.min(COLS * COL_W - 1, x)) / COL_W);
  for (let k = 0; k < COLS; k++) {
    const n = dir > 0 ? k : COLS - 1 - k;
    for (let i = 0; i < els.length; i++) {
      if (els[i]._solid && col(span(els[i])[dir > 0 ? 0 : 1]) === n) out.push(els[i]);
    }
    for (let i = 0; i < els.length; i++) {
      if (!els[i]._solid && col(span(els[i])[dir > 0 ? 1 : 0]) === n) out.push(els[i]);
    }
  }
  return out;
}

/** The very first page: one request, in order. */
export async function firstShow(els) {
  await post(inOrder(els, 1).map((el) => wire(el)));
  remember(els);
}

// ---------- changing the whole picture: one game to the next ----------
// The new page is one request, above the old page, drawn column by column in the direction `dir` (see the top of
// this file): the old page is wiped away sideways at the pace at which the bar works through the request, about a
// quarter of a second. Then the old page, now hidden, is deleted.
// Writing of the two pages is never on screen at the same place, and nothing is ever black for longer than the
// moment between a column's black and its writing.
export async function change(els, dir) {
  run.busy = true;
  try {
    const olds = [];
    for (const id of live.keys()) olds.push(id);
    await post(inOrder(els, dir || 1).map((el) => wire(el)));
    await drop(olds);
    remember(els);
  } finally {
    run.busy = false;
  }
}

// ---------- up and down: a blind runs over the screen, the next page is there when it has passed ----------
// A page cannot be pushed smoothly: moving its thirty elements takes the bar about half a second a step, and they
// move one after the other. Two things are quick and whole: taking a page away (one frame), and what the bar
// plays by itself. So:
//   1. the next page is made off-screen (a new element is shown above everything while the bar makes it),
//   2. it is moved into place UNDER the page on screen (moving an element that exists keeps to its z-index),
//   3. the blind (animations/roll_<up|dn>_in.anim: black, soft edges, a faint line ahead) runs over the screen,
//   4. the old page is taken away behind it,
//   5. the blind runs on out of the screen (roll_<up|dn>_out.anim).
// dir 1 = upwards, -1 = downwards.
export async function roll(els, dir) {
  run.busy = true;
  try {
    const olds = [], way = dir < 0 ? "roll_dn" : "roll_up";
    for (const id of live.keys()) olds.push(id);
    for (let i = 0; i < els.length; i++) els[i].z_index -= 40;   // lifted one band above; it belongs one band under
    band -= 40;
    await post(inOrder(els, 1).map((el) => wire(el, OFF, 0)));
    await post(els.map((el) => wire(el)));
    const t0 = Date.now();
    await post([cardAnim("zz_c1", way + "_in", 0)]);
    await sleep(D.roll - 30 - (Date.now() - t0));     // the request below needs about that long to take effect
    await drop(olds);
    remember(els);
    await post([cardAnim("zz_c2", way + "_out", 0), cardAnim("zz_c1", way + "_in", OFF)]);
    await sleep(D.roll + 50);
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
  } finally {
    run.busy = false;
  }
}

/** A card that answers a control with nothing to do ("NO GAMES ON / RIGHT NOW"): down like the title cards,
 *  a moment, up again. The page under it is not touched. */
export async function notice(name, ms) {
  run.busy = true;
  try {
    await post([cardAnim("zz_c1", "card_" + name + "_down", 0)]);
    await sleep(D.card + (ms || 1200));
    await post([cardAnim("zz_c2", "card_" + name + "_up", 0), cardAnim("zz_c1", "card_" + name + "_down", OFF)]);
    await sleep(D.card + 60);
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
  } finally {
    run.busy = false;
  }
}

export function cardAnim(id, name, x) {
  return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":' + x + ',"y":0,"align":"top_left",' +
    '"loop":false,"section":"default","timeout":20,"z_index":' + (id === "zz_c1" ? 2147481000 : 2147481001) + "}";
}

/** A change behind a title card: the card comes down like a roller shutter, the next page is made just below
 *  the screen and put in place while the card covers everything, and the card rolls up again. */
export async function shutter(kind, els) {
  run.busy = true;
  try {
    const olds = [], t0 = Date.now();
    for (const rec of live.values()) olds.push(rec.el);
    await post([cardAnim("zz_c1", "card_" + kind + "_down", 0)]);
    await post(inOrder(els, 1).map((el) => wire(el, 0, 32)));
    await sleep(D.card + 1000 - (Date.now() - t0));
    await post(olds.map((el) => wire(el, 0, -32)).concat(els.map((el) => wire(el))));
    await drop(olds.map((el) => el.id));
    remember(els);
    await post([cardAnim("zz_c2", "card_" + kind + "_up", 0), cardAnim("zz_c1", "card_" + kind + "_down", OFF)]);
    await sleep(D.card + 60);
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
  } finally {
    run.busy = false;
  }
}

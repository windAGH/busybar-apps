// A ticker as a card: its elements, and how one card replaces another.

import { labelOf, normalWidth, pctOf, priceParts } from "./format.js";
import { boxOf, X0 } from "./box.js";
import { cfg, kindOf, rising, SPANS, staleOf, ui } from "./quotes.js";
import { bar, drop, live, mark, post, remember, smallWidth, SOFT, STILL, text, WHITE, wire } from "./draw.js";
import { ctl, run } from "./bar.js";
import { D } from "./tables.js";

function still(el) {
  el.timeout = STILL;
  return el;
}

/** A 3 x 2 triangle; `nod` = 1 moves it one pixel the way it points. */
export function arrow(els, pp, x, up, colour, nod) {
  const y = 3 + (up ? -nod : nod);
  els.push(bar(pp + "u0", x + (up ? 1 : 0), y, up ? 1 : 3, 1, colour, z + 5),
    bar(pp + "u1", x + (up ? 0 : 1), y + 1, up ? 3 : 1, 1, colour, z + 5));
}

/** What stands at the top right of the box: the change in percent - or the name of the span, for a second after
 *  Start chose it and for as long as its numbers are not there yet. */
function topRight(q, now) {
  if (!q.has) return "";                         // (the empty box says why instead)
  if (ui.span !== 0 && !q.views[ui.span].has) return SPANS[ui.span].name;
  const pct = pctOf(q, ui.span);
  return pct && now < ui.nameUntil ? SPANS[ui.span].name : pct;
}

/** Where the arrow goes for this symbol, or null when it has none (market closed, or the span's name is up).
 *  `still`: numbers that are not fresh - the arrow is faint and does not nod. */
export function arrowAt(q, now) {
  const pct = pctOf(q, ui.span);
  if (!q.open || !pct || topRight(q, now) !== pct) return null;
  const st = D.style[kindOf(q, ui.span)], stale = staleOf(q);
  return { x: 69 - smallWidth(pct) - 6, up: rising(q, ui.span), colour: stale ? st.faintLine : st.line, still: stale };
}

/** The colour of the ticker's name: the colour of its change over the span on screen - green for a rise, red for a
 *  fall, or the other way round (setting "Colours") - bright while it trades, quieter when the market is closed or
 *  the numbers are old. Grey while there is no change to go by. */
function nameColour(q, stale) {
  if (!q.has || !q.views[ui.span].has || !pctOf(q, ui.span)) return SOFT;
  const st = D.style[rising(q, ui.span) !== cfg.redUp ? "up" : "down"];
  return q.open && !stale ? st.name : st.nameDim;
}

/** Everything for one ticker, in the order it is to appear (see "the card on screen" below): a black cover for the
 *  left side, the two halves of the box, then the writing. `pp` starts the ids ("a" or "b": the card on screen and
 *  the one that replaces it); the card lies in the band of z-indexes that starts at `z`. */
export function cardEls(q, pp, nod, now) {
  const kind = kindOf(q, ui.span), stale = staleOf(q), box = boxOf(q, ui.span, kind, stale), halves = D.plate[kind];
  const els = [still(bar(pp + "k", 0, 0, X0, 16, "#000000FF", z))];
  els[0]._plate = "L";                           // what lies on it: the name and the price
  let x = X0;
  for (let n = 0; n < box.length; n++) {
    els.push({ id: pp + "g" + n, type: "xpmbitmap", x: x, y: 0, align: "top_left", timeout: STILL, data: box[n],
      z_index: z + 1, _plate: "R" });            // what lies on it: the percentage and the arrow
    x += halves[n].w;
  }
  const left = els.length;
  // While OK holds the ticker, the two bars of mark() stand in columns 0 and 2: the name moves right, clear of them.
  els.push(still(text(pp + "s", labelOf(q.sym, ctl.held ? 27 : 31), "small", ctl.held ? 6 : 2, 0, nameColour(q, stale), "top_left", z + 5)));
  const parts = q.has ? priceParts(q.price, q.hint) : ["--", ""];
  els.push(still(text(pp + "p", parts[0], "normal", 2, 6, WHITE, "top_left", z + 5)));
  if (parts[1]) {
    const w = normalWidth(parts[0]);
    els.push(still(bar(pp + "d", 2 + w + 1, 14, 1, 1, WHITE, z + 5)),
      still(text(pp + "q", parts[1], "normal", 2 + w + 3, 6, WHITE, "top_left", z + 5)));
  }
  const top = topRight(q, now);
  const right = els.length;
  if (!q.has && q.views[0].fails) {              // nothing to show and the sources were asked: say why, quietly, in
    const lost = q.views[0].unknown;             // the empty box - what happened and what to do
    els.push(still(text(pp + "e", lost ? "not found" : "no data", "small", X0 + 3, 0, D.style.shut.ink, "top_left", z + 5)),
      still(text(pp + "f", lost ? "see Setup" : "retrying", "small", X0 + 3, 7, D.style.shut.faintInk, "top_left", z + 5)));
  }
  if (top) {
    els.push(still(text(pp + "c", top, "small", 69 - smallWidth(top), 0, stale ? D.style[kind].faintInk : D.style[kind].ink,
      "top_left", z + 5)));
  }
  const ar = arrowAt(q, now);
  if (ar) arrow(els, pp, ar.x, ar.up, ar.colour, nod);
  for (let i = left; i < els.length; i++) els[i]._on = i < right ? "L" : "R";
  return els;
}

/** What a card is as a whole: which box, of which span. When this changes the card is exchanged in one step, not
 *  piece by piece. */
export function lookOf(q) {
  return (q.has ? kindOf(q, ui.span) : "none" + q.views[0].fails) + ui.span + (q.views[ui.span].has ? "+" : "-") + (staleOf(q) ? "!" : "");
}

/** What a card says besides: when only this changes, the elements that differ are sent. */
export function stampOf(q, now) {
  return q.ver + (cfg.redUp ? "r" : "g") + (ctl.held ? "h" : "") + topRight(q, now);
}

// ---------- the card on screen ----------
// How one card replaces another was settled by watching the real bar (recordings of its screen, 25 Nov 2026):
//  - while the bar works through a draw request, each element of it comes on screen as soon as it is drawn, in the
//    order it stands in the request and on top of everything already there; the z-indexes only take effect once
//    the whole request is done;
//  - a request to delete several elements takes them away one after another, visibly.
// So a card that is put together underneath the old one shows for a
// moment half of the NEW card on top, then the old card again, then the new one - and deleting the old card shows
// it falling apart. Here the new card is one request that lies ABOVE the old card, each card in a higher band of
// z-indexes than the one before, with its elements in an order in which every moment in between is in order:
//    a black cover takes the old name and price away  ->  the two halves of the box replace the old box (and the
//    old percentage with it)  ->  the new name, the price, the percentage, the arrow.
// Writing of two tickers is never on screen together, the screen is never empty, and nothing comes back. The old
// card is deleted afterwards, where nobody sees it: underneath. The same step is used when a ticker's own look
// changes (its first numbers arrive, another span is chosen, the market opens or closes, the price crosses the
// close before). New numbers alone are sent as they are: only the elements that changed.
export let flip = 1, z = 100;       // which id prefix and which band of z-indexes the card on screen has

export async function put(q) {
  run.busy = true;
  try {
    const olds = [];
    for (const rec of live.values()) olds.push(rec.el.id);
    flip = 1 - flip;
    z += 20;
    const t0 = Date.now();
    const els = cardEls(q, "ab"[flip], 0, t0);
    const order = olds.length ? els : els.slice(1, 3).concat(els[0], els.slice(3));      // the very first card: the
    await post(order.map((el) => wire(el)));     // box before the cover, or the screen would be black for a moment
    await drop(olds);
    remember(els);
  } finally {
    run.busy = false;
  }
}

/** Brings the card on screen up to date: what changed, and what is getting old, in ONE request (the bar spends 40 ms
 *  on a request before it draws anything, and a few on each element). Because the bar draws every element of a
 *  request on top of everything until the request is done, a cover or a half of the box that is sent again would
 *  hide the writing on it for that long - so whatever lies on it is sent again right after it, in the same request.
 *  Elements the card no longer has (the arrow, when the market has closed) are deleted afterwards. */
export async function refresh(els) {
  await mark();                                  // the two bars for "staying", put up or taken away
  const now = Date.now(), wires = [], again = {};
  for (let i = 0; i < els.length; i++) {
    const old = live.get(els[i].id);
    wires.push(wire(els[i]));
    els[i]._send = !old || old.s !== wires[i] || now - old.t >= 400 * els[i].timeout;
    if (els[i]._send && els[i]._plate) again[els[i]._plate] = true;
  }
  const parts = [], sent = [];
  for (let i = 0; i < els.length; i++) {
    if (els[i]._send || (els[i]._on && again[els[i]._on])) {
      parts.push(wires[i]);
      sent.push(i);
    }
  }
  if (parts.length && (await post(parts))) {
    const at = Date.now();
    for (let k = 0; k < sent.length; k++) live.set(els[sent[k]].id, { s: wires[sent[k]], t: at, el: els[sent[k]] });
  }
  const stale = [];
  for (const id of live.keys()) {
    if (!els.some((el) => el.id === id)) stale.push(id);
  }
  await drop(stale);
}

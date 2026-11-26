// One ticker's stay on screen, and what the controls do:
//   wheel    the next / the previous ticker, at once
//   OK       stay on this ticker / go on taking turns; while it stays, two small bars stand in the top left
//            corner and the ticker moves 4 columns right to clear them
//   Start    what the box covers: today -> 5 days -> 1 month -> today. Its name (1D, 5D, 1M) stands where the
//            percentage is for a second; the percentage, the line and the colour are then for that span.
//            An app cannot write its settings, so every start of the app begins with today.
//   Back     ends the app

import { arrow, arrowAt, cardEls, flip, lookOf, put, refresh, stampOf } from "./card.js";
import { cfg, SPANS, ui } from "./quotes.js";
import { show } from "./draw.js";
import { ctl, nap, run } from "./bar.js";

const BEAT = 1100, NOD = 280;       // the arrow: out for NOD ms once every BEAT ms, at rest otherwise

const NAME_MS = 1000;               // how long the name of the span stands in the percentage's place after Start

/** Takes the presses the handler noted. OK: this ticker stays / the tickers take turns again (mark() draws
 *  and removes the two bars for ctl.held). Start: the next span, its name up for a moment. The wheel (ctl.turn) is
 *  followed by main(). */
function takeKeys() {
  if (ctl.ok) {
    ctl.ok = false;
    ctl.held = !ctl.held;
  }
  if (ctl.start) {
    ctl.start = false;
    ui.span = (ui.span + 1) % SPANS.length;
    ui.nameUntil = Date.now() + NAME_MS;
  }
}

/** Keeps one ticker on screen: for its time, or until the wheel is turned, or for good while OK holds it. New
 *  numbers are shown as they arrive, and the arrow nods. */
export async function dwell(q, sym) {
  const t0 = Date.now();
  let until = t0 + cfg.pace, wasHeld = ctl.held;
  let drawn = "", look = lookOf(q), full = t0, out = 0;    // drawn = "": the first step draws (and so shows or
  while (!run.stopped) {                                   // takes away the bars of "staying")
    takeKeys();
    const now = Date.now();
    if (wasHeld && !ctl.held) until = now + cfg.pace;      // let go: it stays its full time once more
    wasHeld = ctl.held;
    if (ctl.turn !== 0 || ui.symbols.indexOf(sym) === -1 || (!ctl.held && now >= until)) return;
    ui.swapAt = ctl.held || ui.symbols.length < 2 ? Infinity : until;
    const pp = "ab"[flip];
    const ar = arrowAt(q, now);
    const nod = ar && !ar.still && (now - t0) % BEAT >= BEAT - NOD ? 1 : 0;
    if (lookOf(q) !== look) {                              // another box altogether: exchanged in one step
      look = lookOf(q);
      drawn = "";
      out = 0;
      await put(q);
    } else if (stampOf(q, now) !== drawn || now - full >= 5000) {      // new numbers, "staying" on or off, the
      drawn = stampOf(q, now);                                        // span's name going - or time to keep the
      full = now;                                                     // elements alive
      out = nod;
      await refresh(cardEls(q, pp, nod, now));
    } else if (ar && nod !== out) {                        // only the arrow moves: two small rectangles
      out = nod;
      const els = [];
      arrow(els, pp, ar.x, ar.up, ar.colour, nod);
      await show(els, true);
    }
    if (ctl.turn !== 0 || ctl.start || ctl.ok) continue;   // pressed while we were drawing
    const after = Date.now();
    const beat = (after - t0) % BEAT;
    let wait = Math.min(200, ar && !ar.still ? (beat < BEAT - NOD ? BEAT - NOD - beat : BEAT - beat) : 200);
    if (!ctl.held) wait = Math.min(wait, until - after);
    if (after < ui.nameUntil) wait = Math.min(wait, ui.nameUntil - after + 5);
    await nap(Math.max(10, wait));
  }
}

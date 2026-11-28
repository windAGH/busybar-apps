// Stocks: one ticker at a time on the BUSY Bar - the ticker and its price on the left, and on the right a box in
// the day's colour with the change in percent, a small arrow that nods the way the price is going, and the day's
// line. Quotes come straight from Yahoo Finance's public chart endpoint over the bar's Wi-Fi (no account, no key),
// with CNBC's and Tencent's public quotes as fallbacks.
//
//   main.js    this file: the settings, and the start
//   ticker.js  one ticker's stay on screen, and what the controls do
//   card.js    a ticker as a card: its elements, and how one card replaces another
//   format.js  numbers and names as text
//   box.js     the box on the right: its bitmaps, with the line of the span drawn in
//   quotes.js  what is known about each symbol, and where it is asked for
//   draw.js    elements, and sending them to the screen
//   net.js     the loop that asks the internet
//   bar.js     the bar itself: its API, its controls, this app's settings
//   tables.js  generated data: the box's plates and colours, widths of letters
//
// Looks:  trading and at or above the close before the span - the "up" box, arrow up;  trading and below it - the
// "down" box, arrow down;  not trading now - the slate box, no arrow;  never any data for a symbol - the ticker
// and "--", and in the empty box "not found / see Setup" (no source knows the symbol) or "no data / retrying"
// (no source answered).  When no source answers, nothing changes on screen: the last numbers and colours stay.
// Only when a market is open and its numbers are older than 15 minutes, the percentage, the arrow and the line go
// faint (the price stays white) and the arrow stops nodding: "not fresh".

import { dwell } from "./ticker.js";
import { put } from "./card.js";
import { parseSymbols } from "./format.js";
import { cfg, quoteOf, quotes, quotesFeed, ui } from "./quotes.js";
import { splash, splashEnd, splashOff } from "./draw.js";
import { dataLoop, feeds } from "./net.js";
import { ctl, loadSettings, report, run, sleep, wake, watchControls } from "./bar.js";
import { D } from "./tables.js";

/** Setup (Apps > Stocks > Setup), read at the start and again every 10 seconds:
 *    symbols  "Stocks"          - ticker symbols separated by commas (at most 8)
 *    pace     "Time per stock"  - short 4 s | normal 6 s | long 10 s
 *    colors   "Colours"         - green_up (a rise is green) | red_up (a rise is red, the East Asian way)
 *  A value the bar does not give (a read that failed, an older settings file) leaves what we have. */
async function readSettings() {
  const v = await loadSettings();
  let list = typeof v.symbols === "string" ? parseSymbols(v.symbols) : ui.symbols;
  if (list.length === 0) list = parseSymbols(D.symbols);
  if (list.join(",") !== ui.symbols.join(",")) {
    ui.symbols = list;
    const gone = [];
    for (const sym of quotes.keys()) {
      if (list.indexOf(sym) === -1) gone.push(sym);
    }
    for (let i = 0; i < gone.length; i++) quotes.delete(gone[i]);
    if (wake) wake();
  }
  if (v.pace === "short") cfg.pace = 4000;
  else if (v.pace === "normal") cfg.pace = 6000;
  else if (v.pace === "long") cfg.pace = 10000;
  if (v.colors === "green_up") cfg.redUp = false;
  else if (v.colors === "red_up") cfg.redUp = true;
}

let settingsDue = 0;
async function settingsFeed(now) {
  if (now >= settingsDue) {
    settingsDue = now + 10000;
    await readSettings();
  }
  return false;
}

/** The start. The tickers take turns for good; a step that fails is reported and the round goes on. */
async function main() {
  watchControls();
  feeds.push(settingsFeed, quotesFeed);
  await splash(1);                               // the author's mark: while it plays the settings are read and the
  await readSettings();                          // first quotes asked for
  settingsDue = Date.now() + 10000;
  dataLoop();
  await splashEnd();
  let i = 0, shown = null;
  while (!run.stopped) {
    try {
      const n = ui.symbols.length;
      if (shown !== null) {                      // the next one: by the wheel, or the one after
        const at = ui.symbols.indexOf(shown);
        const step = ctl.turn !== 0 ? ctl.turn : 1;
        ctl.turn = 0;
        i = at === -1 ? Math.min(i, n - 1) : (((at + step) % n) + n) % n;
      }
      const sym = ui.symbols[i];
      const q = quoteOf(sym);
      ui.onScreen = sym;
      if (shown !== sym) await put(q);
      shown = sym;
      await splashOff();                         // (the first card lies over the film's last, black picture: it goes unseen)
      await dwell(q, sym);
    } catch (err) {
      report("stocks", err);
      await sleep(500);
    }
  }
}

main();

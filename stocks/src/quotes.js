// What is known about each symbol, and where it is asked for.

import { boxOf, COLS, rowsOf } from "./box.js";
import { run, sleep, wake } from "./bar.js";

// Where the numbers come from, in this order. The first two are the same Yahoo Finance service on two addresses
// and give everything (price, the close before, the line, the market's hours). The third, CNBC's public quote,
// gives the price and today's change only: the line stays the last one we had (none if there never was one), and
// the longer spans cannot come from it. The source that answered last is asked first for the next 10 minutes.
const SOURCES = [
  { name: "yahoo-1", chart: "https://query1.finance.yahoo.com/v8/finance/chart/" },
  { name: "yahoo-2", chart: "https://query2.finance.yahoo.com/v8/finance/chart/" },
  { name: "cnbc", quote: "https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol" +
    "?requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&symbols=" },
];

const STALE_MS = 900000;            // numbers this old while the market is open are shown as "not fresh"

const OPEN_MS = 60000, SHUT_MS = 600000;      // how often a symbol is asked for: market open / closed

// What the box can cover. Today's numbers are the live ones: asked for all the time (OPEN_MS / SHUT_MS), they also
// carry the price and whether the market is open. The longer spans are asked for when they are first shown, kept,
// and asked for again only after `fresh` while they are the span on screen. A market that never closes gets wider
// bars (`all`), or a day would be 288 bars and 5 days 240: answers of 17-30 KB where 3-9 KB do.
export const SPANS = [
  { name: "1D", ask: "interval=5m&range=1d", all: "interval=15m&range=1d", fresh: 0 },
  { name: "5D", ask: "interval=30m&range=5d", all: "interval=60m&range=5d", fresh: 1800000 },
  { name: "1M", ask: "interval=1d&range=1mo", all: "interval=1d&range=1mo", fresh: 21600000 },
];

export const cfg = { pace: 6000, redUp: false };  // from Setup: ms a ticker stays; a rise is red

// What is on screen now: the data is asked for in the order the screen needs it.
export const ui = {
  symbols: [],                      // what to show, in order
  span: 0,                          // which of SPANS the box shows
  nameUntil: 0,                     // until then the span's name stands in the percentage's place
  onScreen: "",                     // the symbol on screen
  swapAt: Infinity,                 // when the ticker on screen gives way to the next
};

export const quotes = new Map();    // symbol -> what we know about it

export function quoteOf(sym) {
  let q = quotes.get(sym);
  if (!q) {
    q = { sym: sym, has: false, open: false, price: 0, hint: 2, start: 0, allDay: /[-=]/.test(sym), ver: 0, fresh: 0,
      ext: "", split: 0, edge: 0, views: [] };
    for (let i = 0; i < SPANS.length; i++) {     // per span: the close before it, the line, when asked, the box
      q.views.push({ has: false, prev: 0, rows: null, at: 0, hold: 0, fails: 0, box: null, boxKind: "" });
    }
    quotes.set(sym, q);
  }
  return q;
}

function refused(what, status, unknown) {
  const err = new Error(what);
  err.status = status;
  err.unknown = !!unknown;           // the source answered: it has no such symbol
  return err;
}

async function bodyOf(url, who) {
  const res = await fetch(url);
  while (run.busy && !run.stopped) await sleep(20);  // a change of card is running: the answer waits until it is done
  const body = await res.text();
  if (!res.ok) throw refused(who + " HTTP " + res.status, res.status, res.status === 404);
  return body;
}

/** Yahoo's chart for one symbol and one span: price, the close before the span, the closes, the market's hours. */
async function askChart(base, who, q, k) {
  // today's line of a market with hours is asked for with the sessions before the opening and after the close
  const body = await bodyOf(base + encodeURIComponent(q.sym) + "?" + (q.allDay ? SPANS[k].all : SPANS[k].ask) +
    (k === 0 && !q.allDay ? "&includePrePost=true" : ""), who);
  const r = JSON.parse(body).chart.result[0];
  const m = r.meta;
  const price = Number(m.regularMarketPrice);
  if (!(price > 0)) throw refused(who + " no price", 200, false);
  const raw = (r.indicators && r.indicators.quote && r.indicators.quote[0] && r.indicators.quote[0].close) || [];
  const stamps = r.timestamp || [];
  const tp = m.currentTradingPeriod || {}, per = tp.regular || {};
  const start = Number(per.start) || 0, end = Number(per.end) || 0, traded = Number(m.regularMarketTime) || 0;
  const pre0 = Number(tp.pre && tp.pre.start) || start, post1 = Number(tp.post && tp.post.end) || end;
  const now = Date.now() / 1000;
  const allDay = end - start >= 23 * 3600;
  // The sessions (a market with hours, today's line): before the opening "pre", after the close "post". The line
  // of "pre" is that session alone; the line of "post" is the day's regular session and, from column `split` on,
  // what has traded since the close. At any other time the line is the regular session's, as it always was.
  let ext = "", n0 = 0;
  const day = [], late = [], early = [];
  for (let i = 0; i < raw.length; i++) {
    if (typeof raw[i] !== "number") continue;
    const t = Number(stamps[i]) || 0;
    if (k !== 0 || allDay || !stamps.length || (t >= start && t < end)) day.push(raw[i]);
    else if (t < start) early.push(raw[i]);
    else late.push(raw[i]);
  }
  let closes = day, last = price, before = Number(m.chartPreviousClose || m.previousClose);
  if (k === 0 && !allDay && now >= pre0 && now < start && early.length) {
    ext = "pre";
    closes = early;
  } else if (k === 0 && !allDay && now >= end && now < post1 && late.length && traded >= start - 60) {
    ext = "post";
    closes = day.concat(late);
    n0 = day.length;
  }
  if (ext) {                                     // the change of an extended session: against the last regular price
    before = price;
    last = closes[closes.length - 1];
  }
  // Open: inside today's regular hours and something has traded in them (on a holiday nothing has). A market that
  // runs round the clock is open while its last trade is recent.
  let edge = 0;                                  // the next moment the market's state changes
  const edges = [pre0, start, end, post1];
  for (let i = 0; i < edges.length; i++) if (edges[i] > now && (!edge || edges[i] < edge)) edge = edges[i];
  return { price: last, prev: before, closes: closes, start: start, ext: ext,
    split: ext && closes.length > 1 ? Math.round(n0 * (COLS - 1) / (closes.length - 1)) : 0,
    edge: allDay ? 0 : edge,
    allDay: allDay, hint: typeof m.priceHint === "number" ? Math.floor(m.priceHint) : 2,
    open: allDay ? now - traded < 1800 : now >= start && now < end && traded >= start - 60 };
}

/** The symbol as CNBC writes it: BTC-USD -> BTC.CM=, BRK-B -> BRK.B, ^GSPC -> .SPX, EURUSD=X -> EUR=. */
function cnbcSymbol(sym) {
  const index = { "^GSPC": ".SPX", "^DJI": ".DJI", "^IXIC": ".IXIC", "^VIX": ".VIX", "^RUT": ".RUT" };
  if (index[sym]) return index[sym];
  let m = /^([A-Z0-9]+)-USD$/.exec(sym);
  if (m) return m[1] + ".CM=";
  m = /^([A-Z]{3})USD=X$/.exec(sym) || /^USD([A-Z]{3})=X$/.exec(sym) || /^([A-Z]{3})=X$/.exec(sym);
  if (m) return m[1] + "=";
  return sym.replace(/-([A-Z])$/, ".$1");
}

/** CNBC's quote: the price, the close of the day before, and whether the regular market is on. No line. */
async function askQuote(base, who, q) {
  const body = await bodyOf(base + encodeURIComponent(cnbcSymbol(q.sym)), who);
  const list = JSON.parse(body).FormattedQuoteResult.FormattedQuote;
  const r = list && list[0];
  if (!r || r.code !== 0 || !r.last) throw refused(who + " does not know " + q.sym, 200, true);
  const num = (v) => Number(String(v).replace(/[,+%]/g, ""));
  const price = num(r.last);
  if (!(price > 0)) throw refused(who + " no price", 200, false);
  let prev = num(r.previous_day_closing);
  if (!(prev > 0)) prev = price - num(r.change);
  const dot = String(r.last).indexOf(".");
  return { price: price, prev: prev, closes: null, start: q.start, allDay: q.allDay,
    hint: dot === -1 ? 0 : Math.min(4, String(r.last).length - dot - 1), open: r.curmktstatus === "REG_MKT" };
}

let best = 0, bestUntil = 0;        // the source that answered last, and until when it is asked first

/** Reads one symbol for one span, from the first source that answers. Throws when none does (the caller keeps what
 *  it had); the error says `unknown` when the sources answered and none has such a symbol. */
async function loadQuote(q, k) {
  const t0 = Date.now();
  if (t0 >= bestUntil) best = 0;                 // every 10 minutes from the top again
  let got = null, from = 0, why = "", unknown = 0, down = 0;
  for (let n = 0; n < SOURCES.length && !got; n++) {
    const i = (best + n) % SOURCES.length, src = SOURCES[i];
    if (k !== 0 && !src.chart) continue;         // the longer spans need the closes
    try {
      got = src.chart ? await askChart(src.chart, src.name, q, k) : await askQuote(src.quote, src.name, q);
      from = i;
    } catch (err) {
      if (err && err.unknown) unknown++;
      else down++;
      why += (why ? "; " : "") + (err && err.status !== undefined ? err.message : src.name + " " + (err && err.message ? err.message : String(err)));
    }
  }
  if (!got) {
    const err = new Error(q.sym + ": " + why);
    err.unknown = unknown > 0 && down === 0;
    throw err;
  }
  if (from !== best || (from !== 0 && !bestUntil)) {
    best = from;
    bestUntil = from === 0 ? 0 : Date.now() + 600000;
  }
  const price = got.price, prev = got.prev, closes = got.closes;
  const view = q.views[k];
  if (closes) {                                  // (a source without closes leaves the line we had)
    const rows = rowsOf(closes);
    if (!view.rows || !rows || view.rows.join("") !== rows.join("")) view.boxKind = "";   // its box is built anew
    view.rows = rows;
  }
  view.prev = prev > 0 ? prev : 0;
  view.has = true;
  view.at = Date.now();
  // in an extended session only today's answer knows the price that is trading now: the longer spans carry the
  // regular session's, and leave the price as it is
  const kept = k !== 0 && q.has && q.ext ? q.price : 0;
  q.price = price;                               // every answer carries the price and the hours
  if (kept) q.price = kept;
  q.hint = got.hint;
  q.open = got.open;
  if (k === 0) {                                 // (only today's answer knows the session)
    if (q.ext !== (got.ext || "") || q.split !== (got.split || 0)) view.boxKind = "";
    q.ext = got.ext || "";
    q.split = got.split || 0;
    q.edge = got.edge || 0;
  }
  q.start = got.start;
  q.allDay = got.allDay;
  q.has = true;
  q.fresh = view.at;                             // when the price was last confirmed
  boxOf(q, k, kindOf(q, k), staleOf(q));         // built now, not when its turn on screen comes
  q.ver++;
  if (wake) wake();                              // the card on screen takes the new numbers at once
}

/** Numbers that can no longer be trusted to be current: the market is open (as far as we know) and the price was
 *  last confirmed more than 15 minutes ago. */
export function staleOf(q) {
  return q.has && (q.open || !!q.ext) && Date.now() - q.fresh > STALE_MS;
}

// ---------- one ticker on screen ----------
export function rising(q, k) {
  return q.price >= q.views[k].prev;
}

export function kindOf(q, k) {
  if (q.has && q.ext && k === 0 && q.views[0].has) return rising(q, 0) !== cfg.redUp ? "extu" : "extd";
  if (!q.has || !q.open || !q.views[k].has) return "shut";
  return rising(q, k) !== cfg.redUp ? "up" : "down";
}

/** When a symbol's live numbers are next asked for: once a minute while it trades, every ten minutes when it does
 *  not - and once just after its market opens, so the colours come on with the opening and not ten minutes late. */
function dueOf(q) {
  const live = q.views[0];
  if (live.hold) return live.hold;
  if (!live.at) return 0;
  let due = live.at + (q.open || q.ext ? OPEN_MS : SHUT_MS);
  // and once just after the market's state changes (the sessions begin and end, the opening, the close), so the
  // colours change with it and not ten minutes late
  const turn = Math.max(q.edge * 1000 + 20000, live.at + OPEN_MS);
  if (q.edge && q.edge * 1000 > live.at && turn < due) due = turn;
  return due;
}

/** Whether the span on screen is wanted for this symbol now: never read, or read longer ago than it stays fresh. */
function spanDue(q, now) {
  const view = q.views[ui.span];
  if (ui.span === 0 || now < view.hold) return false;
  return !view.has || now - view.at >= SPANS[ui.span].fresh;
}

let netHold = 0;                    // after a failure nothing is asked for a while

export async function quotesFeed(now) {
  if (now < netHold) return false;
  // First what the card on screen is waiting for (its span has just been chosen), then the live numbers, most
  // overdue first, then the chosen span for the tickers that will come.
  let pick = null, k = 0, first = Infinity;
  const here = quotes.get(ui.onScreen);
  if (here && spanDue(here, now) && !here.views[ui.span].has) {
    pick = here;
    k = ui.span;
  }
  for (let i = 0; i < ui.symbols.length && k === 0; i++) {
    const q = quoteOf(ui.symbols[i]);
    const due = dueOf(q);
    if (due <= now && due < first) {
      first = due;
      pick = q;
    }
  }
  const from = ui.symbols.indexOf(ui.onScreen) + 1;  // in the order they will come on screen
  for (let i = 0; i < ui.symbols.length && !pick; i++) {
    const q = quoteOf(ui.symbols[(from + i) % ui.symbols.length]);
    if (spanDue(q, now)) {
      pick = q;
      k = ui.span;
    }
  }
  if (!pick) return false;
  // A request keeps the bar's processor busy for a second or two (TLS). Fresh numbers for something that already
  // has some are asked for early in a ticker's stay, so that this is over before the change to the next one.
  if (pick.views[k].has && ui.swapAt - now < Math.min(3000, cfg.pace / 2)) return false;
  const view = pick.views[k];
  try {
    await loadQuote(pick, k);
    view.hold = 0;
    view.fails = 0;
  } catch (err) {                                // no source answered: again in 30 s, 1 minute, then every 2 minutes
    view.fails++;                                // (a symbol no source knows: every 10 minutes); everything waits 10 s
    view.unknown = !!(err && err.unknown);
    pick.ver++;                                  // (a symbol without numbers now says why: see cardEls)
    view.hold = Date.now() + (err && err.unknown ? SHUT_MS : Math.min(120000, 30000 * Math.pow(2, view.fails - 1)));
    netHold = Date.now() + 10000;
    throw err;
  }
  return true;
}

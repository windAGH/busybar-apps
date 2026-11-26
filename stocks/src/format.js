// Numbers and names as text.

import { smallWidth, textWidth } from "./draw.js";

// ---------- settings ----------
export function parseSymbols(s) {
  const out = [];
  const parts = String(s).toUpperCase().split(/[\s,;]+/);
  for (let i = 0; i < parts.length && out.length < 8; i++) {
    const sym = parts[i].replace(/[^A-Z0-9.=^-]/g, "").slice(0, 12);
    if (sym && out.indexOf(sym) === -1) out.push(sym);
  }
  return out;
}

/** What is written on screen for a symbol: BTC-USD -> BTC, ^GSPC -> GSPC, EURUSD=X -> EURUSD; cut to fit `width`
 *  columns (the left side: 31, or 27 when it stands right of the bars of "staying"). */
export function labelOf(sym, width) {
  let s = sym.replace(/^\^/, "").replace(/-USD$|=X$|=F$/, "");
  if (!s) s = sym;
  while (s.length > 1 && smallWidth(s) > (width || 31)) s = s.slice(0, -1);
  return s;
}

// ---------- numbers as text ----------
/** v (not negative) with d decimals, as [whole, decimals]. */
function fixed(v, d) {
  const m = Math.pow(10, d);
  const n = Math.round(v * m);
  let frac = d ? String(n % m) : "";
  while (frac.length < d) frac = "0" + frac;
  return [String(Math.floor(n / m)), frac];
}

export function normalWidth(s) {
  return textWidth(s, "normal");
}

/** The price as [whole, decimals]: with the decimals its market quotes it in (`hint`: 2 for shares, 4 for currencies;
 *  4 below one dollar), fewer when they do not fit the left side (31 columns): 355.58, 1234.5, 98848, 1.0987,
 *  0.1234, 123.4K. The decimal point is drawn by us, one pixel wide (the font's own takes three columns). */
export function priceParts(p, hint) {
  let unit = "", v = p;
  if (p >= 999999.5) {
    unit = "M";
    v = p / 1000000;
  } else if (p >= 99999.5) {
    unit = "K";
    v = p / 1000;
  }
  for (let d = unit ? 2 : p < 0.99995 ? 4 : hint >= 0 && hint <= 4 ? hint : 2; ; d--) {
    const parts = fixed(v, d);
    if (d === 0) return [parts[0] + unit, ""];
    parts[1] += unit;
    if (normalWidth(parts[0]) + 3 + normalWidth(parts[1]) <= 31) return parts;
  }
}

/** The change over span k, without its sign (the arrow and the colour say which way), or "" when it is not known. */
export function pctOf(q, k) {
  const view = q.views[k];
  if (!q.has || !view.has || !(view.prev > 0)) return "";
  const parts = fixed(Math.abs((q.price - view.prev) / view.prev * 100), 1);
  return parts[0] + "." + parts[1] + "%";
}

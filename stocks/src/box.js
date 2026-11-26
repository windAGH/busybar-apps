// The box on the right: two bitmaps with the line of the chosen span drawn in.

import { D } from "./tables.js";

export const X0 = D.x0;             // the box starts at this column
export const LX = D.lx, COLS = D.cols;  // the line: its first column inside the box, and how many columns it has

/** The line: a row (8..13) for each of its columns. A day that hardly moved (a money-market fund: a cent or two)
 *  must not become a zigzag over the whole height, so the scale never goes below 0.15 % of the price: such a line
 *  stays in the middle, nearly flat. */
export function rowsOf(closes) {
  if (!closes || !closes.length) return null;
  let lo = closes[0], hi = closes[0];
  for (let i = 1; i < closes.length; i++) {
    if (closes[i] < lo) lo = closes[i];
    if (closes[i] > hi) hi = closes[i];
  }
  const least = 0.0015 * Math.abs((hi + lo) / 2);
  let range = hi - lo;
  if (range < least || !(range > 0)) {
    range = least > 0 ? least : 1;
    lo = (hi + lo) / 2 - range / 2;
  }
  const rows = [];
  for (let i = 0; i < COLS; i++) {
    const v = closes[Math.floor(i * (closes.length - 1) / (COLS - 1))];
    rows.push(13 - Math.max(0, Math.min(5, Math.round((v - lo) / range * 5))));
  }
  return rows;
}

// ---------- the box ----------
const GLOW_AT = [0, 6, 11, 15, 18, 20];          // where, in a D.glow string, the pixels for a line on row 8..13 start

/** The box as two bitmaps (its left and right half: a bitmap has 32 colours at most). tables.js holds everything
 *  that takes arithmetic: each half's header, colours and rows, and for every column of the
 *  line the letters of the light under it. Here the line is laid on rows 8-14: one pixel thick, joined from
 *  column to column, a white point where the price is now, its light under it. `rows` = null gives the empty plate. */
function buildBox(kind, rows, stale, split, dawn) {
  const halves = D.plate[kind], glow = D.glow[kind], out = [], st = D.style[kind];
  const ext = kind.charAt(0) === "e";            // an extended session: the line quiet up to column `split`, then
  const run = D.keys.run;                        // running from the colour of the change into blue (after the close:
  //                                                the day goes into the night) or, `dawn`, from blue into that colour
  let x0 = 0;                                    // the box column this half starts at
  for (let n = 0; n < halves.length; n++) {
    const half = halves[n], w = half.w;
    if (!rows) {
      out.push(half.top + half.mid.join("\n") + "\n" + half.bot);
      x0 += w;
      continue;
    }
    const grid = [];                             // rows 8..14 as letters
    for (let k = 0; k < 7; k++) grid.push(half.mid[k].split(""));
    for (let i = 0; i < COLS; i++) {
      const x = LX + i - x0;
      if (x < 0 || x >= w) continue;
      const r = rows[i], from = i ? rows[i - 1] : r, g = glow[i], at = GLOW_AT[r - 8] - r - 1;
      const quiet = ext && i < split;
      const key = !ext ? D.keys.line : quiet ? D.keys.quiet
        : run.charAt(dawn ? run.length - 1 - Math.min(run.length - 1, Math.floor((i - split) * run.length / Math.max(1, COLS - split)))
          : Math.min(run.length - 1, Math.floor((i - split) * run.length / Math.max(1, COLS - split))));
      for (let y = r + 1; y < 15 && !stale && !quiet; y++) grid[y - 8][x] = g[at + y];
      for (let y = Math.min(from, r); y <= Math.max(from, r); y++) grid[y - 8][x] = key;
      if (i === COLS - 1) grid[r - 8][x] = D.keys.now;
    }
    let data = half.top;
    if (stale && !ext) {                         // "not fresh": the line and its point in the faint tone, no light
      data = data.replace(D.keys.line + " c " + st.line.slice(0, 7), D.keys.line + " c " + st.faintLine.slice(0, 7))
        .replace(D.keys.now + " c #FFFFFF", D.keys.now + " c " + st.faintInk.slice(0, 7));
    }
    for (let k = 0; k < 7; k++) data += grid[k].join("") + "\n";
    out.push(data + half.bot);
    x0 += w;
  }
  return out;
}

const blank = {};                   // kind -> the empty box

/** The box for a symbol and a span, built once and kept until its line or its colour changes. */
export function boxOf(q, k, kind, stale) {
  const view = q.views[k];
  if (!view.has || !view.rows) {
    if (!blank[kind]) blank[kind] = buildBox(kind, null, false, 0, false);
    return blank[kind];
  }
  const mark = kind + (stale ? "!" : "") + (k === 0 ? q.split + q.ext : "");
  if (view.boxKind !== mark) {
    view.box = buildBox(kind, view.rows, stale, k === 0 ? q.split : 0, q.ext === "pre");
    view.boxKind = mark;
  }
  return view.box;
}

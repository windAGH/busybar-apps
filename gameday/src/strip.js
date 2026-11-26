// One game as a strip of 72 x 16.
//
// Kept calm: team colour only in the badges and the glow behind them; all writing is white in three strengths, plus
// green for "the game is on" and yellow for the down.
//   before:  records . day            during:  score   Q3    score         after:       Final
//            kick-off time                             clock (now and then the down)   score       score
//                                              timeouts left above each score; field strip on the bottom row

import {
  gameIds, games, isHalf, listLoaded, off, season, seasonAsked, seasonItems, seasonNow, soon, SOON_MS,
} from "./games.js";
import { bar, FAINT, image, smallWidth, SOFT, STILL, T, text, textWidth, WHITE } from "./draw.js";
import { fails, offline, wifiUp } from "./net.js";
import { local, pad2, TITLE } from "./bar.js";
import { D } from "./tables.js";

const LIVE = "#45E06FFF", DOWN = "#FFC61AFF";

const TIMEOUT_MS = 120000;          // how long a timeout usually takes on air; only used for the estimate
const HALFTIME_MS = 13 * 60000;     // an NFL halftime (the title game's is about twice that); estimate only

const STALE_MS = 150000;            // a live game's numbers older than this are shown as not fresh

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function mod(a, n) {
  return ((a % n) + n) % n;
}

function teamColour(abbr) {
  return (D.team[abbr] || "#FFFFFF") + "FF";
}

/** One end of the strip: the glow in the team's colour (full, or dim for the team that lost) with the team's badge
 *  on it - a helmet in its colours over its three letters. One picture of 30 columns per team, side and strength
 *  (images/team_<TEAM>_<a|h><1|0>.png); the badge sits in a 14 x 14 square, rows 1-14, at the outer end. */
function cap(els, id, abbr, side, strong) {
  els.push(image(id, "images/team_" + (D.team[abbr] ? abbr : "XXX") + "_" + side + (strong ? 1 : 0) + ".png",
    side === "a" ? 0 : 42, 0, 0, 30));
}

// Each score sits in the middle of the room it really has: between its team's badge (as wide as that badge really
// is) and the middle block, which is centred on the screen and keeps columns 28-43 to itself (wide enough for
// "12:42", so the scores do not jump when the clock changes width). With an odd pixel to spare it goes on the
// badge's side on both halves, so the strip stays a mirror image of itself.
const MID = [28, 43];

function badgeSpan(abbr, x0) {
  const w = D.badge[abbr] || D.badge.XXX;
  const left = x0 + ((14 - w) >> 1);
  return [left, left + w - 1];
}

function centred(w, room, oddToTheRight) {
  const spare = Math.max(0, room[1] - room[0] + 1 - w);
  return room[0] + (spare >> 1) + (oddToTheRight ? spare % 2 : 0);
}

function rooms(g) {                              // [away score's room, home score's room]
  return [[badgeSpan(g.away, 0)[1] + 2, MID[0] - 2], [MID[1] + 2, badgeSpan(g.home, 58)[0] - 2]];
}

function digitsWidth(s) {                        // font "normal": 5 a digit, 1 between
  return s.length * 5 + s.length - 1;
}

function shortDown(s) {                          // "2nd & 7" -> "2&7", "1st & Goal" -> "1&G"
  const m = /^\s*(\d)\w*\s*&\s*(\w+)/.exec(s || "");
  if (!m) return "";
  return m[1] + "&" + (m[2][0].toLowerCase() === "g" ? "G" : m[2]);
}

/** The field line's colours: a-d the green field and the three steps of the running light; e the red zone, which
 *  breathes (deep red to bright red and back in 1.8 seconds - the colour is new in every update, the element is the
 *  same one that carries the running light, so the breathing costs nothing extra); f-h the light over the red. */
function flowHead(width) {
  const k = 0.5 + 0.5 * Math.sin(Date.now() / 1800 * 2 * Math.PI);
  const hex = (v) => ("0" + Math.round(v).toString(16).toUpperCase()).slice(-2);
  return "! XPM2\n" + width + " 1 8 1\na c #1F6B36\nb c #2E8F4C\nc c #49C473\nd c #8CF0AE\ne c #" + hex(96 + 159 * k) +
    hex(10 + 34 * k) + hex(14 + 30 * k) + "\nf c #C85A5A\ng c #F08C8C\nh c #FFD0D0\n";
}

/** Bottom line: the field from the away goal line (left) to the home one (right). On rows 14-15: the ball, an
 *  orange dot of 2 x 2, on top of everything in the strip, and the line to gain, one thin yellow line (not drawn
 *  when it lies beyond the goal line, or when the feed gives no down and distance). With `phase`, lights run along
 *  the stretch BEHIND the ball - the ground the offence has covered - towards the ball, bright head first; nothing
 *  runs ahead of it. The red zone - the last 20 yards in
 *  front of the goal line being attacked - turns red and breathes from the moment the ball is within 15 yards of
 *  it. Nothing of this when nobody has the ball or the feed does not say where it is. */
export function field(els, p, g, phase, at) {
  const spot = at === undefined || at === null ? g.spot : at;
  const step = g.poss === "away" ? 1 : g.poss === "home" ? -1 : 0;
  const bx = spot === null || spot === undefined ? null : 4 + Math.round(spot * 63 / 100);
  const red = bx !== null && step !== 0 && (step > 0 ? spot >= 65 : spot <= 35);
  const r0 = 4 + Math.round((step > 0 ? 80 : 0) * 63 / 100), r1 = 4 + Math.round((step > 0 ? 100 : 20) * 63 / 100);
  let cells = "";
  for (let i = 0; i < 64; i++) {
    const x = 4 + i;
    const inRed = red && x >= r0 && x <= r1;
    const behind = bx !== null && step !== 0 && (x - bx) * step < 0;         // the ground already covered
    const k = phase === undefined || phase === null || !behind ? 9 : mod(phase - i * step, 9);   // a bright head every
    cells += k < 3 ? (inRed ? "hgf" : "dcb")[k] : inRed ? "e" : "a";                           // 9 pixels, its tail behind
  }
  els.push({ id: p + "f", type: "xpmbitmap", x: 4, y: 15, align: "top_left", timeout: T, data: flowHead(64) + cells,
    z_index: 1 });
  els.push(bar(p + "za", 1, 15, 3, 1, teamColour(g.away), 1), bar(p + "zh", 68, 15, 3, 1, teamColour(g.home), 1));
  if (bx === null) return;
  if (g.distance && step !== 0 && g.spot !== null) {
    const target = g.spot + g.distance * step;   // the line to gain stays put while the ball slides
    if (target > 0 && target < 100) {
      els.push(bar(p + "fd", Math.min(Math.max(4 + Math.round(target * 63 / 100), 4), 67), 14, 1, 2, "#FFD21AFF", 5));
    }
  }
  els.push(bar(p + "b", Math.min(Math.max(bx - 1, 4), 66), 14, 2, 2, "#FF7A1AFF", 6));
}

/** One of those pages. */
function seasonEls(g, p) {
  if (g.kind === "champ") {
    // The banner is one animation the bar plays by itself (buildlib.champ): first a gold plate over everything, then
    // see-through where the winner goes - its mark at the left, on a dim glow so that the gold leads, and under the
    // word its name as the feed writes it (the nickname; if that is too long for the room, the city; else the letters).
    const els = [];
    cap(els, p + "ta", season.win, "a", false);
    els.push({ id: p + "ch", type: "animation", path: "animations/champ.anim", x: 0, y: 0, align: "top_left", loop: true,
      section: "default", timeout: STILL, z_index: 6, _w: 72 });
    let name = season.names[2];
    for (let i = 1; i >= 0; i--) if (season.names[i] && smallWidth(season.names[i]) <= 42) name = season.names[i];
    els.push(text(p + "m1", name, "small", 36, 7, "#FFE9A8FF", "top_mid", 5));         // (under the plate)
    return els;
  }
  if (g.kind === "title") {
    // The title game, dressed like the banner: both marks, the winner's score in gold and the loser's in dull gold,
    // under an animation with the same gold lines, FINAL in gold and stars round the winner's score (champ2.anim).
    const t = season.game, awayWon = t.as >= t.hs, els = [];
    cap(els, p + "ta", t.away, "a", awayWon);
    cap(els, p + "th", t.home, "h", !awayWon);
    els.push({ id: p + "ch", type: "animation", path: "animations/champ2.anim", x: 0, y: 0, align: "top_left", loop: true,
      section: awayWon ? "away" : "home", timeout: STILL, z_index: 6, _w: 72 });
    const room = rooms(t), win = "#FFD45AFF", lose = "#8E6E2CFF";
    els.push(text(p + "sa", String(t.as), "normal", centred(digitsWidth(String(t.as)), room[0], true), 5, awayWon ? win : lose, "top_left", 5),
      text(p + "sh", String(t.hs), "normal", centred(digitsWidth(String(t.hs)), room[1], false), 5, awayWon ? lose : win, "top_left", 5));
    return els;
  }
  if (g.kind === "kick") {
    const days = Math.ceil((season.kick - seasonNow()) / 86400000);
    return [text(p + "m1", "NEXT KICKOFF", "small", 36, 0, FAINT, "top_mid"),
      text(p + "m2", days <= 1 ? "TOMORROW" : "IN " + days + " DAYS", "small", 36, 7, WHITE, "top_mid")];
  }
  return [image(p + "cd", "images/card_off.png", 0, 0, 0, 72)];
}

export function gameEls(g, p, phase, at) {
  if (g && g.kind) return seasonEls(g, p);       // a page of the season's end, not a game
  if (!g) {                                      // nothing to show: say why
    if (listLoaded && gameIds.length === 0 && seasonAsked && !seasonItems()) {   // (not before we know whether the season is over)
      return [image(p + "cd", "images/card_noweek.png", 0, 0, 0, 72)];        // "NO GAMES / THIS WEEK"
    }
    if (offline && fails > 0 && games.size === 0) {
      // A request has really failed and there is nothing to show: say which it is. The bar's Wi-Fi is down
      // ("NO WI-FI"), or it is up and the hosts do not answer ("NO DATA / RETRYING").
      return [image(p + "cd", "images/card_" + (wifiUp ? "nodata" : "nowifi") + ".png", 0, 0, 0, 72)];
    }
    return [text(p + "e", TITLE, "small", 36, 5, FAINT, "top_mid")];         // nothing has answered yet: the name, quietly
  }
  const over = g.state === "post";
  const loseA = over && g.as < g.hs, loseH = over && g.hs < g.as;
  const els = [];
  cap(els, p + "ta", g.away, "a", !loseA);
  cap(els, p + "th", g.home, "h", !loseH);
  if (off(g)) {                                  // postponed, cancelled: the two teams and the word, no score
    els.push(text(p + "m1", /CANCEL/.test(g.status) ? "Cancelled" : "Postponed", "small", 36, 5, SOFT, "top_mid"));
    return els;
  }
  if (soon(g)) {
    // The last hour before kick-off: the game already has the in-game layout, with a clock counting DOWN to the
    // kick-off (exact: it is the scheduled time). 0 - 0 in faint white where the scores will be, "Kick" over the
    // countdown, and the bottom strip filling up as the kick-off comes nearer.
    const left = Math.max(0, Math.floor((g.start - Date.now()) / 1000));
    if (left > 0) {
      els.push(text(p + "m1", "Kick", "small", 36, -1, LIVE, "top_mid"),
        text(p + "m2", Math.floor(left / 60) + ":" + pad2(left % 60), "small", 36, 6, WHITE, "top_mid"));
    } else {
      els.push(text(p + "m1", "Soon", "small", 36, 2, LIVE, "top_mid"));     // due, and the feed has not started it yet
    }
    const room = rooms(g);
    els.push(text(p + "sa", "0", "normal", centred(5, room[0], true), 3, FAINT),
      text(p + "sh", "0", "normal", centred(5, room[1], false), 3, FAINT),
      bar(p + "za", 1, 15, 3, 1, teamColour(g.away), 1), bar(p + "zh", 68, 15, 3, 1, teamColour(g.home), 1),
      bar(p + "hb0", 4, 15, 64, 1, "#FFFFFF1C", 1),
      bar(p + "hb1", 4, 15, Math.max(1, Math.round(64 * (1 - Math.min(1, left * 1000 / SOON_MS)))), 1, "#45E06FB0", 2));
    return els;
  }
  if (g.state === "pre") {                       // records . day / kick-off time
    const lt = local(g.start), today = local();
    const same = lt.getUTCFullYear() === today.getUTCFullYear() && lt.getUTCMonth() === today.getUTCMonth() &&
      lt.getUTCDate() === today.getUTCDate();
    const day = same ? "Today" : DAYS[lt.getUTCDay()];
    const hour = (lt.getUTCHours() % 12 || 12) + ":" + pad2(lt.getUTCMinutes());
    const ampm = lt.getUTCHours() < 12 ? "AM" : "PM";
    // Each record sits in the middle of the room it really has, like the scores: between its badge and the day,
    // one dark column at least on either side. Shown only when both fit.
    const dw = smallWidth(day), d0 = 36 - (dw >> 1), wa = smallWidth(g.rec_a || ""), wh = smallWidth(g.rec_h || "");
    const ra = [badgeSpan(g.away, 0)[1] + 2, d0 - 2], rh = [d0 + dw + 1, badgeSpan(g.home, 58)[0] - 2];
    if (g.rec_a && g.rec_h && wa <= ra[1] - ra[0] + 1 && wh <= rh[1] - rh[0] + 1) {
      els.push(text(p + "ra", g.rec_a, "small", centred(wa, ra, true), -1, FAINT),
        text(p + "rh", g.rec_h, "small", centred(wh, rh, false), -1, FAINT));
    }
    const hw = textWidth(hour, "bold");
    const x0 = 36 - ((hw + 2 + smallWidth(ampm)) >> 1);
    const hh = hour.split(":")[0];                // hours, colon and minutes are three elements,
    const cx = x0 + textWidth(hh, "bold") + 1;    // each placed by its own width
    els.push(text(p + "m1", day, "small", 36, -1, SOFT, "top_mid"), text(p + "m2", hh, "bold", x0, 6, WHITE),
      text(p + "mc", ":", "bold", cx, 6, WHITE), text(p + "mm", hour.split(":")[1], "bold", cx + 2, 6, WHITE),
      text(p + "m3", ampm, "small", x0 + hw + 2, 8, FAINT));
    return els;
  }
  const y = over ? 6 : 3;                        // live: rows 5-11, so that the timeout marks (row 3) and the digits
  //                                                together sit on the badge's middle; after: low, "Final" above
  const room = rooms(g);
  els.push(text(p + "sa", String(g.as), "normal", centred(digitsWidth(String(g.as)), room[0], true), y, loseA ? FAINT : WHITE),
    text(p + "sh", String(g.hs), "normal", centred(digitsWidth(String(g.hs)), room[1], false), y, loseH ? FAINT : WHITE));
  if (over) {
    els.push(text(p + "m1", g.period > 4 ? "Final/OT" : "Final", "small", 36, -1, SOFT, "top_mid"));
    return els;
  }
  if (isHalf(g)) {
    // Halftime: "Half" over an estimated countdown to the second half, and the strip along the bottom, which has
    // no ball to show now, becomes a bar that drains as the break runs out. The feed gives no halftime clock: we
    // count from the moment we first saw "Halftime", using the usual 13 minutes - an estimate. When it has run
    // out and the teams are still not back, the number goes and only "Half" is left.
    const left = g.half_since ? HALFTIME_MS - (Date.now() - g.half_since) : 0;
    els.push(bar(p + "za", 1, 15, 3, 1, teamColour(g.away), 1), bar(p + "zh", 68, 15, 3, 1, teamColour(g.home), 1),
      bar(p + "hb0", 4, 15, 64, 1, "#FFFFFF1C", 1));
    if (left > 0) {
      const sec = Math.floor(left / 1000);
      els.push(bar(p + "hb1", 4, 15, Math.max(1, Math.round(64 * left / HALFTIME_MS)), 1, "#45E06FB0", 2),
        text(p + "m1", "Half", "small", 36, -1, LIVE, "top_mid"),
        text(p + "m2", Math.floor(sec / 60) + ":" + pad2(sec % 60), "small", 36, 6, SOFT, "top_mid"));
    } else {
      els.push(text(p + "m1", "Half", "small", 36, 2, LIVE, "top_mid"));
    }
    return els;
  }
  const down = shortDown(g.down_text);
  const showDown = down !== "" && Math.floor(Date.now() / 1000) % 8 >= 5;     // the clock mostly, the down for a moment
  const left = timeoutLeft(g);
  if (left > 0) {                                // a timeout is on: "T/O" over an estimated countdown
    const sec = Math.floor(left / 1000);
    els.push(text(p + "m1", "T/O", "small", 36, -1, DOWN, "top_mid"),
      text(p + "m2", Math.floor(sec / 60) + ":" + pad2(sec % 60), "small", 36, 6, WHITE, "top_mid"));
  } else if (/DELAY|SUSPEND/.test(g.status)) {   // stopped by the weather or the like: "Delay" over the quarter
    els.push(text(p + "m1", "Delay", "small", 36, -1, DOWN, "top_mid"),
      text(p + "m2", g.period > 4 ? "OT" : "Q" + Math.max(1, g.period), "small", 36, 6, SOFT, "top_mid"));
  } else {
    const old = Date.now() - g.at > STALE_MS;    // no fresh numbers for a while: the quarter goes grey, the clock blank
    els.push(text(p + "m1", g.period > 4 ? "OT" : "Q" + Math.max(1, g.period), "small", 36, -1, old ? FAINT : LIVE, "top_mid"),
      text(p + "m2", old ? "--:--" : showDown ? down : g.clock, "small", 36, 6, showDown && !old ? DOWN : SOFT, "top_mid"));
  }
  timeouts(els, p, g);
  field(els, p, g, phase, at);
  return els;
}

export function timeoutLeft(g) {
  return g.timeout_since ? TIMEOUT_MS - (Date.now() - g.timeout_since) : 0;
}

/** Timeouts left: three marks above each score (row 3; 2 wide, 1 apart), centred in the room the score is centred
 *  in, in the team's own colour: full while that timeout is still there, the same colour at a quarter strength once
 *  called. They go from the middle outwards: the one nearest the team's badge is the last one left. The one just
 *  called blinks twice a second while that timeout is on. (No play clock: the feed has none.) */
export function timeouts(els, p, g) {
  const blink = timeoutLeft(g) > 0 && Math.floor(Date.now() / 500) % 2 === 0;
  const room = rooms(g);
  const sides = [["a", "away", centred(8, room[0], true), g.to_a, g.away], ["h", "home", centred(8, room[1], false), g.to_h, g.home]];
  for (let n = 0; n < 2; n++) {
    const have = sides[n][3];
    if (typeof have !== "number") continue;
    const colour = D.team[sides[n][4]] || "#FFFFFF";
    for (let k = 0; k < 3; k++) {                // k = 0 is the mark nearest the badge
      const lit = k < have || (blink && g.timeout_by === sides[n][1] && k === have);
      els.push(bar(p + "o" + sides[n][0] + k, sides[n][2] + (n === 0 ? k : 2 - k) * 3, 3, 2, 1, colour + (lit ? "FF" : "40"), 4));
    }
  }
}

// Hoops: NBA game night on the BUSY Bar. One game at a time as a score strip of 72 x 16: while a game is on, the
// app stays on it; when none is, the finished games and the ones to come take turns; when the season is over, the
// champions' banner. The numbers come straight from ESPN's public scoreboard over the bar's Wi-Fi.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
//   D        generated data: team colours, widths of the bar's letters, digits, lengths of the animations
//   part 1   the bar: its API, its clock, its controls, drawing, how one picture gives way to the next, the loop
//            that asks the internet and what it does when nothing answers
//   part 2   the score strip: the day's games read one small request at a time, one game as a strip, the carousel,
//            the controls, the big-play signs, the season's end
//   part 3   the settings, and the start
// No league or team artwork: a team is a small jersey of our own drawing in its two colours over its three letters.

// Generated data. Not edited by hand.
const D = {
  "app": "io.github.windagh.hoops",
  "name": "Hoops",
  "alias": {"GS":"GSW","NO":"NOP","NY":"NYK","SA":"SAS","UTAH":"UTA","WSH":"WAS"},
  "bold": {" ":4,"'":1,"-":3,"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6,"A":6,"B":6,"C":6,"D":6,"E":5,"F":5,"G":6,"H":6,"I":4,"J":5,"K":6,"L":5,"M":9,"N":7,"O":6,"P":6,"Q":6,"R":6,"S":6,"T":6,"U":6,"V":7,"W":10,"X":6,"Y":6,"Z":6},
  "card": 300,
  "dg": {"c":[[6,9,11,13,9,9,6],[2,6,10,2,2,2,15],[6,9,1,2,4,8,15],[6,9,1,6,1,9,6],[3,5,5,9,9,15,1],[15,8,8,14,1,1,14],[6,9,8,14,9,9,6],[15,1,2,2,4,4,4],[6,9,9,6,9,9,6],[6,9,9,7,1,9,6]],"n":[[14,17,19,21,25,17,14],[4,12,20,4,4,4,31],[14,17,1,6,8,16,31],[14,17,1,6,1,17,14],[6,10,10,18,18,31,2],[31,16,16,30,1,1,30],[14,17,16,30,17,17,14],[31,1,2,4,4,8,8],[14,17,17,14,17,17,14],[14,17,17,15,1,17,14]],"one":[1,3,1,1,1,1,1]},
  "espn": {"ATL":"atl","BKN":"bkn","BOS":"bos","CHA":"cha","CHI":"chi","CLE":"cle","DAL":"dal","DEN":"den","DET":"det","GSW":"gs","HOU":"hou","IND":"ind","LAC":"lac","LAL":"lal","MEM":"mem","MIA":"mia","MIL":"mil","MIN":"min","NOP":"no","NYK":"ny","OKC":"okc","ORL":"orl","PHI":"phi","PHX":"phx","POR":"por","SAC":"sac","SAS":"sa","TOR":"tor","UTA":"utah","WAS":"wsh"},
  "line": {"ATL":"#E0283C","BKN":"#565B66","BOS":"#1E9E4E","CHA":"#12A5B8","CHI":"#DC1E3C","CLE":"#A81E4A","DAL":"#2A6BE0","DEN":"#2A4AA8","DET":"#2A50D0","GSW":"#2A55C8","HOU":"#E0183C","IND":"#FDBB30","LAC":"#2A4AA8","LAL":"#FDB927","MEM":"#5D82D0","MIA":"#B8183C","MIL":"#2C7A4B","MIN":"#2A66B0","NOP":"#27408F","NYK":"#1F6FE0","OKC":"#1A8CE0","ORL":"#1F6AE0","PHI":"#2A5FE8","PHX":"#6A3FD0","POR":"#E03A3E","SAC":"#7A45D8","SAS":"#C4CED4","TOR":"#D81E44","UTA":"#6A45D0","WAS":"#27408F"},
  "normal": {" ":4,"'":1,"-":3,"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5,"A":5,"B":5,"C":5,"D":5,"E":5,"F":5,"G":5,"H":5,"I":3,"J":4,"K":5,"L":4,"M":7,"N":5,"O":5,"P":5,"Q":5,"R":5,"S":5,"T":5,"U":5,"V":5,"W":7,"X":5,"Y":5,"Z":5},
  "plate": {"ATL":"#E0283C","BKN":"#565B66","BOS":"#106B40","CHA":"#7A45D8","CHI":"#DC1E3C","CLE":"#A81E4A","DAL":"#2A6BE0","DEN":"#2A4AA8","DET":"#2A50D0","GSW":"#2A55C8","HOU":"#E0183C","IND":"#2A4AA8","LAC":"#2A4AA8","LAL":"#7A45D8","MEM":"#3B498D","MIA":"#B8183C","MIL":"#2C7A4B","MIN":"#2A66B0","NOP":"#27408F","NYK":"#1F6FE0","OKC":"#0C4797","ORL":"#1F6AE0","PHI":"#2A5FE8","PHX":"#6A3FD0","POR":"#E03A3E","SAC":"#7A45D8","SAS":"#3A3D44","TOR":"#D81E44","UTA":"#6A45D0","WAS":"#27408F"},
  "roll": 150,
  "shade": {"ATL":"#620B2B","BKN":"#25262D","BOS":"#042F26","CHA":"#28195F","CHI":"#60072C","CLE":"#4A082E","DAL":"#0C1562","DEN":"#0E0E4A","DET":"#0F0D5B","GSW":"#0D0E58","HOU":"#62042D","IND":"#0E0E4A","LAC":"#0E0E4A","LAL":"#28195F","MEM":"#1A173E","MIA":"#51052A","MIL":"#113529","MIN":"#0E1A4D","NOP":"#0E0E3F","NYK":"#071562","OKC":"#010B42","ORL":"#071362","PHI":"#0C0E66","PHX":"#24175B","POR":"#62142A","SAC":"#28195F","SAS":"#19191E","TOR":"#5F072F","UTA":"#26195B","WAS":"#0E0E3F"},
  "sign": {"final":1300,"lead":1200,"ot":1300,"run_a":1200,"run_h":1200,"three":1200,"who":1900},
  "small": {" ":1,"%":4,"&":4,"+":3,",":1,"-":2,".":1,"/":2,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,":":1,"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3},
  "smallGap": 1,
  "team": {"ATL":"#E0283C","BKN":"#565B66","BOS":"#1E9E4E","CHA":"#12A5B8","CHI":"#DC1E3C","CLE":"#A81E4A","DAL":"#2A6BE0","DEN":"#2A4AA8","DET":"#2A50D0","GSW":"#2A55C8","HOU":"#E0183C","IND":"#FDBB30","LAC":"#2A4AA8","LAL":"#FDB927","MEM":"#5D82D0","MIA":"#B8183C","MIL":"#2C7A4B","MIN":"#2A66B0","NOP":"#27408F","NYK":"#1F6FE0","OKC":"#1A8CE0","ORL":"#1F6AE0","PHI":"#2A5FE8","PHX":"#6A3FD0","POR":"#E03A3E","SAC":"#7A45D8","SAS":"#C4CED4","TOR":"#D81E44","UTA":"#6A45D0","WAS":"#27408F"},
  "xl": {"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7}
};

// ===== 1. The bar: talking to it, time, text widths, elements and drawing. =====
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
//    into the bar's own "Loading..."  -> old elements are taken away only after the new ones are in place;
//  - an app may only call a short list of the bar's endpoints (display/draw, time, its own settings, ...). It cannot
//    start, stop or list other apps and cannot press keys: the bar answers 403.

const APP = D.app;
const API = "http://localhost/api/";

const OFF = 300;                    // where elements wait off-screen
const T = 20, STILL = 120;          // seconds an element lives without being sent again: moving parts, still parts
const WHITE = "#FFFFFFFF", SOFT = "#FFFFFFB0", FAINT = "#FFFFFF66";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

let stopped = false;
let busy = false;                   // a change of page or of game is running: no internet request starts meanwhile
let offline = false;                // the last request to the internet failed

const sleep = (ms) => new Promise((done) => setTimeout(done, Math.max(0, ms)));

// ---------- the bar's controls ----------
// The handler only takes notes; the page that is on screen reads them at its next step (a press cuts its wait short).
//   encoder: ctl.turn counts the clicks (+ clockwise, - the other way)     OK: ctl.ok is set
//   Start:   ctl.start is set (each page has its own use for it)            Back (short): the app ends
// ctl.held = "this stays": show() draws its mark.
// (Events as the bar sends them: { key: "encoder", action: "clockwise" | "counterclockwise", delta: 1 | -1 },
//  { key: "ok" | "start" | "back", action: "press" | "short" | "release" }.)
const ctl = { held: false, turn: 0, start: false, ok: false };
let wake = null;

/** Waits ms, or until a control is used. */
function nap(ms) {
  return new Promise((done) => {
    const timer = setTimeout(() => {
      wake = null;
      done();
    }, Math.max(0, ms));
    wake = () => {
      clearTimeout(timer);
      wake = null;
      done();
    };
  });
}

/** A page stays while its time runs or while it is held with OK - and gives way at once when the encoder
 *  is turned. */
function stay(end) {
  if (ctl.ok) {
    ctl.ok = false;
    ctl.held = !ctl.held;
  }
  return !stopped && ctl.turn === 0 && (ctl.held || Date.now() < end);
}
const pad2 = (n) => (n < 10 ? "0" : "") + n;

function report(what, err) {
  console.error(APP + ": " + what + ": " + (err && err.message ? err.message : String(err)));
}

// ---------- the bar's API ----------
async function call(method, path, body, type) {
  try {
    const init = body === undefined ? { method: method }
      : { method: method, headers: { "Content-Type": type || "application/json" }, body: body };
    const res = await fetch(API + path, init);
    const text = await res.text();
    return { ok: res.ok, status: res.status, text: text };
  } catch (err) {
    return { ok: false, status: 0, text: String(err) };
  }
}

async function getJson(url) {
  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) {
    throw new Error("HTTP " + res.status);
  }
  return JSON.parse(text);
}

// What went wrong while the app ran: draw requests the bar refused, and requests to the internet that failed.
// Written to the app's storage (errors.txt) 100 seconds after the start and whenever a number changes after that.
const errs = { draw: 0, net: 0, saved: "" };

function saveErrs() {
  const line = "draw " + errs.draw + " net " + errs.net;       // the file is rewritten when an error count changes,
  if (line === errs.saved) return;                            // not every time a host answers: that would wear the flash
  errs.saved = line;
  call("POST", "storage/write?path=/ext/data/errors.txt", line + " sources " + JSON.stringify(sources), "application/octet-stream");
}

/** The same request from one host after another until one answers; sources counts which one did. */
const sources = {};

async function getJsonAny(hosts, path) {
  let last;
  for (let i = 0; i < hosts.length; i++) {
    try {
      const got = await getJson(hosts[i] + path);
      sources[hosts[i].slice(8)] = (sources[hosts[i].slice(8)] || 0) + 1;
      if (i > 0) console.log(APP + ": " + hosts[i].slice(8) + " answered instead of " + hosts[0].slice(8));
      return got;
    } catch (err) {
      last = err;
    }
  }
  throw last;
}

/** This app's own settings as set on the bar (Apps > the app > Setup). An app cannot read another app's. */
async function loadSettings() {
  const got = await call("GET", "apps/settings?app_id=" + APP);
  try {
    return (got.ok && JSON.parse(got.text).values) || {};
  } catch (err) {
    return {};
  }
}

// ---------- time: the bar knows the local time and its zone, the script only trusts UTC ----------
let zoneMs = 0;

async function syncTime() {
  const got = await call("GET", "time");
  const m = got.ok && /T\d+:\d+:\d+(?:\.\d+)?(Z|[+-]\d\d:?\d\d)?/.exec(got.text);
  if (m && m[1] && m[1] !== "Z") {
    const sign = m[1][0] === "-" ? -1 : 1;
    const digits = m[1].replace(/[^0-9]/g, "");
    zoneMs = sign * (Number(digits.slice(0, 2)) * 60 + Number(digits.slice(2, 4))) * 60000;
  } else if (m) {
    zoneMs = 0;
  }
}

/** A Date whose getUTC...() read the local wall clock. */
function local(ms) {
  return new Date((ms === undefined ? Date.now() : ms) + zoneMs);
}

// ---------- widths (for layout, and to know when the light of a page change has passed an element) ----------
function smallWidth(s) {
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

function textWidth(s, font) {
  if (font === "small") return smallWidth(s);
  if (font === "extra_large") return fontWidth(s, D.xl, 7);
  if (font === "bold") return fontWidth(s, D.bold, 6);
  return fontWidth(s, D.normal, 5);
}

// ---------- elements. Keys that start with "_" are ours and are not sent ----------
function text(id, s, font, x, y, color, align, z) {
  return { id: id, type: "text", text: s, font: font, x: x, y: y, align: align || "top_left", color: color,
    timeout: T, z_index: z === undefined ? 4 : z };
}

function bar(id, x, y, w, h, color, z) {
  return { id: id, type: "rectangle", x: x, y: y, width: w, height: h, fill: "solid", fill_colors: [color],
    border_width: 0, timeout: T, z_index: z };
}

/** w = its width. A picture with a width is a full-height, solid one (a background strip, an end of the score
 *  strip, a title card): it hides whatever is under it, like a piece of backdrop. */
function image(id, path, x, y, z, w) {
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

function nextBand() {
  band += 20;
  return band;
}

/** Puts a page's elements (z 0-9 among themselves) into band z and fills its uncovered columns with black
 *  (ids p + "bk0".."bk5"; column 0 is always there: it carries the page's band). */
function lift(els, p, z) {
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
function bandOf(p) {
  const rec = live.get(p + "bk0");
  return rec ? rec.el.z_index : nextBand();
}

function skipOurs(key, value) {
  return key.charCodeAt(0) === 95 ? undefined : value;
}

/** The element as the bar wants it; dx / dy move it (dx = OFF parks it off-screen). */
function wire(el, dx, dy) {
  if (dx || dy) {
    const moved = Object.assign({}, el);
    moved.x = el.x + (dx || 0);
    moved.y = el.y + (dy || 0);
    return JSON.stringify(moved, skipOurs);
  }
  return JSON.stringify(el, skipOurs);
}

// ---------- drawing ----------
const live = new Map();             // id -> { s: the element as last sent, t: when, el }

async function post(parts) {
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

// "Held" (OK was pressed): two small dim bars in the top left corner, the same on every page, above the page.
const MARK = ["zz_h1", "zz_h2"];
let markOn = false, markAt = 0;

async function mark() {
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

/** One or two short centred lines on a black plate over the page, for a moment (the answer to a press). */
let labelEnd = 0;

async function label(one, two, ms, dir) {
  const parts = (dx) => {
    const out = ['{"id":"zz_l0","type":"rectangle","x":' + (8 + dx) + ',"y":' + (two ? 0 : 2) + ',"width":56,"height":' +
      (two ? 16 : 12) + ',"radius":2,"fill":"solid","fill_colors":["#000000FF"],"border_width":1,' +
      '"border_color":"#FFFFFF40","timeout":4,"z_index":2147482500}',
      '{"id":"zz_l1","type":"text","text":"' + one + '","font":"small","x":' + (36 + dx) + ',"y":' + (two ? 0 : 3) +
      ',"align":"top_mid","color":"#FFFFFFB0","timeout":4,"z_index":2147482501}'];
    if (two) {
      out.push('{"id":"zz_l2","type":"text","text":"' + two + '","font":"small","x":' + (36 + dx) + ',"y":7,' +
        '"align":"top_mid","color":"#FFFFFF66","timeout":4,"z_index":2147482501}');
    }
    return out;
  };
  if (labelEnd) await unlabel(true);             // one label at a time
  if (dir) await post(parts(36 * dir));          // it comes in from the side the knob was turned to
  await post(parts(0));
  labelIds = two ? ["zz_l0", "zz_l1", "zz_l2"] : ["zz_l0", "zz_l1"];
  labelEnd = Date.now() + (ms || 1000);
}

let labelIds = [];

async function unlabel(now) {
  if (!labelEnd || (!now && Date.now() < labelEnd)) return;
  labelEnd = 0;
  await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: labelIds }));
}

/** Puts a page on screen, sending only what changed or is getting old. Unless `partial`, elements of ours that are
 *  not in the list are taken away afterwards (never before: the screen must not go empty). */
async function show(els, partial) {
  if (ctl.held !== markOn || markOn) await mark();
  if (labelEnd) await unlabel();
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
async function firstShow(els) {
  await post(inOrder(els, 1).map((el) => wire(el)));
  remember(els);
}

// ---------- changing the whole picture: one page to the next, one game to the next ----------
// The new page is one request, above the old page, drawn column by column in the direction `dir` (see the top of
// this file): the old page is wiped away sideways at the pace at which the bar works through the request, about a
// quarter of a second. With `light` the bar first starts playing the band of light (animations/band.anim: white
// core, bluer as it thins, a short glow ahead and a long see-through tail), which crosses
// from left to right at about the same pace, on top. Then the old page, now hidden, is deleted.
// Writing of the two pages is never on screen at the same place, and nothing is ever black for longer than the
// moment between a column's black and its writing.

async function change(els, dir, light) {
  busy = true;
  const t0 = Date.now(), mark = [];
  try {
    const olds = [];
    for (const id of live.keys()) olds.push(id);
    // The band is the first element of the same request: measured on the bar, a request of some twenty new
    // elements is read for about a second before anything of it is drawn, and then drawn in a few tenths of a
    // second - so the light must start when the drawing starts, not when the request is sent.
    const parts = inOrder(els, dir || 1).map((el) => wire(el));
    if (light) {
      parts.unshift('{"id":"zz_band","type":"animation","path":"animations/band.anim","x":0,"y":0,"align":"top_left",' +
        '"loop":false,"section":"default","timeout":5,"z_index":2147483000}');
    }
    await post(parts);
    mark.push(Date.now() - t0);                   // new page drawn
    await drop(olds);
    mark.push(Date.now() - t0);                   // old page gone
    remember(els);
    if (light) {
      await sleep(D.band);
      await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_band"] }));
    }
  } finally {
    busy = false;
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
async function roll(els, dir, blind) {
  busy = true;
  try {
    const olds = [], way = blind || (dir < 0 ? "roll_dn" : "roll_up");   // (blind "flip": over the two marks only)
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
    busy = false;
  }
}

/** A card that answers a control with nothing to do ("NO GAMES ON / RIGHT NOW"): down like the title cards,
 *  a moment, up again. The page under it is not touched. */
async function notice(name, ms) {
  busy = true;
  try {
    await post([cardAnim("zz_c1", "card_" + name + "_down", 0)]);
    await sleep(D.card + (ms || 1200));
    await post([cardAnim("zz_c2", "card_" + name + "_up", 0), cardAnim("zz_c1", "card_" + name + "_down", OFF)]);
    await sleep(D.card + 60);
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
  } finally {
    busy = false;
  }
}

function cardAnim(id, name, x) {
  return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":' + x + ',"y":0,"align":"top_left",' +
    '"loop":false,"section":"default","timeout":20,"z_index":' + (id === "zz_c1" ? 2147481000 : 2147481001) + "}";
}

async function shutter(kind, els) {
  busy = true;
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
    busy = false;
  }
}

// ---------- the internet: one small request at a time, never while something on screen is changing ----------
const feeds = [];                   // async (now) => true when it asked for something
let fails = 0, netPause = 0;        // after a failure the internet is left alone for 10 s, 20 s, 40 s ... up to 2 min
let wifiUp = true;                  // what the bar said about its Wi-Fi when a request last failed

async function dataLoop() {
  while (!stopped) {
    let did = false;
    if (!busy) {
      const now = Date.now();
      for (let i = 0; i < feeds.length && !did; i++) {
        try {
          did = await feeds[i](now);
          if (did) {
            offline = false;
            fails = 0;
          }
        } catch (err) {
          did = true;
          offline = true;
          errs.net++;
          fails++;
          netPause = Date.now() + Math.min(120000, 10000 * Math.pow(2, fails - 1));
          report("data", err);
          const wifi = await call("GET", "wifi/status");     // is it the Wi-Fi, or do the hosts not answer?
          wifiUp = !wifi.ok || /"state"\s*:\s*"connected"/.test(wifi.text);
        }
      }
    }
    if (Date.now() - started > 100000 || errs.saved || errs.draw || errs.net) saveErrs();
    await sleep(did ? 250 : 1000);
  }
}

const started = Date.now();

let zoneDue = Date.now() + 3600000;
feeds.push(async (now) => {         // the time zone again every hour (summer time)
  if (now < zoneDue) return false;
  zoneDue = now + 3600000;
  await syncTime();
  return false;
});

// ---------- input ----------
const unbind = listen("input", (event) => {
  if (stopped) return;
  if (event.key === "back") {
    if (event.action !== "short") return;
    stopped = true;                 // every loop ends at its next step; then nothing keeps the app alive
    setTimeout(unbind, 10);
  } else if (event.key === "encoder") {
    ctl.turn += event.delta > 0 ? 1 : event.delta < 0 ? -1 : 0;
  } else if (event.action === "short" && event.key === "ok") {
    ctl.ok = true;
  } else if (event.action === "short" && event.key === "start") {
    ctl.start = true;
  } else {
    return;
  }
  if (wake) wake();
});

// ===== 2. The score strip: one NBA game at a time, its data, the carousel, the controls, the signs. =====
//
// One strip, kept calm: team colour only in the marks, the glow behind them and the bottom line; all writing is
// white in three strengths, plus green for "the game is on" and yellow for what needs a look.
//   before:  tip-off time             during:   . . . . . . .         . . . . . . .      after:
//            day                               score      Q3      score                    score  Final  score
//                                                         clock
//                                                  ---- the quarter's time ----
//   during a game:
//     the seven dots over each score   the timeouts that team has left (they go out from the middle outwards)
//     the middle                       quarter over clock; now and then, for three seconds: a run that is on
//                                      ("NYK" over "9-0"), and the team fouls of this quarter once a team has four
//                                      ("Foul" over "4-5", away - home, yellow from five: the other side shoots)
//     the line along the bottom        the quarter's time: full at 12:00 (5:00 in overtime) and shrinking from both
//                                      ends towards the middle as the clock runs down, the away team's colour on
//                                      the left half, the home team's on the right; it stays between the two
//                                      teams' letters (columns 16-55). Before the tip-off and at halftime the same
//                                      line in green: growing as the tip-off nears, shrinking as the break runs out
//
// A game is "on" while it is being played and, already, in the hour before its tip-off (0 - 0 and a countdown).
//
// The app:
//   While a game is on, the app shows ONE game and stays on it. At the start that is the followed team's game if
//   it is on, else the first game that is on. (When it ends its final stays 20 seconds.)
//   When no game is on, the carousel runs by itself: today's finished games, then the ones to come - today's, or
//   the next day's that has any when today is done.
//   encoder  next / previous game that is on (sideways). While the carousel runs by a press of Start: through it.
//            With nothing on, a turn only says so ("NO GAMES ON RIGHT NOW").
//   Start    the carousel, one round, between the two title cards; Start again = back to the game at once, behind the closing card.
//   OK       teams as jerseys over their letters <-> as their three letters alone (until the app is closed).
//   Back     ends the app.
//   Signs (setting "Big play signs"), only for the game the app stays on: 3 POINTER (and, when the feed names him,
//   who shot it: his number and name on the same plate), a run of eight and more, a change of lead, OVERTIME, FINAL.
//   When the season is over (no game today, none in the next four days, and the Finals decided): for 30 days the
//   champions' banner taking turns with the Finals' result, then "SEASON IS OVER / OFFSEASON" taking turns with the
//   days to the next tip-off - see "when the season is over" below.

const LIVE = "#45E06FFF", WARN = "#FFC61AFF";
const PER_GAME = 6000;              // ms a game of the carousel stays up
const FINAL_STAY = 20000;           // ms the final of the game on show stays before another game takes its place
const HALFTIME_MS = 15 * 60000;     // an NBA halftime; estimate only
const SOON_MS = 3600000;            // from this long before tip-off a game counts as "on"
const RUN_SHOWN = 6, RUN_SIGN = 8;  // unanswered points from which a run is written in the middle / gets its sign
const SIGN_GAP = 20000;             // ms between two signs at least (FINAL and OVERTIME always come)
let teamsAsText = false;            // the two teams as their three letters alone, without the jersey (OK switches it)
let TEAMS = ["NYK"];                // the followed team (the app's "My team" setting)
let scoresUp = false;               // the strip is on screen (live games are then refreshed faster)
let onlyMine = false;               // true: only the followed team's game, on the days it has one
let signsOn = true;
let mainId = null;                  // THE game (the one the app stays on)
let onScreen = null;                // the game on screen

// ---------- data ----------
// ESPN's whole NBA scoreboard is 220 KB, more than an app's memory. So the bar asks for the list of a day's games
// (1 KB, ids only) and then for one game at a time (15-24 KB each), keeping only the few fields the strip shows.
// "Today" is the league's day: it only turns over at 10:00 UTC (5 or 6 in the morning in New York), so a game that
// runs past midnight still belongs to its evening. When today's games are all finished (or there are none), the
// next day that has games is looked for, up to four days ahead, and its games become the "to come" part.
// For the game the app stays on there is one more, very small request (0.6 KB) every 20 seconds: timeouts left and
// team fouls. Backup: every game from ESPN's two hosts in turn; the lists are kept in the app's
// storage and used when the list cannot be fetched on the same day; with nothing kept, the followed team's next
// game is taken from its team page. When nothing answers, the last good numbers stay on screen and the internet
// is asked again after 10 s, 20 s, 40 s ... up to 2 minutes (part 1).
const LIST_HOSTS = ["https://sports.core.api.espn.com"], CORE = "/v2/sports/basketball/leagues/nba/events";
const GAME_HOSTS = ["https://site.api.espn.com", "https://site.web.api.espn.com"];
const GAME_PATH = "/apis/site/v2/sports/basketball/nba/scoreboard/";
const STALE_MS = 150000;            // a live game's numbers older than this are shown as not fresh
let dayKey = "";                    // the league day the lists belong to, "20261125"
let todayIds = [], nextIds = [], gameIds = [];
const games = new Map();            // id -> game
const fetched = new Map();          // id -> { at: when we last have it from, hold: do not ask again before }
let listLoaded = false, listDue = 0, nextProbe = 0, nextDue = 0;

function leagueDay(ms, plus) {
  const d = new Date(ms - 36000000 + (plus || 0) * 86400000);
  return "" + d.getUTCFullYear() + pad2(d.getUTCMonth() + 1) + pad2(d.getUTCDate());
}

async function idsFor(day) {
  const got = await getJsonAny(LIST_HOSTS, CORE + "?dates=" + day + "&limit=40");
  const items = got.items || [], ids = [];
  for (let i = 0; i < items.length; i++) {
    const m = /\/events\/(\d+)/.exec(items[i].$ref || "");
    if (m) ids.push(m[1]);
  }
  return ids;
}

function setLists(day, today, next) {
  dayKey = day;
  todayIds = today;
  nextIds = next;
  gameIds = today.concat(next);
  if (gameIds.length) nothingAhead = false;
  for (const id of games.keys()) {
    if (gameIds.indexOf(id) === -1) {
      games.delete(id);
      fetched.delete(id);
    }
  }
  call("POST", "storage/write?path=/ext/data/day.json", JSON.stringify({ day: day, today: today, next: next }),
    "application/octet-stream");
}

async function loadList() {
  const day = leagueDay(Date.now());
  let today;
  try {
    today = await idsFor(day);
  } catch (err) {                                // no list: the one kept from earlier today, if there is one
    if (gameIds.length && dayKey === day) throw err;
    const kept = await call("GET", "storage/read?path=/ext/data/day.json");
    let old = null;
    try {
      old = JSON.parse(kept.text);
    } catch (e) {
      // nothing kept
    }
    if (kept.ok && old && old.day === day && old.today && old.today.length + old.next.length) {
      dayKey = day;
      todayIds = old.today;
      nextIds = old.next;
    } else {                                     // nothing kept either: at least the followed team's next game
      const team = await getJsonAny(GAME_HOSTS, "/apis/site/v2/sports/basketball/nba/teams/" + (D.espn[TEAMS[0]] || "ny"));
      const next = (team.team && team.team.nextEvent) || [];
      dayKey = day;
      todayIds = next.map((e) => String(e.id)).filter((id) => /^\d+$/.test(id));
      nextIds = [];
    }
    gameIds = todayIds.concat(nextIds);
    throw err;                                   // still a failure (it is tried again), but the games can be asked for
  }
  setLists(day, today, dayKey === day ? nextIds.filter((id) => today.indexOf(id) === -1) : []);
  if (!nextIds.length) nextProbe = 1;            // the next day with games is looked for when it is wanted
  listLoaded = true;
}

/** Nothing of today is still to come: every game of today is over (or today has none). */
function todayDone() {
  for (let i = 0; i < todayIds.length; i++) {
    const g = games.get(todayIds[i]);
    if (!g || g.state !== "post") return false;
  }
  return true;
}

function utc(s) {                                // "2026-11-26T01:00Z"
  const m = /(\d+)-(\d+)-(\d+)T(\d+):(\d+)/.exec(s || "");
  return m ? Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5])) : 0;
}

function codeOf(c) {
  const a = String((c.team && c.team.abbreviation) || "?").toUpperCase();
  return D.alias[a] || a;
}

const lead = (g) => (g.hs > g.as ? "home" : g.as > g.hs ? "away" : null);
let pendingSign = null;             // { kind, side, text, rank }: waits for the page loop
const RANK = { three: 1, lead: 2, run: 3, ot: 4, final: 5 };

function wantSign(g, kind, side, text, who) {
  if (!signsOn || g.id !== mainId) return;
  if (!pendingSign || RANK[kind] >= pendingSign.rank) {
    pendingSign = { kind: kind, side: side, text: text || "", rank: RANK[kind], id: g.id, at: Date.now(), who: who || null };
  }
}

/** Who did it, from the feed's last play: { num: "11", name: "BRUNSON" } (either may be ""), or null. The feed lists
 *  the players of a play in athletesInvolved[], the one who shot first: { jersey: "11", shortName: "J. Brunson",
 *  displayName: "Jalen Brunson", team: { id } }. `teamId`: the team that scored - a player the feed puts in another
 *  team is not named. The name is the surname in capitals, in the letters the bar's fonts have; a name with any
 *  other letter in it is left out (the number alone) rather than written wrongly. */
function shooter(lp, teamId) {
  try {
    const a = (lp.athletesInvolved || [])[0];
    if (!a) return null;
    if (a.team && a.team.id && teamId && String(a.team.id) !== String(teamId)) return null;
    const num = String(a.jersey === undefined || a.jersey === null ? "" : a.jersey).replace(/[^0-9]/g, "").slice(0, 2);
    let name = String(a.shortName || "").replace(/^\s*([A-Za-z]\.\s*)+/, "");     // "J. Brunson", "P.J. Washington"
    if (!name) {
      const parts = String(a.displayName || a.fullName || "").split(/\s+/).filter((part) => part);
      name = parts.slice(parts.length > 1 ? 1 : 0).join(" ");                     // "Jalen Brunson"
    }
    name = name.toUpperCase().replace(/[.,]/g, "").replace(/\s+(JR|SR|II|III|IV)$/, "").replace(/\s+/g, " ").replace(/^ | $/g, "");
    name = name.split("\u2019").join("'");
    // (no quote inside a regular expression: the bar's engine is only known to read them without)
    if (/[^A-Z0-9 \-]/.test(name.split("'").join(""))) name = "";
    return num || name ? { num: num, name: name } : null;
  } catch (err) {
    return null;                                 // a name is a bonus: never in the way of the scores
  }
}

async function loadGame(id) {
  const e = await getJsonAny(GAME_HOSTS, GAME_PATH + id);
  const comp = e.competitions[0];
  const t = {};
  for (let i = 0; i < comp.competitors.length; i++) {
    t[comp.competitors[i].homeAway] = comp.competitors[i];
  }
  const st = e.status || comp.status;
  const lp = (comp.situation && comp.situation.lastPlay) || {};
  const g = {
    id: id, away: codeOf(t.away), home: codeOf(t.home),
    as: parseInt(t.away.score, 10) || 0, hs: parseInt(t.home.score, 10) || 0,
    state: st.type.state, period: st.period || 0, clock: st.displayClock || "", detail: st.type.shortDetail || "",
    status: st.type.name || "", start: utc(e.date),
    last: (lp.type && lp.type.text) || "", play: String(lp.id || ""), at: Date.now(),
    run: null, runPts: 0, runSigned: 0, leader: null, scoredBy: null, scoredAt: 0,
    to_a: undefined, to_h: undefined, foul_a: undefined, foul_h: undefined, bonus_a: false, bonus_h: false,
    timeout_by: null,
  };
  const by = String((lp.team && lp.team.id) || "");
  const lastBy = by && by === String(t.away.team.id) ? "away" : by && by === String(t.home.team.id) ? "home" : null;
  if (/timeout/i.test(g.last) && g.state === "in") g.timeout_by = lastBy || "tv";
  const before = games.get(id);
  if (before) {                                  // what only a second look can tell: runs, changes of lead, signs
    g.to_a = before.to_a; g.to_h = before.to_h; g.foul_a = before.foul_a; g.foul_h = before.foul_h;
    g.bonus_a = before.bonus_a; g.bonus_h = before.bonus_h;
    g.run = before.run; g.runPts = before.runPts; g.runSigned = before.runSigned;
    g.leader = before.leader; g.scoredBy = before.scoredBy; g.scoredAt = before.scoredAt;
    g.half_since = before.half_since; g.breakSince = before.breakSince;
    const da = g.as - before.as, dh = g.hs - before.hs;
    if (g.state === "in" && before.state === "in" && (da > 0 || dh > 0) && da >= 0 && dh >= 0) {
      if (da > 0 && dh > 0) {                    // both scored between two looks: no run, and no telling who was last
        g.run = null; g.runPts = 0; g.runSigned = 0;
        g.scoredBy = lastBy || g.scoredBy;
      } else {
        const side = da > 0 ? "away" : "home", pts = da + dh;
        if (g.run !== side) { g.run = side; g.runPts = 0; g.runSigned = 0; }
        g.runPts += pts;
        g.scoredBy = side;
        // a three: the feed's last play says so, or the score went up by exactly three and the last play is not
        // a free throw (2 + 1 comes as a free throw). The shooter is named only in the first case: there the last
        // play IS the three; in the second it may already be the next play, with other players in it.
        const said = lp.scoreValue === 3 && lastBy === side;
        const three = said ? true : pts === 3 && !/free throw/i.test(g.last);
        if (three) wantSign(g, "three", side, "", said ? shooter(lp, by) : null);
        if (g.runPts >= RUN_SIGN && g.runPts - g.runSigned >= (g.runSigned ? 6 : RUN_SIGN)) {
          g.runSigned = g.runPts;
          wantSign(g, "run", side, g.runPts + "-0");
        }
      }
      g.scoredAt = Date.now();
      const now = lead(g);
      if (now && g.leader && now !== g.leader && (g.period >= 2 || g.as + g.hs >= 30)) wantSign(g, "lead", now);
    }
    if (before.state === "in" && g.state === "in" && before.period >= 4 && g.period > before.period) wantSign(g, "ot", null);
    if (before.state === "in" && g.state === "post" && /FINAL/.test(g.status)) wantSign(g, "final", null);
  }
  if (lead(g)) g.leader = lead(g);
  if (g.state !== "in") { g.run = null; g.runPts = 0; }
  if (inBreak(g)) g.breakSince = g.breakSince || Date.now();
  else g.breakSince = 0;
  if (isHalf(g)) g.half_since = g.half_since || Date.now();
  games.set(id, g);
}

// Timeouts left and team fouls, for the game the app stays on. { homeTimeouts: { timeoutsRemainingCurrent },
// homeFouls: { teamFoulsCurrent, foulsToGive, bonusState }, away... } - read from a finished game; what the feed
// writes in bonusState while a game is on has not been seen yet, so the count decides: from the fifth team foul
// of a quarter the other side shoots.
let sitDue = 0;

async function loadSituation(id) {
  const s = await getJsonAny(LIST_HOSTS, CORE + "/" + id + "/competitions/" + id + "/situation");
  const g = games.get(id);
  if (!g) return;
  const num = (o, k) => (o && typeof o[k] === "number" ? o[k] : undefined);
  g.to_a = num(s.awayTimeouts, "timeoutsRemainingCurrent");
  g.to_h = num(s.homeTimeouts, "timeoutsRemainingCurrent");
  g.foul_a = num(s.awayFouls, "teamFoulsCurrent");
  g.foul_h = num(s.homeFouls, "teamFoulsCurrent");
}

function isHalf(g) {
  return g.state === "in" && /half/i.test(g.detail + g.status);
}

/** In the last hour before its tip-off. */
function soon(g) {
  return g.state === "pre" && !off(g) && g.start - Date.now() <= SOON_MS;
}

/** Postponed or cancelled: it will not be played today. */
function off(g) {
  return /POSTPON|CANCEL|FORFEIT/.test(g.status);
}

function isOn(g) {
  return g.state === "in" || soon(g);
}

/** Halftime, the end of a quarter, a delay: the game is on but the clock does not run. */
function inBreak(g) {
  if (g.state !== "in") return false;
  return g.status !== "STATUS_IN_PROGRESS" || /^end /i.test(g.last) || /half|end of/i.test(g.detail);
}

function followed(g) {
  return TEAMS.indexOf(g.away) !== -1 || TEAMS.indexOf(g.home) !== -1;
}

/** How long a game's data stays good. */
function goodFor(g) {
  if (g.state === "in") return scoresUp && (g.id === mainId || g.id === onScreen) ? 8000 : 30000;
  // about to start, or due and the feed still says "to come": looked at often, so that the start is seen at once
  if (g.state === "pre" && scoresUp && !off(g) && g.start - Date.now() < 120000 && Date.now() - g.start < 1800000) return 10000;
  if (g.state !== "post" && Math.abs(g.start - Date.now()) < 4 * 3600000) return 60000;
  return g.state === "post" ? 1800000 : 600000;
}

/** The game that most needs a fresh look, or null. Tomorrow's games only once today is done. */
function staleGame(now) {
  let pick = null, worst = -1;
  const upTo = todayDone() ? gameIds.length : todayIds.length;
  for (let i = 0; i < upTo; i++) {
    const id = gameIds[i];
    const f = fetched.get(id);
    if (f && now < f.hold) continue;
    const g = games.get(id);
    let late;
    if (!g) {
      late = 1e12 - i;                           // never seen: first, in list order
    } else {
      late = now - f.at - goodFor(g);
      if (late < 0) continue;
      if (followed(g)) late += 1e9;
      if (id === mainId || id === onScreen) late += 2e9;
    }
    if (late > worst) {
      worst = late;
      pick = id;
    }
  }
  return pick;
}

feeds.push(async (now) => {
  if (now < netPause) return false;
  if (now >= listDue || (dayKey && dayKey !== leagueDay(now))) {
    listDue = now + (gameIds.length ? 600000 : 0);                  // if it fails: again after the pause
    await loadList();
    listDue = Date.now() + 3 * 3600000;
    return true;
  }
  const main = games.get(mainId);
  if (main && main.state === "in" && scoresUp && now >= sitDue) {
    sitDue = now + 20000;
    try {
      await loadSituation(mainId);
    } catch (err) {
      sitDue = now + 60000;                      // an extra: the strip does without it
    }
    return true;
  }
  const id = staleGame(now);
  if (id) {
    fetched.set(id, { at: (fetched.get(id) || { at: 0 }).at, hold: 0 });
    await loadGame(id);
    fetched.set(id, { at: Date.now(), hold: 0 });
    return true;
  }
  if (nextProbe && nextProbe <= 4 && todayDone() && now >= nextDue) {             // the next day that has games
    const ids = await idsFor(leagueDay(now, nextProbe));
    if (ids.length) {
      setLists(dayKey, todayIds, ids);
      nextProbe = 0;
    } else if (++nextProbe > 4) {
      nextProbe = 1;
      nextDue = now + 3600000;                   // nothing in four days: look again in an hour
      nothingAhead = true;
    }
    return true;
  }
  return seasonFeed(now);                        // no game needs a look: is the season over?
});

let nothingAhead = false;           // no game today and none found in the next four days

// ---------- when the season is over ----------
// No game today and none in the next four days: the app asks how the postseason ended. Three small requests - how
// many games the postseason has (175 bytes), the last of them (175 bytes), then that game like any other (14 KB): it
// is the last game of the Finals when its note says "NBA Finals" and its series is marked as completed, and the
// series' games won by each side are in it. One more (1 KB) for the countdown: when the next regular season starts
// (not there until the league has set it). If any of this is missing, nothing changes: "NO GAMES / THIS WEEK".
//   up to 30 days after the last game of the Finals:  the champions' banner - gilded: a gold cup before a sunburst,
//                                                     the winner's mark and name - taking turns with the Finals'
//                                                     result (games won), in the same gold
//   after that, until games are listed again:         "SEASON IS OVER / OFFSEASON", taking turns with the days to
//                                                     the next tip-off
const CHAMP_MS = 30 * 86400000;
let season = null;                  // { win, names, year, away, home, wa, wh: games won, at: when the last game was played, tip: next season's start or 0 }
let seasonDue = 0, seasonAsked = false;

function seasonNow() {
  return Date.now();
}

function quiet() {
  return listLoaded && gameIds.length === 0 && nothingAhead;
}

async function loadSeason() {
  const now = new Date(seasonNow());
  // the league names a season by the year it ends in; from November on, the one that has just begun is meant
  const year = now.getUTCFullYear() + (now.getUTCMonth() >= 10 ? 1 : 0);
  const base = "/v2/sports/basketball/leagues/nba/seasons/";
  const first = await getJsonAny(LIST_HOSTS, base + year + "/types/3/events?limit=1");
  const n = first.count;
  if (!(n >= 1)) return null;                    // that postseason has no games yet
  const list = n === 1 ? first : await getJsonAny(LIST_HOSTS, base + year + "/types/3/events?limit=1&page=" + n);
  const m = /\/events\/(\d+)/.exec((((list.items || [])[0]) || {}).$ref || "");
  if (!m) return null;
  const e = await getJsonAny(GAME_HOSTS, GAME_PATH + m[1]);
  const comp = e.competitions[0], st = e.status || comp.status, c = comp.competitors;
  const ser = comp.series || {}, sc = ser.competitors || [];
  const note = String((((comp.notes || [])[0]) || {}).headline || "");           // "NBA Finals - Game 5"
  if (st.type.state !== "post" || c.length !== 2 || sc.length !== 2 || ser.completed !== true || !/NBA Finals/i.test(note)) return null;
  const side = (which) => c[c[0].homeAway === which ? 0 : 1];
  const won = (team) => {                        // the games this side won in the series
    for (let i = 0; i < sc.length; i++) {
      if (String(sc[i].id) === String(team.team.id) && typeof sc[i].wins === "number") return sc[i].wins;
    }
    return -1;
  };
  const away = side("away"), home = side("home"), wa = won(away), wh = won(home);
  if (wa < 0 || wh < 0 || wa === wh) return null;
  const w = wa > wh ? away : home;
  const clean = (name) => String(name || "").toUpperCase().replace(/[^A-Z0-9 ]/g, "");
  const got = { win: codeOf(w), year: year, at: utc(e.date), tip: 0,
    names: [clean(w.team.name), clean(w.team.location), codeOf(w).slice(0, 3)],   // as the feed writes them
    away: codeOf(away), home: codeOf(home), wa: wa, wh: wh };
  try {
    got.tip = utc((await getJsonAny(LIST_HOSTS, base + (year + 1) + "/types/2")).startDate);
  } catch (err) {
    // the next season is not in the feed yet: no countdown
  }
  return got;
}

/** Asked for when the games need nothing (see the feed above). */
async function seasonFeed(now) {
  if (now < seasonDue || !quiet()) return false;
  seasonDue = now + 600000;                      // if it fails: again in ten minutes, without the whole app backing off
  try {
    season = await loadSeason();
    seasonDue = Date.now() + 6 * 3600000;
  } catch (err) {
    report("season", err);
  }
  seasonAsked = true;
  return true;
}

/** What the carousel shows while the season is out, or null: not games but pages, each a "game" with a `kind`. They
 *  take turns like the games do, with the same blind between them.
 *    the champions' banner <-> the Finals' result, in the same gold   (for 30 days after the last game)
 *    "SEASON IS OVER / OFFSEASON" <-> the days to the tip-off         (after that; the countdown once the date is known) */
function seasonItems() {
  if (!season || !quiet()) return null;
  const now = seasonNow(), page = (kind) => ({ id: kind, kind: kind, state: "post", away: "", home: "", start: 0 });
  if (now - season.at < CHAMP_MS) return [page("champ"), page("title")];
  return season.tip > now ? [page("off"), page("tip")] : [page("off")];
}

function allGames() {
  const all = [];
  for (let i = 0; i < gameIds.length; i++) {
    const g = games.get(gameIds[i]);
    if (g) all.push(g);
  }
  return onlyMine && all.some(followed) ? all.filter(followed) : all;
}

const byStart = (a, b) => a.start - b.start || (a.id < b.id ? -1 : 1);

/** The carousel away from game `home`: the other games that are on, the finished ones, the ones to come - in each
 *  part the followed team's game first. */
function carousel(home) {
  const out = seasonItems();                     // the season is out: the banner / the offseason card, not games
  if (out) return out;
  const all = allGames().filter((g) => !home || g.id !== home.id);
  const mineFirst = (a, b) => followed(b) - followed(a) || byStart(a, b);
  return all.filter(isOn).sort(byStart)
    .concat(all.filter((g) => g.state === "post").sort(mineFirst))
    .concat(all.filter((g) => g.state === "pre" && !soon(g)).sort(mineFirst));
}

/** The game the app starts on and falls back to: the followed team's if it is on, else the first one on. */
function firstOn() {
  const on = allGames().filter(isOn).sort(byStart);
  const mine = on.filter(followed).sort((a, b) => (b.state === "in") - (a.state === "in"));
  return mine[0] || on[0] || null;
}

// ---------- the strip ----------
function mod(a, n) {
  return ((a % n) + n) % n;
}

function lineColour(code) {
  return D.line[code] || "#C8CDD2";
}

/** One end of the strip: the glow in the team's colour (full, or dim for the team that lost) with its mark on it -
 *  one picture of 30 columns made by the build: our own drawing on rows 1-8, the letters on 10-14.
 *  A team the build does not know gets the plain grey mark and its letters from the feed. */
function cap(els, id, code, side, strong) {
  const known = !!D.team[code];
  els.push(image(id, "images/team_" + (known ? code : "XXX") + "_" + side + (strong ? 1 : 0) + (teamsAsText ? "t" : "") + ".png", side === "a" ? 0 : 42, 0, 0, 30));
  if (!known) els.push(text(id + "n", code.slice(0, 3), "small", side === "a" ? 7 : 65, 8, "#ECEEF2FF", "top_mid"));
}

// The marks keep columns 0-13 and 58-71, the middle block 28-43 (wide enough for "12:00"); each score has the
// twelve columns between, 15-26 and 45-56.
const ROOM = [[15, 26], [45, 56]];

/** A score as a bitmap in the bar's own digits (D.dg, read off the bar's fonts): the normal font while both
 *  scores are under 100; from 100 the condensed one with every 1 slim, at most twelve columns wide - what there
 *  is. Centred in its room, the odd pixel on the mark's side. Rows 5-11, the middle of the strip's height: the
 *  team's letters (rows 10-14) never leave their mark's 14 columns, so the two do not meet. */
function score(id, n, side, colour, tight) {
  const s = String(n);
  const lines = ["", "", "", "", "", "", ""];
  for (let i = 0; i < s.length; i++) {
    const d = s.charCodeAt(i) - 48;
    const slim = tight && d === 1;
    const glyph = slim ? D.dg.one : (tight ? D.dg.c : D.dg.n)[d], w = slim ? 2 : tight ? 4 : 5;
    for (let y = 0; y < 7; y++) {
      for (let x = w - 1; x >= 0; x--) lines[y] += glyph[y] >> x & 1 ? "a" : ".";
      if (i < s.length - 1) lines[y] += ".";
    }
  }
  const w = lines[0].length, room = ROOM[side];
  const spare = Math.max(0, room[1] - room[0] + 1 - w);
  const x = room[0] + (spare >> 1) + (side === 0 ? spare % 2 : 0);
  return { id: id, type: "xpmbitmap", x: x, y: 5, align: "top_left", timeout: T, z_index: 4,
    data: "! XPM2\n" + w + " 7 2 1\n. c none\na c " + colour + "\n" + lines.join("\n") };
}

function mixHex(a, b, k) {
  let out = "#";
  for (let i = 1; i < 7; i += 2) {
    const x = parseInt(a.slice(i, i + 2), 16), y = parseInt(b.slice(i, i + 2), 16);    // (the bar has no substr)
    out += ("0" + Math.round(x + (y - x) * k).toString(16).toUpperCase()).slice(-2);
  }
  return out;
}

// The bottom line keeps to the columns between the two teams' letters: 16-55, twenty a side of the middle.
const LINE_X = 16, LINE_HALF = 20;

/** Seconds left on a game clock as the feed writes it ("7:42", "42.3"); null when it cannot be read. */
function clockSecs(str) {
  const parts = String(str || "").split(":");
  const n = parts.length > 1 ? parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10) : parseInt(parts[0], 10);
  return n !== n ? null : n;                    // (NaN: not a number)
}

/** A line that is `part` (0-1) of its length, shrinking from both ends towards the middle, over its faint track.
 *  One colour, or one for each half. Anything above nothing keeps one pixel a side. */
function midLine(els, p, part, left, right) {
  const n = part <= 0 ? 0 : Math.max(1, Math.min(LINE_HALF, Math.ceil(LINE_HALF * part - 0.001)));
  els.push(bar(p + "hb0", LINE_X, 15, 2 * LINE_HALF, 1, "#FFFFFF1C", 1));
  if (n === 0) return;
  if (!right || right === left) els.push(bar(p + "hb1", LINE_X + LINE_HALF - n, 15, 2 * n, 1, left, 2));
  else els.push(bar(p + "hb1", LINE_X + LINE_HALF - n, 15, n, 1, left, 2), bar(p + "hb2", LINE_X + LINE_HALF, 15, n, 1, right, 2));
}

/** The quarter's time along the bottom (see the top of this file). Not drawn while the clock cannot be read. */
function quarterLine(els, p, g) {
  const left = clockSecs(g.clock);
  if (left === null) return;
  midLine(els, p, Math.min(1, left / (g.period > 4 ? 300 : 720)), lineColour(g.away) + "FF", lineColour(g.home) + "FF");
}

/** Timeouts left: seven dots over each score (row 3), in the team's colour: full while that timeout is still
 *  there, dim once called; the one nearest the mark is the last one left. The dot of a timeout that is on blinks.
 *  One small bitmap a side. Not drawn while the feed has not said how many are left. */
function timeouts(els, p, g) {
  const blink = !!g.timeout_by && Math.floor(Date.now() / 500) % 2 === 0;
  const sides = [["a", "away", 14, g.to_a, g.away], ["h", "home", 45, g.to_h, g.home]];
  for (let n = 0; n < 2; n++) {
    const have = sides[n][3];
    if (typeof have !== "number") continue;
    const colour = lineColour(sides[n][4]);
    let cells = "";
    for (let i = 0; i < 7; i++) {
      const k = n === 0 ? i : 6 - i;             // k = 0 is the dot nearest the mark
      cells += (k < have || (blink && g.timeout_by === sides[n][1] && k === have) ? "a" : "b") + (i < 6 ? "." : "");
    }
    els.push({ id: p + "o" + sides[n][0], type: "xpmbitmap", x: sides[n][2], y: 3, align: "top_left", timeout: T, z_index: 4,
      data: "! XPM2\n13 1 3 1\n. c none\na c " + colour + "\nb c " + mixHex("#000000", colour, 0.22) + "\n" + cells });
  }
}

function periodName(g) {
  return g.period > 5 ? (g.period - 4) + "OT" : g.period === 5 ? "OT" : "Q" + Math.max(1, g.period);
}

/** The middle of a game that is being played: two short lines. */
function middle(els, p, g) {
  const now = Date.now();
  if (now - g.at > STALE_MS) {                   // no fresh numbers for a while: the quarter goes grey, the clock blank
    els.push(text(p + "m1", periodName(g), "small", 36, 0, FAINT, "top_mid"), text(p + "m2", "--:--", "small", 36, 7, FAINT, "top_mid"));
    return;
  }
  if (/DELAY|SUSPEND/.test(g.status)) {
    els.push(text(p + "m1", "Delay", "small", 36, 4, WARN, "top_mid"));
    return;
  }
  if (inBreak(g)) {                              // the end of a quarter
    els.push(text(p + "m1", "End", "small", 36, 0, LIVE, "top_mid"), text(p + "m2", periodName(g), "small", 36, 7, SOFT, "top_mid"));
    return;
  }
  if (g.timeout_by) {                            // a timeout is on: "T/O" and the quarter take turns over the clock
    const tick = Math.floor(now / 1000) % 2 === 0;
    els.push(text(p + "m1", tick ? "T/O" : periodName(g), "small", 36, 0, tick ? WARN : LIVE, "top_mid"),
      text(p + "m2", g.clock, "small", 36, 7, SOFT, "top_mid"));
    return;
  }
  // quarter and clock for five seconds; then, three seconds each, what there is to add
  const extra = [];
  if (g.run && g.runPts >= RUN_SHOWN) extra.push("run");
  if (typeof g.foul_a === "number" && typeof g.foul_h === "number" && (g.foul_a >= 4 || g.foul_h >= 4)) extra.push("foul");
  const slot = Math.floor(now / 1000) % (5 + 3 * extra.length);
  const what = slot < 5 ? "" : extra[Math.floor((slot - 5) / 3)];
  if (what === "run") {
    els.push(text(p + "m1", g.run === "away" ? g.away : g.home, "small", 36, 0, WHITE, "top_mid"),
      text(p + "m2", g.runPts + "-0", "small", 36, 7, WARN, "top_mid"));
  } else if (what === "foul") {                  // away - home, like the strip; yellow = the other side shoots
    const a = String(Math.min(9, g.foul_a)), h = String(Math.min(9, g.foul_h));
    const w = smallWidth(a) + 1 + 2 + 1 + smallWidth(h), x0 = 36 - (w >> 1);
    els.push(text(p + "m1", "Foul", "small", 36, 0, SOFT, "top_mid"),
      text(p + "m2", a, "small", x0, 7, g.foul_a >= 5 ? WARN : WHITE),
      text(p + "m3", "-", "small", x0 + smallWidth(a) + 1, 7, FAINT),
      text(p + "m4", h, "small", x0 + smallWidth(a) + 4, 7, g.foul_h >= 5 ? WARN : WHITE));
  } else {
    els.push(text(p + "m1", periodName(g), "small", 36, 0, LIVE, "top_mid"), text(p + "m2", g.clock, "small", 36, 7, SOFT, "top_mid"));
  }
}

/** One of the pages of the season's end (seasonItems). */
function seasonEls(g, p) {
  if (g.kind === "champ") {
    // The banner is one animation the bar plays by itself: first a gold plate over everything, then
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
    // The Finals, dressed like the banner: both marks and the series - the games each side won, the winner's in
    // gold and the loser's in dull gold, a dash between them - under an animation with the same gold lines, FINAL
    // in gold and stars round the winner's number (champ2.anim). The numbers stand low, under the word.
    const awayWon = season.wa > season.wh, els = [];
    cap(els, p + "ta", season.away, "a", awayWon);
    cap(els, p + "th", season.home, "h", !awayWon);
    els.push({ id: p + "ch", type: "animation", path: "animations/champ2.anim", x: 0, y: 0, align: "top_left", loop: true,
      section: awayWon ? "away" : "home", timeout: STILL, z_index: 6, _w: 72 });
    const win = "#FFD45A", lose = "#8E6E2C";
    const a = score(p + "sa", season.wa, 0, awayWon ? win : lose, false), h = score(p + "sh", season.wh, 1, awayWon ? lose : win, false);
    a.y = h.y = 7;
    a.z_index = h.z_index = 5;
    els.push(a, h, bar(p + "sd", 34, 10, 4, 1, lose + "FF", 5));
    return els;
  }
  if (g.kind === "tip") {
    const days = Math.ceil((season.tip - seasonNow()) / 86400000);
    return [text(p + "m1", "NEXT TIP-OFF", "small", 36, 0, FAINT, "top_mid"),
      text(p + "m2", days <= 1 ? "TOMORROW" : "IN " + days + " DAYS", "small", 36, 7, WHITE, "top_mid")];
  }
  return [image(p + "cd", "images/card_off.png", 0, 0, 0, 72)];
}

function gameEls(g, p) {
  if (g && g.kind) return seasonEls(g, p);       // a page of the season's end, not a game
  if (!g) {                                      // nothing to show: say why
    if (listLoaded && gameIds.length === 0 && nothingAhead && seasonAsked && !seasonItems()) {   // (not before we know whether the season is over)
      return [image(p + "cd", "images/card_noweek.png", 0, 0, 0, 72)];        // "NO GAMES / THIS WEEK"
    }
    if (offline && fails > 0 && games.size === 0) {
      // A request has really failed and there is nothing to show: the bar's Wi-Fi is down ("NO WI-FI"), or it is
      // up and the hosts do not answer ("NO DATA / RETRYING").
      return [image(p + "cd", "images/card_" + (wifiUp ? "nodata" : "nowifi") + ".png", 0, 0, 0, 72)];
    }
    return [text(p + "e", D.name, "small", 36, 4, FAINT, "top_mid")];         // nothing has answered yet: the name, quietly
  }
  const over = g.state === "post";
  const loseA = over && g.as < g.hs, loseH = over && g.hs < g.as;
  const els = [];
  cap(els, p + "ta", g.away, "a", !loseA);
  cap(els, p + "th", g.home, "h", !loseH);
  if (off(g)) {                                  // postponed, cancelled
    els.push(text(p + "m1", /CANCEL/.test(g.status) ? "Cancelled" : "Postponed", "small", 36, 2, SOFT, "top_mid"));
    return els;
  }
  if (soon(g)) {
    // The last hour before tip-off: the in-game layout already, 0 - 0 in faint white, "Tip" over a countdown to
    // the scheduled time, and the bottom line: the hour that is left as ONE length, shrinking from both ends towards the middle.
    // Green, with a light running along each half to the middle (flow_g.anim), down to five minutes before; then
    // what is left of it in the middle turns orange and breathes slowly (the clock turns orange too), and in the
    // last minute red, breathing fast.
    const left = Math.max(0, Math.floor((g.start - Date.now()) / 1000));
    const hot = left <= 60 ? "#FF4A3AFF" : left <= 300 ? "#FF9A1AFF" : null;
    const part = Math.min(1, left * 1000 / SOON_MS);          // one scale for the whole hour
    if (left > 0) {
      els.push(text(p + "m1", "Tip", "small", 36, 0, LIVE, "top_mid"),
        text(p + "m2", Math.floor(left / 60) + ":" + pad2(left % 60), "small", 36, 7, hot || WHITE, "top_mid"));
    } else {
      els.push(text(p + "m1", "Soon", "small", 36, 4, LIVE, "top_mid"));     // due, and the feed has not started it yet
    }
    els.push(score(p + "sa", 0, 0, "#666666", false), score(p + "sh", 0, 1, "#666666", false));
    midLine(els, p, 0);                          // (the faint track)
    if (left > 0) {
      const c = left <= 60 ? "r" : left <= 300 ? "o" : "g";
      els.push({ id: p + "hf" + c, type: "animation", path: "animations/flow_" + c + ".anim", x: LINE_X, y: 15, align: "top_left",
        loop: true, section: "n" + Math.max(1, Math.min(LINE_HALF, Math.ceil(LINE_HALF * part))), timeout: STILL, z_index: 2,
        _w: 2 * LINE_HALF });
    }
    return els;
  }
  if (g.state === "pre") {
    // To come: the tip-off time on top (rows 1-7) and the day under it, one row above the two teams' letters:
    // two dark rows are left under the day, so that nothing in the middle sits on the bottom edge.
    const lt = local(g.start), today = local();
    const same = lt.getUTCFullYear() === today.getUTCFullYear() && lt.getUTCMonth() === today.getUTCMonth() &&
      lt.getUTCDate() === today.getUTCDate();
    const hour = (lt.getUTCHours() % 12 || 12) + ":" + pad2(lt.getUTCMinutes());
    const ampm = lt.getUTCHours() < 12 ? "AM" : "PM";
    const hw = textWidth(hour, "bold");
    const x0 = 36 - ((hw + 2 + smallWidth(ampm)) >> 1);
    const hh = hour.split(":")[0];
    const cx = x0 + textWidth(hh, "bold") + 1;
    els.push(text(p + "m2", hh, "bold", x0, -1, WHITE), text(p + "mc", ":", "bold", cx, -1, WHITE),
      text(p + "mm", hour.split(":")[1], "bold", cx + 2, -1, WHITE), text(p + "m3", ampm, "small", x0 + hw + 2, 1, FAINT),
      text(p + "m1", same ? "Today" : DAYS[lt.getUTCDay()], "small", 36, 7, SOFT, "top_mid"));
    return els;
  }
  const tight = g.as >= 100 || g.hs >= 100;
  els.push(score(p + "sa", g.as, 0, loseA ? "#666666" : "#FFFFFF", tight), score(p + "sh", g.hs, 1, loseH ? "#666666" : "#FFFFFF", tight));
  if (over) {
    // "Final" stands over the middle, a little above the scores: with two scores over 100 only one column is left
    // on either side of the word, and on the scores' own rows that reads as one string. Under it the overtime.
    els.push(text(p + "m1", "Final", "small", 36, -1, SOFT, "top_mid"));
    if (g.period > 4) els.push(text(p + "m2", periodName(g), "small", 36, 7, FAINT, "top_mid"));
    return els;
  }
  if (isHalf(g)) {
    // Halftime: "Half" over an estimated countdown (the feed has no halftime clock: fifteen minutes from the
    // moment we first saw it), and the bottom line shrinks to the middle as the break runs out. Past the estimate:
    // only "Half".
    const left = g.half_since ? HALFTIME_MS - (Date.now() - g.half_since) : 0;
    midLine(els, p, left > 0 ? left / HALFTIME_MS : 0, "#45E06FB0");
    if (left > 0) {
      const sec = Math.floor(left / 1000);
      els.push(text(p + "m1", "Half", "small", 36, 0, LIVE, "top_mid"),
        text(p + "m2", Math.floor(sec / 60) + ":" + pad2(sec % 60), "small", 36, 7, SOFT, "top_mid"));
    } else {
      els.push(text(p + "m1", "Half", "small", 36, 4, LIVE, "top_mid"));
    }
    return els;
  }
  middle(els, p, g);
  timeouts(els, p, g);
  quarterLine(els, p, g);
  return els;
}

function slide(els, dir) {
  return change(els, dir >= 0 ? -1 : 1, false);  // coming from the right = drawn from right to left
}

function sameGame(a, b) {
  return (a ? a.id : null) === (b ? b.id : null);
}

// ---------- the signs ----------
// The animation is a new element: the bar shows it above everything at once, and it opens with frames that hide
// the screen. Meanwhile the plate - one rectangle in the team's colour, made off-screen first - is moved in under
// it; what the app writes itself (the run's numbers, the team's letters) follows a moment later, above the
// animation, with its own one-pixel shadow. The sign leaves behind the same blind that changes the games.
// Who did it, like on TV: when the feed names the shooter of a three, the word gives way to his line on the same
// plate - a second animation (sign_who: the plate's shading again, after a hit of white) covers the moment the word
// is taken away, and the app's own elements, made off-screen with the plate, are moved in: the jersey number on a
// dark patch at the left, the name beside it. It stands for a second and a half.
const SIGN_Z = 2147480000;
const WHO_AFTER = 700, WHO_STAY = 1500;         // ms the word stands before the name comes, ms the name stands

/** The shooter's line as elements: the number in the largest digits on a patch of the team's darkest shade, the
 *  name beside it in the widest of the bar's fonts that fits (bold, normal, small). A name too long even for the
 *  small letters: one in two parts (GILGEOUS-ALEXANDER) goes on two lines beside the number; one long word
 *  (ANTETOKOUNMPO) gets the whole width of the bottom line, under a smaller number and the word; and if that is
 *  not enough either, letters go from its end. */
function whoEls(who, shade) {
  const els = [];
  const line = (id, str, font, x, y, colour) => {
    els.push({ id: id + "s", type: "text", text: str, font: font, x: x + 1, y: y + 1, align: "top_left", color: shade,
      timeout: T, z_index: SIGN_Z + 5 }, { id: id, type: "text", text: str, font: font, x: x, y: y, align: "top_left",
      color: colour || WHITE, timeout: T, z_index: SIGN_Z + 6 });
  };
  const patch = (font, tall, y) => {             // the number on its patch; returns the column the name starts at
    if (!who.num) return 3;
    const wn = textWidth(who.num, font);
    els.push({ id: "zz_w0", type: "rectangle", x: 1, y: 1, width: wn + 6, height: tall, fill: "solid", fill_colors: [shade],
      border_width: 0, timeout: T, z_index: SIGN_Z + 5 }, { id: "zz_w1", type: "text", text: who.num, font: font,
      x: 4, y: y, align: "top_left", color: WHITE, timeout: T, z_index: SIGN_Z + 6 });
    return wn + 10;
  };
  let name = who.name;
  const xl = who.num ? textWidth(who.num, "extra_large") + 10 : 3, room = 70 - xl;
  const font = textWidth(name, "bold") <= room ? "bold" : textWidth(name, "normal") <= room ? "normal" : "small";
  if (!name || smallWidth(name) <= room) {       // one line beside the number
    const x = patch("extra_large", 14, 1);
    if (name) line("zz_w2", name, font, x, font === "small" ? 3 : 2);
    return els;
  }
  let cut = -1;                                  // two lines: at the last hyphen or space that leaves both parts short enough
  for (let i = 1; i < name.length - 1; i++) {
    if ((name[i] === "-" || name[i] === " ") && smallWidth(name.slice(0, i + 1)) <= room && smallWidth(name.slice(i + 1)) <= room) cut = i;
  }
  if (cut > 0) {
    const x = patch("extra_large", 14, 1);
    line("zz_w2", name.slice(0, name[cut] === " " ? cut : cut + 1), "small", x, 0);
    line("zz_w3", name.slice(cut + 1), "small", x, 7);
    return els;
  }
  const x = patch("bold", 8, -1);                // one long word: the bottom line to itself
  if (who.num) line("zz_w3", "3 POINTER", "small", x, 0, SOFT);
  while (name && smallWidth(name) > 66) name = name.slice(0, -1);
  line("zz_w2", name, "small", 3, 8);
  return els;
}

async function playSign(s, g) {
  const team = s.side === "home" ? g.home : s.side === "away" ? g.away : null;
  const name = s.kind === "run" ? "run_" + s.side[0] : s.kind;
  const plate = [], words = [];
  let who = [];
  if (team !== null) {
    plate.push({ id: "zz_s0", type: "rectangle", x: 0, y: 0, width: 72, height: 16, fill: "solid",
      fill_colors: [(D.plate[team] || "#4A5060") + "FF"], border_width: 0, timeout: T, z_index: SIGN_Z });
    const shade = (D.shade[team] || "#101018") + "FF";
    const put = (id, str, font, x, y) => {
      words.push({ id: id + "s", type: "text", text: str, font: font, x: x + 1, y: y + 1, align: "top_right", color: shade,
        timeout: T, z_index: SIGN_Z + 5 }, { id: id, type: "text", text: str, font: font, x: x, y: y, align: "top_right",
        color: WHITE, timeout: T, z_index: SIGN_Z + 6 });
    };
    if (s.kind === "run") put("zz_s1", s.text, "extra_large", 33, 1);
    if (s.kind === "lead") put("zz_s1", team.slice(0, 3), "bold", 25, 2);
    try {
      if (s.kind === "three" && s.who && D.sign.who) who = whoEls(s.who, shade);
    } catch (err) {
      who = [];                                  // the sign plays without the name
    }
  }
  const all = plate.concat(words, who);
  const anims = ["zz_s9"];
  busy = true;
  try {
    if (all.length) await post(all.map((el) => wire(el, OFF, 0)));
    const t0 = Date.now();
    await post(['{"id":"zz_s9","type":"animation","path":"animations/sign_' + name + '.anim","x":0,"y":0,"align":"top_left",' +
      '"loop":false,"section":"default","timeout":20,"z_index":' + (SIGN_Z + 3) + "}"]);
    if (plate.length) await post(plate.map((el) => wire(el)));
    if (words.length) {
      await sleep(330 - (Date.now() - t0));      // when the plate has burst open
      await post(words.map((el) => wire(el)));
    }
    if (who.length) {                            // who did it: the word goes behind a hit of white, the name comes
      await sleep(D.sign[name] + WHO_AFTER - (Date.now() - t0));
      const t1 = Date.now();
      await post(['{"id":"zz_s8","type":"animation","path":"animations/sign_who.anim","x":0,"y":0,"align":"top_left",' +
        '"loop":false,"section":"default","timeout":20,"z_index":' + (SIGN_Z + 4) + "}"]);
      anims[0] = "zz_s8";
      await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_s9"] }));
      await post(who.map((el) => wire(el)));
      await sleep(Math.min(WHO_STAY, D.sign.who - 100 - (Date.now() - t1)));
    } else {
      await sleep(D.sign[name] + 1300 - (Date.now() - t0));
    }
    await post([cardAnim("zz_c1", "roll_up_in", 0)]);
    await sleep(D.roll - 30);
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: all.map((el) => el.id).concat(anims) }));
    await post([cardAnim("zz_c2", "roll_up_out", 0), cardAnim("zz_c1", "roll_up_in", OFF)]);
    await sleep(D.roll + 50);
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
  } finally {
    busy = false;
  }
}

/** Shows the strip for good. `p` starts the element ids; `enter(els)` puts the first strip on screen. */
async function hoopsPage(p, enter) {
  let shown, flip = 0, first = true, z = 0, redo = false, dir = 1;
  let how = "roll";                              // the next change: "roll" up / down, "side" ways, "open" / "close" = a title card
  for (const rec of live.values()) {             // called again while its strip is still up: carry on
    const id = rec.el.id;
    if (rec.el._bk && rec.el.x === 0 && id[0] === p && (id[1] === "a" || id[1] === "b")) {
      flip = id[1] === "a" ? 0 : 1;
      z = rec.el.z_index;
      first = false;
      shown = games.get(onScreen) || undefined;
    }
  }
  // the carousel ({ list, k, why: "auto" nothing is on | "start" }), a game a control asked for, since when the
  // game on show has been over, and when the last sign was shown
  let tour = null, jump = null, finalSince = 0, signAt = 0, kickId = null;
  scoresUp = true;
  try {
    while (!stopped) {
      // ---- which game now
      let game = null, until = Date.now() + PER_GAME;
      let main = games.get(mainId) || null;
      if (main && main.state === "post" && !finalSince) finalSince = Date.now();
      if (!main || (!isOn(main) && !(main.state === "post" && Date.now() - finalSince < FINAL_STAY))) {
        main = firstOn();                        // at the start, and when the game on show is over
        mainId = main ? main.id : null;
        finalSince = 0;
      }
      if (!main && (!tour || tour.why !== "auto")) tour = { list: carousel(null), k: 0, why: "auto" };
      if (main && tour && tour.why === "auto") tour = null;                     // a game has come on
      if (jump) {
        game = jump;
        jump = null;
      } else if (tour) {
        if (tour.k >= tour.list.length) {
          if (tour.why === "start") {            // one round by hand, and back to the game behind the closing card
            tour = null;
            how = main && isOn(main) ? "close" : "roll";
          } else {                               // round again, with what there is now
            tour.list = carousel(main);
            tour.k = 0;
          }
        }
        game = tour && tour.list.length ? tour.list[tour.k++] : null;
      }
      if (!game && main) {
        game = main;
        until = main.state === "post" ? finalSince + FINAL_STAY : Infinity;     // it stays; the controls decide
      }
      const same = !first && !redo && sameGame(shown, game);
      redo = false;
      if (!same) {
        flip = 1 - flip;
        z = nextBand();
      }
      const pp = p + "ab"[flip];
      if (first) {
        await enter(lift(gameEls(game, pp), pp, z));
      } else if (!same) {
        const next = lift(gameEls(game, pp), pp, z);
        if (how === "open" || how === "close") await shutter(how, next);
        else if (how === "roll") await roll(next, dir);
      else if (how === "flip") await roll(next, 1, "flip");           // OK: only the two marks turn over
        else await slide(next, dir);
        z = bandOf(pp);                          // a roll puts the strip under the old one: its band is not the asked one
      }
      how = "roll";                              // by itself the strip moves on upwards
      dir = 1;
      first = false;
      shown = game;
      onScreen = game ? game.id : null;
      let full = 0;
      // ---- stay on it
      while (!stopped) {
        const t0 = Date.now();
        if (game) game = shown = games.get(game.id) || game;
        main = games.get(mainId) || null;
        if (game && soon(game)) {                // the game on show is counting down to its start ...
          kickId = game.id;
        } else {                                 // ... and has started: a card comes down and says so
          const go = game && kickId === game.id && game.state === "in" && !tour;
          kickId = null;
          if (go) {
            await show(lift(gameEls(game, pp), pp, z));      // the game is there when the card has gone
            await notice("kick", 1800);
            ctl.turn = 0;
            ctl.ok = ctl.start = false;
            continue;
          }
        }
        if (pendingSign) {                       // a sign: only over the game the app stays on, and not too often
          const s = pendingSign;
          pendingSign = null;
          const due = s.rank >= RANK.ot || t0 - signAt >= SIGN_GAP;
          if (due && game && s.id === game.id && !tour && t0 - s.at < 30000) {
            signAt = t0;
            await show(lift(gameEls(game, pp), pp, z));      // the new score is there when the sign has gone
            await playSign(s, game);
            ctl.turn = 0;
            ctl.ok = ctl.start = false;
            continue;
          }
        }
        if (ctl.ok) {                            // OK: jerseys <-> letters only, at once
          ctl.ok = false;
          teamsAsText = !teamsAsText;
          redo = true;
          how = "flip";
          if (game) jump = game;
          break;
        }
        if (ctl.start) {                         // Start: the carousel / straight back to the game
          ctl.start = false;
          if (tour && tour.why !== "auto") {
            tour = null;
            how = main && isOn(main) ? "close" : "roll";   // behind the closing card ("BACK TO LIVE"), as
            dir = -1;                          // at the end of a round; else the game comes back down
            break;
          }
          if (tour) break;                       // nothing is on, the carousel runs anyway: its next item now
          const list = carousel(main);
          if (list.length) {
            tour = { list: list, k: 0, why: "start" };
            how = "open";
            break;
          }
          await notice("alone");
          ctl.turn = 0;
        }
        if (ctl.turn) {                          // encoder
          const turns = ctl.turn;
          ctl.turn = 0;
          dir = turns > 0 ? 1 : -1;
          const on = allGames().filter(isOn).sort(byStart);
          if (!on.length) {                      // nothing is on: say so, the carousel carries on
            await notice("none");
            ctl.turn = 0;                        // turns made meanwhile do not queue more cards
            dir = 1;
          } else if (tour && tour.list.length) { // while the carousel runs: through its items, up or down
            const k = mod(tour.k - 1 + turns, tour.list.length);
            jump = tour.list[k];
            tour.k = k + 1;
            break;
          } else {                               // the next / previous game that is on
            const at = Math.max(0, on.findIndex((g) => g.id === mainId));
            const next = on[mod(at + turns, on.length)];
            if (next.id !== mainId) {
              mainId = next.id;
              finalSince = 0;
              how = "side";                      // between the games that are on: sideways, the way the knob turned
              break;
            }
            await notice("only");
            ctl.turn = 0;
            dir = 1;
          }
        }
        if (!tour && (!main || !sameGame(main, game) || (!isOn(main) && main.state !== "post"))) break;
        if (tour && tour.why === "auto" && firstOn()) break;                    // a game has come on
        if (t0 >= until) break;
        if (!game && games.size) break;          // the first scores have arrived: show them now
        if (!game && seasonItems()) break;       // the season's end is known now: its pages
        // ---- draw
        const wait = Math.min(until - t0, 500);
        // nothing on the strip moves by itself: a few times a second is enough (a timeout's dot blinks twice a second)
        await show(lift(gameEls(game, pp), pp, z));
        await nap(game && game.timeout_by ? Math.min(wait, 250) : wait);
      }
    }
  } finally {
    scoresUp = false;
  }
}

// ===== 3. The start. =====
// Hoops: the NBA score strip on the BUSY Bar itself. While a game is on it stays on one game - the followed
// team's first; otherwise it goes round today's finished games and the ones to come.
//
// Setup (Apps > Hoops > Setup), read at start and again every 10 seconds:
//   team     "My team"         - whose game the app starts on, and the knob's press goes to
//   games    "Show"            - all games, or only my team's (all of them on a day it does not play)
//   effects  "Big play signs"  - 3 POINTER, runs, changes of lead, OVERTIME, FINAL of the game on show
// The controls are described at the top of part 2.

async function readSettings() {
  const values = await loadSettings();
  if (typeof values.team === "string" && D.team[values.team] && TEAMS[0] !== values.team) TEAMS = [values.team];
  onlyMine = values.games === "mine";
  signsOn = values.effects !== false;
}

let settingsDue = 0;
feeds.unshift(async (now) => {
  if (now >= settingsDue) {
    settingsDue = now + 10000;
    await readSettings();
  }
  return false;
});

async function main() {
  await syncTime();
  await readSettings();
  settingsDue = Date.now() + 10000;
  dataLoop();
  while (!stopped) {
    try {
      await hoopsPage("p", (els) => firstShow(els));
    } catch (err) {
      report("hoops", err);
      await sleep(500);
    }
  }
}

main();

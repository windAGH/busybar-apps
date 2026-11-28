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
let onBack = null;                  // an app may take the Back key itself: a function that returns true = "taken, the app goes on"
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
// While the bar is busy with something large from outside (a package being installed), it does not answer an app's
// requests; its own fetch gives one up after five seconds ("Inactivity timeout" - seen on the bar, 27 Nov 2026). A
// page is several requests, so a pass over it can take that long several times over, and the elements, not sent
// again in time, run out one after the other. Two things are done about it: a pass that meets an unanswered
// request is given up (show), and the next one starts afresh; and, as a net under the bar's own limit, an app can
// set how long it waits for an answer at all - from the bar itself (callWait) and from the internet (netWait), in
// ms; 0 = for as long as it takes. A request given up counts as failed (a draw is sent again at the next step, a
// look is tried again after the usual pause); its answer, should it still come, is dropped.
let callWait = 0, netWait = 0;
let unanswered = 0;                 // requests to the bar that got no answer at all, counted

function within(p, ms) {
  if (!ms) return p;
  return new Promise((done, fail) => {
    const timer = setTimeout(() => fail(new Error("no answer in " + ms + " ms")), ms);
    p.then((v) => {
      clearTimeout(timer);
      done(v);
    }, (err) => {
      clearTimeout(timer);
      fail(err);
    });
  });
}

async function call(method, path, body, type) {
  try {
    const init = body === undefined ? { method: method }
      : { method: method, headers: { "Content-Type": type || "application/json" }, body: body };
    const res = await within(fetch(API + path, init), callWait);
    const text = await within(res.text(), callWait);
    return { ok: res.ok, status: res.status, text: text };
  } catch (err) {
    unanswered++;
    return { ok: false, status: 0, text: String(err) };
  }
}

async function getJson(url) {
  const res = await within(fetch(url), netWait);
  const text = await within(res.text(), netWait);
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

/** Sends elements in requests of at most `n` (the bar refuses a request that is too long). False if one was refused. */
async function postAll(parts, n) {
  let ok = true;
  for (let i = 0; i < parts.length; i += n || 8) {
    if (!(await post(parts.slice(i, i + (n || 8))))) ok = false;
  }
  return ok;
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

/** ... and that they may not be there after all (a request of the change failed): the next pass sends them all again. */
function unsure() {
  for (const rec of live.values()) rec.t = 0;
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
  const now = Date.now(), lost = unanswered;
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
    if (unanswered !== lost) return;             // the bar is not answering: this pass is over, the next one starts afresh
  }
  await flush();
  if (partial || unanswered !== lost) return;
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
  if (await post(inOrder(els, 1).map((el) => wire(el)))) remember(els);       // (not taken as drawn when the bar refused it)
}

// ---------- the author's mark at the start ----------
// The first thing an app draws: one film over the whole screen (animations/splash.anim: the mark fades in, stands
// and fades out, and the film holds its last picture, which is black). While it plays the app reads its settings
// and what it has kept, and asks for its first numbers; when its time is over the first page takes its place.
//   splash(z) with a small z, for an app whose pages are solid and lie above it: the first page is drawn over the
//   black picture like any page over the one before, and the film is taken away underneath, unseen;
//   with a large z, for an app that changes its pages under a cover: the first page is put under the film, then
//   the film is taken away.
// Back during the film ends the app, as on the first page; whatever else was pressed or turned counts for nothing.
const SPLASH_MS = 1500;             // the film's length: 30 pictures, 20 a second
let splashUp = 0;                   // when the film was sent; 0: none is on screen

async function splash(z) {
  await post(['{"id":"zz_sp","type":"animation","path":"animations/splash.anim","x":0,"y":0,"align":"top_left",' +
    '"loop":false,"section":"default","timeout":60,"z_index":' + z + "}"]);
  splashUp = Date.now();
}

/** Waits until the film has played (a moment more: the bar starts a film a little after it is asked to) - or until
 *  Back has ended the app. A control that is used wakes the wait; it only looks at the clock again. */
async function splashEnd() {
  const end = splashUp + SPLASH_MS + 100;
  while (splashUp && !stopped && Date.now() < end) await nap(end - Date.now());
  ctl.turn = 0;
  ctl.ok = ctl.start = false;
}

/** Takes the film away: called when the first page is on screen. */
async function splashOff() {
  if (!splashUp) return;
  splashUp = 0;
  await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_sp"] }));
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
    const drawn = await post(parts);
    mark.push(Date.now() - t0);                   // new page drawn
    await drop(olds);
    mark.push(Date.now() - t0);                   // old page gone
    remember(els);
    if (!drawn) unsure();
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
    // In pieces of eight elements: both steps are out of sight (off-screen, then under the page on screen), and the
    // bar refuses a request that is too long - a whole in-game strip in one request is. If a piece is refused all the
    // same, the page is not taken as being on screen: it is drawn afresh below, piece by piece.
    const whole = (await postAll(inOrder(els, 1).map((el) => wire(el, OFF, 0)))) && (await postAll(els.map((el) => wire(el))));
    const t0 = Date.now();
    await post([cardAnim("zz_c1", way + "_in", 0)]);
    await sleep(D.roll - 30 - (Date.now() - t0));     // the request below needs about that long to take effect
    await drop(olds);
    if (whole) remember(els);
    else await show(els, true);
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
    const made = await post(inOrder(els, 1).map((el) => wire(el, 0, 32)));
    await sleep(D.card + 1000 - (Date.now() - t0));
    const moved = await post(olds.map((el) => wire(el, 0, -32)).concat(els.map((el) => wire(el))));
    await drop(olds.map((el) => el.id));
    remember(els);
    if (!made || !moved) unsure();
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
    if (onBack && onBack()) {       // (Flight: a step back, or "end the flight?")
      if (wake) wake();
      return;
    }
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
//                                      ("NYK" over "9-0"); and, only while the clock is stopped (a timeout, the
//                                      end of a quarter, a whistle), the team fouls of this quarter once a team has
//                                      four ("Foul" over "4-5", away - home, yellow from five: the other side shoots)
//     the line along the bottom        the quarter's time: full at 12:00 (5:00 in overtime) and shrinking from both
//                                      ends towards the middle as the clock runs down; it stays between the two
//                                      teams' letters (columns 16-55). In ONE colour, that of the team that has
//                                      the ball, with a light running along it towards the side that team attacks
//                                      (the away team stands on the left and plays to the right); when the ball
//                                      changes hands the line breathes - out and in again in the other colour.
//                                      While nobody is lastKnown to have it: the away team's colour on the left half,
//                                      the home team's on the right, no light - see "who has the ball" below.
//                                      Before the tip-off and at halftime the same line in green: growing as the
//                                      tip-off nears, shrinking as the break runs out
//
// A game is "on" while it is being played and, already, in the hour before its tip-off (0 - 0 and a countdown).
// The game clock is asked for every five seconds; between two looks the strip counts it down itself, once a second,
// towards the value it was last given - see "the game clock between two looks" below.
//
// The app:
//   While a game is on, the app shows ONE game and stays on it. At the start that is the followed team's game if
//   it is on, else the first game that is on: the followed team's game of the day is asked for by name and looked
//   at first, and no other game is settled on before it has been seen. (When it ends its final stays 20 seconds.)
//   When no game is on, the carousel runs by itself: today's finished games, then the ones to come - today's, or
//   the next day's that has any when today is done.
//   encoder  next / previous game that is on (sideways). While the day's games are still coming in after a start,
//            the round ends with a LOADING page, the place of the games still to come (see "the start" below).
//            With nothing on, a turn only says so ("NO GAMES ON RIGHT NOW").
//   Start    the carousel, one round, between the two title cards; Start again, or a turn of the knob, = back to
//            the game at once, behind the closing card.
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
// The game on show is looked at every five seconds; so that it really gets them, the other games that are being
// played are looked at once a minute while a game is on show (every 30 seconds while the carousel runs) - the bar
// asks one thing at a time, and on a night with ten games the others would fill the line.
// For the game the app stays on there is one more, very small request (0.6 KB) every 20 seconds: timeouts left and
// team fouls. Backup: every game from ESPN's two hosts in turn; the lists are kept in the app's
// storage and used when the list cannot be fetched on the same day; with nothing kept, the followed team's next
// game is taken from its team page. When nothing answers, the last good numbers stay on screen and the internet
// is asked again after 10 s, 20 s, 40 s ... up to 2 minutes (part 1).
const LIST_HOSTS = ["https://sports.core.api.espn.com"], CORE = "/v2/sports/basketball/leagues/nba/events";
const GAME_HOSTS = ["https://site.api.espn.com", "https://site.web.api.espn.com"];
const GAME_PATH = "/apis/site/v2/sports/basketball/nba/scoreboard/";
const STALE_MS = 150000;            // a live game's numbers older than this are shown as not fresh
// A request the bar or a host never answers is given up (see the top of the bar's part). The bar's own limit is
// five seconds; these lie above it, as the net under it.
callWait = 7000;
netWait = 15000;
let dayKey = "";                    // the league day the lists belong to, "20261125"
let todayIds = [], nextIds = [], gameIds = [];
const games = new Map();            // id -> game
const fetched = new Map();          // id -> { at: when we last have it from, hold: do not ask again before }
let listLoaded = false, listDue = 0, nextProbe = 0, nextDue = 0;
// The followed team's games of the league day (ids; none: it does not play) - null while that is not lastKnown yet - and
// the day and team they were asked for. Asked for by the team's name (0.2 KB), right after the day's list.
let mineIds = null, mineFor = "";

/** The followed team plays today and its game has not been looked at yet (or whether it plays is not lastKnown yet). */
function mineToCome() {
  if (mineIds === null) return true;
  for (let i = 0; i < mineIds.length; i++) if (!games.get(mineIds[i])) return true;
  return false;
}

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
  keepDay();
}

// What the app knew of each game when it last looked: id -> [state, tip-off]. Kept with the day's lists (day.json)
// and read at the next start, so that the games that are being played can be asked for first - see firstLooks.
let lastKnown = {}, lastRead = false, lastDirty = false, keepDue = 0;

function keepDay() {
  const st = {};
  for (let i = 0; i < gameIds.length; i++) if (lastKnown[gameIds[i]]) st[gameIds[i]] = lastKnown[gameIds[i]];
  lastDirty = false;
  call("POST", "storage/write?path=/ext/data/day.json", JSON.stringify({ day: dayKey, today: todayIds, next: nextIds, st: st }),
    "application/octet-stream");
}

/** Every game of today has been looked at once: the first round after a start is over. It also counts as over 45
 *  seconds after the day's games became known - a game that cannot be had must not hold up the rest. */
let roundUntil = 0;

function allSeen() {
  if (!roundUntil) return false;                 // which games there are is not known yet
  if (Date.now() > roundUntil) return true;
  for (let i = 0; i < todayIds.length; i++) if (!games.get(todayIds[i])) return false;
  return true;
}

// The first round after a start: in which order the games never seen are asked for. One game takes the bar over a
// second, a day has up to fifteen: a game that is being played should be among the first two or three.
//   the followed team's game first; then the games that were being played when the app last ran, and the ones that
//   were to start by now; with nothing kept, the list itself helps: it comes in the order of the tip-offs, so the
//   games being played lie between the last one found over and the first one found still to come - next to a game
//   found being played, or else half-way between those two; last the ones lastKnown to be over, and the ones for later.
// Returns a number per place in the list, higher = sooner (all under 1e12).
function firstLooks(now) {
  const n = todayIds.length, live = [], out = [];
  let lo = -1, hi = n;
  for (let i = 0; i < n; i++) {
    const g = games.get(todayIds[i]), k = lastKnown[todayIds[i]];
    const state = g ? (isOn(g) ? "in" : g.state) : k ? (k[0] === "pre" && k[1] < now ? "in" : k[0]) : "";
    if (state === "in") live.push(i);
    else if (state === "post") lo = i;
    else if (state === "pre" && hi === n) hi = i;
  }
  for (let i = 0; i < gameIds.length; i++) {
    const id = gameIds[i], k = lastKnown[id];
    let v;
    if (mineIds && mineIds.indexOf(id) !== -1) v = 9e11;
    else if (k && k[0] === "in") v = 8e11;
    else if (k && k[0] === "pre") v = k[1] < now + 3600000 ? 7e11 - Math.abs(now - k[1]) / 1000 : 1e11;
    else if (k) v = 2e11;
    else if (i >= n) v = 5e10;
    else if (live.length) {
      let d = n;
      for (let j = 0; j < live.length; j++) d = Math.min(d, Math.abs(i - live[j]));
      v = 6e11 - d * 1e9;
    } else v = (i > lo && i < hi ? 5e11 : 3e11) - Math.abs(i - (lo + hi) / 2) * 1e9;
    out.push(v - i);
  }
  return out;
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
      lastKnown = old.st || lastKnown;
    } else {                                     // nothing kept either: at least the followed team's next game
      const team = await getJsonAny(GAME_HOSTS, "/apis/site/v2/sports/basketball/nba/teams/" + (D.espn[TEAMS[0]] || "ny"));
      const next = (team.team && team.team.nextEvent) || [];
      dayKey = day;
      todayIds = next.map((e) => String(e.id)).filter((id) => /^\d+$/.test(id));
      nextIds = [];
    }
    gameIds = todayIds.concat(nextIds);
    if (gameIds.length && !roundUntil) roundUntil = Date.now() + 45000;
    throw err;                                   // still a failure (it is tried again), but the games can be asked for
  }
  if (dayKey && dayKey !== day) lastKnown = {};   // a new day: nothing is known of its games
  setLists(day, today, dayKey === day ? nextIds.filter((id) => today.indexOf(id) === -1) : []);
  if (!nextIds.length) nextProbe = 1;            // the next day with games is looked for when it is wanted
  listLoaded = true;
  if (!roundUntil) roundUntil = Date.now() + 45000;
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
    // (no quote inside a regular expression: the bar's engine is only lastKnown to read them without)
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
    timeout_by: null, ball: null, playAt: 0, playClock: "",
  };
  const by = String((lp.team && lp.team.id) || "");
  const lastBy = by && by === String(t.away.team.id) ? "away" : by && by === String(t.home.team.id) ? "home" : null;
  if (/timeout/i.test(g.last) && g.state === "in") g.timeout_by = lastBy || "tv";
  const before = games.get(id);
  const same = before && before.state === "in" && before.period === g.period;
  const fresh = !(same && before.play === g.play);
  g.playAt = fresh ? g.at : before.playAt;       // when this play was first seen, and the clock then
  g.playClock = fresh ? g.clock : before.playClock;
  // The timeout stays the feed's last play until the next play comes, long after the game has gone on: once the
  // clock has moved from where it stood when the timeout was called, the timeout is over.
  if (g.timeout_by && g.clock !== g.playClock) g.timeout_by = null;
  setTick(g, before);                            // from where the shown clock counts down to this look's value
  setBall(g, same ? before : null, fresh, lp, lastBy);       // who has the ball, as far as the last play tells
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
  if (!lastKnown[id] || lastKnown[id][0] !== g.state) {  // (kept for the next start, when it changes)
    lastKnown[id] = [g.state, g.start];
    lastDirty = true;
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

// ---------- the start: the name, then LOADING, then the strip ----------
// After the author's mark the app shows its name, then a page that says it is waiting: the word LOADING over the
// line of the hour before a game, its light running. That page stays until the game the app will stay on is known
// and has been looked at - the followed team's if it is on, else the first one found on - or until it is clear
// that nothing is on (the games come in the order of their starts: once every game between the last one found
// over and the first one found still to come has been looked at, none is being played) and the carousel can
// begin. Not for the whole day: the other games come in behind the strip. Until then no game is shown, not
// the followed team's finished one either, and no control but Back does anything.
const NAME_MS = 1000;               // how long the name stands before LOADING takes its place
let nameSince = 0, startDone = false;

/** A game that has not been looked at may still be one that is being played. */
function bandOpen() {
  const n = todayIds.length;
  let lo = -1, hi = n;
  for (let i = 0; i < n; i++) {
    const g = games.get(todayIds[i]);
    if (g && g.state === "post") lo = i;
    else if (g && g.state === "pre" && !isOn(g) && hi === n) hi = i;
  }
  for (let i = lo + 1; i < hi; i++) if (!games.get(todayIds[i])) return true;
  return false;
}

// The same page is a place in the round the knob turns through, for as long as games are still coming in: the games
// that are in, then LOADING - the place of the ones still to come, with how many of the day's games have been
// looked at. A game that arrives takes its place before it; whoever stands on LOADING at that moment gets that
// game. When the whole day is in, the page is gone.
const LOADPAGE = { id: "load", kind: "load", state: "pre", away: "", home: "", start: 0 };

function loadEls(p) {
  const els = [text(p + "e", "LOADING", "small", 36, 0, SOFT, "top_mid")];
  if (roundUntil && todayIds.length) {
    let n = 0;
    for (let i = 0; i < todayIds.length; i++) if (games.get(todayIds[i])) n++;
    els.push(text(p + "m2", n + " OF " + todayIds.length, "small", 36, 7, FAINT, "top_mid"));
  }
  // (the line of the hour before a game, its light running)
  els.push(bar(p + "hb0", LINE_X, 15, 2 * LINE_HALF, 1, "#FFFFFF1C", 1),
    { id: p + "hfg", type: "animation", path: "animations/flow_g.anim", x: LINE_X, y: 15, align: "top_left", loop: true,
      section: "n" + LINE_HALF, timeout: STILL, z_index: 2, _w: 2 * LINE_HALF });
  return els;
}

function startReady() {
  if (startDone) return true;
  if (!roundUntil) return false;                 // which games there are is not known yet
  if (allSeen()) startDone = true;
  else if (!mineToCome() && (firstOn() || !bandOpen())) startDone = true;
  return startDone;
}

// ---------- who has the ball ----------
// The feed does not say who has the ball; it gives the last play, and whose it was. From a play that is new at this
// look, only what is certain is taken:
//   a basket, or the last free throw made      -> the other team brings the ball in
//   a rebound (defensive or offensive), a steal -> the team that got it
//   a turnover                                 -> the other team
//   a missed shot, a free throw with more to come -> the team that shoots
//   anything else (a foul, a substitution, a jump ball ...) -> as it was
// It holds for BALL_MS after that play was first seen (g.playAt); a new period starts with nobody.
const BALL_MS = 30000;

function setBall(g, before, fresh, lp, lastBy) {
  g.ball = before ? before.ball : null;
  if (g.state !== "in" || !lastBy || !fresh || /^no turnover/i.test(g.last)) return;
  const other = lastBy === "away" ? "home" : "away", said = String(lp.text || "");
  const made = / makes /.test(said) || (lp.scoreValue > 0 && !/ misses /.test(said));
  if (/free throw/i.test(g.last)) {
    const of = /(\d) of (\d)/.exec(g.last);
    if (of && of[1] !== of[2]) g.ball = lastBy;
    else if (of && made) g.ball = other;
  } else if (/rebound|steal/i.test(g.last)) g.ball = lastBy;
  else if (/turnover|traveling/i.test(g.last)) g.ball = other;
  else if (made) g.ball = other;
  else if (/ misses /.test(said)) g.ball = lastBy;
}

/** Whose colour the bottom line has at this moment: "a" / "h" (that team has the ball), "" (nobody is lastKnown to). */
function ballKey(g) {
  if (g.timeout_by || inBreak(g) || !g.ball || Date.now() - g.playAt > BALL_MS) return "";
  return g.ball === "away" ? "a" : "h";
}

/** The clock is stopped: a timeout, the end of a period, or a whistle - the last play is one that stops it (not the
 *  last free throw: play goes on from it), it came no more than WHISTLE_MS ago, the feed's clock still stands where
 *  it stood when that play came, and the shown clock has arrived there. (After a whistle the game goes on without a
 *  new play for a while; the feed's clock moves only every ten seconds or so, so for that long this cannot be told.) */
const WHISTLE = /foul|free throw|violation|out of bounds|traveling|jump ball|replay|review|challenge|ejection|delay|substitution|shot clock/i;
const WHISTLE_MS = 20000;

function clockStands(g) {
  if (g.timeout_by || inBreak(g)) return true;
  if (!WHISTLE.test(g.last) || g.clock !== g.playClock || Date.now() - g.playAt > WHISTLE_MS) return false;
  const of = /(\d) of (\d)/.exec(g.last);
  if (of && of[1] === of[2]) return false;
  return clockShown(g) <= (g.tick ? g.tick.feed : 0);
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
  if (g.state === "in") {
    if (scoresUp && (g.id === mainId || g.id === onScreen)) return 5000;
    const main = games.get(mainId);              // the others wait longer while a game is on show
    return scoresUp && main && main.state === "in" ? 60000 : 30000;
  }
  // about to start, or due and the feed still says "to come": looked at often, so that the start is seen at once
  if (g.state === "pre" && scoresUp && !off(g) && g.start - Date.now() < 120000 && Date.now() - g.start < 1800000) return 10000;
  if (g.state !== "post" && Math.abs(g.start - Date.now()) < 4 * 3600000) return 60000;
  return g.state === "post" ? 1800000 : 600000;
}

/** The game that most needs a fresh look, or null. Tomorrow's games only once today is done. */
function staleGame(now) {
  let pick = null, worst = -1, first = null;
  const upTo = todayDone() ? gameIds.length : todayIds.length, round = allSeen();
  for (let i = 0; i < upTo; i++) {
    const id = gameIds[i];
    const f = fetched.get(id);
    if (f && now < f.hold) continue;
    const g = games.get(id);
    let late;
    if (!g) {                                    // never seen: before the games that are only due again, the ones
      if (!first) first = firstLooks(now);       // most likely being played first (firstLooks)
      late = 1e12 + first[i];
    } else {
      late = now - f.at - goodFor(g);
      if (late < 0) continue;
      if (followed(g)) late += 1e9;
      // the game on show: before all - but while the first round is still running it waits five seconds longer
      // (ten in all), so that the day's other games are not held up by it
      if ((id === mainId || id === onScreen) && (late >= 5000 || round)) late += 3e12;
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
  if (!lastRead) {                              // what the last run knew of today's games (the bar's own storage: quick)
    lastRead = true;
    const kept = await call("GET", "storage/read?path=/ext/data/day.json");
    try {
      const old = JSON.parse(kept.text);
      if (kept.ok && old && old.day === leagueDay(now) && old.st) lastKnown = old.st;
    } catch (e) {
      // nothing kept
    }
  }
  if (lastDirty && now >= keepDue && allSeen()) {
    keepDue = now + 60000;
    keepDay();
  }
  if (now >= listDue || (dayKey && dayKey !== leagueDay(now))) {
    listDue = now + (gameIds.length ? 600000 : 0);                  // if it fails: again after the pause
    await loadList();
    listDue = Date.now() + 3 * 3600000;
    return true;
  }
  if (listLoaded && mineFor !== dayKey + TEAMS[0]) {     // which of today's games is the followed team's
    mineFor = dayKey + TEAMS[0];
    mineIds = null;
    let ids = [];
    try {
      const got = await getJsonAny(LIST_HOSTS, "/v2/sports/basketball/leagues/nba/teams/" + (D.espn[TEAMS[0]] || "ny") + "/events?dates=" + dayKey + "&limit=5");
      const items = got.items || [];
      for (let i = 0; i < items.length; i++) {
        const m = /\/events\/(\d+)/.exec(items[i].$ref || "");
        if (m && gameIds.indexOf(m[1]) !== -1) ids.push(m[1]);
      }
    } catch (err) {
      ids = [];                                  // not to be had: the first game that is on, as it comes
    }
    mineIds = ids;
    return true;
  }
  const main = games.get(mainId);
  if (main && main.state === "in" && scoresUp && now >= sitDue && allSeen()) {     // (not before the first round is over)
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
    // (the game on show: its five seconds count from when it was asked for, not from when the answer had come - but
    // a slow answer still leaves the line free for two seconds, for the other games)
    fetched.set(id, { at: id === mainId || id === onScreen ? Math.max(now, Date.now() - 3000) : Date.now(), hold: 0 });
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
 *    "SEASON IS OVER / OFFSEASON" <-> the days to the tip-off         (after that; the countdown once the date is lastKnown) */
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
  if (mine[0]) return mine[0];
  if (on.length && listLoaded && mineToCome()) return null;       // not before the followed team's game has been seen
  return on[0] || null;
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
const made = {};                    // pictures that cost the bar time to put together, by what is in them

function score(id, n, side, colour, tight) {
  const key = id + n + colour + tight;
  if (made[id] && made[id].key === key) return Object.assign({}, made[id].el);
  const el = scoreNew(id, n, side, colour, tight);
  made[id] = { key: key, el: el };
  return Object.assign({}, el);
}

function scoreNew(id, n, side, colour, tight) {
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

// ---------- the game clock between two looks ----------
// The feed is looked at every five seconds or so, and its own clock is a staircase: while a game runs, the value it
// gives moves only every ten seconds or so, sometimes twenty, and at a whistle it gives the whistle's own value
// (watched on live games, 27 Nov 2026). Shown as it comes, the clock stands and jumps. So the strip counts it down
// itself, once a second - towards the feed's last value, never past it:
//   whenever the feed's value is below the shown one, the shown one counts down a second a second until it is
//     there, and waits there. So it never shows a time the feed has not given yet: at a whistle it stops on the
//     whistle's own value, it never has to go back up, and with no news it cannot run away;
//   it does not fall further behind the feed's value than TICK_LAG (TICK_LAG_LAST in a period's last minute,
//     where the seconds count most): a second and more beyond that, it skips to that distance;
//   it stands at the feed's value at once - in a break, in a timeout, at a period's end, in a new period, on a
//     first look, and when the feed's value is above the shown one (the officials have put time back);
//   under a minute the feed writes a tenth ("42.3"): whole seconds are counted, the tenth stays as it was and
//     the last step lands on the feed's own value (44.7, 43.7, 42.7, 42.3) - the look and the width stay, and
//     nothing is redrawn ten times a second.
// The price is that the shown clock runs up to TICK_LAG later than the feed's value while the game is played.
// Counting ahead of the feed instead was tried on the same live games: every whistle then found the clock some
// seconds too far, and it had to jump back up or stand on a wrong value through the stop.
// g.tick = { v: tenths of a second shown at t0, t0: from when it counts (ms), feed: the feed's value at this
// look - where it counts to } - set at every look (setTick).
// Whatever shows the clock - the writing in the middle, the quarter's line along the bottom - reads clockShown.
// TICK_LAG: one stair of the feed (ten seconds) and one gap between two looks (five) - with less, the shown clock
// would reach the feed's value and wait at every stair.
const TICK_LAG = 150, TICK_LAG_LAST = 80;         // tenths of a second

/** A game clock as the feed writes it ("7:42", "42.3") in tenths of a second; null when it cannot be read. */
function clockTenths(str) {
  const parts = String(str || "").split(":");
  const v = parts.length > 1 ? parseInt(parts[0], 10) * 60 + parseFloat(parts[1]) : parseFloat(parts[0]);
  return v !== v ? null : Math.round(v * 10);   // (NaN: not a number)
}

function setTick(g, before) {
  const f = clockTenths(g.clock), now = g.at;
  g.tick = null;
  if (f === null) return;
  g.tick = { v: f, t0: now, feed: f };
  const k = before && before.tick && before.state === "in" && before.period === g.period ? before.tick : null;
  if (g.state !== "in" || inBreak(g) || g.timeout_by || !k) return;
  const was = clockShown(before, now);                         // what stands on screen at this moment
  if (was <= f) return;                                        // there already (or time was put back): the feed's value
  const lag = f < 600 ? TICK_LAG_LAST : TICK_LAG;
  if (was - f >= lag + 10) g.tick.v = f + lag;                 // a second and more too far behind: from that distance, from now
  else if (was > k.feed) { g.tick.v = k.v; g.tick.t0 = k.t0; } // counting: on, in step
  else g.tick.v = was;                                         // it stood: from here, from now
}

/** The game's clock as the strip shows it at this moment, in tenths of a second; null when it cannot be read. */
function clockShown(g, at) {
  const k = g.tick;
  if (!k) return clockTenths(g.clock);
  const t = (at === undefined ? Date.now() : at) - k.t0;
  return Math.max(k.feed, k.v - 10 * Math.max(0, Math.floor(t / 1000)));
}

/** ... and as writing: the feed's own while it stands at the feed's value; else the same look ("7:41", "41.3"). */
function clockText(g) {
  const v = clockShown(g);
  if (!g.tick || v === g.tick.feed) return g.clock;
  const sec = Math.floor(v / 10);
  return v >= 600 ? Math.floor(sec / 60) + ":" + pad2(sec % 60) : sec + "." + (v % 10);
}

/** How long until the shown clock changes next, in ms (Infinity: it stands). */
function tickIn(g) {
  const k = g && g.tick, now = Date.now();
  if (!k || clockShown(g, now) <= k.feed) return Infinity;
  return now < k.t0 ? k.t0 + 1000 - now : 1000 - ((now - k.t0) % 1000);
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

/** The quarter's time along the bottom (see the top of this file). Not drawn while the clock cannot be read.
 *  Its two halves are two bars in every case, both in the colour of the team that has the ball, or each in its own
 *  team's. Over them lie two films the build made, no colour of their own: ball.anim, the running light (section
 *  "r<n>" to the right, "l<n>" to the left, n = lit columns a side), and veil.anim, which makes the lit part go
 *  dark ("o<n>") and come back ("i<n>"). Both are there from the first moment of the strip, off-screen while not
 *  wanted, so that a change of the ball costs no new film: the veil is moved over the line and darkens it, the bars
 *  change colour and the light its way under it, the veil clears and is moved off again - three small requests. */
const BREATH_OUT = 190, BREATH_IN = 300;        // ms the veil takes to close (then the colours change), and to clear
const lineNow = { id: null, key: "", was: "", at: 0 };

function quarterLine(els, p, g) {
  const left = clockShown(g);
  if (left === null) return;
  const part = Math.min(1, left / (g.period > 4 ? 3000 : 7200));
  const n = part <= 0 ? 0 : Math.max(1, Math.min(LINE_HALF, Math.ceil(LINE_HALF * part - 0.001)));
  els.push(bar(p + "hb0", LINE_X, 15, 2 * LINE_HALF, 1, "#FFFFFF1C", 1));
  if (n === 0) return;
  const now = Date.now(), key = ballKey(g);
  if (lineNow.id !== g.id) {                     // another game: its line as it is, no breath
    lineNow.id = g.id;
    lineNow.key = lineNow.was = key;
    lineNow.at = 0;
  } else if (key !== lineNow.key) {
    if (now - lineNow.at >= BREATH_OUT + BREATH_IN) {
      lineNow.was = lineNow.key;
      lineNow.at = now;
    }
    lineNow.key = key;
  }
  const age = now - lineNow.at, look = age < BREATH_OUT ? lineNow.was : lineNow.key;
  const a = lineColour(look === "h" ? g.home : g.away) + "FF", h = lineColour(look === "a" ? g.away : g.home) + "FF";
  els.push(bar(p + "hb1", LINE_X + LINE_HALF - n, 15, n, 1, a, 2), bar(p + "hb2", LINE_X + LINE_HALF, 15, n, 1, h, 2));
  els.push({ id: p + "hl", type: "animation", path: "animations/ball.anim", x: look ? LINE_X : OFF, y: 15, align: "top_left",
    loop: true, section: (look === "h" ? "l" : "r") + n, timeout: STILL, z_index: 3, _w: 2 * LINE_HALF });
  els.push({ id: p + "hx", type: "animation", path: "animations/veil.anim", x: age < BREATH_OUT + BREATH_IN ? LINE_X : OFF, y: 15,
    align: "top_left", loop: false, section: (age < BREATH_OUT ? "o" : "i") + n, timeout: STILL, z_index: 5, _w: 2 * LINE_HALF });
}

/** How long until the line's breath needs its next step, in ms (Infinity: it rests). */
function lineIn() {
  const age = Date.now() - lineNow.at;
  return age < BREATH_OUT ? BREATH_OUT - age : age < BREATH_OUT + BREATH_IN ? BREATH_OUT + BREATH_IN - age : Infinity;
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
    const colour = lineColour(sides[n][4]), lit = blink && g.timeout_by === sides[n][1];
    const id = p + "o" + sides[n][0], key = id + have + colour + lit;
    if (!made[id] || made[id].key !== key) {
      let cells = "";
      for (let i = 0; i < 7; i++) {
        const k = n === 0 ? i : 6 - i;           // k = 0 is the dot nearest the mark
        cells += (k < have || (lit && k === have) ? "a" : "b") + (i < 6 ? "." : "");
      }
      made[id] = { key: key, el: { id: id, type: "xpmbitmap", x: sides[n][2], y: 3, align: "top_left", timeout: T, z_index: 4,
        data: "! XPM2\n13 1 3 1\n. c none\na c " + colour + "\nb c " + mixHex("#000000", colour, 0.22) + "\n" + cells } };
    }
    els.push(Object.assign({}, made[id].el));
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
  // what the middle says for five seconds; then, three seconds each, what there is to add: a run that is on (not
  // in a break), and - only while the clock is stopped - the team fouls
  const brk = inBreak(g), extra = [];
  if (!brk && !g.timeout_by && g.run && g.runPts >= RUN_SHOWN) extra.push("run");
  if (clockStands(g) && typeof g.foul_a === "number" && typeof g.foul_h === "number" && (g.foul_a >= 4 || g.foul_h >= 4)) extra.push("foul");
  const slot = Math.floor(now / 1000) % (5 + 3 * extra.length);
  const what = slot < 5 ? "" : extra[Math.floor((slot - 5) / 3)];
  if (what === "" && brk) {                      // the end of a quarter
    els.push(text(p + "m1", "End", "small", 36, 0, LIVE, "top_mid"), text(p + "m2", periodName(g), "small", 36, 7, SOFT, "top_mid"));
    return;
  }
  if (what === "" && g.timeout_by) {             // a timeout is on: "T/O" and the quarter take turns over the clock
    const tick = Math.floor(now / 1000) % 2 === 0;
    els.push(text(p + "m1", tick ? "T/O" : periodName(g), "small", 36, 0, tick ? WARN : LIVE, "top_mid"),
      text(p + "m2", clockText(g), "small", 36, 7, SOFT, "top_mid"));
    return;
  }
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
    els.push(text(p + "m1", periodName(g), "small", 36, 0, LIVE, "top_mid"), text(p + "m2", clockText(g), "small", 36, 7, SOFT, "top_mid"));
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
  if (g && g.kind === "load") return loadEls(p); // the place of the games still to come
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
    if (!nameSince || Date.now() - nameSince < NAME_MS) return [text(p + "e", D.name, "small", 36, 4, FAINT, "top_mid")];   // the name, quietly
    return loadEls(p);                           // nothing to show yet: LOADING
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
  let onLoad = false, loadSeen = [];             // the knob stands on LOADING; the games that were on when it got there
  const seen = { id: null, period: 0, to: false };       // the game on show as it was a moment ago
  scoresUp = true;
  if (!nameSince) nameSince = Date.now();
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
      if (!main && startReady() && (!tour || tour.why !== "auto")) tour = { list: carousel(null), k: 0, why: "auto" };
      if (main && tour && tour.why === "auto") tour = null;                     // a game has come on
      if (onLoad && allSeen()) onLoad = false;   // the whole day is in: the page is gone
      if (onLoad) {
        game = LOADPAGE;
        until = Infinity;
        jump = null;
      } else if (jump) {
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
      else if (how === "mid") await roll(next, 1, "mid");             // a new quarter, a timeout: only the middle
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
        const starting = !game && !startReady();   // the start (the name, LOADING): no control but Back does anything
        if (starting) {
          ctl.ok = ctl.start = false;
          ctl.turn = 0;
        }
        if (onLoad) {
          // The knob stands on LOADING: nothing moves the screen but a game that arrives - it comes in at once -
          // the last game of the day (the page is gone: back to the game the app stays on), or a turn (on round
          // the games that are in).
          pendingSign = null;
          ctl.ok = ctl.start = false;
          const on = allGames().filter(isOn).sort(byStart);
          let come = null;
          for (let i = 0; i < on.length && !come; i++) if (loadSeen.indexOf(on[i].id) === -1) come = on[i];
          if (come || allSeen() || ctl.turn) {
            if (come) mainId = come.id;
            else if (ctl.turn) {
              dir = ctl.turn > 0 ? 1 : -1;
              if (on.length) mainId = on[dir > 0 ? 0 : on.length - 1].id;
            }
            ctl.turn = 0;
            finalSince = 0;
            onLoad = false;
            how = "side";
            break;
          }
          await show(lift(gameEls(game, pp), pp, z));
          await nap(500);
          continue;
        }
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
        // A new quarter, or a timeout just called, in the game on show: the middle turns over. (The ball changing
        // hands gets nothing here: in basketball it does so every few seconds.)
        if (game && game.state === "in" && !tour) {
          const to = !!game.timeout_by, was = seen.id === game.id;
          const turned = was && (game.period !== seen.period || (to && !seen.to));
          seen.id = game.id;
          seen.period = game.period;
          seen.to = to;
          if (turned) {
            redo = true;
            how = "mid";
            jump = game;
            break;
          }
        } else {
          seen.id = null;
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
        // During the round of the league, Start again - or a turn of the knob - ends it at once: back to the game
        // the app stays on (or the one it would choose now, if that one has ended), behind the closing card ("BACK
        // TO LIVE") as at the end of a round. With no game on to go back to there is no card: the strip rolls back.
        if (tour && tour.why !== "auto" && (ctl.start || ctl.turn)) {
          ctl.start = false;
          ctl.turn = 0;
          tour = null;
          how = (main && isOn(main)) || firstOn() ? "close" : "roll";
          dir = -1;
          break;
        }
        if (ctl.start) {                         // Start: the carousel
          ctl.start = false;
          if (tour) break;                       // nothing is on, the carousel runs anyway: its next item now
          const list = carousel(main);
          if (list.length) {
            tour = { list: list, k: 0, why: "start" };
            how = "open";
            break;
          }
          if (allSeen()) await notice("alone");
          else {                                 // nothing to go round yet: the LOADING page, where the games will come
            onLoad = true;
            loadSeen = allGames().filter(isOn).map((g) => g.id);
            how = "side";
            break;
          }
          ctl.turn = 0;
        }
        if (ctl.turn) {                          // encoder
          const turns = ctl.turn;
          ctl.turn = 0;
          dir = turns > 0 ? 1 : -1;
          const on = allGames().filter(isOn).sort(byStart), here = on.findIndex((g) => g.id === mainId);
          if (!allSeen() && (!on.length || (here !== -1 && (here + turns >= on.length || here + turns < 0)))) {
            // games are still coming in, and the turn goes past the last one that is in (or none is on yet): the
            // LOADING page, the place of the ones still to come
            onLoad = true;
            loadSeen = on.map((g) => g.id);
            how = "side";
            break;
          }
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
        if (!starting && !tour && (!main || !sameGame(main, game) || (!isOn(main) && main.state !== "post"))) break;
        if (tour && tour.why === "auto" && firstOn()) break;                    // a game has come on
        // The game the app stays on has ended while it was on show: its final stays FINAL_STAY, then the app moves on -
        // to another game that is on, or to the carousel.
        if (!tour && main && main.state === "post" && sameGame(main, game)) {
          if (!finalSince) finalSince = t0;
          if (t0 - finalSince >= FINAL_STAY) break;
        }
        if (t0 >= until) break;
        if (!game && games.size && startReady()) break;          // the game to stay on is there: show it now
        if (!game && seasonItems()) break;       // the season's end is lastKnown now: its pages
        // ---- draw
        const wait = Math.min(until - t0, 500);
        // nothing on the strip moves by itself but the clock: a few times a second is enough (a timeout's dot blinks
        // twice a second), once more right when the clock's next second is due - only its text is sent then - and
        // at the two steps of the line's breath when the ball has changed hands
        await show(lift(gameEls(game, pp), pp, z));
        await nap(game && game.timeout_by ? Math.min(wait, 250, lineIn() + 3) : Math.max(10, Math.min(wait, tickIn(game) + 3, lineIn() + 3)));
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

/** The first strip is drawn over the last, black picture of the author's mark; then that film goes, unseen. */
async function firstStrip(els) {
  await firstShow(els);
  await splashOff();
}

async function main() {
  await splash(1);                               // the author's mark: while it plays the clock and the settings are
  await syncTime();                              // read and the first games asked for
  await readSettings();
  settingsDue = Date.now() + 10000;
  dataLoop();
  await splashEnd();
  while (!stopped) {
    try {
      await hoopsPage("p", firstStrip);
    } catch (err) {
      report("hoops", err);
      await sleep(500);
    }
  }
}

main();

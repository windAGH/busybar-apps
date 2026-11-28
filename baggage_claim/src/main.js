// Baggage Claim: an airport's baggage belts for the BUSY Bar, seen from above - a picture to leave running on the
// desk. Luggage of every kind comes out through the rubber flaps, rides across and runs out of the picture; one thing
// in eight is not luggage (a cat, a sleeping traveller, a robot vacuum going the wrong way ...). Four belts, each with
// its own luggage; the hall's light follows the clock. Start: a luggage tag names the thing in the middle. Turn the
// knob: the belt's speed. OK: the next belt. Back: exit. Every start arrives on the main screen (the hall running,
// the name on a luggage tag): Start enters at once, OK opens the guide, and without a key it fades after 4 seconds.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (every kind of thing with the sizes of its pictures and its tag, lengths of the films), then
// the bar (its API, clock, controls, drawing), then the app (chance, elements, what is kept and the settings, the
// four belts and the things on them, the band, the flaps, the tag, the picture, the next belt, one look, the start).
// All pictures are films in animations/, drawn by the author's own code; nothing is fetched from anywhere.

const D = {"app":"io.github.windagh.baggage_claim","name":"Baggage Claim","kinds":[{"f":"hard","v":[[16,12,9,6],[16,12,9,6],[16,12,9,6],[18,12,11,6],[17,13,9,7],[16,12,9,6],[16,12,9,6],[17,13,9,7],[18,12,11,6]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[40,44]},{"f":"cabin","v":[[12,10,7,5],[13,11,7,6],[12,10,7,5],[12,10,7,5],[13,11,7,6]],"n":1,"ms":1000,"lat":0,"y":[-3.0,3.0],"g":[44,47]},{"f":"duffel","v":[[17,10,9,5],[17,10,9,5],[17,11,9,6],[17,10,9,5]],"n":1,"ms":1000,"lat":0,"y":[-3.0,3.0],"g":[34,52]},{"f":"backpack","v":[[12,12,7,6],[12,13,7,7],[12,12,7,6],[12,13,7,7]],"n":1,"ms":1000,"lat":0,"y":[-4.6,4.6],"g":[42,39]},{"f":"guitar","v":[[25,12,11,6],[25,12,11,6],[25,12,11,6]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[32,65]},{"f":"golf","v":[[22,10,12,5],[22,10,12,5],[22,10,12,5]],"n":1,"ms":1000,"lat":0,"y":[-3.0,3.0],"g":[41,50]},{"f":"skis","v":[[27,7,14,3],[27,7,14,3],[27,7,14,3]],"n":1,"ms":1000,"lat":0,"y":[-2.0,3.2],"g":[24,44]},{"f":"surf","v":[[29,8,15,4],[29,8,15,4],[29,8,15,4]],"n":1,"ms":1000,"lat":0,"y":[-3.0,3.1],"g":[46,51]},{"f":"box","v":[[13,12,7,6],[14,14,8,7],[13,12,7,6]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[36,40]},{"f":"pet","v":[[14,13,8,7],[14,13,8,7],[14,13,8,7]],"n":2,"ms":220,"lat":0,"y":[-4.0,4.0],"g":[30,46],"q":[0,0,0,0,0,0,0,0,0,0,0,0,0,1]},{"f":"pram","v":[[13,13,8,7],[13,13,8,7],[13,13,8,7]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[28,65]},{"f":"hatbox","v":[[11,12,6,6],[11,12,6,6],[11,12,6,6]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[37,56]},{"f":"cello","v":[[28,14,14,7],[28,14,14,7],[28,14,14,7]],"n":1,"ms":1000,"lat":0,"y":[-4.5,4.5],"g":[30,57]},{"f":"cooler","v":[[13,13,7,7],[13,13,7,7],[14,15,8,8]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[41,52]},{"f":"stickers","v":[[16,13,9,7],[16,13,9,7]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[24,45]},{"f":"wrapped","v":[[16,13,9,7],[16,13,9,7],[16,13,9,7]],"n":1,"ms":1000,"lat":0,"y":[-4.5,4.5],"g":[40,60]},{"f":"duo","v":[[22,12,12,6],[22,12,12,6],[22,12,12,6]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[52,59]},{"f":"briefcase","v":[[12,10,6,6],[13,11,7,6],[12,10,6,6]],"n":1,"ms":1000,"lat":0,"y":[-4.8,3.0],"g":[44,54]},{"f":"flightcase","v":[[15,12,8,6],[15,12,8,6]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[51,50]},{"f":"umbrella","v":[[25,7,13,3],[25,6,13,4],[25,9,13,4]],"n":1,"ms":1000,"lat":0,"y":[-2.0,3.1],"g":[44,67]},{"f":"trunk","v":[[16,13,9,7],[16,13,9,7]],"n":1,"ms":1000,"lat":0,"y":[-4.0,4.0],"g":[31,44]},{"f":"sleeper","v":[[28,13,16,7],[28,13,16,7],[28,13,16,7]],"n":8,"ms":420,"lat":0,"y":[-4.2,4.2],"g":[32,41],"s":1,"ni":4},{"f":"cat","v":[[16,13,9,7],[16,13,9,7],[16,13,9,7]],"n":8,"ms":200,"lat":0,"y":[-4.0,4.0],"g":[30,62],"s":1},{"f":"dog","v":[[22,12,11,6],[22,12,11,6],[22,12,11,6]],"n":6,"ms":140,"lat":0,"y":[-4.9,4.9],"g":[41,60],"s":1},{"f":"burst","v":[[27,11,16,6],[27,11,16,6]],"n":4,"ms":320,"lat":0,"y":[-4.0,4.0],"g":[50,62],"s":1},{"f":"shoe","v":[[15,9,8,4],[15,9,8,4],[15,9,8,4]],"n":4,"ms":300,"lat":0,"y":[-3.0,3.9],"g":[47,49],"s":1},{"f":"fishbowl","v":[[11,13,6,7]],"n":12,"ms":220,"lat":0,"y":[-4.5,4.5],"g":[40,51],"s":1},{"f":"cactus","v":[[12,15,8,9]],"n":4,"ms":180,"lat":2,"y":[-2.9,2.8],"g":[34,47],"s":1},{"f":"duck","v":[[12,10,7,5]],"n":8,"ms":260,"lat":0,"y":[-3.0,3.0],"g":[26,56],"s":1},{"f":"vacuum","v":[[11,12,6,6]],"n":6,"ms":170,"lat":0,"y":[-4.5,5.2],"g":[36,48],"s":1,"ag":1},{"f":"balloon","v":[[14,16,8,9],[14,16,8,9],[14,16,8,9]],"n":8,"ms":300,"lat":1,"y":[-2.0,4.0],"g":[39,40],"s":1},{"f":"pizza","v":[[13,15,7,9]],"n":9,"ms":220,"lat":1,"y":[-4.5,4.5],"g":[37,49],"s":1},{"f":"glow","v":[[18,15,9,8]],"n":6,"ms":200,"lat":0,"y":[-4.0,4.0],"g":[54,39],"q":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,3,3,3,3,3,4,5],"s":1},{"f":"snowman","v":[[10,13,5,11]],"n":8,"ms":380,"lat":3,"y":[-1.5,1.0],"g":[44,60],"s":1,"mo":[12,1,2]},{"f":"present","v":[[12,14,7,8],[12,14,7,8],[12,14,7,8]],"n":8,"ms":220,"lat":0,"y":[-4.0,4.0],"g":[39,51],"s":1,"mo":[12]},{"f":"notmine","v":[[51,12,27,6]],"n":4,"ms":320,"lat":0,"y":[-4.0,4.0],"g":[43,44],"s":1},{"f":"twins","v":[[35,12,19,6]],"n":6,"ms":240,"lat":0,"y":[-4.0,4.0],"g":[48,59],"s":1},{"f":"toaster","v":[[17,13,11,7]],"n":5,"ms":130,"lat":0,"y":[-3.0,3.9],"g":[38,38],"q":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,3,3,3,3,3,3,3,4],"s":1},{"f":"penguin","v":[[12,11,6,9]],"n":6,"ms":200,"lat":3,"y":[-1.5,1.0],"g":[38,52],"s":1},{"f":"disco","v":[[18,12,9,6]],"n":8,"ms":160,"lat":1,"y":[-3.0,3.0],"g":[47,55],"s":1},{"f":"cake","v":[[11,13,6,7]],"n":6,"ms":150,"lat":1,"y":[-4.5,4.5],"g":[26,52],"s":1},{"f":"pumpkin","v":[[16,14,8,7]],"n":8,"ms":140,"lat":1,"y":[-3.9,3.8],"g":[39,64],"s":1,"mo":[10]}],"none":[38,47],"speeds":[0,3,6,12],"pitch":12,"flapMs":900,"reach":5,"shutUp":850,"shutDown":450,"strikeMs":1150,"pages":5,"fadeMs":400,"pressPage":2,"pressX":60,"startPage":0,"startX":32,"sets":["22","13","04","24","34"],"ptr":"! XPM2\n5 3 2 1\n. c none\na c #FFB028\n..a..\n.aaa.\naaaaa"};
// ===== core.js =====
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
const ctl = { held: false, turn: 0, start: false, ok: false };
let onBack = null;                  // an app may take the Back key itself: a function that returns true = "taken, the app goes on"
let wake = null;
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
const errs = { draw: 0, net: 0, saved: "" };
function saveErrs() {
const line = "draw " + errs.draw + " net " + errs.net;       // the file is rewritten when an error count changes,
if (line === errs.saved) return;                            // not every time a host answers: that would wear the flash
errs.saved = line;
call("POST", "storage/write?path=/ext/data/errors.txt", line + " sources " + JSON.stringify(sources), "application/octet-stream");
}
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
async function loadSettings() {
const got = await call("GET", "apps/settings?app_id=" + APP);
try {
return (got.ok && JSON.parse(got.text).values) || {};
} catch (err) {
return {};
}
}
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
function local(ms) {
return new Date((ms === undefined ? Date.now() : ms) + zoneMs);
}
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
function text(id, s, font, x, y, color, align, z) {
return { id: id, type: "text", text: s, font: font, x: x, y: y, align: align || "top_left", color: color,
timeout: T, z_index: z === undefined ? 4 : z };
}
function bar(id, x, y, w, h, color, z) {
return { id: id, type: "rectangle", x: x, y: y, width: w, height: h, fill: "solid", fill_colors: [color],
border_width: 0, timeout: T, z_index: z };
}
function image(id, path, x, y, z, w) {
return { id: id, type: "image", path: path, x: x, y: y, align: "top_left", timeout: STILL, z_index: z, _w: w,
_solid: w !== undefined };
}
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
let band = 1000000000;           // pages can go above the one on screen (nextBand) or under it (roll)
const COLS = 6, COL_W = 12;
function nextBand() {
band += 20;
return band;
}
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
function bandOf(p) {
const rec = live.get(p + "bk0");
return rec ? rec.el.z_index : nextBand();
}
function skipOurs(key, value) {
return key.charCodeAt(0) === 95 ? undefined : value;
}
function wire(el, dx, dy) {
if (dx || dy) {
const moved = Object.assign({}, el);
moved.x = el.x + (dx || 0);
moved.y = el.y + (dy || 0);
return JSON.stringify(moved, skipOurs);
}
return JSON.stringify(el, skipOurs);
}
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
function remember(els) {
const at = Date.now();
live.clear();
for (let i = 0; i < els.length; i++) {
live.set(els[i].id, { s: wire(els[i]), t: at, el: els[i] });
}
}
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
async function firstShow(els) {
await post(inOrder(els, 1).map((el) => wire(el)));
remember(els);
}
const SPLASH_MS = 1500;             // the film's length: 30 pictures, 20 a second
let splashUp = 0;                   // when the film was sent; 0: none is on screen
async function splash(z) {
await post(['{"id":"zz_sp","type":"animation","path":"animations/splash.anim","x":0,"y":0,"align":"top_left",' +
'"loop":false,"section":"default","timeout":60,"z_index":' + z + "}"]);
splashUp = Date.now();
}
async function splashEnd() {
const end = splashUp + SPLASH_MS + 100;
while (splashUp && !stopped && Date.now() < end) await nap(end - Date.now());
ctl.turn = 0;
ctl.ok = ctl.start = false;
}
async function splashOff() {
if (!splashUp) return;
splashUp = 0;
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_sp"] }));
}
const timing = [];                  // measuring builds only: how long each step of the last changes took
async function change(els, dir, light) {
busy = true;
const t0 = Date.now(), mark = [];
try {
const olds = [];
for (const id of live.keys()) olds.push(id);
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
if (D.debug) {
timing.push((light ? "L " : "C ") + els.length + "/" + mark.join(" "));
call("POST", "storage/write?path=/ext/data/timing.txt", timing.join("\n"), "application/octet-stream");
}
}
}
async function roll(els, dir, blind) {
busy = true;
try {
const olds = [], way = blind || (dir < 0 ? "roll_dn" : "roll_up");   // (blind "flip": over the two marks only)
for (const id of live.keys()) olds.push(id);
for (let i = 0; i < els.length; i++) els[i].z_index -= 40;   // lifted one band above; it belongs one band under
band -= 40;
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
const unbind = listen("input", (event) => {
if (stopped) return;
if (D.debug) console.log(APP + " input " + JSON.stringify(event));
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
// ===== belt.js =====
(function () {
const TICK = 167;                   // ms between two looks
const OFFX = 300;                   // where an element waits off-screen
const WALL = 7, EDGE = 72;          // the belt is seen from column 7 to the right edge
const MID = 8;                      // the row things lie about
const SLOTS = 7;                    // places for things on screen
const K = D.kinds, SPEED = D.speeds, PITCH = D.pitch;
const BUSY = [1, 0.6, 1.6, 1];      // how far apart things come on each belt (2 is the busy one, 3 the quiet one)
const Z = { ground: 1, slats: 2, thing: 10, wall: 40, flap: 41, shade: 50, tag: 60, lift: 64, title: 66, cover: 70,
shutter: 80, signs: 82, splash: 90 };
const TITLE_MS = 4000;              // the main screen stands this long over the running belt, then fades by itself
const SPLASH_MS = 1500;             // the author's mark at the start (animations/splash.anim) plays this long
const STORE = "storage/read?path=/ext/data/belt.json", KEEP = "storage/write?path=/ext/data/belt.json";
let seed = ((D.seed || Date.now()) % 2147483646) + 1;
function rand() {
seed = (seed * 16807) % 2147483647;
return (seed - 1) / 2147483646;
}
for (let n = 0; n < 12; n++) rand();                    // (its first numbers are close together for seeds close together)
const rnd = (n) => Math.floor(rand() * n);
const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
function wireOf(el, dx) {
const head = '{"id":"' + el[0] + '","x":' + (el[4] + dx) + ',"y":' + el[5] + ',"align":"top_left","timeout":' + el[7] +
',"z_index":' + el[6];
if (el[1] === 2) return head + ',"type":"xpmbitmap","data":' + JSON.stringify(el[2]) + "}";
return head + ',"type":"animation","path":"animations/' + el[2] + '.anim","loop":' + (el[1] === 0 ? "true" : "false") +
',"section":"' + el[3] + '"}';
}
const pressed = { ok: 0, start: 0 };
try {
["ok", "start"].forEach((key) => {
Object.defineProperty(ctl, key, { get: () => pressed[key] > 0, set: (v) => { pressed[key] = v ? pressed[key] + 1 : 0; } });
});
} catch (err) {
}
const sent = {};                    // id -> { s: as last sent, t: when }
let posts = 0, postsAt = 0;         // TEST builds (--count): draw requests, written to the log every ten seconds
async function sync(list, dx, more) {
const now = Date.now(), parts = [], ids = {}, fresh = [];
for (let i = 0; i < list.length; i++) {
const el = list[i], s = wireOf(el, dx || 0), old = sent[el[0]];
ids[el[0]] = 1;
if (old && old.s === s && now - old.t < 400 * el[7]) continue;
parts.push(s);
fresh.push(el[0]);
sent[el[0]] = { s: s, t: now };
}
posts += Math.ceil(parts.length / 8);
if (D.lag && parts.length) await sleep(80 + Math.floor(Math.random() * 70));     // TEST build --lag: a slow bar
if (parts.length && !(await postAll(parts, 8))) {
for (let i = 0; i < fresh.length; i++) delete sent[fresh[i]];        // refused: sent again at the next look
}
const gone = [];
if (more) return;
for (const id in sent) if (!ids[id]) gone.push(id);
if (gone.length) {
for (let i = 0; i < gone.length; i++) delete sent[gone[i]];
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: gone }));
}
}
let speed = 2, saveDue = 0;         // 0 stopped, 1 slow, 2 normal, 3 fast
let belt = 0;                       // the belt on view: 0-3 (its number is one more)
let seenGuide = false;              // the guide was read to its last page: it does not come again by itself
let lastFlip = null;                // Setup > Start over as last seen (null: never seen)
let startOver = false;              // ... it was flipped: everything kept is to be cleared
let guideAsked = false;             // OK on the main screen: the shutter comes down and shows the guide
let title = null;                   // the main screen over the hall: { until: it fades then, fade: when it began to }
let mode = "rare";                  // Setup > Surprises
let lightSet = "";                  // Setup > Light: "" = by the bar's clock, or day / dusk / night
let light = "day";                  // the hall's light: day, dusk, night
async function load() {
if (D.fresh) return;
const got = await call("GET", STORE);
try {
const kept = got.ok ? JSON.parse(got.text) : null;
if (kept && (kept.s === 1 || kept.s === 2 || kept.s === 3)) speed = kept.s;     // (a belt left stopped starts again at normal)
if (kept && (kept.b === 0 || kept.b === 1 || kept.b === 2 || kept.b === 3)) belt = kept.b;
if (kept && kept.g === true) seenGuide = true;
if (kept && (kept.r === true || kept.r === false)) lastFlip = kept.r;
} catch (err) {
}
}
function keep() {
return call("POST", KEEP, JSON.stringify({ s: speed, b: belt, g: seenGuide, r: lastFlip === true }), "application/octet-stream");
}
async function readSettings() {
const v = await loadSettings();
mode = v.surprises === "often" || v.surprises === "only" ? v.surprises : "rare";
lightSet = v.light === "day" || v.light === "dusk" || v.light === "night" ? v.light : "";
const flip = v.reset === true;
if (lastFlip === null) {                               // the very first look: nothing to compare with
lastFlip = flip;
saveDue = Date.now() + 200;
} else if (flip !== lastFlip) {
lastFlip = flip;
startOver = true;
}
}
function lightNow() {
if (lightSet) return lightSet;
const h = D.hour !== undefined ? D.hour : local().getUTCHours();
return h >= 7 && h < 18 ? "day" : h >= 22 || h < 5 ? "night" : "dusk";
}
const belts = [];
for (let n = 0; n < 4; n++) belts.push({ things: [], next: null, recent: [[], []], free: [6, 5, 4, 3, 2, 1, 0] });
let B = belts[0];
const lastVar = {};
let dist = 0;                       // columns the band has travelled
let paradeAt = 0;
function leftOf(t, st, now) {
const run = st - t.s0;
if (t.ag) return t.x0 + Math.floor(run * 0.45 + 1.6 * Math.sin((now - t.born) / 900));
return t.x0 + run;
}
function flapSet(r0, r1) {
const a = clamp(Math.floor((r0 - 3) / 2), 0, 4), b = clamp(Math.floor((r1 - 0.01 - 3) / 2), 0, 4);
let best = "04", size = 9;
for (let i = 0; i < D.sets.length; i++) {
const s0 = Number(D.sets[i][0]), s1 = Number(D.sets[i][1]);
if (s0 <= a && s1 >= b && s1 - s0 < size) {
best = D.sets[i];
size = s1 - s0;
}
}
return best;
}
function put(b, k, st, now, left) {
const kind = K[k];
let v = rnd(kind.v.length);
if (kind.v.length > 1 && v === lastVar[k]) v = (v + 1) % kind.v.length;     // not the same colour twice running
lastVar[k] = v;
const size = kind.v[v];
let lat = kind.lat;
if (!lat && kind.y[0] > -3.6 && kind.y[1] < 3.6) lat = rnd(3) - 1;          // small things lie where they fell
const t = { k: k, v: v, slot: b.free.pop(), w: size[0], y: clamp(MID + lat - size[3], 0, 16 - size[1]),
x0: left === undefined ? WALL - size[0] : left, s0: st, born: now, ag: kind.ag ? 1 : 0,
fs: flapSet(MID + lat + kind.y[0], MID + lat + kind.y[1]) };
b.things.push(t);
return t;
}
function month() {
return D.month || local().getUTCMonth() + 1;
}
const PARADE = [];
if (D.parade) {
for (let k = 0; k < K.length; k++) {
if (D.parade === "all" || (D.parade === "sur") === !!K[k].s) PARADE.push(k);
}
}
function choose(b) {
if (D.only !== undefined) return D.only;
if (PARADE.length) return PARADE[paradeAt++ % PARADE.length];
const sur = rand() < (mode === "only" ? 1 : mode === "often" ? 1 / 3 : 1 / 8);
const mo = month(), hist = b.recent[sur ? 1 : 0];
let pool = [];
for (let pass = 0; pass < 2 && pool.length === 0; pass++) {
for (let k = 0; k < K.length; k++) {
if (!!K[k].s !== sur || (K[k].mo && K[k].mo.indexOf(mo) < 0)) continue;
if (pass === 0 && hist.indexOf(k) >= 0) continue;
const weight = light === "night" && K[k].ni ? K[k].ni : 1;
for (let n = 0; n < weight; n++) pool.push(k);
}
}
const k = pool[rnd(pool.length)];
hist.push(k);
if (hist.length > 9) hist.shift();
return k;
}
function gap(n) {
if (PARADE.length) return 3;
const r = rand();
let g = r < 0.18 ? 1 + rnd(3) : r < 0.86 ? 4 + rnd(8) : 16 + rnd(16);
g = light === "night" ? Math.round(g * 2.2) + 6 : light === "dusk" ? Math.round(g * 1.4) : g;
return Math.max(1, Math.round(g * BUSY[n]));
}
function leave(b, st, now) {
for (let i = b.things.length - 1; i >= 0; i--) {
if (leftOf(b.things[i], st, now) >= EDGE) {
b.free.push(b.things[i].slot);
b.things.splice(i, 1);
}
}
}
function plan(b, n, now, late) {
for (let guard = 0; guard < 40; guard++) {
const nx = b.next;
if (nx && nx.s0 > dist) return;
leave(b, Math.floor(dist), now);
if (!b.free.length) return;
let at = nx ? nx.s0 + (nx.ag ? 112 : nx.w) + gap(n) : Math.floor(dist) + 3 + rnd(8);
if (dist - at > 150) at = Math.floor(dist) - 150 + rnd(20);
if (!late && at <= dist) at = Math.floor(dist) + 2;
b.next = put(b, choose(b), at, now);
}
}
let halt = 0;                       // a jolt: the band stands until then
let jolted = false;
let nextJolt = 0;
let lurch = null;                   // { t0, seq }: columns every thing is thrown by, in steps of 80 ms
let slat = null, slatKey = -1, slatAt = 0;
const STOP = [1, 2, 1, 0], HARD = [1, 2, 3, 2, 1, 0], GO = [-1, -1, 0];
function throwAll(seq, now) {
lurch = { t0: now, seq: seq };
}
function thrown(now) {
if (!lurch) return 0;
const n = Math.floor((now - lurch.t0) / 80);
if (n >= lurch.seq.length) {
lurch = null;
return 0;
}
return lurch.seq[n];
}
function slats(now, pace) {
if (pace !== slatKey || now - slatAt > 44000) {
slatKey = pace;
slatAt = now;
const at = Math.floor(dist % PITCH);
slat = ["sl", 0, pace ? "belt" + pace : "belt2", (pace ? "p" : "s") + at, WALL, 3, Z.slats, 120];
delete sent.sl;
}
return slat;
}
const REST = ["fl", 0, "flap", "r", 6, 0, Z.flap, 120];
let flapWas = "", flapEnd = 0, flap = REST;
function flaps(now, st, dx) {
let at = null, right = 0;
for (let i = 0; i < B.things.length && !at; i++) {
const t = B.things[i];
const l = leftOf(t, st, now) + dx;
if (l + t.w > WALL && l < WALL + 3) {
at = t;
right = l + t.w;
}
}
if (at) {                                              // pushed up by what is coming through
flapWas = at.fs;
flap = ["fl", 0, "flap", "c" + at.fs + "_" + Math.min(D.reach, right - WALL), 6, 0, Z.flap, 120];
} else if (flapWas) {                                  // it has passed: they fall back, swing and settle
flap = ["fl", 1, "flap", "t" + flapWas, 6, 0, Z.flap, 120];
flapEnd = now + D.flapMs + 250;
flapWas = "";
} else if (flapEnd && now > flapEnd) {
flapEnd = 0;
flap = REST;
}
return flap;
}
const T_IN = 300, T_A = 1700, T_FEED = 360, T_B = 2700, T_OUT = 300;
let tag = null;                     // { t: the thing (or null: an empty belt), name, t0, wa, wb, xa, xb, cut }
function openTag(now, st) {
let best = null, far = 1e9;
for (let i = 0; i < B.things.length; i++) {
const c = leftOf(B.things[i], st, now) + B.things[i].w / 2;
if (c > WALL && c < EDGE && Math.abs(c - 39) < far) {
far = Math.abs(c - 39);
best = B.things[i];
}
}
const g = best ? K[best.k].g : D.none;
tag = { t: best, name: best ? "g_" + K[best.k].f : "g_none", t0: now, wa: g[0], wb: g[1], xa: (72 - g[0]) >> 1,
xb: (72 - g[1]) >> 1, cut: 0, ax: 72, bx: 72 };
}
function tagEls(list, now, st) {
const e = now - tag.t0;
let ax = null, bx = null, moving = true;
if (tag.cut) {                                         // sent away early: whatever is there leaves to the left
const f = (now - tag.cut) / T_OUT;
if (f >= 1) {
tag = null;
return false;
}
if (tag.ax > -tag.wa && tag.ax < 72) ax = tag.ax - Math.round((tag.ax + tag.wa) * f);
if (tag.bx > -tag.wb && tag.bx < 72) bx = tag.bx - Math.round((tag.bx + tag.wb) * f);
} else if (e < T_IN) {
ax = tag.xa + Math.round((72 - tag.xa) * (1 - e / T_IN));
} else if (e < T_IN + T_A) {
ax = tag.xa - (e < T_IN + 70 ? 1 : 0);               // it stops a column too far, and settles
moving = e < T_IN + 140;
} else if (e < T_IN + T_A + T_FEED) {
const f = (e - T_IN - T_A) / T_FEED;
ax = tag.xa - Math.round((tag.xa + tag.wa) * f);
bx = tag.xb + Math.round((72 - tag.xb) * (1 - f));
} else if (e < T_IN + T_A + T_FEED + T_B) {
bx = tag.xb - (e < T_IN + T_A + T_FEED + 70 ? 1 : 0);
moving = e < T_IN + T_A + T_FEED + 140;
} else if (e < T_IN + T_A + T_FEED + T_B + T_OUT) {
bx = tag.xb - Math.round((tag.xb + tag.wb) * (e - T_IN - T_A - T_FEED - T_B) / T_OUT);
} else {
tag = null;
return false;
}
if (!tag.cut) {
tag.ax = ax === null ? (bx === null ? 72 : -99) : ax;
tag.bx = bx === null ? (e < T_IN + T_A ? 72 : -99) : bx;
}
if (ax !== null) list.push(["ga", 0, tag.name, "a", ax, 9, Z.tag, 20]);
if (bx !== null) list.push(["gb", 0, tag.name, "b", bx, 9, Z.tag + 1, 20]);
if (!moving && tag.t && B.things.indexOf(tag.t) >= 0) {   // the tab, under the thing as long as it is over the strip
const sx = ax !== null ? ax : bx, sw = ax !== null ? tag.wa : tag.wb;
const c = Math.round(leftOf(tag.t, st, now) + tag.t.w / 2) - 2;
if (c >= sx + 4 && c <= sx + sw - 7) list.push(["gp", 2, D.ptr, "", c, 6, Z.tag + 2, 20]);
}
return moving;
}
let lastNow = 0, checkDue = 0, flashEnd = 0;
let fixed = [];                     // the hall's standing pictures
function hall() {
fixed = [["bg", 0, "ground", "default", 0, 0, Z.ground, 120], ["wl", 0, "wall" + (belt + 1), "default", 0, 0, Z.wall, 120],
["sh", 0, "shade_" + light, "n", 0, 0, Z.shade, 120], ["sh", 0, "shade_" + light, "f", 0, 0, Z.shade, 120]];
}
function picture(now, st, dx, pace) {
const list = [fixed[0], slats(now, pace)], used = [];
for (let i = 0; i < B.things.length; i++) {
const t = B.things[i], kind = K[t.k];
const beat = Math.floor((now - t.born) / kind.ms);
const frame = kind.q ? kind.q[beat % kind.q.length] : beat % kind.n;
used[t.slot] = 1;
const left = leftOf(t, st, now);
if (left + t.w <= WALL - 2) list.push(["t" + t.slot, 0, kind.f + t.v, "f0", -90, t.y, Z.thing + i, 120]);   // (waiting, its film loaded)
else list.push(["t" + t.slot, 0, kind.f + t.v, "f" + frame, left + dx, t.y, Z.thing + i, 20]);
}
for (let n = 0; n < SLOTS; n++) {                      // the places not in use wait off-screen
if (!used[n]) list.push(["t" + n, 0, K[0].f + "0", "f0", OFFX, 0, Z.thing, 120]);
}
list.push(fixed[1], flaps(now, st, dx), now < flashEnd ? fixed[3] : fixed[2]);    // (the lamps flare: no dark between the pools)
list.push(DOWN, markOk(false), markStart(false));      // (the shutter that can come down, the guide's two marks that
if (title) list.push(title.fade ? TITLE_OFF : TITLE_ON, ["sn", 0, "start", "a", title.fade ? OFFX : D.startX, 0, Z.title + 1, 120]);   // are films: always there, out of sight)
list.push(SLAB);                                       // (the slab between two floors: always there, out of sight; the last)
return list;
}
function setSpeed(to, now) {
to = clamp(to, 0, 3);
if (to === speed) return;
if (!halt) {
if (to === 0) throwAll(STOP, now);
else if (speed === 0) throwAll(GO, now);
}
speed = to;
saveDue = now + 1500;
}
const SLAB = ["lf", 0, "lift", "n1", 0, -40, Z.lift, 120];
const DOWN = ["sd", 0, "shutter", "clear", 0, 0, Z.shutter + 1, 120];
const TITLE_ON = ["ti", 0, "title", "on", 0, 0, Z.title, 120], TITLE_OFF = ["ti", 1, "title", "fade", 0, 0, Z.title, 120];
const markOk = (on) => ["pm", 0, "press", "a", on ? D.pressX : OFFX, 0, Z.signs + 1, 120];
const markStart = (on) => ["sm", 0, "start", "a", on ? D.startX : OFFX, 0, Z.signs + 1, 120];
function setMarks(list, page, on) {
let ok = false, st = false;
for (let i = 0; i < list.length; i++) {
if (list[i][0] === "pm") {
list[i] = markOk(on && page === D.pressPage);
ok = true;
} else if (list[i][0] === "sm") {
list[i] = markStart(on && page === D.startPage);
st = true;
}
}
if (!ok) list.unshift(markOk(on && page === D.pressPage));
if (!st) list.unshift(markStart(on && page === D.startPage));
return list;
}
const SLAB_IN = [-12, -7, -3, 0], SLAB_OUT = [3, 8, 13, 17];
async function nextBelt() {
let now = Date.now();
const to = (belt + 1) % 4, pace = halt ? 0 : speed;
const slab = (y) => ["lf", 0, "lift", "n" + (to + 1), 0, y, Z.lift, 120];
tag = null;                                            // (a tag that was out goes with the belt it belonged to)
let list = picture(now, Math.floor(dist), 0, pace);
for (let i = 0; i < SLAB_IN.length; i++) {
list[list.length - 1] = slab(SLAB_IN[i]);
await sync(list, 0);
await sleep(30);
}
now = Date.now();
if (pace) dist += SPEED[pace] * Math.min(600, now - lastNow) / 1000;
belt = to;
B = belts[belt];
lurch = null;
flapWas = "";
flapEnd = 0;
flap = REST;
plan(B, belt, now, true);
leave(B, Math.floor(dist), now);
hall();
list = picture(now, Math.floor(dist), 0, pace);
list[list.length - 1] = slab(0);
await sync(list, 0);                                   // under the slab
for (let i = 0; i < SLAB_OUT.length; i++) {
list[list.length - 1] = slab(SLAB_OUT[i]);
await sync(list, 0);
await sleep(30);
}
now = Date.now();
flashEnd = now + 170;                                  // its lamps flare once
lastNow = now;
saveDue = now + 1500;
ctl.turn = 0;                                          // (a turn or a slap during the move is not kept; one more press is)
ctl.start = false;
}
async function look(now) {
let turn = ctl.turn, start = ctl.start;
const ok = ctl.ok;
ctl.turn = 0;
ctl.ok = ctl.start = false;
if (title && !title.fade) {                            // the main screen: OK = the guide, START = enter at once,
if (ok) {                                            // a turn = nothing; without a key it goes by itself
guideAsked = true;
return 30;
}
if (start || now >= title.until) title.fade = now;
turn = 0;
start = false;
} else if (title && now >= title.fade + D.fadeMs + 150) {
title = null;                                        // (faded: its element goes)
}
if (ok) {
await nextBelt();
return 30;
}
const dt = Math.min(600, now - lastNow);
lastNow = now;
let quick = false;
if (turn) setSpeed(speed + (turn > 0 ? 1 : -1), now);
if (halt && now >= halt) {
halt = 0;
if (speed) throwAll(GO, now);
}
if (!halt && !jolted && speed && now >= nextJolt && B.things.length && !tag) {
halt = now + 1150;
throwAll(HARD, now);
jolted = true;
}
if (!halt && jolted) {
jolted = false;
nextJolt = now + (D.jolt ? D.jolt * 1000 : 40000 + rnd(50000));
}
const pace = halt ? 0 : speed;
if (pace) dist += SPEED[pace] * dt / 1000;
const st = Math.floor(dist);
const dx = thrown(now);
if (lurch) quick = true;
leave(B, st, now);
plan(B, belt, now, false);
const list = picture(now, st, dx, pace);
if (start) {
if (tag) {
if (!tag.cut) tag.cut = now;
} else {
openTag(now, st);
}
}
if (tag && tagEls(list, now, st)) quick = true;
if (now < flashEnd) quick = true;
await sync(list, 0);
if (now >= checkDue) {
checkDue = now + 5000;
await readSettings();
const was = light;
light = lightNow();
if (light !== was) hall();
}
if (D.count && now - postsAt >= 10000) {
console.log(APP + " draws " + posts + " in " + Math.round((now - postsAt) / 1000) + " s, things " + B.things.length + ", pace " + pace +
", belt " + (belt + 1));
posts = 0;
postsAt = now;
}
if (saveDue && now >= saveDue) {
saveDue = 0;
keep();
}
return quick ? 60 : TICK;
}
const SHUT = ["st", 0, "shutter", "shut", 0, 0, Z.shutter, 120];
const sign = (name) => ["sg", 0, "signs", name, 0, 0, Z.signs, 120];
const anyKey = () => stopped || ctl.turn || ctl.ok || ctl.start;
function noKeys() {
ctl.turn = 0;
ctl.ok = ctl.start = false;
}
function fill(now) {
const st = Math.floor(dist);
for (let n = 0; n < 4; n++) {
const b = belts[n];
b.things = [];
b.free = [6, 5, 4, 3, 2, 1, 0];
b.recent = [[], []];
b.next = null;
if (PARADE.length === 0) {
const a = put(b, choose(b), st, now, 0);
a.x0 = 40 + rnd(12);
const c = put(b, choose(b), st, now, 0);
c.x0 = clamp(a.x0 - c.w - 5 - rnd(10), WALL + 2, 32);
}
plan(b, n, now, false);
}
}
function shutHall(now) {
B = belts[belt];
tag = null;
lurch = null;
halt = 0;
jolted = false;
flapWas = "";
flapEnd = 0;
flap = REST;
hall();
title = { until: 0, fade: 0 };                         // (the main screen: made here, behind the shutter)
const list = picture(now, Math.floor(dist), 0, 0);
for (let i = 0; i < list.length; i++) {                // (they stand: nothing has to be sent again soon while the guide waits)
if (list[i][7] < 120) list[i] = list[i].slice(0, 7).concat([120]);
}
list.push(["cv", 0, "open", "o0", 0, 0, Z.cover, 120]);
return list;
}
async function clearAll(now) {
startOver = false;
speed = 2;
belt = 0;
seenGuide = false;
saveDue = 0;
fill(now);
await keep();
}
async function opening(list) {
let page = 0, backs = 0;
const book = () => !seenGuide || guideAsked;
onBack = () => {                                       // BACK in the book: a page back (on the first page it closes the book);
if (!book()) return false;                           // without the book it leaves the app
backs++;
return true;
};
noKeys();
while (!stopped) {
if (startOver) {                                     // "Start over": said on the shutter, then the guide from its first page
await clearAll(Date.now());
guideAsked = false;
await sync(setMarks([SHUT, sign("R")], 0, false), 0, true);
list = null;                                       // (the hall behind is made anew)
page = 0;
await sleep(1500);
noKeys();
backs = 0;
}
const show = sign(book() ? "p" + (page + 1) : "off");
if (!list) {                                         // the hall behind the shutter: made off-screen, then moved into place
await sync(setMarks([SHUT, show], page, book()), 0, true);
list = shutHall(Date.now());
const behind = list.filter((el) => el[0] !== "pm" && el[0] !== "sm");     // (the page's mark stays where it is)
await sync(behind, OFFX, true);
await sync(behind, 0, true);
list.push(SHUT, show);
} else if (list[list.length - 1][0] !== "sg") {
list.push(SHUT, show);
} else {
list[list.length - 1] = show;
}
await sync(setMarks(list, page, book()), 0);
if (!book()) {                                       // no book: the shutter stands a moment, and opens
await sleep(500);
await readSettings();
if (startOver) continue;
break;
}
let asked = Date.now();
while (!stopped && !ctl.turn && !ctl.ok && !ctl.start && !backs && !startOver) {
await nap(5000);
if (Date.now() - asked >= 5000 && !ctl.turn && !ctl.ok && !ctl.start && !backs) {
asked = Date.now();
await readSettings();
await sync(list, 0);
}
}
if (stopped || startOver) continue;
let step = 0, wentBack = false;
if (backs) {
backs--;
step = -1;
wentBack = true;
} else if (ctl.turn) {
step = ctl.turn > 0 ? 1 : -1;
ctl.turn -= step;
} else if (pressed.ok > 0) {
if (pressed.ok > 1) pressed.ok--;
else ctl.ok = false;
step = 1;
} else {
if (pressed.start > 1) pressed.start--;
else ctl.start = false;
step = 1;
}
if (wentBack ? page === 0 : page === D.pages - 1) {  // the book is closed: any key or turn on the last page, BACK on the first
const first = !seenGuide;
seenGuide = true;
guideAsked = false;
if (first) await keep();
break;
}
page = clamp(page + step, 0, D.pages - 1);
}
onBack = null;
if (stopped) return;
noKeys();
setMarks(list, 0, false);
list.pop();
list[list.length - 1] = ["st", 1, "shutter", "up", 0, 0, Z.shutter, 120];
await sync(list, 0);
await sleep(D.shutUp + 80);
list.pop();
list[list.length - 1] = ["cv", 1, "open", "strike", 0, 0, Z.cover, 120];     // (each lamp strikes, goes out, and stays on)
await sync(list, 0);
await sleep(D.strikeMs + 40);
noKeys();
}
async function running() {
let now = Date.now();
for (let n = 0; n < 4; n++) {
for (let i = 0; i < belts[n].things.length; i++) belts[n].things[i].born = now;
}
lastNow = postsAt = now;
checkDue = now + 5000;
nextJolt = now + (D.jolt ? D.jolt * 1000 : 30000 + rnd(40000));
slatKey = -1;
if (speed) throwAll(GO, now);                          // the belt starts
if (title) title.until = now + TITLE_MS;
noKeys();
while (!stopped && !startOver && !guideAsked) {
const t0 = Date.now();
let wait = TICK;
try {
wait = await look(t0);
} catch (err) {
report("belt", err);
wait = 500;
}
const left = wait - (Date.now() - t0);
if (left > 4) await nap(left);
else await sleep(4);
}
if (stopped) return;
now = Date.now();
const list = picture(now, Math.floor(dist), 0, halt ? 0 : speed);
for (let i = 0; i < list.length; i++) {
if (list[i][0] === "sd") list[i] = ["sd", 1, "shutter", "down", 0, 0, Z.shutter + 1, 60];
}
await sync(list, 0);
await sleep(D.shutDown + 60);
list.push(SHUT, sign("off"));
await sync(list, 0);
await sync(setMarks([SHUT, sign("off")], 0, false), 0);    // (the hall behind is taken away: it is made anew)
}
async function main() {
const t0 = Date.now();
await post([wireOf(["zz_sp", 1, "splash", "default", 0, 0, Z.splash, 30], 0)]);
await syncTime();
await load();
await readSettings();
light = lightNow();
fill(Date.now());
let flipped = startOver;
const front = setMarks([SHUT, sign(flipped ? "R" : seenGuide ? "off" : "p1")], 0, !flipped && !seenGuide);   // (flipped while the app was closed: the shutter says so)
await sync(front, OFFX, true);
await sleep(SPLASH_MS - 250 - (Date.now() - t0));
await sync(front, 0, true);                            // (under the film, which hides everything)
await sleep(SPLASH_MS - (Date.now() - t0));
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_sp"] }));
noKeys();
dataLoop();
while (!stopped) {
await opening(null);
if (stopped) break;
await running();
}
}
main();
})();

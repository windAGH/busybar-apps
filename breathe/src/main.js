// Breathe: a light to breathe with on the BUSY Bar. The light swells as you breathe in and sinks as you breathe
// out; a session is one to five minutes long. Three patterns, each with its own colour of light: Calm (seven breaths
// a minute, out longer than in), Box (4-4-4-4) and Sleep (4-7-8).
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (where things stand on the screen, how long the films run, the patterns, the letters of the
// summary), then the bar (its API, clock, controls and drawing), then the app (elements and chains of films, what is
// kept, the start page and the introduction, a session with pause and stop, the end and the summary), then the start.
// Everything that moves is a film in animations/; the script only says when each one starts.

const D = {"app":"io.github.windagh.breathe","name":"Breathe","hole":[27,3],"nameAt":[0,1],"digitAt":[45,0],"minAt":[58,1],"chevAt":[32,0],"pauseAt":[29,1],"glowAt":[0,11],"pages":5,"t":{"rest":3000,"wake":1200,"finish":4000,"glow":2400,"rise":1600,"name":700,"digit":500,"dim":1000,"word":2800,"hush":500,"unhush":900,"gather":1100,"cover":1000,"hold":350,"splash":1500},"caps":{"A":[".xx.","x..x","x..x","x..x","xxxx","x..x","x..x","x..x"],"B":["xxx.","x..x","x..x","xxx.","x..x","x..x","x..x","xxx."],"D":["xxx.","x..x","x..x","x..x","x..x","x..x","x..x","xxx."],"E":["xxxx","x...","x...","xxx.","x...","x...","x...","xxxx"],"F":["xxxx","x...","x...","xxx.","x...","x...","x...","x..."],"H":["x..x","x..x","x..x","xxxx","x..x","x..x","x..x","x..x"],"I":["x","x","x","x","x","x","x","x"],"M":["x...x","xx.xx","x.x.x","x.x.x","x...x","x...x","x...x","x...x"],"N":["x..x","xx.x","xx.x","x.xx","x.xx","x..x","x..x","x..x"],"R":["xxx.","x..x","x..x","xxx.","x.x.","x..x","x..x","x..x"],"S":[".xx.","x..x","x...",".xx.","...x","...x","x..x",".xx."],"T":["xxxxx","..x..","..x..","..x..","..x..","..x..","..x..","..x.."],"Y":["x...x","x...x",".x.x.",".x.x.","..x..","..x..","..x..","..x.."],"0":[".xx.","x..x","x..x","x..x","x..x","x..x","x..x",".xx."],"1":[".x.","xx.",".x.",".x.",".x.",".x.",".x.","xxx"],"2":[".xx.","x..x","...x","...x","..x.",".x..","x...","xxxx"],"3":[".xx.","x..x","...x",".xx.","...x","...x","x..x",".xx."],"4":["x..x","x..x","x..x","x..x","xxxx","...x","...x","...x"],"5":["xxxx","x...","x...","xxx.","...x","...x","x..x",".xx."],"6":[".xx.","x..x","x...","xxx.","x..x","x..x","x..x",".xx."],"7":["xxxx","...x","...x","..x.","..x.",".x..",".x..",".x.."],"8":[".xx.","x..x","x..x",".xx.","x..x","x..x","x..x",".xx."],"9":[".xx.","x..x","x..x","x..x",".xxx","...x","x..x",".xx."]," ":["..","..","..","..","..","..","..",".."]},"lineA":0.34,"sumY":2,"pats":[{"id":"calm","name":"CALM","ms":[3428.5714285714284,0,5142.857142857142,0],"f":["in_calm","","out_calm",""],"line":"#8C64C8","tones":["#FF99AC","#FFA4B3","#FFB0BA","#FFBBC2","#FFC6C9","#FFD1D1","#FFDDD8","#FFE8DF"]},{"id":"box","name":"BOX","ms":[4000,4000,4000,4000],"f":["in_box","hf4","out_box","he4"],"line":"#C8902E","tones":["#FFC566","#FFCB75","#FFD285","#FFD894","#FFDEA4","#FFE5B3","#FFEBC3","#FFF2D2"]},{"id":"sleep","name":"SLEEP","ms":[4000,7000,8000,0],"f":["in_sleep","hf7","out_sleep",""],"line":"#3C9A96","tones":["#51AAA0","#5DB1A6","#69B8AD","#74BEB3","#80C5B9","#8CCCBF","#98D3C6","#A4DACC"]}]};
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
ctl.hits = (ctl.hits || 0) + 1;
} else if (event.action === "short" && event.key === "start") {
ctl.start = true;
ctl.hits = (ctl.hits || 0) + 1;
} else {
return;
}
if (wake) wake();
});
// ===== breathe.js =====
(function () {
const PATS = D.pats, TM = D.t;
for (const key in TM) if (key !== "hold") TM[key] = Math.round(TM[key] * 1.12);
const AWAY = 300;                   // where a new element is made, off-screen, before it is moved into place
const ZTEXT = 1500000000, ZDIM = 1400000000, ZTOP = 2000000000;
const HX = D.hole[0], HY = D.hole[1];
const WORD = ["w_in_", "w_hold_", "w_out_", "w_hold_"];
let mode = "home";                  // home, run, pause, done
let pat = 0, mins = 1;              // what is chosen
let shownPat = 0, shownMin = 1;     // what the start page shows (it follows, one eased change at a time)
let wordsOn = true, startWith = 0;
let lz = 100;
const up = () => (lz += 10);
let pulseDue = 0, lightEnd = 0, nameEnd = 0, digitEnd = 0;
let backs = 0;
const st = { n: 0, min: 0, day: 0, streak: 0, len: 1, seen: 0, rs: null };       // (rs: how "Start over" was last found)
let resetOn = null, settingsDue = 0;        // "Start over" as the settings have it (null: not known)
let uhEnd = 0;                      // when the shade that clears off a new page (x_uh) has run out and can be taken away
const on = {};                      // the ids that are on the bar
function anim(id, name, x, y, z) {
on[id] = 1;
return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":' + x + ',"y":' + y +
',"align":"top_left","loop":false,"section":"default","timeout":0,"z_index":' + z + "}";
}
function box(id, x, y, w, h, colour, z) {
on[id] = 1;
return '{"id":"' + id + '","type":"rectangle","x":' + x + ',"y":' + y + ',"width":' + w + ',"height":' + h +
',"fill":"solid","fill_colors":["' + colour + '"],"border_width":0,"timeout":0,"z_index":' + z + "}";
}
function pic(id, data, x, y, z) {
on[id] = 1;
return JSON.stringify({ id: id, type: "xpmbitmap", x: x, y: y, align: "top_left", timeout: 0, data: data, z_index: z });
}
async function wipe(ids) {
const have = [];
for (let i = 0; i < ids.length; i++) {
if (on[ids[i]]) {
have.push(ids[i]);
delete on[ids[i]];
}
}
if (have.length) await drop(have);
}
const chains = {};
function ch(key) {
return chains[key] || (chains[key] = { n: 0, cur: "", old: "", oldAt: 0 });
}
async function clearOld(key) {
const c = ch(key);
if (c.old) {
const id = c.old;
c.old = "";
await wipe([id]);
}
}
function next(key) {
const c = ch(key), id = key + (c.n % 2);
c.n++;
c.old = c.cur;
c.cur = id;
c.oldAt = Date.now() + 500;
return id;
}
async function chain(key, name, x, y, z, more) {
await clearOld(key);
const id = next(key);
await post([anim(id, name, x, y, z === undefined ? ZTEXT + ch(key).n : z)].concat(more || []));
}
async function endChains(keys, ids) {
const all = (ids || []).slice();
for (let i = 0; i < keys.length; i++) {
const c = ch(keys[i]);
if (c.cur) all.push(c.cur);
if (c.old) all.push(c.old);
c.cur = c.old = "";
}
await wipe(all);
}
async function idle(until) {
let soon = until;
for (const key in chains) {
const c = chains[key];
if (!c.old) continue;
if (Date.now() >= c.oldAt) await clearOld(key);
else if (c.oldAt < soon) soon = c.oldAt;
}
if (on.x_uh && Date.now() >= uhEnd) await wipe(["x_uh"]);
if (ctl.turn || ctl.ok || ctl.start || backs) return;       // used while a request was on its way: there is no wait to cut short
await nap(soon - Date.now());
}
function keys() {
const k = { turn: ctl.turn, ok: ctl.ok, start: ctl.start, back: backs > 0 };
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
return k;
}
ctl.hits = 0;
onBack = () => {                    // Back leaves the app from the start page only; anywhere else it stops what is going on
if (mode === "home" || (mode === "guide" && gPage === 0)) {       // (and from the guide's first page)
if (wake) wake();               // (the page's wait is cut short: the app is gone at once, not when its next small breath is due)
return false;
}
backs++;
return true;
};
async function load() {
const got = await call("GET", "storage/read?path=/ext/data/breathe.json");
try {
const kept = got.ok && !D.fresh ? JSON.parse(got.text) : null;
if (kept && typeof kept === "object") {
const num = (v, lo, hi) => (typeof v === "number" && v >= lo && v <= hi ? Math.floor(v) : lo);
st.n = num(kept.n, 0, 1e9);
st.min = num(kept.min, 0, 1e9);
st.day = num(kept.day, 0, 1e7);
st.streak = num(kept.streak, 0, 1e6);
st.len = num(kept.len, 1, 5);
st.seen = kept.seen ? 1 : 0;
st.rs = typeof kept.rs === "boolean" ? kept.rs : null;
}
} catch (err) {
}
}
function save() {
return call("POST", "storage/write?path=/ext/data/breathe.json", JSON.stringify(st), "application/octet-stream");
}
async function readSettings() {
const v = await loadSettings();
wordsOn = v.words !== false;
startWith = 0;
for (let i = 0; i < PATS.length; i++) if (PATS[i].id === v.pattern) startWith = i;
resetOn = typeof v.reset === "boolean" ? v.reset : null;
}
function resetAsked() {
if (resetOn === null) return false;
if (st.rs === null) {
st.rs = resetOn;
save();
return false;
}
return resetOn !== st.rs;
}
function clearKept() {
st.n = st.min = st.day = st.streak = st.seen = 0;
st.len = 1;
st.rs = resetOn;
pat = startWith;
mins = 1;
return save();                    // at once
}
async function showHome(wake, veil) {
const id = PATS[pat].id;
if (!on.x_hu) await post([anim("x_hu", "hush_hold", 0, 0, ZTOP)]);
await clearUnhush();
await endChains(["n", "d", "c"], ["h_mn"]);
const n = next("n"), d = next("d"), c = next("c");
const page = (dx) => [anim(n, "nm_" + id, D.nameAt[0] + dx, D.nameAt[1], ZTEXT + ch("n").n),
anim(d, "d" + mins, D.digitAt[0] + dx, D.digitAt[1], ZTEXT + ch("d").n),
anim("h_mn", "min", D.minAt[0] + dx, D.minAt[1], ZTEXT),
anim(c, "chev0", D.chevAt[0] + dx, D.chevAt[1], ZTEXT + ch("c").n)];
await post(page(AWAY));           // (a new element is seen above everything for the moment in which it is made)
await post(page(0));
shownPat = pat;
shownMin = mins;
if (veil) {
if (!wake) await chain("l", "rest0_" + id, HX, HY, up());
await wipe(veil);
}
if (wake) {
await chain("l", "wake_" + id, HX, HY, up());
lightEnd = Date.now() + TM.wake + 200;
}
await post([anim("x_uh", "unhush", 0, 0, ZTOP + 1)]);   // (it stands black for TM.hold first: the shade under it goes meanwhile)
await sleep(TM.hold - 100);
await wipe(["x_hu"]);
uhEnd = Date.now() + TM.unhush + 250;
pulseDue = Math.max(Date.now() + TM.unhush, lightEnd);
nameEnd = digitEnd = 0;
mode = "home";
keys();
}
async function clearUnhush() {
if (!on.x_uh) return;
await sleep(uhEnd - Date.now());
await wipe(["x_uh"]);
}
async function fadeOutPage() {
await post([anim("x_hu", "hush", 0, 0, ZTOP)]);
await sleep(TM.hush + 100);
await clearUnhush();
await endChains(["n", "d", "c"], ["h_mn"]);
}
async function stepPattern() {
const to = (shownPat + 1) % PATS.length, a = PATS[shownPat].id, b = PATS[to].id;
await chain("n", "nm_" + a + "_" + b, D.nameAt[0], D.nameAt[1]);
await chain("l", "rest_" + a + "_" + b, HX, HY, up());
shownPat = to;
nameEnd = Date.now() + TM.name + 120;
}
async function pulse(withArrow) {   // the light at rest takes a small breath (a veil of light over it), the arrowhead with it
await chain("p", "pulse_" + PATS[shownPat].id, HX, HY, lz + 5);
if (withArrow) await chain("c", "chev", D.chevAt[0], D.chevAt[1]);
pulseDue = Date.now() + TM.rest + 1400;
}
const ZPAGE = ZTOP - 100;
let gPage = 0, gMade = false;
const gEl = (k, x) => anim("gp" + k, "g" + (k + 1), x, 0, ZPAGE);
const gSend = async (parts) => {    // (TEST build --lag: every request of the guide is held up, as the real bar holds it up)
if (D.lag) await sleep(80 + Math.random() * 70);
return post(parts);
};
async function makeGuide() {
const parts = [];
for (let k = 0; k < D.pages; k++) parts.push(gEl(k, AWAY));
await gSend(parts);
gMade = true;
}
async function guide() {
mode = "guide";
gPage = 0;
if (!gMade) await makeGuide();
await gSend([gEl(0, 0)]);
keys();
ctl.hits = 0;
while (!stopped) {
if (!(ctl.turn || ctl.hits || backs)) await nap(3600000);       // (nothing waiting: wait; no request is sent meanwhile)
const b = backs, k = keys(), hit = ctl.hits;
ctl.hits = 0;
const n = k.turn + hit - b;     // forward: a turn, START, OK; back: a turn the other way, BACK
if (gPage === D.pages - 1 && (k.turn || hit || b)) break;       // the last page: anything goes on
const to = Math.max(0, Math.min(D.pages - 1, gPage + n));
if (to !== gPage) {
await gSend([gEl(to, 0), gEl(gPage, AWAY)]);     // one request: the new page in, the old one out
gPage = to;
}
}
if (stopped) return;
st.seen = 1;
await save();
const ids = [];
for (let k = 0; k < D.pages; k++) ids.push("gp" + k);
gMade = false;
mode = "busy";
await wipe(ids);                  // the book is closed: black for a moment, then the light comes on and the start page comes up
await showHome(true, null);
}
async function freshCard(shown) {
mode = "busy";
if (shown) {
await fadeOutPage();
await endChains(["p"]);
await chain("l", "doze_" + shown, HX, HY, up());
await sleep(TM.wake + 100);
await wipe(["x_hu"]);
await endChains(["l"]);
}
const t = capsPic("A FRESH START"), x = (72 - t.w) >> 1;
await post([anim("x_cv", "cov_hold", 0, 0, ZTOP)]);
await post([pic("d_tx", t.data, x + AWAY, D.sumY + 1, ZTEXT)]);
await post([pic("d_tx", t.data, x, D.sumY + 1, ZTEXT)]);
await post([anim("x_cr", "cov_out", 0, 0, ZTOP + 1)]);
await sleep(TM.hold - 100);
await wipe(["x_cv"]);
if (!gMade) await makeGuide();
await sleep(TM.cover + 1500);
await post([anim("x_cv", "cov_in", 0, 0, ZTOP + 2)]);
await sleep(TM.cover + 120);
await wipe(["x_cr", "d_tx", "x_cv"]);
}
async function homeStep() {
let now = Date.now();
if (now >= settingsDue) {         // every five seconds: has "Start over" been flipped?
settingsDue = now + 5000;
await readSettings();
if (resetAsked()) {
const shown = PATS[shownPat].id;
await clearKept();
await freshCard(shown);
await guide();
return;
}
}
if (now >= pulseDue) await pulse(true);
now = Date.now();
if (shownMin !== mins && now >= digitEnd) {          // the numeral follows the knob: the old one dissolves, the new one grows
await chain("d", "d" + shownMin + mins, D.digitAt[0], D.digitAt[1]);
shownMin = mins;
digitEnd = Date.now() + TM.digit + 120;
}
if (shownPat !== pat && now >= nameEnd) await stepPattern();      // the name follows the presses, one pattern at a time
let until = Math.min(pulseDue, settingsDue);
if (shownMin !== mins) until = Math.min(until, digitEnd);
if (shownPat !== pat) until = Math.min(until, nameEnd);
await idle(until);
const k = keys();
if (k.turn) mins = Math.max(1, Math.min(5, mins + k.turn));
if (k.ok) pat = (pat + 1) % PATS.length;
if (k.start) await begin();
}
async function begin() {
mode = "run";
await post([anim("x_hu", "hush", 0, 0, ZTOP)]);      // everything round the light fades; the light goes on
const t0 = Date.now();
st.len = mins;
await save();
await readSettings();
await sleep(Math.max(t0 + TM.hush + 100, nameEnd) - Date.now());      // half a second (and a change of colour to its end): then the first breath in
await clearUnhush();
await endChains(["n", "d", "c"], ["h_mn"]);
await wipe(["x_hu"]);
await run();
}
let lineSaid = "";
function lineParts(part, z) {
const w8 = Math.round(Math.max(0, Math.min(72, 72 * part)) * 8);       // the line's length in eighths of an LED
lineSaid = "" + w8;
if (w8 <= 0) return [];
const whole = Math.floor((w8 - 1) / 8), frac = (w8 - whole * 8) / 8;  // whole LEDs, and the last one: 1/8 ... 8/8 lit
const hex = (a) => ("0" + Math.round(255 * a).toString(16).toUpperCase()).slice(-2);
const out = [];
if (whole >= 1) out.push(box("s_ln", 0, 15, whole, 1, PATS[pat].line + hex(D.lineA), z));      // (in the pattern's colour)
out.push(box("s_hd", whole, 15, 1, 1, PATS[pat].line + hex(D.lineA * frac), z));
return out;
}
async function line(part, z) {
const was = lineSaid, parts = lineParts(part, z);
if (lineSaid !== was && parts.length) await post(parts);
}
async function run() {
const P = PATS[pat].ms, F = PATS[pat].f, cycle = P[0] + P[1] + P[2] + P[3];   // the four parts of a breath, in ms
const total = D.short || Math.max(1, Math.round(mins * 60000 / cycle));  // whole breaths (Calm: 7 a minute); the last ends with its breath out
const totalMs = total * cycle - P[3];
const lineZ = lz + 500000;        // the line and the words: above this session's films of the light
let done = 0;                     // the phases that are over, in ms
let due = Date.now();             // when the phase on screen is over, by the clock
let lineAt = 0;
const lineEvery = Math.max(330, Math.min(1000, totalMs / 220));   // (the line grows a third of an LED at a time, or less)
lineSaid = "";
keys();
for (let b = 0; b < total; b++) {
for (let ph = 0; ph < 4; ph++) {
const ms = P[ph];
if (!ms || (ph === 3 && b === total - 1)) continue;
const t0 = due;
due += ms;
const more = lineParts(done / totalMs, lineZ);
if (wordsOn && b < 3) {       // IN, HOLD, OUT: with the first three breaths, then only the light
await clearOld("w");            // (the word in the pattern's colour, and under it its shade: two films, one fade)
await clearOld("ws");
more.push(anim(next("ws"), "w_shade", 0, 0, lineZ + 1 + ch("ws").n), anim(next("w"), WORD[ph] + PATS[pat].id, 0, 0, lineZ + 2000 + ch("w").n));
}
if (ph === 0 || ph === 2) {
await chain("l", F[ph], 0, 0, b === 0 && ph === 0 ? lz + 2 : up(), more);     // (the very first: under the veil, see lz)
} else {                      // a hold: the film of the light stands on its last picture; a faint shade comes and goes over it
await clearOld("g");
more.unshift(anim(next("g"), F[ph], ph === 1 ? 0 : HX, ph === 1 ? 0 : HY, lineZ - 1000 + ch("g").n));
await post(more);
}
while (!stopped) {
const now = Date.now();
if (now >= due) break;
if (now >= lineAt) {
await line((done + Math.min(ms, now - t0)) / totalMs, lineZ);
lineAt = Date.now() + lineEvery;
}
if (now >= settingsDue && due - now > 600) {      // "Start over" flipped during a session: the session stops as with
settingsDue = now + 5000;                       // BACK, and the start page (homeStep) clears and starts over
await readSettings();
if (resetAsked()) {
settingsDue = 0;
return stop();
}
}
await idle(Math.min(due, lineAt, settingsDue));
const k = keys();
if (k.back) return stop();
if (k.start) {
if (!(await pause(ph < 2, due, (done + Math.min(ms, Date.now() - t0)) / totalMs, lineZ))) return stop();
if (due < Date.now() + 150) due = Date.now() + 150;       // the film has come to its end meanwhile: the next phase now
}
}
if (stopped) return;
done += ms;
}
}
await finish(total, lineZ);
}
async function pause(endsFull, due, part, lineZ) {
mode = "pause";
const id = PATS[pat].id;
await post([anim("x_dm", "dim", 0, 0, ZDIM), anim("x_pz", "pz_in_" + id, D.pauseAt[0], D.pauseAt[1], ZTEXT)].concat(lineParts(part, ZTOP - 10)));
const t0 = Date.now();
let go = null;
while (go === null && !stopped) {
await idle(Date.now() + 60000);
const k = keys();
if (k.back) go = false;
else if (k.start) go = true;
}
if (!go) return false;
await sleep(t0 + TM.dim + 100 - Date.now());         // (pressed again at once: the dimming is let to its end first)
await post([anim("x_po", "pz_out_" + id, D.pauseAt[0], D.pauseAt[1], ZTEXT + 1)]);  // the same bars: they light up, then dissolve
await wipe(["x_pz"]);
await sleep(due + 150 - Date.now());                 // the light's film has come to its end: the picture is known
await post([endsFull ? anim("x_go", "go_full_" + id, 0, 0, ZDIM + 1) : anim("x_go", "go_rest_" + id, HX, HY, ZDIM + 1)]);
await sleep(250);
await wipe(["x_dm"]);                                // (unseen, under it)
await sleep(TM.dim);
await wipe(["x_go", "x_po"]);                        // under it the light's own film stands on the same picture
await post(lineParts(part, lineZ));
mode = "run";
keys();
return true;
}
async function stop() {
mode = "stop";
await post([anim("x_ga", "gather_" + PATS[pat].id, 0, 0, ZTOP + 5)]);
await sleep(TM.gather + 150);
await endChains(["l", "w", "ws", "g", "p"], ["s_ln", "s_hd", "x_dm", "x_pz", "x_po", "x_go"]);
await showHome(false, ["x_ga"]);
}
async function finish(breaths, lineZ) {
mode = "done";
lz = lineZ + 10;                  // above the line: the film starts with the line on it and lets it fade
await chain("l", "finish_" + PATS[pat].id, 0, 0, up());
const t0 = Date.now();
const day = Math.floor((Date.now() + zoneMs) / 86400000);
if (st.day !== day) {
st.streak = st.day === day - 1 ? st.streak + 1 : 1;
st.day = day;
}
if (st.streak < 1) st.streak = 1;
if (D.days && st.streak < D.days) st.streak = D.days;
const minutes = D.short ? 1 : mins;
st.n++;
st.min += minutes;
await save();
await sleep(t0 + 700 - Date.now());
await endChains(["w", "ws", "g", "p"], ["s_ln", "s_hd"]);
await sleep(t0 + TM.finish + 200 - Date.now());
await summary(minutes, breaths);
}
const ROWKEY = "abcdefgh";
function capsPic(s) {
const rows = ["", "", "", "", "", "", "", ""];
for (let i = 0; i < s.length; i++) {
const g = D.caps[s[i]] || D.caps[" "];
for (let r = 0; r < 8; r++) rows[r] += (i ? "." : "") + g[r].split("x").join(ROWKEY[r]);
}
const head = ["! XPM2", rows[0].length + " 8 9 1", ". c none"];
for (let r = 0; r < 8; r++) head.push(ROWKEY[r] + " c " + PATS[pat].tones[r]);       // (the pattern's colour)
return { data: head.concat(rows).join("\n"), w: rows[0].length };
}
async function waitKey(ms) {
const end = Date.now() + ms;
while (Date.now() < end && !stopped) {
await idle(end);
const k = keys();
if (k.turn || k.ok || k.start || k.back) return true;
}
return false;
}
async function summary(minutes, breaths) {
const lines = [minutes + " MIN", breaths + (breaths === 1 ? " BREATH" : " BREATHS")];
if (st.streak >= 2) lines.push("DAY " + st.streak);
await post([anim("x_cv", "cov_hold", 0, 0, ZTOP)]);  // black over the rows above the afterglow (black on black)
keys();
let leave = false;
for (let n = 0; n < lines.length * 2 && !leave && !stopped; n++) {
const t = capsPic(lines[n % lines.length]), x = (72 - t.w) >> 1;
await post([pic("d_tx", t.data, x + AWAY, D.sumY, ZTEXT)]);
await post([pic("d_tx", t.data, x, D.sumY, ZTEXT)]);                // under the cover
await post([anim("x_cr", "cov_out", 0, 0, ZTOP + 1)]);              // which clears from the bottom row upwards:
await chain("l", "glow_" + PATS[pat].id, D.glowAt[0], D.glowAt[1], up());   // the line grows out of the glow, and the glow swells
lightEnd = Date.now() + TM.glow + 200;
await sleep(TM.hold - 100);                         // (the new cover stands black that long before it clears)
await wipe(["x_cv"]);
leave = await waitKey(TM.cover + 2500);
await post([anim("x_cv", "cov_in", 0, 0, ZTOP + 2)]);              // and it dissolves
await sleep(TM.cover + 120);
await wipe(["x_cr"]);
}
await wipe(["d_tx"]);
await sleep(lightEnd - Date.now());
await wipe(["x_cv"]);
await chain("l", "rise_" + PATS[pat].id, 0, 0, up());     // the afterglow gathers and lifts: the light at rest again
await sleep(TM.rise + 150);
lightEnd = 0;
await showHome(false, null);
}
async function recover() {
const all = [];
for (const id in on) if (id !== "bg") all.push(id);
for (const key in chains) chains[key].cur = chains[key].old = "";
await wipe(all);
gMade = false;
await showHome(true, null);
}
async function main() {
const t0 = Date.now();
await post([box("bg", 0, 0, 72, 16, "#000000FF", 0), anim("x_sp", "splash", 0, 0, ZTOP + 50)]);
await syncTime();
await readSettings();
await load();
pat = startWith;
mins = st.len;
dataLoop();
const fresh = resetAsked();       // "Start over" was flipped while the app was closed
if (fresh) await clearKept();
const first = (!st.seen && !D.fresh) || D.guide;        // the first start (or the first after starting over): the guide
if (first) await makeGuide();     // (its pages, off-screen, while the mark plays)
while (!stopped && Date.now() < t0 + TM.splash) await sleep(50);      // (1.5 s, and the eighth more that every film is given)
if (stopped) return;
await wipe(["x_sp"]);             // (it stands on black; under it is black)
keys();
if (fresh) await freshCard("");
if (first) await guide();
else await showHome(true, null);
settingsDue = Date.now() + 5000;
while (!stopped) {
try {
await homeStep();
} catch (err) {
report("breathe", err);
await sleep(500);
try {
await recover();
} catch (again) {
report("breathe", again);
}
}
}
}
main();
})();

// Gameday: NFL game day on the BUSY Bar. One game at a time as a score strip of 72 x 16: while a game is on, the
// app stays on it; when none is, the finished games and the ones to come take turns; when the season is over, the
// champions' banner. The numbers come straight from ESPN's public scoreboard over the bar's Wi-Fi.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (team colours, sizes of the pictures, widths of the bar's letters, lengths of the animations),
// then the bar (its API, clock, controls, drawing, the change from one picture to the next), then the score strip
// (the week's games read one small request at a time, one game as a strip, the carousel, the controls, the
// big-play signs, the season's end), then the settings and the start.

const D = {"app":"io.github.windagh.gameday","team":{"ARI":"#D0103A","ATL":"#E0183C","BAL":"#7A4BD6","BUF":"#2460E8","CAR":"#10A0EA","CHI":"#FA5A12","CIN":"#FB4F14","CLE":"#FF5014","DAL":"#C4D0DE","DEN":"#FB4F14","DET":"#1E90E0","GB":"#FFB612","HOU":"#E21030","IND":"#2A66E8","JAX":"#1AA8A4","KC":"#E8162F","LAC":"#1C9BF0","LAR":"#3565F0","LV":"#C8CDD2","MIA":"#08B8BA","MIN":"#7A45D8","NE":"#D81432","NO":"#D3BC8D","NYG":"#3358DC","NYJ":"#20B06C","PHI":"#14907A","PIT":"#FFB612","SEA":"#69C828","SF":"#DC1C24","TB":"#DA1616","TEN":"#4B92DB","WSH":"#B82642"},"logo":{"ARI":[14,13,0,0],"ATL":[14,13,0,0],"BAL":[14,14,0,0],"BUF":[14,14,0,0],"CAR":[14,14,0,0],"CHI":[14,13,0,0],"CIN":[14,13,0,0],"CLE":[14,14,0,0],"DAL":[12,14,1,1],"DEN":[14,14,0,0],"DET":[14,13,0,0],"GB":[14,9,0,0],"HOU":[13,14,1,1],"IND":[12,13,1,1],"JAX":[14,14,0,0],"KC":[14,9,0,0],"LAC":[14,14,0,0],"LAR":[14,14,0,0],"LV":[12,10,1,1],"MIA":[14,14,0,0],"MIN":[14,14,0,0],"NE":[14,9,0,0],"NO":[13,9,0,1],"NYG":[14,13,0,0],"NYJ":[14,13,0,0],"PHI":[14,13,0,0],"PIT":[12,12,1,1],"SEA":[14,14,0,0],"SF":[14,9,0,0],"TB":[14,8,0,0],"TEN":[12,13,1,1],"WSH":[14,14,0,0],"XXX":[10,4]},"name":"Gameday","card":300,"roll":150,"swap":733,"sign":{"td":1300,"fg":1300,"safety":1300,"two":1300,"int":1300,"fumble":1300,"sack":1300,"who":2200,"kick":1400,"final":1300,"ot":1300},"plate":{"ARI":"#D0103A","ATL":"#E0183C","BAL":"#7A4BD6","BUF":"#2460E8","CAR":"#0557A3","CHI":"#AE2306","CIN":"#AF1B07","CLE":"#B21B07","DAL":"#888E9B","DEN":"#AF1B07","DET":"#0F4F9C","GB":"#B26506","HOU":"#E21030","IND":"#2A66E8","JAX":"#0E6A75","KC":"#E8162F","LAC":"#0D54A7","LAR":"#3565F0","LV":"#30333A","MIA":"#006E82","MIN":"#7A45D8","NE":"#D81432","NO":"#937B60","NYG":"#3358DC","NYJ":"#127B58","PHI":"#0A6461","PIT":"#B26506","SEA":"#368C17","SF":"#DC1C24","TB":"#DA1616","TEN":"#305599","WSH":"#B82642"},"shade":{"ARI":"#58002B","ATL":"#5F032C","BAL":"#281B5B","BUF":"#090C62","CAR":"#001245","CHI":"#4A0007","CIN":"#4A000B","CLE":"#4B000B","DAL":"#393942","DEN":"#4A000B","DET":"#020E42","GB":"#4B1600","HOU":"#600028","IND":"#0B1062","JAX":"#022032","KC":"#620227","LAC":"#000E47","LAR":"#111066","LV":"#141419","MIA":"#002037","MIN":"#26185C","NE":"#5C0227","NO":"#3E2D27","NYG":"#13105D","NYJ":"#043431","PHI":"#01212A","PIT":"#4B1600","SEA":"#063B06","SF":"#5D0520","TB":"#5C031A","TEN":"#111541","WSH":"#4E0B2A"},"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1,"&":4},"smallGap":1,"xl":{"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7},"bold":{"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6},"normal":{"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5}};
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
function unsure() {
for (const rec of live.values()) rec.t = 0;
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
if (await post(inOrder(els, 1).map((el) => wire(el)))) remember(els);       // (not taken as drawn when the bar refused it)
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
// ===== scores.js =====
const LIVE = "#45E06FFF", DOWN = "#FFC61AFF";
const PER_GAME = D.quick ? 2500 : 6000;         // ms a game stays up (test builds: shorter)
const BREAK_TOUR = false;           // true: when the game on show goes into a break (end of a quarter, halftime, a
const BREAK_WAIT = 18000;
const FINAL_STAY = 20000;           // ms the final of the game on show stays before another game takes its place
const TIMEOUT_MS = 120000;          // how long a timeout usually takes on air; only used for the estimate
const HALFTIME_MS = 13 * 60000;     // an NFL halftime (the title game's is about twice that); estimate only
const SOON_MS = 3600000;            // from this long before kick-off a game counts as "on"
let downStays = false;              // setting "Down & distance" = always: it keeps its row, clock and quarter take turns
let teamsAsText = !!D.lettersOnly;  // the two teams as their three letters instead of their logos
let TEAMS = ["CHI"];                // followed teams, first one first (set from the app's "My team" setting)
let gameIndex = 0;                  // which game of the playlist is next; carries on from one visit to the next
let scoresUp = false;               // the strip is on screen (live games are then refreshed faster)
let scoresWanted = true;            // false: the app does not show scores at all, so none are asked for
let onlyMine = false;               // true: only the followed team's game (when it has one this week)
let mainId = null;                  // Scores app: THE game (the one it stays on)
let onScreen = null;                // the game on screen
const LIST_HOSTS = ["https://sports.core.api.espn.com"], LIST_PATH = "/v2/sports/football/leagues/nfl/events?limit=40";
const GAME_HOSTS = ["https://site.api.espn.com", "https://site.web.api.espn.com"];
const GAME_PATH = "/apis/site/v2/sports/football/nfl/scoreboard/";
for (let i = 0; i < (D.dead || 0); i++) GAME_HOSTS[i] = LIST_HOSTS[i] = "https://dead" + i + ".espn.invalid";     // test builds
const STALE_MS = 150000;            // a live game's numbers older than this are shown as not fresh
callWait = 7000;
netWait = 15000;
let gameIds = [];
let mineIds = null, mineFor = "";
function mineToCome() {
if (mineIds === null) return true;
for (let i = 0; i < mineIds.length; i++) if (!games.get(mineIds[i])) return true;
return false;
}
const games = new Map();            // id -> game
const fetched = new Map();          // id -> { at: when we last have it from, hold: do not ask again before }
let listLoaded = false, listDue = 0;
let lastKnown = {}, lastRead = false, lastDirty = false, keepDue = 0;
function keepWeek() {
const st = {};
for (let i = 0; i < gameIds.length; i++) if (lastKnown[gameIds[i]]) st[gameIds[i]] = lastKnown[gameIds[i]];
lastDirty = false;
call("POST", "storage/write?path=/ext/data/week.json", JSON.stringify({ at: Date.now(), ids: gameIds, st: st }), "application/octet-stream");
}
let roundUntil = 0;
function allSeen() {
if (!roundUntil) return false;                 // which games there are is not known yet
if (Date.now() > roundUntil) return true;
for (let i = 0; i < gameIds.length; i++) if (!games.get(gameIds[i])) return false;
return true;
}
function firstLooks(now) {
const n = gameIds.length, live = [], out = [];
let lo = -1, hi = n;
for (let i = 0; i < n; i++) {
const g = games.get(gameIds[i]), k = lastKnown[gameIds[i]];
const state = g ? (isOn(g) ? "in" : g.state) : k ? (k[0] === "pre" && k[1] < now ? "in" : k[0]) : "";
if (state === "in") live.push(i);
else if (state === "post") lo = i;
else if (state === "pre" && hi === n) hi = i;
}
for (let i = 0; i < n; i++) {
const id = gameIds[i], k = lastKnown[id];
let v;
if (mineIds && mineIds.indexOf(id) !== -1) v = 9e11;
else if (k && k[0] === "in") v = 8e11;
else if (k && k[0] === "pre") v = k[1] < now + 3600000 ? 7e11 - Math.abs(now - k[1]) / 1000 : 1e11;
else if (k) v = 2e11;
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
let ids = [];
try {
const got = await getJsonAny(LIST_HOSTS, LIST_PATH);
const items = got.items || [];
for (let i = 0; i < items.length; i++) {
const m = /\/events\/(\d+)/.exec(items[i].$ref || "");
if (m) ids.push(m[1]);
}
} catch (err) {                                // no list: the one kept from last time, if it is under a week old
const kept = await call("GET", "storage/read?path=/ext/data/week.json");
let old = null;
try {
old = JSON.parse(kept.text);
} catch (e) {
}
if (gameIds.length) throw err;
if (kept.ok && old && old.ids && old.ids.length && Date.now() - old.at < 7 * 86400000) {
gameIds = old.ids;
lastKnown = old.st || lastKnown;
} else {                                     // nothing kept either: at least the followed team's next game
const team = await getJsonAny(GAME_HOSTS, "/apis/site/v2/sports/football/nfl/teams/" + TEAMS[0].toLowerCase());
const next = (team.team && team.team.nextEvent) || [];
gameIds = next.map((e) => String(e.id)).filter((id) => /^\d+$/.test(id));
}
if (gameIds.length && !roundUntil) roundUntil = Date.now() + 45000;
throw err;                                   // still a failure (it is tried again), but the games can be asked for
}
if (D.when) ids = [];                           // test builds (build.py --when): a date after the season, no games
gameIds = ids;
listLoaded = true;
if (!roundUntil) roundUntil = Date.now() + 45000;
keepWeek();
for (const id of games.keys()) {
if (ids.indexOf(id) === -1) {
games.delete(id);
fetched.delete(id);
}
}
}
function utc(s) {                                // "2026-11-26T01:00Z"
const m = /(\d+)-(\d+)-(\d+)T(\d+):(\d+)/.exec(s || "");
return m ? Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5])) : 0;
}
function record(c) {
const r = c.records && c.records[0];
return (r && r.summary) || "";
}
const hits = { on: true,            // setting "Big play effects"
wait: null };                     // { kind, team, who, rank, id, at }: a sign that waits for the page loop
const RANK = { kick: 0, sack: 1, fumble: 2, int: 2, two: 3, safety: 3, fg: 3, td: 4, ot: 5, final: 6 };
const SIGN_GAP = D.signGap || 20000;             // ms between two signs that are not points (test builds: shorter)
function wantSign(g, kind, team, who) {
if (!hits.on || g.id !== mainId || (!team && RANK[kind] < RANK.ot && kind !== "kick")) return;
if (!hits.wait || RANK[kind] >= hits.wait.rank) {
const s = { kind: kind, team: team, who: who, rank: RANK[kind], id: g.id, at: Date.now(), asked: true };
hits.wait = s;
if (team && kind !== "kick" && !(who && who.num) && !g.fakeWho) {      // who it was: from the play-by-play
s.asked = false;
lookWho(s);
}
}
}
async function lookWho(s) {
try {
const base = "/v2/sports/football/leagues/nfl/events/" + s.id + "/competitions/" + s.id + "/plays?limit=";
const n = Number((await getJsonAny(LIST_HOSTS, base + "1")).count) || 0;
if (!n) return;
const per = 6, page = Math.ceil(n / per);
let items = (await getJsonAny(LIST_HOSTS, base + per + "&page=" + page)).items || [];
if (items.length < 4 && page > 1) {
items = ((await getJsonAny(LIST_HOSTS, base + per + "&page=" + (page - 1))).items || []).concat(items);
}
const want = { td: /touchdown/i, fg: /field goal/i, safety: /safety/i, two: /two.point|2.point|touchdown/i, int: /intercept/i,
fumble: /fumble/i, sack: /sack/i }[s.kind];
let play = null;
for (let i = items.length - 1; i >= 0 && !play; i--) {
const type = String((items[i].type && items[i].type.text) || "");
if (want.test(type) && !(s.kind === "fg" && /missed|blocked/i.test(type))) play = items[i];
}
if (!play) return;
const order = { td: ["scorer", "rusher", "receiver"], fg: ["scorer", "kicker"], two: ["patScorer", "scorer"] }[s.kind] || [];
const parts = play.participants || [];
let ref = "";
for (let k = 0; k < order.length && !ref; k++) {
for (let i = 0; i < parts.length && !ref; i++) {
if (parts[i].type === order[k] && parts[i].athlete) ref = String(parts[i].athlete.$ref || "");
}
}
let who = null;
if (ref) {
const a = await getJson(ref.replace(/^http:/, "https:").split("?")[0]);
const name = String(a.lastName || a.displayName || "").toUpperCase().replace(/[^A-Z0-9 -]/g, "");
if (name) who = { num: String(a.jersey || ""), name: name, first: String(a.firstName || "").charAt(0).toUpperCase() };
}
if (!who) who = whoOf(s.kind, { text: play.text });      // a turnover, a sack: the name in the play's own words
if (!who) return;
const m = /(\d+)\s*Yd\.?\s*([A-Za-z]+)/.exec(String(play.shortText || ""));
if (m && (s.kind === "td" || s.kind === "fg")) {
const w = m[2].toLowerCase();
who.what = m[1] + " YD " + (w === "field" ? "FG" : w === "pass" ? "PASS" : w === "rush" || w === "run" ? "RUSH" : "RETURN");
}
s.who = who;
} catch (err) {
} finally {
s.asked = true;
}
}
function whoOf(kind, lp) {
try {
const list = (lp && lp.athletesInvolved) || [];
const text = String((lp && lp.text) || "");
const last = (m) => (m ? m[m.length - 1] : null);
let name = null;
if (kind === "int") name = last(/INTERCEPTED by\s*([A-Z]+-)?[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/.exec(text));
else if (kind === "fumble") name = last(/RECOVERED by\s*([A-Z]+-)?[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/i.exec(text));
else if (kind === "sack") name = last(/sacked[^()]*\(\s*(sack split by\s*)?[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/.exec(text));
else if (kind === "fg") name = last(/[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)\s+\d+ yard field goal/.exec(text));
else {                                       // points: the receiver of a pass, else whoever carried the ball
const seg = text.split("TOUCHDOWN")[0].split("PENALTY on")[0];
name = last(/INTERCEPTED by\s*([A-Z]+-)?[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/.exec(seg)) ||
last(/RECOVERED by\s*([A-Z]+-)?[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/.exec(seg)) ||
last(/pass[^.]*? to [A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/.exec(seg)) ||
last(/[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/.exec(seg));
}
const plain = (str) => String(str || "").toLowerCase().replace(/[^a-z]/g, "");
const family = (full) => {                   // "Patrick Mahomes II" -> "Mahomes"
const parts = String(full || "").split(" ").filter((w) => w && ["Jr.", "Jr", "Sr.", "Sr", "II", "III", "IV", "V"].indexOf(w) === -1);
return parts.length > 1 ? parts.slice(1).join(" ") : parts.join(" ");
};
let pick = null;
for (let i = 0; i < list.length && !pick; i++) {
const fam = plain(family(list[i].displayName || list[i].fullName || list[i].shortName));
if (name ? fam && fam === plain(name) : i === 0 && RANK[kind] >= RANK.two) pick = list[i];
}
if (!pick && !name) return null;
const shown = pick ? family(pick.displayName || pick.fullName || pick.shortName) || name : name;
let first = pick ? String(pick.displayName || pick.fullName || pick.shortName || "").charAt(0) : "";
if (!first && name) {
const at = text.indexOf("." + name) !== -1 ? text.indexOf("." + name) : text.indexOf(". " + name);
const head = at > 0 ? /([A-Z])[a-z]?[a-z]?$/.exec(text.slice(0, at)) : null;
if (head) first = head[1];
}
return { num: pick ? String(pick.jersey || "") : "", name: String(shown || "").toUpperCase().replace(/[^A-Z0-9 -]/g, ""),
first: /[A-Za-z]/.test(first) ? first.toUpperCase() : "" };
} catch (err) {
return null;                                 // a name is a bonus: never in the way of the scores
}
}
function spot(before, g, lp) {
if (!before || before.state !== "in") return;
if (g.state === "post" && !off(g)) return wantSign(g, "final", null, null);        // the final whistle
if (g.state !== "in") return;
if (before.period === 4 && g.period > 4) return wantSign(g, "ot", null, null);      // into overtime
const play = (g.last + " " + String((lp && lp.text) || "")).toLowerCase();
const sides = [["away", "as"], ["home", "hs"]];
for (let i = 0; i < 2; i++) {
const gain = g[sides[i][1]] - before[sides[i][1]], team = g[sides[i][0]];
const kind = gain >= 6 ? "td" : gain === 3 ? "fg" : gain === 2 ? (/safety/.test(play) ? "safety" : "two") : null;
if (kind) return wantSign(g, kind, team, g.fakeWho || whoOf(kind, lp));
}
if (!g.play || g.play === before.play) return;
if (/kickoff/.test(g.last.toLowerCase())) {    // a kick-off: the film, the ball's way over the field, and after it
const has = g.poss ? g[g.poss] : null;       // who has the ball and where
const who = has && g.ball ? { name: has + " BALL", what: "AT " + g.ball, team: has } : null;
const m = /kicks (\d+) yards from ([A-Z]+) (\d+)/.exec(String(g.fakeKick || (lp && lp.text) || ""));
if (who && m && typeof g.spot === "number") {
const right = m[2] !== g.home;             // kicked by the away side: towards the right
const from = right ? Number(m[3]) : 100 - Number(m[3]);
who.kick = { from: from, land: Math.max(-4, Math.min(104, from + (right ? 1 : -1) * Number(m[1]))), spot: g.spot };
}
return wantSign(g, "kick", null, who);
}
const has = g.poss ? g[g.poss] : null, other = g.poss === "away" ? g.home : g.poss === "home" ? g.away : null;
if (/intercept/.test(play)) wantSign(g, "int", has, g.fakeWho || whoOf("int", lp));
else if (/fumble/.test(play) && g.poss !== before.poss) wantSign(g, "fumble", has, g.fakeWho || whoOf("fumble", lp));
else if (/sack/.test(play)) wantSign(g, "sack", other, g.fakeWho || whoOf("sack", lp));
}
async function loadGame(id) {
const e = await getJsonAny(GAME_HOSTS, GAME_PATH + id);
const comp = e.competitions[0];
const t = {};
for (let i = 0; i < comp.competitors.length; i++) {
t[comp.competitors[i].homeAway] = comp.competitors[i];
}
const st = e.status || comp.status;
const sit = comp.situation || {};
const g = {
id: id, away: t.away.team.abbreviation, home: t.home.team.abbreviation,
as: parseInt(t.away.score, 10) || 0, hs: parseInt(t.home.score, 10) || 0,
state: st.type.state, period: st.period || 0, clock: st.displayClock || "", detail: st.type.shortDetail || "",
start: utc(e.date), rec_a: record(t.away), rec_h: record(t.home),
down_text: sit.shortDownDistanceText || "", distance: sit.distance, redzone: !!sit.isRedZone,
poss: null, spot: null,
status: st.type.name || "", last: (sit.lastPlay && sit.lastPlay.type && sit.lastPlay.type.text) || "",
to_a: sit.awayTimeouts, to_h: sit.homeTimeouts,          // timeouts each side has left (3 at the start of a half)
ball: String(sit.possessionText || ""),                  // where the ball is, as the feed writes it: "DET 25"
play: String((sit.lastPlay && sit.lastPlay.id) || ""), timeout_by: null, timeout_since: 0, at: Date.now(),
};
if (/timeout/i.test(g.last)) {                 // "Timeout #2 by GB at 03:12.": who called it (else: officials / TV)
const by = /by\s+([A-Z]{2,3})/.exec((sit.lastPlay && sit.lastPlay.text) || "");
g.timeout_by = by && by[1] === g.away ? "away" : by && by[1] === g.home ? "home" : "tv";
}
const has = String(sit.possession || "");     // who has the ball, and where it is (scores.situation)
if (has && has === String(t.away.id || t.away.team.id)) g.poss = "away";
if (has && has === String(t.home.id || t.home.team.id)) g.poss = "home";
const where = (sit.possessionText || "").split(/\s+/).filter((part) => part);   // "DET 35": 35 yards from DET's goal line
if (where.length === 2 && /^\d+$/.test(where[1])) {
if (where[0] === g.away) g.spot = Number(where[1]);
else if (where[0] === g.home) g.spot = 100 - Number(where[1]);
} else if (where.length === 1 && /^\d+$/.test(where[0])) {                    // midfield is written as just "50"
g.spot = Number(where[0]);
}
if (typeof fakeGame === "function") fakeGame(g, gameIds.indexOf(id));        // test builds only (test/fake.js)
const before = games.get(id);
if (g.timeout_by && g.state === "in") {
g.timeout_since = before && before.play === g.play && before.timeout_since ? before.timeout_since : Date.now();
}
if (inBreak(g)) g.breakSince = (before && before.breakSince) || Date.now();
setTick(g, before);                            // from where the shown clock counts down to this look's value
if (isHalf(g)) g.half_since = g.half_since || (before && before.half_since) || Date.now();
if (!before && followed(g)) gameIndex = 0;     // the followed team's game has just arrived: it is next
if (!lastKnown[id] || lastKnown[id][0] !== g.state) {       // (kept for the next start, when it changes)
lastKnown[id] = [g.state, g.start];
lastDirty = true;
}
try {
spot(before, g, sit.lastPlay);
} catch (err) {
report("sign", err);                         // a sign is a bonus: never in the way of the scores
}
games.set(id, g);
}
function isHalf(g) {
return g.state === "in" && /half/i.test(g.detail);
}
function off(g) {
return /POSTPON|CANCEL|FORFEIT/.test(g.status);
}
function soon(g) {
return g.state === "pre" && !off(g) && g.start - Date.now() <= SOON_MS;
}
function isOn(g) {
return g.state === "in" || soon(g);
}
function playing(g) {
return g.state === "in" && !inBreak(g);
}
function inBreak(g) {
if (g.state === "post" || g.state === "pre") return /DELAY|SUSPEND/.test(g.status) && g.state !== "post";
return g.status !== "STATUS_IN_PROGRESS" || /^end /i.test(g.last) || /half/i.test(g.detail);
}
function followed(g) {
return TEAMS.indexOf(g.away) !== -1 || TEAMS.indexOf(g.home) !== -1;
}
function goodFor(g) {
if (g.state === "in") {
if (!scoresUp) return 30000;
if (g.id === mainId || g.id === onScreen) return 5000;       // the game on show: every five seconds
const main = games.get(mainId);
return main && main.state === "in" ? 60000 : 8000;
}
if (g.state === "pre" && scoresUp && !off(g) && g.start - Date.now() < 120000 && Date.now() - g.start < 1800000) return 10000;
if (g.state !== "post" && Math.abs(g.start - Date.now()) < 4 * 3600000) return 60000;
return g.state === "post" ? 1800000 : 600000;
}
function staleGame(now) {
let pick = null, worst = -1, first = null;
const round = allSeen();
for (let i = 0; i < gameIds.length; i++) {
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
if (!scoresWanted || now < netPause) return false;
if (!lastRead) {                               // what the last run knew of the week's games (the bar's own storage: quick)
lastRead = true;
const kept = await call("GET", "storage/read?path=/ext/data/week.json");
try {
const old = JSON.parse(kept.text);
if (kept.ok && old && old.st && Date.now() - old.at < 7 * 86400000) lastKnown = old.st;
} catch (e) {
}
}
if (lastDirty && now >= keepDue && allSeen()) {
keepDue = now + 60000;
keepWeek();
}
if (now >= listDue) {
listDue = now + (gameIds.length ? 600000 : 0);                  // if it fails: again after the pause
await loadList();
listDue = Date.now() + 6 * 3600000;
return true;
}
if (listLoaded && gameIds.length && mineFor !== TEAMS[0] + gameIds[0]) {       // which of the week's games is the followed team's
mineFor = TEAMS[0] + gameIds[0];
mineIds = null;
let ids = [];
try {
const got = await getJsonAny(LIST_HOSTS, "/v2/sports/football/leagues/nfl/teams/" + TEAMS[0].toLowerCase() + "/events?limit=5");
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
const id = staleGame(now);
if (!id) return seasonFeed(now);               // no game needs a look: is the season over?
fetched.set(id, { at: (fetched.get(id) || { at: 0 }).at, hold: 0 });
await loadGame(id);
fetched.set(id, { at: id === mainId || id === onScreen ? Math.max(now, Date.now() - 3000) : Date.now(), hold: 0 });
return true;
});
const CHAMP_MS = 30 * 86400000;
let season = null;                  // { win, names, year, game: { away, home, as, hs }, at: when the title game was played, kick: next season's start or 0 }
let seasonDue = 0, seasonAsked = false;
function seasonNow() {
return D.when || Date.now();                   // test builds can pretend a date
}
function quiet() {
if (!listLoaded) return false;
const all = allGames();
if (all.length < gameIds.length) return false; // not every game of the list has been read yet
for (let i = 0; i < all.length; i++) {
if (all[i].state !== "post" || Date.now() - all[i].start < 2 * 86400000) return false;
}
return true;
}
async function loadSeason() {
const now = new Date(seasonNow());
const year = now.getUTCFullYear() - (now.getUTCMonth() < 8 ? 1 : 0);          // the season whose title game is in February
const base = "/v2/sports/football/leagues/nfl/seasons/";
const list = await getJsonAny(LIST_HOSTS, base + year + "/types/3/weeks/5/events");
const m = /\/events\/(\d+)/.exec((((list.items || [])[0]) || {}).$ref || "");
if (!m) return null;
const e = await getJsonAny(GAME_HOSTS, GAME_PATH + m[1]);
const comp = e.competitions[0], st = e.status || comp.status, c = comp.competitors;
if (st.type.state !== "post" || c.length !== 2) return null;
const s0 = parseInt(c[0].score, 10) || 0, s1 = parseInt(c[1].score, 10) || 0, w = s0 >= s1 ? 0 : 1;
const side = (which) => c[c[0].homeAway === which ? 0 : 1];
const clean = (name) => String(name || "").toUpperCase().replace(/[^A-Z0-9 ]/g, "");
const got = { win: c[w].team.abbreviation, year: year, at: utc(e.date), kick: 0,
names: [clean(c[w].team.name), clean(c[w].team.location), c[w].team.abbreviation],     // as the feed writes them
game: { away: side("away").team.abbreviation, home: side("home").team.abbreviation,
as: parseInt(side("away").score, 10) || 0, hs: parseInt(side("home").score, 10) || 0 } };
try {
got.kick = utc((await getJsonAny(LIST_HOSTS, base + (year + 1) + "/types/2")).startDate);
} catch (err) {
}
return got;
}
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
function seasonItems() {
if (!season || !quiet()) return null;
const now = seasonNow(), page = (kind) => ({ id: kind, kind: kind, state: "post", away: "", home: "", start: 0 });
if (now - season.at < CHAMP_MS) return [page("champ"), page("title")];
return season.kick > now ? [page("off"), page("kick")] : [page("off")];
}
function seasonEls(g, p) {
if (g.kind === "champ") {
const els = [];
cap(els, p + "ta", season.win, "a", false, true);
els.push({ id: p + "ch", type: "animation", path: "animations/champ.anim", x: 0, y: 0, align: "top_left", loop: true,
section: "default", timeout: STILL, z_index: 6, _w: 72 });
let name = season.names[2];
for (let i = 1; i >= 0; i--) if (season.names[i] && smallWidth(season.names[i]) <= 42) name = season.names[i];
els.push(text(p + "m1", name, "small", 36, 7, "#FFE9A8FF", "top_mid", 5));         // (under the plate)
return els;
}
if (g.kind === "title") {
const t = season.game, awayWon = t.as >= t.hs, els = [];
cap(els, p + "ta", t.away, "a", awayWon, true);
cap(els, p + "th", t.home, "h", !awayWon, true);
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
function allGames() {
const all = [];
for (let i = 0; i < gameIds.length; i++) {
const g = games.get(gameIds[i]);
if (g) all.push(g);
}
return all;
}
const byStart = (a, b) => a.start - b.start || (a.id < b.id ? -1 : 1);
function playlist() {
const out = seasonItems();                     // the season is out: the banner / the offseason card, not last games
if (out) return out;
let all = allGames();
const rank = (g) => TEAMS.findIndex((t) => t === g.away || t === g.home);
const mine = all.filter(followed).sort((a, b) => rank(a) - rank(b) || byStart(a, b));
const mineOn = mine.filter(isOn).sort((a, b) => (b.state === "in") - (a.state === "in"));
if (mineOn.length) return [mineOn[0]];
if (onlyMine && mine.length) all = mine;
const on = all.filter(isOn).sort(byStart);
if (on.length) return on;
return mine.concat(carousel(null).filter((g) => mine.indexOf(g) === -1));
}
function carousel(home) {
const out = seasonItems();
if (out) return out;
const all = allGames().filter((g) => !home || g.id !== home.id);
return all.filter(isOn).sort(byStart)
.concat(all.filter((g) => g.state === "post").sort(byStart))
.concat(all.filter((g) => g.state === "pre" && !soon(g)).sort(byStart));
}
const NAME_MS = 1000;               // how long the name stands before LOADING takes its place
const LOADPAGE = { id: "load", kind: "load", state: "pre", away: "", home: "", start: 0 };
let nameSince = 0, startDone = false;
function bandOpen() {
const n = gameIds.length;
let lo = -1, hi = n;
for (let i = 0; i < n; i++) {
const g = games.get(gameIds[i]);
if (g && g.state === "post") lo = i;
else if (g && g.state === "pre" && !isOn(g) && hi === n) hi = i;
}
for (let i = lo + 1; i < hi; i++) if (!games.get(gameIds[i])) return true;
return false;
}
function startReady() {
if (startDone) return true;
if (!roundUntil) return false;                 // which games there are is not known yet
if (allSeen()) startDone = true;
else if (!mineToCome() && (firstOn() || !bandOpen())) startDone = true;
return startDone;
}
function loadEls(p) {
const els = [text(p + "e", "LOADING", "small", 36, -1, SOFT, "top_mid")];
if (roundUntil && gameIds.length) {
let n = 0;
for (let i = 0; i < gameIds.length; i++) if (games.get(gameIds[i])) n++;
els.push(text(p + "m2", n + " OF " + gameIds.length, "small", 36, 6, FAINT, "top_mid"));
}
els.push(bar(p + "hb0", 4, 15, 64, 1, "#FFFFFF1C", 1),
{ id: p + "hfg", type: "animation", path: "animations/flow_g.anim", x: 4, y: 15, align: "top_left", loop: true,
section: "n32", timeout: STILL, z_index: 2, _w: 64 });
return els;
}
function firstOn() {
const on = allGames().filter(isOn).sort(byStart);
const rank = (g) => TEAMS.findIndex((t) => t === g.away || t === g.home);
const mine = on.filter(followed).sort((a, b) => rank(a) - rank(b) || (b.state === "in") - (a.state === "in"));
if (mine[0]) return mine[0];
if (on.length && listLoaded && gameIds.length && mineToCome()) return null;      // not before the followed team's game has been seen
return on[0] || null;
}
const TICK_LAG = 150, TICK_LAG_LAST = 80;         // tenths of a second
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
if (g.state !== "in" || inBreak(g) || timeoutLeft(g) > 0 || !k) return;
const was = clockShown(before, now);                         // what stands on screen at this moment
if (was <= f) return;                                        // there already (or time was put back): the feed's value
const lag = f < 600 ? TICK_LAG_LAST : TICK_LAG;
if (was - f >= lag + 10) g.tick.v = f + lag;                 // a second and more too far behind: from that distance, from now
else if (was > k.feed) { g.tick.v = k.v; g.tick.t0 = k.t0; } // counting: on, in step
else g.tick.v = was;                                         // it stood: from here, from now
}
function clockShown(g, at) {
const k = g.tick;
if (!k) return clockTenths(g.clock);
const t = (at === undefined ? Date.now() : at) - k.t0;
return Math.max(k.feed, k.v - 10 * Math.max(0, Math.floor(t / 1000)));
}
function clockText(g) {
const v = clockShown(g);
if (!g.tick || v === g.tick.feed) return g.clock;
const sec = Math.floor(v / 10);
return Math.floor(sec / 60) + ":" + pad2(sec % 60);
}
function mod(a, n) {
return ((a % n) + n) % n;
}
function teamColour(abbr) {
return (D.team[abbr] || "#FFFFFF") + "FF";
}
function cap(els, id, abbr, side, strong, low) {
const el = image(id, "images/team_" + (D.team[abbr] ? abbr : "XXX") + "_" + side + (strong ? 1 : 0) + "_" +
(teamsAsText ? "t" : "") + (low ? "l" : "u") + ".png", side === "a" ? 0 : 42, 0, 0, 30);
els.push(el);
}
const MID = [28, 43];
function logoSpan(abbr, x0) {
const d = D.logo[abbr] || D.logo.XXX, w = d[teamsAsText ? 1 : 0];
const left = x0 + (!teamsAsText && d.length > 2 ? d[x0 === 0 ? 2 : 3] : (14 - w) >> 1);
return [left, left + w - 1];
}
function centred(w, room, oddToTheRight) {
const spare = Math.max(0, room[1] - room[0] + 1 - w);
return room[0] + (spare >> 1) + (oddToTheRight ? spare % 2 : 0);
}
function rooms(g) {                              // [away score's room, home score's room]
return [[logoSpan(g.away, 0)[1] + 2, MID[0] - 2], [MID[1] + 2, logoSpan(g.home, 58)[0] - 2]];
}
function digitsWidth(s) {                        // font "normal": 5 a digit, 1 between
return s.length * 5 + s.length - 1;
}
function shortDown(s) {                          // "2nd & 7" -> "2&7", "1st & Goal" -> "1&G"
const m = /^\s*(\d)\w*\s*&\s*(\w+)/.exec(s || "");
if (!m) return "";
return m[1] + "&" + (m[2][0].toLowerCase() === "g" ? "G" : m[2]);
}
function flowHead(width, team) {
const k = 0.5 + 0.5 * Math.sin(Date.now() / 1800 * 2 * Math.PI);
const hex = (v) => ("0" + Math.round(v).toString(16).toUpperCase()).slice(-2);
let tones = "a c #1F6B36\nb c #2E8F4C\nc c #49C473\nd c #8CF0AE";
const col = team && D.team[team];
if (col) {
const v = [parseInt(col.slice(1, 3), 16), parseInt(col.slice(3, 5), 16), parseInt(col.slice(5, 7), 16)];
const tone = (dark, light) => "#" + hex(v[0] * dark + 255 * light) + hex(v[1] * dark + 255 * light) + hex(v[2] * dark + 255 * light);
tones = "a c " + tone(0.38, 0) + "\nb c " + tone(0.6, 0) + "\nc c " + tone(0.85, 0.05) + "\nd c " + tone(0.6, 0.4);
}
return "! XPM2\n" + width + " 1 8 1\n" + tones + "\ne c #" + hex(96 + 159 * k) +
hex(10 + 34 * k) + hex(14 + 30 * k) + "\nf c #C85A5A\ng c #F08C8C\nh c #FFD0D0\n";
}
function field(els, p, g, phase, at) {
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
els.push({ id: p + "f", type: "xpmbitmap", x: 4, y: 15, align: "top_left", timeout: T, data: flowHead(64, null) + cells,              // (the grass stays green: Dennis, 26 Nov)
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
function gameEls(g, p, phase, at) {
if (g && g.kind === "load") return loadEls(p); // the place of the games still to come
if (g && g.kind) return seasonEls(g, p);       // a page of the season's end, not a game
if (!g) {                                      // nothing to show: say why
if (listLoaded && gameIds.length === 0 && seasonAsked && !seasonItems()) {   // (not before we know whether the season is over)
return [image(p + "cd", "images/card_noweek.png", 0, 0, 0, 72)];        // "NO GAMES / THIS WEEK"
}
if (offline && fails > 0 && games.size === 0) {
return [image(p + "cd", "images/card_" + (wifiUp ? "nodata" : "nowifi") + ".png", 0, 0, 0, 72)];
}
if (!nameSince || Date.now() - nameSince < NAME_MS) return [text(p + "e", D.name, "small", 36, 5, FAINT, "top_mid")];   // the name, quietly
return loadEls(p);                           // nothing to show yet: LOADING
}
const on = isOn(g), over = g.state === "post";
const loseA = over && g.as < g.hs, loseH = over && g.hs < g.as;
const els = [];
cap(els, p + "ta", g.away, "a", !loseA, !on);
cap(els, p + "th", g.home, "h", !loseH, !on);
if (off(g)) {                                  // postponed, cancelled: the two teams and the word, no score
els.push(text(p + "m1", /CANCEL/.test(g.status) ? "Cancelled" : "Postponed", "small", 36, 5, SOFT, "top_mid"));
return els;
}
if (soon(g)) {
const left = Math.max(0, Math.floor((g.start - Date.now()) / 1000));
const hot = left <= 60 ? "#FF4A3AFF" : left <= 300 ? "#FF9A1AFF" : null;
const part = Math.min(1, left * 1000 / SOON_MS);          // one scale for the whole hour
if (left > 0) {
els.push(text(p + "m1", "Kick", "small", 36, -1, LIVE, "top_mid"),
text(p + "m2", Math.floor(left / 60) + ":" + pad2(left % 60), "small", 36, 6, hot || WHITE, "top_mid"));
} else {
els.push(text(p + "m1", "Soon", "small", 36, 2, LIVE, "top_mid"));     // due, and the feed has not started it yet
}
const room = rooms(g);
els.push(text(p + "sa", "0", "normal", centred(5, room[0], true), 3, FAINT),
text(p + "sh", "0", "normal", centred(5, room[1], false), 3, FAINT),
bar(p + "za", 1, 15, 3, 1, teamColour(g.away), 1), bar(p + "zh", 68, 15, 3, 1, teamColour(g.home), 1),
bar(p + "hb0", 4, 15, 64, 1, "#FFFFFF1C", 1));
if (left > 0) {
const c = left <= 60 ? "r" : left <= 300 ? "o" : "g";
els.push({ id: p + "hf" + c, type: "animation", path: "animations/flow_" + c + ".anim", x: 4, y: 15, align: "top_left",
loop: true, section: "n" + Math.max(1, Math.min(32, Math.ceil(32 * part))), timeout: STILL, z_index: 2, _w: 64 });
}
return els;
}
if (g.state === "pre") {                       // records . day / kick-off time
const lt = local(g.start), today = local();
const same = lt.getUTCFullYear() === today.getUTCFullYear() && lt.getUTCMonth() === today.getUTCMonth() &&
lt.getUTCDate() === today.getUTCDate();
const day = same ? "Today" : DAYS[lt.getUTCDay()];
const hour = (lt.getUTCHours() % 12 || 12) + ":" + pad2(lt.getUTCMinutes());
const ampm = lt.getUTCHours() < 12 ? "AM" : "PM";
const dw = smallWidth(day), d0 = 36 - (dw >> 1), wa = smallWidth(g.rec_a || ""), wh = smallWidth(g.rec_h || "");
const ra = [logoSpan(g.away, 0)[1] + 2, d0 - 2], rh = [d0 + dw + 1, logoSpan(g.home, 58)[0] - 2];
if (g.rec_a && g.rec_h && wa <= ra[1] - ra[0] + 1 && wh <= rh[1] - rh[0] + 1) {
els.push(text(p + "ra", g.rec_a, "small", centred(wa, ra, true), -1, FAINT),
text(p + "rh", g.rec_h, "small", centred(wh, rh, false), -1, FAINT));
}
const hw = textWidth(hour, "bold");
const x0 = 36 - ((hw + 2 + smallWidth(ampm)) >> 1);
const hh = hour.split(":")[0];                // hours, colon and minutes apart, so the light of a page change
const cx = x0 + textWidth(hh, "bold") + 1;    // passes between them
els.push(text(p + "m1", day, "small", 36, -1, SOFT, "top_mid"), text(p + "m2", hh, "bold", x0, 6, WHITE),
text(p + "mc", ":", "bold", cx, 6, WHITE), text(p + "mm", hour.split(":")[1], "bold", cx + 2, 6, WHITE),
text(p + "m3", ampm, "small", x0 + hw + 2, 8, FAINT));
return els;
}
const y = over ? 6 : 3;                        // live: rows 5-11, so that the timeout marks (row 3) and the digits
const room = rooms(g);
els.push(text(p + "sa", String(g.as), "normal", centred(digitsWidth(String(g.as)), room[0], true), y, loseA ? FAINT : WHITE),
text(p + "sh", String(g.hs), "normal", centred(digitsWidth(String(g.hs)), room[1], false), y, loseH ? FAINT : WHITE));
if (over) {
els.push(text(p + "m1", g.period > 4 ? "Final/OT" : "Final", "small", 36, -1, SOFT, "top_mid"));
return els;
}
if (isHalf(g)) {
const left = g.half_since ? HALFTIME_MS - (Date.now() - g.half_since) : 0;
els.push(bar(p + "za", 1, 15, 3, 1, teamColour(g.away), 1), bar(p + "zh", 68, 15, 3, 1, teamColour(g.home), 1),
bar(p + "hb0", 4, 15, 64, 1, "#FFFFFF1C", 1));
if (left > 0) {
const sec = Math.floor(left / 1000);
els.push({ id: p + "hfg", type: "animation", path: "animations/flow_g.anim", x: 4, y: 15, align: "top_left", loop: true,
section: "n" + Math.max(1, Math.min(32, Math.ceil(32 * left / HALFTIME_MS))), timeout: STILL, z_index: 2, _w: 64 },
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
if (left > 0) {                                // a timeout is on: the clock and the quarter take turns on top, and
const own = g.timeout_by === "away" || g.timeout_by === "home";
const showQ = Math.floor(Date.now() / 1000) % 4 >= 2;
els.push(text(p + "m1", showQ ? (g.period > 4 ? "OT" : "Q" + Math.max(1, g.period)) : clockText(g), "small", 36, -1, showQ ? LIVE : WHITE, "top_mid"),
text(p + "m2", own ? "T/O" : "TV", "small", 36, 6, own ? DOWN : SOFT, "top_mid"));
} else if (/DELAY|SUSPEND/.test(g.status)) {   // stopped by the weather or the like: "Delay" over the quarter
els.push(text(p + "m1", "Delay", "small", 36, -1, DOWN, "top_mid"),
text(p + "m2", g.period > 4 ? "OT" : "Q" + Math.max(1, g.period), "small", 36, 6, SOFT, "top_mid"));
} else {
const old = Date.now() - g.at > STALE_MS;    // no fresh numbers for a while: the quarter goes grey, the clock blank
const quarter = g.period > 4 ? "OT" : "Q" + Math.max(1, g.period);
if (downStays && down !== "" && !old) {      // the down keeps the lower row; above it the clock, and for two
const showQ = Math.floor(Date.now() / 1000) % 8 >= 6;                    // seconds in eight the quarter
els.push(text(p + "m1", showQ ? quarter : clockText(g), "small", 36, -1, showQ ? LIVE : WHITE, "top_mid"),
text(p + "m2", down, "small", 36, 6, DOWN, "top_mid"));
} else {
els.push(text(p + "m1", quarter, "small", 36, -1, old ? FAINT : LIVE, "top_mid"),
text(p + "m2", old ? "--:--" : showDown ? down : clockText(g), "small", 36, 6, showDown && !old ? DOWN : SOFT, "top_mid"));
}
}
timeouts(els, p, g);
field(els, p, g, phase, at);
return els;
}
function timeoutLeft(g) {
return g.timeout_since ? TIMEOUT_MS - (Date.now() - g.timeout_since) : 0;
}
function timeouts(els, p, g) {
const blink = timeoutLeft(g) > 0 && Math.floor(Date.now() / 500) % 2 === 0;
const room = rooms(g);
const sides = [["a", "away", centred(8, room[0], true), g.to_a, g.away], ["h", "home", centred(8, room[1], false), g.to_h, g.home]];
for (let n = 0; n < 2; n++) {
const have = sides[n][3];
if (typeof have !== "number") continue;
const colour = D.team[sides[n][4]] || "#FFFFFF";
for (let k = 0; k < 3; k++) {                // k = 0 is the mark nearest the logo
const lit = k < have || (blink && g.timeout_by === sides[n][1] && k === have);
els.push(bar(p + "o" + sides[n][0] + k, sides[n][2] + (n === 0 ? k : 2 - k) * 3, 3, 2, 1, colour + (lit ? "FF" : "40"), 4));
}
}
}
const spots = new Map();            // game id -> where we last drew the ball
function slide(els, dir) {
return change(els, dir >= 0 ? -1 : 1, false);  // coming from the right = drawn from right to left
}
function sameGame(a, b) {
return (a ? a.id : null) === (b ? b.id : null);
}
const SIGN_Z = 2147480000;
const run1 = (id, name) => '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":0,"y":0,' +
'"align":"top_left","loop":false,"section":"default","timeout":20,"z_index":' + (SIGN_Z + 3) + "}";
const SIGN_WORD = { td: "TOUCHDOWN", fg: "FIELD GOAL", safety: "SAFETY", two: "2 POINTS", int: "PICKED OFF", fumble: "FUMBLE", sack: "SACK" };
const FILM_HOME = { td: 1, fg: 1, two: 1, safety: 1, who: 1 };      // films with a second cut for the team on the right
async function playSign(s) {
const film = (id, name) => '{"id":"' + id + '","type":"animation","path":"animations/sign_' + name + '.anim","x":0,"y":0,' +
'"align":"top_left","loop":false,"section":"default","timeout":20,"z_index":' + (SIGN_Z + 3) + "}";
let ids = [];                                  // what of the sign is on screen
const del = async (list) => {                  // (asking the bar to delete an element that is gone fails the whole request)
const there = list.filter((id) => ids.indexOf(id) !== -1);
ids = ids.filter((id) => there.indexOf(id) === -1);
if (there.length) await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: there }));
};
const gm = games.get(s.id) || {};
busy = true;
try {
let team = s.team, rounds = 2;               // a team's sign runs twice: the word, who it was, and both again
if (!team) {                                 // FINAL, OVERTIME, KICKOFF: nobody's - a whole picture, no plate
await post([run1("zz_s9", "sign_" + s.kind)]);
ids.push("zz_s9");
await sleep(D.sign[s.kind] + (s.kind === "kick" ? 300 : 1300));
team = s.kind === "kick" && s.who ? s.who.team : null;      // after a kick-off: who has the ball, and where
rounds = 1;
if (team && s.who.kick) {
const k = s.who.kick, px = (yd) => Math.max(1, Math.min(69, 4 + Math.round(yd * 63 / 100)));
const dot = (id, x, y, w, h, colour, zi) => '{"id":"' + id + '","type":"rectangle","x":' + x + ',"y":' + y + ',"width":' + w +
',"height":' + h + ',"fill":"solid","fill_colors":["' + colour + '"],"border_width":0,"timeout":' + T + ',"z_index":' + (SIGN_Z + zi) + "}";
const x0 = px(k.from), x1 = px(k.land), x2 = px(k.spot);
await post(['{"id":"zz_k0","type":"image","path":"images/turf.png","x":0,"y":0,"align":"top_left","timeout":' + T +
',"z_index":' + (SIGN_Z + 4) + "}", dot("zz_k1", 0, 0, 4, 16, teamColour(gm.away), 5), dot("zz_k2", 68, 0, 4, 16, teamColour(gm.home), 5),
dot("zz_k4", x0, 13, 2, 1, "#00000090", 6), dot("zz_k3", x0, 11, 2, 2, "#FFFFFFFF", 7)]);
ids.push("zz_k0", "zz_k1", "zz_k2", "zz_k3", "zz_k4");
await del(["zz_s9"]);
await sleep(350);
const hops = 14;                         // the flight: up to the top rows and down again
for (let i = 1; i <= hops; i++) {
const t = i / hops, x = Math.round(x0 + (x1 - x0) * t), y = Math.round(11 - 9 * Math.sin(Math.PI * t));
await post([dot("zz_k4", x, 13, 2, 1, "#00000090", 6), dot("zz_k3", x, y, 2, 2, "#FFFFFFFF", 7)]);
await sleep(25);
}
await sleep(250);
const carried = teamColour(team), steps = Math.max(1, Math.min(12, Math.abs(x2 - x1)));
for (let i = 1; i <= steps; i++) {       // carried back, in the colour of the team that caught it
const x = Math.round(x1 + (x2 - x1) * i / steps);
await post([dot("zz_k4", x, 13, 2, 1, "#00000090", 6), dot("zz_k3", x, 11, 2, 2, carried, 7)]);
await sleep(45);
}
for (let i = 0; i < 4; i++) {            // down: the ball blinks where the next play starts
await post([dot("zz_k3", x2, 11, 2, 2, i % 2 ? carried : "#FFFFFFFF", 7), dot("zz_k5", x2, 1, 1, 14, i % 2 ? "#FFD21A60" : "#FFD21AE0", 6)]);
if (i === 0) ids.push("zz_k5");
await sleep(200);
}
}
}
if (team) {
const right = team === gm.home;            // the team on the right: everything the other way round
const flip = (name) => name + (right && FILM_HOME[name] ? "_h" : "");
const plate = { id: "zz_s0", type: "rectangle", x: 0, y: 0, width: 72, height: 16, fill: "solid",
fill_colors: [(D.plate[team] || "#4A5060") + "FF"], border_width: 0, timeout: T, z_index: SIGN_Z + (s.team ? 0 : 8) };
const shade = (D.shade[team] || "#101018") + "FF";
const up = s.team ? 0 : 8;                 // (after a kick-off the card lies above the field)
let names = [], card = "";                 // the writing of the last "who it was", and its film
await post([wire(plate, OFF, 0)]);
ids.push("zz_s0");
for (let r = 0; r < rounds; r++) {
let word = "";
if (s.team) {                            // the word comes down
const t0 = Date.now();
word = "zz_s7" + r;
await del(names);                      // (the writing lies above the films)
await post([film(word, flip(s.kind))]);
ids.push(word);
if (r === 0) await post([wire(plate)]);
if (card) await del([card]);
await sleep(D.sign[s.kind] + 600 - (Date.now() - t0));        // the word has landed and holds
for (let i = 0; i < 25 && !s.asked; i++) await sleep(100);     // ... a little longer while he is looked up
}
const who = s.who && s.who.name ? s.who : null;
if (!who) {
if (s.team) await sleep(700);
break;
}
const words = [], put = (id, str, font, x, y, colour, align) => {
words.push({ id: id + "s", type: "text", text: str, font: font, x: x + 1, y: y + 1, align: align || "top_left", color: shade,
timeout: T, z_index: SIGN_Z + up + 6 }, { id: id, type: "text", text: str, font: font, x: x, y: y, align: align || "top_left",
color: colour, timeout: T, z_index: SIGN_Z + up + 7 });
};
let room = 66, edge = right ? 67 : 4;    // columns for the writing; where it starts (or, on the right, ends)
if (who.num) {
const w = textWidth(who.num, "bold"), x0 = right ? 64 - w : 2;
words.push({ id: "zz_s1", type: "rectangle", x: x0, y: 2, width: w + 6, height: 11, radius: 3, fill: "solid",
fill_colors: [shade], border_width: 0, timeout: T, z_index: SIGN_Z + up + 5 });
put("zz_s2", who.num, "bold", x0 + 3, 2, WHITE);
edge = right ? x0 - 5 : w + 12;
room = right ? edge - 2 : 70 - edge;
}
let name = who.first ? who.first + ". " + who.name : who.name;
if (smallWidth(name) > room && who.first) name = who.first + "." + who.name;
if (smallWidth(name) > room) name = who.name;
while (name.length > 1 && smallWidth(name) > room) name = name.slice(0, -1);
put("zz_s3", name, "small", edge, 0, WHITE, right ? "top_right" : "top_left");            // rows 1-5, and under it rows 8-12
put("zz_s4", who.what || SIGN_WORD[s.kind], "small", edge, 7, "#FFFFFFB0", right ? "top_right" : "top_left");
const t1 = Date.now();
card = "zz_s8" + r;
if (s.team) {
await post([film(card, flip("who"))]); // its first frames are white: the change underneath is not seen
} else {                                 // after the kick-off: above the field
await post(['{"id":"' + card + '","type":"animation","path":"animations/sign_' + flip("who") + '.anim","x":0,"y":0,' +
'"align":"top_left","loop":false,"section":"default","timeout":20,"z_index":' + (SIGN_Z + up + 3) + "}", wire(plate)]);
}
ids.push(card);
if (word) await del([word]);
await post(words.map((el) => wire(el)));
names = words.map((el) => el.id);
for (let i = 0; i < names.length; i++) ids.push(names[i]);
await sleep(D.sign.who - 100 - (Date.now() - t1));
}
}
await post([cardAnim("zz_c1", "roll_up_in", 0)]);
await sleep(D.roll - 30);
await del(ids.slice());
await post([cardAnim("zz_c2", "roll_up_out", 0), cardAnim("zz_c1", "roll_up_in", OFF)]);
await sleep(D.roll + 50);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
} finally {
busy = false;
}
}
async function scoresPage(ms, p, enter, solo) {
let end = Date.now() + ms;
let shown, flip = 0, first = true, z = 0, redo = false, dir = 1;
let how = "roll";                              // the next change: "roll" up / down, "side" ways, "open" / "close" = a title card
for (const rec of live.values()) {             // called again while its strip is still up (it is the only page):
const id = rec.el.id;                        // carry on with the next game instead of entering anew
if (rec.el._bk && rec.el.x === 0 && id[0] === p && (id[1] === "a" || id[1] === "b")) {
flip = id[1] === "a" ? 0 : 1;
z = rec.el.z_index;
first = false;
shown = games.get(onScreen) || undefined;
}
}
let tour = null, jump = null, finalSince = 0, signAt = 0, kickId = null;
let onLoad = false, loadSeen = [];             // the knob stands on LOADING; the games that were on when it got there
const seen = { id: null, poss: null, period: 0, to: false };     // the game on show as it was a moment ago
scoresUp = true;
if (solo && !nameSince) nameSince = Date.now();
try {
while (!stopped && (solo || stay(end))) {
let game = null, until = Date.now() + PER_GAME, main = null;
if (solo) {
main = games.get(mainId) || null;
if (main && main.state === "post" && !finalSince) finalSince = Date.now();
if (!main || (!isOn(main) && !(main.state === "post" && Date.now() - finalSince < FINAL_STAY))) {
main = firstOn();                      // at the start, and when the game on show is over
mainId = main ? main.id : null;
finalSince = 0;
}
if (!main && startReady() && (!tour || tour.why !== "auto")) tour = { list: carousel(null), k: 0, why: "auto" };
if (main && tour && tour.why === "auto") tour = null;                   // a game has come on
if (tour && tour.why === "break" && !inBreak(main)) tour = null;        // it is being played again
if (onLoad && allSeen()) onLoad = false; // the whole week is in: the page is gone
if (onLoad) {
game = LOADPAGE;
until = Infinity;
jump = null;
} else if (jump) {
game = jump;
jump = null;
} else if (tour) {
if (tour.k >= tour.list.length) {
if (tour.why === "start") {          // one round by hand, and back to the game behind the closing card
tour = null;
how = main && isOn(main) ? "close" : "roll";
} else {                             // round again, with what there is now
tour.list = carousel(main);
tour.k = 0;
}
}
game = tour && tour.list.length ? tour.list[tour.k++] : null;
}
if (!game && main) {
game = main;
until = main.state === "post" ? finalSince + FINAL_STAY : Infinity;   // it stays; the controls decide
}
} else {
const list = playlist();
if (list.length) {
gameIndex %= list.length;
game = list[gameIndex];
gameIndex++;
}
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
if (!solo && !ctl.held && end - until < 3000) until = end;   // no new game for under 3 seconds: this one stays
let full = 0, clockWas = "";
while (!stopped) {
const t0 = Date.now();
if (game) game = shown = games.get(game.id) || game;
const starting = solo && !game && !startReady();     // the start (the name, LOADING): no control but Back does anything
if (starting) {
ctl.ok = ctl.start = false;
ctl.turn = 0;
}
if (solo && onLoad) {
hits.wait = null;
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
if (solo) {
main = games.get(mainId) || null;
if (game && soon(game)) {              // the game on show is counting down to its start ...
kickId = game.id;
} else {                               // ... and has started: a card comes down and says so
const go = game && kickId === game.id && game.state === "in" && !tour;
kickId = null;
if (go) {
await show(lift(gameEls(game, pp), pp, z));    // the game is there when the film has gone
signAt = t0;
await playSign({ kind: "kick", team: null, who: null, asked: true });
ctl.turn = 0;
ctl.ok = ctl.start = false;
continue;
}
}
if (game && game.state === "in" && !tour) {
const to = timeoutLeft(game) > 0, was = seen.id === game.id;
const swapped = was && game.poss && seen.poss && game.poss !== seen.poss;
const turned = was && (game.period !== seen.period || (to && !seen.to));
seen.id = game.id;
seen.poss = game.poss || seen.poss;
seen.period = game.period;
seen.to = to;
if (turned) {
redo = true;
how = "mid";
jump = game;
break;
}
if (swapped && !hits.wait && hits.on) {
await show(lift(gameEls(game, pp), pp, z));
await post(['{"id":"zz_w","type":"animation","path":"animations/swap_' + (game.poss === "away" ? "r" : "l") +
'.anim","x":0,"y":0,"align":"top_left","loop":false,"section":"default","timeout":5,"z_index":' + (SIGN_Z + 2) + "}"]);
await sleep(D.swap + 60);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_w"] }));
continue;
}
} else {
seen.id = null;
}
if (hits.wait) {                       // a sign: only over the game the app stays on, and not too often
const s = hits.wait;
hits.wait = null;
const due = s.rank >= RANK.two || t0 - signAt >= SIGN_GAP;
if (due && game && s.id === game.id && (!tour || s.rank >= RANK.ot) && t0 - s.at < 30000) {
signAt = t0;
await show(lift(gameEls(game, pp), pp, z));    // the new score is there when the sign has gone
await playSign(s);
ctl.turn = 0;
ctl.ok = ctl.start = false;
continue;
}
}
if (ctl.ok) {                          // OK: logos <-> letters, at once
ctl.ok = false;
teamsAsText = D.lettersOnly ? true : !teamsAsText;
redo = true;
how = "flip";
if (game) jump = game;
break;
}
if (tour && tour.why !== "auto" && (ctl.start || ctl.turn)) {
ctl.start = false;
ctl.turn = 0;
tour = null;
how = (main && isOn(main)) || firstOn() ? "close" : "roll";
dir = -1;
break;
}
if (ctl.start) {                       // Start: the carousel
ctl.start = false;
if (tour) break;                     // nothing is on, the carousel runs anyway: its next item now
const list = carousel(main);
if (list.length) {
tour = { list: list, k: 0, why: "start" };
how = "open";
break;
}
if (allSeen()) await notice("alone");
else {                               // nothing to go round yet: the LOADING page, where the games will come
onLoad = true;
loadSeen = allGames().filter(isOn).map((g) => g.id);
how = "side";
break;
}
ctl.turn = 0;
}
if (ctl.turn) {                        // encoder
const turns = ctl.turn;
ctl.turn = 0;
dir = turns > 0 ? 1 : -1;
const on = allGames().filter(isOn).sort(byStart), here = on.findIndex((g) => g.id === mainId);
if (!allSeen() && (!on.length || (here !== -1 && (here + turns >= on.length || here + turns < 0)))) {
onLoad = true;
loadSeen = on.map((g) => g.id);
how = "side";
break;
}
if (!on.length) {                    // nothing is on: say so, the carousel carries on
await notice("none");
ctl.turn = 0;                      // turns made meanwhile do not queue more cards
dir = 1;
} else if (tour) {                   // while the carousel runs: through its items, up or down
const k = mod(tour.k - 1 + turns, tour.list.length);
jump = tour.list[k];
tour.k = k + 1;
break;
} else {                             // the next / previous game that is on
const at = Math.max(0, on.findIndex((g) => g.id === mainId));
const next = on[mod(at + turns, on.length)];
if (next.id !== mainId) {
mainId = next.id;
finalSince = 0;
how = "side";                    // between the games that are on: sideways, the way the knob turned
break;
}
await notice("only");
ctl.turn = 0;
dir = 1;
}
}
if (BREAK_TOUR && main && !tour && sameGame(main, game) && inBreak(main) && t0 - main.breakSince >= BREAK_WAIT) {
const list = carousel(main);
if (list.length) {
tour = { list: list, k: 0, why: "break" };
break;
}
}
if (tour && tour.why === "break" && main && !inBreak(main)) {
dir = -1;
break;
}
if (!starting && !tour && (!main || !sameGame(main, game) || (!isOn(main) && main.state !== "post"))) break;
if (tour && tour.why === "auto" && firstOn()) break;                  // a game has come on
if (!tour && main && main.state === "post" && sameGame(main, game)) {
if (!finalSince) finalSince = t0;
if (t0 - finalSince >= FINAL_STAY) break;
}
if (t0 >= until) break;
} else {
if (!stay(ctl.held ? Infinity : end)) break;       // Rotation: time is up, or the encoder changes page
if (ctl.start) {                       // Rotation: Start = the next game now
ctl.start = false;
end = t0 + ms;
break;
}
if (t0 >= until) break;
}
if (!game && games.size && (!solo || startReady())) break;       // the game to stay on is there: show it now
if (!game && seasonItems()) break;       // the season's end is known now: its pages
const wait = Math.min(until - t0, 500);
if (!game || game.state !== "in" || isHalf(game)) {      // nothing runs along the field: a few times a second
await show(lift(gameEls(game, pp), pp, z));
await nap(wait);
continue;
}
const real = game.spot;                  // the ball slides to where the new data puts it
let at = spots.has(game.id) ? spots.get(game.id) : real;
if (real === null || real === undefined || at === null || at === undefined) at = real;
else if (Math.abs(real - at) > 0.4) at += (real - at) * 0.25;
else at = real;
spots.set(game.id, at);
const phase = Math.floor(Date.now() * 0.011), clock = clockText(game);
if (t0 - full >= 1000 || clock !== clockWas) {       // once a second everything - and right when the clock's next
full = t0;                             // second is due: only its text is sent then; in between only what moves
clockWas = clock;
await show(lift(gameEls(game, pp, phase, at), pp, z));
} else {
const strip = [];
field(strip, pp, game, phase, at);
if (timeoutLeft(game) > 0) timeouts(strip, pp, game);
for (let i = 0; i < strip.length; i++) strip[i].z_index += z + 1;
await show(strip, true);
}
await nap(Math.max(10, Math.min(wait, 90 - (Date.now() - t0))));
}
}
} finally {
scoresUp = false;
}
}
// ===== main.js =====
async function readSettings() {
const values = await loadSettings();
if (typeof values.team === "string" && D.team[values.team] && TEAMS[0] !== values.team) {
TEAMS = [values.team];
gameIndex = 0;                               // the new team's game comes up next
}
onlyMine = values.games === "mine";
hits.on = values.effects !== false;            // "Big play effects": the signs for touchdowns and the like
downStays = values.down === "always";          // "Down & distance": it stays, clock and quarter take turns
if (seenTeams !== values.teams) {              // the setting is the starting state; the knob overrides it until
seenTeams = values.teams;                    // the app is closed or the setting is changed
teamsAsText = values.teams === "text" || !!D.lettersOnly;
}
}
let seenTeams;
let settingsDue = 0;
feeds.unshift(async (now) => {
if (now >= settingsDue) {
settingsDue = now + 10000;
await readSettings();
}
return false;
});
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
await scoresPage(Infinity, "p", firstStrip, true);
} catch (err) {
report("scores", err);
await sleep(500);
}
}
}
main();

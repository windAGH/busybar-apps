// Plate by Plate: a conveyor-belt sushi bar on the BUSY Bar, to watch and to eat from. Plates glide past under
// glass domes; Start (or OK) takes the one in the light and then eats it in three bites; turning the knob looks down
// at your table, where Start (or OK) returns the empty plates through a slot. Every fifth plate plays a capsule for a
// keepsake. No timer, no score to lose. Nothing leaves the bar: the app uses no internet.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (the menu, the plates' colours, the keepsakes' small shapes, where the films belong and how
// long they run, widths of the bar's letters), then the bar (its API, clock, controls, drawing), then the app
// (what is kept, requests and elements, the belt, a plate in front of you, your table and its slot, the capsule,
// "Start over", the ceremony for a finished menu, the one step that is repeated, the settings, the start with the
// author's mark).

const D = {"app":"io.github.windagh.plate_by_plate","name":"Plate by Plate","items":[{"n":["SALMON","NIGIRI"],"t":1,"e":[16,9]},{"n":["TUNA","NIGIRI"],"t":2,"e":[16,9]},{"n":["SHRIMP","NIGIRI"],"t":1,"e":[16,8]},{"n":["SWEET","OMELETTE"],"t":0,"e":[16,9]},{"n":["GRILLED","EEL"],"t":2,"e":[16,9]},{"n":["SQUID","NIGIRI"],"t":1,"e":[17,9]},{"n":["SCALLOP","NIGIRI"],"t":2,"e":[16,9]},{"n":["SALMON","ROE"],"t":3,"e":[15,10]},{"n":["SEA","URCHIN"],"t":3,"e":[17,10]},{"n":["CUCUMBER","ROLL"],"t":0,"e":[17,10]},{"n":["TUNA","ROLL"],"t":0,"e":[17,10]},{"n":["BIG","ROLL"],"t":2,"e":[16,11]},{"n":["INSIDE-","OUT ROLL"],"t":2,"e":[17,10]},{"n":["TOFU","POUCH"],"t":0,"e":[16,9]},{"n":["HAND","ROLL"],"t":2,"e":[18,10]},{"n":["EDAMAME","BEANS"],"t":0,"e":[16,9]},{"n":["MISO","SOUP"],"t":0,"e":[16,9]},{"n":["CUSTARD","PUDDING"],"t":1,"e":[15,10]},{"n":["MATCHA","ICE"],"t":1,"e":[17,12]},{"n":["MELON","SLICE"],"t":2,"e":[16,9]},{"n":["FATTY","TUNA"],"t":4,"e":[16,9]},{"n":["LOBSTER","TAIL"],"t":4,"e":[17,9]},{"n":["GOLD","LEAF"],"t":4,"e":[16,9]}],"key":["#FF7A32","#E02438","#FF966E","#FFCE38","#BE601E","#DCE6FF","#FFE8C4","#FF5A14","#F4A41E","#60D25A","#C82846","#FF96AA","#FF9628","#E29632","#508268","#78D242","#D63C28","#FFD678","#8CC446","#B4EC7C","#FF96A6","#F03C1E","#FFD232"],"tier":[["#BEFFCC","#42CC70","#106032","#E2FFE8","#1A763E"],["#B8DEFF","#4096FF","#103C96","#DFF0FF","#1A4EAB"],["#FFAA96","#F6463E","#821012","#FFD9D0","#991B1B"],["#E4C4FF","#B268FA","#4C1E8C","#F3E4FF","#602DA2"],["#FFF6B4","#FFC82C","#AA6406","#FFFBDD","#BB780E"]],"speed":[3,4.5,6],"guide":5,"swallow":250,"charm":[{"n":"LUCKY CAT","d":[".ccd.","cbccd","bbccd",".bcd.",".bcc."]},{"n":"DARUMA","d":["..d..",".ccd.","abccd","aabbc",".aaa."]},{"n":"TEA CUP","d":[".....",".....",".bbd.",".bbd.",".aab."]},{"n":"FISH KITE","d":[".....","ccccc","cbbcc","bb..c","....."]},{"n":"TINY CHEF","d":[".ccd.",".bcd.",".bbd.",".cbd.",".bcc."]},{"n":"LANTERN","d":["..c..",".bbc.","abbbc",".abc.","..a.."]},{"n":"TORII","d":["baabc","ababc",".bbc.",".b.c.",".b.a."]},{"n":"MT FUJI","d":["...bd","..cbc",".bbd.",".bbc.","aaaab"]},{"n":"KOKESHI","d":["..c..",".bbc.",".bbd.",".bcd.",".abc."]},{"n":"SAKURA","d":["..d..",".ccd.","bcccd",".ccd.",".b.b."]}],"dimPal":["a c #20140E","b c #382418","c c #563A26","d c #966A42","e c #281609","f c #40240E","g c #5E3616","h c #824C20","i c #AA662C"],"shelf":"eeeeeeeeeeffffffffgggghhhhhiii","pile":{"x":[35,43],"max":4,"shade":"#46220C"},"f":{"dn0":[1,11,350],"dn1":[1,11,350],"dn2":[1,11,350],"dn3":[1,11,350],"dn4":[1,11,350],"dome":[0,0,1000],"bar":[0,0,1000],"belt0":[0,12,2000],"belt1":[0,12,1333],"belt2":[0,12,1000],"rest":[53,10,1000],"herald":[0,9,1300],"tap":[29,0,1300],"guide_0":[0,0,1000],"guide_1":[0,0,1000],"guide_2":[0,0,1000],"guide_3":[0,0,1000],"guide_4":[0,0,1000],"title":[0,0,1000],"title_out":[0,0,300],"whl_dn":[58,3,2000],"whl_up":[58,0,2000],"night":[0,0,1000],"night_in":[0,0,1000],"veil":[0,0,1000],"veil_in":[0,0,300],"veil_out":[0,0,450],"rise":[0,0,500],"settle":[0,0,400],"sink1":[0,0,400],"sink2":[0,0,650],"lift":[0,0,750],"cover":[0,0,550],"glow":[1,0,2400],"glow2":[1,0,2400],"crumb":[0,0,350],"blank":[0,0,1000],"yum":[0,0,700],"twk":[0,0,800],"table":[0,0,1000],"pan_dn":[0,0,600],"pan_up":[0,0,600],"lamp_on":[0,0,350],"lamp_off":[0,0,250],"belt_in":[0,0,300],"in0":[49,6,650],"in1":[49,6,650],"in2":[49,6,650],"in3":[49,6,650],"in4":[49,6,650],"dark_out":[0,0,350],"open":[0,0,200],"dark_in":[0,0,300],"stage_in":[0,0,300],"stage_out":[0,0,350],"capsule":[0,0,3050],"pop":[0,0,600],"spark":[0,0,2000],"c0":[10,1,1000],"c1":[10,1,1000],"c2":[10,1,1000],"c3":[10,1,1000],"c4":[10,1,1000],"c5":[10,1,1000],"c6":[10,1,1000],"c7":[10,1,1000],"c8":[10,1,1000],"c9":[10,1,1000],"tube":[0,0,1700],"gift":[2,1,350]},"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1,"&":4},"smallGap":1,"xl":{"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7},"bold":{"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6},"normal":{"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5}};
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
// ===== sushi.js =====
(function () {
const N = D.items.length, NC = D.charm.length, F = D.f;
const SPOT = 28, PW = 15;            // a plate's left edge when it is right in front of you; its width
const LOOP_T = 3600;                 // a looping film is not sent again while it runs (it would start anew)
const GOLD = "#FFCE46", DIMC = "#968C82", WHITEC = "#FFFFFF";
const Z = { bar: 10, belt: 12, plate: 20, cup: 30, rest: 31, table: 40, pan: 55, night: 60, veil: 100, show: 200, hint: 300, book: 800 };
const st = { v: 1, met: "", all: 0, day: "", today: 0, a: [], b: [], more: 0, back: 0, charms: "", order: [], done: false, rs: null, seen: false };
const PMAX = D.pile.max;             // plates in one of the two piles on the table
let mode = "belt", backs = 0, since = Date.now(), taken = 0;
let speedIx = 1;
let seed = D.seed === undefined ? 0 : (D.seed * 2654435761) >>> 0 || 1;
function rnd() {
if (D.seed === undefined) return Math.random();
seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
return seed / 4294967296;
}
const pick = (n) => Math.floor(rnd() * n);
const bits = (s, n) => {
let out = "";
for (let i = 0; i < n; i++) out += s && s[i] === "1" ? "1" : "0";
return out;
};
const count = (s) => {
let n = 0;
for (let i = 0; i < s.length; i++) if (s[i] === "1") n++;
return n;
};
const setBit = (s, i) => s.slice(0, i) + "1" + s.slice(i + 1);
const tiers = (list, max) => {
const out = [];
if (list && list.length) for (let i = 0; i < list.length && out.length < max; i++) if (list[i] >= 0 && list[i] <= 4) out.push(list[i] | 0);
return out;
};
const num = (v) => (typeof v === "number" && v >= 0 && v < 1e9 ? Math.floor(v) : 0);
function today() {
const d = local();
return d.getUTCFullYear() + "-" + pad2(d.getUTCMonth() + 1) + "-" + pad2(d.getUTCDate());
}
async function load() {
st.met = bits("", N);
st.charms = bits("", NC);
const got = D.fresh ? { ok: false } : await req("GET", "storage/read?path=/ext/data/sushi.json");
try {
const kept = got.ok ? JSON.parse(got.text) : null;
if (kept && typeof kept === "object") {
st.met = bits(typeof kept.met === "string" ? kept.met : "", N);
st.charms = bits(typeof kept.charms === "string" ? kept.charms : "", NC);
st.all = num(kept.all);
st.day = typeof kept.day === "string" ? kept.day : "";
st.today = num(kept.today);
st.b = tiers(kept.b, 9);
st.a = tiers(kept.a, 9);
st.more = Math.min(num(kept.more), 99);
while (st.a.length > PMAX) {                 // (kept by a version whose piles were higher)
st.a.pop();
st.more++;
}
while (st.b.length > PMAX) {
st.b.pop();
st.more++;
}
st.order = [];                               // the keepsakes in the order they were won (the newest stand in the light)
const was = kept.order && kept.order.length ? kept.order : [];
for (let i = 0; i < was.length; i++) {
if (was[i] >= 0 && was[i] < NC && st.charms[was[i] | 0] === "1" && st.order.indexOf(was[i] | 0) < 0) st.order.push(was[i] | 0);
}
for (let k = 0; k < NC; k++) if (st.charms[k] === "1" && st.order.indexOf(k) < 0) st.order.push(k);
st.back = num(kept.back);
st.done = kept.done === true;
st.rs = typeof kept.rs === "boolean" ? kept.rs : null;
st.seen = kept.seen === true;
}
} catch (err) {
}
if (D.seen) st.seen = true;                      // TEST build
if (D.plates !== undefined) {
st.a = [];
st.b = [];
st.more = 0;
for (let i = 0; i < D.plates; i++) addPlate(pick(4));
}
newDay();
}
function newDay() {
const d = today();
if (st.day !== d) {
st.day = d;
st.today = 0;
}
}
let dirty = false;
function save() {
dirty = false;
return req("POST", "storage/write?path=/ext/data/sushi.json", JSON.stringify(st), "application/octet-stream");
}
function addPlate(tier) {                        // an empty plate onto the table: the pile by the slot first
if (st.b.length < PMAX) st.b.push(tier);
else if (st.a.length < PMAX) st.a.push(tier);
else st.more++;                                // (more than the table shows: they are counted and come up later)
}
const onTable = () => st.a.length + st.b.length + st.more;
const TR = D.trace ? { on: false, t0: 0, key: 0, pick: 0, name: "", parts: [], lines: [], fresh: 0, n: 0, sum: 0, max: 0, due: Date.now() + 30000 } : null;
let line = Promise.resolve();
const idle = () => {};
function req(method, path, body, type) {
const go = async () => {
if (D.lag) await sleep(80 + Math.floor(Math.random() * 71));
const a = Date.now();
const got = await call(method, path, body, type);
if (TR && TR.on) traceReq(method, path, body, a);
return got;
};
if (D.lag === 2) return go();
const mine = line.then(go);
line = mine.then(idle, idle);
return mine;
}
async function noteErrs() {
const now = "draw " + errs.draw + " net " + errs.net;
if (now === errs.saved) return false;
errs.saved = now;
await req("POST", "storage/write?path=/ext/data/errors.txt", now + " sources {}", "application/octet-stream");
return true;
}
async function post(parts) {
const got = await req("POST", "display/draw", '{"application_name":"' + APP + '","priority":50,"elements":[' + parts.join(",") + "]}");
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
function traceReq(method, path, body, a) {
let what;
if (path === "display/draw") {
const m = /"id":"([^"]+)"/.exec(body);
what = "P" + (body.split('"id":"').length - 1) + " " + (m ? m[1] : "?");
} else {
what = (method === "POST" ? "W " : "R ") + path.replace(/^.*\//, "");
}
TR.parts.push((a - TR.t0) + ">" + (Date.now() - TR.t0) + " " + what + " " + (body ? body.length : 0) + "b");
}
function traceLine(s) {
TR.lines.push(s);
TR.fresh++;
if (TR.lines.length > 200) TR.lines.shift();
}
function traceStart(name) {
const now = Date.now();
TR.t0 = TR.key && now - TR.key < 5000 ? TR.key : now;      // the key's own time, when the second listener caught it
TR.pick = now - TR.t0;
TR.key = 0;
TR.name = name;
TR.parts = [];
TR.on = true;
}
function traceEnd() {
if (!TR.on) return;
TR.on = false;
traceLine(TR.name + " key+" + TR.pick + " | " + TR.parts.join(" | ") + " | end " + (Date.now() - TR.t0));
if (!pending()) TR.key = 0;                      // (a press that is waiting in line keeps its time)
}
async function traceWrite() {                    // at rest only
if (!TR || !TR.fresh || TR.on) return;
const n = Math.min(TR.fresh, TR.lines.length);
TR.fresh = 0;
await call("POST", "storage/write?path=/ext/data/trace.txt&append=1", TR.lines.slice(TR.lines.length - n).join("\n") + "\n", "application/octet-stream");
}
async function traceOpen() {                     // the file is kept to its last lines; a line says that the app started
const got = await call("GET", "storage/read?path=/ext/data/trace.txt");
const old = got.ok ? got.text.split("\n").filter((l) => l) : [];
if (old.length > 200) {
await call("POST", "storage/write?path=/ext/data/trace.txt", old.slice(old.length - 150).join("\n") + "\n", "application/octet-stream");
}
const d = local();
traceLine("--- start " + D.trace + " " + today() + " " + pad2(d.getUTCHours()) + ":" + pad2(d.getUTCMinutes()) + " speed " + speedIx +
" plates " + onTable() + " menu " + count(st.met));
}
async function act(name, fn) {
if (TR) traceStart(name);
try {
await fn();
} finally {
if (TR) traceEnd();
}
}
function film(id, name, z, loop, x, y) {
const f = F[name];
return { id: id, type: "animation", path: "animations/" + name + ".anim", x: x === undefined ? (f ? f[0] : 0) : x, y: y === undefined ? (f ? f[1] : 0) : y,
align: "top_left", loop: !!loop, section: "default", timeout: loop ? LOOP_T : STILL, z_index: z };
}
function once(id, name, z, x, y) {
const el = film(id, name, z, false, x, y);
el.timeout = Math.ceil(F[name][2] / 1000) + 1;
return el;
}
function held(id, name, z, secs) {
const el = film(id, name, z, false);
el.timeout = secs || 6;
return el;
}
function long(el) {
el.timeout = LOOP_T;
return el;
}
function bitmap(id, data, x, y, z) {
return { id: id, type: "xpmbitmap", x: x, y: y, align: "top_left", timeout: STILL, data: data, z_index: z };
}
function words(id, s, y, colour, z, x, align) {
const el = text(id, s, "small", x === undefined ? 51 : x, y, colour, align || "top_mid", z);
el.timeout = STILL;
return el;
}
function rect(id, x, y, w, h, colour, z) {
const el = bar(id, x, y, w, h, colour, z);
el.timeout = STILL;
return el;
}
function xpm(w, h, pal, rows) {
return "! XPM2\n" + w + " " + h + " " + (pal.length + 1) + " 1\n. c none\n" + pal.join("\n") + "\n" + rows.join("\n");
}
const NOTHING = "! XPM2\n1 1 1 1\n. c none\n.";
function away(el) {
const gone = Object.assign({}, el, { x: OFF, timeout: 2 });
if (gone.type === "xpmbitmap") gone.data = NOTHING;
return wire(gone);
}
function park(ids) {
const out = [];
for (let i = 0; i < ids.length; i++) {
const rec = live.get(ids[i]);
if (!rec) continue;
live.delete(ids[i]);
if (rec.el) out.push(away(rec.el));
}
return out;
}
async function send(items) {
const parts = [], recs = [];
for (let i = 0; i < items.length; i++) {
if (typeof items[i] === "string") {
parts.push(items[i]);
} else {
const s = wire(items[i]);
parts.push(s);
recs.push([items[i], s]);
}
}
if (!parts.length) return;
const ok = await postAll(parts, 8);
if (!ok) return;
const at = Date.now();
for (let i = 0; i < recs.length; i++) live.set(recs[i][0].id, { s: recs[i][1], t: at, el: recs[i][0] });
}
async function put(els) {
const now = Date.now(), todo = [];
for (let i = 0; i < els.length; i++) {
const old = live.get(els[i].id);
if (old && old.s === wire(els[i]) && now - old.t < 400 * els[i].timeout) continue;
todo.push(els[i]);
}
await send(todo);
}
const SLOTS = [];
for (let i = 0; i < 6; i++) SLOTS.push({ id: "q" + i, path: "", until: 0, sent: 0 });
let spareSeq = 0;
function slotWire(s, name, x, y, z) {
s.path = name;
s.sent = Date.now();
return '{"id":"' + s.id + '","type":"animation","path":"animations/' + name + '.anim","x":' + x + ',"y":' + y +
',"align":"top_left","loop":false,"section":"default","timeout":' + LOOP_T + ',"z_index":' + z + "}";
}
function slotRest(s) {                           // back to the empty film, off-screen
s.until = 0;
return slotWire(s, "blank", OFF, 0, 1);
}
function play(name, z, x, y, hold) {
const now = Date.now(), f = F[name];
let s = null;
for (let i = 0; i < SLOTS.length; i++) {
const c = SLOTS[i];
if (c.until <= now && c.path !== name && (!s || c.until < s.until)) s = c;
}
if (!s) {                                      // (never met in the tests: then a new element, as before)
const el = hold ? held("f_x" + (spareSeq++ & 7), name, z, 30) : once("f_x" + (spareSeq++ & 7), name, z, x, y);
return { part: wire(el), off: () => away(el) };
}
s.until = hold ? Infinity : now + f[2] + 500;
return { part: slotWire(s, name, x === undefined ? f[0] : x, y === undefined ? f[1] : y, z), off: () => slotRest(s) };
}
function slotParts(all) {
const now = Date.now(), out = [];
for (let i = 0; i < SLOTS.length; i++) {
if (all || (SLOTS[i].until <= now && now - SLOTS[i].sent > 1200000)) out.push(slotRest(SLOTS[i]));
}
return out;
}
function shoot(name, z, x, y) {
return post([play(name, z, x, y).part]);
}
const ms = (name) => F[name][2];
let oks = 0, starts = 0;
Object.defineProperty(ctl, "ok", { get: () => oks > 0, set: (v) => { oks = v ? oks + 1 : 0; } });
Object.defineProperty(ctl, "start", { get: () => starts > 0, set: (v) => { starts = v ? starts + 1 : 0; } });
function keys() {
const k = { turn: ctl.turn, ok: oks > 0, start: starts > 0, presses: oks + starts, back: backs > 0, backs: backs };
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
if (k.turn || k.ok || k.start || k.back) since = Date.now();
return k;
}
const pending = () => ctl.turn !== 0 || ctl.ok || ctl.start || backs > 0;
onBack = () => {                                 // Back leaves the app on the main screen and at the belt; elsewhere it is a step back
if (bookAt < 0 && (mode === "belt" || mode === "title")) return false;
backs++;                                       // (in the guide: a page back; on its first page the guide closes)
return true;
};
function hour() {
if (D.hour !== undefined) return D.hour;
const d = local();
return d.getUTCHours() + d.getUTCMinutes() / 60;
}
let nightsOn = true, beltHints = 0, hints = 0;   // a setting; how often the belt has hinted since the start, and the page that is on show since it came
let bookAt = -1;                                 // the guide: the page on show (-1: the guide is not open)
const isNight = () => nightsOn && (hour() >= 23 || hour() < 6);
const isBusy = () => (hour() >= 11.5 && hour() < 13.5) || (hour() >= 18 && hour() < 20.5);
const gap = () => (isNight() ? 36 + pick(15) : isBusy() ? 17 + pick(3) : 21 + pick(7));
let nightOn = false;
const nightEl = () => long(film("ngt", "night", Z.night));
async function nightCheck(quick) {
const want = isNight();
if (want === nightOn) {
if (nightOn) await put([nightEl()]);
return;
}
nightOn = want;
if (!want) return post(park(["ngt"]));
if (quick) return put([nightEl()]);
await post([wire(held("f_ni", "night_in", Z.night, 8))]);
await sleep(ms("night_in") + 150);
await send([nightEl(), away(held("f_ni", "night_in", Z.night))]);
}
let beltPos = 0, beltAt = Date.now(), nextAt = 0, parade = 0, goldDue = !!D.gold;
const plates = [];                               // { id, k, at }: its left edge is at column  at - beltPos
const PIDS = ["p0", "p1", "p2", "p3", "p4", "p5"];
const freeIds = PIDS.slice();
const pSent = {};
const colOf = (p) => Math.round(p.at - beltPos);
const RARE = [];
for (let i = 0; i < N; i++) if (D.items[i].t === 4) RARE.push(i);
const WEIGHT = [10, 10, 7, 4, 0];
function choose() {
if (D.only !== undefined) return D.only;
if (D.parade) return parade++ % N;
if (goldDue) {
goldDue = false;
return RARE[pick(RARE.length)];
}
if (rnd() < 0.04) return RARE[pick(RARE.length)];
let total = 0;
for (let i = 0; i < N; i++) total += WEIGHT[D.items[i].t];
for (let tries = 0; tries < 5; tries++) {
let r = rnd() * total, k = 0;
while (k < N - 1 && (r -= WEIGHT[D.items[k].t]) >= 0) k++;
if (!plates.some((p) => p.k === k)) return k;
if (tries === 4) return k;
}
return 0;
}
let heraldDue = false;
function spawn(at, quiet) {
if (!freeIds.length) return;
const k = choose();
plates.push({ id: freeIds.shift(), k: k, at: at });
if (D.items[k].t === 4 && !quiet && D.only === undefined) heraldDue = true;
}
function advance() {
const now = Date.now();
beltPos += Math.min(now - beltAt, 600000) * D.speed[speedIx] / 1000;
beltAt = now;
for (let i = plates.length - 1; i >= 0; i--) {
if (colOf(plates[i]) < -PW) freeIds.push(plates.splice(i, 1)[0].id);
}
while (nextAt <= beltPos + 72) {
if (nextAt - beltPos > -PW) spawn(nextAt, nextAt - beltPos < 60);
nextAt += gap();
}
}
function plateWire(p, x, y) {
const gold = D.items[p.k].t === 4;
return '{"id":"' + p.id + '","type":"animation","path":"animations/p' + p.k + '.anim","x":' + x + ',"y":' + y +
',"align":"top_left","loop":' + gold + ',"section":"default","timeout":' + LOOP_T + ',"z_index":' + Z.plate + "}";
}
function restWire(id) {                          // a plate element that carries nothing: off-screen
return '{"id":"' + id + '","type":"animation","path":"animations/blank.anim","x":' + OFF + ',"y":1,"align":"top_left","loop":false,' +
'"section":"default","timeout":' + LOOP_T + ',"z_index":' + Z.plate + "}";
}
function pPart(id, s) {                          // a part for a request, noted as what the bar will hold under that id
pSent[id] = s;
return s;
}
function beltParts(all) {
const want = {}, parts = [];
for (let i = 0; i < plates.length; i++) {
const x = colOf(plates[i]);
if (x <= 72) want[plates[i].id] = plateWire(plates[i], x, 1);
}
for (let i = 0; i < PIDS.length; i++) {
const s = want[PIDS[i]] || restWire(PIDS[i]);
if (all || pSent[PIDS[i]] !== s) parts.push(pPart(PIDS[i], s));
}
return parts;
}
async function beltTick(all) {
advance();
const parts = beltParts(all);
if (parts.length) {
const a = Date.now();
if (!(await post(parts))) {                    // refused: nothing is taken for granted, the next step says all of it again
for (let i = 0; i < PIDS.length; i++) pSent[PIDS[i]] = "";
}
if (TR) {                                      // the measuring build: what a belt step costs, a line every half minute
const d = Date.now() - a;
TR.n++;
TR.sum += d;
if (d > TR.max) TR.max = d;
if (a > TR.due && !TR.on) {
traceLine("belt steps " + TR.n + " avg " + Math.round(TR.sum / TR.n) + " max " + TR.max);
TR.n = TR.sum = TR.max = 0;
TR.due = a + 30000;
}
}
}
if (heraldDue) {
heraldDue = false;
await shoot("herald", Z.cup + 5);
}
}
function beltCatch() {
return beltTick(true);
}
function beltGo() {
beltAt = Date.now();
}
function untilStep() {
const pos = beltPos + (Date.now() - beltAt) * D.speed[speedIx] / 1000;
const next = Math.floor(pos + 0.5) + 0.5;
return Math.max(15, (next - pos) * 1000 / D.speed[speedIx] + 4);
}
async function run(time) {
const end = Date.now() + time;
while (!stopped) {
await beltTick();
const left = end - Date.now();
if (left <= 0) break;
await sleep(Math.min(left, untilStep()));
}
}
function barEls() {
const els = [long(film("bar", "bar", Z.bar)), film("blt", "belt" + speedIx, Z.belt, true)];
if (st.done) els.push(long(film("rst", "rest", Z.rest)));
return els;
}
async function barUp() {
const els = barEls(), fresh = [];
for (let i = 0; i < els.length; i++) if (!live.has(els[i].id)) fresh.push(wire(els[i], OFF, 0));
if (fresh.length) await post(fresh);
await put(els);
}
function laySteps() {
return [
() => post(slotParts(true)),                   // the six slots: empty films, off-screen
() => post(platesAway()),                      // the six plate elements: off-screen, empty
barUp,
async () => {
nightOn = false;
if (isNight()) await post([wire(nightEl(), OFF, 0)]);
await nightCheck(true);
},
() => beltCatch(),                             // the plates that are in sight: to their columns
];
}
async function layBar() {
const steps = laySteps();
for (let i = 0; i < steps.length; i++) await steps[i]();
}
function platesAway() {                          // all six plate elements off the screen (your table, the ceremony)
const parts = [];
for (let i = 0; i < PIDS.length; i++) parts.push(pPart(PIDS[i], restWire(PIDS[i])));
return parts;
}
let cur = null, bites = 0, plAt = 0;
const pv = { lines: [] };                        // the two lines that are written beside the plate
const scene = {};
const SCENE = ["v_plate", "v", "v_glow", "v_t1", "v_t2", "v_i2", "v_i1", "v_i0", "v_dome"];
function sc(el) {
el.timeout = LOOP_T;
scene[el.id] = el;
return wire(el);
}
function scOff(ids) {
const out = [], list = ids || SCENE;
for (let i = 0; i < list.length; i++) {
const el = scene[list[i]];
if (!el) continue;                             // (never made since the app started: the bar has nothing under that id)
if (el.x !== OFF) scene[list[i]] = Object.assign({}, el, { x: OFF });
out.push(wire(scene[list[i]]));
}
return out;
}
async function layScene() {
const off = (id, name, z, loop) => film(id, name, z, loop, OFF, 0);
await postAll([off("v", "veil", Z.veil - 1), off("v_glow", "glow", Z.veil + 1, true), off("v_plate", "big0", Z.veil + 2), off("v_dome", "dome", Z.veil + 4),
off("v_i0", "blank", Z.veil + 3), off("v_i1", "blank", Z.veil + 3), off("v_i2", "blank", Z.veil + 3),
words("v_t1", "-", 0, WHITEC + "FF", Z.veil + 8, OFF), words("v_t2", "-", 7, WHITEC + "FF", Z.veil + 8, OFF)].map((el) => sc(el)), 8);
}
const vVeil = () => film("v", "veil", Z.veil - 1);
const vItem = (n, on, dy) => film("v_i" + n, "i" + cur.k + "_" + n, Z.veil + 3, false, on ? 2 : OFF, 1 + (dy || 0));
const vPlate = (dy) => film("v_plate", "big" + D.items[cur.k].t, Z.veil + 2, false, 1, 11 + (dy || 0));
const vGlow = () => film("v_glow", "glow", Z.veil + 1, true);
const vDome = () => film("v_dome", "dome", Z.veil + 4, false, 1, 0);
const lineParts = (lines, alpha) => lines.map((l) => sc(words(l[0], l[1], l[2], l[3] + (alpha || "FF"), Z.veil + 8)));
async function fadeWords(lines) {                // [[id, text, y, colour]]: they come up softly, in two steps
pv.lines = lines;
await post(lineParts(lines, "70"));
await sleep(110);
await post(lineParts(lines));
}
function nameLines() {
const it = D.items[cur.k], rare = it.t === 4;
return [["v_t1", it.n[0], 0, rare ? GOLD : WHITEC], ["v_t2", it.n[1], 7, rare ? GOLD : D.tier[it.t][1]]];
}
async function take() {
advance();
let best = null, bd = 999;
for (let i = 0; i < plates.length; i++) {
const x = colOf(plates[i]), d = Math.abs(x - SPOT);
if (x >= 0 && x <= 72 - PW && d < bd) {
best = plates[i];
bd = d;
}
}
if (!best) return shoot("tap", Z.hint);          // nothing on the belt yet: the press is answered all the same
mode = "plate";
taken++;
cur = { k: best.k, id: best.id };
bites = 0;
pv.lines = [];
plates.splice(plates.indexOf(best), 1);
await post([pPart(cur.id, plateWire(cur, SPOT, 0))]);
await sleep(110);
const vin = play("veil_in", Z.veil, 0, 0, true), rise = play("rise", Z.veil + 10, undefined, undefined, true);
await post([vin.part, rise.part, pPart(cur.id, restWire(cur.id))]);     // (its element on the belt: off-screen, free again)
freeIds.push(cur.id);
await sleep(ms("rise") + 150);
await post([sc(vGlow()), sc(vPlate(0)), sc(vItem(0, true)), sc(vDome()), sc(vVeil()), vin.off()]);
await post([play("settle", Z.veil + 11).part, rise.off()]);
const t1 = Date.now();
await post([sc(vItem(1, false)), sc(vItem(2, false))]);     // the two bitten states: their pictures now, off-screen (a bite only moves them)
await sleep(ms("settle") + 300 - (Date.now() - t1));        // the light thins away; a breath, the plate under its dome
await post([play("lift", Z.veil + 5).part].concat(scOff(["v_dome"])));
await sleep(ms("lift") + 40);
if (D.items[cur.k].t === 4) {                    // a rare one says so first
pv.lines = [["v_t1", "RARE", 4, GOLD]];
await post([play("twk", Z.veil + 9, 60, 2).part].concat(lineParts(pv.lines, "70")));
await sleep(110);
await post(lineParts(pv.lines));
await sleep(950);
}
await fadeWords(nameLines());
keys();
since = plAt = Date.now();
hints = 0;
}
async function bite() {
bites++;
const it = D.items[cur.k], n = bites;
if (n < 3) {
await post([sc(vItem(n, true))].concat(scOff(["v_i" + (n - 1)]), [play("crumb", Z.veil + 6, 2 + it.e[n - 1] - 6, 1).part]));
return;
}
newDay();
if (D.feast && !st.done) {                       // TEST build: this is the last thing missing on the menu
st.met = "";
for (let i = 0; i < N; i++) st.met += i === cur.k ? "0" : "1";
}
const fresh = st.met[cur.k] !== "1";
st.met = setBit(st.met, cur.k);
st.all++;
st.today++;
addPlate(it.t);
pv.lines = [["v_t1", "MM!", 0, GOLD], ["v_t2", fresh ? "NEW " + count(st.met) + "/" + N : st.today + " TODAY", 7, fresh ? GOLD : DIMC]];
await post(scOff(["v_i2"]).concat([play("crumb", Z.veil + 6, 2, 1).part], lineParts(pv.lines), [play("yum", Z.veil + 9).part]));
const beat = Date.now();
await save();                                    // now the picture stands still: the one moment to write, and waited for
await beltCatch();                               // and the belt, still in the dark, is put where it is by now
await sleep((fresh ? 1500 : 1000) - (Date.now() - beat));
const off = scOff();
await post([play("dn" + it.t, Z.veil + 13, 1, 11).part, off[0], play("veil_out", Z.veil + 12, 0, 0).part].concat(off.slice(1, 6)));
const swept = Date.now();
if (off.length > 6) await post(off.slice(6));
await sleep(Math.max(ms("veil_out"), 350) + 60 - (Date.now() - swept));
beltGo();
mode = "belt";
cur = null;
if (count(st.met) === N && !st.done) await feast();
else if (onTable() % 5 === 0 || st.all === 1) await shoot("whl_dn", Z.hint);     // "your table is down there"
keys();
}
async function nudge() {                         // Back on a plate that is bitten into: it stays; a nod says so
await post([sc(vItem(bites, true, 1)), sc(vPlate(1))]);
await sleep(110);
await post([sc(vItem(bites, true, 0)), sc(vPlate(0))]);
await shoot("tap", Z.hint);
}
async function putBack() {
pv.lines = [];
const cov = play("cover", Z.veil + 5, 0, 0, true);
await post(scOff(["v_t1", "v_t2"]).concat([cov.part]));             // the dome comes down again
await sleep(ms("cover") + 60);
const s1 = play("sink1", Z.veil + 10, 0, 0, true);
await post([s1.part]);                                             // it turns into light ...
await sleep(ms("sink1") + 140);
await post(scOff(["v_glow", "v_plate", "v_i0", "v_i1", "v_i2", "v_dome", "v_t1"]).concat([cov.off()]));
advance();
const at = Math.round(beltPos) + SPOT;
plates.sort((p, q) => p.at - q.at);
let edge = at;
for (let i = 0; i < plates.length; i++) {
if (plates[i].at >= at) {
if (plates[i].at < edge + 17) plates[i].at = edge + 17;
edge = plates[i].at;
}
}
if (nextAt < edge + 17) nextAt = edge + 17;
edge = at;
for (let i = plates.length - 1; i >= 0; i--) {
if (plates[i].at < at) {
if (plates[i].at > edge - 17) plates[i].at = edge - 17;
edge = plates[i].at;
}
}
if (!freeIds.length) freeIds.push(plates.shift().id);
plates.push({ id: freeIds.shift(), k: cur.k, at: at });
await beltCatch();
await post([play("sink2", Z.veil + 11, 0, 0).part, s1.off()]);     // ... and sinks back
await sleep(ms("sink2") + 40);
await post([play("veil_out", Z.veil + 12, 0, 0).part].concat(scOff(["v", "v_t2"])));     // the dark is swept away (with it the last of the nine)
await sleep(ms("veil_out") + 40);
beltGo();
mode = "belt";
cur = null;
keys();
}
const PAL_PLATES = ["z c " + D.pile.shade];
for (let t = 0; t < 5; t++) {
PAL_PLATES.push("ABCDE"[t] + " c " + D.tier[t][0], "abcde"[t] + " c " + D.tier[t][1], "fghij"[t] + " c " + D.tier[t][2],
"klmno"[t] + " c " + D.tier[t][3], "pqrst"[t] + " c " + D.tier[t][4]);
}
const rep = (ch, n) => {
let s = "";
for (let i = 0; i < n; i++) s += ch;
return s;
};
const rimOf = (t) => "klmno"[t] + "ABCDE"[t] + rep("abcde"[t], 4) + "fghij"[t];
const underOf = (t) => "." + "pqrst"[t] + rep("fghij"[t], 4) + ".";
function pilesData() {                           // two piles, 16 x 13 at column 34, row 1: `b` is the one nearer the slot
const g = [];
for (let r = 0; r < 13; r++) g.push(rep(".", 16).split(""));
for (let side = 0; side < 2; side++) {
const pile = side ? st.b : st.a, x0 = 1 + side * 8;
if (!pile.length) continue;
for (let k = 0; k < 7; k++) g[12][x0 + k] = "z";                  // its shadow on the wood's lit lip
for (let i = 0; i < pile.length; i++) {
const x = x0 - (i >= 2 ? 1 : 0), y = 10 - 2 * i, rim = rimOf(pile[i]), under = underOf(pile[i]);   // (the upper plates stand a pixel off)
for (let k = 0; k < 7; k++) {
g[y][x + k] = rim[k];
if (under[k] !== ".") g[y + 1][x + k] = under[k];
}
}
}
return xpm(16, 13, PAL_PLATES, g.map((row) => row.join("")));
}
function plateData(t, shade) {
const rim = rimOf(t), under = underOf(t);
if (!shade) return xpm(8, 2, PAL_PLATES, [rim + ".", under + "."]);
return xpm(8, 3, PAL_PLATES, [rim + ".", under + ".", "." + rep("z", shade) + rep(".", 7 - shade)]);
}
function dimData(back) {
const g = [];
for (let r = 0; r < 5; r++) g.push(rep(".", 30).split(""));
const n = Math.min(back.length, 6);              // (the six newest of them; the row fills from the lamp's side)
for (let i = 0; i < n; i++) {
const d = D.charm[back[back.length - n + i]].d;
for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) if (d[r][c] !== ".") g[r][30 - 5 * (n - i) + c] = d[r][c];
}
const rows = g.map((row) => row.join(""));
rows.push(D.shelf);
return xpm(30, 6, D.dimPal, rows);
}
function keepEls() {
const els = [], n = st.order.length, front = st.order.slice(Math.max(0, n - 4)), back = st.order.slice(0, Math.max(0, n - 4));
for (let i = 0; i < front.length; i++) els.push(film("t_k" + (front.length - 1 - i), "k" + front[i], Z.table + 2, false, 25 - 8 * (front.length - 1 - i), 6));
if (back.length) els.push(bitmap("t_dim", dimData(back), 0, 0, Z.table + 1));
return els;
}
function stripData() {                           // the menu as a row of lights in the table's edge: lit = eaten once
const pal = ["z c #68402C"];
let row = "";
for (let i = 0; i < N; i++) {
const ch = String.fromCharCode(65 + i);
pal.push(ch + " c " + D.key[i]);
row += (st.met[i] === "1" ? ch + ch : "zz") + (i < N - 1 ? "." : "");
}
return xpm(68, 1, pal, [row]);
}
const DIGITS = ["### .#. ### ### #.# ### ### ### ### ###", "#.# ##. ..# ..# #.# #.. #.. ..# #.# #.#", "#.# .#. ### ### ### ### ### ..# ### ###",
"#.# .#. #.. ..# ..# ..# #.# .#. #.# ..#", "### ### ### ### ..# ### ### .#. ### ###"];
function digitsData(n, rolling) {                // the plates returned, as a counter of three wheels: 007
const s = ("00" + (n % 1000)).slice(-3), was = ("00" + ((n + 999) % 1000)).slice(-3), rows = [];
for (let r = 0; r < 5; r++) {
let row = "", lead = true;
for (let i = 0; i < 3; i++) {
const d = s.charCodeAt(i) - 48, o = was.charCodeAt(i) - 48;
lead = lead && d === 0 && i < 2;
let cell = DIGITS[r].slice(d * 4, d * 4 + 3);
if (rolling && d !== o) cell = r < 2 ? DIGITS[r + 3].slice(o * 4, o * 4 + 3) : r === 2 ? "..." : DIGITS[r - 3].slice(d * 4, d * 4 + 3);
for (let c = 0; c < 3; c++) row += cell[c] === "#" ? (lead ? "d" : "a") : ".";
if (i < 2) row += ".";
}
rows.push(row);
}
return xpm(11, 5, ["a c #FFBE3C", "d c #381A06"], rows);
}
function pipsData(n) {                           // five lamps: how far the next prize is
let row = "";
for (let i = 0; i < 5; i++) row += (i < n ? "a" : "b") + (i < 4 ? "." : "");
return xpm(9, 1, ["a c #FFE27A", "b c #7A2418"], [row]);
}
function tableEls(lamps) {
const els = [film("tbl", "table", Z.table), bitmap("t_strip", stripData(), 2, 14, Z.table + 2),
bitmap("t_dig", digitsData(st.back), 59, 4, Z.table + 2), bitmap("t_pip", pipsData(lamps === undefined ? st.back % 5 : lamps), 60, 9, Z.table + 2)];
if (st.a.length || st.b.length) els.push(bitmap("t_pile", pilesData(), D.pile.x[0] - 1, 1, Z.table + 2));   // (a bitmap of nothing is not sent)
return els.concat(keepEls());
}
const TABLE_IDS = ["tbl", "t_pile", "t_strip", "t_dig", "t_pip", "t_dim", "t_k0", "t_k1", "t_k2", "t_k3", "t_pl"];
function refill() {                              // plates that had no room come up when there is room
while (st.more > 0 && (st.b.length < PMAX || st.a.length < PMAX)) {
st.more--;
addPlate(pick(4));
}
}
async function showTable(lamps) {
await put(tableEls(lamps));
if (!st.a.length && !st.b.length && live.has("t_pile")) await post(park(["t_pile"]));
}
async function toTable() {
mode = "table";
hints = 0;
refill();
const pan = play("pan_dn", Z.pan, 0, 0, true);
await post([pan.part]);                                            // the view goes down; the table is still dark
await sleep(ms("pan_dn") + 140);
await postAll(park(["bar", "blt", "rst"]).concat(platesAway()), 8);   // under the film, which stands: the bar goes ...
await showTable();                                                 // ... and the table is laid
await post([play("lamp_on", Z.pan + 1, 0, 0).part, pan.off()]);    // and its lamp comes on
await sleep(ms("lamp_on") + 40);
keys();
since = Date.now();
}
async function toBelt() {
const lamp = play("lamp_off", Z.pan + 1, 0, 0, true);
await post([lamp.part]);
await sleep(ms("lamp_off") + 100);
if (dirty) await save();                         // the dim table stands still: the moment to write
await postAll(park(TABLE_IDS), 8);
await barUp();
const pan = play("pan_up", Z.pan + 2, 0, 0, true);
await post([pan.part, lamp.off()]);
await sleep(ms("pan_up") + 120);
beltAt = Math.max(beltAt, Date.now() - 20000);                     // (the belt ran on meanwhile, but not for hours)
await beltCatch();
await post([play("belt_in", Z.pan + 3, 0, 0).part, pan.off()]);
await sleep(ms("belt_in") + 40);
beltGo();
mode = "belt";
keys();
since = Date.now();
}
async function push() {
const near = st.b.length > 0, pile = near ? st.b : st.a;
if (!pile.length) return shoot("whl_up", Z.hint);     // nothing to return: "the belt is up there"
const t = pile.pop(), i = pile.length, px = D.pile.x[near ? 1 : 0], x0 = px - (i >= 2 ? 1 : 0), y0 = 11 - 2 * i;
dirty = true;
const land = near ? 50 : px + 7;                 // where it comes down on the wood, clear of its pile
const pl = (x, y, wood) => bitmap("t_pl", plateData(t, wood ? Math.max(0, Math.min(6, 56 - x)) : 0), x, y, Z.table + 4);
const rest = st.a.length || st.b.length ? [bitmap("t_pile", pilesData(), D.pile.x[0] - 1, 1, Z.table + 2)] : park(["t_pile"]);
let x = x0;
if (i > 0) {                                     // lifted off its pile and pushed sideways, above the plates under it ...
await send(rest.concat([pl(x0 + Math.round((land - x0) * 0.45), y0 - 1, false)]));
await sleep(110);
await send([pl(land, 11, true)]);              // ... and down onto the wood, its shadow under it
x = land;
} else {
await send(rest.concat([pl(x0, 11, true)]));
}
if (x < 50) {                                    // along the wood to the slot
await sleep(110);
await send([pl(50, 11, true)]);
}
await sleep(110);
await post([play("in" + t, Z.table + 7).part].concat(park(["t_pl"])));   // and in: a film takes over (in a slot)
await sleep(D.swallow + 30);
st.back++;                                       // clack: one more on the counter, its wheels caught half-way ...
await send([bitmap("t_dig", digitsData(st.back, true), 59, 4, Z.table + 2),
bitmap("t_pip", pipsData(st.back % 5 === 0 ? 5 : st.back % 5), 60, 9, Z.table + 2)]);
await sleep(110);
await send([bitmap("t_dig", digitsData(st.back), 59, 4, Z.table + 2)]);      // ... and settled
refill();
if (st.back % 5 === 0) await prize();
since = Date.now();
}
async function prize() {
mode = "show";
await sleep(260);
for (let i = 0; i < 2; i++) {                    // the five lamps blink
await send([bitmap("t_pip", pipsData(0), 60, 9, Z.table + 2)]);
await sleep(110);
await send([bitmap("t_pip", pipsData(5), 60, 9, Z.table + 2)]);
await sleep(140);
}
await darkIn();
await post([wire(held("f_cap", "capsule", Z.show + 3, 12))]);
await sleep(ms("capsule") + 180);
const left = [];
for (let k = 0; k < NC; k++) if (st.charms[k] !== "1") left.push(k);
const win = left.length > 0 && (D.prize || count(st.charms) === 0 || rnd() < 0.45);
const k = win ? left[pick(left.length)] : -1;
if (win) {
st.charms = setBit(st.charms, k);
st.order.push(k);
}
await send([win ? film("z_ch", "c" + k, Z.show + 2) : film("z_ch", "spark", Z.show + 2, true)]);
await post([wire(once("f_pop", "pop", Z.show + 6)), away(held("f_cap", "capsule", Z.show + 3))]);
await sleep(ms("pop") - 120);
const lines = win ? [["z_t1", D.charm[k].n, 0, WHITEC], ["z_t2", count(st.charms) + " OF " + NC, 7, GOLD]]
: [["z_t1", "THANK YOU", 0, WHITEC], ["z_t2", "TOTAL " + Math.min(st.back, 9999), 7, DIMC]];
await send(lines.map((l) => words(l[0], l[1], l[2], l[3] + "70", Z.show + 4)));
await sleep(110);
await send(lines.map((l) => words(l[0], l[1], l[2], l[3] + "FF", Z.show + 4)));
await save();                                    // the picture stands still: written now, and waited for
keys();
await nap(win ? 3200 : 2200);
await closeShow(async () => {
await post(park(["z_ch", "z_t1", "z_t2"]));
await showTable();
});
if (win) await shoot("twk", Z.table + 8, 23, 3);           // there it stands, the newest, nearest the light
mode = "table";
keys();
}
async function darkIn() {
await post([wire(held("f_dk", "stage_in", Z.show + 10))]);
await sleep(ms("stage_in") + 80);
await send([rect("z_blk", 0, 0, 72, 16, "#000000FF", Z.show), film("z_glow", "glow2", Z.show + 1, true), away(held("f_dk", "stage_in", Z.show + 10))]);
}
async function darkOut(more) {
await post([wire(once("f_dk2", "dark_out", Z.show + 11))].concat(park(["z_blk"].concat(more || []))));
await sleep(ms("dark_out") + 40);
}
async function closeShow(clear) {
await post([wire(held("f_dk", "stage_in", Z.show + 10))]);
await sleep(ms("stage_in") + 80);
await clear();
await post([wire(once("f_dk2", "stage_out", Z.show + 11)), away(held("f_dk", "stage_in", Z.show + 10))].concat(park(["z_blk", "z_glow"])));
await sleep(ms("stage_out") + 40);
}
let resetDue = false, resetTo = false;
async function startOver(black) {
resetDue = false;
mode = "show";
if (!black) {
await post([wire(held("f_dk", "dark_in", Z.show + 10))]);       // whatever is on show goes dark
await sleep(ms("dark_in") + 80);
}
const lines = [["z_t1", "ALL CLEARED", 0, WHITEC], ["z_t2", "A FRESH START", 7, GOLD]];
const card = (alpha) => lines.map((l) => words(l[0], l[1], l[2], l[3] + alpha, Z.show + 4, 36));
await send([rect("z_blk", 0, 0, 72, 16, "#000000FF", Z.show)].concat(card("70"), black ? [away(SPLASH)] : [away(held("f_dk", "dark_in", Z.show + 10))]));
const shown = Date.now();
st.met = bits("", N);
st.charms = bits("", NC);
st.order = [];
st.a = [];
st.b = [];
st.all = st.today = st.more = st.back = 0;
st.done = false;
st.seen = false;
st.rs = resetTo;
taken = 0;
await sleep(110 - (Date.now() - shown));
await send(card("FF"));
await save();                                    // at once: quitting now does not bring the old state back
const ids = [];
for (const id of live.keys()) if (id !== "z_blk" && id !== "z_t1" && id !== "z_t2" && id !== "bar" && id !== "blt" && id !== "ngt") ids.push(id);
await postAll(park(ids).concat(scOff()), 8);
cur = null;
bites = 0;
pv.lines = [];
beltHints = 0;
await post(pageParts(-1));                       // the guide's pages, off-screen (made now if they were not yet)
pagesMade = PAGES;
if (!black) {
await barUp();
beltAt = Math.max(beltAt, Date.now() - 20000);
await beltCatch();
}
keys();
await sleep(1600 - (Date.now() - shown));
mode = "belt";
await book(park(["z_blk", "z_t1", "z_t2"]), black);     // the guide again: its first page takes the card's place
if (stopped) return;
await mainScreen();                              // and then, as at every start, the main screen
}
async function feast() {
mode = "show";
await run(500);
await darkIn();
await post(platesAway().concat([wire(held("f_tube", "tube", Z.show + 5, 20))]));   // a line of gold draws itself round the screen
await sleep(1150);
await send([film("z_gift", "gift", Z.show + 3)]);                  // the gift comes up out of the light
await sleep(ms("gift") + 100);
const one = "MENU", two = "COMPLETE", x1 = 49 - (smallWidth(one) >> 1), x2 = 49 - (smallWidth(two) >> 1);
for (let i = 1; i <= one.length; i++) {          // the words come on letter by letter
await send([words("z_t1", one.slice(0, i), 0, WHITEC + "FF", Z.show + 3, x1, "top_left")]);
await sleep(110);
}
for (let i = 1; i <= two.length; i++) {
await send([words("z_t2", two.slice(0, i), 7, GOLD + "FF", Z.show + 3, x2, "top_left")]);
await sleep(110);
}
await shoot("yum", Z.show + 6, 2, 1);
st.done = true;
await save();
keys();
await nap(3600);
await closeShow(async () => {
await post(park(["z_gift", "z_t1", "z_t2"]).concat([away(held("f_tube", "tube", Z.show + 5))]));
await barUp();                                 // the gold chopstick rest is on the counter from now on
await beltCatch();
});
beltGo();
mode = "belt";
keys();
}
let barDue = 0, hintAt = 0;
async function step() {
const now = Date.now();
if (mode === "belt") {
const full = now >= barDue;
if (full) {                                    // the still parts: looked after every few seconds
barDue = now + 5000;
await put(barEls());
const old = slotParts(false);
if (old.length) await post(old);
if (!st.done && live.has("rst")) await post(park(["rst"]));
await nightCheck();
}
await beltTick(full);                          // (every few seconds the step names all six plate elements)
if (taken < 3 && beltHints < 3 && now - since > (taken ? 30000 : 5000) && now - hintAt > 30000 && plates.some((p) => Math.abs(colOf(p) - SPOT) <= 2)) {
hintAt = now;
beltHints++;
await shoot("tap", Z.hint);
} else if (beltHints < 6 && onTable() >= 5 && now - since > 60000 && now - hintAt > 90000) {      // plates are waiting on your table
hintAt = now;
beltHints++;
await shoot("whl_dn", Z.hint);
}
if (!pending() && now - since > 2500) {        // at rest: what is to be written is written (one thing a step)
if (dirty) await save();
else if (!(await noteErrs())) await traceWrite();
}
if (!pending()) await nap(untilStep());
const k = keys();
if (k.start || k.ok) return act("take", take);
if (k.turn) return act("toTable", toTable);
} else if (mode === "plate") {                   // (nothing is sent for the belt here)
if (now - plAt > 1200000) {                    // a plate looked at for very long: its elements are kept alive
plAt = now;
const parts = [];
for (let i = 0; i < SCENE.length; i++) if (scene[SCENE[i]]) parts.push(wire(scene[SCENE[i]]));
await postAll(parts, 8);
}
if (hints < 3 && now - since > 3500 && now - hintAt > 7000) {    // (three times a plate at most, then it is left in peace)
hintAt = now;
hints++;
await shoot("tap", Z.hint);
}
if (!pending() && now - since > 2500) await traceWrite();
if (!pending()) await nap(500);
const k = keys();
if (k.start || k.ok) return act("bite" + (bites + 1), bite);
if (k.back) return bites ? act("nudge", nudge) : act("putBack", putBack);
} else if (mode === "table") {
await showTable();
await nightCheck();
if (!pending() && now - since > 1500) {        // kept as soon as the pushing rests
if (dirty) await save();
else if (!(await noteErrs())) await traceWrite();
}
if (hints < 3 && now - since > 3500 && now - hintAt > 9000) {    // (three times a visit at most)
hintAt = now;
hints++;
await shoot(st.a.length + st.b.length ? "tap" : "whl_up", Z.hint);
}
if (!pending()) await nap(1000);
const k = keys();
if (k.start || k.ok) return act("push", push);
if (k.turn || k.back) return act("toBelt", toBelt);
} else {
await sleep(100);
}
}
async function readSettings() {
const v = await loadSettings();
nightsOn = v.night !== false;
const ix = v.speed === "slow" ? 0 : v.speed === "fast" ? 2 : 1;
if (ix !== speedIx) {
advance();
speedIx = ix;
barDue = 0;
}
if (typeof v.reset === "boolean") {
if (st.rs === null) {
st.rs = v.reset;
dirty = true;
} else if (v.reset !== st.rs || resetDue) {
resetDue = true;
resetTo = v.reset;
}
}
}
const PAGES = D.guide;
const pagePart = (i, on) => '{"id":"g' + i + '","type":"animation","path":"animations/guide_' + i + '.anim","x":' + (on ? 0 : OFF) +
',"y":0,"align":"top_left","loop":true,"section":"default","timeout":' + LOOP_T + ',"z_index":' + Z.book + "}";
function pageParts(at) {                         // all pages: the one that is on show in its place, the others off-screen
const parts = [];
for (let i = 0; i < PAGES; i++) parts.push(pagePart(i, i === at));
return parts;
}
async function book(first, lay) {
bookAt = 0;
await post([pagePart(0, true)].concat(first));
keys();                                          // what was pressed before the first page does not count
let read = Date.now();                           // since when the page on show can be read
const todo = (lay ? laySteps() : []).concat([layScene]);
while (!stopped) {
if (!pending()) {
if (todo.length) {
await todo.shift()();
continue;
}
await nap(45000);
}
if (stopped) return;
const k = keys(), presses = k.presses;
if (!k.turn && !presses && !k.backs) {         // nothing was used: what lies under the guide is kept alive
await put(barEls());
if (nightOn) await put([nightEl()]);
continue;
}
if (bookAt === PAGES - 1) {                    // the last page: any key or turn, and the bar opens - but not one
if (Date.now() - read < 400) continue;       // that was on its way before the page could be read
break;
}
if (bookAt === 0 && k.backs > 0 && k.turn + presses - k.backs < 0) break;    // Back on the first page: the guide closes
const to = Math.max(0, Math.min(PAGES - 1, bookAt + k.turn + presses - k.backs));
if (to !== bookAt) {
await post([pagePart(to, true), pagePart(bookAt, false)]);
bookAt = to;
read = Date.now();
}
}
if (stopped) return;
while (todo.length) await todo.shift()();
beltGo();
await barUp();
await beltCatch();
await titleUp();
await post([play("open", Z.book + 1, 0, 0).part].concat(pageParts(-1)));
bookAt = -1;
const opened = Date.now();
if (!st.seen) {
st.seen = true;
await save();
}
await sleep(ms("open") - (Date.now() - opened));
keys();                                          // the key that closed the guide does nothing else
}
const TITLE_MS = 4000;
let titleMade = false, pagesMade = 0;
const titlePart = (on) => '{"id":"ttl","type":"animation","path":"animations/title.anim","x":' + (on ? 0 : OFF) +
',"y":0,"align":"top_left","loop":true,"section":"default","timeout":' + LOOP_T + ',"z_index":' + (Z.book - 10) + "}";
async function titleUp() {
if (!titleMade) await post([titlePart(false)]);
titleMade = true;
await post([titlePart(true)]);
}
async function mainScreen() {
mode = "title";
keys();
let until = Date.now() + TITLE_MS;
while (!stopped) {
await beltTick();                              // the belt runs on under the name
if (!pending()) {
if (pagesMade < PAGES) {
await post([pagePart(pagesMade++, false)]);
continue;
}
await nap(Math.max(0, Math.min(untilStep(), until - Date.now())));
}
if (stopped) return;
const k = keys();
if (k.start) break;                            // Start: in
if (k.ok) {                                    // OK: the guide; it comes back to this screen
while (pagesMade < PAGES) await post([pagePart(pagesMade++, false)]);
await book([], false);
if (stopped) return;
mode = "title";
until = Date.now() + TITLE_MS;
continue;
}
if (k.turn) until = Date.now() + TITLE_MS;     // (a turn does nothing here; it only shows that somebody is there)
if (Date.now() >= until) break;
}
await post([play("title_out", Z.book - 9, 0, 0).part, titlePart(false)]);     // the name fades: a film takes its place and thins away
mode = "belt";
keys();
barDue = Date.now() + 5000;
since = hintAt = Date.now();
}
const SPLASH_MS = 1500;
const SPLASH = { id: "zz_mark", type: "animation", path: "animations/splash.anim", x: 0, y: 0, align: "top_left", loop: false,
section: "default", timeout: 5, z_index: 900 };
async function main() {
const t0 = Date.now();
await post([wire(SPLASH)]);
const t1 = Date.now();
await syncTime();
await load();
await readSettings();
if (TR) await traceOpen();
const t2 = Date.now();
beltPos = 0;
beltAt = Date.now();
let at = SPOT + 8 - 2 * gap();
const gold = goldDue;
goldDue = false;
while (at < 72) {
if (at > -PW) spawn(at, true);
at += gap();
}
goldDue = gold;                                  // (TEST build --gold: the first plate that comes in)
nextAt = at;
const withBook = !st.seen || resetDue;
if (withBook) {
await post(pageParts(-1));                     // the guide's pages: made now, off-screen (a turn of the page only moves them)
pagesMade = PAGES;
} else {
await layBar();
await titleUp();                               // the main screen, over the bar and under the mark
}
const t3 = Date.now();
await sleep(SPLASH_MS - (Date.now() - t0));      // the film's time (never cut short, never drawn twice)
if (stopped) return;                             // Back during the mark: the app leaves, as on the belt
const t4 = Date.now();
if (resetDue) {
await act("startOver", () => startOver(true)); // the switch was flipped while the app was closed (the card, the guide, the main screen)
} else {
if (withBook) await book([away(SPLASH)], true);
else await post([play("open", Z.book + 1, 0, 0).part, away(SPLASH)]);    // out of the film's black, in a fifth of a second
if (stopped) return;
beltGo();
await mainScreen();
}
if (stopped) return;
beltGo();
keys();                                          // what was pressed during the mark does not count
if (TR) traceLine("boot mark " + (t1 - t0) + " read " + (t2 - t0) + " page " + (t3 - t0) + " waited " + (t4 - t0) + " open " + (Date.now() - t0));
barDue = Date.now() + 5000;
since = Date.now();
let settingsDue = Date.now() + 4000, zoneDue2 = Date.now() + 3600000;
while (!stopped) {
try {
if (resetDue && mode !== "show") await act("startOver", () => startOver(false));
if (Date.now() >= settingsDue && mode !== "show" && !pending()) {
settingsDue = Date.now() + 4000;
await readSettings();
if (Date.now() >= zoneDue2) {
zoneDue2 = Date.now() + 3600000;
await syncTime();
}
}
await step();
} catch (err) {
report("sushi", err);
await sleep(500);
}
}
if (dirty) await save();
await noteErrs();
if (TR) {
await traceWrite();
if (untrace) untrace();
}
}
let untrace = null;
if (TR) {
try {
untrace = listen("input", (e) => {
if (!TR.key && (e.key === "encoder" || e.action === "short")) TR.key = Date.now();
});
} catch (err) {
untrace = null;
}
}
main();
})();

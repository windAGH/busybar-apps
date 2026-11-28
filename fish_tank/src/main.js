// Fish Tank: a tank of pet fish on the BUSY Bar. The fish swim, get hungry in real time (also while the app is closed)
// and are fed with Start - but not too often. Turning the knob sets the lamp over the tank. OK opens the menu: the
// fish shop (three capsules a day, each with one of twelve kinds of fish - common, rare, epic - to keep or to
// release) and the status. More than eight fish crowd the tank.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (the fish, lengths of the animations, widths of the bar's letters, the arrows), then the bar
// (its API, clock, controls, drawing), then the app (what is kept, the rules, the tank and its fish, the pages of
// writing, the shop), then the start. Everything that moves smoothly is an animation file in animations/.

const D = {"app":"io.github.windagh.fish_tank","name":"Fish Tank","fish":[{"n":"GUPPY","r":0,"w":7,"h":5,"bw":17,"bh":12,"sp":3.4,"d":[0.05,0.5]},{"n":"GOLDFISH","r":0,"w":9,"h":6,"bw":21,"bh":14,"sp":2.4,"d":[0.35,0.95]},{"n":"TETRA","r":0,"w":7,"h":4,"bw":17,"bh":10,"sp":4.0,"d":[0.15,0.7]},{"n":"MOLLY","r":0,"w":8,"h":6,"bw":19,"bh":14,"sp":2.8,"d":[0.25,0.85]},{"n":"DANIO","r":0,"w":8,"h":4,"bw":20,"bh":10,"sp":4.2,"d":[0.0,0.45]},{"n":"PLATY","r":0,"w":7,"h":5,"bw":17,"bh":12,"sp":3.0,"d":[0.4,0.95]},{"n":"ANGELFISH","r":1,"w":8,"h":9,"bw":13,"bh":14,"sp":2.0,"d":[0.1,0.75]},{"n":"BETTA","r":1,"w":11,"h":7,"bw":22,"bh":14,"sp":1.9,"d":[0.05,0.6]},{"n":"PUFFER","r":1,"w":7,"h":6,"bw":17,"bh":14,"sp":1.7,"d":[0.5,1.0]},{"n":"BLUE TANG","r":1,"w":9,"h":6,"bw":21,"bh":14,"sp":3.3,"d":[0.2,0.9]},{"n":"SEAHORSE","r":2,"w":6,"h":9,"bw":10,"bh":14,"sp":1.0,"d":[0.45,1.0]},{"n":"GOLDEN KOI","r":2,"w":12,"h":5,"bw":23,"bh":10,"sp":2.5,"d":[0.3,0.95]}],"shade":{"a":[189,138,89,43,0],"b":[117,79,48,23,0],"ink":"#000614"},"ms":{"turn":833,"die":1000,"gone":1000,"stroke":83.33333333333333,"strokes":12,"tank":12000,"bubble":2350,"wash":350,"capsule":2700,"reveal":[2250,2750,4050]},"plant":[57,3],"fishAt":[12.0,8.0],"page":["#072846FF","#010712FF"],"arrow":["! XPM2\n6 3 3 1\n. c none\na c #173942\nb c #6E8F97\n..ab..\n.aabb.\naaabbb","! XPM2\n6 3 3 1\n. c none\na c #2D6A74\nb c #83BCC5\n..ab..\n.aabb.\naaabbb","! XPM2\n6 3 3 1\n. c none\na c #439BA5\nb c #98EAF3\n..ab..\n.aabb.\naaabbb"],"left":"! XPM2\n3 6 3 1\n. c none\na c #98EAF3\nb c #439BA5\n..a\n.aa\naaa\nbbb\n.bb\n..b","more":"! XPM2\n3 5 2 1\n. c none\na c #3A8996\na..\naa.\naaa\naa.\na..","turn":["! XPM2\n9 5 3 1\n. c none\na c #183E47\nb c #63868F\n..a...b..\n.aa...bb.\naaa...bbb\n.aa...bb.\n..a...b..","! XPM2\n9 5 3 1\n. c none\na c #30727C\nb c #7AB7C0\n..a...b..\n.aa...bb.\naaa...bbb\n.aa...bb.\n..a...b..","! XPM2\n9 5 3 1\n. c none\na c #48A6B1\nb c #90E8F2\n..a...b..\n.aa...bb.\naaa...bbb\n.aa...bb.\n..a...b.."],"press":"! XPM2\n5 5 3 1\n. c none\na c #90E8F2\nb c #48A6B1\naaaaa\n.aaa.\n..a..\n.....\nbbbbb","turn2":"! XPM2\n6 3 3 1\n. c none\na c #48A6B1\nb c #90E8F2\n.a..b.\naa..bb\n.a..b.","small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1,"&":4},"smallGap":1,"xl":{"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7},"bold":{"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6,"A":6,"B":6,"C":6,"D":6,"E":5,"F":5,"G":6,"H":6,"I":4,"J":5,"K":6,"L":5,"M":9,"N":7,"O":6,"P":6,"Q":6,"R":6,"S":6,"T":6,"U":6,"V":7,"W":10,"X":6,"Y":6,"Z":6,"!":2},"normal":{"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5}};
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
// ===== fish.js =====
(function () {
const HOUR = 3600000, DAY = 24 * HOUR;
const EMPTY = 48 * HOUR;            // from full to starving
const STARVE_EVERY = 12 * HOUR;     // after the first fish has starved: one more every so long
const MEAL = 0.25, FULL = 0.9, HUNGRY = 1 / 3;
const ROOM = 8, MOST = 12, DRAWS = 3;
const LIGHTS = 5, LIGHT0 = 3;       // the lamp over the tank: its steps (0 = an evening tank ... 4 = full light), and where it starts
const FAST = D.fast || 1;           // test builds: the tank's clock runs this many times as fast
const FILE = "/ext/data/" + (D.test ? "tank_test.json" : "tank.json");
const TICK = 200;                   // ms between two looks at the tank: at most five requests a second
const FLOOR = 13;                   // the row where the sand begins: fish stay above it
const AQUA = "#60DEECFF", GREY = "#8CA4BEFF", AMBER = "#FFC23CFF", RED = "#FF6E5AFF";
const RARE = ["#96C4E0FF", "#9684FFFF", "#FFCE40FF"], RARE_WORD = ["COMMON", "RARE", "EPIC"];
const TOP_Z = 2000000000;
if (D.lag) {                        // TEST build: every request is held for 80-150 ms, as on a slow bar
const real = call;
call = async (method, path, body, type) => {
await sleep(80 + Math.random() * 70);
return real(method, path, body, type);
};
}
const clock = () => (FAST === 1 ? Date.now() : D.t0 + (Date.now() - D.t0) * FAST);
const dayOf = (ms) => Math.floor((ms + zoneMs) / DAY);
const rnd = (n) => Math.floor(Math.random() * n);
const tri = (p) => {                // a slow wave between -1 and 1 without a sine (the bar is slow at those)
const q = p - Math.floor(p);
return q < 0.5 ? q * 4 - 1 : 3 - q * 4;
};
const soft = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));       // slow in, slow out
let st = null;                      // what is kept: see freshTank
let mode = "tank", backs = 0;
let bubblesOn = true;
let resetOn = null;                 // the switch "Start over" as the settings have it (null: not known)
const SPLASH_MS = 1500;             // how long the author's mark at the start plays (animations/splash.anim)
let starting = true;                // the mark is on: Back leaves, nothing else counts
let markEnd = 0, afterMark = null;  // when the mark is over; what is done at that moment (the first save)
function freshTank(at) {
const fish = [], n = D.fish0 || 2, first = rnd(6);
for (let k = 0; k < n; k++) {     // a new tank: two common fish (test builds: as many as asked for, one of each kind)
fish.push({ s: D.fish0 ? k % D.fish.length : (first + k * (1 + rnd(5))) % 6, f: D.full0 || 0.7, t: at, b: at, k: k });
}
return { v: 1, born: at, seen: at, fish: fish, draws: { d: dayOf(at), n: 0 }, over: { d: dayOf(at), n: 0 }, feeds: [],
crowd: dayOf(at), starve: 0, light: LIGHT0, rs: null, guide: !!(D.test && !D.guide) };     // (test builds: no guide, unless asked for)
}
const num = (v, lo, hi, or) => (typeof v === "number" && v >= lo && v <= hi ? v : or);
async function load() {
const at = clock();
st = null;
if (!D.fresh) {
const got = await call("GET", "storage/read?path=" + FILE);
try {
const kept = got.ok ? JSON.parse(got.text) : null;
if (kept && typeof kept === "object" && kept.fish && typeof kept.fish.length === "number") {
const fish = [];
for (let i = 0; i < kept.fish.length && fish.length < MOST; i++) {
const f = kept.fish[i];
if (!f || typeof f.s !== "number" || !D.fish[f.s]) continue;
fish.push({ s: f.s, f: num(f.f, 0, 1, 0.5), t: Math.min(at, num(f.t, 1, 1e15, at)), b: Math.min(at, num(f.b, 1, 1e15, at)), k: fish.length });
}
const seen = Math.min(at, num(kept.seen, 1, 1e15, at)), dr = kept.draws || {}, ov = kept.over || {};
st = { v: 1, born: Math.min(at, num(kept.born, 1, 1e15, at)), seen: seen, fish: fish,
draws: { d: num(dr.d, 0, 1e9, 0), n: num(dr.n, 0, 99, 0) }, over: { d: num(ov.d, 0, 1e9, 0), n: num(ov.n, 0, 99, 0) },
feeds: [], crowd: Math.min(dayOf(at), num(kept.crowd, 0, 1e9, dayOf(seen))), starve: Math.min(at, num(kept.starve, 0, 1e15, 0)) };
const feeds = kept.feeds && kept.feeds.length ? kept.feeds : [];
for (let i = 0; i < feeds.length; i++) if (typeof feeds[i] === "number") st.feeds.push(Math.min(at, feeds[i]));
st.feeds = st.feeds.slice(-8);
if (typeof kept.pend === "number" && D.fish[kept.pend] && fish.length < MOST) st.pend = kept.pend;
st.rs = typeof kept.rs === "boolean" ? kept.rs : null;
st.guide = kept.guide === true;
st.light = Math.round(num(kept.light, 0, LIGHTS - 1, LIGHT0));
}
} catch (err) {
}
}
if (!st) st = freshTank(at);
if (D.away) {                     // TEST build: as if the app had been closed for so many hours
const back = D.away * HOUR;
st.seen -= back;
st.born -= back;
st.starve = st.starve ? st.starve - back : 0;
st.crowd = dayOf(st.seen);
for (let i = 0; i < st.fish.length; i++) {
st.fish[i].t -= back;
st.fish[i].b -= back;
}
for (let i = 0; i < st.feeds.length; i++) st.feeds[i] -= back;
}
}
let saving = Promise.resolve();
function save() {
const body = JSON.stringify(st);
const write = () => call("POST", "storage/write?path=" + FILE, body, "application/octet-stream");
saving = saving.then(write, write);
return saving;
}
async function readSettings() {
const v = await loadSettings();
bubblesOn = v.bubbles !== false;
resetOn = typeof v.reset === "boolean" ? v.reset : null;
}
function resetWanted() {
if (resetOn === null || !st) return false;
if (typeof st.rs !== "boolean") {
st.rs = resetOn;
save();
return false;
}
return resetOn !== st.rs;
}
function clearAll() {
st = freshTank(clock());          // two fish, day 1, three capsules, the lamp where it starts, the guide not seen
st.rs = resetOn;
st.guide = false;
sw.length = 0;
food.length = 0;
deathDue = 0;
note.word = "";
for (let i = 0; i < st.fish.length; i++) sw.push(swimmer(st.fish[i]));
hungryNow = false;
seenAt = Date.now();
}
async function startOver() {
clearAll();
await save();
await card("STARTING OVER", "NEW TANK", AQUA, 1500);
await guide();                    // (like new: the guide again)
mode = "tank";
}
const fullness = (f, at) => Math.max(0, Math.min(1, f.f - (at - f.t) / EMPTY));
function least(at) {
let low = 1;
for (let i = 0; i < st.fish.length; i++) low = Math.min(low, fullness(st.fish[i], at));
return low;
}
function mean(at) {
let sum = 0;
for (let i = 0; i < st.fish.length; i++) sum += fullness(st.fish[i], at);
return st.fish.length ? sum / st.fish.length : 0;
}
function kill(i, why) {
const f = st.fish.splice(i, 1)[0];
return { k: f.k, s: f.s, why: why };
}
function settle(at) {
const dead = [];
for (let guard = 0; guard < 500; guard++) {
const midnight = (st.crowd + 1) * DAY - zoneMs;
let hungry = -1, zero = Infinity;
for (let i = 0; i < st.fish.length; i++) {
const z = st.fish[i].t + st.fish[i].f * EMPTY;
if (z < zero) {
zero = z;
hungry = i;
}
}
const starveAt = hungry < 0 ? Infinity : Math.max(zero, st.starve ? st.starve + STARVE_EVERY : 0);
if (midnight <= at && midnight <= starveAt) {
st.crowd++;
if (st.fish.length > ROOM) dead.push(kill(rnd(st.fish.length), "crowd"));
} else if (starveAt <= at) {
st.starve = starveAt;
dead.push(kill(hungry, "starve"));
} else {
break;
}
}
if (st.crowd < dayOf(at) - 1) st.crowd = dayOf(at) - 1;     // (a gap too long to walk through)
return dead;
}
function drawsLeft(at) {
if (st.draws.d !== dayOf(at)) st.draws = { d: dayOf(at), n: 0 };
return Math.max(st.fish.length === 0 ? 1 : 0, DRAWS - st.draws.n);
}
function pickFish() {
const roll = Math.random(), rar = D.epic ? 2 : D.rare ? 1 : roll < 0.05 ? 2 : roll < 0.3 ? 1 : 0, of = [];
for (let i = 0; i < D.fish.length; i++) if (D.fish[i].r === rar) of.push(i);
return of[rnd(of.length)];
}
function freeSlot() {
for (let k = 0; k < MOST + 4; k++) {
let used = false;
for (let i = 0; i < st.fish.length; i++) if (st.fish[i].k === k) used = true;
for (let i = 0; i < sw.length; i++) if (sw[i].k === k) used = true;        // (a dead fish that is still fading keeps its element)
if (!used) return k;
}
return 0;
}
function still(el) {
el.timeout = STILL;
return el;
}
function small(id, s, x, y, colour, align, z) {
return still(text(id, s, "small", x, y, colour, align || "top_left", z === undefined ? 4 : z));
}
function bitmap(id, data, x, y, z) {
return { id: id, type: "xpmbitmap", x: x, y: y, align: "top_left", timeout: STILL, data: data, z_index: z };
}
function film(id, name, x, y, z, loop, part) {
return { id: id, type: "animation", path: "animations/" + name + ".anim", x: x, y: y, align: "top_left", loop: loop !== false,
section: part || "default", timeout: STILL, z_index: z };
}
function grad(id, x, y, w, h, top, bottom, z, radius) {
const el = { id: id, type: "rectangle", x: x, y: y, width: w, height: h, fill: "gradient_v", fill_colors: [top, bottom], border_width: 0,
timeout: STILL, z_index: z };
if (radius) el.radius = radius;
return el;
}
function tag(els, p) {
for (let i = 0; i < els.length; i++) els[i].id = p + "_" + els[i].id;
return els;
}
const deep = () => grad("bg", 0, 0, 72, 16, D.page[0], D.page[1], 0);       // deep water: the ground of every page of writing
const mid = (s, at, font) => Math.floor(at - (textWidth(s, font || "small") - 1) / 2);
const hex2 = (v) => ("0" + Math.round(v).toString(16).toUpperCase()).slice(-2);
const faded = (colour, part) => colour.slice(0, 7) + hex2(parseInt(colour.slice(7, 9), 16) * part);
const sw = [];
let hungryNow = false;
function swimmer(fish, enter) {
const sp = D.fish[fish.s], most = FLOOR - sp.h;
const home = Math.round((sp.d[0] + (sp.d[1] - sp.d[0]) * Math.random()) * most);
const hx = 6 + 5.5 * ((fish.k * 5) % 12);         // its own stretch of the tank: the twelve places are spread evenly
const o = { k: fish.k, s: fish.s, w: sp.w, h: sp.h, most: most, home: home, hx: hx, x: enter ? 36 : Math.max(sp.w / 2 + 1, Math.min(71 - sp.w / 2, hx + Math.random() * 10 - 5)),
y: enter ? -sp.h - 1 : home, dir: Math.random() < 0.5 ? 1 : -1, v: 0, vr: 0, tx: 0, ty: home, state: "swim", until: 0, rest: 0, food: -1,
kind: "r", sx: -99, sy: -99, sk: "", was: 1 };
o.kind = o.dir > 0 ? "r" : "l";
aim(o);
return o;
}
function aim(o) {
const lo = o.w / 2 + 1, hi = 71 - o.w / 2, reach = sw.length <= 3 ? 40 : 17;
let tx = Math.random() < 0.12 ? lo + Math.random() * (hi - lo) : o.hx + (Math.random() * 2 - 1) * reach;
if (hungryNow && Math.random() < 0.65) tx = 24 + Math.random() * 24;
if (Math.abs(tx - o.x) < 6) tx += tx < o.x ? -8 : 8;
tx = Math.max(lo, Math.min(hi, tx));
o.tx = tx;
o.ty = hungryNow ? Math.random() * 3 : Math.max(0, Math.min(o.most, o.home + Math.random() * 5 - 2.5));
}
function dieNow(o, why) {
if (o.state !== "swim" && o.state !== "turn") return;
o.why = why;
o.state = "die";
o.food = -1;
o.kind = "d" + (o.kind === "l" || o.kind === "tl" ? "l" : "r");
o.x += o.kind === "dl" ? -1 : 1;                    // (see MOVED)
o.until = Date.now() + D.ms.die + 200;
}
function move(o, dt, now) {
if (o.state === "swim") {
const dx = o.tx - o.x, far = dx < 0 ? -dx : dx, chase = o.food !== -1;
if (far > 1.5 && (dx > 0) !== (o.dir > 0)) {      // the other way: it turns round in a curve, drifting on a little
o.state = "turn";
o.was = o.dir;
o.x += o.dir;                                   // (it drifts on by one: see MOVED)
o.kind = o.dir > 0 ? "tl" : "tr";
o.until = now + D.ms.turn + 80;
return;
}
if (far < 0.8) {                                  // there: it hangs in the water for a moment, then somewhere else
o.v += (0 - o.v) * Math.min(1, dt * 3);
if (!chase) {
if (!o.rest) o.rest = now + 300 + (Math.random() < 0.4 ? rnd(2600) : 0);
if (now >= o.rest) {
o.rest = 0;
aim(o);
}
}
} else {                                          // slow out, slow in
const top = D.fish[o.s].sp * (chase ? 1.7 : 1) * (0.22 + 0.78 * Math.min(1, far / 7));
o.v += (top - o.v) * Math.min(1, dt * (chase ? 3 : 1.6));
}
o.x += o.dir * o.v * dt;
} else if (o.state === "turn") {                    // (the turn is a film: the fish stays where it is meanwhile)
if (now >= o.until) {
o.dir = -o.was;
o.kind = o.dir > 0 ? "r" : "l";
o.state = "swim";
o.v = 0.4;
}
} else if (o.state === "die") {                     // it rolls over (a film)
if (now >= o.until) {
o.state = "rise";
o.kind = "x" + o.kind.charAt(1);
o.vr = 0;
}
return;
} else if (o.state === "rise") {                    // and rises slowly to the surface
o.vr = Math.min(1.5, o.vr + dt * 0.7);
o.y -= o.vr * dt * Math.min(1, 0.3 + o.y / 3);
if (o.why && o.y + o.h <= 8) {
say(o.why, RED, 3600);
o.why = "";
}
if (o.y <= 0.3) {
o.y = 0;
o.state = "float";
o.until = now + 1800;
}
return;
} else if (o.state === "float") {
if (now >= o.until) {
o.state = "fade";
o.x += 1;                                       // (see MOVED)
o.kind = "g" + o.kind.charAt(1);
o.until = now + D.ms.gone + 250;
}
return;
} else {
return;                                           // fading: the film does it
}
if (o.x < o.w / 2) o.x = o.w / 2;
if (o.x > 72 - o.w / 2) o.x = 72 - o.w / 2;
const dy = o.ty - o.y, step = dt * (o.food !== -1 ? 2.6 : 1.1);
o.y += dy > step ? step : dy < -step ? -step : dy * Math.min(1, dt * 2);
}
function fishAt(o, now) {
if (o.sk === o.kind && (o.state === "turn" || o.state === "die" || o.state === "fade")) return [o.sx, o.sy];     // (a film that must not start again)
const bob = o.state === "swim" ? 0.45 * tri(now / 2900 + o.k * 0.37) : o.state === "float" ? 0.4 * tri(now / 2000) : 0;
const sway = o.state === "rise" ? 0.6 * tri(now / 2300 + o.k * 0.2) : 0;
return [Math.round(o.x - o.w / 2 + sway), Math.round(o.y + bob)];
}
const partOf = (o, now) => (o.kind.length === 1 ? o.kind + (Math.floor(now / D.ms.stroke) % D.ms.strokes) : o.kind);
function fishWire(o, now) {
const at = fishAt(o, now);
return '{"id":"t_f' + o.k + '","type":"animation","path":"animations/f' + o.s + '.anim","x":' + at[0] + ',"y":' + at[1] +
',"align":"top_left","loop":true,"section":"' + partOf(o, now) +
'","timeout":' + STILL + ',"z_index":' + (o.kind.length === 1 || o.kind.charAt(0) === "t" ? 10 + o.k : 41) + "}";
}
const food = [];
let greedy = true, deathDue = 0;
function dropFood(eat) {
const now = Date.now();
greedy = eat;
for (let k = 0; k < 4; k++) {
const x0 = 33 + k * 2 + Math.random();
food.push({ id: "t_p" + k, x0: x0, x: x0, y: -3, at: now + k * 170, k: k, sent: "", state: "sink", until: 0 });
}
let n = 0;
for (let i = 0; i < sw.length; i++) {
if (eat && sw[i].state !== "die" && sw[i].state !== "rise" && sw[i].state !== "float" && sw[i].state !== "fade") {
sw[i].food = food[food.length - 4 + (n++ % 4)].id;
sw[i].rest = 0;
}
}
}
function pelletOf(id) {
for (let i = 0; i < food.length; i++) if (food[i].id === id && food[i].state !== "melt") return food[i];
return null;
}
function moveFood(p, dt, now) {
const age = (now - p.at) / 1000;
if (age < 0 || p.state === "melt") return;
if (p.state === "sink") {
p.y += (2.1 + 4 * Math.max(0, 1 - age * 1.4)) * dt;             // in fast, then the water slows it
p.x = p.x0 + 0.9 * tri(age / 1.7 + p.k * 0.27) * Math.min(1, age) + (p.k - 1.5) * Math.min(4, age) * 0.9;
if (p.y >= FLOOR - 2.4) {
p.y = FLOOR - 2.4;
p.state = "lie";
p.until = now + (greedy ? 9000 : 2600);
}
} else if (now >= p.until) {                         // nobody wanted it: it dissolves
p.state = "melt";
p.until = now + 700;
}
}
function foodWire(p) {
const melts = p.state === "melt";              // (dissolving: a row higher - in that part of the film it stands a row lower; see MOVED)
return '{"id":"' + p.id + '","type":"animation","path":"animations/pellet.anim","x":' + Math.round(p.x - 1.5) + ',"y":' + (Math.round(p.y) - (melts ? 1 : 0)) +
',"align":"top_left","loop":true,"section":"' + (melts ? "m" : "p") + '","timeout":' + STILL + ',"z_index":32}';
}
const pelletAway = (k) => film("t_p" + k, "pellet", OFF, 0, 32, true, "p");
let glintUsed = 0;
let lampSave = 0, glintAt = 0, plopAt = 0;      // (glintAt, plopAt: 0 or 1 - where those films stand, see MOVED)
function shades(level) {            // level: a step, or anything between two steps
const n = Math.min(LIGHTS - 2, Math.floor(level)), part = level - n;
const dark = (which, k) => D.shade.ink + hex2(Math.min(240, (D.shade[which][n] + (D.shade[which][n + 1] - D.shade[which][n]) * part) * k));
return [grad("t_sa", 0, 0, 72, 16, dark("a", 1.12), dark("a", 0.92), 1), grad("t_sb", 0, 0, 72, 16, dark("b", 1), dark("b", 1), 35)];
}
async function lamp(by) {
const from = st.light, to = Math.max(0, Math.min(LIGHTS - 1, from + by));
for (let n = 1; n <= 3; n++) {
const parts = [];
if (to !== from) {
const els = shades(from + (to - from) * soft(n / 3));
put(parts, els[0]);
put(parts, els[1]);
}
if (n === 1 && by > 0) {                          // (also at full light: the lamp answers)
glintAt = 1 - glintAt;
glintUsed = Date.now();
put(parts, film("t_gl", "glint", -glintAt, 0, 36, false));
}
if (parts.length) await post(parts);
if (to === from) break;
if (n < 3) await sleep(45);
}
if (to !== from) {
st.light = to;
lampSave = Date.now() + 2500;                     // (kept: written once the knob has come to rest)
}
}
function helpers(idle) {
const els = [];
for (let k = 0; k < 4; k++) if (!idle || !food.some((p) => p.id === "t_p" + k)) els.push(pelletAway(k));
if (!idle || !food.length) els.push(film("t_pp", "plop", OFF, 0, 33, false));
if (!idle || !bubbleEnd) els.push(film("t_bb", "bubble", OFF, 0, 2, false));
const lamps = shades(st.light);                     // the lamp: shade under the fish, shade over them; the surface's glint
els.push(lamps[0], lamps[1]);
if (!idle || Date.now() - glintUsed > 1500) els.push(film("t_gl", "glint", OFF, 0, 36, false));
return els;
}
function hunt(o, gone) {
let p = pelletOf(o.food);
if (!p || p.state === "melt") {                     // eaten by another: the nearest one that is left
let best = 999;
p = null;
for (let i = 0; i < food.length; i++) {
const d = Math.abs(food[i].x - o.x);
if (food[i].state !== "melt" && Date.now() >= food[i].at && d < best) {
best = d;
p = food[i];
}
}
if (!p) {
o.food = -1;
aim(o);
return;
}
o.food = p.id;
}
const side = p.x >= o.x ? 1 : -1, reach = o.w / 2 - 0.5;
o.tx = p.x - side * reach;
o.ty = Math.max(-1, Math.min(o.most + 1, p.y + 1.5 - o.h / 2));
if (Math.abs(o.x + o.dir * reach - p.x) < 1.7 && Math.abs(o.y + o.h / 2 - p.y - 1.5) < Math.max(1.9, o.h / 2 - 1) && o.state === "swim") {
gone.push(p.id);
food.splice(food.indexOf(p), 1);
o.food = -2;                                      // (looks for the next one at its next step)
}
}
function put(parts, el) {
const s = JSON.stringify(el);
parts.push(s);
live.set(el.id, { s: s, t: Date.now(), el: el });
}
const note = { word: "", colour: AMBER, from: 0, until: 0, level: 0, shown: "" };
function say(word, colour, ms, wait) {
if (hint.level) wait = (wait || 0) + 700;       // (the sign of an empty tank gives way first: it fades, then the words come)
note.word = word;
note.colour = colour || AMBER;
note.from = Date.now() + (wait || 0);
note.until = note.from + (ms || 2600);
}
function noteParts(now, parts, gone) {
let level = 0;
if (note.word && now >= note.from && now < note.until) level = Math.max(1, Math.min(4, Math.floor((now - note.from) / 190) + 1, Math.floor((note.until - now) / 190) + 1));
if (level === note.level && note.word === note.shown) return;
const was = note.level;
note.level = level;
note.shown = note.word;
if (!level) {
if (now >= note.until) note.word = "";
note.shown = note.word;
if (was) gone.push("t_ns", "t_nu", "t_nt");
return;
}
const shade = "#000814" + hex2(204 * level / 4);       // the shade rises from the sand: no edge, and dark where the words are
put(parts, grad("t_ns", 0, 3, 72, 5, "#00081400", shade, 40));
put(parts, grad("t_nu", 0, 8, 72, 8, shade, shade, 40));
put(parts, small("t_nt", note.word, mid(note.word, 35.5), 7, faded(note.colour, level / 4), "top_left", 42));
}
const hint = { level: 0 };
const HINT_IDS = ["t_h0", "t_h3", "t_h4", "t_h5"];
function hintParts(now, parts, gone) {
const lasting = st.fish.length === 0 && sw.length === 0;
const want = lasting && !(note.word && now < note.until + 300) ? 3 : 0;     // (it makes room while other words are on)
const was = hint.level, level = was < want ? was + 1 : was > want ? was - 1 : was;     // it fades: a step at a time
if (level === was) return;
hint.level = level;
if (!level) {
for (let i = 0; i < HINT_IDS.length; i++) if (live.has(HINT_IDS[i])) gone.push(HINT_IDS[i]);
return;
}
const shade = "#000814" + hex2(168 * level / 3);       // a shade from the surface down, dark where the words are
put(parts, grad("t_h0", 0, 0, 72, 10, shade, shade, 40));
put(parts, grad("t_h5", 0, 10, 72, 4, shade, "#00081400", 40));
put(parts, bitmap("t_h3", D.arrow[level - 1], 59, 1, 41));
put(parts, small("t_h4", "OK: SHOP", 71 - smallWidth("OK: SHOP"), 3, faded(WHITE, level / 3), "top_left", 41));
}
function tankEls(now) {
const els = [film("t_bg", "tank", 0, 0, 0), film("t_pl", "plant", D.plant[0], D.plant[1], 30)];
if (now === undefined) return els.concat(helpers(true));
for (let i = 0; i < sw.length; i++) {               // the fish are in their places when the water has passed
const o = sw[i], at = fishAt(o, now), swims = o.kind.length === 1;
if (o.state === "out") continue;
els.push(film("t_f" + o.k, "f" + o.s, at[0], at[1], swims || o.kind.charAt(0) === "t" ? 10 + o.k : 41, true, partOf(o, now)));
}
return els.concat(helpers(false));
}
let lastAt = 0, keepAt = 0, checkAt = 0, seenAt = 0, bubbleAt = 0, bubbleEnd = 0, turnAt = 0;
async function tank() {
let now = Date.now();
if (onPage !== "tank") {
for (let i = 0; i < sw.length; i++) {
const o = sw[i];
if (o.state === "turn") o.until = now + D.ms.turn + 80;       // (a film that was running starts again with the page)
if (o.state === "die") o.until = now + D.ms.die + 200;
if (o.state === "fade") o.state = "out";
o.sk = "";
const at = fishAt(o, now);
o.sx = at[0];
o.sy = at[1];
o.sk = o.kind;
}
for (let i = sw.length - 1; i >= 0; i--) if (sw[i].state === "out") sw.splice(i, 1);
await draw("tank", tankEls(now));
if (stopped) return;
now = Date.now();
food.length = 0;                                  // (food that was in the water when the page was left is gone)
for (let i = 0; i < sw.length; i++) if (sw[i].food !== -1) sw[i].food = -2;
note.level = hint.level = 0;
note.shown = "";
lastAt = now;
if (!reused) keepAt = pageAt;                     // (films that were not sent again are as old as they were)
bubbleEnd = 0;
bubbleAt = now + 2500 + rnd(4000);
}
const dt = Math.min(0.5, (now - lastAt) / 1000), parts = [], gone = [];
lastAt = now;
noteParts(now, parts, gone);
hintParts(now, parts, gone);
for (let i = food.length - 1; i >= 0; i--) {
const p = food[i];
moveFood(p, dt, now);
if (p.state === "melt" && now >= p.until) {
gone.push(p.id);
food.splice(i, 1);
continue;
}
if (now < p.at) continue;
const s = foodWire(p);
if (s !== p.sent) {
p.sent = s;
parts.push(s);
live.set(p.id, { s: s, t: now, el: { id: p.id } });
}
}
if (deathDue && (now >= deathDue || (food.length === 0 && now >= deathDue - 5000))) {    // the feeding too many: when the food is gone
deathDue = 0;
if (st.fish.length) {
const dead = kill(rnd(st.fish.length), "over");
for (let i = 0; i < sw.length; i++) if (sw[i].k === dead.k) dieNow(sw[i], "ATE TOO MUCH");
save();
}
}
turnAt = (turnAt + 1) % 64;
for (let n = 0; n < sw.length; n++) {               // (the fish take turns at being first: with twelve, not all fit one request)
const o = sw[(n + turnAt) % sw.length];
if (o.food !== -1 && (o.state === "swim" || o.state === "turn")) hunt(o, gone);
move(o, dt, now);
if (o.state === "fade" && now >= o.until) {
gone.push("t_f" + o.k);
o.state = "out";
continue;
}
const at = fishAt(o, now);
if ((at[0] !== o.sx || at[1] !== o.sy || o.kind !== o.sk) && parts.length < 8) {
const s = fishWire(o, now);
o.sx = at[0];
o.sy = at[1];
o.sk = o.kind;
parts.push(s);
live.set("t_f" + o.k, { s: s, t: now, el: { id: "t_f" + o.k } });
}
}
for (let i = sw.length - 1; i >= 0; i--) if (sw[i].state === "out") sw.splice(i, 1);
for (let i = gone.length - 1; i >= 0; i--) {        // (a pellet that is eaten or dissolved is not deleted: it goes back off-screen)
if (/^t_p\d$/.test(gone[i])) {
put(parts, pelletAway(Number(gone[i].charAt(3))));
gone.splice(i, 1);
}
}
if (bubblesOn && !bubbleEnd && now >= bubbleAt && parts.length < 8) {       // bubbles leave the sand now and then
put(parts, film("t_bb", "bubble", 16 + rnd(38), 0, 2, false));        // (the element is there: it is moved in, and its film starts)
bubbleEnd = now + D.ms.bubble + 300;
} else if (bubbleEnd && now >= bubbleEnd) {         // (its film has ended on nothing; it stays where it is until the next time)
bubbleEnd = 0;
bubbleAt = now + 5000 + rnd(9000);
}
if (now - keepAt >= 9 * D.ms.tank - 150 && parts.length < 7) {     // the films of the tank are said again before the bar forgets them: when both loops are at their start
keepAt = now;
const els = tankEls();
for (let i = 0; i < els.length; i++) {
const s = wire(els[i]);
parts.push(s);
live.set(els[i].id, { s: s, t: now, el: els[i] });
}
}
if (parts.length) await postAll(parts, 8);        // (one request; two when words come on at the same moment as much else)
if (gone.length) await drop(gone);
if (now >= checkAt) {                               // has a fish starved, has midnight passed?
checkAt = now + (FAST > 1 ? 1000 : 5000);
const at = clock(), dead = settle(at);
hungryNow = st.fish.length > 0 && least(at) < HUNGRY;
for (let d = 0; d < dead.length; d++) {
for (let i = 0; i < sw.length; i++) if (sw[i].k === dead[d].k) dieNow(sw[i], dead[d].why === "crowd" ? "TOO CROWDED" : "A FISH STARVED");
}
if (lampSave && now >= lampSave) {
lampSave = 0;
save();
}
if (dead.length || now - seenAt > 1800000) {      // (and every half hour: when the app was last alive)
seenAt = now;
st.seen = at;
save();
}
}
await nap(TICK - (Date.now() - now));
const k = keys();
if (k.back) {                                       // Back: the tank is kept, the app ends
st.seen = clock();
await save();
stopped = true;
setTimeout(unbind, 10);
return;
}
if (k.start) feed();
if (k.turn) await lamp(k.turn);
if (k.ok) mode = "menu";
}
let settingsAt = 0;
function feed() {
const at = clock(), now = Date.now();
if (food.length || deathDue) return;                // (there is still food in the water)
if (!st.fish.length) {
say("NO FISH TO FEED", GREY, 2200);
return;
}
plopAt = 1 - plopAt;
const s = JSON.stringify(film("t_pp", "plop", 28 - plopAt, 0, 33, false));      // (the ripple exists: it is moved, and plays)
live.set("t_pp", { s: s, t: now, el: { id: "t_pp" } });
post([s]);
st.feeds.push(at);
st.feeds = st.feeds.slice(-8);
if (least(at) >= FULL) {
if (st.over.d !== dayOf(at)) st.over = { d: dayOf(at), n: 0 };
st.over.n++;
if (st.over.n === 1) {
dropFood(false);
say("THEY ARE FULL", AMBER, 3000);
} else {
dropFood(true);
deathDue = now + 9000;
}
} else {
for (let i = 0; i < st.fish.length; i++) {
const f = st.fish[i];
f.f = Math.min(1, fullness(f, at) + MEAL);
f.t = at;
}
st.starve = 0;
hungryNow = least(at) < HUNGRY;
dropFood(true);
}
st.seen = at;
save();
}
function ago(ms) {
const h = ms / HOUR;
return h < 1 ? Math.floor(ms / 60000) + "M" : h < 48 ? Math.floor(h) + "H" : Math.floor(h / 24) + "D";
}
const MENU = 2;
let menuPage = 0, menuFade = 0, menuAt = 0, menuBar = 1;
function menuEls() {
const at = clock(), left = drawsLeft(at), n = st.fish.length, x0 = menuPage === 0 ? 0 : OFF, x1 = menuPage === 1 ? 0 : OFF;
const hint = Math.max(0, 3 - menuFade), open = left > 0 ? Math.max(0, menuFade - 3) : 0;
let dots = "";
for (let k = 0; k < MENU; k++) dots += (k ? ".." : "") + (k === menuPage ? "aa" : "bb");
const els = [deep(), bitmap("dots", "! XPM2\n" + dots.length + " 1 3 1\n. c none\na c #60DEEC\nb c #2C4C68\n" + dots, 36 - (dots.length >> 1), 15, 4)];
els.push(film("eg", "egg", left > 0 ? x0 : OFF, 1, 1), film("eo", "egg_off", left > 0 ? OFF : x0, 1, 1, false),
small("t1", "FISH SHOP", 17 + x0, 0, WHITE), small("t2", left + " LEFT", 17 + x0, 7, left > 0 ? AQUA : GREY),
small("ok", "OK", mid("OK", 61.5) + (open ? x0 : OFF), 0, faded(AQUA, Math.max(1, open) / 3)),
small("go", "OPEN", mid("OPEN", 61.5) + (open ? x0 : OFF), 7, faded(WHITE, Math.max(1, open) / 3)),
bitmap("hl", D.turn[Math.max(1, hint) - 1], 57 + (hint ? x0 : OFF), 3, 4),
small("ht", "TURN", mid("TURN", 61.5) + (hint ? x0 : OFF), 7, faded(AQUA, Math.max(1, hint) / 3)));
const level = mean(at), last = st.feeds.length ? at - st.feeds[st.feeds.length - 1] : -1;
const fed = last < 0 ? "NOT FED YET" : last < 60000 ? "JUST FED" : "FED " + ago(last) + " AGO";
const tone = level < 0.12 ? ["#FF8E7AFF", "#C8382CFF"] : level < HUNGRY ? ["#FFDC78FF", "#E0961EFF"] : ["#A6F2FAFF", "#28A8C8FF"];
const day = "DAY " + (dayOf(at) - dayOf(st.born) + 1), w = Math.round(20 * level * menuBar);
els.push(small("n", n === 1 ? "1 FISH" : n + " FISH", 2 + x1, 0, WHITE), small("d", day, 70 - smallWidth(day) + x1, 0, GREY),
small("f", n ? fed : "SEE THE SHOP", 2 + x1, 7, GREY),
grad("b0", 50 + (n ? x1 : OFF), 10, 20, 3, "#0A2238FF", "#143452FF", 1, 1),
grad("b1", 50 + (n && w >= 1 ? x1 : OFF), 10, Math.max(1, w), 3, tone[0], tone[1], 2, 1));
return raise(tag(els, "m"));
}
async function sync(els) {
const out = [], come = [], now = Date.now();
for (let i = 0; i < els.length; i++) {
const s = wire(els[i]), rec = live.get(els[i].id);
if (rec && rec.s === s && now - rec.t < 400 * els[i].timeout) continue;
(els[i].x >= OFF - 80 ? out : come).push(s);
live.set(els[i].id, { s: s, t: now, el: els[i] });
}
if (out.length + come.length <= 8) {
if (out.length + come.length) await post(out.concat(come));
return;
}
if (out.length) await postAll(out, 8);
if (come.length) await postAll(come, 8);
}
async function menu() {
if (onPage !== "menu") {
menuPage = 0;
menuFade = 0;
menuBar = 1;
await draw("menu", menuEls());
menuAt = Date.now();
} else {
await sync(menuEls());
}
const fading = menuFade < 6 && (menuFade > 0 || Date.now() - menuAt >= 2200);
await nap(fading ? 110 : menuFade === 0 ? Math.max(40, 2200 - (Date.now() - menuAt)) : FAST > 1 ? 1000 : 5000);
const k = keys();
if (k.back) {
wentBack = true;
mode = "tank";
} else if (k.turn) {                                // the other page; the hint has done its work
menuFade = 6;
menuPage = (menuPage + (k.turn > 0 ? 1 : MENU - 1)) % MENU;
if (menuPage === 1) {                             // the status: its tube fills up
menuBar = 0;
for (let n = 1; n <= 5; n++) {
await sync(menuEls());
menuBar = soft(n / 5);
await sleep(n === 1 ? 0 : 45);
}
}
} else if ((k.ok || k.start) && menuPage === 0) {
if (drawsLeft(clock()) < 1) await card("COME BACK", "TOMORROW", GREY, 1500);
else if (st.fish.length >= MOST) await card("TANK IS FULL", "NO ROOM", AMBER, 2000);
else if (st.fish.length >= ROOM) {
pick = 0;
mode = "full";
} else await openCapsule();
} else if (fading) {
menuFade++;
}
}
function choiceEls(p, title, colour, one, two, part) {
const w1 = smallWidth(one) + 6, w2 = smallWidth(two) + 6, x1 = (72 - (w1 + w2 + 4)) >> 1, x2 = x1 + w1 + 4;
const x = Math.round(x1 + (x2 - x1) * part), w = Math.round(w1 + (w2 - w1) * part);
return tag([deep(), small("q", title, mid(title, 35.5), -1, colour), grad("pl", x, 8, w, 7, "#1A7896FF", "#06344EFF", 1, 2),
small("a", one, x1 + 3, 7, part < 0.5 ? WHITE : GREY), small("b", two, x2 + 3, 7, part < 0.5 ? GREY : WHITE)], p);
}
async function choose(p, title, colour, one, two, to) {
for (let n = 1; n <= 4; n++) {                      // the plate glides: slow out, slow in
const part = soft(n / 4);
await show(raise(choiceEls(p, title, colour, one, two, to ? part : 1 - part)));
await sleep(35);
}
}
function revealEls(i) {
const sp = D.fish[i];
return tag([deep(), film("ha" + sp.r, "halo_" + sp.r, 0, 0, 1, false), film("fi" + i, "f" + i + "_big", Math.round(D.fishAt[0] - sp.bw / 2), Math.round(D.fishAt[1] - sp.bh / 2), 2),
small("nm", sp.n, 27, 0, WHITE), small("ra", RARE_WORD[sp.r], 27, 7, RARE[sp.r])], "r");
}
const PAGES = 5;
function guideEls(page) {
const at = (n) => (n === page ? 0 : OFF), mids = (word, font) => mid(word, 35.5, font), right = (word) => 65 - smallWidth(word);
const big = (id, word, x, y, colour) => still(text(id, word, "bold", x, y, colour, "top_left", 4));
const els = [film("bg", "guide", 0, 0, 0, false), small("n", (page + 1) + "/" + PAGES, 2, -1, "#46A8BCFF"), bitmap("nx", D.more, 67, 10, 4)];
els.push(bitmap("1a", D.arrow[2], 33 + at(0), 0, 4), big("1w", "FEED", mids("FEED", "bold") + at(0), 4, WHITE));
els.push(bitmap("2a", D.arrow[2], 59 + at(1), 0, 4),
bitmap("2t", D.turn2, right("LIGHT") - 9 + at(1), 5, 4), small("2x", "LIGHT", right("LIGHT") + at(1), 2, WHITE),
bitmap("2p", D.press, right("SHOP") - 8 + at(1), 10, 4), small("2y", "SHOP", right("SHOP") + at(1), 8, WHITE));
els.push(small("3x", "FEED DAILY", mids("FEED DAILY") + at(2), 2, WHITE), small("3y", "NOT TOO MUCH", mids("NOT TOO MUCH") + at(2), 8, AMBER));
els.push(bitmap("4a", D.left, 2 + at(3), 7, 4), big("4w", "EXIT", 9 + at(3), 4, WHITE));
els.push(big("5w", "ENJOY!", mids("ENJOY!", "bold") + at(4), 0, AQUA), small("5x", "PRESS ANY KEY", mids("PRESS ANY KEY") + at(4), 8, WHITE));
return raise(tag(els, "g"));
}
async function guide() {
let page = 0, sentAt = Date.now();
await draw("guide", guideEls(0));                   // (at a start: under the author's mark)
if (stopped) return;
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
while (!stopped) {
await nap(90000 - (Date.now() - sentAt));
const fwd = (ctl.turn > 0 ? ctl.turn : 0) + (ctl.ok ? 1 : 0) + (ctl.start ? 1 : 0), back = (ctl.turn < 0 ? -ctl.turn : 0) + backs;
const backs0 = backs > 0;                         // (the Back key itself, not a turn backward)
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
if (!fwd && !back) {                              // nobody there: the pages are said again before the bar forgets them
if (Date.now() - sentAt >= 89000) {
sentAt = Date.now();
await sync(guideEls(page));                   // (older than 48 s: all of it is sent again)
await parkWash();
}
continue;
}
if (page === PAGES - 1) break;                    // the last page: any control enters the app - and does nothing else
if (back > fwd && page === 0) {                   // Back on the first page leaves the app
if (backs0) {
stopped = true;
setTimeout(unbind, 10);
return;
}
continue;
}
const to = Math.max(0, Math.min(PAGES - 1, page + fwd - back));
if (to !== page) {
page = to;
await sync(guideEls(page));
}
}
wentBack = false;
if (!stopped) {                                     // it has been seen: never again by itself
st.guide = true;
await save();
}
}
function cardEls(top, word, colour) {
const big = textWidth(word, "bold") <= 66;
const els = [deep(), small("c1", top, mid(top, 35.5), big ? -1 : 0, GREY)];
if (big) els.push(still(text("c2", word, "bold", mid(word, 35.5, "bold"), 6, colour, "top_left", 3)));
else els.push(small("c3", word, mid(word, 35.5), 7, colour));
return tag(els, "c");
}
async function card(top, word, colour, ms) {
await draw("card " + top + word, cardEls(top, word, colour));
if (stopped) return;
await post([over("zz_sh", "sheen", TOP_Z)]);
await nap(ms || 2600);
await wipe(["zz_sh"]);
keys();
}
function keys() {
const k = { turn: ctl.turn, ok: ctl.ok, start: ctl.start, back: backs > 0 };
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
if (k.back) wentBack = true;
return k;
}
onBack = () => {                    // Back is ours on every page: on the tank it saves and ends the app
if (starting) return false;       // (during the author's mark: it simply ends the app; nothing has been changed yet)
backs++;
return true;
};
let onPage = "", wentBack = false, pageAt = 0;       // (pageAt: when the page's elements were sent - its films began then)
const WASH = ["wash_up_in", "wash_up_out", "wash_dn_in", "wash_dn_out"];
let washAt = 0;
function washWire(name, x) {
return '{"id":"zz_' + name + '","type":"animation","path":"animations/' + name + '.anim","x":' + x + ',"y":0,"align":"top_left","loop":false,' +
'"section":"default","timeout":' + STILL + ',"z_index":' + (name.slice(-2) === "in" ? 2147481000 : 2147481001) + "}";
}
function parkWash() {
washAt = Date.now();
return post(WASH.map((name) => washWire(name, OFF)));
}
const KEPT = /^t_(bg|pl|f\d+|p\d|pp|bb|sa|sb|gl)$/;
let under = null, underUntil = 0, reused = false;
function raise(els) {
for (let i = 0; i < els.length; i++) {
if (!els[i]._up) {
els[i].z_index += 100;
els[i]._up = true;
}
}
return els;
}
async function draw(key, els) {
if (key !== "tank") raise(els);
if (key === onPage || onPage === "") {
onPage = key;
pageAt = Date.now();
await show(els);
if (starting) {                 // the first page was put together under the author's mark; when the mark is over
await sleep(markEnd - Date.now());            // (it ends on black) it is taken away, and the page is there
if (stopped) return;          // (Back during the mark: the app ends, nothing was written)
starting = false;
await wipe(["zz_sp"]);
keys();                       // (what was pressed meanwhile does not count)
if (afterMark) afterMark();
afterMark = null;
}
return;
}
const way = wentBack ? "wash_dn" : "wash_up", was = onPage;
wentBack = false;
onPage = key;
busy = true;
try {
await post([washWire(way + "_in", 0)]);                            // at once: the press is answered
const t0 = Date.now(), olds = [], mine = {};
let send = els;
for (let i = 0; i < els.length; i++) mine[els[i].id] = 1;
if (was === "tank") {                             // the tank is left: it stays, under the page that comes
under = new Map();
underUntil = Date.now() + 100000;
for (const [id, rec] of live) {
if (!KEPT.test(id)) continue;
under.set(id, rec);
underUntil = Math.min(underUntil, rec.t + 100000);
}
}
for (const id of live.keys()) if (!mine[id] && !(under && under.has(id))) olds.push(id);
reused = false;
let kept = null;
if (key === "tank" && under) {                    // back to the tank: what is still there as it was is not sent again
if (Date.now() + 2000 < underUntil) {
send = els.filter((el) => !under.has(el.id) || under.get(el.id).s !== wire(el));
reused = true;
kept = under;
}
for (const id of under.keys()) if (!mine[id]) olds.push(id);
under = null;
}
await sleep(D.ms.wash + 40 - (Date.now() - t0));                   // (the water has to cover the old page first: fish are still moving on it)
if (!reused) pageAt = Date.now();
const sent = await postAll(send.map((el) => wire(el)));             // the whole page in a few requests, behind the water
await drop(olds);
if (sent) remember(els);
else await show(els, true);
if (kept) {                                       // (what was not sent again is as old as it was)
const fresh = {};
for (let i = 0; i < send.length; i++) fresh[send[i].id] = 1;
for (const [id, rec] of kept) if (!fresh[id] && live.has(id)) live.get(id).t = rec.t;
}
await post([washWire(way + "_out", 0), washWire(way + "_in", OFF)]);
await sleep(D.ms.wash + 60);
await post([washWire(way + "_out", OFF)]);
} finally {
busy = false;
ctl.ok = ctl.start = false;                  // a second press while the page was changing is not a press on the new page
ctl.turn = 0;
}
}
async function wipe(ids) {
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
}
function over(id, name, z) {
return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":0,"y":0,"align":"top_left","loop":false,' +
'"section":"default","timeout":30,"z_index":' + z + "}";
}
async function putUnder(key, els) {
const olds = [], mine = {};
raise(els);
for (let i = 0; i < els.length; i++) mine[els[i].id] = 1;
for (const id of live.keys()) if (!mine[id]) olds.push(id);
const sent = await postAll(els.map((el) => wire(el)));
await drop(olds);
if (sent) remember(els);
else await show(els, true);
onPage = key;
}
let got = 0, pick = 0;              // the fish that came out of the capsule; which answer is in turn
async function openCapsule() {
const at = clock();
drawsLeft(at);
st.draws.n++;                     // the draw is used, whatever becomes of the fish
st.seen = at;
got = pickFish();
st.pend = got;                    // (kept until it is decided: an app that is closed meanwhile asks again at its next start)
save();
const rar = D.fish[got].r;
await draw("deep", tag([deep()], "e"));
busy = true;
try {
await post([over("zz_cp", "capsule", TOP_Z)]);
await sleep(D.ms.capsule + 150);
await putUnder("reveal", revealEls(got));
await post([over("zz_rv", "reveal_" + rar, TOP_Z + 1)]);
await sleep(300);
await wipe(["zz_cp"]);
await sleep(D.ms.reveal[rar] - 200);
await wipe(["zz_rv"]);
} finally {
busy = false;
}
keys();
await nap(1500);
keys();
pick = 0;
mode = "keep";
}
async function step() {
if (Date.now() - settingsAt > 5000) {             // (one small request: has "Start over" been switched on?)
settingsAt = Date.now();
await readSettings();
if (resetWanted()) return startOver();
}
if (Date.now() - washAt > 90000) await parkWash();   // (said again before the bar forgets them)
if (mode === "tank") return tank();
if (mode === "menu") return menu();
if (mode === "full") {                              // eight fish or more: one would die every night
await draw("full", choiceEls("u", "TANK IS FULL", AMBER, "BACK", "DRAW", pick));
await nap(5000);
const k = keys();
if (k.turn) {
pick = 1 - pick;
await choose("u", "TANK IS FULL", AMBER, "BACK", "DRAW", pick);
} else if (k.back || ((k.ok || k.start) && pick === 0)) {
wentBack = true;
mode = "menu";
} else if (k.ok || k.start) await openCapsule();
return;
}
if (mode === "keep") {
const sp = D.fish[got];
await draw("keep", choiceEls("k", sp.n, RARE[sp.r], "KEEP", "RELEASE", pick));
await nap(5000);
const k = keys();
if (k.turn) {
pick = 1 - pick;
await choose("k", sp.n, RARE[sp.r], "KEEP", "RELEASE", pick);
} else if (k.back || ((k.ok || k.start) && pick === 0)) {    // it joins the tank: in from above, under Start
const at = clock(), f = { s: got, f: 0.7, t: at, b: at, k: freeSlot() };
delete st.pend;
st.fish.push(f);
sw.push(swimmer(f, true));
st.seen = at;
save();
wentBack = true;
mode = "tank";
} else if (k.ok || k.start) {
delete st.pend;
save();
await card(sp.n, "RELEASED", GREY, 1500);
wentBack = true;
mode = "menu";
}
}
}
function awayLine(ms) {
const h = Math.floor(ms / HOUR), d = Math.floor(h / 24);
return d >= 2 ? "AWAY " + d + " DAYS" : d === 1 ? "AWAY 1 DAY" : h >= 2 ? "AWAY " + h + " HOURS" : h === 1 ? "AWAY 1 HOUR" : "";
}
async function main() {
const began = Date.now();
await post([over("zz_sp", "splash", TOP_Z + 10)]);
const parked = parkWash();                        // (the films of the page change: made now, where a slow first use is not seen)
await syncTime();
await readSettings();
settingsAt = Date.now();
await load();
if (resetWanted()) clearAll();                    // "Start over" was flipped while the app was closed
const at = clock(), away = at - st.seen, dead = settle(at);
if (!sw.length) for (let i = 0; i < st.fish.length; i++) sw.push(swimmer(st.fish[i]));
hungryNow = st.fish.length > 0 && least(at) < HUNGRY;
await parked;
if (stopped) return;                              // (Back during the mark: nothing was written)
markEnd = began + SPLASH_MS + 40;                 // the first page is drawn now, under the mark, and shown when the mark is over
afterMark = () => {
st.seen = at;
seenAt = Date.now();
save();
dataLoop();
};
if (!st.guide) await guide();                     // the first time (and after "Start over"): the book of the controls
if (stopped) return;
if (dead.length) {
let starved = 0;
for (let i = 0; i < dead.length; i++) if (dead[i].why === "starve") starved++;
const n = dead.length, word = starved === n ? n + " FISH STARVED" : starved === 0 ? n + " LOST: CROWDED" : n + " FISH DIED";
await card(awayLine(away) || "WHILE AWAY", word, RED, 3200);
} else if (hungryNow) {
await card(awayLine(away) || "YOUR FISH ARE", "HUNGRY!", AMBER, 2600);
}
if (typeof st.pend === "number") {              // a fish from a capsule was still waiting for its answer
got = st.pend;
pick = 0;
mode = "keep";
}
while (!stopped) {
try {
await step();
} catch (err) {
report("fish", err);
await sleep(500);
}
}
}
main();
})();

// Vinyl: what you are listening to, as a record player on the BUSY Bar. A record turns while the music plays, the
// arm comes down on it and lifts again; beside it the lyrics in two rows, karaoke style, over a thin line that shows
// how far the song is. A video becomes a film projector. Start plays and pauses, turning the knob is the volume.
// What is playing comes from Vinyl for Mac, a small program on the listener's Mac (helper/vinyl_helper.py: it writes
// now.json into the app's storage while the bar is on its cable, and answers the app over Wi-Fi after that), or from
// the listener's own Spotify keys in the app's settings; the words come from lrclib.net. See SETUP.md.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (the twelve records' colours, lengths of the films, widths of the bar's letters), then the bar
// (its API, controls, drawing: shared with the author's other apps, not all of it is used here), then the app:
// texts and how they are cut to the rows, drawing, the pages of words, the two sources (helper, Spotify), the
// words and their store, the karaoke rows, the line of the song's time, the volume, the ribbon of waves, the signs of
// the connection, the guide to the controls (a book of pages the listener turns), the main screen, the set-up notes,
// the turntable and the projector, the controls, the settings and "Start over", the start (the author's mark first).

const D = {"app":"io.github.windagh.vinyl","name":"Vinyl","setup":4,"recs":[["#FF7064FF"],["#FFC648FF"],["#7ABCFFFF"],["#78E8BEFF"],["#FF6870FF"],["#7CA4FFFF"],["#FFBE54FF"],["#CC9CFFFF"],["#FF7C80FF"],["#60E2D6FF"],["#96D6FFFF"],["#9CE878FF"]],"ms":{"up":2600,"down":2250,"in":500,"out":650,"armIn":2700,"armOut":2100,"armInQ":900,"armOutQ":750,"reel":3000,"veilIn":400,"veilOut":650,"dimIn":150,"dimOut":250,"splash":1500},"arms":5,"guide":{"pages":5,"next":[52,0],"setup":4,"setupNext":[69,0],"code":[84,8]},"waves":["gentle","flowing","lively"],"words":{"setup":[["GET THE VINYL","APP FOR MAC"],["PAIR BY USB","JUST ONCE"],["NO MAC?","USE SPOTIFY"],["HOW TO SET UP","ON BACK SCREEN"]],"found":["MAC","CONNECTED"],"guide":["PLAY","VOLUME","VIEW","EXIT","ENJOY!"],"name":"VINYL","guidecue":"GUIDE","play":"PLAY","pause":"PAUSE","lyrics":"LYRICS","info":"SONG INFO","waves":"WAVES","offline":"OFFLINE","online":"BACK ONLINE","nomac":["MAC","NOT FOUND"],"nowifi":["NO WI-FI",""],"nothing":["NOTHING","PLAYING"],"paused":"PAUSED","volume":"VOLUME","badkey":["CHECK YOUR","SPOTIFY KEY"],"spotify":["SPOTIFY","CONNECTING","NO INTERNET"],"linking":["SPOTIFY","LINKING"],"linked":["SPOTIFY","LINKED"],"newcode":["GET A","NEW CODE"],"badclient":["CHECK ID","AND SECRET"],"cleared":["EVERYTHING","CLEARED"],"premium":["NEEDS","PREMIUM"],"noplayer":["NO PLAYER","IS OPEN"],"fixedvol":["THIS DEVICE","SETS ITS OWN"],"onmac":["CONTROL IT","ON YOUR MAC"],"notoplay":["NOTHING","TO PLAY"],"ctlmac":["CONTROL ON","YOUR MAC"],"ctlspotify":["CONTROL ON","SPOTIFY"],"volmac":["VOLUME ON","YOUR MAC"],"novol":["NO VOLUME","FROM HERE"],"nolyrics":["NO LYRICS","FOUND"],"lyrscript":["CAN'T SHOW","THIS SCRIPT"],"lyroff":["LYRICS","OFFLINE"],"music":"MUSIC","nowplaying":"NOW PLAYING","video":"VIDEO","nowshowing":"NOW SHOWING","back":["VINYL","Scan to set up","github.com/","windAGH/","busybar-apps"]},"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1,"&":4,"'":1,"!":1,"?":3,"(":2,")":2,"\"":3,";":2,"*":3,"#":5,"$":3,"@":4,"=":3,"_":3,"<":3,">":3},"smallGap":1,"tagw":{"PLAY":22,"PAUSE":29,"LYRICS":32,"SONG":23,"INFO":21,"WAVES":31,"OFFLINE":38,"BACK":23,"ONLINE":32},"clip":1};
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
if (batch.length === 4) await flush();       // (four: the pieces of a strip's middle go in one request)
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
// ===== vinyl.js =====
(function () {
if (D.lag) {                        // TEST build (--lag): every draw request is held 80-150 ms, as on a slow day of the real bar
const real = call;
call = async (method, path, body, type) => {
if (path.indexOf("display/draw") === 0) await sleep(80 + Math.random() * 70);
return real(method, path, body, type);
};
}
const lg = { lines: [], t0: Date.now(), dirty: 0, now: false, due: 0, wrote: 0, step: "start", pass: 0, held: 0, open: [], hb: 0, ok: -1, same: null,
pow: "", powDue: 0, outAt: 0, outN: 0, cost: "", errs: {}, nerr: 0, clock: 0 };
const clock8 = (ms) => new Date(ms).toISOString().slice(11, 21) + "Z";
function jot(text, must, lazy) {
if (!must && !D.trace) return false;             // <- the plain build: only the lines marked `must`
lg.lines.push(((Date.now() - lg.t0) / 1000).toFixed(1) + " " + text);
if (lg.lines.length > 400) lg.lines.splice(0, 100);      // (never endless, should the bar not take the file)
lg.ok = -1;
lg.dirty = Math.max(lg.dirty, lazy ? 1 : 2);
if (must) lg.now = true;
return true;
}
function dbg(text) {
if (D.trace && D.demo) console.log(text);
}
function jotSame(what, ms) {
const now = ((Date.now() - lg.t0) / 1000).toFixed(1), m = lg.same;
if (lg.ok >= 0 && m && m.what === what && lg.lines[lg.ok] === m.line) {
m.n++;
m.lo = Math.min(m.lo, ms);
m.hi = Math.max(m.hi, ms);
m.line = lg.lines[lg.ok] = m.t + " " + what + " x" + m.n + " " + m.lo + "-" + m.hi + "ms last +" + now;
lg.dirty = Math.max(lg.dirty, 1);
} else if (jot(what + " " + ms + "ms", false, true)) {
lg.ok = lg.lines.length - 1;
lg.same = { what: what, t: now, n: 1, lo: ms, hi: ms, line: lg.lines[lg.ok] };
}
}
async function logStart() {
const old = await call("GET", "storage/read?path=/ext/data/link.txt");
const before = old.ok && old.text ? old.text.split("\n").filter((x) => x).slice(-130) : [];
const last = before.length ? before[before.length - 1] : "";
const mine = lg.lines;
lg.lines = before;
jot("START " + clock8(lg.t0) + " (bar clock " + lg.t0 + "). The run before " + (!last ? "left no record." : /EXIT/.test(last) ? "was ended by Back: " + last
: "ended WITHOUT A WORD; its last line: " + last), true);
lg.lines = lg.lines.concat(mine);
for (const what of ["status/system", "status/power", "wifi/status"]) {
const got = await call("GET", what);
jot(what + " " + got.status + " " + got.text.replace(/\s+/g, " ").slice(0, 150), true);
}
}
async function logSave(now) {
if (now >= lg.powDue && (!changing(now, 0.3) || now >= lg.powDue + 700)) {      // the cable: looked at once a second (between two lines of the lyrics), written down when it changes
lg.powDue = now + 1000;
const got = await call("GET", "status/power");
const mv = /"usb_voltage"\s*:\s*(\d+)/.exec(got.text), st = /"state"\s*:\s*"([a-z_]+)"/i.exec(got.text);
const key = (mv ? (Number(mv[1]) > 2500 ? "in" : "OUT") : "?") + ", " + (st ? st[1] : "status " + got.status);
if (key !== lg.pow) {
if (lg.pow && key[0] !== "?") jot("power: USB " + key + (mv ? " (" + mv[1] + " mV)" : "") + ", step " + lg.step, true);
if (lg.pow && key[0] === "O" && lg.pow[0] === "i") {
lg.outAt = Date.now();
lg.outN = 0;
}
if (key[0] === "i") lg.outAt = 0;
if (key[0] !== "?" || !lg.pow) lg.pow = key;
}
now = Date.now();
}
if (lg.outAt && now - lg.outAt >= (lg.outN + 1) * 1000) {       // the eight seconds after the cable went: one line each, written at once
lg.outN++;
jot("+" + ((now - lg.outAt) / 1000).toFixed(1) + " s after the cable went: running, step " + lg.step + ", held " + lg.held + ", " + unanswered + " unanswered" +
(lg.open.length ? ", open: " + lg.open.map((o) => o.what + " " + (now - o.at) + "ms").join(", ") : ""), true);
if (lg.outN >= 8) lg.outAt = 0;
}
if (now - lg.hb >= 10000) {
lg.hb = now;
const open = lg.open.map((o) => o.what + " " + (now - o.at) + "ms").join(", ");
jot("hb " + clock8(now) + " step " + lg.step + " src " + src + "/" + cur.kind + (cur.state ? "/" + cur.state : "") + " pass " + lg.pass + " held " + lg.held +
" lag " + Math.round(lag) + " miss " + wifi.miss + " fly " + wifi.fly.length + (lg.cost ? " log " + lg.cost : "") + (open ? " open: " + open : ""), false, true);
lg.cost = "";
lg.pass = lg.held = 0;
}
if (!lg.dirty) return;
const due = lg.now ? Math.min(lg.due, lg.wrote + 400) : lg.dirty > 1 ? lg.due : lg.wrote + 20000;
if (now < due || !(lg.now || now >= due + 6000 || !(changing(now, 0.6) || dimBusy() || deck.busy || deck.posting))) return;
lg.due = now + 5000;
lg.wrote = now;
lg.dirty = 0;
lg.now = false;
const w0 = Date.now();
if (lg.lines.length > 130) {                       // the older lines go into the second file, once
const old = lg.lines.splice(0, lg.lines.length - 40);
lg.ok = -1;
await call("POST", "storage/write?path=/ext/data/link-1.txt", old.join("\n"), "application/octet-stream");
}
const text = lg.lines.join("\n");
await call("POST", "storage/write?path=/ext/data/link.txt", text, "application/octet-stream");
lg.cost = text.length + "b " + (Date.now() - w0) + "ms";      // (what this record's own write took: said in the next hb)
}
{
const real = call, said = report;
call = async (method, path, body, type) => {       // (which requests to the bar itself are in flight, and how long each took if long)
const o = { what: method + " " + path.split("?")[0] + (path.indexOf("path=") > 0 ? " " + path.split("/").pop() : ""), at: Date.now() };
lg.open.push(o);
const got = await real(method, path, body, type);
lg.open.splice(lg.open.indexOf(o), 1);
if (Date.now() - o.at > 700 || (!got.ok && got.status === 0)) jot("bar " + o.what + " " + got.status + " " + (Date.now() - o.at) + "ms" + (got.status ? "" : " " + got.text.slice(0, 60)));
return got;
};
report = (what, err) => {
const text = "ERR " + what + ": " + String(err && err.message ? err.message : err).slice(0, 100);
if (lg.nerr > 40) {
lg.errs = {};
lg.nerr = 0;
}
if (lg.errs[text] === undefined) lg.nerr++;
const n = lg.errs[text] = (lg.errs[text] || 0) + 1;
if (n === 1 || n === 5 || n === 25 || n === 125 || n % 625 === 0) jot(text + (n > 1 ? " (x" + n + ")" : ""), true);
said(what, err);
};
(async () => {                                     // a clock that should tick every 50 ms: where it does not, the script was held
let last = Date.now();
while (!stopped) {                               // (every 50 ms: a wake-up costs the bar's processor too)
await sleep(50);
const now = Date.now();
lg.held = Math.max(lg.held, now - last - 50);
last = now;
}
})();
}
const W = D.words;                  // every word the app shows (one table: vinyllib.py WORDS)
const TXT = 23, ROOM = 44, EDGE = 71;               // where the words begin beside the turntable, how wide a row may be, the last column
const VTXT = 27, VROOM = 44;        // beside the projector (its beam needs the room)
const RA = -1, RB = 6, RM = 2;      // rows of words over the line of the song's time: capitals on rows 1-5 and 8-12; one row alone on 4-8
const CARD_MS = 3400;               // how long one part of a name that needs several stays
const INK = "#FFFFFF", GREY = "#969CAA", QUIET = "#5C606C", LAMP = "#FFCE82";
const LONG = D.long || 3600;        // seconds a turning film lives without being sent again (sending it again starts it afresh)
const ARM_X = 8;
const TOP = 2000000000;
const NREC = D.recs.length;
const pad16 = (n) => (n < 16 ? "0" : "") + n.toString(16).toUpperCase();
const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const FOLD = [[/[‘’‚′`´]/g, "'"], [/[“”„«»]/g, '"'], [/[‐-―−]/g, "-"],
[/…/g, "..."], [/[À-Åà-å]/g, "A"], [/[È-Ëè-ë]/g, "E"], [/[Ì-Ïì-ï]/g, "I"],
[/[Ò-ÖØò-öø]/g, "O"], [/[Ù-Üù-ü]/g, "U"], [/[Çç]/g, "C"], [/[Ññ]/g, "N"],
[/[Ýýÿ]/g, "Y"], [/ß/g, "SS"], [/[Ææ]/g, "AE"], [/ /g, " "]];
function plain(s) {
let out = String(s);
for (let i = 0; i < FOLD.length; i++) out = out.replace(FOLD[i][0], FOLD[i][1]);
return out.toUpperCase().replace(/[^A-Z0-9 .,:;!?'"()&+%\/\n\[\]-]/g, "").replace(/ +/g, " ");
}
const tidy = (s) => plain(s).replace(/\n/g, " ").replace(/\[/g, "(").replace(/\]/g, ")").replace(/^ +| +$/g, "");
function wrap(s, room) {
const parts = s.split(" "), rows = [];
let line = "";
for (let i = 0; i < parts.length; i++) {
let word = parts[i];
while (smallWidth(word) > room) {
if (line) rows.push(line);
line = "";
let n = word.length - 1;
while (n > 1 && smallWidth(word.slice(0, n) + "-") > room) n--;
const half = Math.ceil(word.length / 2);       // (in two even halves if that does it: no single letter left over)
if (half < n && smallWidth(word.slice(half)) <= room) n = half;
rows.push(word.slice(0, n) + "-");
word = word.slice(n);
}
const more = line ? line + " " + word : word;
if (smallWidth(more) <= room) line = more;
else {
rows.push(line);
line = word;
}
}
if (line) rows.push(line);
return rows.length ? rows : [s];
}
let kept = {}, keptN = 0;
function rowsOf(s, room) {
const key = room + "|" + s;
if (kept[key]) return kept[key];
let rows = wrap(s, room);
if (rows.length > 1) {
const parts = s.split(" ");
let widest = 0;
for (let i = 0; i < parts.length; i++) widest = Math.max(widest, smallWidth(parts[i]));
for (let r = room - 4; r >= widest && r >= 20; r -= 4) {
const tighter = wrap(s, r);
if (tighter.length > rows.length) break;
rows = tighter;
}
}
if (keptN++ >= 12) {
kept = {};
keptN = 0;
}
kept[key] = rows;
return rows;
}
let lag = 25;
const have = {};                    // the elements that are on the bar now (asking it to take away one that is not there is refused)
let answering = false;
const sentEl = {};
const SAME_MS = 40000;
const idOf = (part) => part.slice(7, part.indexOf('"', 7));         // (every part begins {"id":"...")
{
const real = post;
post = async (parts) => {
const ok = await real(parts), at = Date.now();
for (let i = 0; i < parts.length; i++) {
const id = idOf(parts[i]);
if (ok) sentEl[id] = { s: parts[i], at: at };
else delete sentEl[id];                        // (refused: not known to be there as it was sent)
}
return ok;
};
}
async function put(parts) {                          // (lag: what a request of ONE element takes; each further element costs the bar some two thirds of that)
if (!answering && !busy && (ctl.ok || ctl.start || ctl.turn) && !setup.on && guide.state !== "on" && !title.on) {
answering = true;
try {
const at = Date.now();
controls(at);
await tagStep(at);
await volStep(at);
} finally {
answering = false;
}
}
const now = Date.now(), need = parts.filter((p) => {
const was = sentEl[idOf(p)];
return !was || was.s !== p || now - was.at >= SAME_MS || p.indexOf('"type":"animation"') > 0;
});
if (!need.length) return true;
if (need.length > 8) return postAll(need, 8);      // (the bar refuses longer requests: a page of many rows changing, under the plate)
const t = Date.now(), ok = await post(need);
lag += 0.25 * ((Date.now() - t) / (1 + 0.66 * (need.length - 1)) - lag);
return ok;
}
const lead = () => clamp((3.3 * lag + 40) * (deck.busy ? 1.3 : 1), 60, 600) / 1000;
async function wipe(all) {
const ids = all.filter((id) => have[id]);
for (let i = 0; i < ids.length; i++) {
delete have[ids[i]];
delete sentEl[ids[i]];
}
if (ids.length === 0) return;
const got = await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
if (got.ok || ids.length === 1) return;
for (let i = 0; i < ids.length; i++) {            // (one id that is not there makes the bar refuse the whole list)
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: [ids[i]] }));
}
}
function film(id, name, x, z, loop, timeout, y) {
have[id] = 1;
return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":' + x + ',"y":' + (y || 0) + ',"align":"top_left","loop":' +
(loop ? "true" : "false") + ',"section":"default","timeout":' + timeout + ',"z_index":' + z + "}";
}
function block(id, x, y, w, h, colour, z) {
have[id] = 1;
return '{"id":"' + id + '","type":"rectangle","x":' + x + ',"y":' + y + ',"width":' + w + ',"height":' + h +
',"fill":"solid","fill_colors":["' + colour + '"],"border_width":0,"timeout":' + STILL + ',"z_index":' + z + "}";
}
function letters(id, s, x, y, colour, part, z, more) {
have[id] = 1;
return '{"id":"' + id + '","type":"text","text":' + JSON.stringify(s || " ") + ',"font":"small","x":' + x + ',"y":' + y +
',"align":"top_left","color":"' + colour + pad16(Math.round(255 * part)) + '","timeout":' + STILL + ',"z_index":' + z + (more || "") + "}";
}
const txt = { set: "a", page: null, sent: {}, at: 0 };
let lined = false;                  // the page on show has the line of the song's time under it
const rowY = (n) => (lined ? [RM, RA, RB] : [4, 0, 7])[n];
function wireItem(it, set, part, dx) {
return letters("w" + set + it.k, it.s, it.x + (dx || 0), it.y, it.c, part, 100);
}
const wirePage = (pg, set, part) => pg.items.map((it) => letters("w" + set + it.k, it.s, it.x, it.y - (pg.sc ? pg.sc.off : 0), it.c, part, 100));
const wmask = (pg) => block("wm", pg && pg.sc ? pg.items[0].x : OFF, 13, EDGE + 1 - (pg && pg.sc ? pg.items[0].x : TXT), 3, "#000000FF", 101);
const idsOf = (pg, set) => pg.items.map((it) => "w" + set + it.k);
let dimUntil = 0, dimOn = false;
const dimFilm = (name, x) => film("wq", name, x, 105, false, LONG);
const dimBusy = () => dimOn || Date.now() < dimUntil;
async function idle(ms) {
do {
await sleep(ms || 1);
} while (dimBusy());
}
async function setWords(pg) {
const old = txt.page;
if (old && old.key === pg.key) return;
const from = txt.set, to = from === "a" ? "b" : "a";
if (old) {
const x = Math.min(old.items[0].x, pg.items[0].x);
dimOn = true;
try {
await put([dimFilm("dim_in", x)]);
await sleep(D.ms.dimIn - 20);                // (dark from its third picture on: 0.1 s after the bar began to play it)
await put(wirePage(old, from, 0).concat(wirePage(pg, to, 1), old.sc || pg.sc ? [wmask(pg)] : []));
await put([dimFilm("dim_out", x)]);
} finally {
dimOn = false;
dimUntil = Date.now() + D.ms.dimOut;
}
} else {
await put(wirePage(pg, to, 0.45).concat(pg.sc ? [wmask(pg)] : []));
await put(wirePage(pg, to, 1));
}
if (old) await wipe(idsOf(old, from));
txt.set = to;
txt.page = pg;
txt.at = Date.now();
seen(pg);
dbg("PAGE " + pg.key.slice(0, 40) + " pos " + posNow(Date.now()).toFixed(2) + (fin.at ? " over " + ((Date.now() - fin.at) / 1000).toFixed(2) : ""));
}
async function putWords(pg, covered) {
const to = txt.set === "a" ? "b" : "a";
if (!covered) await put(pg.items.map((it) => wireItem(it, to, 1, OFF)));
await put(wirePage(pg, to, 1).concat(have.wm || pg.sc ? [wmask(pg)] : []));
txt.set = to;
txt.page = pg;
txt.at = Date.now();
seen(pg);
}
function seen(pg) {
if (!pg.sc) return;
pg.sc.t0 = Math.max(pg.sc.t0, txt.at);
if (!pg.sc.end) pg.sc.end = pg.sc.t0 + pg.sc.span;
pg.sc.unit = unitOf(pg.sc);
}
const turn = { base: "", t0: 0 };
function book(base, parts, now, x, room, alone, span) {
const cards = [];
for (let i = 0; i < parts.length; i++) {
const rows = rowsOf(parts[i][0], room || ROOM), c = parts[i][1];
if (alone || !cards.length) cards.push([]);
for (let k = 0; k < rows.length; k++) cards[cards.length - 1].push([rows[k], c]);
}
if (turn.base !== base) {
turn.base = base;
turn.t0 = now;
}
const k = cards.length > 1 ? Math.floor((now - turn.t0) / CARD_MS) : 0, n = k % cards.length, card = cards[n];
const pg = { key: base + "#" + n + (lined ? "L" : ""), items: [] };
if (card.length === 1) pg.items.push({ k: "tm", s: card[0][0], x: x || TXT, y: rowY(0), c: card[0][1] });
else for (let i = 0; i < card.length; i++) pg.items.push({ k: "t" + (i + 1), s: card[i][0], x: x || TXT, y: rowY(1) + 7 * i, c: card[i][1] });
if (card.length > 2) {     // (end: when the card goes - a card that takes turns keeps its time even if it is seen late; one alone has its span from when it is seen)
const t0 = turn.t0 + (cards.length > 1 ? k * CARD_MS : 0);
pg.sc = { t0: t0, end: cards.length > 1 ? t0 + CARD_MS : 0, hard: cards.length > 1, span: span || CARD_MS, rows: card.length, off: 0, open: !!span && !alone };
}
return pg;
}
const SCROLL_MS = 320, SCROLL_AT = [2, 4, 6, 7];
const unitOf = (sc) => Math.max(500, (sc.end - sc.t0 - (sc.rows - 2) * SCROLL_MS) / (sc.rows - 0.5));     // (no stand under 0.5 s: a name of five rows and more takes longer)
function scrollAt(sc, ms) {
const k = sc.rows - 2, unit = sc.unit || unitOf(sc);
let t = 1.5 * unit;
for (let j = 0; j < k; j++) {
if (ms < t) return { off: 7 * j, next: t - ms };
const step = Math.floor((ms - t) / (SCROLL_MS / 4));
if (step < 4) return { off: 7 * j + SCROLL_AT[step], next: t + (step + 1) * SCROLL_MS / 4 - ms };
t += SCROLL_MS + unit;
}
return { off: 7 * k, next: 1e9 };
}
const nearRows = (pg, set, a, b) => pg.items.filter((it) => (it.y - a > -7 && it.y - a < 16) || (it.y - b > -7 && it.y - b < 16))
.map((it) => letters("w" + set + it.k, it.s, it.x, it.y - b, it.c, 1, 100));
async function scrollTick() {
const pg = txt.page;
if (!pg || !pg.sc || dimBusy()) return;
if (pg.sc.open && pg.sc.off === 0 && view === "lyrics" && lyr.state === "ok" && lyr.key === cur.key && cur.state === "playing") {
let f = 0;
while (f < lyr.t.length && !lyr.s[f]) f++;
const pos = posNow(Date.now()), due = Date.now() + 1000 * (f < lyr.t.length ? lyr.t[f] - lead1() - pos : 1e6) - 150;
if (f < lyr.t.length && lyr.t[f] > pos) pg.sc.due = due;
if (f < lyr.t.length && lyr.t[f] > pos && due < pg.sc.end) {
pg.sc.end = Math.max(pg.sc.t0 + OPEN_MIN_MS, due);
pg.sc.unit = unitOf(pg.sc);
pg.sc.hard = true;                            // (it goes then: no slide that could not end before)
}
}
for (let guard = 0; guard < 60 && txt.page === pg && !stopped; guard++) {
const now = Date.now(), at = scrollAt(pg.sc, now - pg.sc.t0);
if (wantFace(now) !== "book" || (pg.sc.off % 7 === 0 && at.off > pg.sc.off && ((pg.sc.hard && now + SCROLL_MS > pg.sc.end) || (pg.sc.due && now + SCROLL_MS + 100 > pg.sc.due)))) return;     // (the lyrics are due, or the card goes before a slide could end: no slide begun)
if (at.off > pg.sc.off) {                       // (one picture of the slide at a time, however late: never a jump)
const row = Math.floor(pg.sc.off / 7) * 7, inRow = pg.sc.off - row, was = pg.sc.off;
let next = row + 7;
for (let i = 0; i < SCROLL_AT.length; i++) if (SCROLL_AT[i] > inRow) { next = row + SCROLL_AT[i]; break; }
pg.sc.off = Math.min(at.off, next);
await put(nearRows(pg, txt.set, was, pg.sc.off));     // (only the rows in sight move: two or three, one request)
if (pg.sc.off % 7 === 0) {                    // a slide done: if later than its time, what follows moves on by as much
const j = pg.sc.off / 7, done = 1.5 * pg.sc.unit + j * SCROLL_MS + (j - 1) * pg.sc.unit, late = Date.now() - pg.sc.t0 - done;
if (late > 0) pg.sc.t0 += late;
}
if (pg.sc.off < at.off) continue;
}
if ((pg.sc.off % 7 === 0 && pg.sc.off >= at.off) || !(at.off >= 0)) return;     // (a slide ends on a whole row: the next is seconds away)
await sleep(Math.max(5, Math.min(at.next, 80)));
}
}
const scrollWait = () => (face === "book" && txt.page && txt.page.sc ? scrollAt(txt.page.sc, Date.now() - txt.page.sc.t0).next : 1e9);
const words = (key, one, two, c1, c2, now) => book(key, [[one, c1], [two, c2 || c1]], now);
const NOTHING = { kind: "none", key: "none" };
let cur = { kind: "nosrc", key: "nosrc" };
let src = "none";                   // "helper" | "spotify" | "none"
const VIEWS = ["lyrics", "info", "waves"], VIEW_NAME = { lyrics: W.lyrics, info: W.info, waves: W.waves };
let view = "lyrics", viewSave = false;
const nolyr = { key: "", off: "", miss: "" };
const tag = { text: "", until: 0, on: false, sent: "" };
const setTag = (text, now) => {
tag.text = text;
tag.until = now + 950;
jot("label " + text);
};
let note = null;                    // a short answer to a control, in place of the words: { one, two, until }
let lyricsOn = true, colourOn = false, knobOld = false;
let coming = [];                    // the songs that come next, if the source says (their words are fetched ahead)
let hold = null;                    // Start was pressed: what the app shows until the source has followed
let resumed = false;                // the song that plays was paused and goes on: its words where it is - the name card is for a NEW song
function latin(raw) {
const t = tidy(raw);
return 4 * t.replace(/[^A-Z0-9]/g, "").length >= 3 * raw.replace(/[\s.,:;!?'"()&+%\/\[\]-]/g, "").length ? t : "";
}
function song(kind, state, title, artist, album, dur, pos, at, more) {
const t = String(title || "").slice(0, 160), a = String(artist || "").slice(0, 120), al = String(album || "").slice(0, 120);
return { kind: kind, state: state, rawTitle: t, rawArtist: a, rawAlbum: al, title: latin(t), artist: latin(a), album: latin(al),
dur: Number(dur) > 0 ? Number(dur) : 0, pos: Number(pos) > 0 ? Number(pos) : 0, at: at, more: latin(String(more || "")),
key: kind + "|" + t + "|" + a + "|" + al };
}
function names(c) {
if (c.title) return [c.title, c.artist || c.album || c.more || W.music];
const one = c.artist || c.album || W.nowplaying;
return [one, (c.artist && c.album) || c.more || W.music];
}
const slew = { d: 0, at: 0 };
const slewLeft = (now) => (slew.d === 0 ? 0 : slew.d * Math.max(0, 1 - (now - slew.at) / 1500));
const floor = { key: "", pos: 0, at: 0 };          // the place frozen by the last key
const shown = { key: "", pos: 0, why: "" };        // the place last given out; why: what last moved the Mac's position
function posNow(now) {
if (cur.kind !== "music") return 0;
let p = cur.state === "playing" && !cur.frozen ? cur.pos + (now - cur.at) / 1000 - (src === "helper" ? slewLeft(now) : 0) : cur.pos;
p = cur.dur ? clamp(p, 0, cur.dur) : Math.max(0, p);
if (shown.key === cur.key && p < shown.pos) {
const behind = shown.pos - p, slack = floor.key === cur.key && now - floor.at < 15000 ? 2 : 1.5;
if (behind <= slack) return shown.pos;         // (it waits)
jot("position back by " + behind.toFixed(2) + " s to " + p.toFixed(1) + " (" + (shown.why || "?") + ")");
}
shown.key = cur.key;
shown.pos = p;
return p;
}
function sum(s, seed, mod) {
let h = seed;
for (let i = 0; i < s.length && i < 120; i++) h = (h * 33 + s.charCodeAt(i)) % mod;
return h;
}
function recordOf(c) {
if (c.rec === undefined) c.rec = sum((c.rawAlbum || c.rawTitle) + "|" + c.rawArtist, 5381, 1000003) % NREC;
return c.rec;
}
function wordsKey(c) {
if (c.wk === undefined) {
const s = c.rawTitle + "|" + c.rawArtist + "|" + Math.round(c.dur);
c.wk = sum(s, 5381, 1000003).toString(36) + sum(s, 7919, 999983).toString(36);
}
return c.wk;
}
const GONE_MS = 15000;
const PUSH_WRITE_MS = 50;           // what a write into the bar's storage takes Vinyl for Mac when it does not say (45-60 ms measured on a bar)
const helper = { t: 0, seen: 0, read: 0, asked: 0, stamp: 0, rej: 0, saidAt: 0, cn: -1, prev: 0, cl: [], w: -1, old: 0, wide: 1e15, song: null, first: true, vol: -1, can: "", next: [] };
function pushOff() {
const c = helper.cl;
let lo, hi;
for (;;) {
lo = -1e15;
hi = 1e15;
for (let i = 0; i < c.length; i++) {
lo = Math.max(lo, c[i].lo);
hi = Math.min(hi, c[i].hi);
}
if (hi >= lo - 40 || c.length <= 1) break;
c.shift();                                     // (the spans no longer meet: one of the clocks has been set - the oldest goes)
}
helper.wide = hi - lo;                           // how well it is known
return (lo > -1e14 ? (lo + hi) / 2 : hi) - (helper.w >= 0 ? helper.w : PUSH_WRITE_MS);
}
function readGap(now) {
if (tail(now) < 0.4) return 100;
if (helper.seen > 0 && helper.wide > 100 && now - helper.seen > 4600 && now - helper.seen < 6400) return 60;
return wifi.ver >= 0 && !wifi.plain && wifi.miss === 0 && now - wifi.okAt < 4000 ? 1000 : 300;
}
function wifiOff(now) {
let hi = null;
for (let i = 0; i < wifi.best.length; i++) {
if (now - wifi.best[i].at < 30000 && (hi === null || wifi.best[i].hi < hi)) hi = wifi.best[i].hi;
}
return hi === null ? null : hi - Math.min(wifi.half, 125);
}
function clockOff(now) {
const byPush = helper.cl.length ? pushOff() : null, byWifi = wifiOff(now);
if (byPush !== null && (byWifi === null || (now - helper.seen < PUSH_MS && helper.cl.length >= 2 && helper.wide <= 120))) return byPush;
return byWifi !== null ? byWifi : byPush !== null ? byPush : 0;
}
const doubt = { key: "", pos: 0, at: 0, go: false, asked: 0 };
function takeRecord(j, at, now, by) {
if (j.t <= helper.stamp && helper.stamp - j.t < 10000) {            // said before one the app has already: the two ways do not overtake each other
helper.rej = helper.rej || now;
if (now - helper.rej < 2000) return;                              // (... but words that keep coming for two seconds are taken, whatever their stamps: the Mac is the truth)
}
helper.rej = 0;
helper.stamp = j.t;
helper.vol = typeof j.vol === "number" ? clamp(Math.round(j.vol), 0, 100) : -1;
helper.cn = typeof j.cn === "number" ? j.cn : -1;                   // (the last play / pause of the bar that Vinyl for Mac has carried out)
helper.can = j.can && j.can.join ? "," + j.can.join(",") + "," : "";
helper.next = [];
for (let i = 0; j.next && i < j.next.length && i < 2; i++) {
const n = j.next[i];
if (n && n.title) helper.next.push(song("music", "playing", n.title, n.artist, n.album, n.dur, 0, 0, ""));
}
const old = helper.song;
if (j.kind === "music" && (j.title || j.artist)) {
helper.song = song("music", j.state === "paused" ? "paused" : "playing", j.title, j.artist, j.album, j.dur, j.pos, at, j.app);
} else if (j.kind === "video" && (j.title || j.site)) {
helper.song = song("video", "playing", j.title, "", "", 0, 0, now, j.site || j.app);
} else {
helper.song = NOTHING;
}
const nu = helper.song;
if (old && old.kind === "music" && nu.kind === "music" && old.key === nu.key && j.ps !== 2) {
const was = old.pos + (old.state === "playing" ? (now - old.at) / 1000 : 0), go = nu.state === "playing";
const is = nu.pos + (go ? (now - nu.at) / 1000 : 0), d = is - was;
if (d < -1.5 || d > 2.5) {
const head = !go && is < 1.5 && was > 5;
const again = doubt.key === nu.key && now - doubt.at >= 380 && Math.abs(is - (doubt.pos + (doubt.go ? (now - doubt.at) / 1000 : 0))) < 2;
if (again && !head) {
jot("place " + is.toFixed(1) + " (the song stood at " + was.toFixed(1) + "): said twice, taken (" + by + ")");
doubt.key = "";
} else {
const fresh = doubt.key !== nu.key || Math.abs(is - (doubt.pos + (doubt.go ? (now - doubt.at) / 1000 : 0))) >= 2;
if (fresh) {
doubt.key = nu.key;
doubt.pos = is;
doubt.at = now;
doubt.go = go;
jot("place " + is.toFixed(1) + " NOT taken on one word (" + by + "): the song stood at " + was.toFixed(1) + (head ? " - paused at the head: not while the pause lasts" : " - asked again"));
}
if (!head && now - doubt.asked > 300) {    // asked again, for a word 0.4 s after the first
doubt.asked = now;
const key = nu.key, wait = Math.max(30, doubt.at + 420 - now);
setTimeout(() => {
if (stopped || doubt.key !== key) return;
if (!wifiList().length) tell({ do: "hello" });
else if (wifi.up && wifiFree(Date.now())) {
wifi.plain = true;                   // (a plain request: answered at once)
wifiSend();
}
}, wait);
}
nu.pos = was;
nu.at = now;
}
} else doubt.key = "";
}
shown.why = by + (hold ? ", hold " + hold.state : "");
if (old && (old.key !== nu.key || old.state !== nu.state)) {
helper.saidAt = now;
if (wake) wake();                              // (a pause on the Mac takes the way of the bar's own key: the page's loop looks now, not at its next round)
}
if (!old || old.key !== nu.key || old.state !== nu.state) {
jot("Mac says (" + by + "): " + nu.kind + (nu.state ? " " + nu.state : "") + (nu.rawTitle ? " \"" + nu.rawTitle.slice(0, 18) + "\" at " + Number(j.pos || 0).toFixed(1) : "") +
(hold ? " [the app holds " + hold.state + " since " + (now - hold.at) + "ms]" : ""));
}
slew.d = 0;
if (old && old.kind === "music" && nu.kind === "music" && old.key === nu.key && old.state === "playing" && nu.state === "playing") {
const d = (nu.pos + (now - nu.at) / 1000) - (old.pos + (now - old.at) / 1000 - slewLeft(now));     // the new word against where the app stands
if (Math.abs(d) < 0.3) {
slew.d = d;
slew.at = now;
}
}
}
function takeHelper(text, r0, r1) {
let j = null;
try {
j = JSON.parse(text);
} catch (err) {
return;                                        // half-written, or not ours: the next look will do
}
if (!j || typeof j !== "object" || typeof j.t !== "number") return;
if (j.t === helper.t) {
helper.prev = r0;                              // (still the old word when this read began)
return;
}
const first = helper.first, now = r1;
helper.first = false;
helper.t = j.t;
if (first && Math.abs(now - j.t) > 8000) {       // an old file from an earlier day: fresh only once it changes
helper.prev = r0;
return;
}
if (now - helper.seen > GONE_MS) {               // the helper is back: its clock is measured anew
helper.cl = [];
helper.old = 1e15;
}
helper.seen = now;
helper.w = typeof j.w === "number" && j.w >= 0 && j.w < 400 ? j.w : -1;
helper.cl.push({ lo: helper.prev > 0 ? helper.prev - j.t : -1e15, hi: r1 - j.t, at: now });
while (now - helper.cl[0].at > 600000) helper.cl.shift();
if (helper.cl.length > 12) {                     // (of thirteen the widest goes: the narrow ones say the most)
let k = 0;
for (let i = 1; i < helper.cl.length; i++) if (helper.cl[i].hi - helper.cl[i].lo > helper.cl[k].hi - helper.cl[k].lo) k = i;
helper.cl.splice(k, 1);
}
helper.prev = r0;
helper.old = Math.min(helper.old, now - j.t);    // (what the app used to take: kept to be able to say how late that was)
const byWifi = wifiOff(now), off = clockOff(now);
dbg("PUSHCLOCK off " + Math.round(off) + (byWifi !== null ? " (wifi; push " + Math.round(pushOff()) + ")" : "") + " old " +
Math.round(helper.old) + " = " + Math.round(helper.old - off) + " ms later; w " + helper.w + " spans " + helper.cl.length + " known to " + Math.round(helper.wide / 2));
jotSame("push", r1 - r0);
takeRecord(j, j.t + off, now, "push");
}
const net = { out: 0, last: 0 };
function ask(url, init, ms) {
const work = (async () => {
try {
const res = await fetch(url, init);
const text = await res.text();
return { ok: res.ok, status: res.status, text: text };
} catch (err) {
return { ok: false, status: 0, text: String(err && err.message ? err.message : err) };
}
})();
return new Promise((done) => {
const timer = setTimeout(() => done({ ok: false, status: 0, text: "no answer in " + ms + " ms", late: work }), ms);
work.then((r) => {
clearTimeout(timer);
done(r);
});
});
}
async function askNet(url, init, what) {
const t0 = Date.now(), o = { what: what, at: t0 };
net.out++;
lg.open.push(o);
const r = await ask(url, init, 12000);
net.out--;
net.last = Date.now();
lg.open.splice(lg.open.indexOf(o), 1);
jot(what + " " + r.status + " " + (net.last - t0) + "ms" + (r.status ? " " + r.text.length + "b" : " " + r.text.slice(0, 50)));
return r;
}
const PUSH_MS = 6500;               // a push counts as alive this long (Vinyl for Mac writes at least every 5 s)
const LOST_MS = 25000;              // without any word for this long the app no longer knows what is playing
const POLL_MS = 4000, POLL_GAP = 2000;
const FLY_MAX = 3, FLY_MS = 6000;
const WAIT_MS = 3000;
const WIFI_WAIT = 20000;            // so long the bar's own Wi-Fi may take to come up before the app says NO WI-FI
const wifi = { set: null, pair: null, at: 0, turn: 0, okAt: 0, due: 0, miss: 0, rtt: 80, best: [], pairDue: 0, fly: [], n: 0, newest: 0,
up: true, state: "", upAt: Date.now(), downAt: 0, statDue: 0, ver: -1, plain: true, half: 40, halfAt: 0, halfSet: 0 };
function wifiFree(now) {
while (wifi.fly.length && now - wifi.fly[0] > FLY_MS) wifi.fly.shift();
return wifi.fly.length < FLY_MAX;
}
function flyDone(t0) {
const i = wifi.fly.indexOf(t0);
if (i >= 0) wifi.fly.splice(i, 1);
}
function wifiList() {
const out = [];
if (wifi.set) out.push(wifi.set);
for (let i = 0; wifi.pair && i < wifi.pair.addr.length && i < 3; i++) out.push({ addr: wifi.pair.addr[i], code: wifi.pair.c });
return out;
}
async function barWifi() {
const got = await call("GET", "wifi/status"), now = Date.now();
const m = got.ok ? /"state"\s*:\s*"([a-z_]+)"/i.exec(got.text) : null, state = m ? m[1] : "?";
const up = state === "?" || state === "unknown" || state === "connected";
if (state !== wifi.state) jot("wifi " + state);
if (up && !wifi.up) {
wifi.upAt = now;
wifi.due = Math.min(wifi.due, now);            // (asked at once)
wifi.miss = 0;                                 // (what went unanswered while the Wi-Fi was away is not held against the Mac)
wifi.turn = 0;
}
if (!up && wifi.up) wifi.downAt = now;
wifi.up = up;
wifi.state = state;
}
const wifiGap = (now) => (now - helper.seen < PUSH_MS ? 2000 : tail(now) < 0.4 ? 300 : 1000);
function wifiTake(r, t0, t1, idx, id, late, waited) {
let j = null;
try {
j = r.status === 200 ? JSON.parse(r.text) : null;
} catch (err) {
j = null;
}
if (!j || typeof j !== "object" || typeof j.t !== "number") return false;
const rtt = t1 - t0;
if (late) jot("p" + id + " late answer after " + rtt + "ms");
else jotSame(waited ? (j.v === wifi.ver ? "w same" : "w NEWS") : "p ok", rtt);
if (t0 <= wifi.newest) return true;              // (an older request's answer after a newer one's: nothing new in it)
wifi.newest = t0;
wifi.at = idx;
wifi.turn = 0;
if (wifi.miss) jot("p" + id + " the Mac answers again (after " + wifi.miss + " lost)");
wifi.miss = 0;
wifi.okAt = t1;
wifi.ver = typeof j.v === "number" ? j.v : -1;
wifi.plain = false;
if (id === wifi.n) wifi.due = t1 + (waited && wifi.ver >= 0 ? 20 : wifi.ver >= 0 ? 300 : wifiGap(t1));
if (!waited && !late) {
if (rtt <= 600) {
wifi.rtt += 0.3 * (rtt - wifi.rtt);
if (rtt / 2 < wifi.half || t1 - wifi.halfSet > 180000) {
wifi.half = rtt / 2;
wifi.halfSet = t1;
}
}
wifi.halfAt = t1;                              // (when a plain request was last answered)
}
wifi.best.push({ hi: t1 - j.t, at: t1 });
while (wifi.best.length > 8 || (wifi.best.length > 1 && t1 - wifi.best[0].at > 30000)) wifi.best.shift();
const off = clockOff(t1);
if (t1 - helper.seen < PUSH_MS) {
const was = helper.song, go = j.state !== "paused";
const news = !was || was.kind !== j.kind || (j.kind === "music" && (was.state !== (go ? "playing" : "paused") || was.rawTitle !== String(j.title || "").slice(0, 160) ||
Math.abs(Number(j.pos || 0) + (go ? (t1 - j.t - off) / 1000 : 0) - (was.pos + (was.state === "playing" ? (t1 - was.at) / 1000 : 0))) > 1.5));
if (!news && !hold && !doubt.key) return true;
}
dbg("WIFICLOCK off " + Math.round(off) + " rtt " + rtt + " half " + Math.round(wifi.half));
takeRecord(j, j.t + off, t1, (waited ? "w" : "p") + id);
return true;
}
async function wifiSend() {
try {
const list = wifiList(), other = list.length > 1 && wifi.miss % 5 === 4 ? 1 + Math.floor(wifi.miss / 5) % (list.length - 1) : 0;
const idx = (wifi.at + other) % list.length, c = list[idx], id = ++wifi.n, t0 = Date.now();
const waits = wifi.ver >= 0 && !wifi.plain && cur.kind !== "lost" && !(wifi.slowCmd && t0 - wifi.slowCmd < 60000) && t0 - wifi.halfAt < 60000;
const o = { what: (waits ? "w" : "p") + id, at: t0 }, patience = waits ? WAIT_MS + 1800 : POLL_MS;
let behind = net.out > 0;                      // a request to the internet is out as well: it may hold the line
wifi.fly.push(t0);
wifi.due = t0 + (cur.kind === "lost" ? 5000 : waits ? patience : POLL_GAP);
lg.open.push(o);
const r = await ask("http://" + c.addr + "/now?c=" + c.code + (waits ? "&v=" + wifi.ver + "&w=" + WAIT_MS : ""), { method: "GET" }, patience);
const t1 = Date.now();
lg.open.splice(lg.open.indexOf(o), 1);
if (!r.late) flyDone(t0);
if (wifiTake(r, t0, t1, idx, id, false, waits)) return;
wifi.plain = true;                             // (the next one is a plain request again)
if (r.late) {                                  // no answer in its time: should it still come, it counts
r.late.then((x) => {
flyDone(t0);
if (!wifiTake(x, t0, Date.now(), idx, id, true, waits)) jot("p" + id + " given up by the bar after " + (Date.now() - t0) + "ms: " + x.text.slice(0, 40));
});
}
behind = behind || net.out > 0 || t1 - net.last < patience;
if (r.late && behind) {
jot("p" + id + " no answer in " + (t1 - t0) + "ms, behind a request to the internet: not counted");
return;
}
wifi.miss++;
if (!r.late) wifi.due = Math.min(wifi.due, t1 + (wifi.miss < 3 ? 300 : 2000));     // (refused at once - the Mac is there, Vinyl for Mac is not: asked again at once, then every two seconds)
jot("p" + id + (idx ? " (address " + (idx + 1) + ")" : "") + (r.late ? " LOST: no answer in " + (t1 - t0) + "ms" : " refused after " + (t1 - t0) + "ms: " + r.status + " " + r.text.slice(0, 40)) +
", miss " + wifi.miss);
dbg("WIFI miss " + wifi.miss);
} catch (err) {
report("wifi", err);
}
}
async function readPair() {
const got = await call("GET", "storage/read?path=/ext/data/helper.json");
if (!got.ok) return;
try {
const j = JSON.parse(got.text);
if (j && j.addr && j.addr.length && j.c) wifi.pair = { addr: j.addr.map(String), c: String(j.c) };
} catch (err) {
report("pair", err);
}
}
async function readHelper() {
const r0 = Date.now(), got = await call("GET", "storage/read?path=/ext/data/now.json");
if (got.status !== 0) helper.read = Date.now();    // (the bar answered: only then does an old word in the file - or none - count as silence)
if (got.ok) takeHelper(got.text, r0, Date.now());
}
async function helperLoop() {
while (!stopped) {
await sleep(readGap(Date.now()));
try {
let now = Date.now();
await logSave(now);
if (!(changing(now, 0.25) || (deck.posting && tail(now) > 0.4)) || now - helper.asked > 600) {
helper.asked = now;
await readHelper();
if (now >= wifi.pairDue) {                             // has the cable been in? (looked for every 5 s)
wifi.pairDue = now + 5000;
await readPair();
}
}
now = Date.now();
const list = wifiList().length > 0, news = Math.max(helper.seen, wifi.okAt);
if (list && now >= wifi.statDue && (now - news > 2500 || !wifi.up)) {    // no word: is it the bar's own Wi-Fi? (once a second)
wifi.statDue = now + 1000;
await barWifi();
now = Date.now();
}
if (list && now >= wifi.due && !(changing(now, 0.3) && now - wifi.due < 500)) {
if (!wifi.up) wifi.due = now + 1000;                   // (no Wi-Fi: nothing is sent, and nothing counts as lost)
else if (!wifiFree(now)) {
wifi.due = now + 500;
jot("p skipped: " + wifi.fly.length + " requests without an answer yet");
} else wifiSend();                                     // (not waited for: the pushes are read on)
}
volSend(Date.now());                                     // (a turn of the knob that had to wait a moment)
} catch (err) {
report("helper", err);
}
}
}
const order = { n: 0, vol: -1, at: 0, sent: -1, sentAt: 0, toggleAt: 0, tries: 0 };
function tell(what, again) {
if (!again) {
order.n = Math.max(order.n + 1, Math.floor(Date.now() / 100) % 2000000000);
what.n = order.n;
}
order.at = Date.now();
const list = wifiList(), t0 = order.at, name = what.do + (what.v === undefined ? "" : " " + what.v) + (again ? " (again)" : ""), ways = [];
const cable = t0 - helper.seen < PUSH_MS || list.length === 0;
const wifiGood = list.length > 0 && wifi.up && wifi.miss === 0 && t0 - wifi.okAt < 4000;
const toFile = () => call("POST", "storage/write?path=/ext/data/cmd.json", JSON.stringify(what), "application/octet-stream").then((got) => {
jot("cmd " + name + " on the cable: " + (got.ok ? "written" : "NOT written, " + got.status) + " after " + (Date.now() - t0) + "ms");
return got.ok;
});
if (cable && !wifiGood) ways.push(toFile());                         // the cable is in: Vinyl for Mac reads it there
if (list.length) {                                                   // ... and over Wi-Fi, to the address that answers
const c = list[wifi.at % list.length];
ways.push(ask("http://" + c.addr + "/cmd?c=" + c.code, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(what) }, POLL_MS)
.then((r) => {
jot("cmd " + name + " over Wi-Fi: " + r.status + " after " + (Date.now() - t0) + "ms");
if (Date.now() - t0 > 1500) wifi.slowCmd = Date.now();        // (it had to wait behind something: no waiting requests for a minute)
if (r.status === 200 || !(cable && wifiGood) || Date.now() - helper.seen >= PUSH_MS) return r.status === 200;
return toFile();                                               // (Wi-Fi did not take it: the cable's file after all)
}));
}
return Promise.all(ways).then((oks) => oks.indexOf(true) >= 0);
}
function volSend(now) {
if (order.vol < 0 || src !== "helper" || now - order.sentAt < 200) return;
const v = order.vol;
order.vol = -1;
order.sent = v;                                   // (held against the Mac's older word: see srcVol)
order.sentAt = now;
tell({ do: "vol", v: v, t: now }).then((ok) => {
if (ok) order.tries = 0;
else if (order.vol < 0 && order.sent === v && order.tries++ < 3) order.vol = v;     // (no newer value waits: this one again)
});
}
const sp = { id: "", secret: "", refresh: "", code: "", link: "", kept: undefined, tried: "", token: "", until: 0, bad: false, due: 0, song: null, wait: 0, jobs: [], vol: -1, canVol: true,
volJob: -1, next: [], nextFor: "", nextDue: 0 };
const SP_REDIRECT = "http://127.0.0.1:8888/callback";
const spSet = () => sp.id !== "" && sp.secret !== "" && (sp.refresh !== "" || sp.code !== "" || sp.link !== "");
const codeMark = (code) => sum(code, 5381, 1000003).toString(36) + sum(code, 7919, 999983).toString(36) + code.length;
function codeOf(typed) {
let c = String(typed || "").replace(/\s/g, "");
const at = c.indexOf("code=");
if (at >= 0) c = c.slice(at + 5);
return c.split("&")[0].split("#")[0];
}
async function spLink(now) {
const code = sp.code, id = sp.id, mark = codeMark(code);
sp.link = "linking";
jot("spotify: trading the code (" + code.length + " letters) for a token");
const res = await askNet("https://accounts.spotify.com/api/token", { method: "POST",
headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic " + base64(sp.id + ":" + sp.secret) },
body: "grant_type=authorization_code&code=" + enc(code) + "&redirect_uri=" + enc(SP_REDIRECT) }, "spotify code");
if (res.status === 0) {                          // no connection: the code is not spent - tried again when the internet is back
sp.link = "";
throw new Error("Spotify: " + res.text);
}
if (sp.code !== code || sp.id !== id) return;    // (Setup was changed meanwhile)
let j = null;
try {
j = JSON.parse(res.text);
} catch (err) {
j = null;
}
if (res.status === 200 && j && j.refresh_token) {
sp.kept = { r: String(j.refresh_token), id: id, c: mark };
sp.refresh = sp.kept.r;
sp.token = String(j.access_token || "");
sp.until = Date.now() + (Number(j.expires_in) > 120 ? Number(j.expires_in) - 60 : 600) * 1000;
sp.code = "";
sp.link = "";
sp.bad = false;
say(W.linked[0], W.linked[1], 1800);
} else if (res.status === 401 || (j && j.error === "invalid_client")) {
sp.tried = id + "|" + sp.secret + "|" + mark;  // (not tried again until one of the three is another)
sp.code = "";
sp.link = "client";
} else {                                         // invalid_grant, or anything else Spotify will not have: this code is spent
sp.kept = { r: "", id: id, c: mark };
sp.code = "";
sp.link = "newcode";
}
jot("spotify: the code -> " + (sp.link || "linked") + " (" + res.status + (j && j.error ? " " + j.error : "") + ")");
if (sp.link !== "client") await call("POST", "storage/write?path=/ext/data/sp.json", JSON.stringify(sp.kept), "application/octet-stream");
}
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function base64(s) {
let out = "";
for (let i = 0; i < s.length; i += 3) {
const a = s.charCodeAt(i) & 255, b = i + 1 < s.length ? s.charCodeAt(i + 1) & 255 : -1, c = i + 2 < s.length ? s.charCodeAt(i + 2) & 255 : -1;
out += B64[a >> 2] + B64[((a & 3) << 4) | (b < 0 ? 0 : b >> 4)] + (b < 0 ? "=" : B64[((b & 15) << 2) | (c < 0 ? 0 : c >> 6)]) + (c < 0 ? "=" : B64[c & 63]);
}
return out;
}
function enc(s) {
if (typeof encodeURIComponent === "function") return encodeURIComponent(s);
let out = "";                                    // (an engine without it: the letters of the address, the rest as UTF-8 bytes)
for (let i = 0; i < s.length; i++) {
const c = s.charCodeAt(i);
if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 45 || c === 46 || c === 95 || c === 126) out += s[i];
else if (c < 128) out += "%" + pad16(c);
else if (c < 2048) out += "%" + pad16(192 | (c >> 6)) + "%" + pad16(128 | (c & 63));
else out += "%" + pad16(224 | (c >> 12)) + "%" + pad16(128 | ((c >> 6) & 63)) + "%" + pad16(128 | (c & 63));
}
return out;
}
async function spToken() {
const res = await askNet("https://accounts.spotify.com/api/token", { method: "POST",
headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic " + base64(sp.id + ":" + sp.secret) },
body: "grant_type=refresh_token&refresh_token=" + enc(sp.refresh) }, "spotify token");
const text = res.text;
if (res.status === 0) throw new Error("Spotify: " + text);
if (res.status === 400 || res.status === 401) {  // wrong keys, or the token was withdrawn: no use asking again soon
sp.bad = true;
sp.wait = Date.now() + 60000;
return false;
}
if (!res.ok) throw new Error("Spotify token HTTP " + res.status);
const j = JSON.parse(text);
sp.token = String(j.access_token || "");
sp.until = Date.now() + (Number(j.expires_in) > 120 ? Number(j.expires_in) - 60 : 600) * 1000;
sp.bad = sp.token === "";
return !sp.bad;
}
async function spAsk(method, path) {
const init = { method: method, headers: { "Authorization": "Bearer " + sp.token } };
if (method !== "GET") {                          // (Spotify wants a length on every PUT and POST)
init.headers["Content-Type"] = "application/json";
init.body = "{}";
}
const res = await askNet("https://api.spotify.com/v1/me/player" + path, init, "spotify " + method + " " + path.split("?")[0]);
const text = res.text;
if (res.status === 0) throw new Error("Spotify: " + text);
if (res.status === 401) sp.token = "";           // the hour is over: a new token at the next turn
if (res.status === 429) sp.wait = Date.now() + 30000;
return { status: res.status, text: text };
}
async function spNow() {
const t0 = Date.now();
const got = await spAsk("GET", "?market=from_token&additional_types=episode");
const at = (t0 + Date.now()) / 2;
if (got.status === 204 || got.status === 202) {
sp.song = NOTHING;
return;
}
if (got.status !== 200) {
if (got.status >= 500) throw new Error("Spotify HTTP " + got.status);
return;
}
const j = JSON.parse(got.text), it = j && j.item;
if (j && j.device) {
sp.vol = typeof j.device.volume_percent === "number" ? j.device.volume_percent : -1;
sp.canVol = j.device.supports_volume !== false && sp.vol >= 0;
}
if (!it) {
sp.song = NOTHING;
return;
}
const who = [];
for (let i = 0; it.artists && i < it.artists.length && i < 3; i++) who.push(it.artists[i].name);
sp.song = song("music", j.is_playing ? "playing" : "paused", it.name, who.length ? who.join(", ") : it.show ? it.show.name : "",
it.album ? it.album.name : "", it.duration_ms / 1000, j.progress_ms / 1000, at, "Spotify");
}
function spQueue(text) {
const out = [], str = (at) => {
const a = text.indexOf('"', at + 7), b = text.indexOf('","', a);          // "name":"..."
return a > 0 && b > a && b - a < 300 ? JSON.parse(text.slice(a, b + 1)) : "";
};
let p = text.indexOf('"queue"');
for (let n = 0; p >= 0 && n < 2; n++) {
const d = text.indexOf('"duration_ms":', p);
if (d < 0) break;
const who = text.lastIndexOf('"artists":', d), born = text.lastIndexOf('"release_date"', d);
const title = str(text.indexOf('"name":', d)), artist = who > p ? str(text.indexOf('"name":', who)) : "";
const album = born > p ? str(text.lastIndexOf('"name":', born)) : "";
if (title) out.push(song("music", "playing", title, artist, album, parseInt(text.slice(d + 14, d + 24), 10) / 1000, 0, 0, "Spotify"));
p = text.indexOf('"uri"', text.indexOf('"track_number"', d));              // (the end of this song)
}
return out;
}
feeds.push(async (now) => {                        // "Spotify code": traded once for a refresh token
if (sp.code === "" || sp.id === "" || sp.secret === "" || now < netPause) return false;
await spLink(now);
return true;
});
feeds.push(async (now) => {
if (src !== "spotify" || sp.refresh === "" || sp.id === "" || sp.secret === "" || now < sp.wait || now < netPause) return false;
const job = sp.jobs.length > 0 || sp.volJob >= 0;
if (!job && now < sp.due && !(sp.song && sp.nextFor !== sp.song.key && now > sp.nextDue)) return false;
if (!sp.token || now > sp.until) {
if (!(await spToken())) return true;
}
if (sp.jobs.length) {                            // Start: play or pause
const got = await spAsk("PUT", "/" + sp.jobs.shift());
if (got.status === 403) say(W.premium[0], W.premium[1]);
else if (got.status === 404) say(W.noplayer[0], W.noplayer[1]);
sp.due = Date.now() + 700;
return true;
}
if (sp.volJob >= 0) {                            // the knob: the volume, the last value asked for
const v = sp.volJob;
sp.volJob = -1;
const got = await spAsk("PUT", "/volume?volume_percent=" + v);
if (got.status === 403 || got.status === 404) {
sp.canVol = got.text.indexOf("PREMIUM") < 0 ? false : sp.canVol;
vol.until = 0;
say((got.text.indexOf("PREMIUM") >= 0 ? W.premium : W.fixedvol)[0], (got.text.indexOf("PREMIUM") >= 0 ? W.premium : W.fixedvol)[1]);
}
sp.due = Date.now() + 1500;
return true;
}
if (now >= sp.due) {
await spNow();
sp.due = Date.now() + (sp.song && sp.song.kind === "music" && sp.song.state === "playing" ? 3000 : 5000);
if (sp.song && sp.nextFor !== sp.song.key && sp.nextDue < Date.now() - 60000) sp.nextDue = Date.now() + 6000;
return true;
}
if (changing(now, 1.5)) return false;            // what comes next: asked once a song, a few seconds into it
sp.nextFor = sp.song.key;
sp.next = [];
if (sp.song.kind !== "music") return false;
const got = await spAsk("GET", "/queue");
try {
if (got.status === 200 && got.text.length < 200000) sp.next = spQueue(got.text);
} catch (err) {
sp.next = [];
}
return true;
});
const WORDS_KEPT = 20;
const store = { list: [], mem: {}, save: [], tried: {} };
const lyr = { key: "", state: "", t: null, s: null, e: null, w: null, since: 0, why: "" };  // state: "want" | "asking" | "ok" | "none"; why (none): "none" | "script"
async function lrc(query) {
const res = await askNet("https://lrclib.net/api/get?" + query, { method: "GET", headers: { "Lrclib-Client": "Vinyl for BUSY Bar 0.3" } }, "lrc");
const text = res.text;
if (res.status === 404 || res.status === 400) return "";
if (!res.ok) throw new Error("lrclib " + (res.status ? "HTTP " + res.status : text));
await idle();                                     // (an answer can be 40 000 letters long: the page gets its turn before it is searched - and no plate is at work)
const a = text.indexOf('"syncedLyrics":"');
if (a < 0) return "";
let b = a + 16;
while (b < text.length) {                        // (to the quote that ends it: one that has no backslash before it)
b = text.indexOf('"', b);
if (b < 0) return "";
let k = b - 1, esc = 0;
while (text[k] === "\\") {
esc++;
k--;
}
if (esc % 2 === 0) break;
b++;
}
return JSON.parse(text.slice(a + 15, b + 1));
}
async function cutLyrics(text) {
const raw = text.replace(/<[^>]*>/g, "").split("\n");
let all = "";
for (let i = 0; i < raw.length; i += 12) {       // (a dozen lines at a time: folding the letters takes the bar a while)
all += (i ? "\n" : "") + plain(raw.slice(i, i + 12).join("\n"));
await idle();
}
if (all.replace(/[^A-Z]/g, "").length < 0.5 * text.replace(/[\s\d\[\]:.,'"!?()-]/g, "").length) return "script";      // (mostly letters the bar has not got)
const lines = all.split("\n"), t = [], s = [];
for (let i = 0; i < lines.length; i++) {
let line = lines[i], at = -1;
while (line[0] === "[") {
const end = line.indexOf("]");
if (end < 0) break;
const tag = line.slice(1, end).split(":");
if (tag.length >= 2 && at < 0) {
const v = Number(tag[0]) * 60 + Number(tag[1]);
if (v >= 0) at = Math.round(v * 100) / 100;
}
line = line.slice(end + 1);
}
if (at >= 0) {
t.push(at);
s.push(line.replace(/\[/g, "(").replace(/\]/g, ")").replace(/^ +| +$/g, ""));
}
if (i % 8 === 7) await idle();                  // (the bar is slow: the page goes on between two handfuls of lines)
}
for (let i = 1; i < t.length; i++) if (t[i] < t[i - 1]) return null;    // not in order: not a file to trust
return t.length < 2 ? null : { t: t, s: s };
}
async function askWords(c) {
if (D.demo) {                                    // TEST builds (--demo-lyrics): made-up songs, no request
const made = D.demo[c.rawTitle + "|" + c.rawArtist], w = made ? await cutLyrics(made) : null;
return w === "script" ? -1 : w || 0;
}
const who = "artist_name=" + enc(c.rawArtist.split(",")[0]), len = c.dur ? "&duration=" + Math.round(c.dur) : "";
let text = await lrc(who + "&track_name=" + enc(c.rawTitle) + (c.rawAlbum ? "&album_name=" + enc(c.rawAlbum) : "") + len);
const bare = c.rawTitle.replace(/\s+[-(\[].*$/, "");                    // "Song - Remastered 2011", "Song (Live)" -> "Song"
if (!text) text = await lrc(who + "&track_name=" + enc(bare) + len);
if (!text && len) text = await lrc(who + "&track_name=" + enc(bare));
const w = text ? await cutLyrics(text) : null;
return w === "script" ? -1 : w || 0;              // (-1: words there are, in a script the bar cannot draw)
}
function keep(h, w) {
const want = {};
want[h] = 1;
if (cur.kind === "music") want[wordsKey(cur)] = 1;
for (let i = 0; i < coming.length; i++) want[wordsKey(coming[i])] = 1;
store.mem[h] = w;
for (const k in store.mem) if (!want[k]) delete store.mem[k];
}
const listed = (h) => (store.list.indexOf(h) >= 0 ? 1 : store.list.indexOf(h + "-") >= 0 || store.list.indexOf(h + "~") >= 0 ? -1 : 0);
const keptFile = (x) => x.slice(-1) !== "-" && x.slice(-1) !== "~";
async function wordsOf(c) {
const h = wordsKey(c);
if (store.mem[h] !== undefined) return store.mem[h];
let w;
if (!(c.title && c.artist) || listed(h) < 0) w = store.list.indexOf(h + "~") >= 0 ? -1 : 0;     // (no name to ask by, or known to have none)
else if (listed(h) > 0) {
const got = await call("GET", "storage/read?path=/ext/data/w" + h + ".json");
try {
const j = got.ok ? JSON.parse(got.text) : null;
if (j && j.t && j.s && j.t.length === j.s.length && j.t.length > 1) w = j;
} catch (err) {
w = undefined;                               // a file that cannot be read: asked for anew
}
}
if (w === undefined) {
w = await askWords(c);
store.save.push([h, w]);
}
keep(h, w);
return w;
}
const KROOM = EDGE - TXT;           // a row's room beside the turntable: columns 23 ... 70
const PIECE_MIN = 0.6, PIECE_FAST = 0.4;          // seconds a piece gets at least; in a line with too many words for that
const SPACE = (D.small[" "] || 4) + 2 * D.smallGap;   // what a space adds between two words
function cutPieces(text) {
const words = text.split(" "), n = words.length, w = [];
let all = -SPACE;
for (let i = 0; i < n; i++) {
w.push(smallWidth(words[i]));
if (w[i] > KROOM) return wrap(text, KROOM);      // (a word too long for a row: the slow way, with a hyphen)
all += w[i] + SPACE;
}
if (all <= KROOM) return [text];
const fill = (room) => {
const rows = [];
let row = "", width = 0;
for (let i = 0; i < n; i++) {
if (row && width + SPACE + w[i] > room) {
rows.push(row);
row = "";
}
width = row ? width + SPACE + w[i] : w[i];
row = row ? row + " " + words[i] : words[i];
}
rows.push(row);
return rows;
};
const most = fill(KROOM);
for (let room = Math.ceil(all / most.length) + 2; room < KROOM; room += 5) {     // the narrowest room that needs no more rows
const rows = fill(room);
if (rows.length <= most.length) return rows;
}
return most;
}
async function setLyr(w, key) {
if (!w || w === -1) {
if (lyr.key !== key) return;
lyr.t = lyr.s = lyr.e = lyr.w = null;
lyr.state = "none";
lyr.why = w === -1 ? "script" : "none";         // (said once, then the song's names: see noWords)
return;
}
const t = [], s = [], e = [];
for (let i = 0; i < w.t.length; i++) {
const start = w.t[i], end = Math.min(i + 1 < w.t.length ? w.t[i + 1] : start + 6, start + 14);
if (!w.s[i]) {
t.push(start);
s.push("");
e.push(end);
continue;
}
const rows = cutPieces(w.s[i]), n = rows.length, part = [];
let all = 0;
for (let k = 0; k < n; k++) {
part.push(Math.max(1, rows[k].replace(/ /g, "").length));
all += part[k];
}
const span = Math.min(end - start, Math.max(2.4, 1 + 0.14 * all));       // the time the line is sung in
let at = start;
for (let k = 0; k < n; k++) {
if (k > 0 && at > end - 0.2) break;          // (no time left for it: the next line is here)
t.push(at);
s.push(rows[k]);
e.push(end);
if (k > 0) e[e.length - 2] = at;
at += n * PIECE_MIN >= span ? Math.max(PIECE_FAST, span / n) : PIECE_MIN + (span - n * PIECE_MIN) * part[k] / all;
}
if (i % 3 === 2) {                              // a few lines at a time: measuring takes the bar a while, and the
await idle(4);                                // turntable's films, the keys and the clock get their turn between
while (deck.posting && lyr.key === key) await sleep(30);       // (never while a film is on its way to the bar)
}
}
if (lyr.key !== key) return;                     // (another song has come meanwhile)
lyr.t = t;
lyr.s = s;
lyr.e = e;
lyr.w = [];
lyr.state = "ok";
}
feeds.push(async (now) => {                        // the words of the song that plays
if (lyr.state !== "want" || cur.kind !== "music" || cur.key !== lyr.key) return false;
const c = cur, key = lyr.key, h = wordsKey(c), net = store.mem[h] === undefined && listed(h) === 0 && !!(c.title && c.artist) && !D.demo;
if (net && now < netPause) return false;
lyr.state = "asking";
while ((deck.posting || (net && deck.hold)) && Date.now() - lyr.since < (net ? 1200 : 600) && lyr.key === key && !stopped) await sleep(50);
try {
const w = await wordsOf(c);
if (lyr.key === key) await setLyr(w, key);
} catch (err) {
if (lyr.key === key) {
lyr.state = "want";                           // no connection: asked again when the internet is back -
nolyr.miss = key;                             // ... and said once for this song (see wordsNote; the names stay meanwhile)
}
throw err;
}
return net;
});
feeds.push(async (now) => {                        // the words of the songs that come next: ahead of time, one request at a time
if (cur.kind !== "music" || !lyricsOn || lyr.state === "want" || lyr.state === "asking" || changing(now, 1.5) || deck.busy || deck.posting) return false;
for (let i = 0; i < coming.length; i++) {
const c = coming[i], h = wordsKey(c);
if (store.mem[h] !== undefined || store.tried[h] > now - 120000) continue;
const net = listed(h) === 0 && !!(c.title && c.artist) && !D.demo;
if (net && now < netPause) return false;
store.tried = {};
store.tried[h] = now;
await wordsOf(c);
return net;
}
return false;
});
feeds.push(async (now) => {                        // new words go into the app's storage, when no line is about to change
if (store.save.length === 0 || changing(now, 1.5) || deck.busy || deck.posting || dimBusy() || tag.on || vol.on) return false;    // (nor while the turntable is being changed, a plate or the label is at work: a write holds the bar up)
const pair = store.save.shift(), h = pair[0], w = pair[1];
if (w && w !== -1) await call("POST", "storage/write?path=/ext/data/w" + h + ".json", JSON.stringify(w), "application/octet-stream");
store.list = store.list.filter((x) => x !== h && x !== h + "-" && x !== h + "~");
store.list.push(w === -1 ? h + "~" : w ? h : h + "-");
while (store.list.length > WORDS_KEPT) {
const old = store.list.shift();
if (keptFile(old)) await call("DELETE", "storage/remove?path=/ext/data/w" + old + ".json");
}
await call("POST", "storage/write?path=/ext/data/words.json", JSON.stringify({ v: 1, list: store.list }), "application/octet-stream");
return false;
});
async function loadWordsList() {
if (D.fresh) return;                             // TEST builds (--fresh): nothing kept is read
const got = await call("GET", "storage/read?path=/ext/data/words.json");
try {
const j = got.ok ? JSON.parse(got.text) : null;
store.list = j && j.list && j.list.filter ? j.list.filter((x) => typeof x === "string" && /^[0-9a-z]{2,16}[-~]?$/.test(x)).slice(-WORDS_KEPT) : [];
} catch (err) {
store.list = [];                               // rubbish in the file: a clean start
}
}
let calm = 0;                       // until then the page of names stands (the app has just come up: the turntable is being laid)
let songSince = 0;                  // when the song that plays was first seen: its name is shown for a moment
const END_S = 3.0, OPEN_MS = 2600, OPEN_MIN_MS = 1000, CLOSE_S = 2.3, OVER_MS = 2500;
const LAST_S = 0.35, LAST_ROWS_S = 0.12;
const fin = { key: "", at: 0 };     // when the song that plays reached its length
const herald = { key: "", at: 0 };  // the next song's name, put up at the very end of this one (the source has told what follows)
function endWatch(now) {
if (cur.kind !== "music" || !(cur.dur > 0)) {
fin.key = "";
fin.at = 0;
return;
}
if (fin.key !== cur.key) {
fin.key = cur.key;
fin.at = 0;
}
const left = cur.dur - posNow(now);
if (left > END_S + 1) fin.at = 0;                 // (it has gone back: a leap, or the same song from its beginning)
else if (left <= 0.05 && cur.state === "playing" && !fin.at) fin.at = now;
}
const tail = (now) => (cur.kind === "music" && cur.state === "playing" && cur.dur > 0 && !(fin.at && fin.key === cur.key && now - fin.at > OVER_MS)
? cur.dur - posNow(now) : 1e9);
function soon(now) {
if (cur.kind !== "music" || cur.state !== "playing") return 250;
if (coming.length && herald.key !== coming[0].key && tail(now) <= 0.03) return 15;       // (the next song's name is due now)
let ms = 250;
const open = songSince + OPEN_MIN_MS - now, left = tail(now), edges = [FROM_S, END_S + 0.3, OUT_S, LAST_S, 0.25, LAST_ROWS_S, 0.03];
if (open > 0) ms = Math.min(ms, open + 5);
for (let i = 0; left < 1e8 && i < edges.length; i++) {
if (left > edges[i]) ms = Math.min(ms, 1000 * (left - edges[i]) + 5);
}
if (face !== "kara" && view === "lyrics" && lyr.state === "ok" && lyr.key === cur.key && lyr.t) {
const pos = posNow(now) + lead1(), i = lineAt(pos);
if (i + 1 < lyr.t.length) ms = Math.min(ms, 1000 * (lyr.t[i + 1] - pos) + 5);
}
return Math.max(15, Math.round(ms));
}
function lyrLast() {
for (let i = lyr.t.length - 1; i >= 0; i--) {
if (lyr.s[i]) return lyr.e[i];
}
return -1;
}
function newSong(now) {
lyr.key = cur.kind === "music" ? cur.key : "";
lyr.since = now;
lyr.t = lyr.s = lyr.e = lyr.w = null;
lyr.state = "none";
lyr.why = "";
songSince = herald.key === cur.key && now - herald.at < 6000 ? herald.at : now;      // (its name may stand already)
kar.on = false;
if (cur.kind !== "music" || !lyricsOn) return;
const w = store.mem[wordsKey(cur)];
if (w !== undefined) {                            // fetched ahead: there at once (cut into its pieces first)
lyr.state = "asking";
setLyr(w, lyr.key).catch((err) => report("words", err));
} else lyr.state = "want";
}
function lineAt(pos) {
const t = lyr.t;
let lo = 0, hi = t.length - 1, at = -1;
while (lo <= hi) {
const mid = (lo + hi) >> 1;
if (t[mid] <= pos) {
at = mid;
lo = mid + 1;
} else {
hi = mid - 1;
}
}
return at;
}
const lineEnd = (i) => lyr.e[i];
function changing(now, sec) {
if (face !== "kara" || !lyr.t || cur.state !== "playing" || cur.frozen) return false;     // (frozen: PLAY was pressed and the song's clock waits for the Mac - nothing is about to change)
const pos = posNow(now) + lead1(), i = lineAt(pos);
return (i + 1 < lyr.t.length && lyr.t[i + 1] - pos < sec) || (i >= 0 && pos - lyr.t[i] < 0.3);
}
const SOFT = 0.42;                  // the waiting row's share of light
const kar = { on: false, line: [-1, -1], sung: -1, fill: -1, at: 0, wait: 250, old: null };
const KID = ["ka", "kb"], KY = [RA, RB];
const lineOf = (i) => (i >= 0 ? lyr.s[i] : " ");
const rowText = (r, part) => letters(KID[r], lineOf(kar.line[r]), TXT, KY[r], INK, kar.line[r] < 0 ? 0 : part, 2);
function widthOf(i) {
if (lyr.w[i] === undefined) lyr.w[i] = smallWidth(lyr.s[i]);
return lyr.w[i];
}
function nextLine(i) {
for (let j = i + 1; j < lyr.t.length && j < i + 9; j++) {
if (lyr.s[j]) return j;
}
return -1;
}
const WORDS_LEAD_MS = 250;
const BAR_ALLOWANCE_MS = 100;
let wordsTune = 0;
const reqs = [60, 60, 60];
const reqMedian = () => reqs.slice().sort((a, b) => a - b)[reqs.length >> 1];
const lead1 = () => clamp(WORDS_LEAD_MS + BAR_ALLOWANCE_MS + wordsTune + reqMedian() * (deck.busy ? 1.3 : 1), 0, 1200) / 1000;
async function karTick(now) {
if (kar.on && cur.state !== "playing") {           // paused: nothing moves - the rows are only kept alive
kar.wait = 250;
if (now - kar.at > 45000) {
kar.at = now;
await put([rowText(0, kar.sung === 0 ? 1 : SOFT), rowText(1, kar.sung === 1 ? 1 : SOFT)]);
}
return;
}
const pos = posNow(now), ahead = pos + lead1();
const i = lineAt(ahead), accent = D.recs[recordOf(cur)][0].slice(0, 7);
let S = i >= 0 && lyr.s[i] && ahead < lineEnd(i) ? i : -1;          // the piece being sung (or about to be, by one request)
const held = kar.sung >= 0 ? kar.line[kar.sung] : -1;
if (kar.on && held >= 0 && S !== held && lyr.t[held] > ahead && lyr.t[held] - ahead < 0.6) S = held;   // (the position wavers a little: no step back for that)
const N = nextLine(S >= 0 ? S : i);                                  // the one that comes after it
const hide = () => (colourOn && have.kc ? [letters("kc", " ", TXT, RA, accent, 0, 3)] : []);
let top, bot, sung;
if (S >= 0) {
sung = kar.on && kar.line[0] === S ? 0 : kar.on && kar.line[1] === S ? 1 : kar.on && held >= 0 && S > held && S <= held + 2 ? 1 - kar.sung : 0;
top = sung === 0 ? S : N;
bot = sung === 0 ? N : S;
} else {                                           // a rest: what was sung is gone, the next piece waits (at the top, if it is new)
sung = -1;
const w = kar.on && N >= 0 && kar.line[1] === N ? 1 : 0;
top = w === 0 ? N : -1;
bot = w === 1 ? N : -1;
}
kar.wait = 250;
if (!kar.on) {                                     // the rows come up (over the page of names, which goes in the same two steps)
const old = kar.old;
kar.old = null;
kar.line = [top, bot];
kar.sung = sung;
kar.fill = -1;
await put([rowText(0, (sung === 0 ? 1 : SOFT) * 0.45), rowText(1, (sung === 1 ? 1 : SOFT) * 0.45)].concat(hide(), old ? wirePage(old.page, old.set, 0.3) : []));
await put([rowText(0, sung === 0 ? 1 : SOFT), rowText(1, sung === 1 ? 1 : SOFT)].concat(old ? wirePage(old.page, old.set, 0) : [], old && old.page.sc ? [wmask(null)] : []));
if (old) await wipe(idsOf(old.page, old.set));
dbg("LINE " + S + " top, next " + N + " pos " + posNow(Date.now()).toFixed(2) + " lag " + Math.round(lag));
kar.on = true;
kar.at = now;
kar.wait = 30;
return;
}
if (top !== kar.line[0] || bot !== kar.line[1] || sung !== kar.sung) {
kar.line = [top, bot];
kar.sung = sung;
kar.fill = -1;
const sent = Date.now();
await put([rowText(0, sung === 0 ? 1 : SOFT), rowText(1, sung === 1 ? 1 : SOFT)].concat(hide()));
if (Date.now() - sent > 4) reqs.push(Date.now() - sent);         // (nothing new to send: no request, no measure)
if (reqs.length > 9) reqs.shift();
dbg("LINE " + S + (sung === 1 ? " bottom" : " top") + ", next " + N + " pos " + posNow(Date.now()).toFixed(2) + " lag " + Math.round(lag) +
(S >= 0 ? " ON " + Math.round(1000 * (posNow(Date.now()) - lyr.t[S])) : ""));     // ON: on screen this many ms after (-: before) the piece's time
kar.at = now;
kar.wait = 30;
return;
}
if (now - kar.at > 45000) {                       // the rows sent again before the bar lets them go
kar.at = now;
await put([rowText(0, kar.sung === 0 ? 1 : SOFT), rowText(1, kar.sung === 1 ? 1 : SOFT)]);
return;
}
const due = S >= 0 ? lineEnd(S) - ahead : N >= 0 ? lyr.t[N] - ahead : 60;      // until the next change
kar.wait = clamp(Math.round(1000 * due), 20, 250);
if (S < 0 || kar.sung < 0 || cur.state !== "playing") return;
if (colourOn) {
const r = kar.sung, fill = Math.round(widthOf(S) * clamp((pos - lyr.t[S]) / Math.max(0.4, lineEnd(S) - lyr.t[S] - 0.15), 0, 1));
if (fill !== kar.fill) {
kar.fill = fill;
await put([letters("kc", lineOf(S), TXT, KY[r], accent, fill < 1 ? 0 : 1, 3, ',"width":' + Math.max(1, fill))]);
}
kar.wait = Math.min(kar.wait, 30);
}
}
async function karHide() {
if (kar.on) await put([rowText(0, kar.sung === 0 ? 0.35 : 0.15), rowText(1, kar.sung === 1 ? 0.35 : 0.15)]);
await wipe(["ka", "kb", "kc"]);
kar.on = false;
kar.line = [-1, -1];
kar.sung = -1;
}
const prog = { on: false, sent: "", at: 0 };
async function progTick(now) {
if (!lined) {
if (prog.on) await wipe(["pr1", "pr2", "pr3"]);
prog.on = false;
prog.sent = "";
return;
}
if (changing(now, 0.3)) return;
const pos = posNow(now), w = clamp(Math.round(48 * pos / cur.dur), 1, 48), accent = D.recs[recordOf(cur)][0].slice(0, 7);
const beat = cur.state === "playing" && cur.dur - pos < 10 ? Math.floor(now / 600) % 2 : 0, key = w + accent + beat;
if (key === prog.sent && now - prog.at < 45000) return;
prog.sent = key;
prog.at = now;
prog.on = true;
await put([block("pr1", TXT, 15, 48, 1, "#34363EFF", 102), block("pr2", TXT, 15, w, 1, accent + (beat ? "80" : "FF"), 103),
block("pr3", TXT + w - 1, 15, 1, 1, beat ? "#FFFFFF9A" : "#FFFFFFFF", 104)]);     // (over the mask of long names, wm)
}
const vol = { until: 0, target: -1, click: 0, on: false, sent: "", at: 0 };
function volParts(part) {
const x = onPage === "proj" ? VTXT : TXT, room = EDGE - x, v = Math.max(0, vol.target), n = String(v), w = Math.max(1, Math.round(room * v / 100));
const accent = cur.kind === "music" ? D.recs[recordOf(cur)][0].slice(0, 7) : LAMP, a = pad16(Math.round(255 * part));
return [block("vk", x, 0, EDGE + 1 - x, 15, "#000000" + pad16(Math.round(255 * Math.min(1, part * 1.6))), 110),
letters("vt", W.volume, x, RA, GREY, part, 111), letters("vn", n, EDGE - smallWidth(n), RA, INK, part, 111),
block("vb1", x, 9, room, 3, "#34363E" + a, 111), block("vb2", x, 9, w, 3, (v ? accent : "#34363E") + a, 112),
block("vb3", x + w - 1, 9, 1, 3, (v ? "#FFFFFF" : "#34363E") + a, 113)];
}
async function volStep(now) {
if (now < vol.until) {
if (vol.on && vol.sent === String(vol.target)) return;
await put(volParts(1));                        // (one request: there at once)
vol.on = true;
vol.sent = String(vol.target);
vol.at = now;
} else if (vol.on) {
await put(volParts(0.4));
await put(volParts(0));
vol.on = false;
vol.sent = "";
vol.at = now;
}
}
const wav = { made: "", on: false, still: false, dim: "", at: 0, loopAt: 0, pre: false };
const waveKey = () => recordOf(cur) + "|" + D.waves[sum(cur.title || cur.key, 7, 1000003) % D.waves.length];
const waveParts = (xc, xm, xs) => {
const k = wav.made.split("|");
return [film("wv_c", "wash" + k[0], xc, 2, false, LONG), film("wv_m", "wave_" + k[1], xm, 3, true, LONG), film("wv_s", "wave_still", xs, 3, false, LONG)];
};
const waveDim = (a) => block("wv_k", TXT, 0, EDGE + 1 - TXT, 15, "#000000" + a, 4);
function waveSettle(now) {
const kind = wav.made.split("|")[1], ph = Math.floor(Math.max(0, now - wav.loopAt) / 1000) % 5;
wav.still = true;
post([film("wv_m", "wave_" + kind + "_d" + ph, TXT, 3, false, LONG), film("wv_s", "wave_still", OFF, 3, false, LONG)]);
}
async function waveReady() {
if (view !== "waves" || cur.kind !== "music" || onPage !== "deck" || deck.posting || wav.on) return;
const key = waveKey();
if (wav.made === key) return;
wav.made = key;
await show1(waveParts(OFF, OFF, OFF).concat([waveDim("00")]));
wav.loopAt = Date.now();
}
async function waveTick(now) {
const still = cur.state !== "playing", last = cur.dur > 0 && cur.dur - posNow(now) < 8;
if (!wav.on) {                                     // it grows out of black
await put(waveParts(TXT, still ? OFF : TXT, still ? TXT : OFF).concat([waveDim("FF")]));
await put([waveDim("90")]);
await put([waveDim(last ? "70" : "00")]);
wav.on = true;
wav.still = still;
wav.dim = last ? "70" : "00";
wav.at = now;
return;
}
if (still !== wav.still) {                         // paused: it settles to its line (0.4 s, begun at once); play: it rises out of it
if (still) waveSettle(now);
else {
const kind = wav.made.split("|")[1];
await put([film("wv_m", "wave_" + kind + "_up", TXT, 3, false, LONG), film("wv_s", "wave_still", OFF, 3, false, LONG)]);
await sleep(460);                              // (the film ends on the loop's first picture: the loop goes on from it)
await put([film("wv_m", "wave_" + kind, TXT, 3, true, LONG)]);
wav.loopAt = Date.now();
}
wav.still = still;
} else if ((last ? "70" : "00") !== wav.dim) {     // the song's last seconds: it thins out
wav.dim = last ? "70" : "00";
await put([waveDim(wav.dim)]);
} else if (now - wav.at > 1500000) {
wav.at = now;
await put(waveParts(TXT, still ? OFF : TXT, still ? TXT : OFF));
wav.loopAt = Date.now();
}
}
async function waveHide() {
if (!wav.on) return;
await put([waveDim("B0")]);
await put([film("wv_c", "wash" + wav.made.split("|")[0], OFF, 2, false, LONG), film("wv_m", "wave_still", OFF, 3, false, LONG), film("wv_s", "wave_still", OFF, 3, false, LONG), waveDim("00")]);
wav.on = false;
wav.made = "";
}
async function wavePre() {
wav.pre = true;
if (have.wv_m) return;
await post([film("wv_c", "wash0", OFF, 2, false, LONG), film("wv_m", "wave_still", OFF, 3, false, LONG), film("wv_s", "wave_still", OFF, 3, false, LONG), waveDim("00")]);
}
const pz = { on: false, at: 0 };
const pzFilm = (x) => film("pz", "pausemark", x, 49, false, LONG, 3);
async function pauseStep(now) {
const lies = deck.state === "stopped" && (!deck.busy || (deck.seq === "halt" && !!deck.move && (deck.move.kind === "outq" || deck.move.kind === "rest")));
const paused = hold && hold.key === cur.key ? hold.state !== "playing" : cur.state !== "playing";       // (a key's word counts before the Mac's)
const want = onPage === "deck" && cur.kind === "music" && paused && lies && deck.rec === recordOf(cur);
if (want === pz.on && !(now - pz.at > 600000 && have.pz)) return;     // (made with the page, out of sight: a pause only moves it)
pz.on = want;
pz.at = now;
await put([pzFilm(want ? 2 : OFF)]);
}
const link = { off: false, lamp: 0, lit: false, said: false };
function saidOffline(now) {
setTag(W.offline, now);
link.said = true;
}
function backOnline(now) {
if (link.said) setTag(W.online, now);
link.said = false;
}
async function linkStep(now) {
const news = Math.max(helper.seen, wifi.okAt), byWifi = wifiList().length > 0;
const off = src === "helper" && now - Math.max(news, byWifi ? wifi.upAt : 0) > (wifi.okAt >= helper.seen ? 6000 : 8000) &&
(byWifi ? wifi.up && wifi.miss >= 2 : helper.read - helper.seen > 6500);
if (off && !link.off) saidOffline(now);
if (!off && link.off) {
if (src === "helper") backOnline(now);
await wipe(["lk"]);
}
link.off = off;
if (off && now - link.lamp > 800 && onPage === "deck") {
link.lamp = now;
link.lit = !link.lit;
await put([block("lk", 20, 0, 2, 2, TAG_BRASS + (link.lit ? "FF" : "30"), 95)]);
}
}
const TAG_INK = "#E6EAF2", TAG_BRASS = "#E2B662";
function tagParts(part) {
const x = onPage === "proj" ? VTXT : TXT, room = EDGE + 1 - x, text = tag.text || " ", a = pad16(Math.round(255 * part));
const ws = text.split(" ");
let wide = ws.length <= 2 ? -3 : 1e9;
for (let i = 0; i < ws.length && wide < 1e9; i++) wide = D.tagw && D.tagw[ws[i]] ? wide + D.tagw[ws[i]] + 3 : 1e9;
const big = wide <= room, w = big ? wide : smallWidth(text), tx = x + Math.max(0, Math.floor((room - w) / 2));
const set = (id, s, at, p) => (big ? letters(id, s, at, 1, TAG_INK, p, 121).replace('"font":"small"', '"font":"normal"') : letters(id, s, at, 3, TAG_INK, p, 121));
const parts = [block("mk", x, 0, room, 15, "#000000" + pad16(Math.round(255 * Math.min(1, part * 1.7))), 120),
set("ml", big ? ws[0] : text, tx, part), block("mu", tx, 11, Math.max(1, w), 1, TAG_BRASS + a, 121)];
if (big && ws.length > 1) parts.push(set("mm", ws[1], tx + D.tagw[ws[0]] + 3, part));
else if (have.mm) parts.push(set("mm", " ", tx, 0));
return parts;
}
async function tagStep(now) {
if (now < tag.until && now >= vol.until) {
if (tag.on && tag.sent === tag.text) return;
if (!tag.on) await put(tagParts(0.55));        // (there with the first request; full with the second)
await put(tagParts(1));
tag.on = true;
tag.sent = tag.text;
} else if (tag.on) {
if (now < vol.until && !vol.on) return;
if (now >= vol.until) await put(tagParts(0.45));
await put(tagParts(0));
tag.on = false;
tag.sent = "";
}
}
const guide = { state: "wait", page: 0, at: 0 };   // "wait" (not shown yet) | "on" | "done"
const guidePage = (n, x) => film("g_p" + n, "guide" + (n + 1), x, 150 + n, true, LONG);
const guideNext = (x) => film("g_nx", "guide_next", x, 170, true, LONG, D.guide.next[1]);
const guidePlate = (a) => block("g_bk", 0, 0, 72, 16, "#000000" + a, 149);
const guideAll = (shown) => {                      // every part of the book; shown: its page on screen, else all out of sight
const parts = shown ? [guidePlate("FF"), guideNext(D.guide.next[0])] : [guideNext(OFF)];
for (let n = 0; n < D.guide.pages; n++) parts.push(guidePage(n, shown && n === guide.page ? 0 : OFF));
return parts;
};
const guideIds = () => {
const ids = ["g_bk", "g_nx"];
for (let n = 0; n < D.guide.pages; n++) ids.push("g_p" + n);
return ids;
};
const pageBase = () => (onPage === "deck" ? (LAY.plat.on < 0 || LAY.arm.on < 0 ? deckBase(0) : [block("km", 0, 0, TXT, 16, "#000000FF", 5), layHere("plat"),
layHere("arm", deck.armOn && deck.state === "playing" ? "arm_p" + deck.arm : "arm_rest")])
: [film("p_st", "reel_still", 0, 30, false, STILL)]);
async function guideUnder() {
const now = Date.now();
choose(now);                                     // (as things are now: the book may have lain open for a while)
await post(pageBase());
lined = onPage === "deck" && cur.kind === "music" && cur.dur > 0;
const old = txt.page, oldSet = txt.set;
await putWords(page(now), true);
if (old) await wipe(idsOf(old, oldSet));
}
async function guideMake(soft) {
if (soft) {
await post([guidePlate("60")]);
await sleep(30);
await post([guidePlate("B8")]);
await sleep(30);
}
guide.page = 0;
await post([guidePlate("FF"), guideNext(D.guide.next[0]), guidePage(0, 0), titleFilm(OFF)]);     // (these lie ready: this only moves them)
const rest = [];
for (let n = 1; n < D.guide.pages; n++) rest.push(guidePage(n, OFF));
await post(rest);                                // the other pages, out of sight (made now, if this start has not made them yet)
guide.state = "on";
guide.at = Date.now();
}
const TITLE_MS = 4000;
const title = { on: false, until: 0 };
const titleFilm = (x) => film("t_pg", "title", x, 148, true, LONG);
async function titleMake(fromBook) {
if (fromBook) {
await post([guidePlate("FF"), guidePage(guide.page, OFF), guideNext(OFF), titleFilm(0)]);
await post([guidePlate("B4")]);
await sleep(25);
await post([guidePlate("6E")]);
await sleep(25);
await post([guidePlate("30")]);
await sleep(25);
await wipe(["g_bk"]);
} else await post([titleFilm(0)]);
title.on = true;
title.until = Date.now() + TITLE_MS;
}
async function titleRun() {
let go = false, book = false;
await guideUnder();                              // the app's own page, laid under it meanwhile
while (!stopped && !go && !book) {
go = ctl.start;
book = ctl.ok && !go;
ctl.turn = 0;
ctl.ok = ctl.start = false;
if (go || book) break;
const left = title.until - Date.now();
if (left <= 0) go = true;
else await nap(left);
}
if (stopped) return;
title.on = false;
if (book) {
await guideMake(true);
return;
}
await post([guidePlate("FF"), titleFilm(OFF)]);
const now = Date.now();
choose(now);
calm = now + 1200;
await guideUnder();
await post([guidePlate("B4")]);
await sleep(25);
await post([guidePlate("6E")]);
await sleep(25);
await post([guidePlate("30")]);
await sleep(25);
await wipe(guideIds().concat(["t_pg"]));
if (txt.page && txt.page.sc) {
txt.page.sc.t0 = Date.now();
txt.page.sc.end = txt.page.sc.t0 + txt.page.sc.span;
txt.page.sc.unit = unitOf(txt.page.sc);
}
vol.at = 0;
ctl.turn = 0;
ctl.ok = ctl.start = false;
}
async function guideRun() {
const last = D.guide.pages - 1;
let fwd = 0, back = 0, enter = false;
onBack = () => {                                 // Back: the page before - on the first page it closes the book
if (guide.page === 0) enter = true;
else back++;
return true;
};
try {
await guideUnder();                            // (while the first page is being read)
while (!stopped && !enter) {
const t = ctl.turn;
fwd += (ctl.ok ? 1 : 0) + (ctl.start ? 1 : 0) + Math.max(0, t);
back += Math.max(0, -t);
ctl.turn = 0;
ctl.ok = ctl.start = false;
if (guide.page === last && (fwd || back)) enter = true;      // the last page: any key or turn closes the book
else if (fwd || back) {                                      // one page for one press or click, never more
const to = fwd ? guide.page + 1 : Math.max(0, guide.page - 1);
if (fwd) fwd--;
else back--;
if (to !== guide.page) {
await post([guidePage(to, 0), guidePage(guide.page, OFF)]);
guide.page = to;
}
} else {
if (Date.now() - guide.at > 1200000) {                     // (it may lie open for hours: sent again now and then)
guide.at = Date.now();
await post(guideAll(true));
}
await nap(60000);
}
}
} finally {
onBack = null;
}
if (stopped) return;
guide.state = "done";
await call("POST", "storage/write?path=/ext/data/seen.json", '{"guide":1}', "application/octet-stream");
await titleMake(true);
ctl.turn = 0;                                    // the key that closed the book does nothing else
ctl.ok = ctl.start = false;
}
const setup = { on: false, page: 0, at: 0 };
const setupPage = (n, x) => film("s_p" + n, "setup" + (n + 1), x, 150 + n, false, LONG);
const setupIds = () => {
const ids = ["g_bk", "s_nx", "s_fd", "b_pl", "b_t0", "b_t1", "b_t2", "b_t3", "b_t4"];
for (let n = 0; n < D.guide.setup; n++) ids.push("s_p" + n);
return ids;
};
function backParts() {                              // the back screen (160 x 80): the plate, and the words beside the code
const x = D.guide.code[0], y = D.guide.code[1], text = (id, s, font, yy, colour) => '{"id":"' + id + '","type":"text","text":' + JSON.stringify(s) +
',"font":"' + font + '","x":' + x + ',"y":' + yy + ',"align":"top_left","color":"' + colour + '","display":"back","timeout":' + LONG + ',"z_index":6}';
for (let i = 0; i < 5; i++) have["b_t" + i] = 1;
have.b_pl = 1;
return ['{"id":"b_pl","type":"animation","path":"animations/back_plate.anim","x":0,"y":0,"align":"top_left","loop":false,"section":"default","display":"back","timeout":' + LONG + ',"z_index":2}',
text("b_t0", W.back[0], "bold", y - 2, "#FFFFFFFF"), text("b_t1", W.back[1], "small", y + 16, "#FFFFFFC0"),
text("b_t2", W.back[2], "small", y + 36, "#FFFFFFE0"), text("b_t3", W.back[3], "small", y + 46, "#FFFFFFE0"), text("b_t4", W.back[4], "small", y + 56, "#FFFFFFE0")];
}
async function setupMake(soft) {
if (soft) {
await post([guidePlate("60")]);
await sleep(30);
await post([guidePlate("B8")]);
await sleep(30);
}
setup.page = 0;
const parts = [guidePlate("FF"), film("s_nx", "guide_next", D.guide.setupNext[0], 170, true, LONG, D.guide.setupNext[1]), film("s_fd", "setup_found", OFF, 160, false, LONG)];
for (let n = 0; n < D.guide.setup; n++) parts.push(setupPage(n, n === 0 ? 0 : OFF));
await post(parts);
await post(backParts());
setup.on = true;
setup.at = Date.now();
}
async function setupRun() {
const n = D.guide.setup;
let fwd = 0, back = 0;
onBack = () => {
if (setup.page === 0) return false;
back++;
return true;
};
try {
await guideUnder();
while (!stopped) {
choose(Date.now());
if (src !== "none") break;
const t = ctl.turn;
fwd += (ctl.ok ? 1 : 0) + (ctl.start ? 1 : 0) + Math.max(0, t);
back += Math.max(0, -t);
ctl.turn = 0;
ctl.ok = ctl.start = false;
if (fwd || back) {
const to = fwd ? (setup.page + 1) % n : Math.max(0, setup.page - 1);
if (fwd) fwd--;
else back--;
if (to !== setup.page) {
await post([setupPage(to, 0), setupPage(setup.page, OFF)]);
setup.page = to;
}
} else {
if (Date.now() - setup.at > 1200000) {
setup.at = Date.now();
await post([guidePlate("FF"), setupPage(setup.page, 0), film("s_nx", "guide_next", D.guide.setupNext[0], 170, true, LONG, D.guide.setupNext[1])]);
await post(backParts());
}
await nap(400);
}
}
} finally {
onBack = null;
}
if (stopped) return;
setup.on = false;
if (src === "helper") {                           // found: said for a moment
await post([film("s_fd", "setup_found", 0, 160, false, LONG), setupPage(setup.page, OFF), film("s_nx", "guide_next", OFF, 170, true, LONG, D.guide.setupNext[1])]);
await sleep(1700);
}
const first = guide.state === "wait";
if (first) await guideMake(false);                // the first time: the guide to the controls follows (its page comes under the notes, which then go)
else {
await post([guidePlate("FF"), film("s_fd", "setup_found", OFF, 160, false, LONG), setupPage(setup.page, OFF), film("s_nx", "guide_next", OFF, 170, true, LONG, D.guide.setupNext[1])]);
choose(Date.now());
calm = Date.now() + 2200;
await guideUnder();
await post([guidePlate("B4")]);
await post([guidePlate("48")]);
}
const ids = setupIds().filter((id) => first ? id !== "g_bk" : true);
await wipe(ids);
vol.at = 0;
ctl.turn = 0;
ctl.ok = ctl.start = false;
}
let said = 0;                       // every answer is a page of its own: the same answer again dims and comes back,
function say(one, two, ms) {
note = { one: one, two: two, until: Date.now() + (ms || 1700), n: ++said };
}
const noWords = () => cur.kind === "music" && lyricsOn && lyr.key === cur.key && lyr.state === "none" && lyr.why !== "";
const viewNow = () => (view === "lyrics" && noWords() && nolyr.key === cur.key ? "info" : view);
function sayNoWords(ms) {
const w = lyr.why === "script" ? W.lyrscript : W.nolyrics;
nolyr.key = cur.key;
say(w[0], w[1], ms);
jot("no words for this song (" + lyr.why + "): said, then its names");
}
function wordsNote(now) {
if (view !== "lyrics" || cur.kind !== "music" || onPage !== "deck") return;
if (now - songSince < OPEN_MS || deck.hold || now < calm || (note && now < note.until) || now < tag.until + 300 || now < vol.until) return;
if (noWords() && nolyr.key !== cur.key) sayNoWords(2600);
else if (nolyr.miss === cur.key && nolyr.off !== cur.key && lyr.key === cur.key && lyr.state !== "ok" && lyricsOn) {
nolyr.off = cur.key;                            // lrclib.net not reached: said once a song; asked again later as before
say(W.lyroff[0], W.lyroff[1], 2500);
jot("words: lrclib.net not reached - said once");
}
}
function page(now) {
if (note && now < note.until) return words("note|" + note.one + note.two + "|" + note.n, note.one, note.two, INK, GREY, now);
note = null;
const k = cur.kind;
if (k === "video") {                             // (a player that gives no title sends its own name: said once, not twice)
const title = cur.title && cur.title !== cur.more ? cur.title : cur.more ? W.video : W.nowshowing;
return book("video|" + cur.key, [[cur.more || W.video, LAMP], [title, INK]], now, VTXT, VROOM);
}
if (k === "nosrc" || k === "seek") return { key: k, items: [{ k: "tm", s: " ", x: TXT, y: rowY(0), c: QUIET }] };   // (the set-up notes lie over it; or the Mac is being looked for: nothing said yet)
if (k === "lost") return cur.key === "nowifi" ? words("nowifi", W.nowifi[0], W.nowifi[1] || " ", TAG_INK, TAG_BRASS, now) : words("lost", W.nomac[0], W.nomac[1], TAG_INK, TAG_BRASS, now);
if (k === "bad") {
const w = cur.key === "newcode" ? W.newcode : cur.key === "client" ? W.badclient : W.badkey;
return words(cur.key, w[0], w[1], INK, GREY, now);
}
if (k === "wait") return words(cur.key, W.spotify[0], offline ? W.spotify[2] : cur.key === "linking" ? W.linking[1] : W.spotify[1], GREY, QUIET, now);
if (k !== "music") return words("none", W.nothing[0], W.nothing[1], QUIET, QUIET, now);
const accent = D.recs[recordOf(cur)][0].slice(0, 7);
if (cur.state !== "playing" && viewNow() !== "info") return book("paused|" + cur.key, [[names(cur)[0], GREY], [W.paused, accent]], now);
const blank = { key: "blank" + (lined ? "L" : ""), items: [{ k: "tm", s: " ", x: TXT, y: rowY(0), c: QUIET }] };
const left = tail(now);
if (left <= LAST_S) {                             // the song is over, its record has left: empty until the next song is known ...
const c = coming.length ? coming[0] : null;
if (!c || left > 0.03) return blank;
if (herald.key !== c.key) {                     // ... which it is at once if the source has told what follows: its name, as its record comes in
herald.key = c.key;
herald.at = now;
}
return book("title|" + c.key, [[names(c)[0], INK], [names(c)[1], D.recs[recordOf(c)][0].slice(0, 7)]], now, TXT, ROOM, false, OPEN_MS);
}
if (view === "lyrics" && cur.dur > 0 && lyr.state === "ok" && lyr.key === cur.key && now - songSince > OPEN_MS) {
const last = lyrLast();                         // after the last line: the names once more only if there is time for them before the end
if (last >= 0 && posNow(now) + lead1() + 0.3 >= last && cur.dur - last < CLOSE_S && left < 1e8) return blank;
}
if (viewNow() === "info") {                      // the song's three names, one at a time: title white, artist in the record's colour, album dimmer
const title = names(cur)[0], parts = [[title, INK]];
if (cur.artist && cur.artist !== title) parts.push([cur.artist, accent]);
if (cur.album && cur.album !== title) parts.push([cur.album, GREY]);
return book("info|" + cur.key, parts, now, TXT, ROOM, true);
}
return book("title|" + cur.key, [[names(cur)[0], INK], [names(cur)[1], accent]], now, TXT, ROOM, false, OPEN_MS);
}
let face = "";                      // "book" (standing words) | "kara" (the two rows of the lyrics)
function wantFace(now) {
if ((note && now < note.until) || now < calm) return "book";
if (cur.kind === "music" && now - songSince < OPEN_MIN_MS) return "book";   // a new song: its name first, always - if only for a second
if (tail(now) <= (face === "book" ? LAST_S : LAST_ROWS_S)) return "book";      // the song is over: see page()
if (cur.kind === "music" && cur.state !== "playing" && view === "lyrics" && face === "kara" && kar.on && lyr.state === "ok" && lyr.key === cur.key) return "kara";
if (cur.kind === "music" && cur.state === "playing" && view === "lyrics" && lyr.state === "ok" && lyr.key === cur.key) {
const pos = posNow(now), i = lineAt(pos + lead1());
if (i >= 0 && lyr.s[i] && pos < lineEnd(i) + 2) return "kara";         // a line is being sung (or begins this moment)
if (now - songSince <= OPEN_MS) return "book";                          // a new song: its name stands for a moment first
for (let j = i + 1; j < lyr.t.length && j < i + 8; j++) {
if (lyr.s[j]) return lyr.t[j] - pos < 6 || resumed ? "kara" : "book";      // the next one is near: it waits in its row (after a pause always: no name card then)
}
}
if (view === "waves" && cur.kind === "music" && onPage === "deck" && wav.made === waveKey() && now - songSince > 3200) return "wave";
return "book";
}
async function show(now) {
await tagStep(now);                               // first: a press is answered before anything else is drawn
await volStep(now);
now = Date.now();
const want = deck.hold ? face : wantFace(now);
if (want !== face) {
if (face === "kara") await karHide();
else if (face === "wave") await waveHide();
else if (face === "book" && txt.page && want === "kara") {     // the standing words go together with the first rows of the lyrics
kar.old = { page: txt.page, set: txt.set };
txt.page = null;
} else if (face === "book" && txt.page) {       // ... or make way for the ribbon
await put(wirePage(txt.page, txt.set, 0.3));
await put(wirePage(txt.page, txt.set, 0).concat(txt.page.sc ? [wmask(null)] : []));
await wipe(idsOf(txt.page, txt.set));
txt.page = null;
}
face = want;
}
if (deck.hold) await sleep(0);
else if (face === "kara") await karTick(now);
else if (face === "wave") await waveTick(now);
else {
await setWords(page(now));
await scrollTick();
}
await tagStep(Date.now());                        // (and taken away when its second is over)
await volStep(Date.now());
}
const deck = { state: "off", rec: -1, arm: 0, busy: false, want: "", since: 0, still: 0, loops: 0, plat: 0, posting: 0, lead: "", hold: false,
gen: 0, seq: "", armOn: false, move: null };
const OUT_S = D.ms.out / 1000 + 0.08;              // the way out, begun this long before T, has left the screen at T
const FROM_S = OUT_S + Math.max(D.ms.down + 100, D.ms.armOut + 60) / 1000 + 0.6;     // ... and before that arm and record come to rest: 3.7 s before T in all
async function show1(parts) {
deck.posting++;
try {
await post(parts);
} finally {
deck.posting--;
}
return Date.now();
}
function run(holder, op) {
const mine = holder.runs = (holder.runs || 0) + 1;   // (a sequence that was broken off must not end the one that took its place)
holder.busy = true;
if (holder === deck) deck.seq = "";
dbg("FILM " + deck.state + " rec " + deck.rec + " -> " + deck.want);
op().then(() => {
if (holder.runs !== mine) return;
holder.busy = false;
deck.hold = false;
}, (err) => {
report("film", err);
if (holder.runs !== mine) return;
holder.busy = false;
deck.hold = false;
});
}
async function whileOn(ms, gen) {
const end = Date.now() + ms;
while (Date.now() < end) {
if (gen !== deck.gen) return false;
await sleep(Math.min(40, end - Date.now()));
}
return gen === deck.gen;
}
const LAY = { plat: { ids: ["d_pl", "d_p2"], z0: 10, zn: 4 }, loop: { ids: ["d_lp", "d_l2"], z0: 18, zn: 4 },
rec: { ids: ["d_st", "d_s2"], z0: 23, zn: 26 }, arm: { ids: ["d_ar", "d_a2"], z0: 51, zn: 44 } };
let pend = [];                      // [part, id]: elements on show before their part's last change - away in the next request
const rimAt = { n: -1, t: 0 };
function layReset() {
for (const k in LAY) Object.assign(LAY[k], { on: -1, c: 0, pic: "", loop: false, x: 0 });
pend = [];
rimAt.n = -1;
}
layReset();
function lay(part, name, x, loop) {
const L = LAY[part], k = L.on < 0 ? 0 : 1 - L.on;
if (L.on >= 0) pend.push([part, L.ids[L.on]]);
L.on = k;
L.c++;
L.pic = name;
L.loop = !!loop;
L.x = x;
return film(L.ids[k], name, x, L.z0 + (L.c % L.zn), !!loop, LONG);
}
function unlay(part) {
const L = LAY[part];
if (L.on >= 0) pend.push([part, L.ids[L.on]]);
L.on = -1;
L.pic = "";
return null;
}
const layHere = (part, still) => {
const L = LAY[part];
if (L.on < 0) return null;
if (still) {
L.pic = still;
L.loop = false;
}
return film(L.ids[L.on], L.pic, L.x, L.z0 + (L.c % L.zn), L.loop, LONG);
};
const rim = (n) => {
rimAt.n = n;
rimAt.t = Date.now();
return film("d_rm", n >= 0 ? "rec" + n + "_rim" : "arm_rest", n >= 0 ? 0 : OFF, 22, false, 4 * LONG);
};
async function swap(parts, after) {
const mine = pend, now = parts.filter(Boolean);
pend = [];
const t = now.length ? await show1(now) : Date.now();
const off = mine.filter(([p, id]) => LAY[p].on < 0 || LAY[p].ids[LAY[p].on] !== id).map(([p, id]) => away(id));
if (off.length || after) await show1(off.concat(after || []));
return t;
}
const deckBase = (dx) => {
layReset();
LAY.plat.on = LAY.arm.on = 0;
Object.assign(LAY.plat, { pic: "platter", loop: true, x: dx });
Object.assign(LAY.arm, { pic: "arm_rest", loop: false, x: ARM_X + dx });
return [block("km", dx, 0, TXT, 16, "#000000FF", 5), film("d_pl", "platter", dx, LAY.plat.z0, true, LONG), film("d_ar", "arm_rest", ARM_X + dx, LAY.arm.z0, false, LONG)];
};
const away = (id) => film(id, "arm_rest", OFF, 1, false, LONG);
const deckSlots = () => [away("d_p2"), away("d_a2"), away("d_lp"), away("d_l2"), away("d_st"), away("d_s2"), away("d_rm"), pzFilm(OFF)];
const recPic = (name) => lay("rec", name, 0, false);          // (a film holds its last picture)
const armPic = (name) => lay("arm", name, ARM_X, false);
const recLies = (n) => lay("rec", "rec" + n + "_still", 0, false);
function edge(what) {
const now = Date.now(), left = tail(now);
dbg("EDGE " + what + (left < 1e8 ? " left " + left.toFixed(2) : "") + " pos " + posNow(now).toFixed(2) + (fin.at ? " over " + ((now - fin.at) / 1000).toFixed(2) : ""));
}
async function recIn(n, go) {
const t0 = await swap([recPic("rec" + n + "_in")]);
edge("in begins");
await sleep(D.ms.in + 60 - (Date.now() - t0));
await swap([recLies(n)], [rim(n)]);               // (the edge: from the film's to its own element, in one request)
edge("lies");
deck.rec = n;
deck.state = "stopped";
const now = Date.now(), its = cur.kind === "music" && cur.state === "playing" && recordOf(cur) === n;
if (go) {                                          // (unless the source has said meanwhile that another song came after all)
if (its || cur.key === deck.lead) await recStart(0);
} else if (its && tail(now) > FROM_S) await recStart(armPlace(now));
}
async function recOut(n) {
const t0 = await swap([recPic("rec" + deck.rec + "_out"), rim(-1)]);     // (it begins with the record lying still; it has its own edge)
edge("out begins");
await sleep(D.ms.out - (Date.now() - t0));
edge("out has left");
deck.rec = -1;
deck.state = "empty";
if (n >= 0) {
deck.lead = cur.key;
await recIn(n, true);
} else await swap([unlay("rec")]);
}
async function recStart(k) {
const n = deck.rec, gen = deck.gen;
deck.seq = "start";
const mv = deck.move, part = mv && mv.kind === "outq" ? (Date.now() - mv.t0) / D.ms.armOutQ : 9;
const back = part < 1.15 ? clamp(Math.ceil(part * 3), 1, 3) : 0;
if (back) k = mv.k;
const armMs = back ? Math.round(D.ms.armOutQ * back / 3) + 50 : D.ms.armIn;
const t0 = await swap([lay("loop", "rec" + n + "_spin", 0, true), recPic("rec" + n + "_up"), armPic(back ? "arm_outq" + k + "_b" + back : "arm_in" + k)]);
edge("start");
deck.loops = t0;
deck.arm = k;
deck.move = { kind: back ? "back" : "in", t0: t0, k: k };
if (!(await whileOn(armMs + 60 - (Date.now() - t0), gen))) return;     // (broken off by the pause key: see recHalt)
deck.armOn = true;                                 // (the arm's film holds its last picture: the arm lying on the record)
if (!(await whileOn(D.ms.up + 100 - (Date.now() - t0), gen))) return;
await swap([unlay("rec")]);                        // (the spin-up has dissolved into the loop under it)
deck.state = "playing";
deck.seq = "";
}
async function recHalt() {
const n = deck.rec, k = deck.arm, gen = deck.gen, mv = deck.move;
deck.seq = "halt";
deck.state = "stopped";
const part = !deck.armOn && mv && mv.kind === "in" ? (Date.now() - mv.t0) / D.ms.armIn : -1;
const back = part >= 0.16 ? clamp(Math.ceil(part * 4), 1, 4) : 0, down = deck.armOn || (mv && mv.kind === "back");
const name = down ? "arm_outq" + k : back ? "arm_in" + k + "_b" + back : "", ms = down ? D.ms.armOutQ : Math.round(D.ms.armIn * back / 8) + 60;
deck.armOn = false;
const t0 = await swap([recLies(n), unlay("loop"), name ? armPic(name) : LAY.arm.pic === "arm_rest" ? null : armPic("arm_rest")]);
edge("halt");
jot("still: the record lies, " + (name || "the arm on its rest") + (Date.now() - helper.saidAt < 5000 ? " - " + (Date.now() - helper.saidAt) + " ms after the Mac's word" : ""));
deck.move = { kind: down ? "outq" : "rest", t0: t0, k: k };
await pauseStep(Date.now());                       // (the pause mark comes with the record's stop, not at the loop's next round)
if (name && !(await whileOn(ms + 40 - (Date.now() - t0), gen))) return;     // (the arm's film holds its last picture: on its rest)
deck.seq = "";
}
function haltNow() {
if (onPage !== "deck" || deck.rec < 0 || deck.state === "off") return;
if (deck.busy ? deck.seq !== "start" : deck.state !== "playing") return;
deck.gen++;
run(deck, recHalt);
}
function playNow(now) {
if (onPage !== "deck" || deck.rec < 0 || deck.state !== "stopped" || cur.kind !== "music" || recordOf(cur) !== deck.rec) return;
if (deck.busy && deck.seq !== "halt") return;
if (tail(now) <= FROM_S) return;                  // (the song's last seconds: the loop decides)
deck.gen++;
run(deck, () => recStart(armPlace(now)));
}
async function recStop() {
const n = deck.rec;
deck.seq = "stop";
deck.armOn = false;
const t0 = await swap([recPic("rec" + n + "_down"), armPic("arm_out" + deck.arm)]);
edge("arm lifts");
await sleep(D.ms.down + 100 - (Date.now() - t0));
await swap([unlay("loop")]);                       // (the film holds its last picture, the record lying still)
deck.state = "stopped";
}
async function recEnd() {
const key = cur.key;
await recStop();
for (;;) {
const left = tail(Date.now());
if (cur.key !== key || left > FROM_S + 0.5) return;
if (left <= OUT_S) break;
await sleep(Math.min(100, Math.max(5, 1000 * (left - OUT_S))));
}
await recOut(coming.length ? recordOf(coming[0]) : -1);
}
async function recLay(n, t0) {
await sleep(D.ms.out + 20 - (Date.now() - t0));
deck.hold = false;                                 // the old record has left: from here on the words' half is the new song's,
songSince = Date.now();                            // and its name gets its time from now
const t1 = await swap([recPic("rec" + n + "_in")]);
edge("old one gone, in begins");
await sleep(D.ms.in + 40 - (Date.now() - t1));
await swap([recLies(n)], [rim(n)]);
edge("lies");
deck.rec = n;
deck.state = "stopped";
const now = Date.now();                            // (no waiting for the loop's next round)
if (cur.kind === "music" && cur.state === "playing" && recordOf(cur) === n && tail(now) > FROM_S) await recStart(armPlace(now));
}
async function recSwap(n) {
deck.hold = true;
const t0 = await swap([recPic("rec" + deck.rec + "_out"), rim(-1)]);     // (it begins with the record lying still)
await recLay(n, t0);
}
async function recSkip(n) {
deck.hold = true;
const t0 = await swap([armPic("arm_outq" + deck.arm)]);
await sleep(D.ms.armOutQ - 250 - (Date.now() - t0));
const t1 = await swap([recPic("rec" + deck.rec + "_out"), unlay("loop"), rim(-1)]);      // (the record at rest over the loop; the loop goes in the next request)
await recLay(n, t1);
}
async function armAgain(k) {
const t0 = await swap([armPic("arm_outq" + deck.arm)]);
await sleep(D.ms.armOutQ + 20 - (Date.now() - t0));
const t1 = await swap([armPic("arm_inq" + k)]);
await sleep(D.ms.armInQ + 40 - (Date.now() - t1));
deck.arm = k;
}
function armPlace(now) {
return cur.kind === "music" && cur.dur > 0 ? clamp(Math.floor(D.arms * posNow(now) / cur.dur), 0, D.arms - 1) : 0;
}
function deckStep(now) {
if (deck.busy || deck.state === "off") return;
const music = cur.kind === "music";
const rec = music ? recordOf(cur) : -1, play = music && cur.state === "playing";
const want = rec + "/" + play;
if (want !== deck.want) {
deck.want = want;
deck.since = now;
}
const settled = now - deck.since > 700;           // (between two songs players say "paused" or nothing for a moment)
const left = tail(now);
const nx = play && coming.length ? recordOf(coming[0]) : -1;        // the record of the song that follows, if the source has told
if (deck.lead) {                                  // the next song's record has been brought on at this one's end: the source will say so in a moment
if (deck.lead === cur.key && left < FROM_S) return;
deck.lead = "";
}
const same = nx >= 0 && nx === rec;               // the source has told that the same record plays on
const zone = left < (same ? END_S + 0.3 : FROM_S);                  // the song's last seconds
if (deck.state === "playing") {
if (zone && rec === deck.rec) run(deck, same ? recStop : recEnd);
else if (rec >= 0 && rec !== deck.rec) run(deck, () => recSkip(rec));       // a song skipped to another record: at once
else if (rec === deck.rec && !play) run(deck, recHalt);    // paused on the Mac: stopped at once, as by the bar's own key (which has done it already)
else if (rec < 0 && settled) run(deck, recStop);
else if (play && armPlace(now) !== deck.arm && settled && left > FROM_S + 2) {     // (not just before the end: the arm is about to lift anyway)
const k = armPlace(now);
if (Math.abs(k - deck.arm) > 1) run(deck, () => armAgain(k));     // a new song, or a leap within one
else {                                        // the song goes on: the arm has crept a little further in
deck.arm = k;
run(deck, () => swap([armPic("arm_p" + k)]));
}
}
} else if (deck.state === "stopped") {
if (zone && deck.rec === rec) {                 // a song's last seconds: the record lies still, the arm is off
if (same) {                                   //   the same record plays on: the arm comes back at the song's end
if (left < 0.25) {
deck.lead = cur.key;
run(deck, () => recStart(0));
}
} else if (left < OUT_S) run(deck, () => recOut(nx));           //   ... or it is drawn off, and has left the screen at the song's end
} else if (rec >= 0 && rec !== deck.rec) run(deck, () => recSwap(rec));     // another record: at once, the brisk way
else if (rec < 0 && settled) run(deck, () => recOut(-1));
else if (rec === deck.rec && play) run(deck, () => recStart(armPlace(now)));
} else if (zone) {                                // the turntable is empty and the song is at its end: it waits for the next one -
if (left <= 0.03 && nx >= 0) {                  // whose record comes in at once if the source has told which it is
deck.lead = cur.key;
run(deck, () => recIn(nx, true));
}
} else if (rec >= 0) {
run(deck, () => recIn(rec));
}
}
const proj = { state: "off", busy: false, loops: 0 };
async function reelStart() {
const t0 = await show1([film("p_lp", "reel_spin", OFF, 20, true, LONG), film("p_fx", "reel_up", 0, 40, false, T)]);
await post([film("p_lp", "reel_spin", 0, 20, true, LONG)]);
proj.loops = Date.now();
await sleep(250);
await wipe(["p_st"]);
await sleep(D.ms.reel + 220 - (Date.now() - t0));
await wipe(["p_fx"]);
proj.state = "on";
}
let onPage = "";                    // "deck" | "proj"
async function turnTo(to, first, covered) {
while (deck.busy || proj.busy) await sleep(60);
busy = true;
try {
if (!first) {                                  // (at the start the author's mark covers the screen: see main)
await post(['{"id":"zz_v1","type":"animation","path":"animations/veil_in.anim","x":0,"y":0,"align":"top_left","loop":false,' +
'"section":"default","timeout":' + T + ',"z_index":' + TOP + "}"]);
await sleep(D.ms.veilIn + 80);
const all = [];
for (const id in have) all.push(id);
for (let i = 0; i < all.length; i += 8) await wipe(all.slice(i, i + 8));
}
txt.page = null;
face = "book";
kar.on = vol.on = tag.on = prog.on = wav.on = wav.pre = false;
wav.made = "";
kar.line = [-1, -1];
kar.sung = -1;
kar.old = null;
prog.sent = "";
deck.state = proj.state = "off";
if (!first) await post(to === "deck" ? deckBase(OFF) : [film("p_st", "reel_still", OFF, 30, false, STILL)]);
if (to === "deck") {
await post(deckSlots());
await wavePre();                               // (the ribbon's elements too: made with the page, while it is covered)
}
if (!covered) await post(to === "deck" ? deckBase(0) : [film("p_st", "reel_still", 0, 30, false, STILL)]);    // (covered: the book of the controls lies over everything and lays the page under itself)
const now = Date.now();
if (to === "deck") {
deck.state = "empty";
deck.rec = -1;
deck.want = "";
deck.still = deck.loops = deck.plat = now;
} else {
proj.state = "rest";
proj.loops = now;
}
onPage = to;
lined = to === "deck" && cur.kind === "music" && cur.dur > 0;
if (!covered) await putWords(page(now), !!first);
if (first) {
const plate = (a) => block("zz_bk", 0, 0, 72, 16, "#000000" + a, TOP + 3);
await post([plate("FF")]);
while (!stopped && Date.now() < first) await nap(first - Date.now());      // (Back leaves at once; the other keys are kept: see below)
if (stopped) return;
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_sp"] }));
await post([plate("A0")]);
await post([plate("48")]);
await wipe(["zz_bk"]);
} else {
await post(['{"id":"zz_v2","type":"animation","path":"animations/veil_out.anim","x":0,"y":0,"align":"top_left",' +
'"loop":false,"section":"default","timeout":' + T + ',"z_index":' + (TOP + 9) + "}"]);          // it starts black, like what it lies on
await sleep(120);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_v1"] }));
await sleep(D.ms.veilOut);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_v2"] }));
}
vol.at = 0;                                      // (the volume's parts are made anew, unseen: see the loop)
calm = Date.now() + 1200;
} finally {
busy = false;
if (covered === true) {
ctl.ok = ctl.start = false;
ctl.turn = 0;
}
}
}
async function refresh(now) {
if (onPage === "deck" && !deck.busy && deck.state !== "off") {
if (now - deck.still > 45000) {
deck.still = now;
await post([block("km", 0, 0, TXT, 16, "#000000FF", 5)]);
}
if (now - deck.plat > 400 * LONG) {
deck.plat = now;
const arm = deck.armOn && deck.state === "playing" ? "arm_p" + deck.arm : "arm_rest";
await swap([lay("plat", "platter", 0, true), armPic(arm), deck.state === "stopped" && deck.rec >= 0 ? recLies(deck.rec) : null]);
const idle = [];                              // (the elements that wait out of sight, sent again)
for (const k in LAY) for (let i = 0; i < 2; i++) if (LAY[k].on !== i) idle.push(away(LAY[k].ids[i]));
await post(idle);
if (rimAt.n >= 0) await post([rim(rimAt.n)]);
}
if (deck.state === "playing" && now - deck.loops > 400 * LONG) {
deck.loops = now;
await swap([lay("loop", "rec" + deck.rec + "_spin", 0, true)]);
}
}
if (onPage === "proj" && !proj.busy && now - proj.loops > 400 * LONG) {
proj.loops = now;
await post([proj.state === "on" ? film("p_lp", "reel_spin", 0, 20, true, LONG) : film("p_st", "reel_still", 0, 30, false, STILL)]);
}
if (!vol.on && !tag.on && now - vol.at > 45000) {   // (the volume's parts and the label lie ready, unseen)
vol.at = now;
await post(volParts(0));
await post(tagParts(0));
}
if (face === "book" && txt.page && now - txt.at > 45000) {
txt.at = now;
await put(wirePage(txt.page, txt.set, 1));
}
}
const HOLD_MS = 5000;
const srcVol = () => (src === "spotify" ? sp.vol : src !== "helper" ? -1
: order.sent >= 0 && Date.now() - order.sentAt < HOLD_MS && helper.vol !== order.sent ? order.sent : helper.vol);
const can = (what) => (src === "helper" ? helper.can.indexOf("," + what + ",") >= 0 : src === "spotify" && !sp.bad && (what !== "vol" || sp.canVol));
function controls(now) {
const turns = ctl.turn, ok = ctl.ok, start = ctl.start;
ctl.turn = 0;
ctl.ok = ctl.start = false;
if (!turns && !ok && !start) return;
if (src === "none") return;                       // (nothing is set up: the set-up notes are on show and have the keys)
jot("key" + (start ? " start" : "") + (ok ? " ok" : "") + (turns ? " turn " + turns : ""));
if (link.off || src === "gone") {                 // no word from Vinyl for Mac: said honestly, nothing pretended
saidOffline(now);
return;
}
if (ok) {                                         // the next view - at every moment of a song, and its name says so at once
note = null;                                    // (an answer or the volume that is still on show gives way)
vol.until = 0;
view = VIEWS[(VIEWS.indexOf(view) + 1) % VIEWS.length];
setTag(VIEW_NAME[view], now);
viewSave = true;
turn.base = "";                                 // (the names begin with the title)
if (view === "lyrics" && noWords()) sayNoWords(950 + 1500);       // (under the label first; then 1.5 s of its own)
}
if (start) {
vol.until = 0;
if (cur.kind !== "music" && !(src === "spotify" && cur.kind === "none")) say((cur.kind === "video" ? W.onmac : W.notoplay)[0], (cur.kind === "video" ? W.onmac : W.notoplay)[1]);
else if (!can("toggle")) say((src === "helper" ? W.ctlmac : W.ctlspotify)[0], (src === "helper" ? W.ctlmac : W.ctlspotify)[1]);
else {
const playing = hold && hold.key === cur.key ? hold.state === "playing" : cur.kind === "music" && cur.state === "playing";
let wish = null;
if (src === "helper") {
wish = { do: playing ? "pause" : "play" };  // (the state that is wanted - said twice it is still that state)
tell(wish);
}
else sp.jobs.push(playing ? "pause" : "play");
setTag(playing ? W.pause : W.play, now);      // said at once, before the Mac has answered
if (cur.kind === "music") {                   // ... and shown at once: the arm lifts or comes down
if (playing) {                              // PAUSE: everything that moves stops with the key
haltNow();
if (face === "wave" && wav.on && !wav.still) waveSettle(now);
} else playNow(now);                        // PLAY: the record starts with the key (an arm still lifting turns back)
floor.pos = posNow(now);                    // (where the bar shows the song at this key: see floor)
floor.key = cur.key;
floor.at = now;
hold = { key: cur.key, state: playing ? "paused" : "playing", pos: floor.pos, at: now, until: now + HOLD_MS, no: 0,
min: hold ? now + HOLD_MS : 0, wish: wish, asked: 0 };     // (pressed again before the Mac has followed the first press: an answer to that one does not settle this one - held its full time)
order.toggleAt = now;
deck.since = 0;
}
}
}
if (turns) {
if (!can("vol")) say((src === "helper" ? W.volmac : W.novol)[0], (src === "helper" ? W.volmac : W.novol)[1]);
else {
if (now - vol.click > 3000 || vol.target < 0) vol.target = src === "helper" && order.vol >= 0 ? order.vol : srcVol() >= 0 ? srcVol() : 50;
const quick = 1000 * Math.abs(turns) / Math.max(60, now - vol.click) > 8;
vol.target = clamp(vol.target + (knobOld ? turns : -turns) * (quick ? 8 : 4), 0, 100);
vol.click = now;
vol.until = now + 1200;
tag.until = 0;                                // (the volume takes the label's place)
note = null;
if (src === "helper") {
order.vol = vol.target;
volSend(now);
} else sp.volJob = vol.target;
}
}
}
const T_START = Date.now();
function choose(now) {
const news = Math.max(helper.seen, wifi.okAt), byWifi = wifiList().length > 0, known = helper.seen > 0 || wifi.okAt > 0 || byWifi;
const have = news > 0 && !!helper.song;
const fresh = have && now - news < LOST_MS;
let gone = "";                                   // "" (Vinyl for Mac is there) | "seek" | "lost" | "nowifi"
if (fresh) gone = "";
else if (!byWifi) gone = "lost";
else if (!wifi.up) gone = now - Math.max(wifi.downAt, T_START) < WIFI_WAIT ? "seek" : "nowifi";
else {
const quiet = now - Math.max(news, wifi.upAt, T_START);
if (quiet >= LOST_MS && (wifi.miss >= 3 || quiet >= 2 * LOST_MS)) gone = "lost";
else gone = quiet >= LOST_MS && have && now - news < 2 * LOST_MS ? "" : "seek";      // (asked, but not really unanswered yet: the song goes on a while longer)
}
let next;
if (known && gone === "") {
if (src === "gone") backOnline(now);
src = "helper";
next = helper.song || NOTHING;
} else if (spSet()) {
src = "spotify";
next = sp.link === "newcode" || sp.link === "client" ? { kind: "bad", key: sp.link } : sp.refresh === "" ? { kind: "wait", key: "linking" }
: sp.bad ? { kind: "bad", key: "bad" } : sp.song || { kind: "wait", key: "wait" };
} else if (known) {                              // Vinyl for Mac is set up and does not answer (yet)
src = "gone";
next = gone === "seek" ? { kind: "seek", key: "seek" } : { kind: "lost", key: gone };
if (gone !== "seek") link.said = true;
} else {
src = "none";
next = { kind: "nosrc", key: "nosrc" };
}
coming = src === "helper" ? helper.next : src === "spotify" ? sp.next : [];
if (hold && now > hold.until && src === "helper" && news < hold.at && hold.asked < 3) {
hold.until = now + 2500;
hold.asked++;
jot("hold " + hold.state + ": no word of the Mac since the key (" + (now - hold.at) + "ms) - kept, the wish said again");
if (hold.wish) tell(hold.wish, true);
}
if (hold) {                                      // a control was used: the app's own word, until the source agrees (see HOLD_MS)
const same = next.key === hold.key, agrees = same && next.state === hold.state;
if (same && !agrees && news > hold.at) hold.no = hold.no || now;
else hold.no = 0;
const why = !same ? "another song" : agrees && (now >= hold.min || (hold.wish && helper.cn === hold.wish.n)) ? "the source agrees" : hold.no && now - hold.no > 2500 ? "the Mac says otherwise" :
now > hold.until ? "NO agreement in time" : "";
if (why) {
jot("hold " + hold.state + " ends after " + (now - hold.at) + "ms: " + why);
hold = null;
} else next = Object.assign({}, next, { state: hold.state, pos: hold.pos, at: hold.at, frozen: hold.state === "playing" });     // (PLAY: the arm comes down, the song's clock waits for the Mac's word)
}
const changed = next.key !== cur.key;
if (!changed && cur.kind === "music" && next.kind === "music" && next.state !== cur.state && !(tag.text === (next.state === "playing" ? W.play : W.pause) && now < tag.until)) {
setTag(next.state === "playing" ? W.play : W.pause, now);
}
if (changed) resumed = false;
else if (cur.kind === "music" && cur.state === "paused" && next.state === "playing") resumed = true;
if (changed || next.state !== cur.state) jot("src " + src + ": " + next.kind + (next.state ? " " + next.state : "") + (next.key === "nowifi" ? " (no Wi-Fi)" : ""));
cur = next;
if (changed) newSong(now);
}
function forever(loop, name) {
loop().catch((err) => {
report(name, err);
if (!stopped) setTimeout(() => forever(loop, name), 1000);
});
}
async function readSetup() {
const v = await loadSettings();
if (v.start_over === undefined && v.lyrics === undefined) return;     // (the bar did not answer: nothing is known - above all no flip of "Start over")
const id = String(v.client_id || "").replace(/\s/g, ""), secret = String(v.client_secret || "").replace(/\s/g, ""),
typed = String(v.refresh_token || "").replace(/\s/g, ""), code = codeOf(String(v.spotify_code || "") + String(v.spotify_code2 || ""));
if (sp.kept === undefined) {                       // what an earlier trade of a code has left (once)
sp.kept = null;
const got = await call("GET", "storage/read?path=/ext/data/sp.json");
try {
const j = got.ok ? JSON.parse(got.text) : null;
if (j && typeof j.r === "string" && typeof j.id === "string" && typeof j.c === "string") sp.kept = j;
} catch (err) {
sp.kept = null;
}
}
const mine = sp.kept && sp.kept.id === id ? sp.kept : null, mark = code ? codeMark(code) : "";
const fresh = code !== "" && typed === "" && id !== "" && secret !== "" && !(mine && mine.c === mark);     // a code that has not been traded yet
const refresh = typed || (mine && !fresh ? mine.r : "");
if (fresh && sp.tried !== id + "|" + secret + "|" + mark) {
if (sp.code !== code) sp.link = "";
sp.code = code;
} else {
sp.code = "";
if (!fresh && sp.link !== "linking") sp.link = mine && mine.r === "" && mine.c === mark && typed === "" ? "newcode" : "";
}
if (id !== sp.id || secret !== sp.secret || refresh !== sp.refresh) {
sp.id = id;
sp.secret = secret;
sp.refresh = refresh;
sp.token = "";
sp.bad = false;
sp.song = null;
sp.wait = sp.due = 0;
}
lyricsOn = v.lyrics !== false;
wordsTune = v.timing === "earlier" ? 150 : v.timing === "later" ? -150 : 0;
colourOn = v.colour === true && !!D.clip;
knobOld = v.knob === "reversed";
const addr = String(v.helper_addr || "").replace(/\s|^https?:\/\//g, "").replace(/\/.*$/, ""), pin = String(v.helper_code || "").replace(/\s/g, "");
wifi.set = addr && pin ? { addr: addr.indexOf(":") < 0 ? addr + ":8765" : addr, code: pin } : null;
await startOver(v);
}
const reset = { known: false, was: false };
async function startOver(v) {
const on = v.start_over === true;
if (!reset.known) {
const got = await call("GET", "storage/read?path=/ext/data/reset.json");
reset.known = true;
if (got.ok && got.text.indexOf('"on"') >= 0) reset.was = got.text.indexOf("true") >= 0;
else {                                           // the first start (or the note is gone): the switch as it stands is where it starts from
reset.was = on;
await call("POST", "storage/write?path=/ext/data/reset.json", JSON.stringify({ on: on }), "application/octet-stream");
}
}
if (on === reset.was) return;
reset.was = on;
for (let i = 0; i < store.list.length; i++) {
if (keptFile(store.list[i])) await call("DELETE", "storage/remove?path=/ext/data/w" + store.list[i] + ".json");
}
await call("DELETE", "storage/remove?path=/ext/data/words.json");
await call("DELETE", "storage/remove?path=/ext/data/cmd.json");
await call("DELETE", "storage/remove?path=/ext/data/seen.json");
await call("DELETE", "storage/remove?path=/ext/data/view.json");
await call("DELETE", "storage/remove?path=/ext/data/sp.json");     // (what Spotify gave for a code: a new code is needed after this)
sp.kept = null;
sp.link = sp.tried = "";
await call("POST", "storage/write?path=/ext/data/reset.json", JSON.stringify({ on: on }), "application/octet-stream");
store.list = [];
store.mem = {};
store.save = [];
store.tried = {};
order.vol = -1;
vol.target = -1;
view = "lyrics";
hold = null;
if (guide.state === "done") guide.state = "wait";  // the guide again (after the card)
if (cur.kind === "music") newSong(Date.now());     // the song that plays gets its words anew
say(W.cleared[0], W.cleared[1], 1600);
dbg("START OVER, the switch now " + on);
}
async function main() {
await post(['{"id":"zz_sp","type":"animation","path":"animations/splash.anim","x":0,"y":0,"align":"top_left","loop":false,' +
'"section":"default","timeout":' + T + ',"z_index":' + (TOP + 5) + "}"]);
const done = Date.now() + D.ms.splash;           // (the one place that knows how long the mark plays: its film's own length)
await logStart();
const viewKept = await call("GET", "storage/read?path=/ext/data/view.json");
if (viewKept.ok) {
for (let i = 0; i < VIEWS.length; i++) {
if (viewKept.text.indexOf('"' + VIEWS[i] + '"') >= 0) view = VIEWS[i];
}
}
const seen = await call("GET", "storage/read?path=/ext/data/seen.json");
if (seen.ok && seen.text.indexOf("guide") >= 0) guide.state = "done";      // the guide has been read: it does not come by itself again
const book = post((guide.state === "wait" ? guideAll(false) : [guideNext(OFF), guidePage(0, OFF)]).concat([titleFilm(OFF)]));
await loadWordsList();
await readSetup();
await readHelper();
await readPair();
for (let i = 0; i < 3 && helper.t && !helper.seen && Date.now() < done - 350; i++) {     // a file is there: is it alive? (its t moves)
await sleep(300);
await readHelper();
}
if (wifiList().length) {                         // is Vinyl for Mac there over Wi-Fi? (and how do the clocks stand)
jot("the Mac is looked for at " + wifiList().length + " address(es)" + (wifi.set ? ", one of them from Setup" : "") + (helper.seen ? "; the cable is in" : ""));
await barWifi();
wifi.statDue = Date.now() + 1000;
if (wifi.up) wifiSend();
while (wifi.up && wifi.okAt === 0 && wifi.miss === 0 && Date.now() < done - 250) await sleep(40);
}
if (helper.seen) {
order.n = Math.max(order.n + 1, Math.floor(Date.now() / 100) % 2000000000);
await call("POST", "storage/write?path=/ext/data/cmd.json", JSON.stringify({ n: order.n, do: "hello" }), "application/octet-stream");
for (let i = 0; i < 10 && helper.cl.length < 2 && Date.now() < done - 300; i++) {
await sleep(60);
await readHelper();
}
}
choose(Date.now());
await book;
const read = guide.state === "wait" && src !== "none" && src !== "gone" && !note;
if (read) await guideMake(false);
else if (src === "none") await setupMake(false);
else {
await post([titleFilm(0)]);
title.on = true;                               // (from now on a key belongs to the main screen: it is not answered underneath, as a PLAY nobody sees)
}
await turnTo(cur.kind === "video" ? "proj" : "deck", done, read || setup.on ? true : "title");
if (stopped) return;
if (!read && !setup.on) {
title.on = true;
title.until = Date.now() + TITLE_MS;
}
forever(helperLoop, "helper loop");            // (should one of them ever fall over, it is started again)
forever(dataLoop, "data loop");
let setupDue = Date.now() + 6000, freshDue = Date.now() + 5000;
let wanted = "", wantedAt = 0;
while (!stopped) {
try {
let now = Date.now();
const top = now;
if (now >= setupDue && !changing(now, 0.5)) {
setupDue = now + 6000;                      // (the settings are read again every few seconds: one small request)
lg.step = "settings";
await readSetup();
}
if (setup.on) {
lg.step = "set-up notes";
await setupRun();
continue;
}
if (guide.state === "on") {
lg.step = "guide";
await guideRun();
continue;
}
if (title.on) {
lg.step = "main screen";
await titleRun();
continue;
}
lg.step = "page";
choose(now);
endWatch(now);
if (src === "none" && !(note && now < note.until)) {        // nothing is set up (any more): the set-up notes
await setupMake(true);
continue;
}
if (guide.state === "wait" && src !== "none" && src !== "gone" && !(note && now < note.until)) {      // a source has come while the app is open, or the app has started over: the book now
await guideMake(true);
continue;
}
const want = cur.kind === "video" ? "proj" : "deck";
if (want !== onPage) {                        // the other object: once it has been wanted for a moment (a tab
if (wanted !== want) {                      // looked at in passing does not dim the screen twice)
wanted = want;
wantedAt = now;
}
if (now - wantedAt > 700) await turnTo(want, false);
else await nap(120);
continue;
}
wanted = "";
controls(now);
if (!vol.at && !vol.on && now >= vol.until) {  // the volume's parts, made unseen as soon as a page is up: when the
vol.at = now;                               // knob is turned nothing new has to be made
await post(volParts(0));
await post(tagParts(0).concat(have.wm ? [] : [wmask(null)]));      // (and the label, for Start and OK; and the mask of long names)
if (!dimBusy()) {                           // (and the plate that changes the pages of words: both its films, once, unseen)
await post([dimFilm("dim_in", OFF)]);
await post([dimFilm("dim_out", OFF)]);
}
now = Date.now();
}
if (viewSave && now > tag.until + 600 && !changing(now, 1) && !deck.busy) {        // which view: kept for the next start (written in a quiet moment)
viewSave = false;
await call("POST", "storage/write?path=/ext/data/view.json", JSON.stringify({ v: view }), "application/octet-stream");
}
choose(now);                                  // (Start's word counts at once)
endWatch(now);
if (now - lg.clock > 1000 && cur.kind === "music") {       // (for the stand-in: where the app thinks the song is, once a second)
lg.clock = now;
dbg("CLOCK " + posNow(Date.now()).toFixed(3) + " " + cur.state);
}
wordsNote(now);
await linkStep(now);
await pauseStep(now);
await waveReady();
lined = onPage === "deck" && cur.kind === "music" && cur.dur > 0;
if (onPage === "deck") deckStep(now);
else if (proj.state === "rest" && !proj.busy) run(proj, reelStart);
await show(now);
now = Date.now();
if (onPage === "deck") deckStep(now);          // (again: a page of names that dissolved has taken a moment)
if (!deck.hold) await progTick(now);
volSend(now);
if (now >= freshDue && !changing(now, 0.5)) {
freshDue = now + 5000;
await refresh(now);
}
lg.pass = Math.max(lg.pass, Date.now() - top);
lg.step = "rest";
await nap(Math.max(5, Math.min(face === "kara" ? kar.wait : vol.on ? 80 : 250, soon(Date.now()), scrollWait())));
} catch (err) {
report("vinyl", err);
await sleep(500);
}
}
jot("EXIT: the app was told to end (Back)", true);     // (that the app was ended in the ordinary way is written down)
lg.due = 0;
await logSave(Date.now());
}
main().catch((err) => report("main", err));
})();

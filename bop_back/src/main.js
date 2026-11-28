// Bop Back: a rhythm game for the BUSY Bar. A little act on a stage plays a short phrase (a cat at a drum, a bear at
// an anvil, a frog and a firefly, a woodpecker, a popcorn pan); a count of three, two, one; then you play the phrase
// back with Start while a lamp walks along the strip where it is written down. Three hearts, eight levels.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (the acts, the rhythms, widths of the bar's letters, lengths of the films), then the constants
// of the timing and the judging, the bar (its controls, API, settings, what is kept), drawing and the change from one
// page to the next, then the pages (title, the card before a round, the round itself, paused, game over), the book
// of five pages shown the first time the app is used (images/bk_<n>.png: the player turns them), the start.
// Nothing is made on a beat: a round moves or exchanges pictures that exist (see TIMING below).

const D = {"app":"io.github.windagh.bop_back","acts":[{"k":"cat","n":"CAT","c":"#FF963CFF"},{"k":"forge","n":"FORGE","c":"#FFAA32FF"},{"k":"frog","n":"FROG","c":"#96E850FF"},{"k":"peck","n":"PECK","c":"#FF6050FF"},{"k":"pop","n":"POP","c":"#FFD650FF"}],"rh":[[[8,90,"x.x.x.x.",0,1],[8,90,"x.x.x...",1,1],[8,90,"x...x.x.",2,1],[8,90,"x.x...x.",3,1],[8,90,"..x.x.x.",4,1]],[[8,96,"x.x.xxx.",5,2],[8,96,"xxx.x.x.",6,2],[8,96,"x.xxx.x.",7,2],[8,96,"x.x.x.xx",8,2],[8,96,"xxx.xxx.",9,2]],[[8,104,"x..x..x.",10,3],[8,104,"x..xx.x.",11,3],[8,104,"x.xx..x.",12,3],[8,104,"x.x..xx.",13,3],[8,104,"x..x.xx.",14,3]],[[8,112,"xx.xx.x.",15,4],[8,112,"x..x.x.x",16,4],[8,112,"xxx..xx.",17,4],[8,112,"x.xx.xx.",18,4],[8,112,".xx.x.x.",19,4]],[[8,108,"x.x.x.x.x.xxx...",20,5],[8,108,"x..x..x.x.x.x...",21,5],[8,108,"x.xxx...x.xx..x.",22,5],[8,108,"x.x.xx..x.xx.x..",23,5],[8,108,"xxx.x...xxx.x...",24,5]],[[16,100,"x...x.xxx...x...",25,6],[16,100,"xx..x...xx..x...",26,6],[16,100,"x...xx..x...xx..",27,6],[16,100,"x.x.xx..x...x...",28,6],[16,100,"x...x...xx.xx...",29,6]],[[8,124,"x.xxx.xx",30,7],[8,124,"xx.x.xx.",31,7],[8,124,"xxx.xx.x",32,7],[8,124,"x..xxx.x",33,7],[8,124,".x.xx.x.",34,7]],[[8,130,"x.xx.x..x.x.xx..",35,8],[8,130,"x..x..x.x..xx.x.",36,8],[8,130,"xx.x..x.xx.x....",37,8],[8,130,"x.x.xx.x..x.x.x.",38,8],[16,112,"x..xx.x.x..xx.x.",39,8]]],"signs":{"superb":567,"ok":300,"again":700,"over":700},"book":5,"titleW":33,"marks":{"start":["..#..",".###.","#####"],"press":["#####",".###.","..#..",".....","#####"],"turn":["..#.#..",".##.##.","###.###",".##.##.","..#.#.."]},"gag":750,"logo":1667,"dimFrom":4,"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1,"&":4},"smallGap":1};
// ===== beat.js =====
const HIT_MS = 120;                 // Relaxed (the default): a press this near its hit counts ...
const PERFECT_MS = 60;              // ... and this near is perfect
const STRICT_HIT_MS = 80, STRICT_PERFECT_MS = 40;      // the setting Timing = Strict
const PASS_SHARE = 0.7;             // a round passes with this share of its hits (rounded down: in the player's favour)
const FREE_STRAYS = 1;              // presses out of place that cost nothing; each one more takes a hit off the count
const SUPERB_SHARE = 0.6;           // SUPERB: every hit, and at least this share of them perfect
const INPUT_LAG_MS = 2;             // how long a press takes to reach this script (emulator: under 2 ms; the bar: not known)
const LEAD_BASE_MS = 0;             // a picture is sent LEAD_BASE_MS + LEAD_SHARE x (the median round trip of the last
const LEAD_SHARE = 1.0;             //   LEAD_KEEP requests of its kind) before its moment: on the bar a picture is on
const LEAD_START_MS = [45, 62, 85]; //   screen about when its request is answered. LEAD_START_MS: before any is measured
const LEAD_MAX_MS = 150, LEAD_KEEP = 15;      //   (requests of one, two, three and more elements, each kind by itself)
const SOUND_LEAD_MS = 20;           // a sound that stands alone (a click on a beat) is asked for this long before it
const BIAS_RATE = 0.3;              // the player's own offset: after a round the judging moves this share of the way
const BIAS_MAX_MS = 120;            //   towards the median offset of his hits (at least BIAS_MIN_HITS of them)
const BIAS_MIN_HITS = 3;
const LEVEL_AT = [0, 3, 6, 9, 11, 13, 15, 17];         // rounds passed at which levels 1-8 begin
const QUICK_GAP_MS = 330;           // a shown hit this close behind another: no rest picture between them
const ANSWER_MS = 120;              // how long the contact picture stays after a press
const MERGE_MS = 60;                // in your turn: what is due within this of a request that leaves goes with it, and
const FLIGHT_MAX_MS = 250;          //   nothing leaves while another request is under way (unless that one takes this long)
const CARD_MS = 1300;               // the card before a round (ROUND n, the hearts) stands at least this long
const HEARTS = 3, BONUS_EVERY = 5;  // every fifth round passed gives a heart back
const ROUNDS_AN_ACT = 3;
const APP = D.app;
const API = "http://localhost/api/";
const OFF = 300, STILL = 120;
const WHITE = "#FFFFFFFF", GREY = "#8A90A6FF", BLACK = "#000000FF";
const TOP_Z = 2000000000;
let stopped = false, mode = "boot";
const sleep = (ms) => new Promise((done) => setTimeout(done, Math.max(0, ms)));
const mod = (a, n) => ((a % n) + n) % n;
const ctl = { turn: 0, ok: false, start: false };
const taps = [];                    // the times of START's presses, not yet looked at
const turns = [];                   // the book at the start: its page turns as they came (1 on, -1 back, 0 the Back key)
let backs = 0, wake = null, lastPress = 0;
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
function leave() {                  // out of the app. Nothing may keep the script waiting: no timer is left running
stopped = true;                   // (a nap that is under way is ended; there is no other)
setTimeout(unbind, 10);
if (wake) wake();
}
const unbind = listen("input", (event) => {
if (stopped) return;
const now = Date.now();
if (D.debug) console.log(APP + " input " + event.key + " " + event.action + " " + now);
if (mode === "book") {            // the book: every key is a page turn and nothing else
if (event.key === "encoder") {
if (!event.delta) return;
turns.push(event.delta > 0 ? 1 : -1);
} else if (event.key === "start") {
if (event.action === "press") lastPress = now;
else if (event.action !== "short" || now - lastPress < 1500) return;
turns.push(1);
} else if (event.key === "ok" || event.key === "back") {
if (event.action !== "short") return;
turns.push(event.key === "ok" ? 1 : 0);
} else {
return;
}
if (wake) wake();
return;
}
if (event.key === "back") {
if (event.action !== "short") return;
if (mode === "title" || mode === "boot") {       // on the title page BACK ends the app
leave();
} else {
backs++;
}
} else if (event.key === "encoder") {
ctl.turn += event.delta > 0 ? 1 : event.delta < 0 ? -1 : 0;
} else if (event.key === "ok") {
if (event.action !== "short") return;
ctl.ok = true;
} else if (event.key === "start") {
if (event.action === "press") {
lastPress = now;
} else if (event.action !== "short" || now - lastPress < 1500) {
return;
}
taps.push(now);
ctl.start = true;
} else {
return;
}
if (wake) wake();
});
function keys() {
const k = { turn: ctl.turn, ok: ctl.ok, start: ctl.start, back: backs > 0 };
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
taps.length = 0;
return k;
}
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
const errs = { draw: 0, saved: "" };
function saveErrs() {
const line = "draw " + errs.draw;
if (line === errs.saved) return;
errs.saved = line;
call("POST", "storage/write?path=/ext/data/errors.txt", line, "application/octet-stream");
}
const recent = [[], [], []];        // the round trips of the last draw requests of one, two, three and more elements
function lead(n) {
const kind = Math.min(3, n || 1) - 1, v = recent[kind];
if (v.length === 0) return LEAD_START_MS[kind];
const s = v.slice().sort((x, y) => x - y);
return Math.min(LEAD_MAX_MS, Math.round(LEAD_BASE_MS + LEAD_SHARE * s[s.length >> 1]));
}
function measured(ms, n) {
const v = recent[Math.min(3, n || 1) - 1];
v.push(ms);
if (v.length > LEAD_KEEP) v.shift();
}
async function post(parts) {
const got = await call("POST", "display/draw",
'{"application_name":"' + APP + '","priority":50,"elements":[' + parts.join(",") + "]}");
if (!got.ok) {
errs.draw++;
report("draw", got.status + " " + got.text.slice(0, 80));
saveErrs();
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
let flying = 0;
const lat = { n: 0, sum: 0, max: 0 };
const T0 = Date.now();
const TR = D.trace ? [] : null;
let trDirty = false;
const since = () => Date.now() - T0;
function tr(line) {
if (!TR) return;
TR.push(line);
if (TR.length > 300) TR.shift();
trDirty = true;
}
async function trFlush() {
if (!TR || !trDirty) return;
trDirty = false;
const t0 = Date.now();
await call("POST", "storage/write?path=/ext/data/trace.txt", TR.join("\n") + "\n", "application/octet-stream");
tr("W trace.txt " + (Date.now() - t0));
trDirty = false;                               // (that last line goes out with the next writing)
}
const stat = (v) => {
const s = v.slice().sort((a, b) => a - b);
return s.length ? s[0] + " " + s[s.length >> 1] + " " + s[s.length - 1] : "- - -";
};
let rts = [], flyMax = 0;                         // a round's round trips, and the most requests under way at once
function fire(parts, done) {
const t0 = Date.now();
flying++;
if (flying > flyMax) flyMax = flying;
post(parts).then(() => {
flying--;
const ms = Date.now() - t0;
lat.n++;
lat.sum += ms;
if (ms > lat.max) lat.max = ms;
if (TR) rts.push(ms);
measured(ms, parts.length);                   // (elements that exist, moved or switched: the beat's own kind)
if (done) done(ms, t0);
});
}
let soundOn = true, strict = false;
const SETTINGS_EVERY_MS = 4000;      // on the title page the settings are read again this often ("Start over" is noticed there)
let resetOn = null, settingsDue = 0;              // "Start over" as the settings have it (null: not known)
function snd(name) {
if (soundOn) call("POST", "audio/play", '{"application_name":"' + APP + '","path":"sounds/' + name + '.snd"}');
}
async function readSettings() {
const got = await call("GET", "apps/settings?app_id=" + APP);
let v = {};
try {
v = (got.ok && JSON.parse(got.text).values) || {};
} catch (err) {
v = {};
}
soundOn = v.sound !== false && v.sound !== "false";
strict = v.judge === "strict";
resetOn = typeof v.reset === "boolean" ? v.reset : null;
}
const st = { best: 0, rounds: 0, scene: 0, bias: 0, seen: false, rs: null };
const whole = (v, max) => (typeof v === "number" && v >= 0 && v <= max ? Math.floor(v) : 0);
async function load() {
const got = await call("GET", "storage/read?path=/ext/data/beat.json");
try {
const kept = got.ok && !D.fresh ? JSON.parse(got.text) : null;
if (kept && typeof kept === "object") {
st.best = whole(kept.best, 9999);
st.rounds = whole(kept.rounds, 99999999);
st.scene = whole(kept.scene, D.acts.length - 1);
st.bias = typeof kept.bias === "number" && Math.abs(kept.bias) <= BIAS_MAX_MS ? Math.round(kept.bias) : 0;
st.seen = kept.seen === true;
st.rs = typeof kept.rs === "boolean" ? kept.rs : null;
}
} catch (err) {
}
if (D.scene) {
for (let i = 0; i < D.acts.length; i++) if (D.acts[i].k === D.scene) st.scene = i;
}
}
function save() {
return call("POST", "storage/write?path=/ext/data/beat.json", JSON.stringify(st), "application/octet-stream");
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
function freshEls() {
return tag([rect("bg", 0, 0, 72, 16, BLACK, 0), text("a", "START OVER", "bold", 36, -1, WHITE, "top_mid"),
text("b", "ALL CLEARED", "small", 36, 8, GREY, "top_mid")], "f");
}
async function checkReset() {
await readSettings();
if (!resetAsked()) return false;
st.best = st.rounds = st.scene = st.bias = 0;
st.seen = false;
st.rs = resetOn;
await save();
nameUntil = 0;
unsaved = false;
await draw("fresh", freshEls());
snd("pass");
await sleep(1500);
keys();
mode = "again";                   // the app begins like new: the author's mark, the book, its first page
return true;
}
let seed = D.seed === undefined ? 0 : ((D.seed * 7919 + 12345) % 2147483646) + 1;
function rnd(n) {
if (D.seed === undefined) return Math.floor(Math.random() * n);
seed = (seed * 16807) % 2147483647;
return Math.floor((seed / 2147483647) * n);
}
function smallWidth(s) {
let w = 0;
for (let i = 0; i < s.length; i++) w += D.small[s[i]] || (s[i] === " " ? 2 : 4);
return w + D.smallGap * (s.length - 1);
}
function rect(id, x, y, w, h, colour, z) {
return { id: id, type: "rectangle", x: x, y: y, width: w, height: h, fill: "solid", fill_colors: [colour], border_width: 0,
timeout: STILL, z_index: z };
}
function text(id, s, font, x, y, colour, align, z) {
return { id: id, type: "text", text: s, font: font, x: x, y: y, align: align || "top_left", color: colour, timeout: STILL,
z_index: z === undefined ? 4 : z };
}
function image(id, name, x, y, z) {
return { id: id, type: "image", path: "images/" + name + ".png", x: x, y: y, align: "top_left", timeout: STILL, z_index: z };
}
function film(id, name, x, y, z, loop) {
return { id: id, type: "animation", path: "animations/" + name + ".anim", x: x, y: y, align: "top_left", loop: loop === true,
section: "default", timeout: STILL, z_index: z };
}
function bitmap(id, data, x, y, z) {
return { id: id, type: "xpmbitmap", x: x, y: y, align: "top_left", timeout: STILL, data: data, z_index: z };
}
function tag(els, p) {
for (let i = 0; i < els.length; i++) els[i].id = p + "_" + els[i].id;
return els;
}
let zBase = 0;
const lifted = (z) => (z >= TOP_Z - 1000 ? z : z + zBase);
const wire = (el) => JSON.stringify(el.z_index >= TOP_Z - 1000 || zBase === 0 ? el : Object.assign({}, el, { z_index: el.z_index + zBase }));
const onTop = (id) => id[0] === "v" || id[0] === "z" || id[0] === "k";     // (ids of what lies over all pages)
const xpmRows = (rows, more) => {
let w = 0;
for (let i = 0; i < rows.length; i++) w = Math.max(w, rows[i].length);
const dots = ".".repeat(w);
return rows.map((r) => (r.replace(/#/g, "a") + dots).slice(0, w)).join("\n") + (more || "");
};
const markXpm = (rows, c) => "! XPM2\n" + rows[0].length + " " + rows.length + " 2 1\n. c none\na c " + c.slice(0, 7) + "\n" + xpmRows(rows);
const arrowUp = (c) => markXpm(D.marks.start, c);              // START
const turnMark = (c) => markXpm(D.marks.turn, c);              // the knob turned
const AMBER = "#FFB03CFF", QUIET = "#8A90A6FF", QUIET_GROUND = "#535664FF";
const guideCue = () => {
const m = D.marks.press, rows = [];
for (let i = 0; i < m.length; i++) rows.push("...." + (i === m.length - 1 ? m[i].replace(/#/g, "b") : m[i].replace(/#/g, "a")) + "........");
rows.push(".................", "aaa.a.a.a.aa..aaa", "a...a.a.a.a.a.aa.", "a.a.a.a.a.a.a.a..", "aaa.aaa.a.aa..aaa");
return "! XPM2\n17 " + rows.length + " 3 1\n. c none\na c " + QUIET.slice(0, 7) + "\nb c " + QUIET_GROUND.slice(0, 7) + "\n" + rows.join("\n");
};
const live = new Map();             // id -> { s: the element as last sent, t: when }
const loose = [];                   // ids that were sent by hand, on top of the page: gone with the next page
async function wipe(ids) {
for (let i = 0; i < ids.length; i++) live.delete(ids[i]);
if (ids.length === 0) return;
const got = await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
if (got.ok || got.status !== 400 || ids.length === 1) return;
for (let i = 0; i < ids.length; i++) {         // one id that is already gone makes the bar refuse the whole list
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: [ids[i]] }));
}
}
function remember(els) {
const at = Date.now();
live.clear();
for (let i = 0; i < els.length; i++) live.set(els[i].id, { s: wire(els[i]), t: at });
}
async function show(els) {
const now = Date.now(), batch = [], keep = {};
for (let i = 0; i < els.length; i++) {
const s = wire(els[i]), old = live.get(els[i].id);
keep[els[i].id] = 1;
if (old && old.s === s && now - old.t < 400 * STILL) continue;
batch.push({ id: els[i].id, s: s });
}
for (let i = 0; i < batch.length; i += 6) {
const part = batch.slice(i, i + 6);
if (await post(part.map((b) => b.s))) {
const at = Date.now();
for (let k = 0; k < part.length; k++) live.set(part[k].id, { s: part[k].s, t: at });
}
}
const stale = [];
for (const id of live.keys()) if (!keep[id]) stale.push(id);
await wipe(stale);
}
function over(id, name, z, x) {
return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":' + (x || 0) + ',"y":0,"align":"top_left",' +
'"loop":false,"section":"default","timeout":20,"z_index":' + z + "}";
}
function jaws(gap, w) {             // gap: the rows left open in the middle (16 = away, 0 = shut)
const bar = (id, y) => '{"id":"' + id + '","type":"rectangle","x":0,"y":' + y + ',"width":' + (w || 72) + ',"height":8,"fill":"solid",' +
'"fill_colors":["#000000FF"],"border_width":0,"timeout":' + STILL + ',"z_index":' + TOP_Z + "}";
return post([bar("zz_j1", -gap / 2), bar("zz_j2", 8 + gap / 2)]);
}
async function shut(w) {
await jaws(8, w);
await jaws(0, w);
}
async function open(w) {
await jaws(8, w);
await jaws(16, w);
}
let onPage = "";
async function draw(key, els) {
if (key === onPage) return show(els);
onPage = key;
await shut();
const olds = loose.splice(0);
for (const id of live.keys()) olds.push(id);
zBase += 100;                     // the new page: over the old one
const sent = await postAll(els.map(wire));
await wipe(olds.filter(onTop));
if (sent) remember(els);
else await show(els);
await open();
const mine = {};
for (let i = 0; i < els.length; i++) mine[els[i].id] = 1;
await wipe(olds.filter((id) => !onTop(id) && !mine[id]));
}
let nameUntil = 0, unsaved = false;
function titleEls(moving, markStill) {
const a = D.acts[st.scene], naming = Date.now() < nameUntil || st.best === 0;
const els = [rect("bg", 0, 0, 72, 16, BLACK, 0), image("st", a.k + "_t", 0, 0, 1),
text("pl", "PLAY", "small", 33, 3, WHITE),                     // under START's mark: play
bitmap("gd", guideCue(), 55, 0, 4),                            // at the knob: the press mark and GUIDE (OK opens the book)
bitmap("ud", turnMark(a.c), 34, 11, 4),                        // the knob turned: another act
text("ln", naming ? a.n : "BEST " + Math.min(st.best, 99), "small", 72, 9, naming ? a.c : GREY, "top_right")];
if (moving) els.push(film("f", a.k + "_idle", 0, 0, 2, true));
if (markStill) els.push(bitmap("g0", arrowUp(AMBER), 33, 1, 4));
else els.push(film("go", "go_bob", 33, 0, 5, true));
return tag(els, "t");
}
const plan = D.trace && D.auto ? [1, 1, 5] : null;
let planned = false;
async function title() {
if (onPage !== "title") await draw("title", titleEls(false, true));
await show(titleEls(true));
saveErrs();                       // (at rest: how many draw requests the bar refused, if that has changed)
await trFlush();
if (Date.now() >= settingsDue) {
settingsDue = Date.now() + SETTINGS_EVERY_MS;
if (await checkReset()) return;
}
if (plan && !planned) {
planned = true;
await sleep(1500);
newGame();
mode = "card";
return;
}
await nap(nameUntil ? Math.max(30, nameUntil - Date.now()) : Math.min(5000, Math.max(200, settingsDue - Date.now())));
if (stopped) return;
const k = keys();
if (k.turn) {
st.scene = mod(st.scene + (k.turn > 0 ? 1 : -1), D.acts.length);
nameUntil = Date.now() + 2200;
unsaved = true;
snd("tick");
await shut(D.titleW);           // another act: behind the bars, over the page's left part only
await show(titleEls(false));
await open(D.titleW);
return;
}
if (nameUntil && Date.now() >= nameUntil) {
nameUntil = 0;
if (unsaved) save();
unsaved = false;
}
if (k.ok) {                       // OK: the guide. It is shut again on this page; it starts nothing
nameUntil = 0;
await show(titleEls(true));
await bookMake(false);
await book(false);
return;
}
if (k.start) {                    // START: play
if (unsaved) save();
unsaved = false;
nameUntil = 0;
newGame();
mode = "card";
}
}
const g = { hearts: HEARTS, shown: HEARTS, passed: 0, act: 0, rhythm: null, last: -1, again: false, newBest: false };
function newGame() {
g.hearts = g.shown = D.hearts ? Math.max(1, Math.min(HEARTS, D.hearts)) : HEARTS;
g.passed = 0;
g.rhythm = null;
g.again = false;
g.newBest = false;
g.last = -1;
}
function levelNow() {
let level = 1;
for (let i = 0; i < LEVEL_AT.length; i++) if (g.passed >= LEVEL_AT[i]) level = i + 1;
return Math.min(8, level + (D.level || 1) - 1);
}
function pickRhythm() {
const level = plan && plan.length ? plan.shift() : levelNow();
const from = plan ? level : g.passed >= LEVEL_AT[7] + 4 ? 6 + rnd(3) : level > 1 && rnd(4) === 0 ? level - 1 : level;
const list = D.rh[from - 1];
let i = rnd(list.length);
if (from * 10 + i === g.last) i = (i + 1) % list.length;
g.last = from * 10 + i;
g.rhythm = list[i];
}
function endGame() {                // the game is over (or left): what it adds to what is kept
st.rounds += g.passed;
if (g.passed > st.best) st.best = g.passed;
save();
}
const HEART_X = [22, 32, 42];
let pre = [];                       // what the card made for the round, out of sight (the round's page takes it over)
function cardEls(n, hearts) {
const els = [rect("bg", 0, 0, 72, 16, BLACK, 0), text("r", "ROUND " + n, "bold", 36, -1, WHITE, "top_mid")];
for (let i = 0; i < HEARTS; i++) els.push(image("h" + i, i < hearts ? "heart" : "heart_off", HEART_X[i], 8, 2));
return tag(els, "c");
}
async function roundCard() {
if (await checkReset()) return;
if (!g.again || !g.rhythm) {
g.act = mod(st.scene + Math.floor(g.passed / ROUNDS_AN_ACT), D.acts.length);
pickRhythm();
}
await draw("card", cardEls(g.passed + 1, g.shown));
const cardAt = Date.now();
const E = roundEls(D.acts[g.act].k, g.rhythm[3], 64 / g.rhythm[2].length);
const park = (part) => part[1].replace(/"x":-?\d+/, '"x":' + OFF);
const warm = [E.contact(false), E.pose("ia"), E.pose("up"), E.pose("rec"), E.pose("hit"), E.says("watch"), E.says("3"), E.says("2"), E.says("1"),
E.says("go"), E.lamp(0, true), E.lamp(0, false), E.notes(true), E.notes(false)];
pre = ["p_ht", "p_sc", "p_pn", "p_cu", "p_rl"];
for (let i = 0; i < warm.length && !stopped; i++) {
const t0 = Date.now();
await post([park(warm[i])]);
if (i > 4) measured(Date.now() - t0, 1);      // (the first ones make their element: that takes longer)
}
for (let i = 0; i < 4 && !stopped; i++) {
const t0 = Date.now();
await post([park(E.pose(i % 2 ? "ia" : "hit")), park(E.lamp(i, false))]);
measured(Date.now() - t0, 2);
}
await post([park(E.pose("ia"))]);
const marks = [];                 // the marks of the presses: one a hit, three for presses out of place
for (let i = 0; i < g.rhythm[2].length; i++) if (g.rhythm[2][i] === "x") marks.push(E.mark("p_m" + marks.length, -1, "p"));
for (let i = 0; i < 3; i++) marks.push(E.mark("p_x" + i, -1, "m"));
for (let i = 0; i < marks.length; i++) pre.push(marks[i][0]);
await postAll(marks.map((m) => m[1]), 6);
if (g.hearts < g.shown) {                      // a heart was lost: it cracks and falls apart
await sleep(260);
snd("bonk");
await post([wire(film("c_hx", "heart_lost", HEART_X[g.hearts], 8, 6)), wire(image("c_h" + g.hearts, "heart_off", HEART_X[g.hearts], 8, 2))]);
loose.push("c_hx");
await sleep(700);
} else if (g.hearts > g.shown) {               // one came back
await sleep(260);
snd("pass");
await post([wire(film("c_hx", "heart_back", HEART_X[g.shown], 8, 6))]);
loose.push("c_hx");
await sleep(520);
}
g.shown = g.hearts;
live.clear();                                  // (the hearts were changed by hand: the next page takes all of it away)
for (let i = 0; i < HEARTS; i++) loose.push("c_h" + i);
loose.push("c_bg", "c_r");
await nap(Math.max(250, CARD_MS - (Date.now() - cardAt)));
if (backs) {
keys();
for (let i = 0; i < pre.length; i++) loose.push(pre[i]);     // (made for a round that does not come: away with the card)
pre = [];
mode = "pause";
return;
}
keys();
mode = "round";
}
function roundEls(act, n, pitch) {
const img = (id, name, x, y, z) => [id, '{"id":"' + id + '","type":"image","path":"images/' + name + '.png","x":' + x + ',"y":' + y +
',"align":"top_left","timeout":' + STILL + ',"z_index":' + lifted(z) + "}"];
let level = 1;
for (let l = 0; l < D.rh.length; l++) for (let i = 0; i < D.rh[l].length; i++) if (D.rh[l][i][3] === n) level = l + 1;
const dim = D.dimFrom && level >= D.dimFrom;
return {
dim: dim,
pose: (name) => img("p_sc", act + "_" + name, 0, 0, 2),                       // the act: columns 0-35
contact: (on) => img("p_ht", act + "_hit", on ? 0 : OFF, 0, 50),             // the answer to a press: moved on
says: (what) => img("p_pn", "pn_" + (what || "watch"), what ? 33 : OFF, 0, 60),   // the ONE prompt: watch, 3, 2, 1, go
lamp: (k, white) => img("p_cu", "cu" + pitch + (white ? "_w" : "_a"), k === "park" ? (pitch === 8 ? -2 : 0) : k < 0 ? OFF : 4 + k * pitch, 13, 70),
mark: (id, k, kind) => img(id, "mk" + pitch + "_" + kind, k < 0 ? OFF : 4 + k * pitch, 13, 80),
notes: (faint) => img("p_rl", (faint && dim ? "m_" : "n_") + n, 4, 13, 1),   // the phrase, written on the strip
};
}
function strip(res, strays, upto) {
const cells = Math.min(8, res.length + Math.min(strays, 2)), w = cells * 9 - 2, rows = [[], [], [], [], []];
for (let c = 0; c < cells; c++) {
for (let y = 0; y < 5; y++) for (let x = 0; x < 9; x++) rows[y].push(x === 3 && c < res.length ? "a" : ".");
if (c >= upto) continue;
const x0 = c * 9;
if (c >= res.length) {
const ch = c - res.length < FREE_STRAYS ? "e" : "d";
for (let k = 0; k < 3; k++) rows[1 + k][x0 + 2 + k] = rows[1 + k][x0 + 4 - k] = ch;
} else if (!res[c].done) {
for (let y = 1; y <= 3; y++) for (let x = 2; x <= 4; x++) rows[y][x0 + x] = "d";
rows[2][x0 + 3] = ".";
} else {
const d = res[c].d, dx = Math.max(-2, Math.min(2, Math.round(d / 40))), ch = res[c].perfect ? "b" : "c";
for (let y = 1; y <= 3; y++) for (let x = 2; x <= 4; x++) rows[y][x0 + x + dx] = ch;
}
}
let data = "! XPM2\n" + w + " 5 6 1\n. c none\na c #62667C\nb c #54EC80\nc c #FFD646\nd c #FF4238\ne c #7A3038";
for (let y = 0; y < 5; y++) data += "\n" + rows[y].join("").slice(0, w);
return bitmap("v_st", data, (72 - w) >> 1, 10, TOP_Z - 9);
}
async function playRound() {
const a = D.acts[g.act], r = g.rhythm, grid = r[0], bpm = r[1], pat = r[2], P = pat.length;
const beatMs = 60000 / bpm, spb = grid / 4, stepMs = beatMs / spb, pitch = 64 / P, half = spb / 2;
const hitMs = strict ? STRICT_HIT_MS : HIT_MS, perfectMs = strict ? STRICT_PERFECT_MS : PERFECT_MS;
const hits = [];
for (let k = 0; k < P; k++) if (pat[k] === "x") hits.push(k);
zBase += 100;                     // the round's page: over the card
const E = roundEls(a.k, r[3], pitch);
const pose = E.pose, contact = E.contact, says = E.says, lamp = E.lamp, mark = E.mark, notes = E.notes;
const first = [["p_bg", wire(rect("p_bg", 0, 0, 72, 16, BLACK, 0))], pose("ia"), notes(false), says("watch"), lamp(-1, false), contact(false)];
const made = {};
const own = (id) => {               // (what was put on screen is taken away with the page)
if (!made[id]) {
made[id] = 1;
loose.push(id);
}
};
onPage = "play";
await shut();
const olds = loose.splice(0);
for (const id of live.keys()) olds.push(id);
await postAll(first.map((p) => p[1]), 6);
await wipe(olds.filter(onTop));
live.clear();
for (let i = 0; i < first.length; i++) own(first[i][0]);
for (let i = 0; i < pre.length; i++) own(pre[i]);
pre = [];
await open();
await wipe(olds.filter((id) => !onTop(id) && !made[id]));
if (backs) return "pause";
taps.length = 0;
const tLead = Date.now() + 260, tShow = tLead + 2 * beatMs, tCount = tShow + P * stepMs, tGo = tCount + 3 * beatMs;
const tPlay = tGo + beatMs, tEnd = tPlay + P * stepMs;
const q = [];
const add = (at, parts, opt) => {   // `at`: when it is meant to be seen or heard; `send`: when its request leaves
const e = Object.assign({ at: at, parts: parts }, opt || {});
e.send = at - (e.raw ? 0 : parts ? lead(parts.length) : SOUND_LEAD_MS);
let i = q.length;
while (i > 0 && q[i - 1].send > e.send) i--;
q.splice(i, 0, e);
return e;
};
const hitAt = (k) => k < P && pat[k] === "x";
const soon = (k) => {               // is a hit due within the next eighth after step k ?
for (let n = k + 1; n <= k + half; n++) if (hitAt(n)) return true;
return false;
};
add(tLead, [lamp(P - 2 * spb, false)], { snd: "tick" });
add(tLead + beatMs, [lamp(P - spb, false)], { snd: "tick" });
if (hitAt(0)) add(tShow - Math.min(240, beatMs / 2), [pose("up")]);
let stance = "ia";
for (let k = 0; k < P; k++) {
const t = tShow + k * stepMs;
if (k === 0 && hitAt(0)) stance = "up";
if (hitAt(k)) {
add(t, [pose("hit"), lamp(k, false)], { snd: "drum", tag: "show" + k, log: "show " + k });
stance = "hit";
let gap = 1e9;                  // to whatever is sent next
for (let n = k + 1; n < P && gap > 1e8; n++) if (hitAt(n) || n % half === 0) gap = (n - k) * stepMs;
if (gap > 1e8) gap = (P - k) * stepMs;
if (gap >= 190) {
add(t + 90, [pose("rec")]);
stance = "rec";
}
if (gap >= 300 && hitAt(k + Math.round(gap / stepMs))) {       // the next hit follows at once: a short wind-up between
add(t + gap / 2 + 40, [pose("up")]);
stance = "up";
}
} else if (k % half === 0) {
const want = soon(k) ? "up" : "ia", parts = [lamp(k, false)];
if (want !== stance) parts.push(pose(want));
stance = want;
add(t, parts, k % spb === 0 ? { snd: "tick" } : null);
}
}
if (stance !== "ia") add(tCount + 130, [pose("ia")]);
add(tCount, [says("3"), lamp("park", true)], { snd: "tick", tag: "count0" });
for (let b = 1; b < 3; b++) add(tCount + b * beatMs, [says(String(3 - b))], { snd: "tick", tag: "count" + b });
if (E.dim) add(tCount + 1.5 * beatMs, [notes(true)]);              // (the dots fade: the guide of the higher levels)
add(tGo, [says("go")], { snd: "go", tag: "ready" });
add(tGo + 160, [pose("up")]);
for (let k = 0; k < P; k++) if (k % half === 0 || hitAt(k)) add(tPlay + k * stepMs, [lamp(k, true)], hitAt(k) ? { tag: "turn" + k } : null);
const res = hits.map((k) => ({ T: tPlay + k * stepMs, k: k, done: false, d: 0, perfect: false }));
let strays = 0, offEv = null, react = [], gagged = false;
for (let i = 0; i < res.length && D.auto; i++) {
const off = D.auto === "perfect" ? rnd(31) - 15 : D.auto === "late" ? (i % 2 ? -1 : 1) * (75 + rnd(31)) : i === 0 ? 0 : null;
if (off !== null) add(res[i].T + off, null, { raw: true, fn: (now) => tap(now + INPUT_LAG_MS + st.bias) });
}
if (D.auto === "miss") {             // ... and two presses out of place
add(tPlay + (hits[0] + 0.5) * stepMs + 40, null, { raw: true, fn: (now) => tap(now, true) });
add(tPlay + (hits[0] + 1.5) * stepMs + 40, null, { raw: true, fn: (now) => tap(now, true) });
}
function tap(at, stray) {
const tp = at - INPUT_LAG_MS - st.bias;
if (tp < tPlay - hitMs || tp > tEnd + 40) return null;
let best = -1, bd = 1e9;
for (let i = 0; i < res.length && !stray; i++) {
if (!res[i].done && Math.abs(tp - res[i].T) < Math.abs(bd)) {
bd = tp - res[i].T;
best = i;
}
}
const parts = [];
let sound, rec, late = null;
if (offEv && !offEv.gone) {        // (the press before is still showing its contact: its mark comes a moment later)
offEv.dead = true;
late = offEv.parts[1];
}
offEv = null;
for (let i = 0; i < react.length; i++) react[i].dead = true;      // (a gag that is still running stops here)
react = [];
if (best >= 0 && Math.abs(bd) <= hitMs) {      // on time: the contact, at once
const me = res[best];
me.done = true;
me.d = Math.round(bd);
me.perfect = Math.abs(bd) <= perfectMs;
parts.push(contact(true));
const then = [contact(false), mark("p_m" + best, me.k, me.perfect ? "p" : "g")];
if (gagged) then.push(pose("up"));
if (late) then.push(late);
gagged = false;
offEv = add(Date.now() + lead(then.length) + ANSWER_MS, then);
sound = me.perfect ? "ping" : "tock";
rec = "P " + (at - T0) + " " + best + " " + me.d + " " + (me.perfect ? "p" : "g") + " RT";
if (D.debug) console.log(APP + " hit " + best + " " + me.d);
} else {                           // out of place: a red mark and the gag - three pictures, then ready again
const step = Math.max(0, Math.min(P - 1, Math.round((tp - tPlay) / stepMs)));
parts.push(pose("g1"), mark("p_x" + Math.min(strays, 2), step, "m"));
if (late) parts.push(contact(false), late);
gagged = true;
const now = Date.now();
react.push(add(now + lead(1) + 170, [pose("g2")]), add(now + lead(1) + 380, [pose("g3")]), add(now + lead(1) + 620, [pose("up")], { fn: () => { gagged = false; } }));
strays++;
sound = "bonk";
rec = "P " + (at - T0) + " -1 " + Math.round(tp - tPlay) + " s RT";
if (D.debug) console.log(APP + " stray press " + Math.round(tp - tPlay));
}
return { parts: parts, snd: sound, rec: rec };
}
rts = [];
flyMax = 0;
let firedAt = 0;
const endAt = tEnd + hitMs + 30;
for (;;) {
let now = Date.now(), parts = null, sound = null, tags = null, recs = null, dues = null;
const put = (list) => {
if (!list) return;
parts = parts || {};
for (let i = 0; i < list.length; i++) parts[list[i][0]] = list[i][1];
};
const take = (got, how) => {
if (!got) return;
put(got.parts);
sound = got.snd || sound;
if (TR && got.rec) (recs = recs || []).push(got.rec + how);
};
if (backs || stopped) return "pause";
const turn = now >= tGo;
if (turn && flying > 0 && now - firedAt < FLIGHT_MAX_MS) {
await nap(Math.min(12, endAt - now + 1));
if (Date.now() >= endAt + FLIGHT_MAX_MS) break;
continue;
}
while (taps.length) take(tap(taps.shift()), " k");
const reach = turn && (parts || (q.length && q[0].send <= now + 2)) ? MERGE_MS : 2;
while (q.length && q[0].send <= now + (q[0].raw ? 2 : reach)) {
const e = q.shift();
if (e.dead) continue;
e.gone = true;
if (e.fn) take(e.fn(e.raw ? Math.round(e.at) : now), " a");
put(e.parts);
if (D.debug && e.log) console.log(APP + " " + e.log + " due " + Math.round(e.at) + " sent " + now + " lead " + lead(e.parts ? e.parts.length : 1));
if (TR && e.tag) (tags = tags || []).push("B " + e.tag + " " + Math.round(e.at - T0));
if (D.debug && e.parts && !e.raw && e.tag) (dues = dues || []).push([e.tag, e.at]);
if (e.snd) sound = sound || e.snd;
}
if (parts) {
const list = [], tg = tags, rc = recs, sn = sound, du = dues;
for (const id in parts) {
list.push(parts[id]);
own(id);
}
sound = null;
firedAt = now;
fire(list, (ms, sent) => {       // answered: now its sound
if (wake) wake();
if (sn) snd(sn);
for (let i = 0; du && i < du.length; i++) console.log(APP + " seen " + du[i][0] + " " + Math.round(sent + ms - du[i][1]) + " ms off its beat (" + list.length + " el, " + ms + " ms)");
for (let i = 0; tg && i < tg.length; i++) tr(tg[i] + " " + (sent - T0 - Number(tg[i].split(" ")[2])) + " " + ms + " " + list.length);
for (let i = 0; rc && i < rc.length; i++) tr(rc[i].replace("RT", String(ms)));
});
}
if (sound) snd(sound);
now = Date.now();
if (now >= endAt) break;
const next = q.length ? q[0].send : endAt;
await nap(Math.min(next, endAt) - now);
}
if (offEv && !offEv.gone) await post(offEv.parts.map((p) => p[1]));      // (the last contact goes, its mark comes)
let got = 0, perfect = 0;
const offs = [];
for (let i = 0; i < res.length; i++) {
if (!res[i].done) continue;
got++;
if (res[i].perfect) perfect++;
offs.push(res[i].d);
}
const N = res.length, need = Math.max(1, Math.floor(PASS_SHARE * N)), penalty = Math.max(0, strays - FREE_STRAYS);
const pass = got - penalty >= need, superb = got === N && penalty === 0 && perfect >= Math.ceil(SUPERB_SHARE * N);
offs.sort((x, y) => x - y);
const median = offs.length ? offs[offs.length >> 1] : 0;
let moved = false;
if (!D.auto && offs.length >= BIAS_MIN_HITS) {   // the player's own offset: the judging follows it, slowly
const was = st.bias;
st.bias = Math.max(-BIAS_MAX_MS, Math.min(BIAS_MAX_MS, Math.round(st.bias + BIAS_RATE * median)));
moved = st.bias !== was;
}
tr("R " + (g.passed + 1) + " " + a.k + " level " + r[4] + " bpm " + bpm + " grid " + grid + " steps " + P + " hits " + N + " got " + got + " perfect " + perfect +
" stray " + strays + " need " + need + " " + (superb ? "superb" : pass ? "ok" : "again") + " median " + median + " bias " + st.bias + " lead " + lead(1) + "/" + lead(2) +
" req " + rts.length + " rt " + stat(rts) + " fly " + flyMax);
if (D.debug) {
console.log(APP + " verdict " + (superb ? "superb" : pass ? "ok" : "again") + " got " + got + "/" + N + " need " + need + " perfect " + perfect + " stray " + strays +
" bias " + st.bias + " lead " + lead(1) + "/" + lead(2) + " draw ms avg " + (lat.n ? Math.round(lat.sum / lat.n) : 0) + " max " + lat.max + " n " + lat.n);
}
await post([says(null)[1], lamp(-1, true)[1], contact(false)[1]]);
if (!pass) {                                     // the act's gag as a film, for everybody to see (at rest: it may take its time)
own("p_gv");
await post([wire(film("p_gv", a.k + "_gag", 0, 0, 55))]);
snd("bonk");
await sleep(D.gag + 150);
} else {
await sleep(120);
}
if (backs || stopped) return "pause";
const name = superb ? "superb" : pass ? "ok" : "again";
await post([over("v_sg", "sign_" + name, TOP_Z - 10)]);
loose.push("v_sg", "v_st");
snd(superb ? "superb" : pass ? "pass" : "fail");
await sleep(D.signs[name] + 60);
const cells = Math.min(8, res.length + Math.min(strays, 2));
for (let n = 1; n <= cells; n++) {               // the dots come on one after the other
await post([wire(strip(res, strays, n))]);
await sleep(55);
}
const tw = Date.now();
if (moved) await save();                         // (at rest: a storage write holds the bar up)
await trFlush();
await nap((superb ? 1700 : 1500) - (Date.now() - tw));
if (backs || stopped) return "pause";
return pass ? "pass" : "fail";
}
async function round() {
const got = await playRound();
if (got === "pause") {
keys();
g.again = true;
mode = "pause";
return;
}
keys();
if (got === "pass") {
g.passed++;
g.again = false;
if (g.passed % BONUS_EVERY === 0 && g.hearts < HEARTS) g.hearts++;
if (g.passed > st.best) {                      // kept at once: a game that is left half-way still counts
st.best = g.passed;
g.newBest = true;
save();
}
mode = "card";
if (plan && plan.length === 0 && g.passed >= 3) {       // the planned rounds are played: back to the title
endGame();
mode = "title";
}
} else {
g.again = true;
g.hearts--;
mode = g.hearts > 0 ? "card" : "over";
}
}
function pauseEls() {
return tag([rect("bg", 0, 0, 72, 16, BLACK, 0), bitmap("up", arrowUp(AMBER), 33, 0, 4), text("go", "START: GO ON", "small", 36, 2, WHITE, "top_mid"),
text("q", "BACK: QUIT", "small", 36, 8, GREY, "top_mid")], "z");
}
async function pause() {
await draw("pause", pauseEls());
await nap(5000);
if (!ctl.ok && !ctl.start && !backs && await checkReset()) return;
const k = keys();
if (k.back) {
endGame();
mode = "title";
} else if (k.start || k.ok) {
mode = "card";
}
}
let overTurn = 0, overHint = false;
const dimmed = (c, dim) => c.slice(0, 7) + (dim ? "50" : "FF");
function overEls(score, hint, dim) {
const els = [rect("bg", 0, 0, 72, 16, BLACK, 0), film("sg", "sign_over", 0, 0, 2, false)];
if (hint) {
els.push(text("hi", "PRESS START", "small", 36, 8, dimmed(WHITE, dim), "top_mid"));
} else if (score !== null) {
els.push(text("sc", "SCORE " + Math.min(score, 99), "small", 3, 8, dimmed(WHITE, dim)),
text("be", "BEST " + Math.min(st.best, 99), "small", 70, 8, dimmed(g.newBest && score === g.passed ? "#FFCC40FF" : GREY, dim), "top_right"));
}
return tag(els, "o");
}
async function gameOver() {
if (onPage !== "over") {
st.rounds += g.passed;
save();
await draw("over", overEls(null));
snd("fail");
await sleep(D.signs.over + 500);
const steps = Math.min(g.passed, 8);
for (let i = 0; i <= steps; i++) {             // the score counts up
await show(overEls(steps ? Math.round(g.passed * i / steps) : 0));
await sleep(60);
}
if (g.newBest) snd("superb");
await trFlush();
overHint = false;
overTurn = Date.now() + 2600;
keys();
}
await nap(Math.max(40, Math.min(4000, overTurn - Date.now())));
const k = keys();
if (k.back) {
mode = "title";
} else if (k.start || k.ok) {
newGame();
mode = "card";
} else if (Date.now() >= overTurn) {             // the line dips to dark and comes back as the other one
if (await checkReset()) return;
await show(overEls(g.passed, overHint, true));
await sleep(60);
await show(overEls(null));                     // (never both lines at once)
overHint = !overHint;
await show(overEls(g.passed, overHint, true));
await sleep(60);
await show(overEls(g.passed, overHint, false));
overTurn = Date.now() + (overHint ? 2200 : 3000);
}
}
async function step() {
if (mode === "title") await title();
else if (mode === "again") await opening(false);
else if (mode === "card") await roundCard();
else if (mode === "round") await round();
else if (mode === "pause") await pause();
else if (mode === "over") await gameOver();
}
const BOOK_Z = TOP_Z - 100, BOOK_ALIVE_MS = 48000;
const leaf = (i, on) => wire(image("k_" + i, "bk_" + (i + 1), on ? 0 : OFF, 0, BOOK_Z - i));
const bookMark = (id, on) => '{"id":"' + id + '","type":"animation","path":"animations/go_bob.anim","x":' + (on ? 33 : OFF) +
',"y":0,"align":"top_left","loop":true,"section":"default","timeout":' + STILL + ',"z_index":' + (BOOK_Z + 1) + "}";
function bookMake(first) {
const parts = [];
for (let i = 0; i < D.book; i++) parts.push(leaf(i, false));
if (first) parts.push(bookMark("k_go", false));
return post(parts);
}
async function book(first) {
const last = D.book - 1, ids = [], markId = first ? "k_go" : "t_go";
let at = 0, shown = 0, sent = Date.now();
const pile = (from) => {
const parts = [];
for (let i = from; i <= last; i++) parts.push(leaf(i, i >= shown));
if (from === 0) parts.push(bookMark(markId, shown === 0));
return parts;
};
for (let i = 0; i <= last; i++) ids.push("k_" + i);
turns.length = 0;
mode = "book";
await post([leaf(0, true), bookMark(markId, true)]);           // page 1 first: it covers the others as they come
await post(pile(1));
if (first) await wipe(["zz_sp"]);
let go = false;
while (!stopped && !go) {
if (turns.length === 0) {
await nap(sent + BOOK_ALIVE_MS - Date.now());
if (!stopped && turns.length === 0 && Date.now() - sent >= BOOK_ALIVE_MS - 20) {
await post((first ? [wire(rect("l_bg", 0, 0, 72, 16, BLACK, 0))] : []).concat(pile(0)));
sent = Date.now();
}
continue;
}
while (turns.length && !go) {   // every key that came, in its order: one page each
const t = turns.shift();
if (at === last) {
go = true;
} else if (t > 0) {
at++;
} else if (at > 0) {
at--;
} else if (t === 0) {         // BACK on page 1: the book is shut
go = true;
}
}
if (!go && at !== shown) {
const lo = Math.min(at, shown), hi = Math.max(at, shown), parts = [];
for (let i = lo; i < hi; i++) parts.push(leaf(i, i >= at));
if ((at === 0) !== (shown === 0)) parts.push(bookMark(markId, at === 0));
await post(parts);
shown = at;
}
}
if (first) {
mode = "boot";
for (let i = 0; i < ids.length; i++) loose.push(ids[i]);     // (the last page stays until the title page lies under it)
loose.push("k_go");
} else {
const mine = titleEls(true).filter((e) => e.id === "t_go");  // the main screen's mark: back to its own place and depth
await post(mine.map(wire));
await wipe(ids);                // (the title page lies under it: there it is again)
mode = "title";
}
turns.length = 0;
keys();
return !stopped;
}
const SPLASH_MS = 1500;             // the author's mark (animations/splash.anim: 30 pictures, 20 a second)
const LOGO_EARLY_MS = 200;          // the name's film is asked for this long before the mark ends
async function opening(first) {
const t0 = Date.now();
mode = "boot";
const olds = loose.splice(0);
for (const id of live.keys()) olds.push(id);
await post([wire(rect("l_bg", 0, 0, 72, 16, BLACK, 0)), wire(film("zz_sp", "splash", 0, 0, TOP_Z + 5, false))]);
await wipe(olds);
live.clear();
loose.push("l_bg");
onPage = "logo";
if (first) {
await Promise.all([load(), readSettings()]);
if (resetAsked()) {             // "Start over" was flipped while the app was closed: it begins like new
st.best = st.rounds = st.scene = st.bias = 0;
st.seen = false;
st.rs = resetOn;
await save();
}
}
const read = !st.seen && !D.noguide && !plan;    // the book: once, the first time the app is used
if (read) await bookMake(true);
const until = async (at) => {     // (BACK ends the wait at once; other keys do not shorten it)
while (!stopped && Date.now() < at) await nap(at - Date.now());
};
let named = false;
if (!read && !(TR && first)) {
await until(t0 + SPLASH_MS - LOGO_EARLY_MS);
if (stopped) return false;
post([wire(film("l_f", "logo", 0, 0, 2, false))]);
loose.push("l_f");
named = true;
}
await until(t0 + SPLASH_MS);
if (stopped) return false;
keys();
if (read) {
await book(true);               // (it takes the author's mark away itself, when its first page lies under it)
if (stopped) return false;
st.seen = true;                 // read or shut, whichever way: it does not come by itself again
await save();
} else {
await wipe(["zz_sp"]);          // (it ends on black; under it is black, or the name's first picture)
}
settingsDue = Date.now() + SETTINGS_EVERY_MS;
if (named) {                      // the name: START or OK cuts it short
const t1 = t0 + SPLASH_MS;
while (!stopped && Date.now() - t1 < D.logo + 350 && !ctl.ok && !ctl.start) await nap(D.logo + 350 - (Date.now() - t1));
}
keys();
mode = "title";                   // (after the book: straight to the title page)
return !stopped;
}
async function main() {
if (!(await opening(true))) return;
while (!stopped) {
try {
await step();
} catch (err) {
report("beat", err);
await sleep(500);
}
}
}
main();

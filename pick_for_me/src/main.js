// Pick For Me: a reel that decides. Eight lists - what to eat, drink, wear, how to move, what to watch, where to
// go, yes or no, and a list of your own from the setting "My list". Turning the knob chooses the list, Start (or
// OK) spins: the reel blurs (a film the bar plays by itself), slows in three clicks, and the third
// word is the answer, in the largest letters that fit.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (the lists, widths of the bar's letters, lengths of the films), then the bar (its API,
// controls, elements, drawing, the blind between two pages), then the app (the lists and "My list", what is kept,
// "Start over", the page, the reel and how it lands, the knob), then the start (the author's mark, the reel
// spinning in, the guide to the controls).

const D = {"app":"io.github.windagh.pick_for_me","cats":[{"id":"EAT","top":"WHAT TO","name":"EAT","accent":"#FFA02EFF","words":["PIZZA","SUSHI","TACOS","RAMEN","BURGER","SALAD","CURRY","PASTA","PHO","BBQ","DUMPLINGS","SANDWICH","NOODLES","STEAK"]},{"id":"DRINK","top":"WHAT TO","name":"DRINK","accent":"#2EE0D0FF","words":["COFFEE","TEA","WATER","JUICE","SODA","SMOOTHIE","BOBA","BEER","WINE","COCOA","MATCHA","LEMONADE"]},{"id":"WEAR","top":"WHAT TO","name":"WEAR","accent":"#96BAFFFF","words":["BLACK","WHITE","NAVY","GREY","RED","GREEN","BEIGE","DENIM","PINK","YELLOW","PURPLE","BROWN","ORANGE"]},{"id":"MOVE","top":"HOW TO","name":"MOVE","accent":"#96EC3CFF","words":["WALK","RUN","YOGA","STRETCH","BIKE","SWIM","GYM","DANCE","HIKE","REST DAY"]},{"id":"WATCH","top":"WHAT TO","name":"WATCH","accent":"#FF5454FF","words":["COMEDY","DRAMA","ACTION","SCI-FI","HORROR","DOC FILM","ANIME","ROMANCE","THRILLER","MYSTERY","REWATCH"]},{"id":"GO","top":"WHERE TO","name":"GO","accent":"#FF60AAFF","words":["PARK","CAFE","MUSEUM","BEACH","BOOKSHOP","CINEMA","MARKET","LIBRARY","GALLERY","STAY HOME"]},{"id":"YESNO","top":"ASK ME","name":"YES / NO","accent":"#EEE4FFFF","words":["YES","NO","ASK AGAIN"]},{"id":"MINE","top":"FROM","name":"MY LIST","accent":"#FFD23CFF","words":[]}],"room":52,"wear":["BEIGE","BLACK","BROWN","DENIM","GREEN","GREY","NAVY","ORANGE","PINK","PURPLE","RED","WHITE","YELLOW"],"roll":150,"lit":600,"splash":1500,"guide":5,"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1},"smallGap":1,"bold":{"A":6,"B":6,"C":6,"D":6,"E":5,"F":5,"G":6,"H":6,"I":4,"J":5,"K":6,"L":5,"M":9,"N":7,"O":6,"P":6,"Q":6,"R":6,"S":6,"T":6,"U":6,"V":7,"W":10,"X":6,"Y":6,"Z":6,"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6,"+":6,"-":3,"!":2},"xl":{"A":7,"B":7,"C":7,"D":7,"E":6,"F":6,"G":7,"H":7,"I":4,"J":6,"K":7,"L":6,"M":8,"N":7,"O":7,"P":7,"Q":7,"R":7,"S":7,"T":6,"U":7,"V":8,"W":8,"X":7,"Y":7,"Z":6,"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7,"+":6,"-":3,"!":2},"normal":{"A":5,"B":5,"C":5,"D":5,"E":5,"F":5,"G":5,"H":5,"I":3,"J":4,"K":5,"L":4,"M":7,"N":5,"O":5,"P":5,"Q":5,"R":5,"S":5,"T":5,"U":5,"V":5,"W":7,"X":5,"Y":5,"Z":5,"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5,"+":5,"-":3,"!":1}};
const APP = D.app;
const API = "http://localhost/api/";
const OFF = 300;                    // where elements wait off-screen
const STILL = 120;                  // seconds an element lives without being sent again
const WHITE = "#FFFFFFFF";
let stopped = false;
let busy = false;                   // a change of page or a film is running
const sleep = (ms) => new Promise((done) => setTimeout(done, Math.max(0, ms)));
const ctl = { turn: 0, start: false, ok: false, n: 0 };      // n: how many presses of OK or Start (the guide counts them)
let onBack = null;                  // a function that returns true = "taken, the app goes on"; otherwise Back ends the app
let wake = null;
function nap(ms) {
if (ctl.turn || ctl.ok || ctl.start || stopped || bookBacks) return sleep(0);
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
function report(what, err) {
console.error(APP + ": " + what + ": " + (err && err.message ? err.message : String(err)));
}
async function call(method, path, body, type) {
if (D.lag) await sleep(80 + Math.random() * 70);     // TEST builds (--lag): every request is held as long as the real bar holds it
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
async function loadSettings() {
const got = await call("GET", "apps/settings?app_id=" + APP);
try {
return (got.ok && JSON.parse(got.text).values) || {};
} catch (err) {
return {};
}
}
function smallWidth(s) {
let w = 0;
for (let i = 0; i < s.length; i++) w += D.small[s[i]] || 4;
return w + D.smallGap * (s.length - 1);
}
function fontWidth(s, table, other) {
let w = 0;
for (let i = 0; i < s.length; i++) w += s[i] === " " ? 4 : (table[s[i]] || other);
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
timeout: STILL, z_index: z === undefined ? 4 : z };
}
function rect(id, x, y, w, h, color, z) {
return { id: id, type: "rectangle", x: x, y: y, width: w, height: h, fill: "solid", fill_colors: [color],
border_width: 0, timeout: STILL, z_index: z };
}
function film(id, name, x, y, z, loop) {
return { id: id, type: "animation", path: "animations/" + name + ".anim", x: x, y: y, align: "top_left", loop: loop === true,
section: "default", timeout: STILL, z_index: z };
}
function small(id, s, x, y, colour, align) {
return text(id, s, "small", x, y, colour, align || "top_left", 4);
}
function tag(els, p) {
for (let i = 0; i < els.length; i++) els[i].id = p + "_" + els[i].id;
return els;
}
function skipOurs(key, value) {
return key.charCodeAt(0) === 95 ? undefined : value;
}
function wire(el) {
return JSON.stringify(el, skipOurs);
}
const live = new Map();             // id -> { s: the element as last sent, t: when }
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
async function put(els) {
const parts = [];
for (let i = 0; i < els.length; i++) parts.push(wire(els[i]));
if (!parts.length) return;
if (await post(parts)) {
const at = Date.now();
for (let i = 0; i < els.length; i++) live.set(els[i].id, { s: parts[i], t: at });
}
}
async function wipe(ids) {
if (!ids.length) return;
for (let i = 0; i < ids.length; i++) live.delete(ids[i]);
const got = await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
if (got.ok || got.status !== 400 || ids.length === 1) return;
for (let i = 0; i < ids.length; i++) {       // one id that is already gone makes the bar refuse the whole list
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: [ids[i]] }));
}
}
async function show(els, n) {
const now = Date.now(), keep = {};
let batch = [], strings = [];
const flush = async () => {
if (!batch.length) return;
const sent = batch, parts = strings;
batch = [];
strings = [];
if (await post(parts)) {
const at = Date.now();
for (let i = 0; i < sent.length; i++) live.set(sent[i].id, { s: parts[i], t: at });
}
};
for (let i = 0; i < els.length; i++) {
const el = els[i], s = wire(el), old = live.get(el.id);
keep[el.id] = 1;
if (old && old.s === s && now - old.t < 400 * el.timeout) continue;
batch.push(el);
strings.push(s);
if (batch.length === (n || 6)) await flush();
}
await flush();
const stale = [];
for (const id of live.keys()) if (!keep[id]) stale.push(id);
await wipe(stale);
}
let onPage = "", wentBack = false;
const TOP_Z = 2000000000;           // above every page
function blind(id, name, x) {
const el = film(id, name, x, 0, id === "zz_c1" ? 2147481000 : 2147481001, false);
el.timeout = 20;
return wire(el);
}
async function draw(key, els) {
if (key === onPage || onPage === "") {
onPage = key;
return show(els);
}
const way = wentBack ? "roll_dn" : "roll_up";
wentBack = false;
onPage = key;
busy = true;
try {
await post([blind("zz_c1", way + "_in", 0)]);                      // at once: the press is answered
const t0 = Date.now(), olds = [], mine = {}, parts = [];
for (let i = 0; i < els.length; i++) {
mine[els[i].id] = 1;
parts.push(wire(els[i]));
}
for (const id of live.keys()) if (!mine[id]) olds.push(id);
await sleep(D.roll + 30 - (Date.now() - t0));                      // the blind is shut: only now the new page is put
let sent = true;                                                   // together (the bar shows a new element at once)
for (let i = 0; i < parts.length; i += 8) if (!(await post(parts.slice(i, i + 8)))) sent = false;
await wipe(olds);
if (sent) {
const at = Date.now();
live.clear();
for (let i = 0; i < els.length; i++) live.set(els[i].id, { s: parts[i], t: at });
} else {
await show(els);
}
await post([blind("zz_c2", way + "_out", 0), blind("zz_c1", way + "_in", OFF)]);
await sleep(D.roll + 40);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
} finally {
busy = false;
}
}
function over(id, name, z) {
const el = film(id, name, 0, 0, z || TOP_Z, false);
el.timeout = 30;
return wire(el);
}
let bookAt = -1, bookBacks = 0;     // the page on show (-1: no guide); Back presses the guide has taken
let bookShut = false;               // Back on the first page: the book is to be closed
const pageEl = (i, on) => film("k_p" + i, "guide_" + i, on ? 0 : OFF, 0, 20, true);
function bookEls(at) {
const els = [];
for (let i = 0; i < D.guide; i++) els.push(pageEl(i, i === at));
return els;
}
function bookBack() {               // (for onBack) true: the guide has taken the key
if (bookAt < 0) return false;
if (bookAt === 0) bookShut = true;               // on the first page Back closes the book
bookBacks++;
return true;
}
async function book(under) {
if (!live.get("k_p0")) await put(bookEls(-1));
bookAt = 0;
bookShut = false;
onPage = "book";
await put([pageEl(0, true)]);
if (under) await wipe([under]);
ctl.n = ctl.turn = bookBacks = 0;
ctl.ok = ctl.start = false;
let since = Date.now();                          // when the page on show came up
while (!stopped) {
await nap(50000);
const steps = ctl.n + ctl.turn - bookBacks, any = ctl.n || ctl.turn || bookBacks;
ctl.n = ctl.turn = bookBacks = 0;
ctl.ok = ctl.start = false;
if (stopped || bookShut) break;
if (!any) {
await put(bookEls(bookAt));                  // nothing was pressed: the pictures are only kept alive
continue;
}
if (bookAt === D.guide - 1) {                  // the last page: any key or turn, and the app begins - but not
if (Date.now() - since < 400) continue;      // one that was on its way before the page could be read
break;
}
const to = Math.max(0, Math.min(D.guide - 1, bookAt + steps));
if (to !== bookAt) {
await put([pageEl(to, true), pageEl(bookAt, false)]);
bookAt = to;
since = Date.now();
}
}
bookAt = -1;
}
const unbind = listen("input", (event) => {
if (stopped) return;
if (event.key === "back") {
if (event.action !== "short") return;
if (onBack && onBack()) {
if (wake) wake();
return;
}
stopped = true;                 // every loop ends at its next step; then nothing keeps the app alive
setTimeout(unbind, 10);
} else if (event.key === "encoder") {
ctl.turn += event.delta > 0 ? 1 : event.delta < 0 ? -1 : 0;
} else if (event.action === "short" && event.key === "ok") {
ctl.ok = true;
ctl.n++;
} else if (event.action === "short" && event.key === "start") {
ctl.start = true;
ctl.n++;
} else {
return;
}
if (wake) wake();
});
(function () {
const GREY = "#8A90A6FF", PASS = "#C4C8D8FF", BLACK = "#000000FF";
const DX = 16, MID = 44;            // the drum's left column; the column words are centred on
const FILE = "/ext/data/pick.json";
const UPDOWN = "! XPM2\n54 5 2 1\n. c none\na c #5E6274\n..a................................................a..\n.aa................................................aa.\naaa................................................aaa\n.aa................................................aa.\n..a................................................a..";
let cats = [], at = 0, res = null;  // the lists in use, the one on show, its answer (null: its title)
let last = {}, kept = "", mine = "", backs = 0, rigAt = 0, dirty = false;
let resetOn = null;                 // the setting "Start over" as it stands (null: not answered)
let seen = null;                    // kept: how that switch stood when last seen (null: never) - any change starts over once
let read = false;                   // kept: the guide has been read to its end
const until = (t) => sleep(t - Date.now());
const rnd = (n) => Math.floor(Math.random() * n);
function ownWords(s) {
const out = [];
const parts = String(s || "").toUpperCase().split(",");
for (let i = 0; i < parts.length && out.length < 16; i++) {
let w = parts[i].replace(/[^A-Z0-9 +!-]/g, "").replace(/\s+/g, " ").trim();
while (w.length > 1 && smallWidth(w) > D.room) w = w.slice(0, -1).trim();
if (w && out.indexOf(w) < 0) out.push(w);
}
return out;
}
function setLists(own) {
const was = cats.length ? cats[at].id : kept;
cats = [];
for (let i = 0; i < D.cats.length; i++) {
const c = D.cats[i];
if (c.id !== "MINE") cats.push(c);
else if (own.length) cats.push({ id: c.id, top: c.top, name: c.name, accent: c.accent, words: own });
}
at = 0;
for (let i = 0; i < cats.length; i++) if (cats[i].id === was) at = i;
if (cats[at].id !== was) res = null;
}
async function readSettings() {
const v = await loadSettings();
resetOn = typeof v.reset === "boolean" ? v.reset : null;
const now = typeof v.list === "string" && v.list ? v.list : (D.list || "");
if (now === mine && cats.length) return;
mine = now;
setLists(ownWords(now));
}
async function load() {
if (D.fresh) return;
const got = await call("GET", "storage/read?path=" + FILE);
try {
const k = got.ok ? JSON.parse(got.text) : null;
if (k && typeof k.cat === "string") kept = k.cat;
if (k && typeof k.rs === "boolean") seen = k.rs;
if (k && k.g === true) read = true;
if (k && k.last && typeof k.last === "object") {
for (const id in k.last) if (typeof k.last[id] === "string") last[id] = k.last[id];
}
} catch (err) {
}
}
function save() {
dirty = false;
return call("POST", "storage/write?path=" + FILE, JSON.stringify({ cat: cats[at].id, last: last, rs: seen, g: read }), "application/octet-stream");
}
function startOverAsked() {
if (resetOn === null) return false;
if (seen === null) {
seen = resetOn;
save();
return false;
}
return resetOn !== seen;
}
async function startOver() {
last = {};
at = 0;
res = null;
read = false;
seen = resetOn;
rigAt = 0;
await save();
}
async function guide(under) {
await book(under);
if (stopped || read) return;
read = true;
await save();
}
function cardEls() {                // the card that says so, for a moment: on the reel, like a title
return [rect("p_bg", 0, 0, 72, 16, BLACK, 0), drum(0), film("p_ic", "i_mine", 1, 1, 2),
small("p_t1", "START OVER", MID, -1, GREY, "top_mid"), text("p_t2", "CLEARED", "bold", MID, 6, "#FFD23CFF", "top_mid", 4)];
}
function fit(w) {
if (fontWidth(w, D.xl, 7) <= D.room) return ["extra_large", 1];     // rows 3-12
if (fontWidth(w, D.bold, 6) <= D.room) return ["bold", 3];          // rows 5-11
if (fontWidth(w, D.normal, 5) <= D.room) return ["normal", 3];
return ["small", 4];                                                // rows 6-10
}
function away(el) {
el.x = OFF;
return el;
}
const drum = (dy) => film("p_dr", "drum", DX, dy - 1, 1);
const reel = () => film("p_f", "spin", DX, 0, 5, true);
const title1 = (dy) => small("p_t1", "GUIDE", 55, dy - 2, GREY, "top_mid");                       // rows 0-4, columns 44-64
const PRESS = "! XPM2\n5 5 3 1\n. c none\na c #969EB8\nb c #5A5F6E\naaaaa\n.aaa.\n..a..\n.....\nbbbbb";
const cues = () => [film("p_sm", "start", 32, 0, 3, true),
{ id: "p_ga", type: "xpmbitmap", x: 66, y: 0, align: "top_left", timeout: STILL, data: PRESS, z_index: 3 }];
const title2 = (dy) => text("p_t2", cats[at].name, "bold", MID, 6 + dy, cats[at].accent, "top_mid", 4);   // rows 8-14
function icon(dy, word) {           // the list's icon; for an answer of WEAR, a shirt of that colour
const name = word && cats[at].id === "WEAR" && D.wear.indexOf(word) >= 0 ? "w_" + word.toLowerCase() : "i_" + cats[at].id.toLowerCase();
return film("p_ic", name, 1, 1 + dy, 2);
}
function passing(n, w, dy) {        // a word on its way past: never the largest letters, and pale
const f = fit(w);
return text("p_w" + n, w, f[0] === "extra_large" ? "bold" : f[0], MID, (f[0] === "small" ? 4 : 3) + dy, PASS, "top_mid", 3);
}
function answer(w, dy) {
const f = fit(w);
return text("p_res", w, f[0], MID, f[1] + dy, cats[at].id === "WEAR" ? WHITE : cats[at].accent, "top_mid", 4);
}
function pageEls() {
const els = [rect("p_bg", 0, 0, 72, 16, BLACK, 0), drum(0), icon(0, res)];
if (res === null) els.push(title1(0), title2(0), { id: "p_ud", type: "xpmbitmap", x: 17, y: 9, align: "top_left", timeout: STILL, data: UPDOWN, z_index: 3 }, ...cues());
else els.push(film("p_g", "glow", DX, 0, 2), answer(res, 0));
for (let i = 0; i < D.guide; i++) els.push(pageEl(i, false));
return els;
}
function clear(ids) {
const out = [];
for (let i = 0; i < ids.length; i++) {
const rec = live.get(ids[i]);
if (!rec) continue;
const el = JSON.parse(rec.s);
if (el.x !== OFF) out.push(away(el));
}
return out;
}
function choose() {
const c = cats[at], pool = c.words;
if (D.rig && rigAt < D.rig.length) return D.rig[rigAt++];
if (c.id === "YESNO") {           // yes or no, and once in a while "ask again"
const r = Math.random();
return r < 0.06 ? "ASK AGAIN" : r < 0.53 ? "YES" : "NO";
}
let w = pool[rnd(pool.length)];
for (let n = 0; n < 20 && pool.length > 3 && w === last[c.id]; n++) w = pool[rnd(pool.length)];
return w;
}
function others(pick) {             // two words of the list that pass before the answer
if (cats[at].id === "YESNO") return Math.random() < 0.5 ? ["YES", "NO"] : ["NO", "YES"];
const pool = cats[at].words, out = [];
for (let n = 0; n < 40 && out.length < 2; n++) {
const w = pool[rnd(pool.length)];
if (w !== pick && w !== out[0]) out.push(w);
}
while (out.length < 2) out.push(pool[(pool.indexOf(pick) + 1 + out.length) % pool.length]);
return out;
}
async function spin() {
const c = cats[at], pick = choose(), pass = others(pick);
last[c.id] = pick;
save();
const lift = res === null ? [title1(-2), title2(-2)] : [answer(res, -2), icon(0, null)];
await put(lift);
await sleep(70);
await put([reel()]);
await sleep(750);
if (stopped) return;
let t0 = Date.now();
const hidden = clear(["p_t1", "p_t2", "p_ud", "p_sm", "p_ga", "p_res", "p_g", "p_f"]);
await put([passing(0, pass[0], -10)].concat(hidden));
await until(t0 + 50);
await put([passing(0, pass[0], -3)]);
await until(t0 + 100);
await put([passing(0, pass[0], 1)]);
await until(t0 + 150);
await put([passing(0, pass[0], 0)]);
await until(t0 + 300);
t0 = Date.now();
const first = passing(0, pass[0], 0);
await put([passing(1, pass[1], -10), Object.assign({}, first, { y: first.y + 6 })]);
await until(t0 + 50);
await put([passing(1, pass[1], -3), Object.assign({}, first, { y: first.y + 13 })]);
await until(t0 + 100);
await put([passing(1, pass[1], 1), away(first)]);
await until(t0 + 150);
await put([passing(1, pass[1], 0)]);
await until(t0 + 380);
if (stopped) return;
t0 = Date.now();
res = pick;
const old = passing(1, pass[1], 0);
await put([answer(pick, -11), Object.assign({}, old, { y: old.y + 6 })]);
await until(t0 + 50);
await put([answer(pick, -4), Object.assign({}, old, { y: old.y + 13 })]);
await until(t0 + 100);
await put([answer(pick, 3), drum(1), away(old), icon(2, pick), film("p_u", "lit", DX, 0, 2), film("p_h", "hit", DX, 0, 6)]);
await until(t0 + 170);
await put([answer(pick, -2), drum(0), icon(-1, pick)]);
await until(t0 + 240);
await put([answer(pick, 1), icon(0, pick)]);
await until(t0 + 300);
await put([answer(pick, 0)]);
ctl.turn = 0;                                    // what was pressed while the reel ran is not a press on the answer
ctl.ok = ctl.start = false;
await nap(Math.max(700, D.lit + 100 - (Date.now() - t0)));       // the flourish plays out (a press cuts it short)
}
async function turnTo(dir) {
at = (at + dir + cats.length) % cats.length;
res = null;
dirty = true;
if (ctl.turn) return;
const d = dir > 0 ? 1 : -1;
await put(clear(["p_res", "p_g", "p_ud", "p_sm", "p_ga"]).concat([title1(-7 * d), title2(-7 * d), icon(-3 * d, null)]));
await sleep(45);
await put([title1(d), title2(d), icon(d, null)]);
await sleep(55);
}
function keys() {
const k = { turn: ctl.turn, ok: ctl.ok, start: ctl.start };
ctl.turn = 0;
ctl.n = 0;
ctl.ok = ctl.start = false;
return k;
}
async function step() {
await draw("page", pageEls());
await nap(dirty ? 1500 : IDLE);                  // (the list on show is kept once the knob has rested a moment)
const k = keys();
if (k.turn) return turnTo(k.turn > 0 ? 1 : -1);
if (k.ok && res === null) return guide("");      // on the main screen OK opens the guide; closing it leads back here
if (k.start || k.ok) return spin();              // Start spins; on an answer OK spins again too
if (dirty) save();
}
const IDLE = 5000;                  // the page at rest looks at the settings again this often (nothing is drawn for that)
onBack = () => bookBack();          // Back leaves the app - but in the guide it is a page back (on its first page it leaves)
async function opening(under) {
await draw("page", [rect("p_bg", 0, 0, 72, 16, BLACK, 0), drum(0), reel(), icon(0, null)]);
if (under) await wipe(["zz_sp"]);
await sleep(600);
const t0 = Date.now();
await put([title1(-9), title2(-9), away(reel())]);
await until(t0 + 50);
await put([title1(-3), title2(-3)]);
await until(t0 + 100);
await put([title1(2), title2(2), drum(1)]);
await until(t0 + 165);
await put([title1(-1), title2(-1), drum(0)]);
await until(t0 + 235);
keys();                                          // what was pressed meanwhile is not a press on the page
}
async function main() {
const SPLASH_MS = D.splash;                      // (the film's length, read off the file by the build: 1500)
await post([over("zz_sp", "splash", TOP_Z + 10)]);
const t0 = Date.now();
await load();
await readSettings();
const fresh = startOverAsked();
if (fresh) await startOver();
if (!fresh) await put(bookEls(-1));              // (the guide's pages are made now, off-screen, with the mark over them)
await until(t0 + SPLASH_MS);
if (stopped) return;
let under = true;                                // the mark is still on the screen
if (fresh) {                                     // "Start over" was switched on while the app was closed
await draw("card", cardEls());
await wipe(["zz_sp"]);
under = false;
await put(bookEls(-1));                        // (the guide's pages are made while the card is read)
await sleep(1500);
}
if (!read) {                                     // first use (or after "Start over"): the guide, a book of pages
await guide(under ? "zz_sp" : "");
under = false;
if (stopped) return;
}
await opening(under);
let settingsDue = Date.now() + IDLE;
const began = Date.now();
while (!stopped) {
try {
if (Date.now() >= settingsDue) {
settingsDue = Date.now() + IDLE;
await readSettings();
if (startOverAsked()) {                    // "Start over", switched on while the app runs: the card, the first page
await startOver();
await draw("card", cardEls());
await put(bookEls(-1));                  // (the guide's pages are made while the card is read)
await sleep(1500);
if (!stopped) await guide("");
if (!stopped) await opening(false);
continue;
}
}
await step();
if (Date.now() - began > 100000) saveErrs();   // once, after 100 s: errors.txt says "draw 0" when all is well
} catch (err) {
report("pick", err);
await sleep(500);
}
}
}
main();
})();

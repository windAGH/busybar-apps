// Lucky Reels: a three-reel slot machine for the BUSY Bar. Play coins only - nothing can be bought, won or cashed
// out. The top button spins, the wheel sets the bet, a press of the wheel shows coins, best win and the pay table.
// The reels blur (films the bar plays by itself) and stop one after another with a few hand-timed pictures; a win
// lights the reels and counts into the balance; three sevens or diamonds bring up the JACKPOT sign.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (the three reels' strips, the pay table, widths of the bar's letters, lengths of the films),
// then the bar (its API, controls, elements, drawing, the blind between two pages), then the app (what is kept,
// the settings and "Start over", the game page, the reels and how they stop, a win, the bet, the info pages, the
// new game), then the start (the author's mark, the reels spinning in, the guide to the controls).

const D = {"app":"io.github.windagh.lucky_reels","names":{"c":"cherry","l":"lemon","v":"clover","b":"bell","d":"diamond","7":"seven"},"rx":[17,30,43],"strips":["bclbclclcvdlbvc7lcdvlc","c7vcdcblclbvlcdclclvbl","bcvclcbc7clcbvldcvlcvl"],"pay":{"7":100,"d":50,"b":25,"v":15,"l":10,"c":5},"pair":2,"spin":800,"win":850,"roll":150,"coins":850,"jackpot":4700,"broke":3700,"guide":5,"splash":1500,"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1},"smallGap":1,"bold":{"A":6,"B":6,"C":6,"D":6,"E":5,"F":5,"G":6,"H":6,"I":4,"J":5,"K":6,"L":5,"M":9,"N":7,"O":6,"P":6,"Q":6,"R":6,"S":6,"T":6,"U":6,"V":7,"W":10,"X":6,"Y":6,"Z":6,"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6,"+":6,"-":3,"!":2},"xl":{"A":7,"B":7,"C":7,"D":7,"E":6,"F":6,"G":7,"H":7,"I":4,"J":6,"K":7,"L":6,"M":8,"N":7,"O":7,"P":7,"Q":7,"R":7,"S":7,"T":6,"U":7,"V":8,"W":8,"X":7,"Y":7,"Z":6,"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7,"+":6,"-":3,"!":2},"normal":{"A":5,"B":5,"C":5,"D":5,"E":5,"F":5,"G":5,"H":5,"I":3,"J":4,"K":5,"L":4,"M":7,"N":5,"O":5,"P":5,"Q":5,"R":5,"S":5,"T":5,"U":5,"V":5,"W":7,"X":5,"Y":5,"Z":5,"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5,"+":5,"-":3,"!":1}};
const APP = D.app;
const API = "http://localhost/api/";
const OFF = 300;                    // where elements wait off-screen
const STILL = 120;                  // seconds an element lives without being sent again
const WHITE = "#FFFFFFFF";
let stopped = false;
let busy = false;                   // a change of page or a film is running
const sleep = (ms) => new Promise((done) => setTimeout(done, Math.max(0, ms)));
const ctl = { turn: 0, start: false, ok: false, n: 0 };      // n: how many presses of OK or the top button (the guide counts them)
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
const pageEl = (i, on) => film("k_p" + i, "guide_" + i, on ? 0 : OFF, 0, 20, true);
function bookEls(at) {
const els = [];
for (let i = 0; i < D.guide; i++) els.push(pageEl(i, i === at));
return els;
}
function bookBack() {               // (for onBack) true: the guide has taken the key
if (bookAt < 0) return false;
if (bookAt === 0) return false;   // on the first page Back leaves the app
bookBacks++;
return true;
}
async function book(under) {
if (!live.get("k_p0")) await put(bookEls(-1));
bookAt = 0;
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
if (stopped) break;
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
const GOLD = "#FFD23CFF", GREY = "#8A90A6FF", DIM = "#5E6274FF", BLACK = "#000000FF";
const BETS = [1, 2, 5, 10, 25];
const RX = D.rx;                    // the three drums' left columns
const REST = 1;                     // the row of a symbol's picture at rest
const FILE = "storage/read?path=/ext/data/slots.json";
const st = { coins: 100, bet: 5, best: 0, spins: 0, rs: false };
let mode = "game", backs = 0, infoAt = 0, quick = false, guideOn = true, resetOn = null;
let face = ["v", "7", "d"];         // the symbols on show
let shown = 100;                    // the balance as the screen says it (it counts up to st.coins after a win)
let rigAt = 0, dirty = false;
const until = (t) => sleep(t - Date.now());
function fmt(n) {                   // a number that fits its 16 columns
return n < 10000 ? String(n) : n < 1000000 ? Math.floor(n / 1000) + "K" : Math.floor(n / 1000000) + "M";
}
async function load() {
if (D.fresh) return;
const got = await call("GET", FILE);
try {
const kept = got.ok ? JSON.parse(got.text) : null;
const whole = (v) => typeof v === "number" && v >= 0 && v < 1e9 && Math.floor(v) === v;
if (kept && kept.rs === true) st.rs = true;
if (kept && whole(kept.coins)) {
st.coins = kept.coins;
if (BETS.indexOf(kept.bet) >= 0) st.bet = kept.bet;
if (whole(kept.best)) st.best = kept.best;
if (whole(kept.spins)) st.spins = kept.spins;
}
} catch (err) {
}
}
function save() {
dirty = false;
return call("POST", "storage/write?path=/ext/data/slots.json", JSON.stringify(st), "application/octet-stream");
}
async function readSettings() {
const v = await loadSettings();
quick = v.quick === true;
guideOn = v.guide !== false;
resetOn = typeof v.reset === "boolean" ? v.reset : null;      // (null: not answered - nothing is concluded from that)
}
function startOverAsked() {
if (resetOn === null) return false;
if (!resetOn) {
if (st.rs) {
st.rs = false;
save();
}
return false;
}
return !st.rs;
}
async function startOver() {
st.coins = 100;
st.bet = 5;
st.best = 0;
st.spins = 0;
st.rs = true;
await save();
call("PUT", "apps/settings?app_id=" + APP, JSON.stringify({ version: 1, values: { quick: quick, guide: guideOn, reset: false } }));
shown = 100;
face = ["v", "7", "d"];
infoAt = 0;
rigAt = 0;
}
function cardEls() {                // the card that says so, for a moment
return [rect("c_bg", 0, 0, 72, 16, BLACK, 0), film("c_coin", "coin_big", 6, 2, 1),
small("c_a", "START OVER", 45, 0, WHITE, "top_mid"), small("c_b", "100 COINS", 45, 7, GOLD, "top_mid")];
}
function sym(id, s, k, dy) {
return film("g_" + id + k, "s_" + D.names[s], RX[k], REST + dy, 3);
}
function away(el) {
el.x = OFF;
return el;
}
const plate = (k, dy) => film("g_p" + k, "drum", RX[k], dy - 1, 1);
const reel = (k) => film("g_f" + k, "spin_" + k, RX[k], 0, 5, true);
const mid = (id, s, c, y, colour) => {
const w = smallWidth(s);
return small(id, s, Math.min(c - (w >> 1), 71 - w), y, colour);        // (four wide digits: a column to the left, off the edge)
};
const balEl = () => mid("g_bal", fmt(shown), 8, 8, GOLD);
const labEl = (win) => mid("g_lab", win ? "WIN" : "BET", 64, 0, win ? GOLD : GREY);
const valEl = (n, win, dy) => mid("g_val", fmt(n), 64, 8 + dy, win ? GOLD : WHITE);
function gameEls() {
const els = [rect("g_bg", 0, 0, 72, 16, BLACK, 0)];
for (let k = 0; k < 3; k++) els.push(plate(k, 0));
for (let k = 0; k < 3; k++) els.push(sym("a", face[k], k, 0));
els.push(film("g_coin", "coin", 5, 1, 2), balEl(), labEl(false), valEl(st.bet, false, 0));
return els;
}
function payout(r) {
if (r[0] === r[1] && r[1] === r[2]) return D.pay[r[0]];
return (r[0] === "c") + (r[1] === "c") + (r[2] === "c") === 2 ? D.pair : 0;
}
const rnd = (n) => Math.floor(Math.random() * n);
function stopAt(k, ch, not) {       // a stop of reel k that shows `ch` (or, with `not`, anything else)
const strip = D.strips[k];
for (let i = rnd(strip.length), n = 0; n < strip.length; n++, i = (i + 1) % strip.length) {
if ((strip[i] === ch) !== !!not) return i;
}
return 0;
}
function roll() {
const want = D.rig ? D.rig[Math.min(rigAt++, D.rig.length - 1)] : "";
if (want === "jackpot") return [stopAt(0, "7"), stopAt(1, "7"), stopAt(2, "7")];
if (want === "diamond") return [stopAt(0, "d"), stopAt(1, "d"), stopAt(2, "d")];
if (want === "small") return [stopAt(0, "l"), stopAt(1, "l"), stopAt(2, "l")];
if (want === "pair") return [stopAt(0, "c"), stopAt(1, "b"), stopAt(2, "c")];
if (want === "near") return [stopAt(0, "7"), stopAt(1, "7"), stopAt(2, "7", true)];
for (;;) {
const s = [rnd(D.strips[0].length), rnd(D.strips[1].length), rnd(D.strips[2].length)];
if (want !== "lose" || payout([D.strips[0][s[0]], D.strips[1][s[1]], D.strips[2][s[2]]]) === 0) return s;
}
}
async function stopReels(res, outs, tease, first) {
for (let k = 0; k < 3 && !stopped; k++) {
if (k === 2 && tease) await sleep(650);        // two sevens or two diamonds: the third reel makes you wait
const t0 = Date.now(), one = [sym("a", res[k], k, -10), sym("b", outs[k], k, 6), away(reel(k))];
if (first) one.unshift(plate(k, 0));           // (the very first page: the drum comes with its first symbol)
await put(one);
await until(t0 + 50);
await put([sym("a", res[k], k, -4), sym("b", outs[k], k, 12)]);
await until(t0 + 100);
await put([sym("a", res[k], k, 2), plate(k, 1), away(sym("b", outs[k], k, 0))]);
await until(t0 + 165);
await put([sym("a", res[k], k, -1), plate(k, 0)]);
await until(t0 + 235);
await put([sym("a", res[k], k, 0)]);
if (k < 2) await until(t0 + 350);
}
}
async function spin() {
const s = roll(), res = [], outs = [];
for (let k = 0; k < 3; k++) {
res.push(D.strips[k][s[k]]);
outs.push(D.strips[k][(s[k] + 1) % D.strips[k].length]);
}
const win = payout(res) * st.bet;
st.coins = Math.min(999999999, st.coins + win - st.bet);        // the result is kept before it is shown: leaving
st.spins++;                                                     // in the middle of a spin loses nothing
if (win > st.best) st.best = win;
save();
shown = st.coins - win;
const lift = [balEl()];
for (let k = 0; k < 3; k++) lift.push(sym("a", face[k], k, -2));
await put(lift);
await sleep(70);
await put([reel(0), reel(1), reel(2)]);
face = res;
await sleep(quick ? 300 : 750);
await stopReels(res, outs, res[0] === res[1] && (res[0] === "7" || res[0] === "d"));
ctl.turn = 0;                                    // what was pressed while the reels ran is not a press on the result
ctl.ok = ctl.start = false;
if (stopped) return;
if (win) await celebrate(res, win);
if (st.coins < 1) {
mode = "broke";
} else if (st.bet > st.coins) {                  // the bet is never more than the balance
let i = BETS.length - 1;
while (i > 0 && BETS[i] > st.coins) i--;
st.bet = BETS[i];
dirty = true;
}
}
async function count(steps) {
const from = shown, gain = st.coins - shown;
steps = Math.min(Math.abs(gain), steps);
for (let i = 1; i <= steps && !ctl.start && !stopped; i++) {
const t0 = Date.now();
const next = from + Math.round(gain * (1 - Math.pow(1 - i / steps, 2.4)));
if (next !== shown) {
shown = next;
await put([balEl()]);
}
await until(t0 + 34);
}
shown = st.coins;
await put([balEl()]);
}
async function celebrate(res, win) {
const three = res[0] === res[1] && res[1] === res[2], big = three && (res[0] === "7" || res[0] === "d");
const lights = [];
for (let k = 0; k < 3; k++) {
if (three || res[k] === "c") lights.push(film("g_u" + k, "lit", RX[k], 0, 2), film("g_h" + k, "hit", RX[k], 0, 6));
}
const t0 = Date.now();
await put(lights);
if (big) {
await sleep(450);
await post([over("zz_jp", "jackpot")]);
await sleep(D.jackpot + 60);
await wipe(["zz_jp"]);
ctl.turn = 0;
ctl.ok = ctl.start = false;
if (stopped) return;
await put(lights);                             // and the reels light up again under it
}
await put([labEl(true), valEl(win, true, 0), film("g_fly", "coins", 0, 0, 7)]);
await nap(300);                                  // the first coins are on their way
await count(big ? 34 : 18);
const end = (big ? Date.now() : t0) + 1500;
await nap(end - Date.now());                     // the light plays out; any control cuts it short
}
async function setBet(turn) {
let i = Math.max(0, Math.min(BETS.length - 1, BETS.indexOf(st.bet) + turn));
while (i > 0 && BETS[i] > st.coins) i--;
const same = BETS[i] === st.bet, dy = turn > 0 ? 1 : -1;
st.bet = BETS[i];
dirty = true;
await put([valEl(st.bet, false, same ? -dy : dy * 3)]);
await sleep(45);
if (!same) {
await put([valEl(st.bet, false, -dy)]);
await sleep(45);
}
await put([valEl(st.bet, false, 0)]);
}
const PAGES = ["stat", "7", "d", "b", "v", "l", "c", "cc", "more"];
function infoEls(i) {
const p = PAGES[i], els = [rect("i_bg", 0, 0, 72, 16, BLACK, 0)];
if (p === "stat" || p === "more") {
const more = p === "more";
els.push(small("i_a", more ? "SPINS" : "COINS", 3, 0, GREY), small("i_b", String(more ? st.spins : st.coins), 68, 0, more ? WHITE : GOLD, "top_right"));
if (more) els.push(small("i_e", "PLAY COINS ONLY", 3, 7, DIM));
else els.push(small("i_c", "BEST WIN", 3, 7, GREY), small("i_d", String(st.best), 68, 7, WHITE, "top_right"));
} else {
const s = p.charAt(0), n = String(p === "cc" ? D.pair : D.pay[s]), left = 67 - (7 * n.length - 1);
els.push(film("i_s0", "s_" + D.names[s], 1, 1, 2), film("i_s1", "s_" + D.names[s], 14, 1, 2));
if (p === "cc") els.push(small("i_any", "ANY", 37, 4, DIM, "top_mid"));
else els.push(film("i_s2", "s_" + D.names[s], 27, 1, 2));
els.push(text("i_n", n, "bold", left, 3, GOLD, "top_left", 4), small("i_x", "X", left - 5, 4, GREY));
}
els.push(rect("i_tr", 70, 1, 1, 14, "#262836FF", 1), rect("i_th", 70, 1 + Math.round(i * 12 / (PAGES.length - 1)), 1, 2, WHITE, 2));
return els;
}
function newEls() {
return [rect("n_bg", 0, 0, 72, 16, BLACK, 0), film("n_coin", "coin_big", 6, 2, 1),
small("n_a", "NEW GAME?", 45, 0, WHITE, "top_mid"), small("n_b", "PRESS OK", 45, 7, GOLD, "top_mid")];
}
async function newGame() {
st.coins = 100;
st.bet = 5;
save();
shown = 0;
face = ["v", "7", "d"];
mode = "game";
await draw("game", gameEls());
await put([film("g_fly", "coins", 0, 0, 7)]);    // a hundred coins fly in
await sleep(300);
await count(24);
}
function keys() {
const k = { turn: ctl.turn, ok: ctl.ok, start: ctl.start, back: backs > 0 };
ctl.turn = 0;
ctl.ok = ctl.start = false;
ctl.n = 0;
backs = 0;
return k;
}
onBack = () => {                    // Back leaves the pay table; everywhere else it leaves the app
if (bookAt >= 0) return bookBack();              // (in the guide: a page back; on its first page it leaves the app)
if (mode !== "info") return false;
backs++;
return true;
};
const IDLE = 5000;                  // a page at rest looks at the settings again this often (nothing is drawn for that)
async function step() {
if (mode === "game") {
await draw("game", gameEls());
await nap(dirty ? 1500 : IDLE);                 // (a new bet is kept once the wheel has rested a moment)
const k = keys();
if (k.start) return spin();
if (k.turn) await setBet(k.turn);
else if (k.ok) mode = "info";
else if (dirty) save();
if (k.ok) infoAt = 0;
} else if (mode === "info") {
await draw("info" + infoAt, infoEls(infoAt));
await nap(IDLE);
const k = keys();
if (k.ok || k.back || k.start) {
wentBack = true;
mode = "game";
} else if (k.turn) {
const next = Math.max(0, Math.min(PAGES.length - 1, infoAt + (k.turn > 0 ? 1 : -1)));
wentBack = next < infoAt;
infoAt = next;
}
} else if (mode === "broke") {                   // the purse is empty: a little scene, then the question
await sleep(500);
if (stopped) return;
await draw("broke", [rect("b_bg", 0, 0, 72, 16, BLACK, 0), film("b_f", "broke", 0, 0, 1)]);
keys();
await nap(D.broke + 900);                       // (any press cuts the scene short)
keys();
mode = "new";
} else {
await draw("new", newEls());
await nap(IDLE);
const k = keys();
if (k.ok || k.start) await newGame();
}
}
async function opening(under) {
mode = "game";
await draw("game", [rect("g_bg", 0, 0, 72, 16, BLACK, 0), reel(0), reel(1), reel(2), film("g_coin", "coin", 5, 1, 2), balEl(), labEl(false), valEl(st.bet, false, 0)]);
if (under) await wipe(["zz_sp"]);
await sleep(700);
await stopReels(face, ["c", "l", "b"], false, true);
keys();                                          // what was pressed meanwhile is not a press on the game
}
async function main() {
const SPLASH_MS = D.splash;                      // (the film's length, read off the file by the build: 1500)
await post([over("zz_sp", "splash", TOP_Z + 10)]);
const t0 = Date.now();
await readSettings();
await load();
const fresh = startOverAsked();
if (fresh) await startOver();
if (D.start !== undefined) st.coins = D.start;
while (BETS.indexOf(st.bet) > 0 && st.bet > st.coins) st.bet = BETS[BETS.indexOf(st.bet) - 1];
shown = st.coins;
if (guideOn && !fresh) await put(bookEls(-1));
await until(t0 + SPLASH_MS);
if (stopped) return;
let under = true;                                // the mark is still on the screen
if (fresh) {                                     // "Start over" was switched on while the app was closed
await draw("card", cardEls());
await wipe(["zz_sp"]);
under = false;
await sleep(1500);
}
if (guideOn) {                                   // the guide: a book of pages, turned by the player (core.js)
await book(under ? "zz_sp" : "");
under = false;
if (stopped) return;
}
if (st.coins < 1) {
mode = "new";
await draw("new", newEls());
if (under) await wipe(["zz_sp"]);
keys();
} else {
await opening(under);
}
let settingsDue = Date.now() + IDLE;
const began = Date.now();
while (!stopped) {
try {
if (Date.now() >= settingsDue) {
settingsDue = Date.now() + IDLE;
await readSettings();
if (startOverAsked()) {                    // "Start over", switched on while the app runs: the card, a new game
await startOver();
await draw("card", cardEls());
await sleep(1500);
if (!stopped) await opening(false);
continue;
}
}
await step();
if (Date.now() - began > 100000) saveErrs();   // once, after 100 s: errors.txt says "draw 0" when all is well
} catch (err) {
report("slots", err);
await sleep(500);
}
}
}
main();
})();

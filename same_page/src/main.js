// Same Page: a party game for a group round the BUSY Bar. A band of light runs across the screen between two
// opposites; a target hides on it behind a shutter. The clue-giver peeks with Start and says one clue, the others turn
// the knob to where they think the target is, and Start opens the shutter: the nearer the marker, the more points.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (the pairs of opposites, the colours of the words, the widths of the target, the verdicts,
// the lengths of the films, the widths of the bar's letters), then the bar (its API, controls, drawing), then the
// game (the pairs and what is kept, the back screen, the page and its pieces, the shutter, the cues, a round, the
// card behind Back, the main screen, the guide, "Start over", the start).

const D = {"app":"io.github.windagh.same_page","pairs":["COLD/HOT","QUIET/LOUD","CHEAP/PRICEY","BORING/FUN","OLD/NEW","SNACK/MEAL","EASY/HARD","RARE/TYPICAL","WEIRD/NORMAL","JUNK/USEFUL","SOFT/CRISPY","SWEET/SALTY","SLOW/FAST","SMALL/HUGE","LIGHT/HEAVY","DRY/WET","CLEAN/MESSY","EARLY/LATE","SHORT/LONG","EMPTY/FULL","CALM/HECTIC","LAZY/ACTIVE","SAFE/RISKY","FRESH/STALE","PLAIN/FANCY","DULL/SHINY","BLAND/SPICY","HOME/ABROAD","CITY/WILD","WORK/PLAY","NEED/WANT","CHORE/TREAT","LARK/OWL","TIDY/JUMBLE","QUICK/ALL DAY","TINY/GIANT","THIN/THICK","SMOOTH/ROUGH","CASUAL/FORMAL","SOLO/GROUP","STILL/MOVING","LOW/HIGH","NEAR/FAR","DARK/BRIGHT","ROUND/SQUARE","SALAD/CAKE","TEA/COFFEE","WALK/DRIVE","TEXT/CALL","SAVE/SPEND","FIX/TOSS","RENT/OWN","PLAN/WING IT","HOBBY/JOB","ONCE/DAILY","KIDS/ADULTS","MONDAY/FRIDAY","BEACH/SNOW","CUTE/SCARY","NAP/PARTY","VILLAIN/HERO","CURSED/HOLY","STINKY/LOVELY","SOGGY/COZY","PEST/PET","ILLEGAL/LEGAL","LAME/SUPERB","MILD/WILD","TAME/FERAL","DORKY/COOL","CRINGE/SLICK","PUN/POETRY","YUCK/TASTY","GOBLIN/ANGEL","SWAMP/PALACE","POTATO/GENIUS","WEAK/MIGHTY","SNEAKY/HONEST","NORMIE/WIZARD","KITTEN/LION","BABY/ELDER","SPOOKY/CUDDLY","JINXED/LUCKY","TRASH/GOLD","PANIC/CHILL","CLUMSY/NIMBLE","IMP/SAINT","SLOTH/ROCKET","ANT/WHALE","MEOW/ROAR","FLAT/FIZZY","CRUMB/FEAST","DRIP/FLOOD","POKE/PUNCH","SIGH/YELL","MEH/WHOA","OOPS/NAILED","NERD/JOCK","BEIGE/MAGIC","CRUSTY/SILKY","FAIL/FLEX","TICKLE/TACKLE","SNORE/THRILL","ROTTEN/RIPE","FAKE/REAL","EVIL/GOOD","GLOOM/HOPE","CRY/LAUGH","HATE IT/LOVE IT","FLOP/HIT","BALLAD/BANGER","CHEESY/CLASSY","INDIE/POP","NICHE/VIRAL","RETRO/FUTURE","GUILTY/PROUD","SKIP/REPLAY","TRAGIC/COMIC","TRASHY/ARTSY","HATED/LOVED","FAD/STAPLE","ONE HIT/LEGEND","MELLOW/HYPE","SAD/HAPPY","DEEP/FLUFF","TALKY/ACTION","NOBODY/ICON","FACT/MYTH","GRAVE/SILLY","SNOB/FAN","LIVE/STUDIO","LYRICS/BEAT","BOOK/MOVIE","ANALOG/DIGITAL","LOCAL/GLOBAL","ROOKIE/PRO","HUMBLE/FLASHY","HEAD/HEART","LUCK/SKILL","NATURE/TECH","CREEPY/FUNNY","PEACE/DRAMA","BASIC/EDGY","STAR/EXTRA","WISE/NAIVE","DIRECT/POLITE","STINGY/LAVISH","GENTLE/FIERCE","PAPER/SCREEN","BONUS/A MUST","RIPOFF/STEAL","TOY/TOOL","RUMOR/PROOF","CHAOS/ORDER","THEN/NOW","SEQUEL/FIRST","COVER/DEMO","DIY/BOUGHT","STRICT/LOOSE"],"cut":[58,109],"zones":{"narrow":[0,2,4],"normal":[1,4,7],"wide":[2,6,10]},"verdicts":[[0,"MISSED","#FF485CFF"],[2,"JUST","#4CC4FFFF"],[3,"CLOSE","#46E68CFF"],[4,"SPOT ON","#FFD03CFF"]],"pals":[["#80B3FFFF","#FF9D85FF"],["#82EDCDFF","#F695E1FF"],["#FFDF82FF","#7CDFFFFF"],["#FF9CB3FF","#9DA5FFFF"],["#D1F689FF","#B5A5FFFF"],["#C29FFFFF","#FFDE89FF"],["#6BE7ECFF","#FFACA5FF"],["#90ECA3FF","#FFB980FF"]],"by":[3,17,35,54,67],"flare":600,"open":1067,"reveal":1767,"close":800,"wipe":400,"wipeOut":733,"wipeHold":300,"sign":[1500,1400,1400,1500],"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1,"&":4},"smallGap":1,"xl":{"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7},"bold":{"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6},"normal":{"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5}};
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
// ===== scale.js =====
(function () {
const GOLD = "#FFD03CFF", GREY = "#969CAAFF", DIMMED = "#5A5F6EFF";
if (D.lag) {                        // TEST builds (--lag): every draw request is held for 80-150 ms, as on a slow bar
const real = post;
post = async function (parts) {
await sleep(80 + Math.random() * 70);
return real(parts);
};
}
const ZONES = D.zones;              // zone -> the furthest column from the target's middle that scores 4, 3, 2 points
const VERDICTS = D.verdicts;        // [points, word, colour]: MISSED, JUST, CLOSE, SPOT ON
const HOME = 35;                    // where the marker waits: the middle of the band (columns 1-70)
const LOOP = 300;                   // seconds a looping film lives without being sent again (sending restarts it)
const SPLASH_MS = 1500;             // the author's mark at the start (animations/splash.anim): how long it plays
const st = { v: 1, words: "all", deck: [], at: 0, total: 0, rounds: 0, t: 0, play: "words", g: 0, rs: false };
let phase = "new";                  // "new" | "peek" | "guess" | "shown"
let r = null;                       // the round: its pair, colours, target (c), marker (m); moved: the knob was turned;
let doorOpen = false;               // the shutter's doors are apart
let thread = 0;                     // columns of the thread from the marker towards the target
let nudge = 0;                      // the marker shakes its head (the knob after a reveal)
let zoneSet = "normal", wordsSet = "all";
let starting = true;                // the start film is on: Back leaves the app
let inMenu = false;                 // the main screen is on: Back leaves the app
let inBook = false;                 // the guide is open (Back turns its pages back, and closes it on the first one)
let startOverNow = false;           // "Start over" was switched on: everything kept is to be cleared
let toMenu = false;                 // MENU was taken on the Back card
let demoC = 50;                     // how to play: where the made-up target is
let cue = null, cueDy = 0, cueEnd = 0;       // the cue on show: [left, right, kind, colour]; how far it has slid in; when it leaves (0: it stays)
let stallAt = 0, stalls = 0;        // when the players count as stalling, and how often they have been told
let backs = 0, turnAt = 0;
let seed = D.seed ? (D.seed % 2147483646) + 1 : 1 + Math.floor(Math.random() * 2147483645);
function rnd(n) {
seed = (seed * 48271) % 2147483647;
return seed % n;
}
function pool(words) {
const a = words === "silly" ? D.cut[0] : 0;
const b = words === "everyday" ? D.cut[0] : words === "silly" ? D.cut[1] : D.pairs.length;
const out = [];
for (let i = a; i < b; i++) out.push(i);
return out;
}
function shuffle(avoid) {
const d = pool(st.words);
for (let i = d.length - 1; i > 0; i--) {
const j = rnd(i + 1), t = d[i];
d[i] = d[j];
d[j] = t;
}
if (d.length > 1 && d[0] === avoid) {           // the pair that was dealt last is not the first of the new round
const j = 1 + rnd(d.length - 1);
d[0] = d[j];
d[j] = avoid;
}
st.deck = d;
st.at = 0;
}
function nextPair() {
if (st.at >= st.deck.length) shuffle(st.deck.length ? st.deck[st.deck.length - 1] : -1);
return st.deck[st.at++];
}
let keptFile = null;                // what was in storage at the start
async function readKept() {
if (D.fresh || D.seed) return;
const got = await call("GET", "storage/read?path=/ext/data/scale.json");
try {
const kept = got.ok ? JSON.parse(got.text) : null;
if (kept && kept.v === 1) {
keptFile = kept;
st.rs = kept.rs === true;
st.g = kept.g ? 1 : 0;
}
} catch (err) {
}
}
function load() {
let fresh = true;
const kept = keptFile;
if (kept) {
const age = Date.now() - kept.t;               // a game goes on if it was played in the last three hours
if (age >= 0 && age < 10800000 && kept.total >= 0 && kept.rounds >= 0) {
st.total = Math.floor(kept.total) || 0;
st.rounds = Math.floor(kept.rounds) || 0;
st.play = kept.play === "blank" ? "blank" : "words";
}
const all = kept.words === wordsSet && Array.isArray(kept.deck) ? pool(wordsSet) : null;
if (all && kept.deck.length === all.length && kept.at >= 0 && kept.at <= all.length &&
kept.deck.every((i) => typeof i === "number" && i >= all[0] && i <= all[all.length - 1])) {
fresh = false;                               // the order of the pairs goes on where it was
st.deck = kept.deck;
st.at = Math.floor(kept.at);
}
}
st.words = wordsSet;
if (fresh) shuffle(-1);
if (D.total) {                                 // (test builds: a game that is under way)
st.total = D.total;
st.rounds = Math.ceil(D.total / 4);
}
}
function save() {
st.t = Date.now();
return call("POST", "storage/write?path=/ext/data/scale.json", JSON.stringify(st), "application/octet-stream");
}
async function readSettings() {
const v = await loadSettings();
zoneSet = ZONES[v.zone] ? v.zone : "normal";
if ((v.reset === true) !== st.rs) {            // "Start over": the switch has been flipped (either way)
st.rs = v.reset === true;
if (keptFile || r) startOverNow = true;      // (on first use there is nothing to compare with: its position is only noted)
}
const words = v.words === "everyday" || v.words === "silly" ? v.words : "all";
if (words !== wordsSet) {
wordsSet = words;
if (r) {                                       // another list: its pairs from the next deal on
st.words = words;
shuffle(-1);
}
}
}
function rect(id, x, y, w, h, colour, z) {
const el = bar(id, x, y, w, h, colour, z);
el.timeout = STILL;
return el;
}
function film(id, name, x, y, z, loop) {
return { id: id, type: "animation", path: "animations/" + name + ".anim", x: x, y: y, align: "top_left", loop: loop !== false,
section: "default", timeout: loop === false ? T : LOOP, z_index: z };
}
function small(id, s, x, y, colour, align, z) {
const el = text(id, s, "small", x, y, colour, align || "top_left", z === undefined ? 8 : z);
el.timeout = STILL;
return el;
}
function tag(els, p) {
for (let i = 0; i < els.length; i++) els[i].id = p + "_" + els[i].id;
return els;
}
const ease = (t) => 1 - (1 - t) * (1 - t) * (1 - t);
const clampTo = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
function backEls(c, m1, m2, f, m) {
const T = (id, s, font, y, colour) => ({ id: id, type: "text", text: s || " ", font: font, x: 80, y: y, align: "top_mid", color: colour,
display: "back", timeout: STILL, z_index: 5 });
const R = (id, x, y, w, h, colour, z) => ({ id: id, type: "rectangle", x: x, y: y, width: w, height: h, fill: "solid", fill_colors: [colour],
border_width: 0, display: "back", timeout: STILL, z_index: z });
const on = m !== undefined && m !== null;
return [R("y_bg", 0, 0, 160, 80, "#000000FF", 1), T("y_c", c, "small", D.by[0], "#FFFFFFA0"), T("y_1", m1, "large", D.by[1], WHITE),
T("y_2", m2, "large", D.by[2], WHITE), T("y_f", f, "small", D.by[4], "#FFFFFFA0"),
R("y_bar", on ? 10 : OFF, D.by[3] + 3, 128, 2, "#FFFFFF60", 3), R("y_pin", on ? 9 + Math.round((m - 1) * 125 / 69) : OFF, D.by[3], 3, 8, WHITE, 6)];
}
function gameBack() {
const pair = st.play === "blank" ? "YOUR OWN SCALE" : r.L + " - " + r.R;
if (phase === "new") return backEls("ROUND " + (st.rounds + 1), "CLUE-GIVER:", "PRESS START", pair, r.moved ? r.m : null);
if (phase === "peek") return backEls("NO PEEKING", "CLUE-GIVER", "IS LOOKING", pair);
if (phase === "guess") return backEls(pair, r.armed ? "TURN TO GUESS" : "HEAR THE CLUE", r.armed ? "START: REVEAL" : "THEN TURN",
r.armed ? "START: REVEAL, OK: NEW ROUND" : "TURN THE KNOB, THEN START", r.m);
if (!lastVerdict) return backEls(pair, "AND THE", "ANSWER IS ...", " ", r.m);          // (the shutter is opening: the verdict is not out yet)
return backEls(pair, lastVerdict, "TOTAL " + st.total, "START OR OK: NEXT", r.m);
}
let lastVerdict = "";               // the back screen after a reveal: the verdict and its points, once the front has shown them
const endMark = (c, right) => "! XPM2\n6 5 2 1\n. c none\na c " + c.slice(0, 7) + "\n" +
(right ? "a...aa\naa..aa\naaa.aa\naa..aa\na...aa" : "aa...a\naa..aa\naa.aaa\naa..aa\naa...a");
function bitmap(id, data, x, y, z) {
return { id: id, type: "xpmbitmap", x: x, y: y, align: "top_left", timeout: STILL, data: data, z_index: z };
}
function cueEls(c, dy) {
const els = [rect("cb", 0, dy, 72, 7, "#000000FF", 9)], ink = c[3] || WHITE;
if (!c[2]) els.push(small("c1", c[0], 36 - (smallWidth(c[0]) >> 1), dy - 1, ink, "top_left", 10));
else if (c[2] === "tap") {
els.push(small("c1", c[0], 32, dy - 1, ink, "top_right", 10));
if (c[1]) els.push(small("c2", c[1], 41, dy - 1, ink, "top_left", 10));
} else els.push(small("c1", c[0], c[2] === "turn" ? 54 : 59, dy - 1, ink, "top_right", 10));
if (c[2]) els.push(film("cm", "m_" + c[2], c[2] === "tap" ? 33 : c[2] === "turn" ? 55 : 60, dy, 10));
return els;
}
function gameEls(fl) {
const p = D.pals[r.pal], e = ZONES[r.zone][2];
const pinOn = phase === "guess" || phase === "shown" || (phase === "new" && r.moved);
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0),
film("band", "band" + r.pal, 0, 7, 1),
film("glow", "glow_" + r.zone, doorOpen ? r.c - e - 1 : OFF, 8, 2),
film("glass", "glass", 1, 8, 3),
film("shut", "shut", doorOpen ? OFF : 0, 8, 4)];
if (thread) els.push(rect("th", r.c > r.m ? r.m + 1 : r.m - thread, 15, thread, 1, "#FFFFFFB4", 6));
els.push(film("pin", "pin", pinOn ? r.m - 1 + nudge : OFF, 7, 7));
if (st.play === "blank") {                      // nothing at the ends but their marks, and a faint line towards the middle
els.push(bitmap("el", endMark(p[0], false), 1, 1, 8), bitmap("er", endMark(p[1], true), 65, 1, 8),
rect("l1", 10, 3, 19, 1, p[0].slice(0, 7) + "50", 8), rect("l2", 43, 3, 19, 1, p[1].slice(0, 7) + "50", 8));
} else {
els.push(small("wl", fl ? fl[0] : r.L, 1, -1, p[0]), small("wr", fl ? fl[1] : r.R, 72, -1, p[1], "top_right"));
}
els.push(film("ic", phase === "peek" ? "i_shut" : phase === "shown" ? "i_next" : r.armed ? "i_star" : "i_eye", 32, 1, 8));
if (cue) {
const c = cueEls(cue, cueDy);
for (let i = 0; i < c.length; i++) els.push(c[i]);
}
return tag(els, "g").concat(gameBack());
}
function keys() {
const k = { turn: ctl.turn, ok: ctl.ok, start: ctl.start, back: backs > 0 };
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
return k;
}
onBack = () => {                                 // Back leaves the app during the start film and on the main screen
if (starting || (inMenu && !inBook)) return false;
backs++;
return true;
};
const pending = () => ctl.turn !== 0 || ctl.ok || ctl.start || backs > 0;      // a control was used and has not been looked at yet
function rest(ms) {
return pending() ? Promise.resolve() : nap(ms);
}
function anyKey() {                              // was a control used? (and whatever it was is forgotten)
const k = keys();
return k.turn !== 0 || k.ok || k.start || k.back;
}
function keep() {
const els = [];
for (const rec of live.values()) els.push(rec.el);
return sync(els, true);
}
async function untilKey() {
anyKey();                                      // (what was pressed while the page came up does not count)
while (!stopped) {
await nap(20000);
if (anyKey()) return;
await keep();
}
}
async function wipe(ids) {
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
}
function over(id, name, x, y, z) {
return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":' + x + ',"y":' + y +
',"align":"top_left","loop":false,"section":"default","timeout":20,"z_index":' + z + "}";
}
async function curtain(under) {
await post([over("zz_w1", "wipe_in", 0, 0, 3000)]);
await sleep(D.wipe + 110);
await under();
await post([over("zz_w2", "wipe_out", 0, 0, 3001)]);
await sleep(D.wipeHold - 110);
await wipe(["zz_w1"]);
await sleep(D.wipeOut - D.wipeHold + 190);
await wipe(["zz_w2"]);
}
let onPage = "";
async function draw(key, els) {
if (key === onPage || onPage === "") {
onPage = key;
return sync(els);
}
onPage = key;
busy = true;
try {
await curtain(async () => {
const olds = [], mine = {};
for (let i = 0; i < els.length; i++) mine[els[i].id] = 1;
for (const id of live.keys()) if (!mine[id]) olds.push(id);
const sent = (await postAll(els.filter((el) => !el.display).map((el) => wire(el)))) &&
(await post(els.filter((el) => el.display).map((el) => wire(el))));
await drop(olds);
if (sent) remember(els);
else await sync(els, true);
});
} finally {
busy = false;
ctl.ok = ctl.start = false;                  // a press while the page was changing is not a press on the new page
}
}
function byId(els) {
const by = {};
for (let i = 0; i < els.length; i++) by[els[i].id] = els[i];
return by;
}
async function sync(els, partial) {
const back = els.filter((el) => {
if (!el.display) return false;
const rec = live.get(el.id);
return !rec || rec.s !== wire(el);
});
if (back.length) await putWith([], back);
return show(els, partial);
}
async function putWith(before, els, after) {
const parts = els.map((el) => wire(el));
if (await post(before.concat(parts, after || []))) {
const at = Date.now();
for (let i = 0; i < els.length; i++) live.set(els[i].id, { s: parts[i], t: at, el: els[i] });
}
}
async function part(reveal) {
const name = reveal ? "reveal" : "open", t0 = Date.now();
doorOpen = true;
const els = gameEls(), by = byId(els);
await putWith([over("zz_door", name, 0, 8, 5)], [by.g_shut, by.g_pin]);
await sync(els, true);                         // the target's light, and the sign under Start
await sleep(D[name] + 130 - (Date.now() - t0));
await wipe(["zz_door"]);                       // (its last picture is empty)
}
async function shutDoors(guessing) {
const t0 = Date.now(), end = t0 + D.close + 230;
await post([over("zz_door", "close", 0, 8, 5), wire(byId(gameEls()).g_pin)]);
await sync(gameEls(), true);                   // the sign under Start
while (Date.now() < end) {
if (!guessing) {
await sleep(end - Date.now());
} else {
await nap(end - Date.now());
if (ctl.turn) {
const n = ctl.turn;
ctl.turn = 0;
await turned(n);
await sync(gameEls(), true);
}
}
}
doorOpen = false;
const els = gameEls();
await putWith([], [byId(els).g_shut], [over("zz_door", "close", OFF, 8, 5)]);
await sync(els, true);
await wipe(["zz_door"]);
}
async function cueStep(els) {
const changed = els.filter((el) => {
const rec = live.get(el.id);
return !rec || rec.s !== wire(el);
});
if (changed.length > 8) return sync(els, true);
if (changed.length) await putWith([], changed);
}
async function cueIn(c, ms, els) {
const page = els || gameEls, replaced = cue !== null;
if (replaced) {                                // another one is on: it starts to leave first
cueDy = -4;
await cueStep(page());
}
cue = c;
const t0 = Date.now();
cueDy = -4;
await cueStep(page());
let spent = Date.now() - t0;
if (replaced) await sync(page());              // (takes away what the last cue left)
await sleep(20);
const t1 = Date.now();
cueDy = 0;
await cueStep(page());
spent += Date.now() - t1;
const request = Math.min(250, spent / 2);
const was = c[2] === "tap" && c[1] ? 2 : 1;    // the requests a step of this cue took before (four elements: two)
const saved = 100 + Math.round((5 * was - 3) * request);
cueEnd = ms === 0 ? 0 : Date.now() + (ms || 1400) + saved;
}
async function cueOut(els) {
if (!cue) return;
const page = els || gameEls;
cueDy = -3;
await cueStep(page());
await sleep(20);
cue = null;
cueEnd = 0;
await sync(page());
}
const CUE = { peek: ["1 START", "PEEK", "tap"], only: ["CLUE-GIVER ONLY", null, ""], shut: ["START", "SHUT", "tap"], clue: ["2 GIVE A CLUE", null, ""],
guess: ["3 TURN", null, "turn"], reveal: ["4 START", "REVEAL", "tap"], next: ["START OR OK: NEXT", null, ""] };
function stall(ms) {                             // the players have just done something: the next reminder is a while off
stallAt = Date.now() + (ms || 6000);
stalls = 0;
}
const reminder = () => (phase === "new" ? CUE.peek : phase === "peek" ? CUE.shut : phase === "shown" ? CUE.next : r.armed ? CUE.reveal : CUE.guess);
function place(zone) {                           // the target's middle: anywhere, as long as all of it is on the band's straight part
const e = ZONES[zone][2], lo = 4 + e, hi = 67 - e;
if (D.target) return clampTo(D.target, lo, hi);
return lo + rnd(hi - lo + 1);
}
const ALIKE = { 5: "MW", 4: "ABCDEFGHKNOPQRSU", 3: "JLTVXYZ" };
function mess(w, part) {                         // the word with all but its first `part` (0 ... 1) at random
let s = "";
for (let i = 0, keep = Math.floor(w.length * part); i < w.length; i++) {
const set = ALIKE[D.small[w[i]]];
s += i < keep || !set ? w[i] : set[Math.floor(Math.random() * set.length)];
}
return s;
}
async function flutter() {
for (let k = 1; k <= 6 && st.play === "words"; k++) {
await sync(gameEls([mess(r.L, (k - 1) / 5), mess(r.R, (k - 1) / 5)]), true);
await sleep(50);
}
await sync(gameEls());
}
async function deal() {
busy = true;
try {
const on = onPage === "game";
if (on && cue) await cueOut();
if (on && thread) {
const whole = thread;
for (let k = 2; k >= 0; k--) {
thread = Math.round(whole * k / 3);
await sync(gameEls(), k > 0);              // (the last step takes the thread's element away)
}
}
thread = 0;
phase = "new";
if (r) r.moved = r.armed = false;            // (the old round's marker and its star leave with it)
if (on && doorOpen) await shutDoors();
const blank = st.play === "blank", i = blank ? -1 : nextPair(), words = blank ? ["", ""] : D.pairs[i].split("/");
let pal = blank ? rnd(D.pals.length) : (i * 5) % D.pals.length;
if (blank && r && pal === r.pal) pal = (pal + 1) % D.pals.length;
r = { i: i, L: words[0], R: words[1], pal: pal, zone: zoneSet, c: 0, m: HOME, moved: false, peeked: false, armed: false };
r.c = place(r.zone);
save();
if (on) {
await flutter();
await cueIn(CUE.peek);
}
stall(7000);
} finally {
busy = false;
ctl.ok = ctl.start = false;
ctl.turn = 0;
}
}
const cut = () => backs > 0 || stopped;
async function showFor(ms) {
const end = Date.now() + ms;
while (Date.now() < end && !cut()) await sleep(Math.min(60, end - Date.now()));
}
async function verdict(k, was) {
const v = VERDICTS[k], a = "+" + v[0], n = String(st.total), up = [];
const full = smallWidth(a) + 7 + smallWidth("TOTAL") + 3 + smallWidth(n), x0 = 36 - (full >> 1);
const num = (value) => wire(small("zz_t3", String(value), x0 + full + 1, 8, GOLD, "top_right", 2001));
if (!cut()) {
up.push("zz_sign");
await post([over("zz_sign", "sign" + k, 0, 0, 2000)]);
await showFor(D.sign[k] + 150);
}
if (!cut()) {
up.push("zz_t1", "zz_t2", "zz_t3");
await post([wire(small("zz_t1", a, x0, 8, v[2], "top_left", 2001)),
wire(small("zz_t2", "TOTAL", x0 + smallWidth(a) + 7, 8, GREY, "top_left", 2001)), num(was)]);
for (let value = was + 1; value <= st.total && !cut(); value++) {
await showFor(110);
await post([num(value)]);
}
}
lastVerdict = v[1] + "  +" + v[0];              // ... and now the back screen says it too
if (!cut()) {
await sync(gameEls(), true);
ctl.ok = ctl.start = false;
ctl.turn = 0;
await nap(1900);                             // (a press only cuts the wait short)
}
if (cut()) {                                   // Back: no more show, the page as it is after a reveal
if (up.length) await wipe(up);
return sync(gameEls());
}
await curtain(async () => {
await wipe(up);
await sync(gameEls());
});
}
async function reveal() {
const d = Math.abs(r.m - r.c), z = ZONES[r.zone], k = d <= z[0] ? 3 : d <= z[1] ? 2 : d <= z[2] ? 1 : 0;
const was = st.total;
st.total += VERDICTS[k][0];
st.rounds++;
lastVerdict = "";
save();                                        // (kept at once: leaving in the middle of the show loses nothing)
if (cue) await cueOut();
phase = "shown";
await part(true);
if (!cut()) {
await post([over("zz_fl", "flare", r.c - 8, 7, 6)]);     // the target lights up
await showFor(D.flare - 150);
for (let s = 1; s <= 6 && d > 0 && !cut(); s++) {        // the thread runs from the marker to the target's middle
const len = Math.round(d * ease(s / 6));
if (len !== thread) {
thread = len;
await sync(gameEls(), true);
}
await showFor(40);
}
await showFor(d ? 500 : 350);
await wipe(["zz_fl"]);                       // (its last picture is empty)
}
thread = d;
await verdict(k, was);
ctl.ok = ctl.start = false;                    // (a press during the show only cut a wait short: it is not the next round)
ctl.turn = 0;
if (!cut()) await cueIn(CUE.next);
stall(8000);
}
async function turned(n) {
const now = Date.now(), gap = now - turnAt, many = Math.abs(n);
turnAt = now;
const far = many > 2 || gap < 45 ? 3 : many > 1 || gap < 95 ? 2 : 1;
r.m = clampTo(r.m + n * far, 1, 70);
r.moved = true;
if (phase === "guess") r.armed = true;         // turned after a peek: from now on Start is the reveal
}
async function peek() {
if (cue) await cueOut();
phase = "peek";                                // (the marker is away while the clue-giver looks)
r.peeked = true;
await part(false);
await cueIn(CUE.only, 1700);
stall(7000);
}
async function unpeek(n) {
if (cue) await cueOut();
phase = "guess";                               // the marker is back: from now on the knob is the guessers'
if (n) await turned(n);
await shutDoors(true);
if (!r.armed) await cueIn(CUE.clue, 1700);
stall(r.armed ? 6000 : 4500);
}
const CARD = [["EXIT", 2], ["TOTAL", 24], ["MENU", 50]];
function leave() {                               // the app ends, as with Back on the main screen
stopped = true;
setTimeout(unbind, 10);
if (wake) wake();
}
function cardEls(at) {
const what = at === 0 ? "LEAVE THE APP" : at === 1 ? "SEE THE SCORE" : "WORDS OR BLANK";
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0)];
for (let k = 0; k < 3; k++) els.push(small("o" + k, CARD[k][0], CARD[k][1], -1, k === at ? WHITE : DIMMED));
els.push(rect("u", CARD[at][1], 7, smallWidth(CARD[at][0]), 1, GOLD, 2),
small("d", what, 36 - (smallWidth(what) >> 1), 8, GREY));
return tag(els, "k").concat(backEls("EXIT  /  TOTAL  /  MENU", CARD[at][0], what, "TURN: CHOOSE  OK: TAKE"));
}
function totalEls(n) {
const s = String(Math.min(n, 999)), wide = st.total > 99, font = wide ? "bold" : "extra_large";
const w = textWidth(String(Math.min(st.total, 999)), font);
const num = text(wide ? "m" : "n", s, font, 71, wide ? -1 : 1, GOLD, "top_right", 3);
num.timeout = STILL;
return tag([rect("bg", 0, 0, 72, 16, "#000000FF", 0), film("h", "halo", 70 - (w >> 1) - 17, wide ? -4 : 0, 1), num,
small("a", "TOTAL", 2, -1, WHITE), small("b", "ANY KEY", 2, 8, GREY)], "b").concat(
backEls(st.rounds + (st.rounds === 1 ? " ROUND" : " ROUNDS"), "TOTAL", String(n), "ANY KEY: BACK TO THE GAME"));
}
async function card() {
if (cue) {                                     // (no cue is carried over the card)
cue = null;
cueEnd = 0;
}
let at = 0;
await draw("card", cardEls(at));
keys();
while (!stopped) {
await rest(20000);
const k = keys();
if (!k.back && !k.turn && !k.ok && !k.start) await keep();
if (k.back) break;                           // Back closes the card
if (k.turn) {
at = clampTo(at + (k.turn > 0 ? 1 : -1), 0, 2);
await sync(cardEls(at));
} else if (k.ok || k.start) {
if (at === 0) return leave();              // the app ends at once
if (at === 2) {
toMenu = true;
return;
}
await draw("total", totalEls(0));          // the total counts up; any control goes back to the game
for (let n = 1; n <= 8 && !stopped; n++) {
await sleep(45);
await sync(totalEls(Math.round(st.total * ease(n / 8))));
}
await untilKey();
break;
}
}
if (stopped) return;
await draw("game", gameEls());
keys();
stall(4000);
}
const CARET = "! XPM2\n3 5 2 1\n. c none\na c #FFD03C\na..\naa.\naaa\naa.\na..";
const PRESS_STILL = "! XPM2\n5 5 3 1\n. c none\na c #969CAA\nb c #5A5E66\naaaaa\n.aaa.\n..a..\n.....\nbbbbb";
const MENU_BACK = [["WORDS", "OUR PAIRS"], ["BLANK", "YOUR OWN SCALE"]];
function menuEls(at) {
return tag([rect("bg", 0, 0, 72, 16, "#000000FF", 0), small("w", "WORDS", 5, -1, at === 0 ? WHITE : DIMMED), small("b", "BLANK", 5, 8, at === 1 ? WHITE : DIMMED),
bitmap("c", CARET, 0, at ? 10 : 1, 8), film("fw", "main_w", at === 0 ? 31 : OFF, 12, 1), film("fb", "main_b", at === 1 ? 31 : OFF, 12, 1),
film("s", "m_tap", 33, 0, 8), bitmap("k", PRESS_STILL, 60, 0, 8), small("g", "GUIDE", 72, 4, GREY, "top_right")], "m").concat(
backEls(st.rounds ? "SAME PAGE  -  TOTAL " + st.total : "SAME PAGE", MENU_BACK[at][0], MENU_BACK[at][1], "START: PLAY   OK: GUIDE"));
}
async function menu() {
let at = st.play === "blank" ? 1 : 0;
cue = null;
inMenu = true;
toMenu = false;
await draw("menu", menuEls(at));
keys();
while (!stopped) {
await rest(5000);
const k = keys();
if (k.turn) {                                // the knob chooses
at = clampTo(at + (k.turn > 0 ? 1 : -1), 0, 1);
await turnTo(menuEls(at));
}
if (k.ok) {                                  // a press of the knob: the guide, and back here when it is closed
inBook = true;
await draw("guide", bookEls(0));
await guide();
inBook = false;
if (!stopped) await draw("menu", menuEls(at));
keys();
} else if (k.start) break;                   // Start plays
else if (!k.turn) {                          // nothing to do: has "Start over" been flipped meanwhile?
await keep();
await readSettings();
if (startOverNow) {
inMenu = false;
toMenu = false;
return;                                  // (the main loop starts over)
}
}
}
inMenu = false;
if (stopped) return;
st.play = at ? "blank" : "words";
phase = "new";
doorOpen = false;
thread = 0;
r = null;
await deal();                                  // (not on screen yet: only chooses)
await draw("game", gameEls());
busy = true;
await flutter();
await cueIn(CUE.peek);
busy = false;
keys();
stall(7000);
}
const NEXT_MARK = "! XPM2\n3 5 2 1\n. c none\na c #969CAA\na..\naa.\naaa\naa.\na..";
const BOOK = [
["PEEK", 41, "top_left", "tap", 1, "CLUE-GIVER:", "START TO PEEK"],
["GUESS", 54, "top_right", "turn", 2, "THE OTHERS:", "TURN THE KNOB"],
["REVEAL", 41, "top_left", "tap", 3, "AFTER A GUESS", "START: REVEAL"],
["NEW ROUND", 16, "top_left", "press", 0, "OK:", "A NEW ROUND"],
["ENJOY!", 17, "top_left", "", 4, "ENJOY!", "PRESS ANY KEY"]];
function bookEls(p) {
const g = BOOK[p], band = g[4], pin = band === 2 || band === 3;
return tag([rect("bg", 0, 0, 72, 16, "#000000FF", 0), small("n", (p + 1) + "/" + BOOK.length, 1, -1, GREY), bitmap("x", NEXT_MARK, 11, 1, 8),
small("a", g[0], g[1], -1, p === BOOK.length - 1 ? GOLD : WHITE, g[2]), small("b", "PRESS ANY KEY", band === 4 ? 8 : OFF, 8, "#C8CCD6FF"),
film("band", "band0", band === 4 ? OFF : 0, 7, 1), film("shut", "shut", band === 0 || band === 2 ? 0 : OFF, 8, 4), film("pin", "pin", pin ? 43 : OFF, 7, 7),
film("tap", "m_tap", g[3] === "tap" ? 33 : OFF, 0, 8), film("turn", "m_turn", g[3] === "turn" ? 55 : OFF, 0, 8),
film("press", "m_press", g[3] === "press" ? 60 : OFF, 0, 8)], "h").concat(backEls("HOW TO PLAY", g[5], g[6], "THE TARGET NEVER SHOWS HERE"));
}
async function turnTo(els) {
const changed = els.filter((el) => {
const rec = live.get(el.id);
return !rec || rec.s !== wire(el);
});
if (changed.length) await putWith([], changed);
}
async function guide() {                         // (its first page is on screen)
let p = 0;
inBook = true;
keys();
while (!stopped) {
await rest(20000);
const k = keys();
if (!(k.turn || k.ok || k.start || k.back)) {
await keep();                              // (nothing was pressed: nothing changes, only what is getting old is sent again)
continue;
}
if (p === BOOK.length - 1) break;            // the last page: any control closes the book, and does nothing else
if (k.back && p === 0) break;                // Back on the first page closes it as well
let n = (k.ok || k.start ? 1 : 0) - (k.back ? 1 : 0) + k.turn;
while (n !== 0 && !stopped) {
const to = clampTo(p + (n > 0 ? 1 : -1), 0, BOOK.length - 1);
if (to === p) break;
p = to;
n -= n > 0 ? 1 : -1;
await turnTo(bookEls(p));
}
}
inBook = false;
if (!st.g && !stopped) {                       // it has been closed, whichever way: it does not come again by itself
st.g = 1;
save();
}
keys();
}
function clearedEls() {
const top = small("a", "ALL CLEARED", 36, -1, GREY, "top_mid");
const word = text("b", "NEW GAME", "bold", 36, 6, GOLD, "top_mid", 3);
word.timeout = STILL;
return tag([rect("bg", 0, 0, 72, 16, "#000000FF", 0), film("h", "halo", 19, 3, 1), top, word], "c").concat(backEls("SAME PAGE", "ALL CLEARED", "NEW GAME", " "));
}
async function startOver() {
startOverNow = false;
st.total = st.rounds = st.g = 0;
st.play = "words";
shuffle(-1);
await save();                                  // the fresh state is kept at once (with the switch's new position)
phase = "new";
doorOpen = false;
thread = nudge = 0;
cue = null;
r = null;
inMenu = false;
await draw("cleared", clearedEls());
await sleep(1500);
await draw("guide", bookEls(0));               // like new: the guide, then the main screen
await guide();
if (!stopped) await menu();
}
async function step() {
await draw("game", gameEls());
const now = Date.now();
await rest(Math.max(1, Math.min(5000, (cue && cueEnd ? cueEnd : stallAt || now + 5000) - now)));
const k = keys(), pressed = k.turn || k.ok || k.start || k.back;
if (cue && cueEnd && (pressed || Date.now() >= cueEnd)) await cueOut();
if (!pressed) {
if (!cue && stallAt && Date.now() >= stallAt) {      // nobody does anything: what the next move is, again (three times at most)
await cueIn(reminder());
stallAt = ++stalls < 3 ? Date.now() + 9000 : 0;
}
return;
}
stall();
if (k.back) return card();
if (k.ok) return deal();                       // OK: a new round, at any time (before a reveal: this one is dropped, no points)
if (phase === "shown") {                       // the round is over: Start goes on to the next one as well
if (k.start) return deal();
nudge = k.turn > 0 ? 1 : -1;                 // (the marker stays, with a shake of its head)
await sync(gameEls(), true);
await sleep(70);
nudge = 0;
return;
}
busy = true;
try {
if (phase === "peek") {                      // open for a peek: Start shuts it; the knob shuts it first and then moves the marker
await unpeek(k.start ? 0 : k.turn);
} else {
if (k.turn) await turned(k.turn);          // the knob: the marker, always
if (k.start) {                             // Start: the shutter - the reveal once the knob was turned after a peek, a peek until then
if (r.armed) await reveal();
else await peek();
}
}
} finally {
busy = false;
}
}
async function main() {
const t0 = Date.now();
await post([over("zz_splash", "splash", 0, 0, 4000)]);
await readKept();
await readSettings();
load();
const book = !st.g && !startOverNow ? bookEls(0) : null;
if (book) await postAll(book.map((el) => wire(el, el.display ? 0 : OFF, 0)));
await sleep(SPLASH_MS + 60 - (Date.now() - t0));
keys();                                        // (what was pressed meanwhile is not a press in the app; Back has left it)
if (stopped) return;
dataLoop();                                    // (core.js: it also writes errors.txt)
const first = async (key, els) => {            // the first page: under the film's last, black picture
onPage = key;
await postAll(els.filter((el) => !el.display).map((el) => wire(el)));
await post(els.filter((el) => el.display).map((el) => wire(el)));
remember(els);
await wipe(["zz_splash"]);
starting = false;
};
if (startOverNow) {                            // "Start over" was switched on while the app was closed
await first("cleared", clearedEls());
await startOver();
} else {
if (book) {                                  // the first time: the guide opens by itself
inBook = true;
await first("guide", book);
await guide();
} else {                                     // every other start: straight to the main screen
inMenu = true;
await first("menu", menuEls(st.play === "blank" ? 1 : 0));
}
if (!stopped) await menu();
}
let settingsDue = Date.now() + 5000;
while (!stopped) {
try {
if (Date.now() >= settingsDue) {
settingsDue = Date.now() + 5000;
await readSettings();
if (startOverNow) await startOver();
}
if (startOverNow) await startOver();
else if (toMenu || !r) await menu();
else await step();
} catch (err) {
report("scale", err);
busy = false;
await sleep(500);
}
}
}
main();
})();

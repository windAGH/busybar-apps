// Ember: a slingshot game on the BUSY Bar. A glowing ember in a sling on the left, towers of ice and stone with
// gems in them on the right: turn the knob to draw the sling, OK for a flat shot or a lob, Start to let go, and
// knock out every gem with five embers. Every round is a new field, a little harder than the last.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (how hard each step of the pull shoots, how hard each of the 8,192 field numbers is, the small
// drawings, widths of the bar's letters, lengths of the animations), then the bar (its API, controls, drawing), then
// the rules (a field from a number, the ember's flight, what breaks and what falls: whole numbers only), then the
// app (the title, the guide, aiming, the flight, the pages between, the settings), then the start.

const D = {"app":"io.github.windagh.ember","name":"Ember","snap":233,"load":300,"fx":{"ice":500,"stone":550,"crack":300,"pop":550,"fizz":450,"thud":250,"skip":300},"wipe":200,"clear":550,"open":400,"frost":500,"thaw":300,"title":1500,"ice":"! XPM2\n4 3 7 1\n. c none\na c #38A4F0\nb c #78D4FC\nc c #C0F0FF\nd c #F4FFFF\ne c #1868CC\nf c #0C348C\nabcd\neabc\nfeab","stone":"! XPM2\n4 3 6 1\n. c none\na c #605C7C\nb c #8080A0\nc c #A4A0C0\nd c #403C58\ne c #24203C\nabcc\ndbab\nedaa","crack":"! XPM2\n4 3 10 1\n. c none\na c #605C7C\nb c #8080A0\nc c #FF982C\nd c #A4A0C0\ne c #403C58\nf c #FFC054\ng c #FFE8A0\nh c #24203C\ni c #FF8424\nabcd\nefgb\nhiaa","to":"! XPM2\n4 5 2 1\n. c none\n# c #8088A0\n#...\n##..\n###.\n##..\n#...","next":"! XPM2\n4 5 2 1\n. c none\n# c #D6DCE8\n#...\n##..\n###.\n##..\n#...","back":"! XPM2\n5 7 2 1\n. c none\n# c #FFFFFF\n...##\n..##.\n.##..\n##...\n.##..\n..##.\n...##","up":"! XPM2\n5 3 2 1\n. c none\n# c #68A5CC\n..#..\n.###.\n#####","guide":[45,67,"#68A5CCFF"],"spare":[[10,6,2],11,-6],"sl":[9,2],"fxs":{"ice":[8,8],"stone":[8,8],"crack":[6,5],"pop":[13,10],"fizz":[5,8],"thud":[8,4],"skip":[5,5]},"titleX":17,"titleFork":7,"sim":{"gx":42,"lx":22.5,"ly":7.5,"g":26,"fast":1536,"rest":239,"hop":154,"shots":[[[0,0],[663,-165],[765,-191],[866,-216],[968,-241],[1070,-267],[1172,-292],[1274,-318],[1376,-343],[1478,-368],[1580,-394],[1682,-419],[1783,-445],[1885,-470],[1987,-495]],[[0,0],[388,-431],[413,-459],[438,-486],[462,-514],[486,-540],[511,-568],[536,-595],[561,-623],[585,-650],[610,-677],[634,-705],[659,-732],[683,-759],[708,-786]]],"dots":[[[0,0,0,0,0,0,0,0,0,0],[25,7,28,7,30,7,33,8,36,9],[26,6,29,6,32,7,35,8,38,9],[26,6,30,6,33,7,36,7,40,8],[27,6,31,6,34,6,38,7,42,8],[27,6,31,6,36,6,40,6,44,7],[28,6,32,6,37,6,41,6,46,7],[28,6,33,5,38,5,43,6,48,6],[29,6,34,5,39,5,45,5,50,6],[29,6,35,5,41,5,47,5,52,5],[30,5,36,5,42,4,48,4,54,5],[30,5,37,4,43,4,50,4,56,4],[31,5,38,4,45,4,52,3,59,4],[31,5,39,4,46,3,53,3,61,3],[32,5,39,4,47,3,55,3,63,3]],[[0,0,0,0,0,0,0,0,0,0],[24,5,25,4,27,4,28,4,30,4],[24,5,26,4,27,3,29,3,30,3],[24,5,26,4,28,3,29,3,31,3],[24,5,26,4,28,3,30,2,31,2],[24,5,26,3,28,2,30,2,32,2],[24,5,26,3,28,2,30,1,32,1],[25,4,27,3,29,2,31,1,33,1],[25,4,27,3,29,1,31,1,34,0],[25,4,27,2,29,1,32,0,34,0],[25,4,27,2,30,1,32,0,35,-1],[25,4,28,2,30,0,33,-1,35,-2],[25,4,28,2,30,0,33,-1,36,-2],[25,4,28,1,31,0,33,-2,36,-3],[25,4,28,1,31,-1,34,-2,37,-3]]],"levels":14,"count":8192,"band":"c8cb6d0c4a22e3e2232c3353c31e7a390508b0ca221b21c301593187a9e9c24aece6313d870e63b1e3d86d60b3ec5380932602530d180bc33383b1e7532e759a9219b960dd2a1b81a5d188a33db6a7b35e671dc3ab3d393963619e1e0733e9b7389e677ba731581b2b72109d0378db04e3cbed919143c35e7e2005d5195abcee02a3d6b11a5570b5bd803595571ead529670cb735b3cb9659907d5c10d683a6da9ac05966dc648b98b73aadaed93963cad5451b0bd4630c591431d84e2d0182d806dd995472e2505ee037889b317143333a553956a162cd9e116ed048e70b57b36d84707c8c1153998d367036ddaab99d5373e265390e38b12dd663939bae985c055990868a5489cde9b7bc9ec93dd22195c018b91104a2a734c70b6941abec1cbcad552dd0bc29ddb384ad6c495d64149638dc57d048a26a4c189db69e4482ae79d0d957b693c287814e8da6aec9000e7dbe40ae401131913ac26cddc736beb7c434de776452c078663a431d5ba41575a616d7b1a1d990a1510c1977a7ecb079c6e3e8d9c0860ec7cec5c901878ec4d7621503dd45336775e8082ceb25128041d93c8e05ca7283973c267e2d43c807ccb07614b304940d554b227704bc9a9e9b7b1e8674b261a42e7d69294e1e303133b0b8a3a29c66b9ce1496cad99eced81975316882ea53608ece948148a9082ee2626cce6a320e9b81b54da041013de6269514e2354ce856a88b513925d618376374a4bdbee8558c4d7d917d5916512d7c7698adec0694e71656182bacc7cb6e4b94d2827a139de12b82de54b9b85d50bb78a2248dd2b4b48e3ea04213ab7d81d569d163052dd388b7a3bd444577510717b61a9ca096134a34114083744db0305ca6a593d0ce96c54e9218aea1286a4935753c7a8a69870d0aa101a80451aaa5edabccdca0b308a36e081727337b8e1d7d6ae267c01dd693e8a7caa10e85bc8571cad31e34170149a4453d4dde79e509a72cd351b652b95175cca0667a44c5230b556aececa57d457ccda6963700a64dd99e4a0de7c2e69bcaab8a5026744d2868474c8a643c62275e45eae0551e0ee471b1b8b8d79c24d47847ad44d1ae605b1b5601c51e1b82eedb885ed70bb0e8216361894565b14dd20d1812deda155370e14d1c6b8ae843b17ea744cd5cd22b158abd99be8a268a7176c9822be3a8ac6ce71a63546d6baeca02d3ce2bab5a31c4483b09d060d1922a0c9dcdad718764cce511821d0345eb9e9818ad992b92c1055b56c3c87a5479e499b074ab163874e9e690de109a9d344bdd34d9a4a1436949ee715d0a64d5c34195601e03a585d659069ed3d935da8c4589d98ea169a980d8010d0bc4c71505900ec1cac011750d1a2c98e510a400ae8d1e721a47b99588d53dab4b1ab2760209b34eb02db82349d1a9c9aa389100069d58db991adad788a86326da5243b04456be1ad25b3e4728389b287d4ab763d12c009d901ceb416eebe690b3e0ba0da3b1d2bd6d24c845d5dcdb91abe55a0a877092d61086a9655b6956165527bbc177c6934d0357589daa510a4d2c99c534bb129d2db4d95068beb12ecc579d71514ac3d8a3b41bd53a9ab447ca2958bb7a366e83be846175493986cb607bc2475600315d1024c0164bd4669b41c42b2d578185dd8080bb0d6a71b3b0a38799744b7678613599e6d73a544b669143b383ae2087b46599c076ac4e2b9e2bca8d7a980658ad14d28c6c5d404dac08cd60550b5d4e2ed11553248b7843ea2631246b9c1cd92cd342282ac178b651cee80d14b8c67d3d368787055e987264ae2851b7269069b065b32cbd523168dedb03c4d31a98811479d9606b0ce2d1652382188e7016eb0715baec8cb73ebd698b594c2a76093c495a2cc08cc6c2ca7c5913c079e87694a1d31ea5687b0cca2079ad4a90c1b207bee20449222783dc7b99c73d97e8282594b9344a8e862ad71c58c179271e0025b2c3bb9bae0ac0b76a52ea83029bc194c84ae00ba37021c1d64003b5c063ce7cb2ee767ee63db0c568722a8004d3823e02096dd02809780085859c92cd62d4495750b7ca5c21be2c8605cb47b138348b8194cc025728dbb2a1ebcc3c8d6150582e47109576332a9e9b43981a8bba28b0289725e527bd39981a4ab4b52a5935b2e75d3ba5d3b469ba042caae0dc1051c52d7b5ae979b72782b9cd8044e1061690b5b396853ad642c9e9254e34b5674a00127363785a0882a2333e0d72b4433b06278e4e7b3cd6cac7461ca53872248a8b8c400ab15dda6a9ac1650d365b84eb155a6a262d8e5049162881639c0027d287387c51c4546e2197d40e5349e4b8e5cbb561be1d4879e808b62d4b9ab3a653d523ba5a42c0e46a09197322b15d7a8d4251c1a8b94967e25885ba83205121b25c9274e90b48c90ca54b5212418559183ac00d8b5088582c02ad14b82114c0042d166a342cee505de216473e7e457ce81c733b90d46b6685e4529601e853b043ba154a933280232832d3319dcbe9a06497637e7c74b760442cb528d13d090e062874671954e10dc5c92655d5d072161535724a42a0c867a14a5b220b23528349433a5b135c549d989b676b6301d9b12e359680e5da3adce1104c10e372087607ae8032414a811b7c385b94cc4ad2d34a265c83b48c25dc3325874bd05a15532eb44a9847c653351c0a1433a69aae163677211153b5131c8ccd35886a96a5ba285c726102ad1cea30c7653942d3955e3baecd0ed630433d6e0d4c11eb82bcd0455c415cae5d4e8c9897e237e91058be6c6172b3873855ccb3c82d0ec37e0752a01408e4bbe098d506e4ab5035058392e35db0353e9dcd5bd5e084a80e7da2980c6c14506024d63a36c355abb352ea4cda24b207eeb73956a596e3dbd97765c8e0ad5477a2879505730ae1820486e08495e27d54937976adc51b449c07a87e340e6e5736cb34545bbee00e638886ddecb6533323063e4252c68a9db07ea17d82db0222a58d2c5178aa8c339cb5d4d32ab382b72c72819522a7ce5da4e3d718e8932034c37d4e9cb9c74e8477ec5104ae093b28e873a3584807709ac986450b68dc778d7e52c5064be236ee37dadde7c5381d2aedbd414384674a90a7a9e7c1a584d487c7e87c553ce85a1951c7059ad302a660324515e7e5eb4a70e4a912eb72a5e484503ece06b9ceb6613de0754de1d8b454a1624b4e7a417bc4b782038c044597a5cb8a69527e75e5922c2ed3a5c78b6b61ee1a58359c15b8256dde9a17271ad91de25d5e57cb44c8de39a61d80ddba128bda4b05b6c31e906184bc6ca2328d20ecc2cd62a3e0221ad4d1051b1b660276dd5b9c06bbde5d101977423412b724c48734ab164b01472d179283161c59ae66d03a6b7e7645cd3a3e0489d59ec68be3628092c82bba702b39aab9e0c188bec4a1463820eeed9d46cc0a4ea03d8e298e8805aa0c7c57dd7ca3e32e53d320205c842db08eab4ec38966732d7ebde21235ba6bd80ee912b829ea48a404c4a20b26a85bbe85da6d0dda1344439e3ca5e9a44d86221aaa517db57be5c057da8163a4023cc1b9ba886edd7ed238c73a8bd6e974d60c2b6206e97257d2e1c8c870de9312b2307cdd6b7567309a76ab6406348deadbe63a294e8d0526c380d6c1c4a9ae6e3403e26cd8e5de1aa4022a82b1ac3d3a98cd6e4427e4122513d31beda6b32889809ec56734583886603c49d565aa74761045710dc8ac5cc3ac706d0d08dda245782122e46a427c67bae823433a16a303e6870488c9157a8e2e07b7949880dee6e612483dc1332be060e8ab1ce809cdb0d71617d982a947b2eab5629c6373c8918ac30743702d8e5a19470e73ee544a121d73a44c32a88490bb8c1ecd1053de329443ae46104d92dde957dd2a0bb2e112b482cecb3ee0c906824104e690762a038cd26d9eaecc1d77ee42b7c0623c907c1e604d671a2a7268791ebb71cca17bd6b9198129572a4b4e07794d8b5042308d4a2ca8e899aa1d47597304c4c6b922b76aa2348d25c9033862d6c24538075a64c3c8722a3d81676849eabd8b8993d28c1d514ee9663a8adc8027b20685cbb247d2cee815b949a8ea167b60248ec0cd25660d903704521714402e41152ac0682b4ae8d16836c13205186764808b25c2912628616bc1e51b5241c272b71b149664a4423e45614ba24768c6143a3236ac698e23e78496d8666659ea10aa5202a79083bd0e877a6a9689442128bb000dac254ab9c0c40e4ac1e546211aeec9e63d0c5562592c90233c2b38a2c6b176be93cc944d5cd7b9a941b8b350c934ae4751d569439c55d9d99d79c563458b64cd8c6891669c10b9b3434d9a371ea381e6706be767387aec6cdae1a039a316971115ea7d6d97b661cb0046b8d99d026ce4ade4905a6d9c81a3771b0d6270a3cc8bd614a5a91ec48501b9324b866b8e392150c25885870dee40165baea22c41793d8bc0a279c56aa18a714b3e6c20c6ec009ae567eb58c0ec540571d77d0a3531323c110e12c5369a1aeaa0aaac50299232c94d6787178361db2b6c2eb280c707bcc6acc88e199c2808b21eab9b69d998b157c51788824c6a2c84d069996bccccce85458d77d26170c43714333cb127c37e7804e8719c9e871ec3d82e77b9dd2e9ae1242e11614d24a9ae76bb6c8221163c1783e60d5b89cba9396d3189239126b7a4a712867be1392b6240413aa40ea4926447bbe1164329967be84a6be44341145dda55577e545deeb972a0777b2aa9c0521bc78b9654eb835de070432374087008799b7db6c820c381aba5619753779e889114c193e3abcd8a380962815007c064a2ab8e27d9dac73bc009c56246ec0615becbccb9beb20b245668ba9ed8230eda20b8ab5c45990882e3403cc8861177e31795ec02b8c109e8ae64d70c12c054155a86d676b85e788b871b92693d73b6b4146e08ce2e563138374917657d0b9da7046a35437593664dd1ec3d5801c371e0d04cb58898863bc316582a4be55499cae69aab9e2204b8316c92bd16da7da215ddc6725ce208eed2396ea7d8b3503d19757582136e352b136d49c0676ddc01d07671b63eb2b691a602428e5c2206c3a04c234cc1bebd7a5c35774e1012d061728d2ae1a629c71088be707c92d086bbcc8e5de2884c9a294a6ca5b2937845a4566c46695774e0272d9940997ba64a0560e4a4de864ae7743d785ab5974e8901156155890e5344dc4a4a6193234bc1c537165692bee762e9da8e3556cb24d773cc482adb0dda11489974472295706d4c7cbc2db6e16abe0d64716d2192a9965b4d0eaaa1de2dd33ce203e391d1d50e85a278157d32eaa67a59031263eb874cc9edc6d9303b8b919c01c9a7d3e82651e0255472c2ea27b88a9dc4d39ec9cd93ba4a70c63564977dc2d39dc3878e2e9a00c4bbe3ce175e1492e02c80a5c011b543879b70422cae3eae078c0c828b151ed6a09bd34cb11dd231879b2476c315abe9b8054e5293bd3aad6597bd3b2ae99767480019b55c354100c6b516bc6071b9708da616b3675b2a18a3a9610d09deb106bb4a7617bad9beb51ed9d54a168a7013e431bb5a16d0c9cb3c1926cd43a3a644e319bc5a77a7d43e2c16ace206dce7e775ebe99a00962d520333bbe043590b6b7c4776360b264c7c43d79d01e67496e69414b649597403939aad9a95a1eba56c3520bcae8d9ebe6c6d7d591bbd51033960624795d71799d4be03b5d42a29dccadd8db00c82ccb1865a55e9153e9bb957267d2adc8971561164c97ab6b973e3a20e8be65170603e01aec"},"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1,"&":4},"smallGap":1,"xl":{"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7},"bold":{"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6,"A":6,"B":6,"C":6,"D":6,"E":5,"F":5,"G":6,"H":6,"I":4,"J":5,"K":6,"L":5,"M":9,"N":7,"O":6,"P":6,"Q":6,"R":6,"S":6,"T":6,"U":6,"V":7,"W":10,"X":6,"Y":6,"Z":6,"+":6,"-":3,"!":2},"normal":{"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5}};
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
// ===== sling.js =====
(function () {
const SIM = D.sim;
const Q = 1024, PITCH_Q = 6 * Q, ROW_Q = 3 * Q;
const FIELD_Q = (SIM.gx - 1) * Q, GROUND_Q = 15 * Q, FLOOR_Q = 13824;      // the ember's middle rests 1.5 px above the ground
const LX_Q = SIM.lx * Q, LY_Q = SIM.ly * Q;
const ICE = 1, STONE = 2, CRACKED = 3, GEM = 4;
const E_BREAK = 1, E_CRACK = 2, E_FALL = 3, E_LAND = 4, E_BOUNCE = 5, E_FIZZ = 6, E_GONE = 7;
const HANG = 5, FALL = 8;
function dice(seed) {
let s = (seed * 7919 + 104729) % 2147483646 + 1;
const next = (n) => {
s = (s * 16807) % 2147483647;
return Math.floor(s / 4096) % n;
};
next(2);
next(2);
next(2);
return next;
}
function build(seed) {
const roll = dice(seed), cols = [[], [], [], [], []];
const stone = 8 + roll(6) * 9;                  // how much of it is stone, in a hundred
const fill = (a, h) => {
for (let r = cols[a].length; r < h; r++) cols[a].push(roll(100) < stone ? STONE : ICE);
};
const more = (n, low, span) => {                // n more towers where nothing stands yet
for (let i = 0; i < n; i++) {
const a = roll(5);
if (!cols[a].length) fill(a, low + roll(span));
}
};
const kind = roll(10);
if (kind < 2) {                                 // free towers: two to five, two to four high
const n = 2 + roll(4);
let k = 0;
while (k < n) {
const a = roll(5);
if (!cols[a].length) {
fill(a, 2 + roll(3));
k++;
}
}
} else if (kind === 2) {                        // a wide low wall
const w = 4 + roll(2), a0 = roll(6 - w);
for (let a = a0; a < a0 + w; a++) fill(a, 1 + roll(2));
} else if (kind === 3) {                        // one tall tower, perhaps with a low block somewhere
const a = roll(5);
fill(a, 4);
if (roll(2)) fill((a + 1 + roll(4)) % 5, 1 + roll(2));
} else if (kind === 4) {                        // stairs, up or down
const w = 3 + roll(2), a0 = roll(6 - w), up = roll(2);
for (let i = 0; i < w; i++) fill(a0 + i, up ? i + 1 : w - i);
} else if (kind === 5) {                        // a stone pillar with a gem in its lee
const a = roll(3), h = 3 + roll(2), b = a + 1 + roll(2);
for (let r = 0; r < h; r++) cols[a].push(STONE);
fill(b, roll(2));
cols[b].push(GEM);
more(roll(2), 1, 3);
} else if (kind === 6) {                        // a gem crowning a tower: a lob's work
const a = 1 + roll(4);
fill(a, 2 + roll(2));
cols[a].push(GEM);
more(roll(3), 1, 3);
} else if (kind === 7) {                        // a gem at the foot of the front tower: a flat shot's work
const a = roll(2);
cols[a].push(GEM);
fill(a, 2 + roll(3));
more(1 + roll(2), 1, 3);
} else if (kind === 8) {                        // a stone cap on ice over a gem: knock the ice out and it comes down
const a = roll(5), n = 1 + roll(2);
cols[a].push(GEM);
for (let i = 0; i < n; i++) cols[a].push(ICE);
cols[a].push(STONE);
more(roll(3), 1, 3);
} else {                                        // a gate: two towers, a gem low between them
const a = roll(2), b = a + 2 + roll(2);
fill(a, 3 + roll(2));
fill(b, 2 + roll(3));
fill(a + 1, roll(2));
cols[a + 1].push(GEM);
}
const cells = [], has = [0, 0, 0, 0, 0];
let gems = 0;
for (let a = 0; a < 5; a++) {
for (let r = 0; r < cols[a].length; r++) {
cells.push(a * 4 + r);
if (cols[a][r] === GEM) {
gems++;
has[a] = 1;
}
}
}
const want = [1, 1, 2, 2, 2, 3][roll(6)];
let tries = 0;
while (gems < want && tries++ < 80) {
const c = cells[roll(cells.length)], a = c >> 2;
if (cols[a][c & 3] === GEM || (has[a] && tries < 40)) continue;
cols[a][c & 3] = GEM;
has[a] = 1;
gems++;
}
return cols;
}
function pick(start, band) {
const want = "0123456789abcde"[band], n = SIM.band.length;
let k = start % n;
for (let tries = 0; tries < n && SIM.band[k] !== want; tries++) k = (k + 1) % n;
return k;
}
function setup(cols) {
const st = { grid: [], type: [0], left: 0, drop: [-1, -1, -1, -1, -1], land: [-1, -1, -1, -1, -1], row: [0, 0, 0, 0, 0],
t: 0, ev: [], b: { on: false, x: 0, y: 0, vx: 0, vy: 0, cell: -1, gb: 0, pb: 0, n: 0 } };
for (let i = 0; i < 20; i++) st.grid.push(0);
for (let a = 0; a < 5; a++) {
for (let r = 0; r < cols[a].length; r++) {
st.type.push(cols[a][r]);
st.grid[a * 4 + r] = st.type.length - 1;
if (cols[a][r] === GEM) st.left++;
}
}
return st;
}
function fire(st, mode, level) {
const v = SIM.shots[mode][level], b = st.b;
b.on = true;
b.x = LX_Q;
b.y = LY_Q;
b.vx = v[0];
b.vy = v[1];
b.cell = -1;
b.gb = b.pb = b.n = 0;
}
const moving = (st) => st.b.on || st.drop[0] + st.drop[1] + st.drop[2] + st.drop[3] + st.drop[4] +
st.land[0] + st.land[1] + st.land[2] + st.land[3] + st.land[4] > -10;
function cellAt(st, x, y) {
const xr = x - FIELD_Q;
if (xr < 0 || xr >= 5 * PITCH_Q) return -1;
const k = (xr / PITCH_Q) | 0, h = GROUND_Q - y;
let r = (h / ROW_Q) | 0;
if (r > 3) {
if (r === 4 && h - 4 * ROW_Q < Q && st.grid[k * 4 + 3]) return k * 4 + 3;
return -1;
}
if (!st.grid[k * 4 + r] && r > 0 && h - r * ROW_Q < Q && st.grid[k * 4 + r - 1]) r--;
return k * 4 + r;
}
function take(st, c, how) {             // how: 0 = the ember broke it, 1 = it fell, 2 = a stone came down on it
const p = st.grid[c], k = c >> 2;
st.grid[c] = 0;
if (st.type[p] === GEM) st.left--;
st.ev.push([E_BREAK, p, st.type[p], how, c]);
for (let r = (c & 3) + 1; r < 4; r++) {
if (st.grid[k * 4 + r]) {
if (st.drop[k] < 0 && st.land[k] < 0) st.drop[k] = st.t + HANG;
return;
}
}
}
function die(st, kind) {
st.b.on = false;
st.ev.push([kind, st.b.x, st.b.y]);
}
function hit(st, c, px, py) {
const b = st.b, p = st.grid[c], ty = st.type[p];
const ax = b.vx < 0 ? -b.vx : b.vx, ay = b.vy < 0 ? -b.vy : b.vy;
const speed = ax > ay ? ax + (ay >> 1) : ay + (ax >> 1);
const fromTop = py <= GROUND_Q - ((c & 3) + 1) * ROW_Q;
if (ty === STONE && speed < SIM.fast) {         // too slow for stone: it cracks, the ember bounces off
st.type[p] = CRACKED;
st.ev.push([E_CRACK, p, b.x, b.y, c]);
b.x = px;
b.y = py;
if (fromTop) {
b.vy = -((b.vy * 3) >> 3);
b.vx = (b.vx * 3) >> 2;
} else {
b.vx = -((b.vx * 3) >> 3);
b.vy = (b.vy * 3) >> 2;
}
b.pb++;
if (b.pb >= 3 || speed < SIM.rest) die(st, E_FIZZ);
return;
}
const keep = ty === ICE ? 4 : ty === GEM ? 5 : ty === STONE ? 2 : 3;       // eighths of its speed that it keeps
b.vx = (b.vx * keep) >> 3;
b.vy = (b.vy * keep) >> 3;
b.cell = c;
take(st, c, 0);
}
function tick(st) {
const b = st.b;
st.t++;
if (b.on) {
const px = b.x, py = b.y;
b.vy += SIM.g;
b.x += b.vx;
b.y += b.vy;
b.n++;
if (b.x > 75 * Q || b.x < -3 * Q || b.n > 900) {
b.on = false;
st.ev.push([E_GONE, b.x, b.y]);
} else {
if (b.y >= FLOOR_Q) {
b.y = FLOOR_Q;
if (b.gb) die(st, E_FIZZ);
else {
b.gb = 1;
b.vy = -((b.vy * 7) >> 4);
b.vx = (b.vx * 5) >> 3;
st.ev.push([E_BOUNCE, b.x, b.y]);
if (b.vy > -SIM.hop) die(st, E_FIZZ);
}
}
if (b.on) {
const c = cellAt(st, b.x, b.y);
if (c !== b.cell) {
if (c >= 0 && st.grid[c]) hit(st, c, px, py);
else b.cell = c;
}
}
}
}
for (let k = 0; k < 5; k++) {
if (st.drop[k] === st.t) {                    // what hangs over the lowest gap drops one place
st.drop[k] = -1;
let h = -1;
for (let r = 0; r < 4 && h < 0; r++) {
if (!st.grid[k * 4 + r]) {
for (let u = r + 1; u < 4; u++) if (st.grid[k * 4 + u]) h = r;
}
}
if (h >= 0) {
for (let r = h; r < 3; r++) st.grid[k * 4 + r] = st.grid[k * 4 + r + 1];
st.grid[k * 4 + 3] = 0;
st.land[k] = st.t + FALL;
st.row[k] = h;
st.ev.push([E_FALL, k, h]);
}
} else if (st.land[k] === st.t) {             // it has landed: gems that fell are gone, a stone crushes ice and gems
st.land[k] = -1;
const h = st.row[k], lowest = st.grid[k * 4 + h];
st.ev.push([E_LAND, k, h]);
if (h > 0 && lowest && (st.type[lowest] === STONE || st.type[lowest] === CRACKED)) {
const under = st.grid[k * 4 + h - 1];
if (under && (st.type[under] === ICE || st.type[under] === GEM)) take(st, k * 4 + h - 1, 2);
}
for (let r = h; r < 4 && st.grid[k * 4 + r]; r++) {
if (st.type[st.grid[k * 4 + r]] === GEM) take(st, k * 4 + r, 1);
}
if (st.drop[k] < 0) {                       // a gap left with something over it: it goes on falling
for (let r = 0; r < 4; r++) {
if (!st.grid[k * 4 + r]) {
for (let u = r + 1; u < 4; u++) if (st.grid[k * 4 + u]) st.drop[k] = st.t + 2;
}
}
}
}
}
}
const GOLD = "#FFB838FF", SOFTW = "#D6DCE8FF", GREY = "#8088A0FF";
const LEVELS = SIM.levels, COUNT = SIM.count;
const TOP_Z = 2000000000;           // above every page: what covers the screen while a page is exchanged
const Z_HUD = 2, Z_HINT = 3, Z_PIECE = 4, Z_GEM = 5, Z_SLING = 6, Z_DOT = 7, Z_TRAIL = 8, Z_BALL = 9, Z_FX = 10;
const GEM_PTS = 3, EMBER_PTS = 3, ONE_PTS = 5, MOST = 999;   // a gem, an ember left over, a round cleared with one shot
const FRAME = 33;                   // ms a frame of the flight is given
const DOT = ["#FFFFFFFF", "#FFFFFFD0", "#FFFFFFA8", "#FFFFFF80", "#FFFFFF5C"];
const TAIL = ["#FFB43CFF", "#E65A14FF", "#96280AFF"];
let mode = "title", since = 0, backs = 0, bookAt = 0;         // bookAt: the guide's page on show, counted from 0
let best = 0, bestRound = 0;        // kept in storage
let score = 0, shown = 0, round = 1, spares = 4, gain = 0, shots = 0;      // spares: the embers that wait (a round has five)
let queue = [1, 2, 3, 4];           // ... as elements, the next one first: it stands nearest the sling's foot
let arc = 0, level = 1;             // 0 = flat, 1 = the lob; the pull's step
let st = null, pc = [];             // the field (sim.js), and where each piece is drawn: { k, r, dx, dy, gem, gone, ft }
let aimDots = true, hinted = false, games = 0;
let seen = false;                   // the guide has been read to its end (kept)
let resetOn = null, resetWas = null, settingsAt = 0;         // "Start over" as the settings have it, and as it was last found (null: not known)
let ZB = 1000000;                   // the page's band of z-indexes: every new page lies under the one before
const pad2 = (n) => (n < 10 ? "0" : "") + n;
if (D.lag) {                        // TEST builds --lag: every request to the bar is held 80-150 ms, as the real bar does
const send = call;
call = async (method, path, body, type) => {
await sleep(80 + Math.floor(Math.random() * 70));
return send(method, path, body, type);
};
}
async function load() {
const got = await call("GET", "storage/read?path=/ext/data/sling.json");
try {
const kept = got.ok && !D.fresh ? JSON.parse(got.text) : null;
if (kept && typeof kept.best === "number" && kept.best >= 0 && kept.best <= MOST) {
best = Math.floor(kept.best);
bestRound = typeof kept.round === "number" && kept.round > 0 && kept.round < 100000 ? Math.floor(kept.round) : 0;
}
if (kept) {
seen = kept.g === true;
resetWas = typeof kept.rs === "boolean" ? kept.rs : null;
}
} catch (err) {
}
}
function save() {
return call("POST", "storage/write?path=/ext/data/sling.json", JSON.stringify({ best: best, round: bestRound, g: seen, rs: resetWas }), "application/octet-stream");
}
function keep() {
if (score <= best && round - 1 <= bestRound) return null;
if (score > best) best = score;
if (round - 1 > bestRound) bestRound = round - 1;
return save();
}
async function readSettings() {
const v = await loadSettings();
aimDots = v.aim !== false;
resetOn = typeof v.reset === "boolean" ? v.reset : null;
settingsAt = Date.now();
if (resetOn !== null && resetWas === null) {     // seen for the first time (a new install): how it stands is noted
resetWas = resetOn;
save();
}
}
function resetAsked() {
return resetOn !== null && resetWas !== null && resetOn !== resetWas;
}
async function startedOver() {
if (Date.now() - settingsAt < 3000) return false;
await readSettings();
if (!resetAsked()) return false;
await startOver();
return true;
}
async function startOver() {
best = bestRound = score = shown = 0;
seen = false;
resetWas = resetOn;
await save();
mode = "title";
newBand();
const line = "STARTING OVER", z = ZB;
const els = [film("bg", "warm", 0, 0, z), words("l1", line, "small", 36 - ((smallWidth(line) + 1) >> 1), 3, GOLD, "top_left", z + 1)];
els[0].id = "r_bg";
els[1].id = "r_l1";
await page("over-again", els);
await endSplash();
await sleep(1500);
await bookOpen();
await bookRead();
if (stopped) return;
await openTitle();
}
function still(el) {
el.timeout = STILL;
return el;
}
function rect(id, x, y, w, h, colour, z) {
return still(bar(id, x, y, w, h, colour, z));
}
function bitmap(id, data, x, y, z) {
return { id: id, type: "xpmbitmap", x: x, y: y, align: "top_left", timeout: STILL, data: data, z_index: z };
}
function film(id, name, x, y, z, loop) {
return { id: id, type: "animation", path: "animations/" + name + ".anim", x: x, y: y, align: "top_left", loop: loop !== false,
section: "default", timeout: STILL, z_index: z };
}
function words(id, s, font, x, y, colour, align, z) {
return still(text(id, s, font, x, y, colour, align || "top_left", z));
}
function over(id, name, z) {
return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":0,"y":0,"align":"top_left","loop":false,' +
'"section":"default","timeout":30,"z_index":' + z + "}";
}
async function wipe(ids) {
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
}
async function put(els) {
const parts = [], now = Date.now();
for (let i = 0; i < els.length; i++) {
const el = els[i], s = wire(el), old = live.get(el.id);
if (old && old.s === s && now - old.t < 400 * el.timeout && !(el.type === "animation" && !el.loop)) continue;
parts.push(s);
live.set(el.id, { s: s, t: now, el: el });
}
if (parts.length) await postAll(parts, 8);
}
async function under(els) {
const fresh = [];
for (let i = 0; i < els.length; i++) if (!live.has(els[i].id)) fresh.push(wire(els[i], OFF, 0));
if (fresh.length) await postAll(fresh, 8);
await put(els);
}
function keys() {
const k = { turn: ctl.turn, ok: ctl.ok, start: ctl.start, back: backs > 0 };
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
if (k.turn || k.ok || k.start || k.back) since = Date.now();
return k;
}
function forget() {
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
}
onBack = () => {                    // Back ends the app on the title only; elsewhere the page has its own use for it
if (reading || Date.now() < bookShut) {        // (the guide: a page back - on its first page Back closes the book;
backs++;                                       // one Back too many, pressed as it closes, does not leave the app)
return true;
}
if (mode === "title") return D.stay === 1;     // (TEST builds --stay: the app cannot be left, for the ride of random keys)
backs++;
return true;
};
let onPage = "";
async function page(key, els) {
if (onPage === "") {
onPage = key;
await put(els);
return;
}
onPage = key;
busy = true;
try {
const olds = [], mine = {};
let same = false;
for (let i = 0; i < els.length; i++) {
mine[els[i].id] = 1;
if (live.has(els[i].id)) same = true;
}
for (const id of live.keys()) if (!mine[id]) olds.push(id);
if (!same) await under(els);                 // (a page that uses the same elements again is changed behind the wipe)
await post([over("zz_w1", "wipe_in", TOP_Z)]);
await sleep(D.wipe + 30);
if (same) await put(els);
await drop(olds);
if (cardUp) {
cardUp = false;
await wipe(CARD);
}
await post([over("zz_w2", "wipe_out", TOP_Z + 1)]);
await sleep(60);
await wipe(["zz_w1"]);
await sleep(D.wipe);
await wipe(["zz_w2"]);
} finally {
busy = false;
forget();
}
}
const CARD = ["zz_p0", "zz_p1", "zz_p2", "zz_p3", "zz_p4", "zz_p5"];
let cardUp = false;                 // the pause card is on screen
function newBand() {
ZB -= 40;
}
const tt = (el, z) => {
el.id = "t_" + el.id;
el.z_index = ZB + z;
return el;
};
function titleEls(held, card) {
const els = [tt(rect("bg", 0, 0, 72, 16, "#000000FF", 0), 0)];
if (!held) return els;
els.push(tt(film("hold", "title_hold", 0, 0, 0), 1), tt(film("em", "ember", D.titleFork - 4, 3, 0), 2),
tt(film("ok", "ok", 33, 0, 0), 3),           // the mark under Start: play
tt(words("gd", "GUIDE", "small", D.guide[0], -2, D.guide[2], "top_left", 0), 7),     // at the knob: press it for the guide
tt(bitmap("ga", D.up, D.guide[1], 0, 0), 7));
if (card) els.push(tt(rect("bk", 14, 3, 43, 13, "#000000FF", 0), 4));
if (card === 1) {                  // what Back does here: BACK, a mark, EXIT - 43 columns from 14 on
els.push(tt(words("c1", "BACK", "small", 14, 5, GREY, "top_left", 0), 5), tt(bitmap("ca", D.to, 36, 7, 0), 5),
tt(words("c2", "EXIT", "small", 43, 5, GREY, "top_left", 0), 5));
} else if (card === 2) {
const n = String(best), w = smallWidth("BEST") + 4 + smallWidth(n), x = 36 - ((w + 1) >> 1);
els.push(tt(words("b1", "BEST", "small", x, 5, GREY, "top_left", 0), 5),
tt(words("b2", n, "small", x + smallWidth("BEST") + 4, 5, GOLD, "top_left", 0), 5));
}
return els;
}
let titleAt = 0;                    // when the title's picture came to rest
let splashUp = false;               // the author's mark is still over the screen
async function endSplash() {
if (!splashUp) return;
splashUp = false;
await wipe(["zz_sp"]);
}
async function openTitle() {
mode = "title";
newBand();
await page("title", titleEls(false));
await post([wire(tt(film("fm", "title", 0, 0, 0, false), 6))]);   // the film itself, seen from its first frame
await endSplash();
await bookHide();                                // (the title is in place under the guide's page: the page goes)
const end = Date.now() + D.title + 80;
while (!stopped && Date.now() < end && !ctl.ok && !ctl.start) await nap(end - Date.now());
await put(titleEls(true, false));
await wipe(["t_fm"]);
await bookMake();                                // the guide lies ready outside the screen: OK only moves a page in
titleAt = Date.now();
}
async function titleStep() {
const k = keys();
if (k.start) {
await newGame();
return;
}
if (k.ok) {                        // the guide, over the main screen; closed, it leaves the main screen as it was
await bookShow();
await bookRead(() => show(titleEls(true, 0)));
if (stopped) return;
await show(titleEls(true, 0));               // (a card that stood there is gone before the book is)
await bookHide();
titleAt = Date.now();
return;
}
if (Date.now() - bookSent > 45000) await bookMake(true);         // (what waits outside the screen runs out as well)
if (await startedOver()) return;
const age = (Date.now() - titleAt) % 9000, card = age < 4200 ? 0 : age < 6400 ? 1 : best > 0 ? 2 : 0;
await show(titleEls(true, card));
await nap((age < 4200 ? 4200 : age < 6400 ? 6400 : 9000) - age + 20);
}
const g = (el, z, on) => {
el.id = "g_" + el.id;
el.z_index = ZB + z;
if (on === false) el.x += OFF;
return el;
};
function scoreEl() {
return g(words("sc", String(shown), "small", 2, -2, scoreHot ? GOLD : SOFTW, "top_left", 0), Z_HUD);
}
const placeX = (i) => (i < 3 ? D.spare[0][i] : D.spare[2]);
function spareEl(n, x) {
return g(film("s" + n, "spare", x === null ? 0 : x, D.spare[1], 0), Z_HUD, x !== null);
}
function queueEls() {
const els = [];
for (let n = 1; n <= 4; n++) {
const i = queue.indexOf(n);
els.push(spareEl(n, i < 0 ? null : placeX(i)));
}
return els;
}
function slingEl(what) {
const name = what === "aim" ? "pl" + (arc ? "b" : "a") + pad2(level) : what === "seat" ? "pl00" : "ple";
return g(film("sl", name, D.sl[0], D.sl[1], 0), Z_SLING, what !== "off");
}
function dotEls(on) {
const d = SIM.dots[arc][level], out = [];
let open = on && aimDots;
for (let n = 0; n < 5; n++) {
const x = d[2 * n], y = d[2 * n + 1];
if (open && x >= SIM.gx - 1) {
const c = cellAt(st, x * Q + 512, y * Q + 512);
if (c >= 0 && st.grid[c]) open = false;
}
const onMark = !hinted && y <= 3 && ((x >= 32 && x <= 39) || (x >= 58 && x <= 65));     // (a mark under a control stands there)
const vis = open && !onMark && x >= 0 && x < 72 && y >= 0 && y < 16;
out.push(g(rect("d" + n, vis ? x : 0, vis ? y : 0, 1, 1, DOT[n], 0), Z_DOT, vis));
}
return out;
}
function hintEls(on) {              // until the first shot of a game: a mark under each of the two controls
return [g(film("k1", "ok", 33, 0, 0), Z_HINT, on), g(film("k2", "okw", 59, 0, 0), Z_HINT, on && !st.grid[15])];
}
function pieceEl(p) {
const c = pc[p], x = SIM.gx + 6 * c.k + c.dx, y = 12 - 3 * c.r + c.dy;
if (c.gem) return g(film("q" + c.gem, "gem", x - 2, y - 2, 0), Z_GEM, !c.gone);
return g(bitmap("p" + p, st.type[p] === ICE ? D.ice : st.type[p] === STONE ? D.stone : D.crack, x, y, 0), Z_PIECE, !c.gone);
}
function ballEl() {
const b = st.b, x = b.x >> 10, y = b.y >> 10, on = b.on && y > -6;
return g(film("b", "ember", (on ? x : 0) - 4, (on ? y : 0) - 4, 0), Z_BALL, on);
}
let fxN = 0;
function fxEl(name, x, y) {
fxN = (fxN + 1) % 6;
const el = g(film("f" + fxN, name, x - D.fxs[name][0], y - D.fxs[name][1], 0, false), Z_FX);
el.timeout = 3;
return el;
}
function fieldEls(what) {
return [g(film("bg", "bg", 0, 0, 0), 0), scoreEl(), slingEl(what)].concat(queueEls());
}
function sceneEls() {
const els = fieldEls("aim").concat(dotEls(true));
for (let p = 1; p < pc.length; p++) if (!pc[p].gone) els.push(pieceEl(p));
return els;
}
function bandOf(n) {
const b = Math.min(14, Math.floor((n - 1) * 9 / 20));
return D.easy ? 0 : n % 7 === 0 ? Math.max(0, b - 3) : b;
}
function newRound() {
const from = D.seed === undefined ? Math.floor(Math.random() * COUNT) : (D.seed + (round - 1) * 97 + games * 31) % COUNT;
st = setup(build(pick(from, bandOf(round))));
pc = [null];
let gems = 0;
for (let c = 0; c < 20; c++) {
const p = st.grid[c];
if (p) pc[p] = { k: c >> 2, r: c & 3, dx: 0, dy: -24, gem: st.type[p] === GEM ? ++gems : 0, gone: false, ft: 0 };
}
queue = [1, 2, 3, 4];
spares = 4;
level = 1;
gain = shots = 0;
}
async function buildIn() {
const cols = [], state = [], first = [];
for (let k = 0; k < 5; k++) if (st.grid[k * 4]) cols.push(k);
for (let p = 1; p < pc.length; p++) first.push(pieceEl(p));     // made above the screen, out of sight
await put(first);
const t0 = Date.now(), FALL_MS = 200, GAP = 120;
let going = true;
while (going && !stopped) {
const f0 = Date.now(), now = f0 - t0, out = [];
going = false;
for (let i = 0; i < cols.length; i++) {
if (state[i] === 2) continue;                               // this one stands
going = true;
const k = cols[i], u = (now - i * GAP) / FALL_MS;
if (u < 0) continue;
let dy = 0;
if (u < 1) dy = -Math.round(22 * (1 - u * u));              // faster and faster: it has weight
else if (state[i] !== 1) {                                  // the frame of the landing: a pixel too low, and dust
dy = 1;
state[i] = 1;
out.push(fxEl("thud", SIM.gx + 6 * k, 12));
} else state[i] = 2;
for (let r = 0; r < 4; r++) {
const p = st.grid[k * 4 + r];
if (!p) continue;
pc[p].dy = dy;
out.push(pieceEl(p));
}
}
await put(out);
await sleep(FRAME - (Date.now() - f0));
}
for (let p = 1; p < pc.length; p++) pc[p].dy = 0;
}
async function newGame() {
games++;
score = shown = 0;
round = 1;
await readSettings();
newRound();
mode = "aim";
newBand();
await page("game" + games, fieldEls("aim").concat(dotEls(false), hintEls(false)));
await bookDrop();
await buildIn();
ctl.turn = 0;                                    // a press while the towers came down was not a shot (Back is kept)
ctl.ok = ctl.start = false;
await put(dotEls(true).concat(hintEls(true)));
hinted = false;
since = Date.now();
refreshed = Date.now();
}
const touched = () => ctl.turn !== 0 || ctl.ok || ctl.start || backs > 0;
let okN = 0, startN = 0, okOn = false, startOn = false;
Object.defineProperty(ctl, "ok", { get: () => okOn, set: (v) => {
okOn = v;
okN = v ? okN + 1 : 0;
} });
Object.defineProperty(ctl, "start", { get: () => startOn, set: (v) => {
startOn = v;
startN = v ? startN + 1 : 0;
} });
const BOOK_Z = TOP_Z - 2000, BOOK_IDS = ["b_p0", "b_p1", "b_p2", "b_p3", "b_p4"];
let bookUp = false;                 // the book's pictures exist (outside the screen, but for the page on show)
let bookOn = -1, bookSent = 0;      // the page on show (-1: none); when the waiting pictures were last sent
let reading = false;                // the book is open and has the controls
let bookShut = 0;                   // until then (a moment after the book has closed) Back is still the book's
function bookPage(n, on) {
return wire(film(BOOK_IDS[n], "gp" + (n + 1), 0, 0, BOOK_Z + (on ? 1 : 0)), on ? 0 : OFF, 0);
}
async function bookMake(again) {
if (bookUp && !again) return;
bookUp = true;
bookSent = Date.now();
await post([bookPage(1, false), bookPage(2, false), bookPage(3, false), bookPage(4, false), bookPage(0, false)]);
}
async function bookShow() {
await bookMake();
bookOn = 0;
await post([bookPage(0, true)]);
}
async function bookOpen() {
await bookShow();
}
async function bookHide() {
if (bookOn < 0) return;
const was = bookOn;
bookOn = -1;
bookSent = Date.now();
await post([bookPage(was, false)]);
bookShut = Date.now() + 500;
}
async function bookDrop() {
if (!bookUp) return;
bookUp = false;
bookOn = -1;
await wipe(BOOK_IDS);
}
async function bookRead(keep) {
let at = 0, sent = Date.now();
bookAt = 0;
forget();
reading = true;
while (!stopped) {
if (!touched()) await nap(20000);            // (a press that came while the last turn was on its way is taken at once)
if (stopped) break;
if (Date.now() - sent > 45000) {             // the page (and what waits) is kept alive
sent = Date.now();
await post([bookPage(at, true)]);
const others = [];
for (let n = 0; n < BOOK_IDS.length; n++) if (n !== at) others.push(bookPage(n, false));
await post(others);
if (keep) await keep();
}
const b = backs, go = ctl.turn + okN + startN - b, k = keys(), last = BOOK_IDS.length - 1;   // pages forward (back, if less than 0)
if (!k.turn && !k.ok && !k.start && !k.back) continue;
if (at === last) break;                                        // any control: the book is closed
if (b > 0 && at + go < 0) break;                               // Back on the first page: closed as well
const to = Math.max(0, Math.min(last, at + go));
if (to === at) continue;
await post([bookPage(to, true), bookPage(at, false)]);         // ONE request: the new page in (above), the old one out
at = bookAt = bookOn = to;
sent = Date.now();
}
bookShut = Date.now() + 1500;
reading = false;
bookAt = 0;
forget();
if (!stopped && !seen) {
seen = true;
save();
}
}
let refreshed = 0;
async function aimStep() {
const k = keys();
if (k.back) {
await pause();
return;
}
if (k.turn || k.ok) {
if (k.ok) arc = 1 - arc;
level = Math.max(1, Math.min(LEVELS, level + k.turn));
await put([slingEl("aim")].concat(dotEls(true)));
}
if (k.start) {
await fly();
return;
}
if (k.turn || k.ok) return;
if (shown < score) {
shown++;
await put([scoreEl()]);
await nap(40);
return;
}
if (await startedOver()) return;
if (Date.now() - refreshed > 45000) {            // elements run out after two minutes: send the field again
refreshed = Date.now();
await put(sceneEls().concat(hintEls(!hinted)));
}
await nap(1000);
}
function cellX(c) {
return SIM.gx + 6 * (c >> 2);
}
function cellY(c) {
return 12 - 3 * (c & 3);
}
async function fly() {
const b = st.b, hx = [], hy = [];
hinted = true;
shots++;
let chain = 0;                                   // pieces that went without the ember touching them
fire(st, arc, level);
await put([slingEl("off"), g(film("sn", arc ? "snb" : "sna", D.sl[0], D.sl[1], 0, false), Z_SLING), ballEl()].concat(dotEls(false), hintEls(false)));
let t0 = Date.now(), done = 0, jolted = [], lastGem = 0, settled = false, calm = 0;
while (!stopped) {
const f0 = Date.now(), out = [];
let want = Math.floor((f0 - t0) * 0.06) - done, stop = 0;
if (want > 9) {                                // the bar cannot keep up: the game slows down, it does not jump
t0 += Math.ceil((want - 9) / 0.06);
want = 9;
}
for (let i = 0; i < want && moving(st); i++) {
tick(st);
done++;
if (b.on) {
hx.push(b.x);
hy.push(b.y);
}
}
for (let i = 0; i < jolted.length; i++) {      // the pieces that were knocked a pixel aside go back
pc[jolted[i]].dx = 0;
if (!pc[jolted[i]].gone) out.push(pieceEl(jolted[i]));
}
jolted = [];
while (st.ev.length) {
const e = st.ev.shift(), kind = e[0];
if (kind === E_BREAK) {
const p = e[1], c = e[4];
pc[p].gone = true;
out.push(pieceEl(p), fxEl(e[2] === ICE ? "ice" : e[2] === GEM ? "pop" : "stone", cellX(c), cellY(c)));
if (e[2] === GEM) {
score = Math.min(MOST, score + GEM_PTS);
gain += GEM_PTS;
lastGem = Date.now();
}
if (e[3] !== 0) chain++;
if (e[3] === 0) {
stop = e[2] === GEM ? 60 : 45;
jolt(c >> 2, b.vx < 0 ? -1 : 1, jolted, out);
}
} else if (kind === E_CRACK) {
out.push(pieceEl(e[1]), fxEl("crack", e[2] >> 10, e[3] >> 10));
stop = 45;
jolt(e[4] >> 2, b.vx > 0 ? -1 : 1, jolted, out);       // (the ember has already turned back)
} else if (kind === E_FALL) {
for (let r = e[2]; r < 4; r++) {
const p = st.grid[e[1] * 4 + r];
if (!p) continue;
pc[p].r = r;
pc[p].dy = -3;
pc[p].ft = st.t;
}
} else if (kind === E_LAND) {
for (let r = e[2]; r < 4; r++) {
const p = st.grid[e[1] * 4 + r];
if (p && pc[p].ft) {
pc[p].ft = 0;
pc[p].dy = 0;
out.push(pieceEl(p));
}
}
out.push(fxEl("thud", cellX(e[1] * 4), cellY(e[2])));
} else if (kind === E_BOUNCE) {
out.push(fxEl("skip", e[1] >> 10, 14));
} else if (kind === E_FIZZ) {
out.push(fxEl("fizz", e[1] >> 10, e[2] >> 10));
}
}
for (let p = 1; p < pc.length; p++) {          // what is falling: slowly at first, then fast
const c = pc[p];
if (!c.ft || c.gone) continue;
const u = Math.min(1, (st.t - c.ft) / FALL);
c.dy = -Math.round(3 * (1 - u * u));
out.push(pieceEl(p));
}
out.push(ballEl());
const n = hx.length, bx = b.x >> 10, by = b.y >> 10;
for (let i = 0; i < 3; i++) {
const j = n - 1 - 3 * (i + 1), x = j >= 0 ? hx[j] >> 10 : -1, y = j >= 0 ? hy[j] >> 10 : -1;
const vis = b.on && j >= 0 && x >= 0 && x < 72 && y >= 0 && y < 16 && (x !== bx || y !== by);
out.push(g(rect("t" + i, vis ? x : 0, vis ? y : 0, 1, 1, TAIL[i], 0), Z_TRAIL, vis));
}
const high = b.on && by < -2 && bx >= 1 && bx < 71;
out.push(g(rect("up", high ? bx - 1 : 0, 0, 3, 1, "#FFB838B0", 0), Z_BALL, high));
if (shown < score) {
shown++;
out.push(scoreEl());
}
await put(out);
if (stop) {                                    // a hit: everything stands still for a moment
await sleep(stop);
t0 += stop;
}
if (!moving(st) && jolted.length === 0) {
if (!settled) {
settled = true;
calm = Date.now();
}
if (Date.now() - calm > 120) break;
}
if (st.left === 0 && lastGem && Date.now() - lastGem > 420 && noFalls()) break;     // every gem is out: no need to wait for the ember
const spent = Date.now() - f0;
if (spent < FRAME) await sleep(FRAME - spent);
}
if (stopped) return;
st.b.on = false;
st.ev.length = 0;
await put([ballEl(), g(rect("t0", 0, 0, 1, 1, TAIL[0], 0), Z_TRAIL, false), g(rect("t1", 0, 0, 1, 1, TAIL[1], 0), Z_TRAIL, false),
g(rect("t2", 0, 0, 1, 1, TAIL[2], 0), Z_TRAIL, false), g(rect("up", 0, 0, 3, 1, "#FFB838B0", 0), Z_BALL, false)]);
if (chain >= 2) {                                // a collapse: a little extra, counted on in gold
score = Math.min(MOST, score + chain);
gain += chain;
scoreHot = true;
}
while (shown < score && !stopped) {
shown++;
await put([scoreEl()]);
await sleep(scoreHot ? 70 : 30);
}
if (scoreHot) {
await sleep(500);
scoreHot = false;
await put([scoreEl()]);
}
await put([slingEl("empty")]);
await put([g(film("sn", "ple", D.sl[0], D.sl[1], 0), Z_SLING, false)]);
const wanted = backs > 0;                        // Back while the ember was in the air: the pause card comes after it
if (st.left === 0) await cleared();
else if (spares > 0) await reload();
else await gameOver();
forget();
if (wanted && mode === "aim" && !stopped) await pause();
}
let scoreHot = false;               // the score stands in gold for a moment (a collapse's bonus is being counted on)
function noFalls() {
for (let k = 0; k < 5; k++) if (st.drop[k] >= 0 || st.land[k] >= 0) return false;
return true;
}
function jolt(k, dir, jolted, out) {
for (let r = 0; r < 4; r++) {
const p = st.grid[k * 4 + r];
if (!p || pc[p].gone) continue;
pc[p].dx = dir;
jolted.push(p);
out.push(pieceEl(p));
}
}
async function reload() {
const next = queue.shift(), t0 = Date.now(), was = queue.map((n, i) => placeX(i + 1));
spares = queue.length;
level = 1;
await put([g(film("ld", "ld1", D.sl[0], D.sl[1], 0, false), Z_SLING + 1), slingEl("off"), spareEl(next, null)]);
const steps = [0.3, 0.75, 1];
for (let k = 0; k < steps.length && queue.length; k++) {
await sleep(55);
await put(queue.map((n, i) => spareEl(n, Math.round(was[i] + (placeX(i) - was[i]) * steps[k]))));
}
await sleep(D.load + 60 - (Date.now() - t0));
await put([slingEl("seat")]);
await put([g(film("ld", "ple", D.sl[0], D.sl[1], 0), Z_SLING + 1, false)]);
await sleep(90);
await put([slingEl("aim")].concat(dotEls(true)));
refreshed = Date.now();
}
async function cleared() {
const oneShot = shots === 1, bonus = EMBER_PTS * spares + (oneShot ? ONE_PTS : 0), from = gain;
score = Math.min(MOST, score + bonus);
gain += bonus;
const to = gain;                                 // (the next round's set-up, under the plate, starts its own count)
shown = score;
round++;
keep();
busy = true;
try {
await post([over("zz_cl", "clear", TOP_Z)]);
await sleep(D.clear - 100);                  // (the words come on as the last sparks go out)
const line = oneShot ? "ONE SHOT CLEAR" : "ROUND " + (round - 1) + " CLEAR";
const top = '{"id":"zz_c1","type":"text","text":"' + line + '","font":"small","x":' + (36 - (smallWidth(line) >> 1)) +
',"y":-1,"align":"top_left","color":"' + SOFTW + '","timeout":30,"z_index":' + (TOP_Z + 2) + "}";
const sum = (n) => '{"id":"zz_c2","type":"text","text":"+' + n + '","font":"bold","x":' + (36 - ((7 + 7 * String(n).length) >> 1)) +
',"y":6,"align":"top_left","color":"' + GOLD + '","timeout":30,"z_index":' + (TOP_Z + 2) + "}";
await post([top, sum(from)]);
const olds = [];
for (const id of live.keys()) if (id.slice(0, 3) === "g_p" || id.slice(0, 3) === "g_q" || id.slice(0, 3) === "g_f") olds.push(id);
await drop(olds);
newRound();
await put(fieldEls("aim").concat(dotEls(false)));
await sleep(250);
const span = to - from, steps = Math.min(8, span);          // the embers left over are counted on (eight requests at most)
for (let i = 1; i <= steps && !stopped; i++) {
await post([sum(from + Math.round(span * i / steps))]);
await sleep(Math.max(40, 400 / steps));
}
await sleep(750);
await post([over("zz_op", "open", TOP_Z + 5)]);
await sleep(70);
await wipe(["zz_cl", "zz_c1", "zz_c2"]);
await sleep(D.open);
await wipe(["zz_op"]);
} finally {
busy = false;
}
await buildIn();
await put(dotEls(true));
refreshed = Date.now();
}
const oo = (el, z) => {
el.id = "o_" + el.id;
el.z_index = ZB + z;
return el;
};
let overStage = 0, overShown = 0, wasBest = false;
function overEls() {
const els = [oo(film("bg", "cold", 0, 0, 0), 0)];
if (overStage >= 1) els.push(oo(words("l1", "SCORE", "small", 2, -1, GREY, "top_left", 0), 1), oo(words("n1", String(overShown), "bold", 2, 6, WHITE, "top_left", 0), 1));
if (overStage >= 2) {
const far = bestRound > 0 && Math.floor((Date.now() - since) / 2600) % 2 === 1;
const label = far ? "ROUND" : "BEST", n = String(far ? bestRound : best);
els.push(oo(words("l2", label, "small", 70 - smallWidth(label), -1, GREY, "top_left", 0), 1),
oo(words("n2", n, "small", 70 - smallWidth(n), 8, far ? SOFTW : wasBest ? GOLD : SOFTW, "top_left", 0), 1));
}
if (overStage >= 3) els.push(oo(film("ok", "ok", 33, 0, 0), 1), oo(words("ag", "AGAIN?", "small", score >= 100 ? 25 : 23, 8, GOLD, "top_left", 0), 1));
return els;
}
async function gameOver() {
wasBest = score > best;
keep();
busy = true;
try {
await post([over("zz_fr", "frost", TOP_Z)]);              // frost shuts over the field; OUT OF EMBERS
await sleep(D.frost + 1100);
mode = "over";
onPage = "over";
newBand();
overStage = overShown = 0;
const olds = [];
for (const id of live.keys()) olds.push(id);
await under(overEls());
await drop(olds);
await post([over("zz_f2", "frost2", TOP_Z + 1)]);         // the same picture; its words drop away
await sleep(80);
await wipe(["zz_fr"]);
await sleep(D.thaw + 40);
await wipe(["zz_f2"]);
} finally {
busy = false;
}
overStage = 1;                                              // the score is counted up, then the best, then the question
const step = Math.max(1, Math.ceil(score / 14));
while (!stopped) {
await put(overEls());
if (overShown >= score) break;
overShown = Math.min(score, overShown + step);
await sleep(40);
}
await sleep(250);
overStage = 2;
since = Date.now();
await put(overEls());
await sleep(350);
overStage = 3;
since = Date.now();
await put(overEls());
}
async function overStep() {
const k = keys();
if (k.ok || k.start) {
await newGame();
return;
}
if (k.back) {
await openTitle();
return;
}
if (await startedOver()) return;
await show(overEls());
await nap(bestRound > 0 ? 2600 - (Date.now() - since) % 2600 + 20 : 4000);
}
const PAUSE = [["RESUME", 2], ["NEW", 36], ["EXIT", 56]];
function pauseParts(pick) {
const z = TOP_Z - 100;
const out = ['{"id":"zz_p0","type":"rectangle","x":0,"y":0,"width":72,"height":16,"fill":"solid","fill_colors":["#000000FF"],"border_width":0,"timeout":' + STILL + ',"z_index":' + z + "}",
'{"id":"zz_p1","type":"text","text":"PAUSED","font":"small","x":' + (36 - (smallWidth("PAUSED") >> 1)) + ',"y":-1,"align":"top_left","color":"' + GREY + '","timeout":' + STILL + ',"z_index":' + (z + 1) + "}"];
for (let n = 0; n < 3; n++) {
out.push('{"id":"zz_p' + (2 + n) + '","type":"text","text":"' + PAUSE[n][0] + '","font":"small","x":' + PAUSE[n][1] + ',"y":6,"align":"top_left","color":"' +
(n === pick ? GOLD : GREY) + '","timeout":' + STILL + ',"z_index":' + (z + 1) + "}");
}
out.push('{"id":"zz_p5","type":"rectangle","x":' + PAUSE[pick][1] + ',"y":14,"width":' + smallWidth(PAUSE[pick][0]) +
',"height":1,"fill":"solid","fill_colors":["' + GOLD + '"],"border_width":0,"timeout":' + STILL + ',"z_index":' + (z + 1) + "}");
return out;
}
async function pause() {
let choice = 0, drawn = -1, sent = 0;
forget();
while (!stopped) {
if (drawn !== choice || Date.now() - sent > 45000) {
await post(pauseParts(choice));
cardUp = true;
drawn = choice;
sent = Date.now();
}
await nap(5000);
if (!touched() && (await startedOver())) return;           // (the card goes behind the wipe)
const k = keys();
if (k.turn) choice = Math.max(0, Math.min(2, choice + (k.turn > 0 ? 1 : -1)));
const take = k.ok || k.start;
if (k.back || (take && choice === 0)) break;               // back to the shot
if (take && choice === 1) {                                // a new game (the card goes behind the wipe)
keep();
await newGame();
return;
}
if (take && choice === 2 && D.stay) break;
if (take && choice === 2) {                                // leave the app
await keep();
stopped = true;
setTimeout(unbind, 10);
return;
}
}
if (stopped) return;
await put(sceneEls().concat(hintEls(!hinted)));              // (the field may have been waiting for a long time)
refreshed = Date.now();
cardUp = false;
await wipe(CARD);
forget();
}
async function step() {
if (mode === "title") await titleStep();
else if (mode === "aim") await aimStep();
else await overStep();
}
const SPLASH_MS = 1500;             // how long the start film (animations/splash.anim) runs
async function main() {
const t0 = Date.now();
splashUp = true;
await post([over("zz_sp", "splash", TOP_Z + 50)]);
await load();                                    // (first what is kept: the settings are compared with it)
await readSettings();
dataLoop();
const again = resetAsked();                      // "Start over" was flipped while the app was closed
if (!seen && !again) await bookOpen();           // first use: the guide's pages are made now, under the film
await sleep(SPLASH_MS - (Date.now() - t0));
forget();                                        // (keys pressed meanwhile are not meant for the app; Back has ended it)
if (stopped) return;
if (again) await startOver();
else {
if (!seen) {
await endSplash();
await bookRead();
if (stopped) return;
}
await openTitle();
}
while (!stopped) {
try {
await step();
} catch (err) {
report("ember", err);
await sleep(500);
}
}
}
main();
})();

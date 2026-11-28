// Chop Chop: a small game of skill on the BUSY Bar. A loaf, a fish, a cucumber lies on the board; turning the knob
// moves the knife, Start or OK cuts, and the pieces have to come out the same length before the round's time has
// run out. The more even the cut, the higher the score; a bad cut ends the game. The five
// best games are kept on the bar.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (the ten foods as rows of letters with their colours, widths of the bar's letters, lengths of
// the animations), then the bar (its API, clock, controls, drawing), then the app (what is kept, the settings, the
// guide, the pages, a round, the judging, the end of a game, the five best), then the start.

const D = {"app":"io.github.windagh.chop_chop","name":"Chop Chop","foods":[{"n":"LOAF","h":8,"k":27,"pal":"a c #FBE9BC\nb c #F9E4B4\nc c #F8E0AE\nd c #F5DCA7\ne c #F3D9A0\nf c #F4CA91\ng c #ECA860\nh c #F29034\ni c #E28A39\nj c #DB7829\nk c #CE6F24\nl c #B3753D\nm c #BC6420\nn c #B06424\no c #B7601E\np c #AC5C1E\nq c #9D531A\nr c #845322\ns c #8E4B18\nt c #7A5325\nu c #844515\nv c #7A4014\nw c #723C12\nx c #6A3912\ny c #5C310F\nz c #4B280C","v":[{"L":35,"rows":["...xtttttttttttttttttttttttttttt...","..hiifgiiihhhfghhhhhhfghhhhhhffhh..",".ijjfgkkkkkifgjkjjjifgjjjjjifgjjhh.","zmoggooooolfgmmmmmkfgmmmmkjfgkkkkjz","vpllqqqqqpllqqqqqpllpppppnilopoomks","ssruuuuuussuussssssssssssqqsqqqqqpp","vxxxxxxxxxwwwwwwwwwwwwvvvvvvvvvvvuq","zzzzzzzzyyyyyyyyyyyyyyyyyyyyyyyyyzz"]},{"L":47,"rows":["...ytttttttttttttttttttttttttttttttttttttttx...","..hiifgiiiiihfghhhhhhfghhhhhhfghhhhhhffhhhhhh..",".ikjfgkkkkkjfgkkkkkifgjjjjjifgjjjjjifgjjjjjhgf.","zmoggppppolfgoooookfgmmmmmkfgmmmmmjfgkkkkkjfefz","vqllqqqqqqllqqqqqpllpqqpppllpppppnilpppponiglkl","ssruuuuuuusuuuuuussssssssssssssssqqsssqqqqqqqpn","vxxxxxxxxxxxxxwwwwwwwwwwwwwwwvvvvvvvvvvvvvvvuuq","zzzzzzzzzzyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyzz"]}],"face":["","c","ae","ace","nbdn","nacdn","nabcen","nabcden","naabcden"],"plain":1,"tint":["#FFC460FF","#B06424FF"],"cr":"#FFECBE"},{"n":"BAGUETTE","h":6,"k":27,"pal":"a c #FCEDC3\nb c #FAE7B9\nc c #F7E0AE\nd c #F6C276\ne c #EEAA50\nf c #F3A23B\ng c #DF9F4C\nh c #E78D2A\ni c #D68A30\nj c #CF7E25\nk c #C47828\nl c #BE7A2E\nm c #BB7223\nn c #B36D20\no c #A7661F\np c #995D1C\nq c #7E6536\nr c #7F5F2B\ns c #865C24\nt c #8F5619\nu c #885218\nv c #764714\nw c #64451B\nx c #673E12\ny c #633C11\nz c #482D0E","v":[{"L":59,"rows":[".......zwrrrrqqrrrrrrrqqrrrrrrrqqrrrrrrrqqrrrrrrrqwz.......","...wgefffffecdffffffecdffffffecdffffffecdffffffecdfffegw...",".lijjjkkkjgdgjjjjjjedgjjjjjiedgjjjiiiedghhhhhhedghhhhhhffi.","ztpppooonggnoooooldgnonnnnldgmnnnnnldglmmmmmldglmmmmmmmmnny","..zxvvvussuuuuuuussuuuuuutpptttttttppttttttpopppppppttuvz..",".....zzzyyyyyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxyzz....."]},{"L":41,"rows":[".......zwrrrrqqrrrrrrrqqrrrrrrrqwz.......","...wgefffffecdffffffecdffffffecdfffegw...",".liijjjjjjedgjjjjjiedgjjiiihedghhhhhhffi.","ztpppooonggnooonnldgmnnnnnldglmmmmmmmmnny","..zxvvvussuuuuuutpptttttttpptttpptttuvz..",".....zzzyyyyyyyyyyyxxxxxxxxxxxxxxyzz....."]}],"face":["","b","ac","abc","kack","kabck","kabbck"],"plain":0,"tint":["#FFD678FF","#C47828FF"],"cr":"#FFECBE"},{"n":"CUCUMBER","h":5,"k":26,"pal":"a c #F0FFD0\nb c #C4EEA0\nc c #8AD49A\nd c #89D099\ne c #88CE97\nf c #88CA96\ng c #5EAC5F\nh c #5EA95E\ni c #5DA85D\nj c #5DA55C\nk c #2C9642\nl c #1D9039\nm c #1B8A37\nn c #1A8435\no c #1A7E33\np c #1C7231\nq c #146B29\nr c #136729\ns c #166128\nt c #116027\nu c #0F5121\nv c #0E4C1E\nw c #0E4A1D\nx c #0D471D\ny c #0C431A","v":[{"L":47,"rows":[".sjjjjjjjjjjjjiiiiiiiiihhhhhhhhhgggggggggggggp.","pfffffffffffffffffffeefeeeeeddddddddddcccccccep","pppoooooooooooonnonnnnonnmnommmmnmmllnllllmlllo","wttttttttttttttrrtrrrrtrrrrtqqqqrqqqqrqqqqqqqqu",".yxyyyyxyyyyxyxxxwxxxxvwwwwvwwwvvvvvvuvvvvuuvy."]},{"L":55,"rows":[".sjjjjjjjjjjjjjjjiiiiiiiiiihhhhhhhhhhhgggggggggggggggp.","pfffffffffffffffffffffffeeeeeeeeedddddddddddcccdcccccep","pppoooopooooooooooonnnonnnnonmmmnmmmmnmmmlnmlllnllllmlo","wttttttttttttttttttrrrtrrrrtrrrrrqqqqrqqqqrqqqqrqqqqqqu",".yxyyyyxyyyyxyyyxxxxxxvwxxwvwwwwvwwwwvvvvvvvvvvuvvvuuy."]}],"face":["","a","bb","bab","kaak","kbabk"],"plain":1,"tint":["#78E26EFF","#22963EFF"],"cr":"#C4EEA0"},{"n":"AUBERGINE","h":8,"k":26,"pal":"a c #F5F1C6\nb c #F2EEC2\nc c #EFEBBD\nd c #EBE7B8\ne c #E8E4B4\nf c #D3B5E8\ng c #C59CE1\nh c #B68BD3\ni c #639B69\nj c #B177D8\nk c #9E65C5\nl c #725F83\nm c #2B5930\nn c #823CB4\no c #7A3FA2\np c #7435A0\nq c #6A3390\nr c #632A8A\ns c #542D71\nt c #532374\nu c #502270\nv c #451D60\nw c #3F1B57\nx c #301B3F\ny c #230F31","v":[{"L":39,"rows":[".....................xvqnkjjjjjjjjjjo..","...............xskjjhggffffffffffffffg.","....mmmmsokjhggffffffgghhhjjjjjjjjjjhgl","...iiiiihgghhhkkknoooppppppppppppppppok","..ymmsrqqqrrrrrrrrrrrrrrrrrrrrrrrrrrrrr","mmmmmmvuuuuuuuuuuuuuuuuuuutttttttttttux","yyymmmmmxwwwwwwwwwwwwwwvvvvvvvvvvvvvvw.","............yyyyyyyyyyyxxxxxxxxxxxxxy.."]},{"L":29,"rows":["................wqnjjjjjjjo..","...........wqjjggffffffffffg.","...mmmqkjhgffffgghhjjjjjjjhgl","..iiiihghhkknooopppppppppppok","..mmsqqqrrrrrrrrrrrrrrrrrrrrr","mmmmvuuuuuuuuuuuuuuttttttttux","yymmmmxwwwwwwwwwwvvvvvvvvvvw.",".........yyyyyyyyxxxxxxxxxy.."]}],"face":["","c","ae","ace","nbdn","nbcen","nacden","nabcden","nabcdeen"],"plain":0,"tint":["#C482F0FF","#7A34AAFF"],"cr":"#F0ECC4"},{"n":"FISH","h":7,"k":27,"pal":"a c #EDF5FA\nb c #ECF4FA\nc c #EBF4FA\nd c #E6EEF5\ne c #E2EAF0\nf c #FFAA88\ng c #CCDDEC\nh c #BCD2E8\ni c #B6CFE7\nj c #A1CFF2\nk c #A4C5E3\nl c #A1ABB4\nm c #83C4F1\nn c #58A4DF\no c #FF7A5C\np c #5F93C7\nq c #548CC8\nr c #748897\ns c #4F8DC9\nt c #4B88C5\nu c #4784C2\nv c #467EB3\nw c #4E7292\nx c #456077\ny c #304557\nz c #1F2F3E","v":[{"L":55,"rows":["........zyyvvvvvvvvxyyzz.............................yw","...yqsstttuuuuuuuuuuuuttssssqpwwyyz.............zwmmmmm",".stuuqyxqptquuqpqqpptqpttqtuqtuttuututssvwyzzynnnnnnnw.","kiiihhrlhiihlkhhihhiihhihhihhiihiihiiiikkikkkkjjjjjjr..",".ebbabbaabaaigabbabbaabaabbaabaabbabbbddhlryyxnnnnnnnw.","...xgedbbbbbhgbbbbbbbbbbbdddeellxxy.............zwmmmmm","........yxxllllllllrxxyz.............................yw"]},{"L":41,"rows":["......zywvvvvvxyzz.....................zw","..yqsstuuvuuuuuuttsssqvwyz..........xmmmm","zttuwzqtpvtppqqpqtqquttuutuusswyzzunnnnw.","kiiikxihhpkhhihhihhiihiihhiiikkikkjjjjr..","zcbbabbableacbabbaabaabbabbbddlryylnnnnw.","..xedbbbbkebbbbbbbbdeeilxy..........xmmmm","......yxrlllllrxyz.....................zw"]}],"face":["","f","oo","ofo","qffe","qofoe","qoffoe","qoofooe"],"plain":0,"tint":["#96D6FFFF","#3C7CBEFF"],"cr":"#FF9678"},{"n":"CARROT","h":6,"k":27,"pal":"a c #FFD678\nb c #FF9E32\nc c #FF9523\nd c #FD8F20\ne c #90B53E\nf c #F88519\ng c #F17A14\nh c #DE7617\ni c #DB6F12\nj c #E26810\nk c #D46A10\nl c #CF630D\nm c #C55E0D\nn c #BA590C\no c #B1550B\np c #A2510C\nq c #9C4B0A\nr c #954709\ns c #8E4409\nt c #83490F\nu c #803F09\nv c #7A3A08\nw c #723808\nx c #6E3507\ny c #673207\nz c #492909","v":[{"L":47,"rows":["....z..........................................","..zdfddcchotzz.................................","eekikiijhgggfffdddfkttz........................","eeloonnnnmmmllkkijjjgggfgfddfkttzz.............","..qssssrrqqqqppppoooonnnmmlllkjjjggggfffmmmruy.","..xyyyyyywxxxxxxwvwwvvvvsuuusussssrrqqqqvvvyzz."]},{"L":39,"rows":[".......................................","...dfdccktyz...........................","eekikijgggfffdccktyz...................","eelnonnmmmllkkjjggggffddmtwz...........","..qsssrrrqqpppooonnnmmllljjgggfffkmmuy.","..xyyyyyywxxxwwwwuvvvuuussssrrrqquvvzz."]}],"face":["","a","bb","bab","jaaj","jbaaj","jbaabj"],"plain":0,"tint":["#FFBE54FF","#F67C16FF"],"cr":"#FFAA46"},{"n":"SAUSAGE","h":5,"k":26,"pal":"a c #FFB7A3\nb c #FFB39F\nc c #FFAF9B\nd c #FFA995\ne c #F2A493\nf c #E6A091\ng c #E19E90\nh c #DC9D8F\ni c #BF6E55\nj c #BC6D54\nk c #BA6C53\nl c #B0654F\nm c #BE462E\nn c #AE4631\no c #B2432D\np c #AB412B\nq c #A33E29\nr c #903624\ns c #843120\nt c #7A3222\nu c #792C1E\nv c #622518\nw c #5E2317\nx c #5A2216\ny c #531F14","v":[{"L":29,"rows":["..tkkkkkkkkjjjjjjiiiiiiiiit..",".lhhhhhghhggggffhgffffffgfel.","uqqqqqqqqqqppppqppooooppommmu",".yuuuuuusssssssssssssssrrrrv.","..yyyxxxxxxxxwwwwwwwvvvvvvy.."]},{"L":41,"rows":["..tkkkkkkkkkkkkkjjjjjjjjiiiiiiiiiiiiiit..",".lhhhhhhhhhggggghhggfffghffffffgffffeeel.","uqqqqqqqqqqqqqqqqpppppqqpooooopooooomoonu",".yuuuuuuuuutssusssssssssssssssrrrrrrrrrv.","..yyyyyyxxxxxxxxxxxxwwwwwwwwvvvvvvvvvvy.."]}],"face":["","c","ad","acd","mbdm","macdm"],"plain":1,"tint":["#FF9668FF","#CC4C32FF"],"cr":"#FFB4A0"},{"n":"ROLL CAKE","h":7,"k":26,"pal":"a c #FFFAEC\nb c #F3D190\nc c #F3C467\nd c #F5C057\ne c #EDB95D\nf c #F4B84C\ng c #E9B555\nh c #E3B051\ni c #D9A94B\nj c #D1A14D\nk c #C39844\nl c #B88E40\nm c #BF8649\nn c #AC863B\no c #A37F3A\np c #C17230\nq c #A07634\nr c #917235\ns c #8B6C30\nt c #B2692D\nu c #B0682C\nv c #7F632C\nw c #715827\nx c #695224\ny c #5E4921","v":[{"L":39,"rows":[".uuubmuumbtttbtttmmjmppmbpppampphbpppb.","yhhhcghgecgggcgeeedcdddccdddccddccccccy","rjjjjiiiiiiiiihhhhhhhgggggggddddddddddr","olllllllllkkkkkkkkkkkkkjjjjjjjjjiiiiiin","mqqqqqqqqoooooooooonnnnnnnnnnnnlllllllj","rvvvvvvvvvvvvvvvsssssssssssssrrrrrrrrrn","yyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxwwwwwwwv"]},{"L":35,"rows":[".uuubmuumbtttbttpmmjmppmbpppamppeb.","yhhhcghgecgggceeeddccddccdddbcccccy","rjjjjiiiiiiihhhhhhhggggggdddddddddr","ollllllllkkkkkkkkkkkkjjjjjjjjiiiiin","mqqqqqqqooooooooonnnnnnnnnnnllllllk","rvvvvvvvvvvvvvssssssssssssrrrrrrrrn","yyyyyyyyyyyyxxxxxxxxxxxxxxxxwwwwwwv"]}],"face":["","u","uf","uff","ufaf","ufaff","ufafaf","ufafaff"],"plain":1,"tint":["#FFE496FF","#B0682CFF"],"cr":"#FFF0C8"},{"n":"TOFU","h":6,"k":27,"pal":"a c #FFFFFA\nb c #FEFEF7\nc c #FCFCF4\nd c #FBFAF1\ne c #FAF8EE\nf c #F8F6EA\ng c #F3F4E4\nh c #E6DDBD\ni c #E4DBBC\nj c #E1D9B9\nk c #DCD3B3\nl c #B7DAA5\nm c #D2C9AA\nn c #CEC5A6\no c #C7BD9E\np c #BFB596\nq c #BAB091\nr c #B6AC8D\ns c #B1A78A\nt c #ABA183\nu c #A69B7C\nv c #A09577\nw c #9C9173\nx c #978C6D\ny c #8F8365\nz c #847A5E","v":[{"L":29,"rows":[".gailaaaaaallaaaaaaaaaxiaaaa.","zjjjjjjjjjjjjjiiiiiiiiihhhhhy","tnnnnnnnnnnnnmmmmmmmmmmmmmmms","osrrrrrrqqqqqqpppppppppooooom","uwwwwwvvvvvuuuuutttttttsssssp","zzzzzzzzzzyyyyyyyxxxxxxwwwvvu"]},{"L":39,"rows":[".gailaaaaaallaaaaaaaaaxiaaaaaaaaalgaaa.","zjjjjjjjjjjjjjjjjjiiiiiiiiiiiihhhhhhhhy","tnnnnnnnnnnnnnnnnmmmmmmmmmmmmmmmmmmmmks","osrrrrrrrrqqqqqqqqqppppppppppppooooooom","uwwwwwwwvvvvvvuuuuuuuuttttttttsssssssrp","zzzzzzzzzzzzzzyyyyyyyyyxxxxxxxwwwwwvvvu"]}],"face":["","e","cf","beg","bdfg","bcefg","bcdefg"],"plain":1,"tint":["#FFFFF6FF","#B0A88CFF"],"cr":"#FFFFF6"},{"n":"SUSHI ROLL","h":6,"k":27,"pal":"a c #FFFFF8\nb c #BDD9CB\nc c #B9AF9C\nd c #619E8A\ne c #8A9986\nf c #659285\ng c #4C947C\nh c #FF8442\ni c #B27746\nj c #608474\nk c #41866F\nl c #1A6854\nm c #1A5949\nn c #185445\no c #175042\np c #164D3F\nq c #11483A\nr c #0F4336\ns c #0F4134\nt c #0E3D31\nu c #0D382D\nv c #0C362C\nw c #0B3229\nx c #0A2C24\ny c #092A22\nz c #092820","v":[{"L":41,"rows":[".bkggkgkgkkgkgkggkgkggkgkgkggkgkggkdkggb.","cbjfjffjdjffjdjdjffjdjffjdjdffdjdjfdjdjbc","hippqoppopopoopnpnoonpnonnomonnnmomnnmnih","hitttttsttstsssssrsrrsrsrrrrrqrqqrqrqqqih","eewwwwwwvwvvvvvvvvvvvvuuuuuuuuuuuuuututee",".ezyzyzzyzxzyyzxzxyyxzxyxxyxyxxxxxxxxxxe."]},{"L":59,"rows":[".bkggkgkgkkgkgkggkgkggkgkgkkgkgkggkgkggkgkgkggkgkggkgkgggb.","cbjfjffjdjffjdjfjffjdjffjdjffjdjdjffjdjffjdjdffdjdjffjdjdbc","hippqpppppoppppopoppopnpoopnpnoonpnonnomonnomomnnmomnmmnmih","hittttttttststsststsssssrssrsrsrrrrsrrrrrqrrqrqrqqrqrqqqqih","eewwwwwwwwwwwvwvvvvvvvvvvvvvvvvvuuuuuuuuuuuuuuuuuuuuututtee",".ezyzyzzyzyzyyzxzyzzxzxzyyzxzxyyxyxyxxyxyxxxxyxxxxxxxxxxwe."]}],"face":["","h","aa","aha","lhhl","lahal","lahhal"],"plain":1,"tint":["#60BE96FF","#165C4AFF"],"cr":"#FFFFF8"}],"times":[5,6,7,8,9,10,12],"chopOut":225,"ruined":1900,"ruinedOut":600,"flash":367,"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1,"&":4},"smallGap":1,"xl":{"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7},"bold":{"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6,"A":6,"B":6,"C":6,"D":6,"E":5,"F":5,"G":6,"H":6,"I":4,"J":5,"K":6,"L":5,"M":9,"N":7,"O":6,"P":6,"Q":6,"R":6,"S":6,"T":6,"U":6,"V":7,"W":10,"X":6,"Y":6,"Z":6," ":4},"normal":{"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5}};
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
// ===== slice.js =====
(function () {
const AMBER = "#FFC24AFF", GREY = "#969CAAFF", STEELC = "#C8CCD6FF", DARK = "#5A5E68FF";
const WORDS = { PERFECT: "#FFC24AFF", CLEAN: "#5AEB82FF", DECENT: "#FFFFFFFF", ROUGH: "#FF9A1AFF", RUINED: "#FF4A3AFF" };
const SLOW = D.slow || 1;           // test builds: a round's time is this many times as long
const TOP_Z = 2000000000;           // above every page
const TEST = D.seed || D.food !== undefined;    // test builds write each round to the log
const st = { best: [], last: 0, hint: 0, seen: 0, rs: null };
let resetVal = null;                // how the switch stands now
let resetDue = false;               // it was flipped: everything is cleared at the next quiet moment
let where = "title";                // "guide" | "title" | "game" | "over" | "scores": what Back means
let backs = 0;
let game = null;                    // { round, total, lastFood, bag }
let R = null;                       // the round in play
let overLine = 0, newBest = false, prevBest = 0;
let overAt = 0;                     // when the page after a game came up: presses in its first moment were meant for the knife
let seed = ((D.seed || Date.now()) % 2147483646) + 1;
function rnd() {
seed = (seed * 16807) % 2147483647;
return (seed - 1) / 2147483646;
}
const pick = (n) => Math.min(n - 1, Math.floor(rnd() * n));
async function load() {
const got = await call("GET", "storage/read?path=/ext/data/slice.json");
try {
const kept = got.ok && !D.fresh ? JSON.parse(got.text) : null;
if (kept && typeof kept === "object") {
const list = kept.best && kept.best.length ? kept.best : [];
for (let i = 0; i < list.length && st.best.length < 5; i++) {
const e = list[i];
if (e && typeof e.s === "number" && typeof e.r === "number" && typeof e.t === "number" && e.s > 0) {
st.best.push({ s: Math.floor(e.s), r: Math.floor(e.r), t: e.t });
}
}
st.best.sort((a, b) => b.s - a.s || b.t - a.t);
st.last = typeof kept.last === "number" ? kept.last : 0;
st.hint = kept.hint ? 1 : 0;
st.seen = kept.seen ? 1 : 0;
st.rs = kept.rs === undefined || kept.rs === null ? null : !!kept.rs;
}
} catch (err) {
}
}
function save() {
return call("POST", "storage/write?path=/ext/data/slice.json", JSON.stringify(st), "application/octet-stream");
}
async function readSettings() {
const v = await loadSettings();
if (typeof v.reset !== "boolean") return;
resetVal = v.reset;
if (st.rs === null) {                            // never looked at before: this is how it stands
st.rs = v.reset;
save();
} else if (v.reset !== st.rs) {
resetDue = true;
if (wake) wake();
}
}
let settingsDue = Date.now() + 5000;
feeds.push(async (now) => {
if (now < settingsDue) return false;
settingsDue = now + 5000;
await readSettings();
return false;
});
function clearAll() {
resetDue = false;
st.best = [];
st.last = 0;
st.hint = 0;
st.seen = 0;
st.rs = resetVal;
game = null;
return save();
}
function rect(id, x, y, w, h, colour, z) {
const el = bar(id, x, y, w, h, colour, z);
el.timeout = STILL;
return el;
}
function still(el) {
el.timeout = STILL;
return el;
}
function bitmap(id, data, x, y, z) {
return { id: id, type: "xpmbitmap", x: x, y: y, align: "top_left", timeout: STILL, data: data, z_index: z };
}
function film(id, name, x, y, z, loop, section) {
return { id: id, type: "animation", path: "animations/" + name + ".anim", x: x, y: y, align: "top_left", loop: loop !== false,
section: section || "default", timeout: STILL, z_index: z };
}
function small(id, s, x, y, colour, align) {
return still(text(id, s, "small", x, y, colour, align || "top_left", 4));
}
function big(id, s, x, y, colour, font) {
return still(text(id, s, font || "bold", x, y, colour, "top_left", 3));
}
function tag(els, p) {
for (let i = 0; i < els.length; i++) els[i].id = p + "_" + els[i].id;
return els;
}
const black = () => rect("bg", 0, 0, 72, 16, "#000000FF", 0);
const GUIDE_X = 71 - smallWidth("GUIDE");            // (the word ends in column 70, as TOP 5 does)
const chevron = (c) => "! XPM2\n6 2 2 1\n. c none\na c " + c + "\n..aa..\n.aaaa.";
function hints(els, guide) {
els.push(bitmap("u1", chevron("#FFC24A"), 33, 0, 4), small("h1", "PLAY", 27, 1, AMBER),
bitmap("u2", chevron(guide ? "#6FB8FF" : "#C8CCD6"), 59, 0, 4), small("h2", guide ? "GUIDE" : "TOP 5", guide ? GUIDE_X : 52, 1, STEELC));
return els;
}
function keys() {
const k = { turn: ctl.turn, ok: ctl.ok, start: ctl.start, back: backs > 0 };
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
return k;
}
function idle(ms) {
if (ctl.turn || ctl.ok || ctl.start || backs || resetDue) return null;
return nap(ms);
}
onBack = () => {                    // Back ends the app on the title only; elsewhere it is a step back
if (where === "title") return false;
backs++;
return true;
};
async function send(parts) {
if (D.lag) await sleep(80 + Math.floor(Math.random() * 70));
return post(parts);
}
async function put(els) {
const parts = els.map((el) => wire(el));
if (await send(parts)) {
const at = Date.now();
for (let i = 0; i < els.length; i++) live.set(els[i].id, { s: parts[i], t: at, el: els[i] });
}
}
async function wipe(ids) {
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
}
function topFilm(id, name, x, z, section) {
return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":' + x + ',"y":0,"align":"top_left","loop":false,' +
'"section":"' + (section || "default") + '","timeout":' + STILL + ',"z_index":' + z + "}";
}
const COVER_Z = 2147481000;
function cover(h) {
return ['{"id":"zz_k1","type":"rectangle","x":0,"y":0,"width":72,"height":' + Math.max(1, h) + ',"fill":"solid","fill_colors":["#000000FF"],' +
'"border_width":0,"timeout":' + STILL + ',"z_index":' + COVER_Z + "}",
'{"id":"zz_k2","type":"rectangle","x":' + (h < 16 ? 0 : OFF) + ',"y":' + Math.min(15, h) + ',"width":72,"height":1,"fill":"solid",' +
'"fill_colors":["#ECF4FFFF"],"border_width":0,"timeout":' + STILL + ',"z_index":' + (COVER_Z + 1) + "}"];
}
const coverOff = () => ['{"id":"zz_k1","type":"rectangle","x":' + OFF + ',"y":0,"width":72,"height":16,"fill":"solid","fill_colors":["#000000FF"],' +
'"border_width":0,"timeout":' + STILL + ',"z_index":' + COVER_Z + "}", cover(16)[1]];
async function fall() {
await send(cover(3));
await sleep(30);
await send(cover(8));
await sleep(30);
await send(cover(16));
}
async function part(more) {
await send([topFilm("zz_c2", "chop_out", 0, COVER_Z + 2)].concat(coverOff(), more || []));
await sleep(D.chopOut + 40);
await wipe(["zz_c2"]);
}
let onPage = "boot";
async function draw(key, els, made) {
if (key === onPage) return show(els);
onPage = key;
busy = true;
try {
const olds = [], mine = {};
await fall();
for (let i = 0; i < els.length; i++) mine[els[i].id] = 1;
for (const id of live.keys()) if (!mine[id]) olds.push(id);
const sent = await postAll(els.map((el) => wire(el)));
if (made) made();
await drop(olds);
if (sent) remember(els);
else await show(els, true);
await part();
} finally {
busy = false;
ctl.ok = ctl.start = false;     // a second press while the page was changing is not a press on the new page
ctl.turn = 0;
}
}
async function putUnder(key, els) {
const olds = [], mine = {};
for (let i = 0; i < els.length; i++) mine[els[i].id] = 1;
for (const id of live.keys()) if (!mine[id]) olds.push(id);
const sent = await postAll(els.map((el) => wire(el)));
await drop(olds);
if (sent) remember(els);
else await show(els, true);
onPage = key;
}
function titleEls() {
return tag(hints([film("bg", "title", 0, 0, 0, false), film("gl", "glint", 0, 0, 2)], true), "t");
}
function wordsEls(top, word) {
return tag([black(), small("c1", top, 36 - (smallWidth(top) >> 1), -1, GREY),
big("c2", word, 36 - (textWidth(word, "bold") >> 1), 5, AMBER)], "q");
}
const GUIDE = 5;
let gpage = 0;
const gEl = (n, x) => topFilm("zz_g" + n, "guide_" + n, x, 5000);
async function makeGuide() {
const parts = [];
for (let n = 1; n <= GUIDE; n++) parts.push(gEl(n, n === 1 ? 0 : OFF));
await send(parts);
gpage = 1;
}
async function guideBook() {
where = "guide";
keys();
while (!stopped) {
await idle(90000);
const k = keys();
if (resetDue) break;                           // "Start over" was flipped meanwhile: the book is put away, and comes again
let to = gpage;
if (k.back && gpage === 1) break;              // Back on the first page closes the book
else if (k.back) to = gpage - 1;
else if (gpage === GUIDE && (k.ok || k.start || k.turn)) break;
else if (k.ok || k.start || k.turn > 0) to = gpage + 1;
else if (k.turn < 0) to = gpage - 1;
else if (!stopped) {                           // nobody there: everything is kept alive
const parts = [];
for (let n = 1; n <= GUIDE; n++) parts.push(gEl(n, n === gpage ? 0 : OFF));
await send(parts);
await show(titleEls());
}
to = Math.max(1, Math.min(GUIDE, to));
if (to !== gpage && !stopped) {                // one request: the new page in, the old one out
await send([gEl(to, 0), gEl(gpage, OFF)]);
gpage = to;
ctl.turn = 0;                                // (a wheel that is still turning does not run through the book)
}
}
if (stopped) return;
if (resetDue) {
const ids = [];
for (let n = 1; n <= GUIDE; n++) ids.push("zz_g" + n);
await wipe(ids);
gpage = 0;
where = "title";
return;
}
st.seen = 1;
save();
busy = true;
try {
await fall();
await show(titleEls());                        // (it is there already)
await part([gEl(gpage, OFF)]);
const ids = [];
for (let n = 1; n <= GUIDE; n++) ids.push("zz_g" + n);
await wipe(ids);
} finally {
busy = false;
}
gpage = 0;
where = "title";
onPage = "title";
keys();                                          // the key that left the book does nothing else
}
async function openBook() {
busy = true;
try {
await fall();
if (onPage !== "title") await putUnder("title", titleEls());
await makeGuide();
await part();
} finally {
busy = false;
}
keys();
}
async function card(top, word, ms) {
await draw("card " + word, wordsEls(top, word));
await sleep(ms || 1000);
}
function cutsEls(n, shown) {
const word = n === 1 ? "CUT" : "CUTS", wn = textWidth("" + n, "bold"), wc = textWidth(word, "bold");
const x0 = 36 - ((wn + 4 + wc) >> 1), p = Math.floor((41 - n) / (n + 1)), w = (n + 1) * p + n, sx = 36 - (w >> 1);
const strip = rect("st", sx, 11, w, 3, R.food.tint[0], 1);
strip.fill = "gradient_v";
strip.fill_colors = R.food.tint;
const els = [black(), big("n", "" + n, x0, 0, AMBER), big("w", word, x0 + wn + 4, 0, WHITE), strip];
for (let i = 0; i < 6; i++) els.push(rect("k" + i, i < shown ? sx + (i + 1) * p + i : OFF, 11, 1, 3, "#000000FF", 2));
return tag(els, "c");
}
async function cutsCard() {
await draw("cuts", cutsEls(R.N, 0));
await sleep(160);
for (let i = 1; i <= R.N; i++) {                 // chop, chop, chop
await show(cutsEls(R.N, i));
await sleep(70);
}
await sleep(420);
}
function cutsFor(round) {
if (round <= 1) return 1;
if (round === 2) return 1 + pick(2);
if (round === 3) return 2;
if (round <= 5) return 2 + pick(2);
if (round <= 7) return 3 + pick(2);
if (round <= 10) return 4 + pick(2);
if (round <= 13) return 5 + pick(2);
return 4 + pick(3);
}
function timeFor(round, n) {
const want = round <= 3 ? (n === 1 ? 8 : 10) : 1.5 + n * Math.max(1.0, 2.6 - 0.15 * (round - 4));
let best = D.times[0];
for (let i = 1; i < D.times.length; i++) if (Math.abs(D.times[i] - want) <= Math.abs(best - want)) best = D.times[i];
return best;
}
const fits = (L, n) => (L + 1) % (n + 1) === 0 && (L - n) / (n + 1) >= 5;
function nextFood(round, n) {
for (let turn = 0; turn < 2; turn++) {
for (let i = 0; i < game.bag.length; i++) {
const f = D.foods[game.bag[i]], ok = [];
if (round <= 3 && !f.plain && D.food === undefined) continue;
if (game.bag[i] === game.lastFood) continue;
for (let j = 0; j < f.v.length; j++) if (fits(f.v[j].L, n)) ok.push(j);
if (!ok.length) continue;
const at = game.bag.splice(i, 1)[0];
return [at, ok[pick(ok.length)]];
}
game.bag = [];                                 // nothing left that fits: a new bag
for (let i = 0; i < D.foods.length; i++) game.bag.splice(pick(game.bag.length + 1), 0, i);
}
return [0, 0];
}
function newRound() {
const round = game.round;
let n = cutsFor(round), got;
if (D.food !== undefined && round === (D.round || 1)) {      // test builds (--food K): that food first
got = [D.food % D.foods.length, 0];
const v = D.foods[got[0]].v;
if (!fits(v[0].L, n) && fits(v[1].L, n)) got[1] = 1;
else if (!fits(v[0].L, n)) n = 1;
} else {
got = nextFood(round, n);
}
const food = D.foods[got[0]], v = food.v[got[1]], L = v.L;
game.lastFood = got[0];
let x0 = (72 - L) >> 1;
if (round >= 8) x0 = 3 + pick(66 - L - 3 + 1);   // from round 8 it may lie off the middle
R = { food: food, at: got[0], rows: v.rows, L: L, N: n, x0: x0, y: 12 - food.h, T: timeFor(round, n), cuts: [],
pieces: [{ id: "p0", a: 0, b: L }], next: 1, knife: 1, left: 0, deadline: 0 };
if (TEST) console.log(APP + " round " + round + " " + food.n + " L " + L + " N " + n + " x0 " + x0 + " T " + R.T);
}
function spanAt(c) {
const rows = R.rows;
let top = -1, bot = -1;
for (let r = 0; r < rows.length; r++) {
if (rows[r].charAt(c) !== ".") {
if (top < 0) top = r;
bot = r;
}
}
return top < 0 ? null : [top, bot];
}
function pieceData(a, b) {
const rows = R.rows, w = b - a;
const fl = a > 0 ? spanAt(a) : null, fr = b < R.L && w > 1 ? spanAt(b - 1) : null;
const fa = fl ? R.food.face[fl[1] - fl[0] + 1] : "", fb = fr ? R.food.face[fr[1] - fr[0] + 1] : "";
let out = "! XPM2\n" + w + " " + rows.length + " " + R.food.k + " 1\n. c none\n" + R.food.pal;
for (let r = 0; r < rows.length; r++) {
let s = rows[r].slice(a, b);
if (fl && r >= fl[0] && r <= fl[1] && s.charAt(0) !== ".") s = fa.charAt(r - fl[0]) + s.slice(1);
if (fr && r >= fr[0] && r <= fr[1] && s.charAt(w - 1) !== ".") s = s.slice(0, w - 1) + fb.charAt(r - fr[0]);
out += "\n" + s;
}
return out;
}
const pieceEl = (pc, dy) => bitmap("g_" + pc.id, pieceData(pc.a, pc.b), R.x0 + pc.a, R.y + (dy || 0), 3);
const boardEl = (dy) => film("g_bd", "board", 2, 12 + (dy || 0), 2, false);
const isCut = (c) => R.cuts.indexOf(c) >= 0;
const BLADE = ["#FFFFFFFF", "#9CBCEEFF"];
function knifeEls(mode, dy) {
const X = R.x0 + R.knife, away = mode === "away", down = mode === "down";
const sp = away || down || isCut(R.knife) ? null : spanAt(R.knife);
const top = down ? 4 : 2 + (dy || 0), tip = down ? 11 : Math.max(3, R.y + (sp ? sp[0] : 0) - 1) + (dy || 0);
const blade = rect("g_bl", away ? OFF : X, top, 1, tip - top + 1, BLADE[0], 7);
blade.fill = "gradient_v";
blade.fill_colors = BLADE;
return [film("g_kn", "knife", away ? OFF : X - 3, down ? 2 : dy || 0, 6, false), blade,
rect("g_sh", sp ? X : OFF, R.y + (sp ? sp[0] : 0), 1, sp ? sp[1] - sp[0] + 1 : 1, "#0000009C", 5)];
}
const LEAD = 600;
const timeEl = (k) => film("g_tm", "bar_" + (R.T * SLOW), 0, 15, 7, false, k < 0 ? "default" : "s" + k);
const CRUMBS = ["....a....\n...a.....\n.....a...\n....a....\n.........", ".a.....a.\n.........\na...a....\n.......a.\n..a......"];
function crumbsEl(n, x, y) {
return bitmap("g_cr", "! XPM2\n9 5 2 1\n. c none\na c " + R.food.cr + "\n" + CRUMBS[n], x, y, 8);
}
function gleamEl(i, x, part) {
const el = rect("g_gl" + i, x, part ? 7 : 2, 1, 5, part ? "#BCD6FFFF" : "#FFFFFFFF", 9);
return el;
}
function pipsEl() {
let rows = "";
for (let i = R.N - 1; i >= 0; i--) rows += "\n" + (i < R.N - R.cuts.length ? "aa" : "bb") + (i > 0 ? "\n.." : "");
return bitmap("g_pp", "! XPM2\n2 " + (2 * R.N - 1) + " 3 1\n. c none\na c #C8D6EC\nb c #343A46" + rows, 68, 12 - 2 * R.N, 4);
}
function playEls() {
const els = [rect("g_bg", 0, 0, 72, 16, "#000000FF", 0), rect("g_bb", 3, 12, 66, 1, "#7A4A24FF", 1), boardEl(0), pipsEl()];
for (let i = 0; i < R.pieces.length; i++) els.push(pieceEl(R.pieces[i], 0));
els.push(crumbsEl(0, OFF, 0), timeEl(R.from));
return els.concat(knifeEls());
}
function setClock() {
const whole = R.T * SLOW * 1000;
R.deadline = Date.now() + (R.from < 0 ? LEAD + whole : whole - R.from * 500) + 200;
}
async function cut() {
const c = R.knife, X = R.x0 + c;
let at = -1;
for (let i = 0; i < R.pieces.length; i++) if (c >= R.pieces[i].a + 1 && c <= R.pieces[i].b - 2) at = i;
if (at < 0) {                                    // on a cut, or right beside one: the knife only nods
await put(knifeEls("", 1));
await sleep(50);
await put(knifeEls());
return false;
}
const one = R.pieces[at], two = { id: "p" + R.next++, a: c + 1, b: one.b }, sp = spanAt(c);
one.b = c;
R.pieces.splice(at + 1, 0, two);
R.cuts.push(c);
R.cuts.sort((p, q) => p - q);
await put(knifeEls("down").slice(0, 2).concat([boardEl(1), pieceEl(one, 1), pieceEl(two, 1)]));
await sleep(55);
const cy = R.y + (sp ? sp[0] : 0) - 5;
await put([boardEl(0), pieceEl(one, -1), pieceEl(two, -1), crumbsEl(0, X - 4, cy), pipsEl()]);
await sleep(55);
await put([pieceEl(one, 0), pieceEl(two, 0), crumbsEl(1, X - 4, cy - 1)].concat(knifeEls()));
const round = R;
setTimeout(() => {                               // the crumbs are gone a moment later (nobody waits for that)
if (R === round && onPage === "play" && !busy) put([crumbsEl(1, OFF, 0)]);
}, 110);
return true;
}
async function play() {
const whole = R.T * SLOW * 1000;                 // -1 = from its beginning; else from that half second on
R.from = R.left > 0 ? Math.max(0, Math.min(2 * R.T * SLOW - 1, Math.round((whole - R.left) / 500) - 1)) : -1;
await draw("play", playEls(), setClock);
if (stopped) return "time";
if (TEST) console.log(APP + " go");
let lastTurn = 0;
while (!stopped) {
const now = Date.now();
if (now >= R.deadline) return "time";
await idle(Math.min(R.deadline - now, 400));
const k = keys();
if (resetDue) return "reset";
if (k.back) {
R.left = Math.max(500, R.deadline - 200 - Date.now());
return "pause";
}
if (k.turn) {                                  // a column a click; two or three when the wheel is spun
const t = Date.now(), per = (t - lastTurn) / Math.abs(k.turn);
lastTurn = t;
const to = Math.max(1, Math.min(R.L - 2, R.knife + k.turn * (per < 45 ? 3 : per < 80 ? 2 : 1)));
if (to !== R.knife) {
R.knife = to;
await put(knifeEls());
}
}
if ((k.start || k.ok) && Date.now() < R.deadline && (await cut()) && R.cuts.length === R.N) return "done";
}
return "time";
}
function pauseEls() {
const quit = "BACK: QUIT";
return tag([black(), bitmap("u", chevron("#FFC24A"), 33, 0, 4), small("a", "RESUME", 21, 1, AMBER),
small("b", quit, 36 - (smallWidth(quit) >> 1), 8, GREY)], "z");
}
async function pauseCard() {
while (!stopped) {
await draw("pause", pauseEls());
await idle(30000);
const k = keys();
if (resetDue) return false;
if (k.start) return true;
if (k.back) return false;
}
return false;
}
function score() {
const p = (R.L - R.N) / (R.N + 1);
let sum = 0;
for (let i = 0; i < R.pieces.length; i++) sum += Math.min(1, Math.abs(R.pieces[i].b - R.pieces[i].a - p) / p);
sum += R.N + 1 - R.pieces.length;
return Math.max(0, Math.round(100 - 100 * sum / (R.N + 1)));
}
function verdict(got) {
const pass = Math.min(75, 60 + Math.round(1.5 * (game.round - 1)));
return got < pass ? "RUINED" : got >= 97 ? "PERFECT" : got >= 88 ? "CLEAN" : got >= 78 ? "DECENT" : "ROUGH";
}
function rulerEl(full) {
const p = (R.L - R.N) / (R.N + 1), top = [], low = [];
for (let x = 0; x < 72; x++) {
top.push(".");
low.push(".");
}
for (let i = 0; i < R.N; i++) top[R.x0 + (i + 1) * p + i] = "w";
for (let i = 0; full && i < R.pieces.length; i++) {
const pc = R.pieces[i], off = Math.abs(pc.b - pc.a - p), ch = off === 0 ? "g" : off <= 1 ? "o" : "r";
for (let x = pc.a; x < pc.b; x++) low[R.x0 + x] = ch;
}
return bitmap("g_ru", "! XPM2\n72 2 5 1\n. c none\nw c #FFFFFF\ng c #2FD060\no c #FF9A1A\nr c #FF4030\n" + top.join("") + "\n" + low.join(""), 0, 14, 7);
}
async function judge() {
const got = score(), word = verdict(got), t0 = Date.now();
await put(knifeEls("away"));
await drop(["g_tm"]);
await sleep(120);
await put([rulerEl(false)]);
await sleep(160);
await put([rulerEl(true)]);
if (word === "PERFECT") {                        // a hard light runs down every cut (rectangles: nothing to load)
await sleep(200);
for (let part = 0; part < 3; part++) {         // down the cuts: upper half, lower half, gone
const lights = [];
for (let i = 0; i < R.cuts.length; i++) lights.push(gleamEl(i, part < 2 ? R.x0 + R.cuts[i] : OFF, part));
await put(lights);
await sleep(90);
}
}
await sleep(1400 - (Date.now() - t0));
return got;
}
function resultEls(pct, word, line) {
const els = [black(), still(text("n", "" + pct, "bold", 25, 2, WHITE, "top_right", 3)), small("p", "%", 26, 4, GREY),
small("l", line, 35, 7, GREY)];
if (word) els.push(small("w", word, 35, 0, WORDS[word]));
return tag(els, "r");
}
async function showResult(got, timeUp) {
const word = verdict(got);
const line = timeUp ? "TIME UP" : "ROUND " + game.round, steps = [0.3, 0.55, 0.75, 0.88, 0.96, 1];
await draw("result", resultEls(0, "", line));
for (let i = 0; i < steps.length; i++) {
await show(resultEls(Math.round(got * steps[i]), "", line));
await sleep(55);
}
await sleep(120);
await show(resultEls(got, word, line));
if (word === "PERFECT") {
await send([topFilm("zz_fl", "flash", 0, TOP_Z)]);
await sleep(D.flash + 60);
await wipe(["zz_fl"]);
}
await sleep(word === "RUINED" ? 700 : 1000);
return word !== "RUINED";
}
function overEls(total, line, colour) {
const els = hints([black()]);
els.push(big("n", "" + total, 1, 6, WHITE, total >= 1000 ? "normal" : "bold"), small("l", line, 72, 8, colour || GREY, "top_right"));
return tag(els, "o");
}
function overLines() {
const n = game.round - 1;
const rounds = [n + (n === 1 ? " ROUND" : " ROUNDS"), GREY];
if (!newBest && prevBest === 0) return [rounds, rounds];     // (nothing scored yet, ever: no best to show)
return [rounds, newBest ? ["NEW BEST", AMBER] : ["BEST " + prevBest, GREY]];
}
async function gameOver() {
if (TEST) console.log(APP + " ruin");
prevBest = st.best.length ? st.best[0].s : 0;
newBest = game.total > prevBest;
if (game.total > 0) {
const now = Date.now();
st.best.push({ s: game.total, r: game.round - 1, t: now });
st.best.sort((a, b) => b.s - a.s || b.t - a.t);
if (st.best.length > 5) st.best.length = 5;
st.last = now;
save();
}
const lines = overLines();
busy = true;
try {
await send([topFilm("zz_ru", "ruined", 0, TOP_Z)]);
await sleep(D.ruined + 150);
await putUnder("over", overEls(0, lines[0][0], lines[0][1]));
await send([topFilm("zz_ro", "ruined_out", 0, TOP_Z + 1)]);      // (the same picture for its first 0.4 s)
await sleep(200);
await wipe(["zz_ru"]);
await sleep(D.ruinedOut - 200 + 60);
await wipe(["zz_ro"]);
} finally {
busy = false;
}
const steps = [0.3, 0.55, 0.75, 0.88, 0.96, 1];
for (let i = 0; i < steps.length && game.total > 0; i++) {
await show(overEls(Math.round(game.total * steps[i]), lines[0][0], lines[0][1]));
await sleep(55);
}
overLine = 0;
where = "over";
overAt = Date.now();
if (TEST) console.log(APP + " over " + game.total);
keys();
}
async function runGame() {
where = "game";
if (!D.seed) seed = ((seed + Date.now()) % 2147483646) + 1;
game = { round: D.round || 1, total: D.bonus || 0, lastFood: -1, bag: [] };
keys();
while (!stopped && !resetDue) {
newRound();
if (!R.food.plain && !st.hint) {               // the first food whose shape misleads: the rule, once
st.hint = 1;
save();
await card("EQUAL", "LENGTH", 1300);
}
await cutsCard();
let how = "pause";
while (how === "pause" && !stopped) {
how = await play();
if (how === "pause" && !(await pauseCard())) {
where = "title";
return;
}
}
if (stopped) return;
if (how === "reset") break;
const got = await judge();
if (!(await showResult(got, how === "time"))) return gameOver();
game.total += got;
game.round++;
}
where = "title";                                 // ("Start over": the game is dropped, the next step clears)
}
function scoresEls(top, off) {
const els = [black()], n = st.best.length;
if (!n) {
els.push(small("no", "NO GAMES YET", 36 - (smallWidth("NO GAMES YET") >> 1), 3, GREY));
return tag(els, "b");
}
for (let i = Math.max(0, top - 1); i < Math.min(n, top + 3); i++) {
const e = st.best[i], y = 7 * (i - top) + off, day = local(e.t), fresh = e.t === st.last;
if (y < -6 || y > 13) continue;
els.push(small("s" + i, "" + e.s, 18, y, fresh ? AMBER : WHITE, "top_right"), small("r" + i, "RD " + e.r, 23, y, fresh ? AMBER : GREY),
small("d" + i, MONTHS[day.getUTCMonth()] + " " + day.getUTCDate(), 69, y, GREY, "top_right"));
}
if (n > 2) {
els.push(rect("tr", 70, 2, 1, 12, "#282C36FF", 1), rect("th", 70, 2 + Math.round(top * 8 / (n - 2)), 1, 4, STEELC, 2));
}
return tag(els, "b");
}
async function scores() {
where = "scores";
await card("BEST GAMES", "TOP 5", 800);
let top = 0;
keys();
let play = false;
while (!stopped) {
await draw("scores", scoresEls(top, 0));
await idle(30000);
const k = keys();
if (resetDue) break;
if (k.start) play = true;
if (k.back || k.start) break;
const to = Math.max(0, Math.min(st.best.length - 2, top + (k.turn > 0 ? 1 : k.turn < 0 ? -1 : 0)));
if (to !== top) {                              // the lines move up or down a line, in three steps
const dir = to > top ? -1 : 1;
await show(scoresEls(top, 3 * dir));
await show(scoresEls(top, 6 * dir));
top = to;
}
}
where = "title";
return play;
}
async function step() {
if (resetDue) {                                  // "Start over": cleared, said on a card; then like new: the guide, the title
where = "title";
await clearAll();
await card("START OVER", "CLEARED", 1500);
await openBook();
await guideBook();
return;
}
if (where === "over") {
const lines = overLines(), line = lines[overLine % 2];
await draw("over", overEls(game.total, line[0], line[1]));
await idle(2400);
const k = keys();
if (resetDue) return;
if ((k.start || k.ok) && Date.now() - overAt < 800) return;      // (still the hand that was cutting)
if (k.start || (k.ok && (await scores()))) return runGame();
if (k.ok) return;
if (k.back) where = "title";
else if (!k.turn) overLine++;
return;
}
where = "title";
await draw("title", titleEls());
await idle(5000);
const k = keys();
if (resetDue) return;
if (k.start) return runGame();
if (k.ok) {                                      // the wheel's press: the guide, and back here
await openBook();
return guideBook();
}
if (k.turn && (await scores())) return runGame();   // a turn: the five best games
}
const SPLASH_MS = 1500;
const splash = (x) => topFilm("zz_sp", "splash", x, TOP_Z + 5);
async function main() {
const t0 = Date.now();
await post([splash(0)]);
await syncTime();
await load();
await readSettings();
const fresh = resetDue;                          // "Start over" was flipped while the app was closed
if (fresh) {
await clearAll();
await putUnder("card CLEARED", wordsEls("START OVER", "CLEARED"));
} else {
await putUnder("title", titleEls());
if (!st.seen) await makeGuide();               // the first time: the guide's pages over the title
}
await sleep(SPLASH_MS - (Date.now() - t0));
if (stopped) return;
await send([topFilm("zz_c2", "chop_out", 0, COVER_Z + 2), splash(OFF)]);
await sleep(D.chopOut + 40);
await wipe(["zz_c2", "zz_sp"]);
keys();
dataLoop();
if (fresh) {                                     // the card for a moment; then the guide, as on first use
await sleep(1500);
await openBook();
}
if (gpage) await guideBook();
while (!stopped) {
try {
await step();
} catch (err) {
report("chop", err);
await sleep(500);
}
}
}
main();
})();

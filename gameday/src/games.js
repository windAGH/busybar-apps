// The week's games: what is asked of ESPN, what is kept of the answers, and which game matters now.

import { getJsonAny, netPause } from "./net.js";
import { call, report } from "./bar.js";

export const SOON_MS = 3600000;     // from this long before kick-off a game counts as "on"

export const TEAMS = ["CHI"];       // the followed team (the app's "My team" setting)

// What the app is looking at: these games are asked for first.
export const focus = {
  mainId: null,                     // THE game: the one the app stays on
  onScreen: null,                   // the game on screen
  up: false,                        // the strip is on screen (live games are then refreshed faster)
};

// ---------- data ----------
// ESPN's whole scoreboard is one answer of about 280 KB, more than an app's memory.
// So the app asks for the list of this week's games (2 KB) and then for one game at a time (9-18 KB each, the very
// same record the big answer holds per game), keeping only the few fields the strip shows.
// Backup: every game is asked for from ESPN's two hosts in turn (the third mirror, cdn.espn.com, only has the whole
// scoreboard, 480 KB - too big for an app); the list of the week is kept in the app's storage, and used when the
// list cannot be fetched; with nothing kept either, the followed team's next game is taken from its team page
// (21 KB, on the same two hosts). When nothing answers, the last good numbers stay on screen and the internet is asked
// again after 10 s, 20 s, 40 s ... up to 2 minutes (net.js). These are all ESPN: they cover a host that is down
// or blocked, not ESPN itself failing.
const LIST_HOSTS = ["https://sports.core.api.espn.com"], LIST_PATH = "/v2/sports/football/leagues/nfl/events?limit=40";
const GAME_HOSTS = ["https://site.api.espn.com", "https://site.web.api.espn.com"];
const GAME_PATH = "/apis/site/v2/sports/football/nfl/scoreboard/";

export let gameIds = [];
export const games = new Map();     // id -> game
const fetched = new Map();          // id -> { at: when we last have it from, hold: do not ask again before }
export let listLoaded = false, listDue = 0;

async function loadList() {
  let ids = [];
  try {
    const got = await getJsonAny(LIST_HOSTS, LIST_PATH);
    const items = got.items || [];
    for (let i = 0; i < items.length; i++) {
      const m = /\/events\/(\d+)/.exec(items[i].$ref || "");
      if (m) ids.push(m[1]);
    }
    call("POST", "storage/write?path=/ext/data/week.json", JSON.stringify({ at: Date.now(), ids: ids }), "application/octet-stream");
  } catch (err) {                                // no list: the one kept from last time, if it is under a week old
    const kept = await call("GET", "storage/read?path=/ext/data/week.json");
    let old = null;
    try {
      old = JSON.parse(kept.text);
    } catch (e) {
      // nothing kept
    }
    if (gameIds.length) throw err;
    if (kept.ok && old && old.ids && old.ids.length && Date.now() - old.at < 7 * 86400000) {
      gameIds = old.ids;
    } else {                                     // nothing kept either: at least the followed team's next game
      const team = await getJsonAny(GAME_HOSTS, "/apis/site/v2/sports/football/nfl/teams/" + TEAMS[0].toLowerCase());
      const next = (team.team && team.team.nextEvent) || [];
      gameIds = next.map((e) => String(e.id)).filter((id) => /^\d+$/.test(id));
    }
    throw err;                                   // still a failure (it is tried again), but the games can be asked for
  }
  gameIds = ids;
  listLoaded = true;
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

/** Postponed or cancelled: it will not be played as listed. */
export function off(g) {
  return /POSTPON|CANCEL|FORFEIT/.test(g.status);
}

// ---------- big plays: what a broadcast would put a graphic on ----------
// Found by looking twice at the game the app stays on: the score went up (6 or more: TOUCHDOWN, 3: FIELD GOAL,
// 2: SAFETY or 2 POINTS), or a new play is an interception (PICKED OFF), a fumble that changed hands (FUMBLE) or a
// sack (SACK); the game went into OVERTIME; it is over (FINAL). The sign names the team by its colour and, when the feed lists the players of the play, the player:
// his number and name (whoOf). A look every 8 seconds can miss a play; a sign is never made up.
export const hits = { on: true,     // setting "Big play effects"
  wait: null };                     // { kind, team, who, rank, id, at }: a sign that waits for the page loop
export const RANK = { sack: 1, fumble: 2, int: 2, two: 3, safety: 3, fg: 3, td: 4, ot: 5, final: 6 };
export const SIGN_GAP = 20000;      // ms between two signs that are not points

function wantSign(g, kind, team, who) {
  if (!hits.on || g.id !== focus.mainId || (!team && RANK[kind] < RANK.ot)) return;
  if (!hits.wait || RANK[kind] >= hits.wait.rank) {
    hits.wait = { kind: kind, team: team, who: who, rank: RANK[kind], id: g.id, at: Date.now() };
  }
}

/** The player a sign should name: { num, name } or null. The play's text says who did what ("... pass short right
 *  to T.Kelce for 12 yards, TOUCHDOWN"); the feed's list of the play's players gives the number and the full name.
 *  (Only what the bar's small JavaScript engine is known to read: regular expressions as literals, no quotes in them.) */
function whoOf(kind, lp) {
  try {
    const list = (lp && lp.athletesInvolved) || [];
    const text = String((lp && lp.text) || "");
    // a name in a play's text: "T.Kelce", "Dj.Moore"; after "by" there may be the team first: "KC-T.McDuffie"
    const last = (m) => (m ? m[m.length - 1] : null);
    let name = null;
    if (kind === "int") name = last(/INTERCEPTED by\s*([A-Z]+-)?[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/.exec(text));
    else if (kind === "fumble") name = last(/RECOVERED by\s*([A-Z]+-)?[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/i.exec(text));
    else if (kind === "sack") name = last(/sacked[^()]*\(\s*[A-Z][a-z]?[a-z]?\.\s?([A-Z][A-Za-z-]+)/.exec(text));
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
      if (name ? fam && fam === plain(name) : i === 0) pick = list[i];
    }
    if (!pick && !name) return null;
    const shown = pick ? family(pick.displayName || pick.fullName || pick.shortName) || name : name;
    return { num: pick ? String(pick.jersey || "") : "", name: String(shown || "").toUpperCase().replace(/[^A-Z0-9 -]/g, "") };
  } catch (err) {
    return null;                                 // a name is a bonus: never in the way of the scores
  }
}

/** Two looks at a game -> at most one sign. */
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
    if (kind) return wantSign(g, kind, team, whoOf(kind, lp));
  }
  if (!g.play || g.play === before.play) return;
  const has = g.poss ? g[g.poss] : null, other = g.poss === "away" ? g.home : g.poss === "home" ? g.away : null;
  if (/intercept/.test(play)) wantSign(g, "int", has, whoOf("int", lp));
  else if (/fumble/.test(play) && g.poss !== before.poss) wantSign(g, "fumble", has, whoOf("fumble", lp));
  else if (/sack/.test(play)) wantSign(g, "sack", other, whoOf("sack", lp));
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
    down_text: sit.shortDownDistanceText || "", distance: sit.distance,
    poss: null, spot: null,
    last: (sit.lastPlay && sit.lastPlay.type && sit.lastPlay.type.text) || "",
    to_a: sit.awayTimeouts, to_h: sit.homeTimeouts,          // timeouts each side has left (3 at the start of a half)
    play: String((sit.lastPlay && sit.lastPlay.id) || ""), timeout_by: null, timeout_since: 0, at: Date.now(),
  };
  if (/timeout/i.test(g.last)) {                 // "Timeout #2 by GB at 03:12.": who called it (else: officials / TV)
    const by = /by\s+([A-Z]{2,3})/.exec((sit.lastPlay && sit.lastPlay.text) || "");
    g.timeout_by = by && by[1] === g.away ? "away" : by && by[1] === g.home ? "home" : "tv";
  }
  const has = String(sit.possession || "");     // who has the ball, and where it is
  if (has && has === String(t.away.id || t.away.team.id)) g.poss = "away";
  if (has && has === String(t.home.id || t.home.team.id)) g.poss = "home";
  const where = (sit.possessionText || "").split(/\s+/).filter((part) => part);   // "DET 35": 35 yards from DET's goal line
  if (where.length === 2 && /^\d+$/.test(where[1])) {
    if (where[0] === g.away) g.spot = Number(where[1]);
    else if (where[0] === g.home) g.spot = 100 - Number(where[1]);
  } else if (where.length === 1 && /^\d+$/.test(where[0])) {                    // midfield is written as just "50"
    g.spot = Number(where[0]);
  }
  // The feed says THAT a timeout is on, not how long is left: we note when we first saw it and count down from the
  // usual two minutes. An estimate - and the feed itself runs 10-30 seconds behind the stadium. It ends the moment
  // the next play comes in.
  const before = games.get(id);
  if (g.timeout_by && g.state === "in") {
    g.timeout_since = before && before.play === g.play && before.timeout_since ? before.timeout_since : Date.now();
  }
  if (isHalf(g)) g.half_since = g.half_since || (before && before.half_since) || Date.now();
  try {
    spot(before, g, sit.lastPlay);
  } catch (err) {
    report("sign", err);                         // a sign is a bonus: never in the way of the scores
  }
  games.set(id, g);
}

export function isHalf(g) {
  return g.state === "in" && /half/i.test(g.detail);
}

/** In the last hour before its kick-off. */
export function soon(g) {
  return g.state === "pre" && !off(g) && g.start - Date.now() <= SOON_MS;
}

export function isOn(g) {
  return g.state === "in" || soon(g);
}

function followed(g) {
  return TEAMS.indexOf(g.away) !== -1 || TEAMS.indexOf(g.home) !== -1;
}

/** How long a game's data stays good. */
function goodFor(g) {
  if (g.state === "in") return focus.up ? 8000 : 30000;
  if (g.state !== "post" && Math.abs(g.start - Date.now()) < 4 * 3600000) return 60000;
  return g.state === "post" ? 1800000 : 600000;
}

/** The game that most needs a fresh look, or null. */
function staleGame(now) {
  let pick = null, worst = -1;
  for (let i = 0; i < gameIds.length; i++) {
    const id = gameIds[i];
    const f = fetched.get(id);
    if (f && now < f.hold) continue;
    const g = games.get(id);
    let late;
    if (!g) {
      late = 1e12 - i;                           // never seen: first, in list order
    } else {
      late = now - f.at - goodFor(g);
      if (late < 0) continue;
      if (followed(g)) late += 1e9;
      if (id === focus.mainId || id === focus.onScreen) late += 2e9;  // the game the app stays on and the one on screen come first
    }
    if (late > worst) {
      worst = late;
      pick = id;
    }
  }
  return pick;
}

export async function gamesFeed(now) {
  if (now < netPause) return false;
  if (now >= listDue) {
    listDue = now + (gameIds.length ? 600000 : 0);                  // if it fails: again after the pause
    await loadList();
    listDue = Date.now() + 6 * 3600000;
    return true;
  }
  const id = staleGame(now);
  if (!id) return seasonFeed(now);               // no game needs a look: is the season over?
  fetched.set(id, { at: (fetched.get(id) || { at: 0 }).at, hold: 0 });
  await loadGame(id);
  fetched.set(id, { at: Date.now(), hold: 0 });
  return true;
}

// ---------- when the season is over ----------
// Nothing on, nothing to come, and the last game days old (or no game at all): the app asks who won the title game
// (the list of the postseason's last week: one game, 250 bytes; then that game like any other) and, for the
// countdown, when the next regular season starts (700 bytes; not there until the league has set it).
//   up to 30 days after the title game:  the champions' banner - gilded: a gold trophy before a sunburst, the
//                                        winner's mark - taking turns with the title game's own strip
//   after that:                          "SEASON IS OVER / OFFSEASON", taking turns with the days to the kick-off
const CHAMP_MS = 30 * 86400000;
export let season = null;           // { win, names, year, game: { away, home, as, hs }, at: when the title game was played, kick: next season's start or 0 }
export let seasonDue = 0, seasonAsked = false;

export function seasonNow() {
  return Date.now();
}

function quiet() {
  if (!listLoaded) return false;
  const all = allGames();
  if (all.length < gameIds.length) return false;  // not every game of the list has been read yet
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
    // the next season is not in the feed yet: no countdown
  }
  return got;
}

/** Asked for when the games need nothing (see the feed above). */
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

/** What the carousel shows while the season is out, or null: not games but pages, each a "game" with a `kind`. They
 *  take turns like the games do, with the same blind between them.
 *    the champions' banner <-> the title game, in the same gold   (for 30 days after the title game)
 *    "SEASON IS OVER / OFFSEASON" <-> the days to the kick-off    (after that; the countdown once the date is known) */
export function seasonItems() {
  if (!season || !quiet()) return null;
  const now = seasonNow(), page = (kind) => ({ id: kind, kind: kind, state: "post", away: "", home: "", start: 0 });
  if (now - season.at < CHAMP_MS) return [page("champ"), page("title")];
  return season.kick > now ? [page("off"), page("kick")] : [page("off")];
}

export function allGames() {
  const all = [];
  for (let i = 0; i < gameIds.length; i++) {
    const g = games.get(gameIds[i]);
    if (g) all.push(g);
  }
  return all;
}

export const byStart = (a, b) => a.start - b.start || (a.id < b.id ? -1 : 1);

/** The carousel away from game `home`: the other games that are on, the finished ones, the ones to come. */
export function carousel(home) {
  const out = seasonItems();
  if (out) return out;
  const all = allGames().filter((g) => !home || g.id !== home.id);
  return all.filter(isOn).sort(byStart)
    .concat(all.filter((g) => g.state === "post").sort(byStart))
    .concat(all.filter((g) => g.state === "pre" && !soon(g)).sort(byStart));
}

/** The game the app starts on and falls back to: the followed team's if it is on, else the first one on. */
export function firstOn() {
  const on = allGames().filter(isOn).sort(byStart);
  const rank = (g) => TEAMS.findIndex((t) => t === g.away || t === g.home);
  const mine = on.filter(followed).sort((a, b) => rank(a) - rank(b) || (b.state === "in") - (a.state === "in"));
  return mine[0] || on[0] || null;
}

/** The followed team's game, if it is on. */
export function myGame() {
  const game = firstOn();
  return game && followed(game) ? game : null;
}

// Gameday: NFL game day on the BUSY Bar. One game at a time as a score strip of 72 x 16: while a game is on, the app
// stays on it; when none is, the finished games and the ones to come take turns. The numbers come straight from
// ESPN's public scoreboard over the bar's Wi-Fi.
//
//   main.js    this file: the settings, and the start
//   page.js    which game is on show, and what the controls do
//   strip.js   one game as a strip: scores, clock, timeouts, the field
//   games.js   the week's games, read one small request at a time
//   draw.js    elements, and how one picture gives way to the next
//   net.js     the loop that asks the internet, and what it does when nothing answers
//   bar.js     the bar itself: its API, its clock, its controls, this app's settings
//   tables.js  generated data: team colours, widths of letters, lengths of the animations

import { gamesPage } from "./page.js";
import { gamesFeed, hits, TEAMS } from "./games.js";
import { dataLoop, feeds, zoneFeed } from "./net.js";
import { loadSettings, report, run, sleep, syncTime, watchControls } from "./bar.js";
import { D } from "./tables.js";

/** Setup (Apps > Gameday > Setup), read at the start and again every 10 seconds:
 *    team     "My team"          - whose game the app starts on, and where a press of the knob goes
 *    effects  "Big play effects" - the signs for touchdowns, field goals, turnovers and sacks. */
async function readSettings() {
  const values = await loadSettings();
  if (typeof values.team === "string" && D.team[values.team]) TEAMS[0] = values.team;
  hits.on = values.effects !== false;
}

let settingsDue = 0;
async function settingsFeed(now) {
  if (now >= settingsDue) {
    settingsDue = now + 10000;
    await readSettings();
  }
  return false;
}

/** The start. The page runs for good; if it ever fails it is entered again, and carries on with what is on screen. */
async function main() {
  watchControls();
  feeds.push(settingsFeed, zoneFeed, gamesFeed);
  await syncTime();
  await readSettings();
  settingsDue = Date.now() + 10000;
  dataLoop();
  while (!run.stopped) {
    try {
      await gamesPage();
    } catch (err) {
      report("page", err);
      await sleep(500);
    }
  }
}

main();

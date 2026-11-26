// Which game is on show, and what the controls do.
//
// A game is "on" while it is being played and, already, in the hour before its kick-off (then it shows 0 - 0 and a
// countdown to the kick-off).
//
// While a game is on, the app shows ONE game and stays on it; it never goes to another game by itself. At the
// start that is the followed team's game if it is on, else the first game that is on. (When it ends its final
// stays 20 seconds; then the next game that is on takes its place.)
// When no game is on, the carousel runs by itself, for good: the finished games, then the ones to come.
//   encoder  the only way to another game: next / previous game that is on, round and round; the strips change
//            sideways, the way the knob was turned. With nothing on, a turn only says so ("NO GAMES ON / RIGHT NOW").
//            While the carousel runs by a press of Start, a turn steps through it.
//   Start    the carousel, one round: a title card ("AROUND THE LEAGUE") comes down like a roller shutter and goes
//            up again on the first of the other games that are on; then the finished ones, the ones to come; a
//            closing card ("BACK TO LIVE") the same way, and the game again. Inside the carousel one item rolls
//            out through the top and the next comes up from below.
//            Start again, at any moment: straight back to the game. (With nothing on: the next item at once.)
//   OK       to the game of "My team" (Setup), from wherever the app is. When that team has no game on, a card
//            says so ("YOUR TEAM / NOT ON NOW").
//   Back     ends the app.

import { field, gameEls, mod, timeoutLeft, timeouts } from "./strip.js";
import {
  allGames, byStart, carousel, firstOn, focus, games, hits, isHalf, isOn, myGame, RANK, seasonItems, SIGN_GAP,
} from "./games.js";
import {
  bandOf, cardAnim, change, firstShow, lift, live, nextBand, notice, OFF, post, roll, show, shutter, smallWidth, T,
  textWidth, WHITE, wire,
} from "./draw.js";
import { APP, call, ctl, nap, run, sleep } from "./bar.js";
import { D } from "./tables.js";

const PER_GAME = 6000;              // ms a game stays up in the carousel

const FINAL_STAY = 20000;           // ms the final of the game on show stays before another game takes its place

const spots = new Map();            // game id -> where we last drew the ball

// One game gives way to the next sideways: the new strip is one request above the old one, drawn column by column
// from the side it comes from (draw.js: change), so the old strip is wiped away in the direction of travel in
// about a quarter of a second. dir 1 = the new game comes from the right (the knob turned on, the carousel moving
// on), -1 = from the left. (A true slide would move two dozen elements at every step: a quarter of a second per
// step on the bar, with the strips half-moved in between.)
function slide(els, dir) {
  return change(els, dir >= 0 ? -1 : 1);         // coming from the right = drawn from right to left
}

function sameGame(a, b) {
  return (a ? a.id : null) === (b ? b.id : null);
}

// ---------- the signs ----------
// A sign is staged like a broadcast hit. The animation is a new element: the bar shows it above everything at
// once, and it opens with frames that hide the screen; meanwhile the plate - one rectangle in the team's colour,
// made off-screen first - is moved in under it. Then, when the feed named the player: a second animation (the
// plate alone, after a hit of white) and on it his number on a dark patch, his name, and what he did. The sign
// leaves behind the same blind that changes the games.
const SIGN_Z = 2147480000;
const run1 = (id, name) => '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":0,"y":0,' +
  '"align":"top_left","loop":false,"section":"default","timeout":20,"z_index":' + (SIGN_Z + 3) + "}";
const SIGN_WORD = { td: "TOUCHDOWN", fg: "FIELD GOAL", safety: "SAFETY", two: "2 POINTS", int: "PICKED OFF", fumble: "FUMBLE", sack: "SACK" };

async function playSign(s) {
  if (!s.team) {                                 // FINAL, OVERTIME: nobody's - a whole picture, no plate, no player
    run.busy = true;
    try {
      await post([run1("zz_s9", "sign_" + s.kind)]);
      await sleep(D.sign[s.kind] + 1300);
      await post([cardAnim("zz_c1", "roll_up_in", 0)]);
      await sleep(D.roll - 30);
      await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_s9"] }));
      await post([cardAnim("zz_c2", "roll_up_out", 0), cardAnim("zz_c1", "roll_up_in", OFF)]);
      await sleep(D.roll + 50);
      await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
    } finally {
      run.busy = false;
    }
    return;
  }
  const plate = { id: "zz_s0", type: "rectangle", x: 0, y: 0, width: 72, height: 16, fill: "solid",
    fill_colors: [(D.plate[s.team] || "#4A5060") + "FF"], border_width: 0, timeout: T, z_index: SIGN_Z };
  const shade = (D.shade[s.team] || "#101018") + "FF";
  const film = (id, name) => '{"id":"' + id + '","type":"animation","path":"animations/sign_' + name + '.anim","x":0,"y":0,' +
    '"align":"top_left","loop":false,"section":"default","timeout":20,"z_index":' + (SIGN_Z + 3) + "}";
  const ids = ["zz_s0", "zz_s9"];
  run.busy = true;
  try {
    await post([wire(plate, OFF, 0)]);
    const t0 = Date.now();
    await post([film("zz_s9", s.kind)]);
    await post([wire(plate)]);
    await sleep(D.sign[s.kind] + 600 - (Date.now() - t0));              // the word has landed and holds
    const who = s.who && s.who.name ? s.who : null;
    if (who) {
      const words = [], put = (id, str, font, x, y, colour) => {
        words.push({ id: id + "s", type: "text", text: str, font: font, x: x + 1, y: y + 1, align: "top_left", color: shade,
          timeout: T, z_index: SIGN_Z + 6 }, { id: id, type: "text", text: str, font: font, x: x, y: y, align: "top_left",
          color: colour, timeout: T, z_index: SIGN_Z + 7 });
      };
      let x = 4;
      if (who.num) {                             // the number on a dark patch at the left
        const w = textWidth(who.num, "bold");
        words.push({ id: "zz_s1", type: "rectangle", x: 2, y: 2, width: w + 5, height: 12, fill: "solid", fill_colors: [shade],
          border_width: 0, timeout: T, z_index: SIGN_Z + 5 });
        put("zz_s2", who.num, "bold", 5, 4, WHITE);
        x = w + 11;
      }
      let name = who.name;
      while (name.length > 1 && smallWidth(name) > 70 - x) name = name.slice(0, -1);
      put("zz_s3", name, "small", x, 1, WHITE);
      put("zz_s4", SIGN_WORD[s.kind], "small", x, 8, "#FFFFFFB0");
      const t1 = Date.now();
      await post([film("zz_s8", "who")]);        // its first frames are white: the change underneath is not seen
      await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_s9"] }));
      ids.pop();                                 // (asking the bar to delete an element that is gone fails the whole request)
      await post(words.map((el) => wire(el)));
      for (let i = 0; i < words.length; i++) ids.push(words[i].id);
      ids.push("zz_s8");
      await sleep(D.sign.who - 100 - (Date.now() - t1));
    } else {
      await sleep(700);
    }
    await post([cardAnim("zz_c1", "roll_up_in", 0)]);
    await sleep(D.roll - 30);
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
    await post([cardAnim("zz_c2", "roll_up_out", 0), cardAnim("zz_c1", "roll_up_in", OFF)]);
    await sleep(D.roll + 50);
    await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
  } finally {
    run.busy = false;
  }
}

/** The app's one page, for good: decides which game is on show, puts its strip on screen, keeps it up to date
 *  and follows the controls (see the top of this file). */
export async function gamesPage() {
  const p = "p";                                 // starts the ids of the strip's elements
  let shown, flip = 0, first = true, z = 0, dir = 1;
  let how = "roll";                              // the next change: "roll" up / down, "side" ways, "open" / "close" = a title card
  for (const rec of live.values()) {             // called again while its strip is still up (it is the only page):
    const id = rec.el.id;                        // carry on with the next game instead of entering anew
    if (rec.el._bk && rec.el.x === 0 && id[0] === p && (id[1] === "a" || id[1] === "b")) {
      flip = id[1] === "a" ? 0 : 1;
      z = rec.el.z_index;
      first = false;
      shown = games.get(focus.onScreen) || undefined;
    }
  }
  // The carousel ({ list, k, why: "auto" nothing is on | "start" }), a game a control asked for, and since when
  // the game on show has been over
  let tour = null, jump = null, finalSince = 0, signAt = 0;
  focus.up = true;
  try {
    while (!run.stopped) {
      // ---- which game now
      let game = null, until = Date.now() + PER_GAME;
      let main = games.get(focus.mainId) || null;
      if (main && main.state === "post" && !finalSince) finalSince = Date.now();
      if (!main || (!isOn(main) && !(main.state === "post" && Date.now() - finalSince < FINAL_STAY))) {
        main = firstOn();                        // at the start, and when the game on show is over
        focus.mainId = main ? main.id : null;
        finalSince = 0;
      }
      if (!main && (!tour || tour.why !== "auto")) tour = { list: carousel(null), k: 0, why: "auto" };
      if (main && tour && tour.why === "auto") tour = null;                     // a game has come on
      if (jump) {
        game = jump;
        jump = null;
      } else if (tour) {
        if (tour.k >= tour.list.length) {
          if (tour.why === "start") {            // one round by hand, and back to the game behind the closing card
            tour = null;
            how = main && isOn(main) ? "close" : "roll";
          } else {                               // round again, with what there is now
            tour.list = carousel(main);
            tour.k = 0;
          }
        }
        game = tour && tour.list.length ? tour.list[tour.k++] : null;
      }
      if (!game && main) {
        game = main;
        until = main.state === "post" ? finalSince + FINAL_STAY : Infinity;     // it stays; the controls decide
      }
      const same = !first && sameGame(shown, game);
      if (!same) {
        flip = 1 - flip;
        z = nextBand();
      }
      const pp = p + "ab"[flip];
      if (first) {
        await firstShow(lift(gameEls(game, pp), pp, z));
      } else if (!same) {
        const next = lift(gameEls(game, pp), pp, z);
        if (how === "open" || how === "close") await shutter(how, next);
        else if (how === "roll") await roll(next, dir);
        else await slide(next, dir);
        z = bandOf(pp);                          // a roll puts the strip under the old one: its band is not the asked one
      }
      how = "roll";                              // by itself the strip moves on upwards
      dir = 1;
      first = false;
      shown = game;
      focus.onScreen = game ? game.id : null;
      let full = 0;
      // ---- stay on it
      while (!run.stopped) {
        const t0 = Date.now();
        if (game) game = shown = games.get(game.id) || game;
        main = games.get(focus.mainId) || null;
        if (hits.wait) {                         // a sign: only over the game the app stays on, and not too often
          const s = hits.wait;
          hits.wait = null;
          const due = s.rank >= RANK.two || t0 - signAt >= SIGN_GAP;
          if (due && game && s.id === game.id && (!tour || s.rank >= RANK.ot) && t0 - s.at < 30000) {
            signAt = t0;
            await show(lift(gameEls(game, pp), pp, z));      // the new score is there when the sign has gone
            await playSign(s);
            ctl.turn = 0;
            ctl.ok = ctl.start = false;
            continue;
          }
        }
        if (ctl.ok) {                            // OK: to my team's game
          ctl.ok = false;
          const mine = myGame();
          if (!mine) {                           // it has no game on: say so, nothing else changes
            await notice("mine");
            ctl.turn = 0;
          } else if (!sameGame(mine, game)) {
            focus.mainId = mine.id;
            finalSince = 0;
            tour = null;
            how = "side";
            break;
          }
        }
        if (ctl.start) {                         // Start: the carousel / straight back to the game
          ctl.start = false;
          if (tour && tour.why !== "auto") {
            tour = null;
            how = main && isOn(main) ? "close" : "roll";     // behind the closing card ("BACK TO LIVE"), as
            dir = -1;                            // at the end of a round; else the game comes back down
            break;
          }
          if (tour) break;                       // nothing is on, the carousel runs anyway: its next item now
          const list = carousel(main);
          if (list.length) {
            tour = { list: list, k: 0, why: "start" };
            how = "open";
            break;
          }
          await notice("alone");
          ctl.turn = 0;
        }
        if (ctl.turn) {                          // encoder
          const turns = ctl.turn;
          ctl.turn = 0;
          dir = turns > 0 ? 1 : -1;
          const on = allGames().filter(isOn).sort(byStart);
          if (!on.length) {                      // nothing is on: say so, the carousel carries on
            await notice("none");
            ctl.turn = 0;                        // turns made meanwhile do not queue more cards
            dir = 1;
          } else if (tour) {                     // while the carousel runs: through its items, up or down
            const k = mod(tour.k - 1 + turns, tour.list.length);
            jump = tour.list[k];
            tour.k = k + 1;
            break;
          } else {                               // the next / previous game that is on
            const at = Math.max(0, on.findIndex((g) => g.id === focus.mainId));
            const next = on[mod(at + turns, on.length)];
            if (next.id !== focus.mainId) {
              focus.mainId = next.id;
              finalSince = 0;
              how = "side";                      // between the games that are on: sideways, the way the knob turned
              break;
            }
            await notice("only");
            ctl.turn = 0;
            dir = 1;
          }
        }
        if (!tour && (!main || !sameGame(main, game) || (!isOn(main) && main.state !== "post"))) break;
        if (tour && tour.why === "auto" && firstOn()) break;                    // a game has come on
        if (t0 >= until) break;
        if (!game && games.size) break;          // the first scores have arrived: show them now
        if (!game && seasonItems()) break;       // the season's end is known now: its pages
        // ---- draw
        const wait = Math.min(until - t0, 500);
        if (!game || game.state !== "in" || isHalf(game)) {      // nothing runs along the field: a few times a second
          await show(lift(gameEls(game, pp), pp, z));
          await nap(wait);
          continue;
        }
        const real = game.spot;                  // the ball slides to where the new data puts it
        let at = spots.has(game.id) ? spots.get(game.id) : real;
        if (real === null || real === undefined || at === null || at === undefined) at = real;
        else if (Math.abs(real - at) > 0.4) at += (real - at) * 0.25;
        else at = real;
        spots.set(game.id, at);
        const phase = Math.floor(Date.now() * 0.011);
        if (t0 - full >= 1000) {                 // once a second everything, in between only what moves
          full = t0;
          await show(lift(gameEls(game, pp, phase, at), pp, z));
        } else {
          const strip = [];
          field(strip, pp, game, phase, at);
          if (timeoutLeft(game) > 0) timeouts(strip, pp, game);
          for (let i = 0; i < strip.length; i++) strip[i].z_index += z + 1;
          await show(strip, true);
        }
        await nap(Math.max(10, Math.min(wait, 90 - (Date.now() - t0))));
      }
    }
  } finally {
    focus.up = false;
  }
}

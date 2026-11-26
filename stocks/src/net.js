// The loop that asks the internet: one small request at a time.

import { call, errs, report, run, sleep } from "./bar.js";

function saveErrs() {
  const line = "draw " + errs.draw + " net " + errs.net;       // the file is rewritten when an error count changes,
  if (line === errs.saved) return;                            // not every time a host answers: that would wear the flash
  errs.saved = line;
  call("POST", "storage/write?path=/ext/data/errors.txt", line, "application/octet-stream");
}

// ---------- the internet: one small request at a time, never while something on screen is changing ----------
export const feeds = [];            // async (now) => true when it asked for something

const started = Date.now();

export async function dataLoop() {
  while (!run.stopped) {
    let did = false;
    if (!run.busy) {
      const now = Date.now();
      for (let i = 0; i < feeds.length && !did; i++) {
        try {
          did = await feeds[i](now);
        } catch (err) {
          did = true;                            // (the feed has set its own time to try again)
          errs.net++;
          report("data", err);
        }
      }
    }
    if (Date.now() - started > 100000 || errs.saved || errs.draw || errs.net) saveErrs();
    await sleep(did ? 250 : 1000);
  }
}

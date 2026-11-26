// The internet: one small request at a time, and what happens when nothing answers.

import { APP, call, errs, report, run, sleep, syncTime } from "./bar.js";

async function getJson(url) {
  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) {
    throw new Error("HTTP " + res.status);
  }
  return JSON.parse(text);
}

const sources = {};

/** The same request from one host after another until one answers; sources counts which one did. */
export async function getJsonAny(hosts, path) {
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

function saveErrs() {
  const line = "draw " + errs.draw + " net " + errs.net;       // the file is rewritten when an error count changes,
  if (line === errs.saved) return;                            // not every time a host answers: that would wear the flash
  errs.saved = line;
  call("POST", "storage/write?path=/ext/data/errors.txt", line + " sources " + JSON.stringify(sources), "application/octet-stream");
}

// ---------- the feeds, and the loop that runs them: never while something on screen is changing ----------
export const feeds = [];            // async (now) => true when it asked for something
export let fails = 0, netPause = 0;  // after a failure the internet is left alone for 10 s, 20 s, 40 s ... up to 2 min
export let wifiUp = true;           // what the bar said about its Wi-Fi when a request last failed

export let offline = false;         // the last request to the internet failed

const started = Date.now();

export async function dataLoop() {
  while (!run.stopped) {
    let did = false;
    if (!run.busy) {
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

let zoneDue = Date.now() + 3600000;
export async function zoneFeed(now) {  // the time zone again every hour (summer time)
  if (now < zoneDue) return false;
  zoneDue = now + 3600000;
  await syncTime();
  return false;
}

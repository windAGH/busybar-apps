// The bar itself, as an app may use it: its HTTP API, its clock and time zone, its controls, and this app's own
// settings. (An app may only call a short list of the bar's endpoints: display/draw, time, its own settings and
// storage, wifi/status and a few more.)

import manifest from "./appmeta/manifest.json";

export const APP = manifest.id;     // the name the app draws under

export const TITLE = manifest.name;  // shown, faintly, until the first data has arrived

const API = "http://localhost/api/";

export const run = {
  stopped: false,                   // Back was pressed: every loop ends at its next step
  busy: false,                      // the picture on screen is being exchanged: no internet request starts meanwhile
};

export const sleep = (ms) => new Promise((done) => setTimeout(done, Math.max(0, ms)));

export const pad2 = (n) => (n < 10 ? "0" : "") + n;

// ---------- the bar's controls ----------
// The handler only takes notes; the page on screen reads them at its next step (a press cuts its wait short).
//   encoder: ctl.turn counts the clicks (+ clockwise, - the other way)     OK: ctl.ok is set
//   Start:   ctl.start is set                                              Back (short): the app ends
// (Events as the bar sends them: { key: "encoder", action: "clockwise" | "counterclockwise", delta: 1 | -1 },
//  { key: "ok" | "start" | "back", action: "press" | "short" | "release" }.)
export const ctl = { turn: 0, start: false, ok: false };
let wake = null;

/** Waits ms, or until a control is used. */
export function nap(ms) {
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

// ---------- input ----------
/** Starts taking the bar's controls. Back (short) ends the app: every loop ends at its next step, and with the
 *  handler unbound nothing keeps the app alive. */
export function watchControls() {
  const unbind = listen("input", (event) => {
    if (run.stopped) return;
    if (event.key === "back") {
      if (event.action !== "short") return;
      run.stopped = true;             // every loop ends at its next step; then nothing keeps the app alive
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
}

export function report(what, err) {
  console.error(APP + ": " + what + ": " + (err && err.message ? err.message : String(err)));
}

// ---------- the bar's API ----------
export async function call(method, path, body, type) {
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

// What went wrong while the app ran: draw requests the bar refused, and requests to the internet that failed.
// Written to the app's storage (errors.txt) 100 seconds after the start and whenever a number changes after that.
export const errs = { draw: 0, net: 0, saved: "" };

/** This app's own settings as set on the bar (Apps > the app > Setup). An app cannot read another app's. */
export async function loadSettings() {
  const got = await call("GET", "apps/settings?app_id=" + APP);
  try {
    return (got.ok && JSON.parse(got.text).values) || {};
  } catch (err) {
    return {};
  }
}

// ---------- time: the bar knows the local time and its zone, the script only trusts UTC ----------
let zoneMs = 0;

export async function syncTime() {
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

/** A Date whose getUTC...() read the local wall clock. */
export function local(ms) {
  return new Date((ms === undefined ? Date.now() : ms) + zoneMs);
}

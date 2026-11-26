// GENERATED FILE - do not edit by hand. Written by the author's export script (export.py, kept outside this
// repository) from the design sources; the app only reads it.
// Gameday: team colours, sizes of the pictures, lengths of the animations, widths of the bar's fonts.

export const D = {
  // each team's colour: the glow at its end of the strip, its timeout marks, its end of the field
  team: {
    ARI: "#D0103A", ATL: "#E0183C", BAL: "#7A4BD6", BUF: "#2460E8", CAR: "#10A0EA", CHI: "#FA5A12", CIN: "#FB4F14",
    CLE: "#FF5014", DAL: "#C4D0DE", DEN: "#FB4F14", DET: "#1E90E0", GB: "#FFB612", HOU: "#E21030", IND: "#2A66E8",
    JAX: "#1AA8A4", KC: "#E8162F", LAC: "#1C9BF0", LAR: "#3565F0", LV: "#C8CDD2", MIA: "#08B8BA", MIN: "#7A45D8",
    NE: "#D81432", NO: "#D3BC8D", NYG: "#3358DC", NYJ: "#20B06C", PHI: "#14907A", PIT: "#FFB612", SEA: "#69C828",
    SF: "#DC1C24", TB: "#DA1616", TEN: "#4B92DB", WSH: "#B82642",
  },
  // columns each team's badge covers in its 14 x 14 square (XXX: a team the app does not know)
  badge: {
    ARI: 13, ATL: 13, BAL: 13, BUF: 14, CAR: 14, CHI: 13, CIN: 13, CLE: 13, DAL: 13, DEN: 14, DET: 13, GB: 13,
    HOU: 14, IND: 13, JAX: 13, KC: 13, LAC: 13, LAR: 13, LV: 13, MIA: 13, MIN: 13, NE: 13, NO: 13, NYG: 13, NYJ: 13,
    PHI: 13, PIT: 13, SEA: 14, SF: 13, TB: 13, TEN: 13, WSH: 14, XXX: 13,
  },
  // ms a title card takes to come down, and to roll up (animations/card_*.anim)
  card: 300,
  // ms the blind between two games takes each way (animations/roll_*.anim)
  roll: 150,
  // ms each big-play sign runs (animations/sign_*.anim)
  sign: {
    td: 1300, fg: 1300, safety: 1300, two: 1300, int: 1300, fumble: 1300, sack: 1300, who: 2200, final: 1300,
    ot: 1300,
  },
  // each team's colour as the plate of a sign: dark enough for white letters
  plate: {
    ARI: "#D0103A", ATL: "#E0183C", BAL: "#7A4BD6", BUF: "#2460E8", CAR: "#0557A3", CHI: "#AE2306", CIN: "#AF1B07",
    CLE: "#B21B07", DAL: "#888E9B", DEN: "#AF1B07", DET: "#0F4F9C", GB: "#B26506", HOU: "#E21030", IND: "#2A66E8",
    JAX: "#0E6A75", KC: "#E8162F", LAC: "#0D54A7", LAR: "#3565F0", LV: "#30333A", MIA: "#006E82", MIN: "#7A45D8",
    NE: "#D81432", NO: "#937B60", NYG: "#3358DC", NYJ: "#127B58", PHI: "#0A6461", PIT: "#B26506", SEA: "#368C17",
    SF: "#DC1C24", TB: "#DA1616", TEN: "#305599", WSH: "#B82642",
  },
  // the shadow of the letters on that plate
  shade: {
    ARI: "#58002B", ATL: "#5F032C", BAL: "#281B5B", BUF: "#090C62", CAR: "#001245", CHI: "#4A0007", CIN: "#4A000B",
    CLE: "#4B000B", DAL: "#393942", DEN: "#4A000B", DET: "#020E42", GB: "#4B1600", HOU: "#600028", IND: "#0B1062",
    JAX: "#022032", KC: "#620227", LAC: "#000E47", LAR: "#111066", LV: "#141419", MIA: "#002037", MIN: "#26185C",
    NE: "#5C0227", NO: "#3E2D27", NYG: "#13105D", NYJ: "#043431", PHI: "#01212A", PIT: "#4B1600", SEA: "#063B06",
    SF: "#5D0520", TB: "#5C031A", TEN: "#111541", WSH: "#4E0B2A",
  },
  // widths of the characters of the bar's font `small`, in pixels, as measured on the bar
  small: {
    A: 4, B: 4, C: 4, D: 4, E: 4, F: 4, G: 4, H: 4, I: 1, J: 3, K: 4, L: 3, M: 5, N: 4, O: 4, P: 4, Q: 4, R: 4, S: 4,
    T: 3, U: 4, V: 3, W: 5, X: 3, Y: 3, Z: 3, a: 3, b: 3, c: 3, d: 3, e: 3, f: 2, g: 3, h: 3, i: 1, j: 2, k: 3, l: 1,
    m: 5, n: 3, o: 3, p: 3, q: 3, r: 2, s: 3, t: 2, u: 3, v: 3, w: 5, x: 3, y: 3, z: 3, "0": 3, "1": 2, "2": 3,
    "3": 3, "4": 3, "5": 3, "6": 3, "7": 3, "8": 3, "9": 3, ",": 1, ":": 1, ".": 1, "%": 4, "/": 2, "-": 2, "+": 3,
    " ": 1, "&": 4,
  },
  // the gap between two characters of `small`
  smallGap: 1,
  // widths of the digits of the fonts `bold` and `normal`
  bold: { "0": 6, "1": 6, "2": 6, "3": 6, "4": 6, "5": 6, "6": 6, "7": 6, "8": 6, "9": 6 },
  normal: { "0": 5, "1": 5, "2": 5, "3": 5, "4": 5, "5": 5, "6": 5, "7": 5, "8": 5, "9": 5 },
};

# BUSY Bar apps

Three JavaScript apps for the [BUSY Bar](https://busy.app). All run on the bar itself and fetch their data over its Wi-Fi: no computer, no account, no key.

- **[Gameday](gameday/)**: NFL game day as a score strip, with the field, the timeouts, the red zone and countdowns to kick-off.
- **[Hoops](hoops/)**: NBA game night as a score strip, with the timeouts, runs and fouls, big-play signs and countdowns to tip-off.
- **[Stocks](stocks/)**: stock, index, crypto and currency prices, one ticker at a time, with the day's line.

## Building

Each app is a project of its own, laid out like the official template (`npm create @busy-app/app`) and built with [busy-cli](https://www.npmjs.com/package/@busy-app/cli). Node 24 is needed.

```sh
cd gameday            # or: cd hoops, cd stocks
npm ci
npm run build         # -> dist/<app id>.tgz
npm run app:install   # onto a BUSY Bar connected over USB
npm run app:run
```

## Layout of an app

```
src/main.js        the entry point; it lists the other modules at its top
src/*.js           the modules it imports (Hoops is one generated file, main.js, with its data at the top)
src/tables.js      generated data (colours, widths, bitmaps); not edited by hand
src/appmeta/       manifest.json, settings.json, the two menu icons
src/images/        pictures the app draws with (Gameday, Hoops)
src/animations/    title cards, signs and page changes the bar plays by itself (Gameday, Hoops)
screenshots/       72 x 16, captured from the BUSY Bar Emulator
```

The apps are plain JavaScript and use no library: they talk to the bar's HTTP API with `fetch`.

## Notes

- The data sources are unofficial public endpoints (ESPN for Gameday and Hoops; Yahoo Finance and CNBC for Stocks). They need no key and can change without notice.
- Gameday and Hoops carry no league or team logos: teams are drawn as a generic helmet (Gameday) or jersey (Hoops) in the team's colours over its three letters.
- Not affiliated with or endorsed by the NFL, the NBA, ESPN, Yahoo, CNBC or Flipper.

## License

[MIT](LICENSE)

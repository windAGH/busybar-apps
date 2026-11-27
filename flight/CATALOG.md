# Flight

A focus timer dressed as a flight. Choose the airport you are at, how long you want to focus and one of the airports that far away. A boarding pass is printed, the aircraft takes off, and while you work the window shows the sky you are flying through. Landing is the end of the session, and the destination is where your next flight starts.

## What you see

- **The hall**: the city you are in, LOGBOOK under the top button and CHECK IN under the wheel.
- **Check-in**, three pages on split-flap tiles: the departure airport, the flight time (15 minutes to 16 hours), and the airports about that long away, worked out from the real distance.
- **The boarding pass** comes out like paper from a printer; then boarding and the take-off, and the camera closes in on a cabin window until you look out of it.
- **In the air**, two pages take turns. The window: the wing with its light and the sky as it is where the aircraft is at that moment, with the sun and the moon where they stand, the moon in today's phase, stars at night, and clouds from the real weather there. The board: the route with the aircraft on it, the time and distance left, and the arrival time at the destination's clock.
- **Landing**: fifteen minutes before, the seat-belt sign comes on with LANDING SOON. Then the window closes, the runway comes up, and a welcome with the local time. Time spent on pause shows as a delay.
- **The logbook** keeps your last 60 flights.

A flight keeps running while the app is closed and is picked up when you open it again.

## Controls

- **In the hall**: press the wheel to check in, the top button for the logbook, Back to exit.
- **Check-in pages**: the wheel chooses, a press of the wheel goes on, Back goes one page back. The best-known airports come first.
- **Find an airport by its letters**: on the departure page, press the top button. Turn the wheel for a letter, press for the next one; after the third the airport is looked up.
- **Route and boarding pass**: the top button (or a press of the wheel) prints the pass, and then boards.
- **In the air**: the wheel changes the page, a press keeps the page or lets the two take turns again, the top button pauses and resumes, Back asks whether to end the flight early.

## Settings

- **Distance**: kilometres or miles.
- **Real weather**: the clouds under the wing follow the weather where the flight is. Off: always a few clouds.
- **Surprises**: now and then something that has no business up there drifts past the window.
- **True sun and moon**: off, they are in the window whenever they are above the horizon. On, only when they really stand on your side of the aircraft.

## Airports

- 3,244 airports with scheduled flights. The busiest 512 are part of the app and work at once.
- The others arrive on the first start: the app fetches 75 small text files (about 80 KB) from this app's repository on GitHub and keeps them in its own storage. This takes under a minute and you can already plan a flight meanwhile. Without a connection the app says so once and goes on with the 512.
- Clocks use each airport's time zone as it was when the tables were built, so an arrival time can be an hour off after a change to or from summer time.

## Data and privacy

- Airport tables: built from [OurAirports](https://ourairports.com/data/) (public domain) and the [OpenFlights](https://openflights.org/data.php) databases (Open Database License). They are in this repository under flight/airports, under the same licence.
- Weather: the cloud cover at the aircraft's position from [Open-Meteo](https://open-meteo.com/) (no key, no account). Only a position rounded to 0.01 degree is sent.
- Nothing else leaves the bar. Sun, moon and flight times (816 km/h plus 12 minutes) are worked out on the bar.
- This app is not affiliated with any airline, airport or data provider.

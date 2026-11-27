# Flight

A focus timer dressed as a flight. Choose the airport you are at, how long you want to focus and one of the airports that far away. A boarding pass is printed, the aircraft takes off, and while you work the window shows the sky you are flying through. Landing is the end of the session, and the destination is where your next flight starts.

## What you see

- **The hall**: the city you are in, LOGBOOK under START and CHECK IN under the knob.
- **Check-in**, three pages on split-flap tiles: the departure airport, the flight time (15 minutes to 16 hours), and the airports about that far away by the real distance.
- **The boarding pass** comes out like paper from a printer; then boarding, the take-off, and a cabin window to look out of.
- **In the air**, two pages take turns. The window: the wing with its light and the sky as it is where the aircraft is at that moment: the sun and the moon where they stand, the moon in today's phase, stars at night, clouds from the real weather there. The board: the route, the time and distance left, and the arrival time by the destination's clock.
- **Landing**: fifteen minutes before, the seat-belt sign comes on with LANDING SOON. Then the window closes, the runway comes up, and a welcome with the local time. A pause shows as a delay.
- **The logbook** keeps your last 60 flights.

A flight keeps running while the app is closed and is picked up when you open it again.

## Controls

- **In the hall**: OK (a press of the knob) checks in, START (the big button on top) opens the logbook, BACK exits.
- **Check-in pages**: turn the knob to choose, OK goes on, BACK goes one page back. The best-known airports come first.
- **Find an airport by its letters**: on the departure page, press START. Turn the knob for a letter, OK for the next; after the third the airport is looked up.
- **Route and boarding pass**: START (or OK) prints the pass, then boards.
- **In the air**: turn the knob for the other page, OK keeps it or lets the two take turns again, START pauses and resumes, BACK asks whether to end the flight early.

## Settings

- **Distance**: kilometres or miles.
- **Real weather**: the clouds under the wing follow the weather where the flight is. Off: always a few clouds.
- **Surprises**: now and then something odd drifts past the window.
- **True sun and moon**: off, they are in the window whenever they are above the horizon. On, only when they really stand on your side of the aircraft.
- **Start over**: flip this switch, either way, to clear where you are, the logbook and a flight in the air. Each flip starts over once. The airports' files stay.

## Airports

- 3,244 airports with scheduled flights. The busiest 512 are part of the app and work at once.
- The others arrive on the first start: 75 small text files (about 80 KB), fetched from this app's repository on GitHub and kept in its storage. It takes under a minute; you can plan a flight meanwhile. Without a connection the app says so once and goes on with the 512.
- Clocks use each airport's time zone as of the day the tables were built: after a change to or from summer time an arrival can be an hour off.

## Data and privacy

- Airport tables: built from [OurAirports](https://ourairports.com/data/) (public domain) and the [OpenFlights](https://openflights.org/data.php) databases (Open Database License). They are in this repository under flight/airports, under the same licence.
- Weather: the cloud cover at the aircraft's position from [Open-Meteo](https://open-meteo.com/) (no key, no account). Only a position rounded to 0.01 degree is sent.
- Nothing else leaves the bar. Sun, moon and flight times (816 km/h plus 12 minutes) are worked out on the bar.
- This app is not affiliated with any airline, airport or data provider.

# Airport tables

Small text files the Flight app fetches once, after it has been installed, and keeps in its own storage on the bar. One folder per set; an app asks for the set it was built with, so older versions keep working.

- `v.txt`: the name of the set.
- `g<k>.txt`: the positions of 600 airports, six characters each: the direction of the place from the middle of the earth (x, y, z, each between -1 and 1), two characters a number: (value + 1) x 4232, rounded, in base 92 with the characters from `#` on. Kept as directions so that the distance between two airports needs no trigonometry on the bar.
- `a<c>.txt`: 64 airports, one line each: IATA code (3 characters), clock (2: minutes ahead of UTC on the day the set was built, plus 720, divided by 15, in base 36), country (2 letters), city.

- `l<X>.txt`: the airports whose code starts with the letter X, five characters each: the code's other two letters, then the airport's place in the table as three digits in base 36 (0 = the first line of `a0.txt`).

The airports are in the order of how many destinations they serve, the busiest first.

## Sources and licence

- [OurAirports](https://ourairports.com/data/) (public domain): codes, positions, kind of airport, countries.
- [OpenFlights](https://openflights.org/data.php) airports and routes databases, made available under the [Open Database License](https://opendatacommons.org/licenses/odbl/1-0/) (ODbL): the served city's name, the time zone, the number of destinations.

The files in this folder are a database derived from those two, and are made available under the Open Database License (ODbL) v1.0. The rest of this repository is under the MIT licence.

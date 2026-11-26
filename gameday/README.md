# Gameday

NFL game day on your BUSY Bar. One game at a time as a score strip: both teams, the score, the quarter and the clock, the timeouts each side has left, and along the bottom the field with the ball on it.

## What you see

- **During a game**: the two scores, the quarter over the game clock (now and then the down and distance, such as 2&7), three marks above each score for the timeouts left, and the field along the bottom row: an orange dot for the ball and a yellow line for the line to gain.
- **Big plays**: a sign in the team's colour, like a broadcast graphic, for a touchdown, a field goal, a safety, a two-point play, an interception, a lost fumble and a sack, followed by the player's number and name when the feed gives them. Only for the game the app stays on.
- **Red zone**: the last 20 yards of the field turn red when the ball comes near.
- **Timeout**: T/O over a countdown, and the mark of the timeout just called blinks. **Halftime**: Half over a countdown to the second half. Both countdowns are estimates: the feed only says that a break is on.
- **The hour before kick-off**: the game already takes its place, with 0 - 0 and a countdown to the kick-off. The line along the bottom shrinks towards the middle as the hour runs out; the clock turns orange for the last five minutes, red for the last one, and a KICKOFF card comes down when the game starts.
- **Earlier**: both teams' records, the day and the kick-off time in your bar's time zone. **Afterwards**: Final (Final/OT after overtime) and the score, the loser dimmed. A game that is postponed or cancelled says so; a game stopped by the weather shows Delay.
- **When the season is over**: for 30 days after the title game, a gold champions' banner takes turns with that game's score. After that: SEASON IS OVER / OFFSEASON, with the days to the next kick-off.
- Each team is a small pixel drawing of its mark, made by hand for this app, or its three letters in tall capitals. (The branch `no-logos` has the app with a plain helmet instead.)

While a game is on, the app stays on one game: your team's if it is on, otherwise the first one. When no game is on, the finished games and the ones to come take turns, six seconds each.

## Controls

- **Wheel**: the next or the previous game that is on.
- **OK** (press the wheel): the teams as their marks, or as their three letters.
- **Start**: a look around the league: the other games that are on, the finished ones, the ones to come, and back to your game. Start again goes back at once, behind a BACK TO LIVE card.
- **Back**: exit.

## Settings

- **My team**: one of the 32 teams. The app starts on its game.
- **Show**: all games, or my team only in the weeks it plays.
- **Show teams as**: marks or letters, as the app starts.
- **Big play effects**: the signs for touchdowns and the like, on or off.

A change applies within 10 seconds; no restart is needed.

## Data and privacy

- Scores come from ESPN's public scoreboard endpoints (site.api.espn.com, site.web.api.espn.com and sports.core.api.espn.com), read by the bar itself over Wi-Fi. They are unofficial, need no key or account, and can change without notice. Live numbers run 10 to 30 seconds behind the stadium.
- The app sends no personal data, only plain requests for the games. On the bar it keeps two small files: the week's list of games and a count of failed requests.
- This app is not affiliated with or endorsed by the NFL, its teams or ESPN. Team names, letters and marks are used only to say who is playing and belong to their owners.

## Without a connection

- The last numbers stay on screen and the app keeps asking, up to every 2 minutes. A live game whose numbers are over two and a half minutes old shows a grey quarter and --:-- for the clock.
- If nothing could be loaded at all, a card says why: NO WI-FI, or NO DATA / RETRYING when the hosts do not answer.
- In a week without games during the season the card reads NO GAMES / THIS WEEK.

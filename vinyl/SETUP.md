# Vinyl: setting it up, step by step

Vinyl shows the song you are listening to as a record player on your BUSY Bar, with the lyrics beside it.

The bar cannot hear music. Something has to tell it what is playing. Nothing is downloaded by itself when you
install Vinyl: this page is everything you need. Every command on it is shown in full and does only what the
sentence beside it says. No command asks for your password, and nothing is sent anywhere except between your own
Mac, your own bar and (for the lyrics) lrclib.net, or (way 2) Spotify.

## Which way is yours?

- **I have a Mac, and my music plays on it.** Go to [Way 1: a Mac](#way-1-a-mac). Works with Spotify, Apple Music,
  QQ Music, NetEase Cloud Music, YouTube in a browser and most other players. About five minutes.
- **No Mac, but I use Spotify (on my phone or anywhere).** Go to
  [Way 2: Spotify, with a phone only](#way-2-spotify-with-a-phone-only). About ten minutes, once.
- **No Mac, and my music is Apple Music, QQ Music, NetEase or another app on my phone.** This cannot work: a phone
  does not let another device ask what it is playing, and those services offer no way to ask them either.

You need only one way. If you set up both, the Mac wins while it is running.

---

## Way 1: a Mac

You will put one small program on your Mac, called **Vinyl for Mac**. It is a single file. It tells the bar what
your Mac is playing, and it lets the bar's Start button and knob pause, play and change the volume. One line does
all of it. Tested on macOS 27; other versions of macOS are untested.

You need: the Mac, the bar, the bar's USB cable (once), and both on the same Wi-Fi.

### Step 1. Open Terminal

Terminal is a program that comes with every Mac. You type a line into it and the Mac does what the line says.

1. Hold the **Command** key and press the **space bar**. A search field appears.
2. Type `Terminal`.
3. Press **Return**. A window with some text and a blinking mark opens. That is Terminal.

### Step 2. Copy one line into Terminal

Copy this whole line (on this page, press the copy button at its right end):

```sh
curl -fsSL -o ~/vinyl_helper.py https://raw.githubusercontent.com/windAGH/busybar-apps/336cc69c658cc5a8cf2d27c7b97ada77b08bca46/vinyl/helper/vinyl_helper.py && python3 ~/vinyl_helper.py --install
```

Click into the Terminal window, press **Command + V** to paste it, then press **Return**.

What the line does, and nothing else:

- The first half saves the file `vinyl_helper.py` from this project into your home folder.
- The second half lets that file install itself: it copies itself into your own Library
  (`Library/Application Support/Vinyl for Mac`), and tells macOS to run it now and every time you log in (one small
  settings file in `Library/LaunchAgents`). It runs without a window. It asks for no password and touches nothing
  outside your own Library.

### Step 3. Answer what your Mac asks

Your Mac may ask one or more of these. If it asks none, all the better.

| The Mac shows | Press | Then |
| --- | --- | --- |
| "The python3 command requires the command line developer tools. Would you like to install the tools now?" | **Install**, then **Agree** | Wait until it says it is done (5 to 15 minutes). Then do step 2 again. |
| A notice "Background Items Added" (it names Python, or the author of your Python) | Nothing. | That is Vinyl for Mac, allowed to start by itself. |
| "Do you want the application Python to accept incoming network connections?" (it may say python3 with a number) | **Allow** | Nothing. This is how the bar reaches your Mac over Wi-Fi. |
| "... would like to find and connect to devices on your local network" | **Allow** | Nothing. Your bar is such a device. |

### Step 4. Check that it runs

After a few seconds the Terminal window says (the address, the code and the song are yours):

```text
Vinyl for Mac is running and will start by itself when you log in.
Plug your BUSY Bar into this Mac by USB once, with Vinyl open on it. After that the cable is not needed.

  Running for 0 s.
  Spotify is playing: Lanterns - Paper Tide (album: Harbour Lights)
  BUSY Bar on the USB cable: no.
  ...
      Vinyl for Mac address:   192.168.1.20:8765
      Vinyl for Mac code:      123456
```

You can close the Terminal window now. (If it says `Nothing is playing.`, start a song on your Mac.)

### Step 5. Pair the bar, once

1. Open **Vinyl** on the bar. It shows **GET THE VINYL / APP FOR MAC**. (You can turn the pages with Start.)
2. Plug the bar into the Mac with its USB cable.
3. Within a few seconds the bar shows **MAC / CONNECTED**. The first time, a short guide follows: five pages, turn
   them with Start. Then the record player appears and shows your song.

### Step 6. Pull the cable

Unplug the USB cable. Nothing changes on the bar: from now on it asks your Mac over Wi-Fi. You do not need the
cable again.

### After that

- You do nothing. Vinyl for Mac starts with your Mac. **When your bar is not around it sleeps:** it looks at
  nothing and uses no measurable processor time; the bar wakes it the moment it asks.
- **To see how it is** (running? bar seen? address and code?), paste this into Terminal:

  ```sh
  python3 "$HOME/Library/Application Support/Vinyl for Mac/vinyl_helper.py" --status
  ```

- **To remove it completely** (it stops, and everything step 2 put on your Mac is deleted):

  ```sh
  python3 "$HOME/Library/Application Support/Vinyl for Mac/vinyl_helper.py" --uninstall
  ```

- The file `vinyl_helper.py` that step 2 saved in your home folder is no longer needed. You may delete it.

### If you would rather see it run

Instead of installing it, you can run Vinyl for Mac in a Terminal window. It then runs only while that window is
open, and prints what it does. In step 2 use this line instead:

```sh
curl -fsSL -o ~/vinyl_helper.py https://raw.githubusercontent.com/windAGH/busybar-apps/336cc69c658cc5a8cf2d27c7b97ada77b08bca46/vinyl/helper/vinyl_helper.py && python3 ~/vinyl_helper.py
```

To stop it, click the window, hold **Control** and press **C**. To start it again later: `python3 ~/vinyl_helper.py`.

### Never plugging in?

Skip step 5. Open Vinyl's settings (in the BUSY app: your bar, then its apps, then Vinyl) and type the two values
from step 4 into **Vinyl for Mac address** and **Vinyl for Mac code**.

---

## Way 2: Spotify, with a phone only

The bar will ask Spotify itself what your account is playing. For that, Spotify wants you to register a small "app"
of your own, free, once. You do all of it in your phone's browser and in the BUSY app.

What you get: the song, the record and the lyrics for whatever your Spotify account plays, on any device. Pause,
play and volume from the bar need **Spotify Premium**. An iPhone does not let its volume be set from outside.

Keep two things open on your phone: the browser, and the BUSY app.

### Part A. Make your Spotify app (browser)

1. Open **developer.spotify.com/dashboard**.
2. Tap **Log in** and log in with your normal Spotify account. Accept the developer terms if it asks.
3. Tap **Create app**.
4. **App name:** type `Vinyl`. **App description:** type `Vinyl on my BUSY Bar`.
5. **Redirect URIs:** type exactly this, then tap **Add**:

   ```text
   http://127.0.0.1:8888/callback
   ```

6. Under "Which API/SDKs are you planning to use?" tick **Web API**.
7. Tick the box that you agree with the terms, then tap **Save**. You see your app's page.
8. Tap **Settings**. You see a **Client ID** (a long row of letters and digits).
9. Tap **View client secret**. A second long row appears: the **Client secret**.

### Part B. Give the two values to Vinyl (BUSY app)

10. In the browser, press and hold on the Client ID and choose **Copy**.
11. Switch to the BUSY app. Open your bar, its apps, **Vinyl**, and Vinyl's settings.
12. Tap **Spotify client ID** and paste.
13. Go back to the browser, copy the **Client secret** the same way.
14. In the BUSY app, tap **Spotify client secret** and paste.

### Part C. Let your app see your account (browser)

15. Press and hold on the line below and choose **Copy**:

    ```text
    https://accounts.spotify.com/authorize?response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8888%2Fcallback&scope=user-read-currently-playing%20user-read-playback-state%20user-modify-playback-state&client_id=
    ```

16. Open a new tab in the browser. Tap the address bar and **paste**. Do not go yet.
17. The line ends with `client_id=`. Right behind it, with no space, paste your **Client ID** (copy it again from the
    Spotify page if you need to). Now tap **Go**.
18. Spotify asks whether Vinyl may see what you are playing. Tap **Agree**.
19. The browser now shows an **error page** ("cannot connect" or similar). **That is correct.** The address of that
    page starts with `http://127.0.0.1:8888/callback?code=`. What comes after `code=` is your one-time code.
20. Copy the whole address:
    - **iPhone (Safari):** tap the address bar once, so that the whole address is marked, then tap **Copy**.
    - **Android (Chrome):** tap the address bar, then the copy sign beside the address.

### Part D. Give the code to Vinyl (BUSY app)

21. In the BUSY app, in Vinyl's settings, tap **Spotify code** and paste. (The whole address is fine. Vinyl takes
    the code out of it.) Do this within a few minutes: the code does not stay good for long.
    The field holds 255 letters. If your address is longer, its end is cut off: then paste the address into a note
    first, and put what did not fit into the field below it, **Spotify code, the rest**.
22. Open **Vinyl** on the bar. It shows **SPOTIFY / LINKING**, then **SPOTIFY / LINKED**, then the guide (the first
    time) and your song. You do not need the code again: the bar keeps what it got for it.

### If the bar says something else

| The bar shows | What it means | What to do |
| --- | --- | --- |
| **GET A / NEW CODE** | The code was too old, or used before, or cut off (step 21), or the address in step 5 was typed differently. | Do steps 15 to 21 again. Check step 5 letter by letter. |
| **CHECK ID / AND SECRET** | Spotify does not know this Client ID with this secret. | Copy both again (steps 10 to 14). No spaces before or after. |
| **SPOTIFY / NO INTERNET** | The bar has no Wi-Fi at the moment. | Check the bar's Wi-Fi in the BUSY app. |
| **NOTHING / PLAYING** | It works. Spotify is not playing anything. | Play a song. |
| **NEEDS / PREMIUM** | Pause, play and volume from the bar need Spotify Premium. | Nothing. Showing the song works without it. |
| **THIS DEVICE / SETS ITS OWN** or **NO VOLUME / FROM HERE** | The device Spotify plays on does not let its volume be set from outside (an iPhone, for one). | Nothing. |
| **NO PLAYER / IS OPEN** | Spotify is not open on any of your devices. | Open Spotify and play a song. |

Spotify sets the rules for these apps and changes them from time to time. If its page looks different from the
steps above, look for the same words. If it does not let you create an app at all, way 2 is closed to you for now.

Already have a Spotify refresh token? Paste it into **Spotify refresh token** instead of steps 15 to 21. A value
there wins over the code.

---

## What the bar says (way 1)

While nothing is set up, the bar shows four notes that you turn with Start or the knob. Its back screen shows
**Scan to set up** and a code that opens this page.

| The bar shows | What it means |
| --- | --- |
| **GET THE VINYL / APP FOR MAC** | Way 1, steps 1 to 4. |
| **PAIR BY USB / JUST ONCE** | Way 1, step 5. |
| **NO MAC? / USE SPOTIFY** | Way 2. |
| **HOW TO SET UP / ON BACK SCREEN** | Turn the bar round and scan the code. |
| **MAC / CONNECTED** | Vinyl for Mac was found. |
| **NOTHING / PLAYING** | Connected. Nothing is playing on the Mac. |
| the record player at rest, nothing written | The bar has just started, or the cable was just pulled: it is looking for the Mac. Wait a few seconds. |
| **OFFLINE** (a label, and a small lamp at the record player) | The Mac has not answered for six seconds or more. The bar keeps asking. |
| **BACK ONLINE** | The Mac answers again. |
| **MAC / NOT FOUND** | No answer for 25 seconds. See the table below. |
| **NO WI-FI** | The bar itself has had no Wi-Fi for 20 seconds. |

## If it does not work (way 1)

| What you see | Check this |
| --- | --- |
| The bar keeps showing the four notes | Does `--status` (see "After that") say that Vinyl for Mac is running? Is the bar plugged into the Mac (step 5)? Is Vinyl open on the bar? |
| **MAC / NOT FOUND** or **OFFLINE** after you pulled the cable | Is the Mac awake (not asleep, lid open)? Are the Mac and the bar on the **same Wi-Fi**? Does `--status` say that Vinyl for Mac is running? (If you run it in a window: is the window still open?) |
| The same, and all of that is fine | Some networks keep devices apart: guest Wi-Fi, many office, hotel and shared-building networks. Then Wi-Fi cannot work. Keep the bar on the USB cable: that always works. A VPN on the Mac can also be in the way: switch it off to try. |
| It worked yesterday, not today | Your Mac may have got another address from the router. Plug the cable in once (it pairs again by itself). |
| A Terminal window says `I cannot open port 8765` | Vinyl for Mac is already running (installed, or in another window). One is enough. |
| The wrong thing is shown (a video instead of your music) | Pause the other player. Music wins over a video, and of two music players the one that started last. |
| No lyrics for a song | See "Lyrics" below. |
| Start on the bar does not pause the music | A few players do not listen to the Mac's play / pause key. Nothing to do. |
| You typed the address and code by hand and it does not connect | Check both. After eight wrong tries Vinyl for Mac ignores that bar for a minute. |

## Using it

- The app opens on its **main screen**: its name, a mark under Start and the word GUIDE at the knob. **Start**
  enters. Pressing the knob (**OK**) opens the guide to the controls. **Back** leaves. Left alone, it enters by itself
  after four seconds.
- **Start** (the big button on top): play / pause. The record and the arm stop at once; the lyrics stay where they
  are.
- **Turn the knob**: the volume. (If it feels the wrong way round, change **Volume knob** in the settings.)
- **OK** (press the knob): the next view. LYRICS, SONG INFO (title, artist, album, one at a time) or WAVES (a ribbon
  of light; an animation, the bar cannot hear the music). The view stays until you press OK again.
- **Back**: leave the app.
- Each album has its own record: the same album always gets the same one. A video on the Mac becomes a film
  projector.

## Lyrics

Lyrics come from [lrclib.net](https://lrclib.net), a free public service. There is no account and nothing to set up.
The bar needs Wi-Fi for them. lrclib.net is filled in by its users: it has timed lyrics for many songs, well-known
ones above all, but not for every song. For a song it does not have (or has only without timing), the view LYRICS
says NO LYRICS FOUND for a moment and then shows the song's title, artist and album in turn; the next song with
lyrics shows them again. LYRICS OFFLINE means lrclib.net could not be reached: the bar asks again later.
A name too long for two rows scrolls up, a row at a time.

The bar's small letters are Latin capitals only. It cannot show Chinese, Japanese or Korean characters, nor
Cyrillic, Greek or Arabic. A song with such lyrics says CAN'T SHOW THIS SCRIPT and shows its names instead; a title
in such letters is replaced by the artist or the album if those are in Latin letters.

The lyrics of the last twenty songs are kept on the bar, so a song you play again has them at once.

## Settings

- **Spotify client ID, Spotify client secret, Spotify code** (and **Spotify code, the rest**): way 2.
- **Spotify refresh token**: only if you already have one.
- **Vinyl for Mac address, Vinyl for Mac code**: only if you never plug the bar into the Mac.
- **Lyrics**: on. Off: title and artist only.
- **Words timing**: Normal. Earlier or Later moves the lyrics by 0.15 seconds if they feel late or early.
- **Volume knob**: Normal. Reversed: the knob turns the volume the other way round.
- **Karaoke colour**: off. On: the line being sung fills with the record's colour.
- **Start over**: flip this switch, either way, to clear everything the app has kept (the stored lyrics, the chosen
  view, what it got from Spotify for your code) and see the guide again. The pairing with the Mac stays.

## What Vinyl for Mac does, exactly

- It reads macOS's own **Now Playing**: what the menu bar and the lock screen show. Apple offers no documented way
  to read it, so it uses a system part that Apple does not document. It works on macOS 27; a later macOS may close
  that door. Then start it with `--ask-apps` at the end of the line: it asks Spotify, Apple Music and the browsers
  directly instead (the Mac will ask you once to allow that).
- It runs a very small server on your Mac (port 8765) that does two things and nothing else, and only for whoever
  has the six-digit code: it says **what is playing**, and it takes **play / pause and the volume** from the bar's
  Start button and knob. The bar's question waits there for up to three seconds, so that a pause or a new song
  reaches the bar the moment it happens. Anything else is refused, and an address that sends eight wrong codes is
  ignored for a minute. The code is made the first time and kept in the file `vinyl_helper.code` beside
  `vinyl_helper.py` (delete that file for a new code, then pair again).
- While the cable is in, it also writes what is playing straight into the app's storage on the bar, and leaves its
  address and code there: that is the pairing.
- It talks to your bar and to nothing else. It never starts an application.

While the bar is not around - no bar on the cable and no question from the app for a minute - it sleeps: it does
not look at the players and writes nothing. It only keeps listening, and tries the cable's address every ten seconds.

Options, written at the end of the line that starts it (with `--install` they stay with the installed program): `--port 8765` (another port; 0 = cable only), `--no-act`
(the bar's Start and knob only say what they would do), `--prefer latest` (with two things playing, show what macOS
calls current), `--ask-apps` (see above), `--bar ADDRESS --password PASSWORD` (for a bar whose own "HTTP API over
Wi-Fi" you have switched on), `--app-id ID` (for a build of the app with another id).

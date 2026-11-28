#!/usr/bin/env python3
"""Vinyl for Mac - tells the Vinyl app on a BUSY Bar what this Mac is playing.

FOR macOS ONLY. It needs nothing but the Python 3 that comes with macOS's developer tools (no packages).

Once a second - twice while music plays - it looks at what is playing; when something has changed (another song, a
pause, a leap within the song) it writes a few words about it (title, artist, album, how far the song is) into the Vinyl app's storage on the bar,
over the bar's own HTTP API - and otherwise only a sign of life every 5 seconds, to spare the bar's flash storage.
Nothing leaves your desk: the only address it talks to is your BUSY Bar.

Where it looks: macOS's own "Now Playing" (what the menu bar and the lock screen show). That covers every player that
reports there - Spotify, Apple Music, QQ Music, NetEase Cloud Music, a video in a browser, QuickTime ... - and needs no
permission. Only if that gives nothing (an older macOS) it asks Spotify, Music and the browsers directly, as before.
(Apple gives no documented way to read Now Playing: the helper asks a system framework that Apple does not document.
It works on current macOS; a later macOS may close that door, and then the --ask-apps way remains.)

Two things playing at once: music wins over a video (a clip you scroll past does not take the record off); of two
music players the one that started last. With --prefer latest it is always whatever macOS itself calls current.

    python3 vinyl_helper.py --install            put me into your Library and start me now and at every login (no window)
    python3 vinyl_helper.py --status             am I running? is a bar paired and seen? my address and code
    python3 vinyl_helper.py --uninstall          stop me and remove everything --install has put there
    python3 vinyl_helper.py                      run in this window: the bar on USB (10.0.4.20), the app from the catalog
    python3 vinyl_helper.py --bar 192.168.1.42   the bar over Wi-Fi (switch on "HTTP API over Wi-Fi" on the bar first)
    python3 vinyl_helper.py --password SECRET    if the bar's HTTP API is protected by a password
    python3 vinyl_helper.py --app-id ID          another build of the app (default io.github.windagh.vinyl)
    python3 vinyl_helper.py --once               look once, say what was found, send it, stop
    python3 vinyl_helper.py --dry                send nothing: print what would be sent
    python3 vinyl_helper.py --fake               do not look at any application: run through made-up states (a test)
    python3 vinyl_helper.py --prefer latest      two things at once: show what macOS calls current (default: music first)
    python3 vinyl_helper.py --ask-apps           skip macOS's Now Playing and ask Spotify, Music and the browsers directly
    python3 vinyl_helper.py --no-act             when the bar asks for pause, play or a volume: only say so, do nothing
    python3 vinyl_helper.py --port 8765          the port of the small server for the app over Wi-Fi (0: no server)

WITHOUT A CABLE. The bar is normally not plugged into the Mac, so this program also answers the app over Wi-Fi: it
runs a very small web server on this Mac (port 8765) that knows two things and nothing else -
    GET  /now?c=CODE    what is playing (the same few words as above, with the position at this very moment);
                        with &v=N&w=MS it WAITS: the answer comes the moment something changes (another song, a pause,
                        a leap, the volume) - N is the "v" of the answer the app has - or after MS at the latest
    POST /cmd?c=CODE    {"do": "toggle"} or {"do": "vol", "v": 0-100}: play / pause, or this Mac's volume - carried out
                        at once, whatever else this program is doing
- and only for whoever has the CODE, a six-digit number made at the first start and kept in the file
vinyl_helper.code beside this one. Anything else gets "403" and no word more, and an address that comes with eight
wrong codes is not answered at all for a minute. The app learns the address and the code
by itself the moment the bar is plugged into this Mac by USB once (this program writes them into the app's storage:
helper.json); or you type the two values, which are printed at every start, into the app's settings on the bar. After
that the cable is not needed. macOS may ask once whether Python may accept incoming connections: allow it.

The other way round: the bar's Start button pauses and plays whatever macOS's Now Playing holds, and turning its knob
sets this Mac's volume. The wish comes over Wi-Fi, or - on the cable - the app writes it into its own storage, where
this program looks four times a second; either way it is carried out at once.

WHEN NO BAR IS AROUND IT SLEEPS. With no bar on the cable and no question from the app for a minute it does nothing
but wait: it does not look at the players, reads no volume and writes nothing - it only tries the cable's address
every ten seconds and keeps its small server listening. The first question from the app, or the cable, wakes it at
once (that first question is answered after a fresh look). On the cable it also goes to sleep when the app, which
had been asking over Wi-Fi, has stopped asking for a minute: the app on the bar was closed.

It never opens an application. Stop it with Ctrl-C; the app notices within 15 seconds. (Only with --ask-apps, or on a
macOS where Now Playing cannot be read, macOS shows a question the first time - "... wants to control Spotify": Allow.)
"""
import argparse, ctypes, hmac, http.server, json, os, plistlib, queue, random, shutil, socket, struct, subprocess, sys, threading, time, unicodedata
import urllib.error, urllib.parse, urllib.request

SEP = "\x1f"                                          # between the fields of an application's answer
MUSIC_APPS = ("Spotify", "Music")
BROWSERS = ("Safari", "Google Chrome", "Arc")
# a tab on one of these, on a page that plays something, counts as a video: (host ends with, the path must hold, name)
VIDEO_SITES = [("youtube.com", ("/watch", "/shorts/", "/live"), "YouTube"), ("youtu.be", ("/",), "YouTube"),
               ("netflix.com", ("/watch",), "Netflix"), ("bilibili.com", ("/video/", "/bangumi/"), "Bilibili"),
               ("twitch.tv", ("/",), "Twitch"), ("vimeo.com", ("/",), "Vimeo"), ("disneyplus.com", ("/play", "/video"), "Disney+"),
               ("primevideo.com", ("/detail", "/watch"), "Prime Video"), ("hulu.com", ("/watch",), "Hulu"), ("max.com", ("/video",), "Max"),
               ("tv.apple.com", ("/",), "Apple TV"), ("iqiyi.com", ("/",), "iQIYI"), ("v.qq.com", ("/",), "Tencent Video"),
               ("youku.com", ("/",), "Youku"), ("dailymotion.com", ("/video",), "Dailymotion"), ("crunchyroll.com", ("/watch",), "Crunchyroll")]
TITLE_TAILS = (" - YouTube", " | Netflix", " - Twitch", " on Vimeo", " | Disney+", "_哔哩哔哩_bilibili", " - Dailymotion", " | Prime Video")

SCRIPT_MUSIC = '''
tell application "%s"
    set s to (player state as string)
    if s is "stopped" then return "stopped"
    set t to current track
    set d to character id 31
    return s & d & (name of t) & d & (artist of t) & d & (album of t) & d & ((duration of t) as string) & d & ((player position) as string)
end tell'''
SCRIPT_TAB = {
    "Safari": 'tell application "Safari"\nif (count of windows) is 0 then return ""\n'
              'return (URL of current tab of front window) & (character id 31) & (name of current tab of front window)\nend tell',
    "Google Chrome": 'tell application "Google Chrome"\nif (count of windows) is 0 then return ""\n'
                     'return (URL of active tab of front window) & (character id 31) & (title of active tab of front window)\nend tell',
    "Arc": 'tell application "Arc"\nif (count of windows) is 0 then return ""\n'
           'return (URL of active tab of front window) & (character id 31) & (title of active tab of front window)\nend tell'}
told = set()                                          # what has been said once and need not be said every second


def say(text, once=None):
    if once is not None:
        if once in told:
            return
        told.add(once)
    print(clock_ms(time.time()) + " " + text, flush=True)


def clock_ms(t):
    """12:34:56.789 - the log's clock, to the millisecond (how late a pause is seen is a matter of tenths)."""
    return time.strftime("%H:%M:%S", time.localtime(t)) + ".%03d" % (int(t * 1000) % 1000)


def running():
    """The names of the applications that are running now (asked of the system's process list, not of the applications)."""
    try:
        out = subprocess.run(["/bin/ps", "-axo", "comm="], capture_output=True, text=True, timeout=3).stdout
    except Exception:
        return set()
    names = set()
    for line in out.splitlines():
        if ".app/Contents/MacOS/" in line:
            names.add(line.rsplit("/", 1)[-1].strip())
    return names


def ask(app, script):
    """An application's answer to an AppleScript, or None. Never raises."""
    try:
        got = subprocess.run(["/usr/bin/osascript", "-e", script], capture_output=True, text=True, timeout=3)
    except Exception:
        return None
    if got.returncode != 0:
        if "-1743" in got.stderr or "not allowed" in got.stderr.lower() or "not authorized" in got.stderr.lower():
            say("macOS has not allowed this program to ask %s. Allow it in System Settings > Privacy & Security > "
                "Automation (under the program you started me from), then I can see what it plays." % app, once="deny " + app)
        return None
    return got.stdout.rstrip("\n")


def number(text):
    try:
        return float(text.replace(",", "."))
    except ValueError:
        return 0.0


def music(app):
    got = ask(app, SCRIPT_MUSIC % app)
    if not got or got == "stopped":
        return None
    part = got.split(SEP)
    if len(part) < 6:
        return None
    dur = number(part[4])
    if app == "Spotify":                              # Spotify counts a track's length in thousandths of a second
        dur /= 1000.0
    return {"kind": "music", "app": app, "state": "playing" if part[0] == "playing" else "paused", "title": part[1], "artist": part[2],
            "album": part[3], "pos": round(number(part[5]), 2), "dur": round(dur, 2), "_at": time.time()}


def video(app):
    got = ask(app, SCRIPT_TAB[app])
    if not got or SEP not in got:
        return None
    url, title = got.split(SEP, 1)
    try:
        where = urllib.parse.urlparse(url)
    except ValueError:
        return None
    host, path = (where.hostname or "").lower(), where.path or "/"
    for end, marks, name in VIDEO_SITES:
        if (host == end or host.endswith("." + end)) and any(m in path for m in marks) and (path != "/" or end in ("youtu.be",)):
            for tail in TITLE_TAILS:
                if title.endswith(tail):
                    title = title[:-len(tail)]
            if title.startswith("(") and ") " in title[:8]:      # "(3) Title": the count of notifications
                title = title.split(") ", 1)[1]
            return {"kind": "video", "app": "Chrome" if app == "Google Chrome" else app, "state": "playing", "title": title.strip(),
                    "site": name}
    return None


# ---------- macOS's own Now Playing ----------
# One question to the system instead of one to every player. (MediaRemote is the framework behind the menu bar's Now
# Playing; it answers Apple's own programs, so the question is put through /usr/bin/osascript.)
SCRIPT_NOW = r"""
ObjC.import("Foundation");
function run() {
  $.NSBundle.bundleWithPath("/System/Library/PrivateFrameworks/MediaRemote.framework/").load;
  const R = $.NSClassFromString("MRNowPlayingRequest"), out = {};
  const text = (v) => { try { const u = ObjC.unwrap(v); return u === undefined || u === null ? "" : String(u); } catch (e) { return ""; } };
  try {
    const c = R.localNowPlayingPlayerPath.client;
    out.app = text(c.bundleIdentifier); out.parent = text(c.parentApplicationBundleIdentifier); out.name = text(c.displayName);
  } catch (e) {}
  try { out.playing = !!R.localIsPlaying; } catch (e) {}
  try {
    const info = R.localNowPlayingItem.nowPlayingInfo, P = "kMRMediaRemoteNowPlayingInfo";
    const get = (k) => { const v = info.objectForKey(P + k); return v && !(v.isNil && v.isNil()) ? v : null; };
    for (const k of ["Title", "Artist", "Album", "MediaType"]) { const v = get(k); out[k] = v ? text(v) : ""; }
    for (const k of ["Duration", "ElapsedTime", "PlaybackRate"]) { const v = get(k); out[k] = v ? Number(text(v.description)) : null; }
    const at = get("Timestamp"); out.at = at ? at.timeIntervalSince1970 : null;
    out.item = true;
  } catch (e) { out.item = false; }
  return JSON.stringify(out);
}"""
NAMES = {"com.spotify.client": "Spotify", "com.apple.Music": "Music", "com.tencent.QQMusicMac": "QQ Music",
         "com.netease.163music": "NetEase Music", "com.kugou.mac.Music": "Kugou", "com.apple.Safari": "Safari",
         "com.google.Chrome": "Chrome", "company.thebrowser.Browser": "Arc", "org.mozilla.firefox": "Firefox",
         "com.microsoft.edgemac": "Edge", "com.brave.Browser": "Brave", "com.apple.QuickTimePlayerX": "QuickTime",
         "com.colliderli.iina": "IINA", "org.videolan.vlc": "VLC", "com.apple.TV": "TV", "com.apple.podcasts": "Podcasts"}
BROWSER_IDS = ("com.apple.Safari", "com.apple.WebKit", "com.google.Chrome", "company.thebrowser.Browser", "org.mozilla.firefox",
               "com.microsoft.edgemac", "com.brave.Browser", "com.operasoftware.Opera", "com.vivaldi.Vivaldi", "org.chromium.Chromium")
VIDEO_IDS = ("com.apple.QuickTimePlayerX", "com.colliderli.iina", "org.videolan.vlc", "com.apple.TV", "io.mpv")
system_works = None                                   # None: not tried yet


def base_id(bundle):
    """com.google.Chrome.helper -> com.google.Chrome: a browser's helpers play its sound."""
    for tail in (".helper", ".Helper", ".helper.renderer", ".GPU", ".WebContent"):
        if bundle.endswith(tail):
            return bundle[:-len(tail)]
    return bundle


def system_now():
    """What macOS's Now Playing holds, as one of our records with "bundle" added - or {"kind": "none"}; None if it cannot be asked."""
    global system_works
    try:
        got = subprocess.run(["/usr/bin/osascript", "-l", "JavaScript", "-e", SCRIPT_NOW], capture_output=True, text=True, timeout=4)
        info = json.loads(got.stdout)
    except Exception:
        info = None
    if not isinstance(info, dict) or "playing" not in info:
        if system_works is None:
            say("This macOS does not let me read its Now Playing; I ask Spotify, Music and the browsers directly instead.", once="nosys")
            system_works = False
        return None
    system_works = True
    if not info.get("item") or not info.get("app"):
        return {"kind": "none"}
    bundle = info["app"]
    own = info.get("parent") or base_id(bundle)       # a browser's helper belongs to the browser
    if own.startswith("com.apple.WebKit"):
        own = "com.apple.Safari"
    name = NAMES.get(own) or NAMES.get(base_id(own)) or info.get("name") or own.rsplit(".", 1)[-1]
    title, artist, album = info.get("Title") or "", info.get("Artist") or "", info.get("Album") or ""
    kind_word = (info.get("MediaType") or "").lower()
    in_browser = own.startswith(BROWSER_IDS) or bundle.startswith(BROWSER_IDS)
    if "video" in kind_word or own.startswith(VIDEO_IDS):
        kind = "video"
    elif "audio" in kind_word or "music" in kind_word:
        kind = "music"
    else:                                             # a page says nothing about itself: a song has an album, a clip has not
        kind = "music" if (not in_browser or album) else "video"
    rate = info.get("PlaybackRate")
    playing = bool(info.get("playing")) and (rate is None or rate > 0)
    pos, dur = info.get("ElapsedTime") or 0.0, info.get("Duration") or 0.0
    at = time.time()                                  # the moment for which the position below is true
    if playing and info.get("at"):                    # the elapsed time was true at "at": it has gone on since
        pos += max(0.0, at - info["at"]) * (rate or 1.0)
    if dur > 0:
        pos = min(pos, dur)
    if kind == "music":
        if not title:
            return {"kind": "none"}
        return {"kind": "music", "app": name, "bundle": own, "state": "playing" if playing else "paused", "title": title,
                "artist": artist, "album": album, "pos": round(pos, 3), "dur": round(dur, 2), "_at": at,
                "_said": (info.get("ElapsedTime"), info.get("at"), rate)}      # (the player's own words: see believe)
    return {"kind": "video", "app": name, "bundle": own, "state": "playing" if playing else "paused",
            "title": title or name, "site": name}


# ---------- who is sending sound to the speakers ----------
# CoreAudio keeps a list of the processes that use audio and says of each whether it is putting sound out right now
# (macOS 14.2 and later). That is how two things playing at once are told apart from one playing and one paused.
_audio = None


def _fourcc(text):
    return struct.unpack(">I", text.encode("ascii"))[0]


class _Address(ctypes.Structure):
    _fields_ = [("selector", ctypes.c_uint32), ("scope", ctypes.c_uint32), ("element", ctypes.c_uint32)]


def sounding():
    """The bundle ids (helpers folded into their application) of everything that puts sound out now; None if unknown."""
    global _audio
    try:
        if _audio is None:
            ca = ctypes.CDLL("/System/Library/Frameworks/CoreAudio.framework/CoreAudio")
            cf = ctypes.CDLL("/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation")
            ca.AudioObjectGetPropertyDataSize.argtypes = [ctypes.c_uint32, ctypes.POINTER(_Address), ctypes.c_uint32, ctypes.c_void_p,
                                                          ctypes.POINTER(ctypes.c_uint32)]
            ca.AudioObjectGetPropertyData.argtypes = [ctypes.c_uint32, ctypes.POINTER(_Address), ctypes.c_uint32, ctypes.c_void_p,
                                                      ctypes.POINTER(ctypes.c_uint32), ctypes.c_void_p]
            cf.CFStringGetCString.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_long, ctypes.c_uint32]
            cf.CFRelease.argtypes = [ctypes.c_void_p]
            _audio = (ca, cf)
        ca, cf = _audio
        glob = _fourcc("glob")
        where, size = _Address(_fourcc("prs#"), glob, 0), ctypes.c_uint32(0)
        if ca.AudioObjectGetPropertyDataSize(1, ctypes.byref(where), 0, None, ctypes.byref(size)):
            return None
        objects = (ctypes.c_uint32 * (size.value // 4))()
        if ca.AudioObjectGetPropertyData(1, ctypes.byref(where), 0, None, ctypes.byref(size), objects):
            return None
        out = set()
        for obj in objects:
            flag, four = ctypes.c_uint32(0), ctypes.c_uint32(4)
            where = _Address(_fourcc("piro"), glob, 0)
            if ca.AudioObjectGetPropertyData(obj, ctypes.byref(where), 0, None, ctypes.byref(four), ctypes.byref(flag)) or not flag.value:
                continue
            ref, eight = ctypes.c_void_p(0), ctypes.c_uint32(8)
            where = _Address(_fourcc("pbid"), glob, 0)
            if ca.AudioObjectGetPropertyData(obj, ctypes.byref(where), 0, None, ctypes.byref(eight), ctypes.byref(ref)) or not ref.value:
                continue
            buf = ctypes.create_string_buffer(512)
            if cf.CFStringGetCString(ref.value, buf, 512, 0x08000100):
                bundle = base_id(buf.value.decode("utf-8", "replace"))
                out.add("com.apple.Safari" if bundle.startswith("com.apple.WebKit") else bundle)
            cf.CFRelease(ref.value)
        return out
    except Exception:
        return None


# ---------- what the bar may ask this Mac to do ----------
# Play / pause goes to whatever macOS's Now Playing holds (the same request object that answers the reading; the older
# MRMediaRemoteSendCommand is accepted and ignored on macOS 27). The volume is the Mac's own output volume, 0-100.
# All three were tried by hand on macOS 27.0.1 with Spotify playing (pause, play, volume read).
SCRIPT_COMMAND = r"""
ObjC.import("Foundation");
function run(argv) {
  $.NSBundle.bundleWithPath("/System/Library/PrivateFrameworks/MediaRemote.framework/").load;
  const req = $.NSClassFromString("MRNowPlayingRequest").alloc.initWithOrigin($.NSClassFromString("MROrigin").localOrigin);
  req.sendCommandOptionsQueueCompletion(Number(argv[0]), $(), $(), $());
  $.NSRunLoop.currentRunLoop.runUntilDate($.NSDate.dateWithTimeIntervalSinceNow(0.4));
  return "sent";
}"""
PLAYER_COMMANDS = {"play": 0, "pause": 1, "toggle": 2, "next": 4, "previous": 5}


def player_command(word):
    """play / pause / toggle / next / previous for the player macOS calls current. True if it could be sent."""
    if word not in PLAYER_COMMANDS:
        return False
    try:
        got = subprocess.run(["/usr/bin/osascript", "-l", "JavaScript", "-e", SCRIPT_COMMAND, str(PLAYER_COMMANDS[word])],
                             capture_output=True, text=True, timeout=4)
        return got.returncode == 0 and "sent" in got.stdout
    except Exception:
        return False


def get_volume():
    """The Mac's output volume, 0-100, or None (some outputs, a display over HDMI for one, have no volume to read)."""
    try:
        got = subprocess.run(["/usr/bin/osascript", "-e", "output volume of (get volume settings)"], capture_output=True, text=True, timeout=3)
        return max(0, min(100, int(got.stdout.strip())))
    except Exception:
        return None


def set_volume(level):
    try:
        level = max(0, min(100, int(round(level))))
        return subprocess.run(["/usr/bin/osascript", "-e", "set volume output volume %d" % level], capture_output=True, timeout=3).returncode == 0
    except Exception:
        return False


memory = {"music": None, "at": 0.0}                   # the last song macOS showed, and when: it may go on behind a video
prefer_music = True


def carried_on(now):
    """The remembered song, moved on to now - if its player is still putting sound out and the song cannot be over yet."""
    song = memory["music"]
    if not song or song["state"] != "playing":
        return None
    loud = sounding()
    if loud is None or song["bundle"] not in loud:
        return None
    pos = song["pos"] + (now - memory["at"])
    if song["dur"] > 0 and pos > song["dur"] + 1.0:   # the next song has begun and I cannot know its name from here ...
        fresh = music(song["app"]) if song["app"] in MUSIC_APPS else None     # ... unless the player can be asked itself
        if fresh and fresh["state"] == "playing":
            fresh["bundle"] = song["bundle"]
            memory["music"], memory["at"] = fresh, fresh.get("_at", now)
            return dict(fresh)
        return None
    return dict(song, pos=round(pos, 3), _at=now, _said=None)


def look_system():
    """What to show, from macOS's Now Playing; None if that cannot be asked."""
    now = time.time()
    cur = system_now()
    if cur is None:
        return None
    if cur["kind"] == "music":
        memory["music"], memory["at"] = dict(cur), cur.get("_at", now)
        return cur                                    # the song macOS calls current, playing or paused
    # macOS's current thing is a video, or nothing. Is a song still going on behind it?
    behind = carried_on(now) if (prefer_music or cur["kind"] == "none" or cur.get("state") != "playing") else None
    if behind and behind["bundle"] != cur.get("bundle"):
        return behind
    if cur["kind"] == "video" and cur["state"] == "playing":
        return cur
    return {"kind": "none"}


def look_apps():
    """What is playing: a music application that plays - else a video in a browser's front tab - else a music application
    that is paused - else nothing."""
    apps = running()
    paused = None
    for app in MUSIC_APPS:
        if app in apps:
            found = music(app)
            if found and found["state"] == "playing":
                return found
            paused = paused or found
    for app in BROWSERS:
        if app in apps:
            found = video(app)
            if found:
                return found
    return paused or {"kind": "none"}


def look():
    found = None if system_works is False else look_system()
    return found if found is not None else look_apps()


# --fake: no application is looked at. Two songs that do not exist play in turn, and what the bar asks for (pause,
# volume) is done to them and to nothing else: a test of both ends of the wire without touching the Mac.
FAKE_SONGS = [("Lanterns", "Paper Tide", "Harbour Lights", 214.0), ("Tin Roof", "Mara Vale", "Kitchen Radio", 187.0)]
fake_world = {"n": 0, "state": "playing", "pos": 0.0, "at": None, "vol": 40, "zero": False, "since": 0.0}


def fake(now):
    """What the made-up player is doing now, as one of our records."""
    w = fake_world
    if w["at"] is None:
        w["at"] = now
    if w["state"] == "playing":
        w["pos"] += now - w["at"]
    w["at"] = now
    if w["pos"] >= FAKE_SONGS[w["n"]][3]:             # the song is over: the other one begins
        w["n"], w["pos"] = (w["n"] + 1) % len(FAKE_SONGS), 0.0
    title, artist, album, dur = FAKE_SONGS[w["n"]]
    after = FAKE_SONGS[(w["n"] + 1) % len(FAKE_SONGS)]
    out = {"kind": "music", "app": "Spotify", "state": w["state"], "title": title, "artist": artist, "album": album,
           "pos": round(w["pos"], 3), "dur": dur, "_at": now, "next": [{"title": after[0], "artist": after[1], "album": after[2], "dur": after[3]}]}
    if w["zero"] and w["state"] == "paused":          # (--fake-zero: paused = "at 0.0", with the stamp of the pause)
        out["pos"], out["_said"] = 0.0, (0.0, w["since"], 0.0)
    return out


def fake_act(what, level=None):
    w = fake_world
    if what == "vol":
        w["vol"] = level
    elif what in ("toggle", "play", "pause"):
        w["state"] = {"toggle": "paused" if w["state"] == "playing" else "playing", "play": "playing", "pause": "paused"}[what]
        w["since"] = time.time()


def words(found):
    if found["kind"] == "music":
        return "%s %s: %s - %s%s" % (found["app"], "is playing" if found["state"] == "playing" else "is paused on", found["title"],
                                     found["artist"], " (album: %s)" % found["album"] if found.get("album") else "")
    if found["kind"] == "video":
        return "%s shows a video: %s" % (found["app"], found["title"])
    return "Nothing is playing."


def clean(found):
    """Names as the bar can take them: composed letters, no control characters, not endless."""
    for key in ("title", "artist", "album", "site", "app"):
        if key in found:
            text = unicodedata.normalize("NFKC", str(found[key]))
            found[key] = "".join(ch for ch in text if ch >= " ")[:160]
    return found


class Bar:
    def __init__(self, address, app_id, password):
        self.base = "http://%s/api/storage/" % address
        self.folder = "/ext/apps_data/js_apps/%s" % app_id
        self.address, self.app_id, self.password = address, app_id, password
        self.ok = None
        self.took = []                                # what my last writes of now.json took, in thousandths of a second
        self.wifi = False                             # the small server runs: the app can also ask me without the cable
        self.patience = 2.5                           # seconds a request to the bar may take (short while it is only being looked for)

    def call(self, what, body=None):
        req = urllib.request.Request(self.base + what, data=body, method="POST")
        req.add_header("Content-Type", "application/octet-stream")
        if self.password:
            req.add_header("X-API-Token", self.password)
        with urllib.request.urlopen(req, timeout=self.patience) as res:
            res.read()

    def read(self, name):
        """A file of the app's storage as text, or None (not there, or the bar not reachable)."""
        req = urllib.request.Request(self.base + "read?path=" + urllib.parse.quote(self.folder + "/" + name, safe="/"))
        if self.password:
            req.add_header("X-API-Token", self.password)
        try:
            with urllib.request.urlopen(req, timeout=self.patience) as res:
                return res.read().decode("utf-8", "replace")
        except Exception:
            return None

    def write(self, name, data):
        """Writes a small file into the app's storage; True if the bar took it. Says nothing."""
        try:
            self.call("write?path=" + urllib.parse.quote(self.folder + "/" + name, safe="/"), data)
            return True
        except Exception:
            return False

    def send(self, text):
        path = urllib.parse.quote(self.folder + "/now.json", safe="/")
        try:
            began = time.time()
            try:
                self.call("write?path=" + path, text)
                self.took = (self.took + [int(round((time.time() - began) * 1000))])[-5:]
            except urllib.error.HTTPError as err:
                if err.code in (401, 403):
                    raise
                self.call("mkdir?path=" + urllib.parse.quote(self.folder, safe="/"))   # the app has not made its folder yet
                self.call("write?path=" + path, text)
            if self.ok is not True:
                say("The BUSY Bar at %s takes it. Open the Vinyl app on the bar." % self.address)
            self.ok = True
        except urllib.error.HTTPError as err:
            if self.ok is not False:
                if err.code in (401, 403):
                    say("The bar at %s refuses me (%d): its HTTP API wants a password - start me with --password ..." % (self.address, err.code))
                else:
                    say("The bar at %s answers %d. Is the Vinyl app installed (app id %s)? See --app-id." % (self.address, err.code, self.app_id))
            self.ok = False
        except Exception as err:
            if self.ok is not False:
                if self.wifi:
                    say("No BUSY Bar on the cable (at %s). That is fine once the app has been paired: it asks me over Wi-Fi. "
                        "I keep looking for the cable too." % self.address)
                else:
                    say("I cannot reach a BUSY Bar at %s (%s). Is it plugged in by USB, or is the address right (--bar)? "
                        "I keep trying." % (self.address, err.__class__.__name__))
            self.ok = False


HEARTBEAT, LEAP = 5.0, 2.0                           # seconds: a sign of life this often; a position off by more is a leap


def due(found, sent, sent_at, now):
    """Is there something to write? The bar keeps the file in its flash, so not every second: only when what is
    playing has changed (kind, player, state, names, length), when the position is not where the app will have carried
    it on to by itself (a leap within the song), and every HEARTBEAT seconds so that the app knows I am there."""
    if sent is None or now - sent_at >= HEARTBEAT:
        return True
    for key in ("kind", "app", "state", "title", "artist", "album", "site", "dur", "vol", "can", "next"):
        if found.get(key) != sent.get(key):
            return True
    if found.get("kind") == "music":
        ahead = now - sent_at if sent.get("state") == "playing" else 0.0
        return abs(found.get("pos", 0.0) - (sent.get("pos", 0.0) + ahead)) > LEAP
    return False


# ---------- without a cable: the app asks this Mac over Wi-Fi ----------
class Shared:
    """What the threads have in common: the look (the main loop), the small server, the cable, the doing of commands."""
    lock = threading.Lock()
    changed = threading.Condition(lock)               # told whenever `version` grows: the requests that wait are answered
    found, looked = None, 0.0                         # what is playing, and the moment its position was true for
    version = 0                                       # grows when what is playing changes (not when the song merely goes on)
    wake = threading.Event()                          # the main loop is to look at once
    acted = False                                     # a command has just been carried out (the look that follows is written at once)
    todo = queue.Queue()                              # commands waiting to be carried out (never for long)
    seen = None                                       # the number of the last command taken
    did = None                                        # ... and of the last play / pause that was carried out ("cn" in every word)
    done = []                                         # ... and of the last sixty: none of them is carried out twice
    asleep = False                                    # nothing to do (see the head: WHEN NO BAR IS AROUND IT SLEEPS)
    looks = 0                                         # how often the players have been looked at (a question that woke me waits for the next one)
    cable = False                                     # the bar answers on the cable
    cable_heard = False                               # ... and since it does, the app has asked over Wi-Fi as well
    began = time.time()
    paired = ""                                       # the address the app was last told over the cable
    told = None                                       # what a command has just made of the player, until the look agrees
    vol_told = None                                   # the volume a command has just set: (level, until)
    code = ""
    wrong = {}                                        # who has come with a wrong code: address -> [how often, when last]
    heard = 0.0                                       # when the app last asked over Wi-Fi (with the right code)


WRONG_MAX, WRONG_REST = 8, 60.0                       # eight wrong codes from one address: it is not heard for a minute


def shut_out(who, now):
    """Is this address not heard just now? (A code of six digits must not be found by trying them all.)"""
    with Shared.lock:
        seen = Shared.wrong.get(who)
        if seen and now - seen[1] > WRONG_REST:
            del Shared.wrong[who]
            seen = None
        return bool(seen) and seen[0] >= WRONG_MAX


def wrong_code(who, now):
    with Shared.lock:
        if len(Shared.wrong) > 500:                   # (never an endless list)
            Shared.wrong.clear()
        seen = Shared.wrong.setdefault(who, [0, now])
        seen[0], seen[1] = seen[0] + 1, now
        first = seen[0] == WRONG_MAX
    if first:
        say("Someone at %s has tried %d wrong codes: I do not answer that address for a minute." % (who, WRONG_MAX))


# ---------- IS THE PLACE THE PLAYER GIVES PLAUSIBLE? ----------
# Players lose their place for a moment around a pause, a new start, another song: macOS's Now Playing then holds an
# elapsed time of 0, or none at all, for a song that is minutes in (Spotify, 27 Nov 2026: "paused at 0.0" at every
# pause) - and the bar's line of the song's time jumped to its head and back. So, while the song stays the same:
#   - a place within 2 s of where the last believed one, carried on by the clock, puts the song: believed.
#   - anything else - further away, or no elapsed time at all - is NOT passed on: the bar gets the carried-on place.
#     Two looks in a row that say the same far place are a real leap (the listener has moved in the song): passed on,
#     marked "ps": 2 so that the app takes it without asking twice itself.
#   - "paused at the head" of a song that was well in is the usual false one, and it lasts as long as the pause: it
#     is believed only if the player has said it AFTER the pause was seen (its own stamp is newer) and twice.
# Every place refused is written down, to the millisecond, with what the player said: the log tells how often it
# happens and with which player.
LEAP_S = 2.0
trust = {"key": None, "pos": 0.0, "at": 0.0, "state": None, "cand": None, "paused_at": 0.0}


def believe(found, at):
    """Makes found["pos"] a place that can be believed (see above). `at`: the moment the look's place is true for."""
    said = found.pop("_said", None)                   # (elapsed, the player's own stamp, rate) - None: not from Now Playing
    if found.get("kind") != "music":
        trust["key"] = None
        return
    key = (found.get("app"), found.get("title"), found.get("artist"), found.get("dur"))
    pos, state = found.get("pos", 0.0), found.get("state")
    if trust["key"] != key:                           # another song, or the first look: as the player says
        trust.update(key=key, pos=pos, at=at, state=state, cand=None, paused_at=at if state != "playing" else 0.0)
        return
    if state != "playing" and trust["state"] == "playing":
        trust["paused_at"] = at
    was = trust["pos"] + (at - trust["at"] if trust["state"] == "playing" else 0.0)
    if found.get("dur"):
        was = min(was, found["dur"])
    missing = said is not None and said[0] is None
    if missing:                                       # no elapsed time at all: the carried-on place (said once per song)
        if not (trust["cand"] and trust["cand"].get("none")):
            say("%s gives no elapsed time for the same song (%s, its stamp %s) - it stood at %.3f s: the bar gets that, carried on." % (
                found.get("app"), state, clock_ms(said[1]) if said[1] else "none", was))
            trust["cand"] = {"none": True, "pos": -9.0, "at": at, "n": 0}
        trust["cand"]["n"] += 1
        found["pos"] = round(was, 3)
        trust.update(pos=was, at=at, state=state)
        return
    if abs(pos - was) <= LEAP_S:
        if trust["cand"]:
            say("%s is back at %.3f s after %d look(s) elsewhere: nothing of that was passed on." % (found.get("app"), pos, trust["cand"]["n"]))
        trust.update(pos=pos, at=at, state=state, cand=None)
        return
    cand = trust["cand"]
    same = cand is not None and not cand.get("none") and abs(pos - (cand["pos"] + (at - cand["at"] if state == "playing" else 0.0))) <= LEAP_S
    head = state != "playing" and pos < 1.5 and was > 5.0 and said is not None
    fresh = said is not None and said[1] is not None and said[1] > trust["paused_at"] + 0.3
    if same and at - cand["at"] >= 0.15 and (not head or fresh):
        say("%s: the song has leapt from %.3f s to %.3f s (seen twice): passed on." % (found.get("app"), was, pos))
        found["ps"] = 2
        trust.update(pos=pos, at=at, state=state, cand=None)
        return
    if not same:
        heard = "no word of its own" if said is None else "elapsed %s, its stamp %s, rate %s" % (
            "none" if said[0] is None else "%.3f" % said[0], clock_ms(said[1]) if said[1] else "none", said[2])
        say("%s says %s at %.3f s (%s) - the same song stood at %.3f s: NOT passed on%s." % (
            found.get("app"), state, pos, heard, was, " (paused at the head: only if it says so anew)" if head else ", unless the next look says it again"))
        trust["cand"] = {"pos": pos, "at": at, "n": 1}
    else:
        cand["n"] += 1
        cand["pos"], cand["at"] = pos, at
    found["pos"] = round(was, 3)                      # the bar gets the place carried on
    trust.update(pos=was, at=at, state=state)


def stamped(found, at):
    """The record as it leaves: "t" = my clock at this very moment, and the position carried on to that moment (it was
    true at `at`: looking at the players takes a tenth of a second, and the app takes pos as true at t)."""
    out = dict(found)
    now = time.time()
    if out.get("kind") == "music" and out.get("state") == "playing" and isinstance(out.get("pos"), (int, float)):
        pos = out["pos"] + max(0.0, now - at)
        out["pos"] = round(min(pos, out["dur"]) if out.get("dur") else pos, 3)
    out["t"] = int(now * 1000)
    if Shared.did is not None:
        out["cn"] = Shared.did
    return out


SAME = ("kind", "app", "state", "title", "artist", "album", "site", "dur", "vol", "can", "next")


def publish(found, at):
    """What is playing now, for everyone who asks (call with Shared.lock held). The version grows when it is something
    else than before - another song, a pause, the volume - or the song is not where it would be by now (a leap)."""
    old, was = Shared.found, Shared.looked
    new = old is None or any(found.get(k) != old.get(k) for k in SAME)
    if not new and found.get("kind") == "music":
        ahead = at - was if old.get("state") == "playing" else 0.0
        new = abs(found.get("pos", 0.0) - (old.get("pos", 0.0) + ahead)) > 1.0
    Shared.found, Shared.looked = dict(found), at
    if new:
        Shared.version += 1
        Shared.changed.notify_all()


def status_now():
    """For --status (asked from this Mac, with the code): how I am."""
    with Shared.lock:
        found = Shared.found or {}
        out = {"began": Shared.began, "asleep": Shared.asleep, "cable": Shared.cable, "paired": Shared.paired, "heard": Shared.heard,
               "playing": words(found) if found.get("kind") else "", "now": time.time()}
    return json.dumps(out).encode("ascii")


def record_now(known=None, wait=0.0):
    """What is playing as the app gets it - with the position where it is at this very moment, and my clock. known,
    wait: the app has version `known` already - the answer waits until there is another one, `wait` seconds at most."""
    with Shared.lock:
        if known is not None and wait > 0:
            until = time.time() + wait
            while Shared.version == known:
                left = until - time.time()
                if left <= 0:
                    break
                Shared.changed.wait(left)
        found, looked, version = (dict(Shared.found) if Shared.found else {"kind": "none"}), Shared.looked, Shared.version
    out = stamped(found, looked)
    out["v"] = version
    return json.dumps(out, ensure_ascii=True, separators=(",", ":")).encode("ascii")


class Door(http.server.BaseHTTPRequestHandler):
    """GET /now?c=CODE and POST /cmd?c=CODE - and nothing else, to nobody else."""
    server_version, sys_version, protocol_version = "Vinyl", "", "HTTP/1.0"

    def answer(self, status, body=b""):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def allowed(self, path):
        who, now = self.client_address[0], time.time()
        if shut_out(who, now):
            return False
        url = urllib.parse.urlsplit(self.path)
        self.asks = urllib.parse.parse_qs(url.query)
        code = self.asks.get("c", [""])[0]
        if not hmac.compare_digest(code.encode("utf-8", "replace"), Shared.code.encode("ascii")):
            wrong_code(who, now)
            return False
        if url.path != path:
            return False
        if who.startswith("127.") and self.asks.get("me", [""])[0] == "1":
            return True                               # (--status asking from this Mac: that is not the app)
        with Shared.lock:
            back, Shared.heard = now - Shared.heard > 30.0, now
            if Shared.cable:
                Shared.cable_heard = True
            slept, n = Shared.asleep, Shared.looks
        if back:                                      # (said when it begins, and again after a silence: so that you can see it works)
            say("The Vinyl app on the bar at %s is asking me over Wi-Fi." % who)
        if slept:                                     # I was asleep: one look at once, and the answer waits for it (1.5 s at most)
            Shared.wake.set()
            until = time.time() + 1.5
            with Shared.lock:
                while Shared.looks == n and time.time() < until:
                    Shared.changed.wait(0.05)
        return True

    def do_GET(self):
        if urllib.parse.urlsplit(self.path).path == "/status":
            return self.answer(200, status_now()) if self.allowed("/status") else self.answer(403)
        if not self.allowed("/now"):
            return self.answer(403)
        try:                                          # "v=N&w=MS": the app has version N - wait for another one, MS at most (never over 4 s)
            known, wait = int(self.asks["v"][0]), max(0.0, min(4.0, float(self.asks["w"][0]) / 1000.0))
        except (KeyError, ValueError, IndexError):
            known, wait = None, 0.0
        try:
            self.answer(200, record_now(known, wait))
        except OSError:
            pass                                      # (the app did not wait for it)

    def do_POST(self):
        if not self.allowed("/cmd"):
            return self.answer(403)
        try:
            cmd = json.loads(self.rfile.read(min(300, int(self.headers.get("Content-Length") or 0))).decode("utf-8"))
            if not isinstance(cmd, dict) or not isinstance(cmd.get("do"), str):
                raise ValueError
        except Exception:
            return self.answer(400)
        take(cmd)                                     # (carried out at once, by the thread that does nothing else)
        self.answer(200, b'{"ok":1}')

    def log_message(self, *args):                     # (nothing is written about who asked what)
        pass


def lan_address():
    """This Mac's address on the local network, or None."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("10.255.255.255", 1))              # (nothing is sent: this only asks the system which address it would use)
        ip = s.getsockname()[0]
        s.close()
        return None if ip.startswith("127.") else ip
    except Exception:
        return None


def local_name():
    """This Mac's name on the local network ("....local"), or None."""
    try:
        name = subprocess.run(["/usr/sbin/scutil", "--get", "LocalHostName"], capture_output=True, text=True, timeout=3).stdout.strip()
        return name + ".local" if name else None
    except Exception:
        return None


def own_code():
    """The six-digit code, made once and kept beside this file."""
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "vinyl_helper.code")
    try:
        code = open(path).read().strip()
        if len(code) == 6 and code.isdigit():
            return code
    except Exception:
        pass
    code = "%06d" % random.SystemRandom().randrange(1000000)
    try:
        with open(path, "w") as f:
            f.write(code + "\n")
    except Exception:
        say("I could not keep the code in %s: it will be another one at my next start." % path)
    return code


def serve(port):
    """Starts the small server; returns it, or None if the port is taken."""
    try:
        server = http.server.ThreadingHTTPServer(("0.0.0.0", port), Door)
    except OSError as err:
        say("I cannot open port %d for the app over Wi-Fi (%s). Is another copy of me running? Without it only the cable works." % (port, err.strerror or err))
        return None
    server.daemon_threads = True
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def addresses(port):
    return ["%s:%d" % (a, port) for a in (lan_address(), local_name()) if a]


# ---------- what the bar asks for ----------
# A wish of the bar - {"n": a number that only grows, "do": "toggle" | "play" | "pause"} or {"n": .., "do": "vol",
# "v": 0-100} - comes over Wi-Fi (POST /cmd) or, on the cable, in the file cmd.json of the app's storage (read four
# times a second by the cable's thread). Whichever way: it is carried out AT ONCE, by a thread that does nothing else
# (the look at the players and the cable never stand in its way), and what it has done is said at once - the very
# next answer to the app already shows the pause, the volume - before the player itself has been looked at again.
# For three seconds after, a look that still shows the old state (players take a moment) is not believed.
def take(cmd):
    """A wish as it arrives. The same one may come both ways: done once."""
    with Shared.lock:
        n = cmd.get("n")
        if n is not None:
            if n in Shared.done:                      # (also when it is said again later: a wish is carried out once)
                return False
            Shared.done.append(n)
            del Shared.done[:-60]
            Shared.seen = n
    Shared.todo.put(cmd)
    return True


def foretell(what, level=None):
    """What the command will have made of things, said before the player has been looked at again (Shared.lock held)."""
    now = time.time()
    found = dict(Shared.found) if Shared.found else None
    if found is None:
        return
    if what == "vol":
        Shared.vol_told = (level, now + 3.0)
        found["vol"] = level
        publish(found, Shared.looked)
        return
    if found.get("kind") != "music":
        return
    was = found.get("state")
    state = {"toggle": "paused" if was == "playing" else "playing", "play": "playing", "pause": "paused"}[what]
    pos = found.get("pos", 0.0) + (max(0.0, now - Shared.looked) if was == "playing" else 0.0)
    if found.get("dur"):
        pos = min(pos, found["dur"])
    found["state"], found["pos"] = state, round(pos, 3)
    Shared.told = {"state": state, "pos": pos, "at": now, "until": now + 3.0, "title": found.get("title"), "artist": found.get("artist")}
    publish(found, now)


def settle(found, at):
    """A look just after a command: while the player has not followed yet, the command's word stands (three seconds at
    most). Returns the moment the position is true for."""
    told = Shared.told
    if not told:
        return at
    if found.get("kind") != "music" or found.get("title") != told["title"] or found.get("artist") != told["artist"] or \
            found.get("state") == told["state"] or at > told["until"]:
        Shared.told = None                            # another song, or the player has followed, or it will not: the look counts
        return at
    found["state"] = told["state"]
    found["pos"] = round(told["pos"] + (at - told["at"] if told["state"] == "playing" else 0.0), 3)
    return at


def act(cmd, pretend, world):
    """Does what the bar asked - or, with --no-act or --fake, only says so. True if something may have changed."""
    what = cmd["do"]
    if what == "vol":
        try:
            level = max(0, min(100, int(round(float(cmd.get("v"))))))
        except (TypeError, ValueError):
            return False
        if world:
            fake_act("vol", level)
        if pretend:
            say("The bar asks for volume %d. (Not done: --no-act or --fake.)" % level)
            return bool(world)
        with Shared.lock:
            foretell("vol", level)
        return set_volume(level)
    if what in ("toggle", "play", "pause"):
        if world:
            fake_act(what)
        if pretend:
            say("The bar asks for: %s. (Not done: --no-act or --fake.)" % what)
            return bool(world)
        with Shared.lock:
            foretell(what)
        done = player_command(what)
        if not done:
            with Shared.lock:
                Shared.told = None                    # (it could not be sent: the next look says how things are)
        return done
    return what == "hello"                            # the app has just come up: a fresh word for it at once


class Doer(threading.Thread):
    """Carries the bar's wishes out, one after the other, the moment they arrive."""

    def __init__(self, pretend, world):
        super().__init__(daemon=True)
        self.pretend, self.world = pretend, world

    def run(self):
        while True:
            cmd = Shared.todo.get()
            try:
                began = time.time()
                if cmd.get("do") in ("toggle", "play", "pause") and isinstance(cmd.get("n"), int):
                    with Shared.lock:                 # ("cn" in every word from now on: this wish has been taken - the app
                        Shared.did = cmd["n"]         # then knows that a state it reads is the one AFTER its key)
                changed = act(cmd, self.pretend, self.world)
                if self.world and changed and cmd.get("do") != "hello":      # (--fake: the made-up player has followed at once)
                    with Shared.lock:
                        if cmd["do"] == "vol":
                            foretell("vol", fake_world["vol"])
                        else:
                            foretell({"playing": "play", "paused": "pause"}[fake_world["state"]])
                with Shared.lock:
                    Shared.acted = Shared.acted or bool(changed)
                if time.time() - began > 1.5:
                    say("(That command took %.1f s.)" % (time.time() - began))
            except Exception as err:                  # (a wish that cannot be read is no reason to stop)
                say("A command of the bar could not be carried out (%s)." % err.__class__.__name__)
            Shared.wake.set()                         # the look, at once: it confirms what was done


# ---------- the cable ----------
# Everything that goes over the bar's own HTTP API - the words about what is playing (now.json), the bar's wishes
# (cmd.json), the pairing (helper.json) - is done by a thread of its own: a bar that is not on the cable makes a
# request hang until its patience is over, and neither the look at the players nor a command may wait for that.
# While the bar is not there it is looked for every second, with half a second's patience (on the cable it answers
# in a few thousandths of a second, or it is not there).
class Cable(threading.Thread):
    def __init__(self, bar, port):
        super().__init__(daemon=True)
        self.bar, self.port = bar, port
        self.sent, self.sent_at = None, 0.0           # what was written last (as it was said), and when
        self.old_n, self.first = None, True           # the command found in the file; True: what is there is old - noted, not done
        self.paired, self.paired_at, self.where, self.where_at = None, 0.0, [], 0.0

    def due(self, cur, now, force):
        if force or self.sent is None or now - self.sent_at >= HEARTBEAT:
            return True
        if any(cur.get(k) != self.sent.get(k) for k in SAME):
            return True
        if cur.get("kind") == "music":
            ahead = now - self.sent_at if self.sent.get("state") == "playing" else 0.0
            return abs(cur.get("pos", 0.0) - (self.sent.get("pos", 0.0) + ahead)) > LEAP
        return False

    def write(self, found, at):
        out = stamped(found, at)                      # "t": my clock, in thousandths of a second (the app sees that I am alive)
        if self.bar.took:                             # "w": what my writes take (the app's clock allows for it)
            out["w"] = sorted(self.bar.took)[len(self.bar.took) // 2]
        self.bar.send(json.dumps(out, ensure_ascii=True, separators=(",", ":")).encode("ascii"))
        if self.bar.ok:
            self.sent, self.sent_at = out, time.time()

    def run(self):
        bar, tried = self.bar, 0.0
        while True:
            t0 = time.time()
            try:
                with Shared.lock:
                    found, at = (dict(Shared.found) if Shared.found else None), Shared.looked
                    force, Shared.acted = Shared.acted, False
                if found is None:
                    time.sleep(0.1)
                    continue
                with Shared.lock:
                    asleep = Shared.asleep
                if bar.ok is not True:                # is the bar on the cable? (looked for every second - every ten while I sleep)
                    if t0 - tried < (10.0 if asleep else 1.0):
                        time.sleep(0.1 if not asleep else 0.5)
                        continue
                    tried = t0
                    bar.patience = 0.5
                    self.write(found, at)
                    with Shared.lock:
                        Shared.cable = bar.ok is True
                    if bar.ok is not True:
                        continue
                    bar.patience, self.first = 2.5, True
                    with Shared.lock:
                        Shared.cable_heard = False    # (the cable is in again: whether the app asks over Wi-Fi as well is to be seen anew)
                    Shared.wake.set()
                elif asleep:                          # the cable is in, the app on the bar is closed: only "is the bar still there?", every ten seconds
                    if t0 - tried < 10.0:
                        time.sleep(0.5)
                        continue
                    tried = t0
                    if bar.read("cmd.json") is None and not bar.write("helper.json", json.dumps({"addr": self.where, "c": Shared.code, "t": int(t0 * 1000)}).encode("ascii")):
                        bar.ok = False                # (it has gone)
                        with Shared.lock:
                            Shared.cable = False
                    continue
                text = bar.read("cmd.json")           # what does the bar ask for? (four times a second)
                if text is not None:
                    cmd, n = command(text, self.old_n)
                    self.old_n = n
                    if cmd and not self.first:
                        take(cmd)
                self.first = False
                with Shared.lock:                     # (a command may just have changed it)
                    found, at = dict(Shared.found), Shared.looked
                    force, Shared.acted = force or Shared.acted, False
                if self.due(stamped(found, at), time.time(), force):
                    self.write(found, at)
                if self.port and bar.ok:              # the app is told where to find me without the cable (again when my address changes)
                    if t0 - self.where_at > 30:
                        self.where, self.where_at = addresses(self.port), t0
                    if self.where and (self.paired != self.where or t0 - self.paired_at > 60):
                        if bar.write("helper.json", json.dumps({"addr": self.where, "c": Shared.code, "t": int(t0 * 1000)}).encode("ascii")):
                            if self.paired != self.where:
                                say("Paired: the app on the bar now finds me at %s without the cable." % self.where[0])
                            self.paired, self.paired_at = self.where, t0
                            with Shared.lock:
                                Shared.paired = self.where[0]
                if bar.ok is not True:                # (a write has just failed: the cable is out)
                    with Shared.lock:
                        Shared.cable = False
            except Exception as err:
                say("The cable's thread met %s; it goes on." % err.__class__.__name__, once="cable " + err.__class__.__name__)
            time.sleep(max(0.02, 0.25 - (time.time() - t0)))


def command(text, seen):
    """(the command to act on or None, the n now seen). Rubbish in the file is no command."""
    try:
        cmd = json.loads(text)
        n = cmd["n"]
    except Exception:
        return None, seen
    if n == seen or not isinstance(cmd.get("do"), str):
        return None, n if isinstance(cmd, dict) else seen
    return cmd, n


# ---------- --install, --uninstall, --status: living in your Library, without a window ----------
# --install copies this file to ~/Library/Application Support/Vinyl for Mac/, writes a LaunchAgent (a small settings
# file in ~/Library/LaunchAgents that tells macOS: run this program for this user, now and at every login, and start it
# again if it stops) and switches it on. Nothing outside your own Library is touched, nothing needs a password.
# --uninstall switches it off and removes all of that. --status asks the running program how it is.
LABEL = "io.github.windagh.vinyl-for-mac"


def places(label):
    name = "Vinyl for Mac" if label == LABEL else "Vinyl for Mac (%s)" % label
    lib = os.path.expanduser("~/Library")
    return (os.path.join(lib, "Application Support", name), os.path.join(lib, "LaunchAgents", label + ".plist"),
            os.path.join(lib, "Logs", name + ".log"))


def launchctl(*words):
    try:
        return subprocess.run(["/bin/launchctl"] + list(words), capture_output=True, text=True, timeout=20).returncode
    except Exception:
        return 1


def ask_me(folder, port):
    """The running program's own word about itself (asked on this Mac, with its code), or None."""
    try:
        code = open(os.path.join(folder, "vinyl_helper.code")).read().strip()
        with urllib.request.urlopen("http://127.0.0.1:%d/status?c=%s&me=1" % (port, code), timeout=2) as res:
            return json.loads(res.read().decode("utf-8")), code
    except Exception:
        return None, None


def ago(seconds):
    seconds = int(seconds)
    return "%d s" % seconds if seconds < 90 else "%d min" % (seconds // 60) if seconds < 5400 else "%.1f h" % (seconds / 3600.0)


def tell_status(me, code, port):
    print("  Running for %s%s." % (ago(me["now"] - me["began"]), ", asleep (no bar around: it only waits)" if me["asleep"] else ""))
    print("  " + (me["playing"] or "It has not looked at the players yet."))
    print("  BUSY Bar on the USB cable: %s." % ("yes" if me["cable"] else "no"))
    print("  Paired: %s." % ("yes, the app was told to find this Mac at %s" % me["paired"] if me["paired"] else "not since this start (plug the bar in by USB once, with Vinyl open on it)"))
    print("  Asked by the app over Wi-Fi: %s." % ("%s ago" % ago(me["now"] - me["heard"]) if me["heard"] else "not since this start"))
    where = addresses(port)
    print("\n  For a bar that is never plugged in, type these into Vinyl's settings:\n      Vinyl for Mac address:   %s\n      Vinyl for Mac code:      %s"
          % (where[0] if where else "(this Mac has no network address just now)", code))


def install(args, passed):
    folder, plist, log = places(args.label)
    target = os.path.join(folder, "vinyl_helper.py")
    for d in (folder, os.path.dirname(plist), os.path.dirname(log)):
        os.makedirs(d, exist_ok=True)
    if os.path.abspath(__file__) != target:
        shutil.copyfile(os.path.abspath(__file__), target)
    json.dump({"port": args.port, "options": passed}, open(os.path.join(folder, "options.json"), "w"))
    agent = {"Label": args.label, "ProgramArguments": [sys.executable, "-u", target] + passed, "RunAtLoad": True, "KeepAlive": True,
             "ProcessType": "Background", "StandardOutPath": log, "StandardErrorPath": log}
    with open(plist, "wb") as f:
        plistlib.dump(agent, f)
    domain = "gui/%d" % os.getuid()
    launchctl("bootout", domain + "/" + args.label)   # (an earlier one of mine, if there is one)
    if launchctl("bootstrap", domain, plist) != 0 and launchctl("load", "-w", plist) != 0:
        print("I have put Vinyl for Mac into your Library, but macOS did not start it. Log out and in again, or run:\n    %s %s" % (sys.executable, target))
        return 1
    me = code = None
    for _ in range(40):                               # it needs a moment to come up
        time.sleep(0.25)
        me, code = ask_me(folder, args.port)
        if me:
            break
    if not me:
        print("Vinyl for Mac is in your Library and macOS has been told to run it, but it does not answer yet.\n"
              "If macOS asks whether Python may accept incoming network connections: Allow. What it says is in:\n    %s" % log)
        return 1
    print("\nVinyl for Mac is running and will start by itself when you log in.\n"
          "Plug your BUSY Bar into this Mac by USB once, with Vinyl open on it. After that the cable is not needed.\n")
    tell_status(me, code, args.port)
    print("\n  (macOS may show a notice that a background item was added: that is this.)\n"
          "  To look again:  python3 \"%s\" --status\n  To remove it:   python3 \"%s\" --uninstall" % (target, target))
    return 0


def uninstall(args):
    folder, plist, log = places(args.label)
    launchctl("bootout", "gui/%d/%s" % (os.getuid(), args.label))
    launchctl("unload", plist)
    gone = []
    for path in (plist, log):
        if os.path.exists(path):
            os.remove(path)
            gone.append(path)
    if os.path.isdir(folder):
        shutil.rmtree(folder)
        gone.append(folder)
    print("Vinyl for Mac is stopped and removed." if gone else "Vinyl for Mac was not installed.")
    for path in gone:
        print("    removed " + path)
    return 0


def status(args):
    folder, plist, log = places(args.label)
    port = args.port
    try:
        port = json.load(open(os.path.join(folder, "options.json"))).get("port", port)
    except Exception:
        pass
    me, code = ask_me(folder, port)
    if not me:                                        # (not installed: one started by hand, from where this file lies?)
        me, code = ask_me(os.path.dirname(os.path.abspath(__file__)), port)
    if not me:
        print("Vinyl for Mac is not running%s." % (" (it is installed: see %s)" % log if os.path.exists(plist) else ""))
        return 1
    print("Vinyl for Mac%s:" % (", installed in your Library" if os.path.exists(plist) else ", started by hand"))
    tell_status(me, code, port)
    return 0


def main():
    ap = argparse.ArgumentParser(description="Tells the Vinyl app on a BUSY Bar what this Mac is playing. macOS only.")
    ap.add_argument("--bar", default="10.0.4.20", help="the bar's address (default: 10.0.4.20, the bar on USB)")
    ap.add_argument("--app-id", default="io.github.windagh.vinyl", help="the Vinyl app's id on the bar (default: io.github.windagh.vinyl)")
    ap.add_argument("--password", default="", help="the password of the bar's HTTP API, if it has one")
    ap.add_argument("--interval", type=float, default=1.0, help="seconds between two looks (default 1)")
    ap.add_argument("--once", action="store_true", help="look once, send, stop")
    ap.add_argument("--dry", action="store_true", help="send nothing; print what would be sent")
    ap.add_argument("--fake", action="store_true", help="made-up states instead of looking at applications (a test)")
    ap.add_argument("--prefer", choices=("music", "latest"), default="music",
                    help="two things at once: music first (default), or whatever macOS calls current")
    ap.add_argument("--ask-apps", action="store_true", help="do not use macOS's Now Playing; ask Spotify, Music and the browsers")
    ap.add_argument("--no-act", action="store_true", help="do not pause, play or set the volume when the bar asks: only say what would be done")
    ap.add_argument("--port", type=int, default=8765, help="the port of the small server for the app over Wi-Fi (default 8765; 0: no server)")
    ap.add_argument("--install", action="store_true", help="put me into your Library and start me now and at every login")
    ap.add_argument("--uninstall", action="store_true", help="stop me and remove what --install has put there")
    ap.add_argument("--status", action="store_true", help="am I running? is a bar paired and seen? my address and code")
    ap.add_argument("--label", default=LABEL, help=argparse.SUPPRESS)       # (another name for the LaunchAgent: for tests)
    ap.add_argument("--fake-zero", action="store_true", help=argparse.SUPPRESS)     # (with --fake: paused = "at 0.0", as Spotify's Now Playing says it)
    args = ap.parse_args()
    if args.install or args.uninstall or args.status:
        if sys.platform != "darwin":
            print("This is for macOS only.")
            return 2
        passed, skip = [], False
        for word in sys.argv[1:]:                     # (what else was asked for stays with the installed program)
            if skip:
                skip = False
            elif word in ("--install", "--uninstall", "--status"):
                pass
            elif word == "--label":
                skip = True
            else:
                passed.append(word)
        return uninstall(args) if args.uninstall else status(args) if args.status else install(args, passed)
    global prefer_music, system_works
    prefer_music = args.prefer == "music"
    if args.ask_apps:
        system_works = False
    if sys.platform != "darwin" and not args.fake:
        print("This helper is for macOS only: it reads macOS's Now Playing.\n"
              "On other systems use the Vinyl app with your Spotify keys instead (see SETUP.md).")
        return 2
    bar = Bar(args.bar, args.app_id, args.password)
    say("Vinyl for Mac. %s Stop me with Ctrl-C." % (
        "I send nothing (--dry) and print it instead." if args.dry else "I send to the BUSY Bar at %s, app %s." % (args.bar, args.app_id)))
    served = None                                     # the small server
    if args.port and not args.dry and not args.once:
        Shared.code = own_code()
        served = serve(args.port)
        if served:
            bar.wifi = True
            where = addresses(args.port)
            print("\n    Without a cable: plug the bar into this Mac by USB ONCE - the app then knows where I am.\n"
                  "    Or enter these two in the Vinyl app's settings on your bar:\n\n"
                  "        Vinyl for Mac address:   %s\n"
                  "        Vinyl for Mac code:      %s\n" % (where[0] if where else "(this Mac has no network address just now)", Shared.code), flush=True)
    pretend = args.no_act or args.fake
    fake_world["zero"] = bool(args.fake_zero)
    if not args.dry and not args.once:                # the two threads beside the look: the bar's wishes, and the cable
        Doer(pretend, args.fake).start()
        Cable(bar, args.port if served else 0).start()
    last = None
    sent, sent_at = None, 0.0                         # --dry: what was printed last, and when
    looked, found = 0.0, None                         # when the players were last looked at, and what was found
    level, level_at = None, 0.0                       # the Mac's volume, read every two seconds
    pos_at = 0.0                                      # the moment the position last found was true for
    woken = False
    bundle, silent = None, 0                          # whose song it is, and how many looks at the sound found it silent
    try:
        while True:
            t0 = time.time()
            # Nobody to tell? No bar on the cable and no question from the app for a minute (or, on the cable: the app,
            # which had been asking over Wi-Fi too, has been silent for a minute - it was closed): asleep. No look at
            # the players, no volume read, nothing written; a question or the cable wakes me.
            with Shared.lock:
                quiet = t0 - max(Shared.heard, Shared.began) > 60.0 and not args.dry and not args.once
                sleepy = quiet and (not Shared.cable or Shared.cable_heard)
                why = "No bar on the cable" if not Shared.cable else "The Vinyl app on the bar is closed"
                was, Shared.asleep = Shared.asleep, sleepy
            if sleepy:
                if not was:
                    say("%s and nobody has asked for a minute: I sleep until the bar asks or is plugged in." % why)
                    last = None                       # (what plays is said again on waking)
                woken = Shared.wake.wait(10.0)
                Shared.wake.clear()
                looked = 0.0                          # (once awake: a look at once)
                continue
            if was:
                say("Awake: the bar is there.")
            if woken:                                 # a command has just been carried out: looked at once, the volume too
                level_at = 0.0
            # How often: every second - twice a second while music plays (a pause or another song is seen at once and the
            # app, which waits for exactly that, is told within the moment) - and five times a second in a song's last
            # moment, so that the next one is seen at once (the app changes the record with the music, not after it).
            near, music = False, bool(found) and found.get("kind") == "music" and found.get("state") == "playing"
            if music and found.get("dur"):
                near = -3.0 < found["dur"] - (found.get("pos", 0.0) + (t0 - pos_at)) < 1.5
            every = 0.2 if near else min(args.interval, 0.5) if music else args.interval
            # Between two looks (each one starts a program: twice a second is what that may cost), the sound itself is
            # looked at four times a second - a question to CoreAudio, inside this program, costing nothing: when the
            # player whose song it is puts no sound out two times in a row, the song has probably been stopped, and
            # the players are looked at now instead of at the next half second. (The look decides, never the silence.)
            early = False
            if music and bundle and not args.fake and t0 - looked < every:
                loud = sounding()
                silent = silent + 1 if (loud is not None and bundle not in loud) else 0
                early = silent == 2
            if woken or found is None or early or t0 - looked >= every:
                looked = t0
                found = clean(fake(t0) if args.fake else look())
                bundle = found.get("bundle")
                if t0 - level_at >= 2.0:
                    level, level_at = (fake_world["vol"] if args.fake else get_volume()), t0
                found.pop("bundle", None)
                pos_at = found.pop("_at", None) or time.time()        # the moment the position is true for
                if found.get("kind") == "video" and found.get("state") != "playing":
                    found = {"kind": "none"}
                stamp = (found.get("_said") or (None, None))[1]       # the player's own stamp of what it shows
                believe(found, pos_at)                # (a place the player cannot mean is not passed on)
                with Shared.lock:
                    pos_at = settle(found, pos_at)    # (just after a command: see settle)
                    told = Shared.vol_told
                    if told and (level == told[0] or time.time() > told[1]):
                        told = Shared.vol_told = None
                    if told:
                        level = told[0]
                    if level is not None:
                        found["vol"] = level
                    found["can"] = (["toggle"] if found.get("kind") == "music" else []) + (["vol"] if level is not None else [])
                    publish(found, pos_at)            # (the small server and the cable's thread answer from this)
                    Shared.looks += 1
                    Shared.changed.notify_all()       # (a question that woke me has waited for this look)
                line = words(found)
                if line != last:                      # (with how long after the player's own stamp it was seen, and how long the look took)
                    say(line + (" [seen %d ms after the player's stamp %s; the look took %d ms]" % ((time.time() - stamp) * 1000, clock_ms(stamp), (time.time() - t0) * 1000)
                                if stamp and last is not None else "") + (" (the sound had stopped: looked early)" if early else ""))
                    last = line
                if args.once or (args.dry and due(found, sent, sent_at, t0)):
                    out = stamped(found, pos_at)
                    text = json.dumps(out, ensure_ascii=True, separators=(",", ":"))
                    if args.dry:
                        print("    " + text, flush=True)
                        sent, sent_at = found, t0
                    else:
                        bar.send(text.encode("ascii"))
                    if args.once:
                        return 0
            woken = Shared.wake.wait(max(0.05, (0.1 if near else 0.25) - (time.time() - t0)))
            Shared.wake.clear()
    except KeyboardInterrupt:
        if served:
            served.shutdown()
        say("Stopped. The app on the bar will notice in a few seconds.")
        return 0


if __name__ == "__main__":
    sys.exit(main())

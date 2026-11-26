// GENERATED FILE - do not edit by hand. Written by the author's export script (export.py, kept outside this
// repository) from the design sources; the app only reads it.
// Stocks: the box's plates and colours, widths of the bar's fonts.

export const D = {
  // what is shown when the "Stocks" setting is empty
  symbols: "AAPL, TSLA, NVDA, BTC-USD",
  // the box: the screen column it starts at; the line's first column inside it; how many columns the line has
  x0: 35,
  lx: 2,
  cols: 33,
  // per look (up, down, shut): ink = the percentage, line = the line and the arrow; faint... = the same when the
  // numbers are not fresh
  style: {
    up: {
      ink: "#E3FAD1FF", line: "#70E28CFF", faintInk: "#677F67FF", faintLine: "#357148FF", name: "#70E28CFF",
      nameDim: "#458C57FF",
    },
    down: {
      ink: "#FFE6E6FF", line: "#FF787CFF", faintInk: "#946466FF", faintLine: "#903438FF", name: "#FF787CFF",
      nameDim: "#9E4A4DFF",
    },
    shut: {
      ink: "#CCD5E3FF", line: "#96A4B6FF", faintInk: "#626B75FF", faintLine: "#49545FFF", name: "#96A4B6FF",
      nameDim: "#5D6671FF",
    },
    extu: {
      ink: "#E0FAAAFF", line: "#C4F53CFF", faintInk: "#64705BFF", faintLine: "#54692CFF", name: "#C4F53CFF",
      nameDim: "#7A9825FF",
    },
    extd: {
      ink: "#FFD6BEFF", line: "#FF7A46FF", faintInk: "#716164FF", faintLine: "#6C3830FF", name: "#FF7A46FF",
      nameDim: "#9E4C2BFF",
    },
  },
  // the letters that stand for the line and for its last point in the bitmaps below
  keys: { line: "C", now: "D", quiet: "y", run: "zABC" },
  // the box as two XPM bitmaps a look (a bitmap has 32 colours at most): top = header, colours and rows 0-7,
  // mid = rows 8-14 (the ones the line is drawn into), bot = row 15
  plate: {
    up: [
      {
        w: 19,
        top: "! XPM2\n" +
          "19 16 30 1\n" +
          "a c #000000\n" +
          "b c #0E261C\n" +
          "c c #285C38\n" +
          "d c #1A412A\n" +
          "e c #143222\n" +
          "f c #245435\n" +
          "g c #122E1B\n" +
          "h c #1E482E\n" +
          "i c #173A26\n" +
          "j c #122E20\n" +
          "k c #1C452E\n" +
          "l c #265A36\n" +
          "m c #10291C\n" +
          "n c #163624\n" +
          "o c #193D28\n" +
          "p c #102C1E\n" +
          "q c #122D1F\n" +
          "r c #285A3A\n" +
          "s c #1D452D\n" +
          "t c #183826\n" +
          "u c #245135\n" +
          "v c #1F4930\n" +
          "w c #193D29\n" +
          "x c #133122\n" +
          "y c #265638\n" +
          "z c #153524\n" +
          "A c #224D32\n" +
          "B c #1C402B\n" +
          "C c #70E28C\n" +
          "D c #FFFFFF\n" +
          "accccccllllllllllll\n" +
          "fhkddoiinneeeeeeeee\n" +
          "fhkdoiineeejjjjjjjj\n" +
          "fhkdoineeejjppppppp\n" +
          "fkddiineejjpmmmmmmm\n" +
          "fkdoineejjpmmmmmmmm\n" +
          "fkdoinejjpmbbbbbbbb\n" +
          "fkdoinejjpmbbbbbbbb\n",
        mid: [
          "fkdoinejjpmbbbbbbbb", "fkdoinejjpmbbbbbbbb", "fkdoinejjpmbbbbbbbb", "fkdoinejjpmbbbbbbbb",
          "fkdoinejjpmbbbbbbbb", "fkdoinejjpmbbbbbbbb", "fkdoinejjpmbbbbbbbb",
        ],
        bot: "agggggggggggggggggg",
      },
      {
        w: 18,
        top: "! XPM2\n" +
          "18 16 30 1\n" +
          "a c #000000\n" +
          "b c #0E261C\n" +
          "c c #285C38\n" +
          "d c #1A412A\n" +
          "e c #143222\n" +
          "f c #245435\n" +
          "g c #122E1B\n" +
          "h c #1E482E\n" +
          "i c #173A26\n" +
          "j c #122E20\n" +
          "k c #1C452E\n" +
          "l c #265A36\n" +
          "m c #10291C\n" +
          "n c #163624\n" +
          "o c #193D28\n" +
          "p c #102C1E\n" +
          "q c #122D1F\n" +
          "r c #285A3A\n" +
          "s c #1D452D\n" +
          "t c #183826\n" +
          "u c #245135\n" +
          "v c #1F4930\n" +
          "w c #193D29\n" +
          "x c #133122\n" +
          "y c #265638\n" +
          "z c #153524\n" +
          "A c #224D32\n" +
          "B c #1C402B\n" +
          "C c #70E28C\n" +
          "D c #FFFFFF\n" +
          "lllllllllllcccccca\n" +
          "eeeeeeeenniioddkhf\n" +
          "jjjjjjjeeeniiodkhf\n" +
          "ppppppjjeeeniodkhf\n" +
          "mmmmmmpjjeeniiddkf\n" +
          "mmmmmmmpjjeeniodkf\n" +
          "bbbbbbbmpjjeniodkf\n" +
          "bbbbbbbmpjjeniodkf\n",
        mid: [
          "bbbbbbbmpjjeniodkf", "bbbbbbbmpjjeniodkf", "bbbbbbbmpjjeniodkf", "bbbbbbbmpjjeniodkf",
          "bbbbbbbmpjjeniodkf", "bbbbbbbmpjjeniodkf", "bbbbbbbmpjjeniodkf",
        ],
        bot: "ggggggggggggggggga",
      },
    ],
    down: [
      {
        w: 19,
        top: "! XPM2\n" +
          "19 16 30 1\n" +
          "a c #000000\n" +
          "b c #400508\n" +
          "c c #7C0F13\n" +
          "d c #5E080C\n" +
          "e c #6E0A0E\n" +
          "f c #4E080C\n" +
          "g c #56080C\n" +
          "h c #660A0E\n" +
          "i c #47060A\n" +
          "j c #780E12\n" +
          "k c #4A060A\n" +
          "l c #52080C\n" +
          "m c #5A080C\n" +
          "n c #620A0E\n" +
          "o c #6A0A0E\n" +
          "p c #420508\n" +
          "q c #4E0B0F\n" +
          "r c #7D1A1E\n" +
          "s c #65171B\n" +
          "t c #5B0D11\n" +
          "u c #6A0F13\n" +
          "v c #75181C\n" +
          "w c #5C1317\n" +
          "x c #721216\n" +
          "y c #540D11\n" +
          "z c #620F13\n" +
          "A c #6D181C\n" +
          "B c #691418\n" +
          "C c #FF787C\n" +
          "D c #FFFFFF\n" +
          "accccccjjjjjjjjjjjj\n" +
          "jeohnddmgglllllllll\n" +
          "jeohndmggglffffffff\n" +
          "jeohddmgglfffffffff\n" +
          "jehndmgglfffkkkkkkk\n" +
          "jehndmglffkkkiiiiii\n" +
          "johndgglffkiiiiiiii\n" +
          "johndgglffkiiiiiiii\n",
        mid: [
          "johndgglffkiiiiiiii", "johndgglffkiiiiiiii", "johndgglffkiiiiiiii", "johndgglffkiiiiiiii",
          "johndgglffkiiiiiiii", "johndgglffkiiiiiiii", "johndgglffkiiiiiiii",
        ],
        bot: "apppppbbbbbbbbbbbbb",
      },
      {
        w: 18,
        top: "! XPM2\n" +
          "18 16 30 1\n" +
          "a c #000000\n" +
          "b c #400508\n" +
          "c c #7C0F13\n" +
          "d c #5E080C\n" +
          "e c #6E0A0E\n" +
          "f c #4E080C\n" +
          "g c #56080C\n" +
          "h c #660A0E\n" +
          "i c #47060A\n" +
          "j c #780E12\n" +
          "k c #4A060A\n" +
          "l c #52080C\n" +
          "m c #5A080C\n" +
          "n c #620A0E\n" +
          "o c #6A0A0E\n" +
          "p c #420508\n" +
          "q c #4E0B0F\n" +
          "r c #7D1A1E\n" +
          "s c #65171B\n" +
          "t c #5B0D11\n" +
          "u c #6A0F13\n" +
          "v c #75181C\n" +
          "w c #5C1317\n" +
          "x c #721216\n" +
          "y c #540D11\n" +
          "z c #620F13\n" +
          "A c #6D181C\n" +
          "B c #691418\n" +
          "C c #FF787C\n" +
          "D c #FFFFFF\n" +
          "jjjjjjjjjjjcccccca\n" +
          "llllllllggmddnhoej\n" +
          "ffffffflgggmdnhoej\n" +
          "fffffffflggmddhoej\n" +
          "kkkkkkffflggmdnhej\n" +
          "iiiiikkkfflgmdnhej\n" +
          "iiiiiiikfflggdnhoj\n" +
          "iiiiiiikfflggdnhoj\n",
        mid: [
          "iiiiiiikfflggdnhoj", "iiiiiiikfflggdnhoj", "iiiiiiikfflggdnhoj", "iiiiiiikfflggdnhoj",
          "iiiiiiikfflggdnhoj", "iiiiiiikfflggdnhoj", "iiiiiiikfflggdnhoj",
        ],
        bot: "bbbbbbbbbbbbpppppa",
      },
    ],
    shut: [
      {
        w: 19,
        top: "! XPM2\n" +
          "19 16 30 1\n" +
          "a c #000000\n" +
          "b c #161E25\n" +
          "c c #46545F\n" +
          "d c #2E3942\n" +
          "e c #212B33\n" +
          "f c #3F4C57\n" +
          "g c #34404A\n" +
          "h c #27313A\n" +
          "i c #1C242C\n" +
          "j c #1E282F\n" +
          "k c #242E37\n" +
          "l c #2A363E\n" +
          "m c #323E46\n" +
          "n c #182028\n" +
          "o c #44525E\n" +
          "p c #171F27\n" +
          "q c #1A2229\n" +
          "r c #3D4953\n" +
          "s c #2B353E\n" +
          "t c #222B33\n" +
          "u c #35404A\n" +
          "v c #1F282F\n" +
          "w c #313C46\n" +
          "x c #29323A\n" +
          "y c #39444F\n" +
          "z c #252F37\n" +
          "A c #1C242C\n" +
          "B c #2E3942\n" +
          "C c #96A4B6\n" +
          "D c #FFFFFF\n" +
          "accccccoooooooooooo\n" +
          "fgmddlhhkeeeeeeeeee\n" +
          "fgmdlhhkeeejjjjjjjj\n" +
          "fmmdlhkeejjiiiiiiii\n" +
          "fmdlhkkejjiiiiiiiii\n" +
          "fmdlhkeejiinnnnnnnn\n" +
          "fmdlheejiinpbbbbbbb\n" +
          "fmdlheejiinpbbbbbbb\n",
        mid: [
          "fmdlheejiinpbbbbbbb", "fmdlheejiinpbbbbbbb", "fmdlheejiinpbbbbbbb", "fmdlheejiinpbbbbbbb",
          "fmdlheejiinpbbbbbbb", "fmdlheejiinpbbbbbbb", "fmdlheejiinpbbbbbbb",
        ],
        bot: "ahhhhhhhhkkkkkkkkkk",
      },
      {
        w: 18,
        top: "! XPM2\n" +
          "18 16 30 1\n" +
          "a c #000000\n" +
          "b c #161E25\n" +
          "c c #46545F\n" +
          "d c #2E3942\n" +
          "e c #212B33\n" +
          "f c #3F4C57\n" +
          "g c #34404A\n" +
          "h c #27313A\n" +
          "i c #1C242C\n" +
          "j c #1E282F\n" +
          "k c #242E37\n" +
          "l c #2A363E\n" +
          "m c #323E46\n" +
          "n c #182028\n" +
          "o c #44525E\n" +
          "p c #171F27\n" +
          "q c #1A2229\n" +
          "r c #3D4953\n" +
          "s c #2B353E\n" +
          "t c #222B33\n" +
          "u c #35404A\n" +
          "v c #1F282F\n" +
          "w c #313C46\n" +
          "x c #29323A\n" +
          "y c #39444F\n" +
          "z c #252F37\n" +
          "A c #1C242C\n" +
          "B c #2E3942\n" +
          "C c #96A4B6\n" +
          "D c #FFFFFF\n" +
          "ooooooooooocccccca\n" +
          "eeeeeeeeekhhlddmgf\n" +
          "jjjjjjjeeekhhldmgf\n" +
          "iiiiiiijjeekhldmmf\n" +
          "iiiiiiiijjekkhldmf\n" +
          "nnnnnnniijeekhldmf\n" +
          "bbbbbbpniijeehldmf\n" +
          "bbbbbbpniijeehldmf\n",
        mid: [
          "bbbbbbpniijeehldmf", "bbbbbbpniijeehldmf", "bbbbbbpniijeehldmf", "bbbbbbpniijeehldmf",
          "bbbbbbpniijeehldmf", "bbbbbbpniijeehldmf", "bbbbbbpniijeehldmf",
        ],
        bot: "kkkkkkkkkhhhhhhhha",
      },
    ],
    extu: [
      {
        w: 19,
        top: "! XPM2\n" +
          "19 16 30 1\n" +
          "a c #000000\n" +
          "b c #0B0D24\n" +
          "c c #30418E\n" +
          "d c #162057\n" +
          "e c #11183D\n" +
          "f c #243379\n" +
          "g c #0E102F\n" +
          "h c #141C4A\n" +
          "i c #1A2662\n" +
          "j c #101436\n" +
          "k c #151E50\n" +
          "l c #30408A\n" +
          "m c #0C0F29\n" +
          "n c #121A44\n" +
          "o c #26357D\n" +
          "p c #18245D\n" +
          "q c #161B2B\n" +
          "r c #364747\n" +
          "s c #1D2949\n" +
          "t c #2F3B2D\n" +
          "u c #1E283B\n" +
          "v c #2A3848\n" +
          "w c #222A2A\n" +
          "x c #303F37\n" +
          "y c #4A5478\n" +
          "z c #6EEC60\n" +
          "A c #42DEAA\n" +
          "B c #3AB2F0\n" +
          "C c #407CFF\n" +
          "D c #FFFFFF\n" +
          "accccclllllllllllll\n" +
          "oipdkhhnneeejjjjjjj\n" +
          "oipdkhnneejjjjjjjjj\n" +
          "opdkhhnejjjgggggggg\n" +
          "fpdkhneejgggmmmmmmm\n" +
          "fddhneejggmmmbbbbbb\n" +
          "fdkhnejjgmmbbbbbbbb\n" +
          "fdkhnejjgmmbbbbbbbb\n",
        mid: [
          "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb",
          "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb",
        ],
        bot: "aggggggggggmmmmmmmm",
      },
      {
        w: 18,
        top: "! XPM2\n" +
          "18 16 30 1\n" +
          "a c #000000\n" +
          "b c #0B0D24\n" +
          "c c #30418E\n" +
          "d c #162057\n" +
          "e c #11183D\n" +
          "f c #243379\n" +
          "g c #0E102F\n" +
          "h c #141C4A\n" +
          "i c #1A2662\n" +
          "j c #101436\n" +
          "k c #151E50\n" +
          "l c #30408A\n" +
          "m c #0C0F29\n" +
          "n c #121A44\n" +
          "o c #26357D\n" +
          "p c #18245D\n" +
          "q c #161B2B\n" +
          "r c #364747\n" +
          "s c #1D2949\n" +
          "t c #2F3B2D\n" +
          "u c #1E283B\n" +
          "v c #2A3848\n" +
          "w c #222A2A\n" +
          "x c #303F37\n" +
          "y c #4A5478\n" +
          "z c #6EEC60\n" +
          "A c #42DEAA\n" +
          "B c #3AB2F0\n" +
          "C c #407CFF\n" +
          "D c #FFFFFF\n" +
          "llllllllllllccccca\n" +
          "jjjjjjeeennhhkdpio\n" +
          "jjjjjjjjeennhkdpio\n" +
          "gggggggjjjenhhkdpo\n" +
          "mmmmmmgggjeenhkdpf\n" +
          "bbbbbmmmggjeenhddf\n" +
          "bbbbbbbmmgjjenhkdf\n" +
          "bbbbbbbmmgjjenhkdf\n",
        mid: [
          "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf",
          "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf",
        ],
        bot: "mmmmmmmgggggggggga",
      },
    ],
    extd: [
      {
        w: 19,
        top: "! XPM2\n" +
          "19 16 30 1\n" +
          "a c #000000\n" +
          "b c #0B0D24\n" +
          "c c #30418E\n" +
          "d c #162057\n" +
          "e c #11183D\n" +
          "f c #243379\n" +
          "g c #0E102F\n" +
          "h c #141C4A\n" +
          "i c #1A2662\n" +
          "j c #101436\n" +
          "k c #151E50\n" +
          "l c #30408A\n" +
          "m c #0C0F29\n" +
          "n c #121A44\n" +
          "o c #26357D\n" +
          "p c #18245D\n" +
          "q c #1A152C\n" +
          "r c #412D49\n" +
          "s c #20204A\n" +
          "t c #39232F\n" +
          "u c #312747\n" +
          "v c #221D3C\n" +
          "w c #2A1C2E\n" +
          "x c #3B2838\n" +
          "y c #4A5478\n" +
          "z c #FF5848\n" +
          "A c #FF5C76\n" +
          "B c #FF68A8\n" +
          "C c #FF80D6\n" +
          "D c #FFFFFF\n" +
          "accccclllllllllllll\n" +
          "oipdkhhnneeejjjjjjj\n" +
          "oipdkhnneejjjjjjjjj\n" +
          "opdkhhnejjjgggggggg\n" +
          "fpdkhneejgggmmmmmmm\n" +
          "fddhneejggmmmbbbbbb\n" +
          "fdkhnejjgmmbbbbbbbb\n" +
          "fdkhnejjgmmbbbbbbbb\n",
        mid: [
          "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb",
          "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb", "fdkhnejjgmmbbbbbbbb",
        ],
        bot: "aggggggggggmmmmmmmm",
      },
      {
        w: 18,
        top: "! XPM2\n" +
          "18 16 30 1\n" +
          "a c #000000\n" +
          "b c #0B0D24\n" +
          "c c #30418E\n" +
          "d c #162057\n" +
          "e c #11183D\n" +
          "f c #243379\n" +
          "g c #0E102F\n" +
          "h c #141C4A\n" +
          "i c #1A2662\n" +
          "j c #101436\n" +
          "k c #151E50\n" +
          "l c #30408A\n" +
          "m c #0C0F29\n" +
          "n c #121A44\n" +
          "o c #26357D\n" +
          "p c #18245D\n" +
          "q c #1A152C\n" +
          "r c #412D49\n" +
          "s c #20204A\n" +
          "t c #39232F\n" +
          "u c #312747\n" +
          "v c #221D3C\n" +
          "w c #2A1C2E\n" +
          "x c #3B2838\n" +
          "y c #4A5478\n" +
          "z c #FF5848\n" +
          "A c #FF5C76\n" +
          "B c #FF68A8\n" +
          "C c #FF80D6\n" +
          "D c #FFFFFF\n" +
          "llllllllllllccccca\n" +
          "jjjjjjeeennhhkdpio\n" +
          "jjjjjjjjeennhkdpio\n" +
          "gggggggjjjenhhkdpo\n" +
          "mmmmmmgggjeenhkdpf\n" +
          "bbbbbmmmggjeenhddf\n" +
          "bbbbbbbmmgjjenhkdf\n" +
          "bbbbbbbmmgjjenhkdf\n",
        mid: [
          "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf",
          "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf", "bbbbbbbmmgjjenhkdf",
        ],
        bot: "mmmmmmmgggggggggga",
      },
    ],
  },
  // the light under the line: per look, for each of the line's columns the letters of the pixels under a
  // line on row 8, 9, ... 13, one after another (6 + 5 + ... + 1)
  glow: {
    up: [
      "ryuAvsryuvsruAsruvyvu", "ryAvsByuAvByuvsyAsuvA", "yuAsBwyAvswuAsBuvBAsv", "uAvsBtuAsBwuvswAswABs",
      "uAsBwtuvswtAvBtAswvws", "AvswtzAvBwzAswzvBtvwB", "AvBwtxAsBtzvswzvBzstB", "vsBwzxvswtxvBtxswzstw",
      "vswtzqvBwzxsBtxswxBzw", "vBwtxqsBtzqswzqstxBzt", "sBwzxqsBtxqswzqBtxBxt", "sBwzxqsBtxqswzqBtxBxt",
      "sBwzxqsBtxqswzqBtxBxt", "sBwzxqsBtxqswzqBtxBxt", "sBwzxqsBtxqswzqBtxBxt", "sBwzxqsBtxqswzqBtxBxt",
      "sBwzxqsBtxqswzqBtxBxt", "sBwzxqsBtxqswzqBtxBxt", "sBwzxqsBtxqswzqBtxBxt", "sBwzxqsBtxqswzqBtxBxt",
      "sBwzxqsBtxqswzqBtxBxt", "sBwzxqsBtxqswzqBtxBxt", "sBwzxqsBtxqswzqBtxBxt", "vBwtxqsBtzqswzqstxBzt",
      "vswtzqvBwzxsBtxswxBzw", "vsBwzxvswtxvBtxswzstw", "AvBwtxAsBtzvswzvBzstB", "AvswtzAvBwzAswzvBtvwB",
      "uAsBwtuvswtAvBtAswvws", "uAvsBtuAsBwuvswAswABs", "yuAsBwyAvswuAsBuvBAsv", "ryAvsByuAvByuvsyAsuvA",
      "ryuAvsryuvsruAsruvyvu",
    ],
    down: [
      "rrvxxurrxxurvxurxurxx", "rvvxuzrvxuzrvuuvxuvux", "vvABzzvvBuzvAuzvBzvuB", "vABBztvABztvAzzvBzAzB",
      "vABzztvABztABztABtAzB", "AAsztyABztyAswtAztBtz", "AsswtyAswtyAstyswystw", "AswwyyAswtysstyswystw",
      "sswtyqsswyqswtqswysyw", "sswtyqswwyqswyqswywyw", "sswyyqswwyqswyqswqwyw", "swwyqqswwyqswyqswqwyw",
      "swwyqqswwyqswyqswqwyw", "swwyqqswwyqswyqswqwyw", "swwyqqswwyqswyqswqwyw", "swwyqqswwyqswyqswqwyw",
      "swwyqqswwyqswyqswqwyw", "swwyqqswwyqswyqswqwyw", "swwyqqswwyqswyqswqwyw", "swwyqqswwyqswyqswqwyw",
      "swwyqqswwyqswyqswqwyw", "swwyqqswwyqswyqswqwyw", "sswyyqswwyqswyqswqwyw", "sswtyqswwyqswyqswywyw",
      "sswtyqsswyqswtqswysyw", "AswwyyAswtysstyswystw", "AsswtyAswtyAstyswystw", "AAsztyABztyAswtAztBtz",
      "vABzztvABztABztABtAzB", "vABBztvABztvAzzvBzAzB", "vvABzzvvBuzvAuzvBzvuB", "rvvxuzrvxuzrvuuvxuvux",
      "rrvxxurrxxurvxurxurxx",
    ],
    shut: [
      "rryuwwryyuwryuwrywyuy", "ryuwwsryuwByuwByuBywu", "yuwBssyuwBsyuBsuwsuBw", "uwwBxzuwBsxuwsxuBxwsB",
      "uwBsxzuBsxzwBszwszBxs", "wBsxztwBsztwsxtBszBzs", "wBxztvBsxzvBsztBxtszx", "BsxztvBsztvBxzvszvstz",
      "BxztvAsxztAsxtvszvxtz", "sxztvAsxtvAsztAxtvxvt", "sxztAqsxtvqxzvAxtAxvt", "sxztAqsxtvqxzvAxtAxvt",
      "sxztAqsxtvqxzvAxtAxvt", "sxztAqsxtvqxzvAxtAxvt", "sxztAqsxtvqxzvAxtAxvt", "sxztAqsxtvqxzvAxtAxvt",
      "sxztAqsxtvqxzvAxtAxvt", "sxztAqsxtvqxzvAxtAxvt", "sxztAqsxtvqxzvAxtAxvt", "sxztAqsxtvqxzvAxtAxvt",
      "sxztAqsxtvqxzvAxtAxvt", "sxztAqsxtvqxzvAxtAxvt", "sxztAqsxtvqxzvAxtAxvt", "sxztvAsxtvAsztAxtvxvt",
      "BxztvAsxztAsxtvszvxtz", "BsxztvBsztvBxzvszvstz", "wBxztvBsxzvBsztBxtszx", "wBsxztwBsztwsxtBszBzs",
      "uwBsxzuBsxzwBszwszBxs", "uwwBxzuwBsxuwsxuBxwsB", "yuwBssyuwBsyuBsuwsuBw", "ryuwwsryuwByuwByuBywu",
      "rryuwwryyuwryuwrywyuy",
    ],
    extu: [
      "rrvvssrrvssrvvsrvsrsv", "rrvvssrrvssrvvsrvsrsv", "rrvvsurvvssrvssrvsvsv", "xxxuuuxxuuuxxuuxuuxuu",
      "xxxuuuxxuuuxxuuxuuxuu", "xxtuuqxxuuqxtuqxuuxuu", "xtwwqqxtwwqttwqtwqtww", "ttwwqqttwwqttwqtwqtww",
      "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw",
      "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw",
      "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw",
      "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw",
      "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwwqttwqtwqtww", "xtwwqqxtwwqttwqtwqtww", "xxtuuqxxuuqxtuqxuuxuu",
      "xxxuuuxxuuuxxuuxuuxuu", "xxxuuuxxuuuxxuuxuuxuu", "rrvvsurvvssrvssrvsvsv", "rrvvssrrvssrvvsrvsrsv",
      "rrvvssrrvssrvvsrvsrsv",
    ],
    extd: [
      "rruussrrussruusrusrsu", "rruussrrussruusrusrsu", "rruussrrussruvsrusrsu", "xxxvvvxxuvvxxvvxuvxvu",
      "xxxvvvxxvvvxxvvxvvxvv", "xxtvvqxxwvqxtvqxwvxvw", "xtwwqqxtwqqxtwqtwqtqw", "xtwwqqttwqqttwqtwqtqw",
      "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw",
      "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw",
      "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw",
      "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw", "ttwwqqttwqqtwwqtwqtqw",
      "ttwwqqttwqqtwwqtwqtqw", "xtwwqqttwqqttwqtwqtqw", "xtwwqqxtwqqxtwqtwqtqw", "xxtvvqxxwvqxtvqxwvxvw",
      "xxxvvvxxvvvxxvvxvvxvv", "xxxvvvxxuvvxxvvxuvxvu", "rruussrrussruvsrusrsu", "rruussrrussruusrusrsu",
      "rruussrrussruusrusrsu",
    ],
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
  // widths of the digits (and of K and M) of the font `normal`
  normal: { "0": 5, "1": 5, "2": 5, "3": 5, "4": 5, "5": 5, "6": 5, "7": 5, "8": 5, "9": 5, K: 5, M: 7 },
};

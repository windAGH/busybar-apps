# Stocks

Stock, index, crypto and currency prices on your BUSY Bar, one ticker at a time.

## What you see

- On the left, the ticker and its price. On the right, a box in the colour of the day: the change in percent, a small arrow that nods the way the price is going, and the line of the day.
- **Rising**: a green box, arrow up. **Falling**: a red box, arrow down. **Market closed**: a slate box without an arrow, with the change and the line of the last session.
- **Before the opening and after the close**: while a stock trades in its pre-market or after-hours session, the box turns night blue with a small sun or moon. The day's line goes quiet and the part that belongs to the session runs in colour: green turning blue for a rise, red turning pink for a fall. The price is the session's, and the change is counted from the last regular price.
- Prices keep the decimals their market quotes them in and get shorter when they are long: 355.58, 1234.5, 98848, 123.4K.
- When a market is open but its numbers are more than 15 minutes old, the percentage, the arrow and the line go faint until fresh numbers arrive.

## Controls

- **Wheel**: the next or the previous ticker, at once.
- **OK**: stay on this ticker, or take turns again. Two small bars in the top left corner show that it stays.
- **Start**: what the box covers: today, 5 days, 1 month, then today again. The name of the span (1D, 5D, 1M) shows for a second; the percentage, the line and the colour are then for that span.
- **Back**: exit.

## Settings

- **Stocks**: up to 8 symbols as Yahoo Finance writes them, separated by commas. Shares: AAPL, BRK-B, 7203.T. Crypto: BTC-USD. Indexes: ^GSPC. Currencies: EURUSD=X. By default AAPL, TSLA, NVDA and BTC-USD.
- **Time per stock**: Short 4 s, Normal 6 s, Long 10 s.
- **Colours**: Green up, or Red up (a rise is red and a fall is green, as in East Asia).

A change applies within 10 seconds; no restart is needed.

## Data and privacy

- Quotes come from Yahoo Finance's public chart endpoint (query1.finance.yahoo.com, then query2.finance.yahoo.com). When neither answers, CNBC's public quote (quote.cnbc.com) fills in, and after it Tencent's public quote (qt.gtimg.cn), for places where the others cannot be reached. These two give the price and the day's change, but no line and no 5-day or 1-month span. Tencent's is asked only for shares and funds listed in the United States, Hong Kong (0700.HK), Shanghai (600519.SS) and Shenzhen (000001.SZ) and for ^GSPC, ^DJI, ^IXIC and ^HSI; it shows the regular session only.
- These are unofficial endpoints. They need no key and no account, and they can be rate-limited or change without notice. Quotes may be delayed. This is not investment advice.
- Each symbol is asked for once a minute while it trades (the extended sessions included) and every 10 minutes while its market is closed. The overnight session is not in these feeds.
- The app sends no personal data: only the ticker symbols you entered go to those services. On the bar it keeps one small file with a count of failed requests.
- This app is not affiliated with or endorsed by Yahoo, CNBC or Tencent.

## Without a connection

- Nothing changes on screen: the last numbers and colours stay, and the app asks again after 30 seconds, a minute, then every 2 minutes.
- A symbol that never had numbers shows -- for its price and says why in the box: not found / see Setup when no source knows the symbol, no data / retrying when no source answered.

### Volatility Indicators

Volatility indicators measure the rate of movement regardless of its direction.

- [Acceleration Bands](#acceleration-bands)
- [Actual True Range (ATR)](#actual-true-range-atr)
- [Bollinger Band Width](#bollinger-band-width)
- [Bollinger Bands](#bollinger-bands)
- [Chandelier Exit](#chandelier-exit)
- [Moving Standard Deviation (Std)](#moving-standard-deviation-std)
- [Projection Oscillator (PO)](#projection-oscillator-po)

#### Acceleration Bands

The [accelerationBands](./accelerationBands.ts) plots upper and lower envelope bands around a simple moving average.

```
Upper Band = SMA(High * (1 + 4 * (High - Low) / (High + Low)))
Middle Band = SMA(Closing)
Lower Band = SMA(Low * (1 + 4 * (High - Low) / (High + Low)))
```

```TypeScript
import {accelerationBands} from 'indicatorts';

const result = accelerationBands(highs, lows, closings);
```

#### Actual True Range (ATR)

The [atr](./atr.ts) function calculates a technical analysis indicator that measures market volatility by decomposing the entire range of stock prices for that period.

```
TR = Max((High - Low), (High - Closing), (Closing - Low))
ATR = 14-Period SMA TR
```

```TypeScript
import {atr} from 'indicatorts';

const result = atr(period, highs, lows, closings);
```

#### Bollinger Bands

The [bollingerBands](./bollingerBands.ts) function calculates the bollinger bands, middle band, upper band, lower band, provides identification of when a stock is oversold or overbought.

```
Middle Band = 20-Period SMA.
Upper Band = 20-Period SMA + 2 (20-Period Std)
Lower Band = 20-Period SMA - 2 (20-Period Std)
```

```TypeScript
import {bollingerBands} from 'indicatorts';

const result = bollingerBands(closings);
```

#### Bollinger Band Width

The [bollingerBandsWidth](./bollingerBandsWidth.ts) function measures the percentage difference between the upper band and the lower band. It decreases as Bollinger Bands narrows and increases as Bollinger Bands widens.

During a period of rising price volatility the band width widens, and during a period of low market volatility band width contracts.

```
Band Width = (Upper Band - Lower Band) / Middle Band
```

```TypeScript
import {bollingerBandsWidth} from 'indicatorts';

const result = bollingerBandsWidth(bollingerBandsResult);
```

#### Chandelier Exit

The [chandelierExit](https://pkg.go.dev/github.com/cinar/indicator#ChandelierExit) function sets a trailing stop-loss based on the Average True Value (ATR).

```
Chandelier Exit Long = 22-Period SMA High - ATR(22) * 3
Chandelier Exit Short = 22-Period SMA Low + ATR(22) * 3
```

```TypeScript
import {chandelierExit} from 'indicatorts';

const result = chandelierExit(highs, lows, closings);
```

#### Moving Standard Deviation (Std)

The [mstd](./mstd.ts) function calculates the moving standard deviation for a given period.

```TypeScript
import {mstd} from 'indicatorts';

const result = mstd(period, values);
```

#### Projection Oscillator (PO)

The [projectionOscillator](./projectionOscillator.ts) calculates the Projection Oscillator (PO). The PO uses the linear regression slope, along with highs and lows.

Period defines the moving window to calculates the PO, and the smooth period defines the moving windows to take EMA of PO.

```
PL = Min(period, (high + MLS(period, x, high)))
PU = Max(period, (low + MLS(period, x, low)))
PO = 100 * (Closing - PL) / (PU - PL)
SPO = EMA(smooth, PO)
```

```TypeScript
import {projectionOscillator} from 'indicatorts';

const result = projectionOscillator(period, smooth, highs, lows, closings);
```

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

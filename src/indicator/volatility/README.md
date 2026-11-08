# Volatility Indicators

Volatility indicators measure the rate of movement regardless of its direction.

**NOTE:** All configuration objects for all indicators are optional. If no configuration object is passed, the default configuration will be used. Likewise, you may also partially pass a configuration object, and the default values will be used for the missing properties.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [ab](#ab)
- [hv](#hv)
- [ahv](#ahv)
- [tr](#tr)
- [atr](#atr)
- [mstd](#mstd)
- [bb](#bb)
- [bbw](#bbw)
- [ce](#ce)
- [chop](#chop)
- [dc](#dc)
- [kc](#kc)
- [percentB](#percentb)
- [po](#po)
- [superTrend](#supertrend)
- [ui](#ui)
- [zScore](#zscore)

### ab

Acceleration Bands. Plots upper and lower envelope bands
around a simple moving average.

```
Upper Band = SMA(High * (1 + 4 * (High - Low) / (High + Low)))
Middle Band = SMA(Closing)
Lower Band = SMA(Low * (1 - 4 * (High - Low) / (High + Low)))
```

| Function | Type                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| `ab`     | `(highs: number[], lows: number[], closings: number[], config?: ABConfig) => ABResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { ab } from 'indicatorts';

const defaultConfig = { period: 20, multiplier: 4 };
const { upper, middle, lower } = ab(highs, lows, closings, defaultConfig);

// Alternatively:
// const { upper, middle, lower } = accelerationBands(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/accelerationBands.ts#L66)

### hv

Historical Volatility (HV). It is the population standard deviation of
the one-bar returns over `period` bars.

```
R[i] = (Close[i] / Close[i-1]) - 1
HV = StdDev(R, period)
```

Warm-up: the first `period` values are NaN.

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `hv`     | `(closings: number[], config?: HVConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { hv } from 'indicatorts';

const defaultConfig = { period: 21 };
const result = hv(closings, defaultConfig);

// Alternatively:
// const result = historicalVolatility(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/historicalVolatility.ts#L45)

### ahv

Annualized Historical Volatility (AHV). It scales the historical
volatility of daily returns to a year by the square root of the number
of trading days in a year.

```
AHV = HV(closings, period) * Sqrt(tradingDaysPerYear)
```

Warm-up: the first `period` values are NaN.

| Function | Type                                                   |
| -------- | ------------------------------------------------------ |
| `ahv`    | `(closings: number[], config?: AHVConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { ahv } from 'indicatorts';

const defaultConfig = { period: 21, tradingDaysPerYear: 252 };
const result = ahv(closings, defaultConfig);

// Alternatively:
// const result = annualizedHistoricalVolatility(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/annualizedHistoricalVolatility.ts#L47)

### tr

True Range (TR).

```
TR = Max((High - Low), Abs(High - Closing[-1]), Abs(Low - Closing[-1]))
```

| Function | Type                                                                |
| -------- | ------------------------------------------------------------------- |
| `tr`     | `(highs: number[], lows: number[], closings: number[]) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.

Examples:

```TypeScript
import { tr } from 'indicatorts';

const result = tr(highs, lows, closings);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/trueRange.ts#L30)

### atr

Average True Range (ATR). It is a technical analysis indicator that
measures market volatility by decomposing the entire range of stock
prices for that period.

```
TR = Max((High - Low), Abs(High - Previous Closing), Abs(Low - Previous Closing))
ATR = RMA TR (Wilder's smoothing)
```

Warm-up: the first bar's true range is its high minus its low (there is
no previous closing), and it is part of the first averaging window, so
every index has a value. TA-Lib starts from the second bar and leaves the
first `period` results empty, so the early values differ and converge over
the following bars. Set `seed: 'sma'` to start
the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                                                     |
| -------- | ---------------------------------------------------------------------------------------- |
| `atr`    | `(highs: number[], lows: number[], closings: number[], config?: ATRConfig) => ATRResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { atr } from 'indicatorts';

const defaultConfig = { period: 14 };
const { trLine, atrLine } = atr(highs, lows, closings, defaultConfig);

// Alternatively:
// const { trLine, atrLine } = averageTrueRange(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/averageTrueRange.ts#L69)

### mstd

Moving strandard deviation function.

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `mstd`   | `(values: number[], config?: MSTDConfig) => number[]` |

Parameters:

- `values`: value array.
- `config`: configuration.

Examples:

```TypeScript
import { mstd } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = mstd(values, defaultConfig);

// Alternatively:
// const result = movingStandardDeviation(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/movingStandardDeviation.ts#L37)

### bb

Bollinger Bands.

```
Middle Band = 20-Period SMA.
Upper Band = 20-Period SMA + 2 (20-Period Std)
Lower Band = 20-Period SMA - 2 (20-Period Std)
```

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `bb`     | `(closings: number[], config?: BBConfig) => BBResult` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { bb } from 'indicatorts';

const defaultConfig = { period: 20 };
const { upper, middle, lower } = bb(closings, defaultConfig);

// Alternatively:
// const { upper, middle, lower } = bollingerBands(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/bollingerBands.ts#L54)

### bbw

Bollinger Band Width. It measures the percentage difference between the
upper band and the lower band. It decreases as Bollinger Bands narrows
and increases as Bollinger Bands widens

During a period of rising price volatity the band width widens, and
during a period of low market volatity band width contracts.

```
Band Width = (Upper Band - Lower Band) / Middle Band
```

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                              |
| -------- | ------------------------------------------------- |
| `bbw`    | `(bb: BBResult, config?: BBWConfig) => BBWResult` |

Parameters:

- `bb`: bollinger bands.
- `config`: configuration.

Examples:

```TypeScript
import { bb, bbw } from 'indicatorts';

const bbResult = bb(closings);

const defaultConfig = { period: 90 };
const { width, widthEma } = bbw(bbResult, defaultConfig);

// Alternatively:
// const { width, widthEma } = bollingerBandsWidth(bbResult, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/bollingerBandsWidth.ts#L62)

### ce

Chandelier Exit. It sets a trailing stop-loss based on the
Average True Range (ATR).

```
Chandelier Exit Long = 22-Period Highest High - ATR(22) * 3
Chandelier Exit Short = 22-Period Lowest Low + ATR(22) * 3
```

Warm-up: built on the average true range, which includes the first bar
in its first averaging window, so the early values can differ from other
libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| `ce`     | `(highs: number[], lows: number[], closings: number[], config?: CEConfig) => CEResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { ce } from 'indicatorts';

const defaultConfig = { period: 22 };
const { long, short } = ce(highs, lows, closings, defaultConfig);

// Alternatively:
// const { long, short } = chandelierExit(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/chandelierExit.ts#L60)

### chop

Choppiness Index (CHOP). It compares the sum of the true ranges over
`period` bars with the range from the highest high to the lowest low
over the same bars, on a logarithmic 0 to 100 scale. Values near 100
come from many overlapping bars and values near 0 from bars that extend
the range in one direction.

```
CHOP = 100 * Log10(Sum(TR, period) / (Max(High, period) - Min(Low, period))) / Log10(period)
```

The true range uses the previous close, so it starts at the second bar.
A window without a range (highest high equal to lowest low) is 0.

Warm-up: the first `period` values are NaN.

| Function | Type                                                                                     |
| -------- | ---------------------------------------------------------------------------------------- |
| `chop`   | `(highs: number[], lows: number[], closings: number[], config?: CHOPConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { chop } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = chop(highs, lows, closings, defaultConfig);

// Alternatively:
// const result = choppinessIndex(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/choppinessIndex.ts#L59)

### dc

The Donchian Channel (DC) calculates three lines generated by moving average
calculations that comprise an indicator formed by upper and lower bands
around a midrange or median band. The upper band marks the highest
price of an asset while the lower band marks the lowest price of
an asset, and the area between the upper and lower bands
represents the Donchian Channel.

```
Upper Channel = Mmax(closings, { period })
Lower Channel = Mmin(closings, { period })
Middle Channel = (Upper Channel + Lower Channel) / 2
```

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `dc`     | `(closings: number[], config?: DCConfig) => DCResult` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Returns:

dc result.

Examples:

```TypeScript
import { dc } from 'indicatorts';

const defaultConfig = { period: 4 };
const { upper, middle, lower } = dc(closings, defaultConfig);

// Alternatively:
// const { upper, middle, lower } = donchianChannel(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/donchianChannel.ts#L59)

### kc

The Keltner Channel (KC) provides volatility-based bands that are placed
on either side of an asset's price and can aid in determining the
direction of a trend.

```
Middle Line = EMA(period, closings)
Upper Band = EMA(period, closings) + 2 * ATR(period, highs, lows, closings)
Lower Band = EMA(period, closings) - 2 * ATR(period, highs, lows, closings)
```

Warm-up: built on the exponential moving average and the average true
range, which start from the first bar rather than the way TA-Lib does, so
the early values can differ from other libraries. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| `kc`     | `(highs: number[], lows: number[], closings: number[], config?: KCConfig) => KCResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Returns:

kc result.

Examples:

```TypeScript
import { kc } from 'indicatorts';

const defaultConfig = { period: 20 };
const { upper, middle, lower } = kc(highs, lows, closings, defaultConfig);

// Alternatively:
// const { upper, middle, lower } = keltnerChannel(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/keltnerChannel.ts#L62)

### percentB

Percent B (%B). It is the position of the close between the lower and
the upper Bollinger Band, on a 0 to 1 scale: 0 at the lower band and 1 at
the upper band.

```
Middle = SMA(closings, period)
Upper = Middle + 2 * StdDev(closings, period)
Lower = Middle - 2 * StdDev(closings, period)
%B = (Close - Lower) / (Upper - Lower)
```

The standard deviation is the population standard deviation. When every
close in the window is equal, the bands meet and %B is 0.5.

Warm-up: the first `period - 1` values are NaN.

| Function   | Type                                                        |
| ---------- | ----------------------------------------------------------- |
| `percentB` | `(closings: number[], config?: PercentBConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { percentB } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = percentB(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/percentB.ts#L48)

### po

ProjectionOscillator calculates the Projection Oscillator (PO). The PO
uses the linear regression slope, along with highs and lows.

Period defines the moving window to calculates the PO, and the smooth
period defines the moving windows to take EMA of PO.

Each high (and low) in the window is projected forward to the current
bar along the slope of the moving linear regression of the highs (and
lows), obtained through the least squares method.

```
PU = Max(High[i - k] + k * Slope(period, high)) for k = 0 .. period - 1
PL = Min(Low[i - k] + k * Slope(period, low)) for k = 0 .. period - 1
PO = 100 * (Closing - PL) / (PU - PL)
SPO = EMA(smooth, PO)
```

Since the current high and low are part of the window, PO stays within
0 to 100. When PU equals PL, PO is 50.

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| `po`     | `(highs: number[], lows: number[], closings: number[], config?: POConfig) => POResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { po } from 'indicatorts';

const defaultConfig = { period: 14, smooth: 3 };
const { poResult, spoResult } = po(highs, lows, closings, defaultConfig);

// Alternatively:
// const { poResult, spoResult } = projectionOscillator(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/projectionOscillator.ts#L73)

### superTrend

Super Trend. It places bands at a multiple of the average true range
above and below the median price. The upper band only moves down and the
lower band only moves up, unless the previous close crossed them, and the
result follows one band until the close crosses it, then switches to the
other.

```
ATR = HMA(TR, period)
BasicUpper = (High + Low) / 2 + multiplier * ATR
BasicLower = (High + Low) / 2 - multiplier * ATR
FinalUpper = BasicUpper if BasicUpper < previous FinalUpper or previous Close > previous FinalUpper,
             else previous FinalUpper
FinalLower = BasicLower if BasicLower > previous FinalLower or previous Close < previous FinalLower,
             else previous FinalLower
Following the upper band: Super Trend = FinalUpper while Close <= FinalUpper, else switch to FinalLower
Following the lower band: Super Trend = FinalLower while Close >= FinalLower, else switch to FinalUpper
```

The average true range is smoothed with the Hull Moving Average, as in the
Go version of this library, and starts at the first full window. The
first value follows the lower band.

Warm-up: the first `period + round(sqrt(period)) - 1` values are NaN.

| Function     | Type                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------- |
| `superTrend` | `(highs: number[], lows: number[], closings: number[], config?: SuperTrendConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { superTrend } from 'indicatorts';

const defaultConfig = { period: 14, multiplier: 2.5 };
const result = superTrend(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/superTrend.ts#L62)

### ui

The Ulcer Index (UI) measures downside risk. The index increases in value
as the price moves farther away from a recent high and falls as the price
rises to new highs.

```
High Closings = Max(period, Closings)
Percentage Drawdown = 100 * ((Closings - High Closings) / High Closings)
Squared Average = Sma(period, Percent Drawdown * Percent Drawdown)
Ulcer Index = Sqrt(Squared Average)
```

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `ui`     | `(closings: number[], config?: UIConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Returns:

ui values.

Examples:

```TypeScript
import { ui } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = ulcerIndex(closings, defaultConfig);

// Alternatively:
// const result = ulcerIndex(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/ulcerIndex.ts#L54)

### zScore

Z-Score. It is the number of standard deviations the value is from its
simple moving average over `period` bars.

```
Z-Score = (Value - SMA(values, period)) / StdDev(values, period)
```

The standard deviation is the population standard deviation. When every
value in the window is equal, the Z-Score is 0.

Warm-up: the first `period - 1` values are NaN.

| Function | Type                                                    |
| -------- | ------------------------------------------------------- |
| `zScore` | `(values: number[], config?: ZScoreConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { zScore } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = zScore(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/zScore.ts#L44)

## Constants

- [ABDefaultConfig](#abdefaultconfig)
- [HVDefaultConfig](#hvdefaultconfig)
- [AHVDefaultConfig](#ahvdefaultconfig)
- [ATRDefaultConfig](#atrdefaultconfig)
- [MSTDDefaultConfig](#mstddefaultconfig)
- [BBDefaultConfig](#bbdefaultconfig)
- [BBWDefaultConfig](#bbwdefaultconfig)
- [CEDefaultConfig](#cedefaultconfig)
- [CHOPDefaultConfig](#chopdefaultconfig)
- [DCDefaultConfig](#dcdefaultconfig)
- [KCDefaultConfig](#kcdefaultconfig)
- [PercentBDefaultConfig](#percentbdefaultconfig)
- [PODefaultConfig](#podefaultconfig)
- [SuperTrendDefaultConfig](#supertrenddefaultconfig)
- [UIDefaultConfig](#uidefaultconfig)
- [ZScoreDefaultConfig](#zscoredefaultconfig)

### ABDefaultConfig

The default configuration of acceleration bands.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `ABDefaultConfig` | `Required<ABConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/accelerationBands.ts#L35)

### HVDefaultConfig

The default configuration of Historical Volatility.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `HVDefaultConfig` | `Required<HVConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/historicalVolatility.ts#L16)

### AHVDefaultConfig

The default configuration of Annualized Historical Volatility.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `AHVDefaultConfig` | `Required<AHVConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/annualizedHistoricalVolatility.ts#L17)

### ATRDefaultConfig

The default configuration of ATR.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `ATRDefaultConfig` | `Required<ATRConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/averageTrueRange.ts#L31)

### MSTDDefaultConfig

The default configuration of MSTD.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `MSTDDefaultConfig` | `Required<MSTDConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/movingStandardDeviation.ts#L16)

### BBDefaultConfig

The default configuration of Bollinger bands.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `BBDefaultConfig` | `Required<BBConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/bollingerBands.ts#L27)

### BBWDefaultConfig

The default configuration of Bollinger bands width.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `BBWDefaultConfig` | `Required<BBWConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/bollingerBandsWidth.ts#L26)

### CEDefaultConfig

The default configuration of Chandelier exit.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `CEDefaultConfig` | `Required<CEConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/chandelierExit.ts#L27)

### CHOPDefaultConfig

The default configuration of Choppiness Index.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `CHOPDefaultConfig` | `Required<CHOPConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/choppinessIndex.ts#L23)

### DCDefaultConfig

The default configuration of DC.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `DCDefaultConfig` | `Required<DCConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/donchianChannel.ts#L27)

### KCDefaultConfig

The default configuration of KC.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `KCDefaultConfig` | `Required<KCConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/keltnerChannel.ts#L27)

### PercentBDefaultConfig

The default configuration of %B.

| Constant                | Type                       |
| ----------------------- | -------------------------- |
| `PercentBDefaultConfig` | `Required<PercentBConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/percentB.ts#L16)

### PODefaultConfig

The default configuration of PO.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `PODefaultConfig` | `Required<POConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/projectionOscillator.ts#L27)

### SuperTrendDefaultConfig

The default configuration of Super Trend.

| Constant                  | Type                         |
| ------------------------- | ---------------------------- |
| `SuperTrendDefaultConfig` | `Required<SuperTrendConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/superTrend.ts#L19)

### UIDefaultConfig

The default configuration of UI.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `UIDefaultConfig` | `Required<UIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/ulcerIndex.ts#L24)

### ZScoreDefaultConfig

The default configuration of Z-Score.

| Constant              | Type                     |
| --------------------- | ------------------------ |
| `ZScoreDefaultConfig` | `Required<ZScoreConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/zScore.ts#L16)

## Interfaces

- [ABResult](#abresult)
- [ABConfig](#abconfig)
- [HVConfig](#hvconfig)
- [AHVConfig](#ahvconfig)
- [ATRResult](#atrresult)
- [ATRConfig](#atrconfig)
- [MSTDConfig](#mstdconfig)
- [BBResult](#bbresult)
- [BBConfig](#bbconfig)
- [BBWResult](#bbwresult)
- [BBWConfig](#bbwconfig)
- [CEResult](#ceresult)
- [CEConfig](#ceconfig)
- [CHOPConfig](#chopconfig)
- [DCResult](#dcresult)
- [DCConfig](#dcconfig)
- [KCResult](#kcresult)
- [KCConfig](#kcconfig)
- [PercentBConfig](#percentbconfig)
- [POResult](#poresult)
- [POConfig](#poconfig)
- [SuperTrendConfig](#supertrendconfig)
- [UIConfig](#uiconfig)
- [ZScoreConfig](#zscoreconfig)

### ABResult

Acceleration bands result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `upper`  | `number[]` |             |
| `middle` | `number[]` |             |
| `lower`  | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/accelerationBands.ts#L18)

### ABConfig

Optional configuration of acceleration bands parameters.

| Property     | Type                  | Description |
| ------------ | --------------------- | ----------- |
| `period`     | `number or undefined` |             |
| `multiplier` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/accelerationBands.ts#L27)

### HVConfig

Optional configuration of Historical Volatility parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/historicalVolatility.ts#L9)

### AHVConfig

Optional configuration of Annualized Historical Volatility parameters.

| Property             | Type                  | Description |
| -------------------- | --------------------- | ----------- |
| `period`             | `number or undefined` |             |
| `tradingDaysPerYear` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/annualizedHistoricalVolatility.ts#L9)

### ATRResult

Average true range result.

| Property  | Type       | Description |
| --------- | ---------- | ----------- |
| `trLine`  | `number[]` |             |
| `atrLine` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/averageTrueRange.ts#L11)

### ATRConfig

Optional configuration of ATR parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `period` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/averageTrueRange.ts#L19)

### MSTDConfig

Optional configuration of MSTD parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/movingStandardDeviation.ts#L9)

### BBResult

Bollinger bands result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `upper`  | `number[]` |             |
| `middle` | `number[]` |             |
| `lower`  | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/bollingerBands.ts#L11)

### BBConfig

Optional configuration of Bollinger bands parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/bollingerBands.ts#L20)

### BBWResult

Bollinger bands width result.

| Property   | Type       | Description |
| ---------- | ---------- | ----------- |
| `width`    | `number[]` |             |
| `widthEma` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/bollingerBandsWidth.ts#L11)

### BBWConfig

Optional configuration of Bollinger bands width parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/bollingerBandsWidth.ts#L19)

### CEResult

Chandelier exit result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `long`   | `number[]` |             |
| `short`  | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/chandelierExit.ts#L12)

### CEConfig

Optional configuration of Chandelier exit parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/chandelierExit.ts#L20)

### CHOPConfig

Optional configuration of Choppiness Index parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/choppinessIndex.ts#L16)

### DCResult

Donchian channel result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `upper`  | `number[]` |             |
| `middle` | `number[]` |             |
| `lower`  | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/donchianChannel.ts#L11)

### DCConfig

Optional configuration of DC parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/donchianChannel.ts#L20)

### KCResult

Keltner channel result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `upper`  | `number[]` |             |
| `middle` | `number[]` |             |
| `lower`  | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/keltnerChannel.ts#L11)

### KCConfig

Optional configuration of KC parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/keltnerChannel.ts#L20)

### PercentBConfig

Optional configuration of %B parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/percentB.ts#L9)

### POResult

Projection oscillator result object.

| Property    | Type       | Description |
| ----------- | ---------- | ----------- |
| `poResult`  | `number[]` |             |
| `spoResult` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/projectionOscillator.ts#L11)

### POConfig

Optional configuration of PO parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |
| `smooth` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/projectionOscillator.ts#L19)

### SuperTrendConfig

Optional configuration of Super Trend parameters.

| Property     | Type                  | Description |
| ------------ | --------------------- | ----------- |
| `period`     | `number or undefined` |             |
| `multiplier` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/superTrend.ts#L11)

### UIConfig

Optional configuration of UI parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/ulcerIndex.ts#L17)

### ZScoreConfig

Optional configuration of Z-Score parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/zScore.ts#L9)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

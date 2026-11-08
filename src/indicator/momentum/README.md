# Momentum Indicators

Momentum indicators measure the speed of movement.

**NOTE:** All configuration objects for all indicators are optional. If no configuration object is passed, the default configuration will be used. Likewise, you may also partially pass a configuration object, and the default values will be used for the missing properties.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [ao](#ao)
- [co](#co)
- [rsi](#rsi)
- [crsi](#crsi)
- [coppockCurve](#coppockcurve)
- [fisher](#fisher)
- [ehlersFisher](#ehlersfisher)
- [elderRay](#elderray)
- [ichimokuCloud](#ichimokucloud)
- [ibs](#ibs)
- [ppo](#ppo)
- [pvo](#pvo)
- [roc](#roc)
- [specialK](#specialk)
- [rvi](#rvi)
- [stoch](#stoch)
- [stochRsi](#stochrsi)
- [tdSequential](#tdsequential)
- [uo](#uo)
- [willr](#willr)

### ao

Awesome Oscillator (AO).

```
Median Price = ((Low + High) / 2).
AO = 5-Period SMA - 34-Period SMA.
```

| Function | Type                                                               |
| -------- | ------------------------------------------------------------------ |
| `ao`     | `(highs: number[], lows: number[], config?: AOConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `config`: configuration.

Examples:

```TypeScript
import { ao } from 'indicatorts';

const defaultConfig =  { fast: 5, slow: 34 };
const result = ao(highs, lows, defaultConfig);

// Alternatively:
// const result = awesomeOscillator(highs, lows, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/awesomeOscillator.ts#L46)

### co

The ChaikinOscillator function measures the momentum of the
Accumulation/Distribution (A/D) using the Moving Average
Convergence Divergence (MACD) formula. It takes the
difference between fast and slow periods EMA of the A/D.

```
CO = Ema(fastPeriod, AD) - Ema(slowPeriod, AD)
```

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------- |
| `co`     | `(highs: number[], lows: number[], closings: number[], volumes: number[], config?: COConfig) => COResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `volumes`: volume values.
- `config`: configuration.

Examples:

```TypeScript
import { co } from 'indicatorts';

const defaultConfig =  { fast: 3, slow: 10 };
const { adResult, coResult } = co(highs, lows, closings, volumes, defaultConfig);

// Alternatively:
// const { adResult, coResult } = chaikinOscillator(highs, lows, closings, volumes, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/chaikinOscillator.ts#L63)

### rsi

Relative Strength Index (RSI). It is a momentum indicator that measures the magnitude of
recent price changes to evaluate overbought and oversold conditions
using the given window period.

```
RS = Average Gain / Average Loss
RSI = 100 - (100 / (1 + RS))
```

Warm-up: the first bar counts as a gain and a loss of 0, so it is part of
the first averaging window, and every index has a value. TA-Lib starts from
the second bar (the first price change) and leaves the first `period`
results empty, so the early values differ and converge over the following
bars. Set `seed: 'sma'` to start
the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                   |
| -------- | ------------------------------------------------------ |
| `rsi`    | `(closings: number[], config?: RSIConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { rsi } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = rsi(closings, defaultConfig);

// Alternatively:
// const result = relativeStrengthIndex(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeStrengthIndex.ts#L58)

### crsi

Connors RSI (CRSI). It averages three components: the RSI of the
closings, the RSI of the up/down streak length, and the percent rank of
the one-bar rate of change.

```
Streak = consecutive closes up (+1, +2, ...) or down (-1, -2, ...), 0 when unchanged
PercentRank = percentage of the previous percentRankPeriod - 1 values of ROC(1) below the current ROC(1)
CRSI = (RSI(closings, rsiPeriod) + RSI(Streak, streakRsiPeriod) + PercentRank) / 3
```

Both RSIs start from a simple moving average (`seed: 'sma'`).

Warm-up: the first `max(rsiPeriod, streakRsiPeriod + 1, percentRankPeriod)`
values are NaN.

| Function | Type                                                          |
| -------- | ------------------------------------------------------------- |
| `crsi`   | `(closings: number[], config?: ConnorsRSIConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { crsi } from 'indicatorts';

const defaultConfig = { rsiPeriod: 3, streakRsiPeriod: 2, percentRankPeriod: 100 };
const result = crsi(closings, defaultConfig);

// Alternatively:
// const result = connorsRsi(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/connorsRsi.ts#L81)

### coppockCurve

Coppock Curve. It is a weighted moving average of the sum of two rates
of change, in percent, over different periods.

```
ROC(n) = (Close - Close n periods ago) / Close n periods ago * 100
Coppock Curve = WMA(ROC(rocPeriod1) + ROC(rocPeriod2), wmaPeriod)
```

Warm-up: the first `max(rocPeriod1, rocPeriod2) + wmaPeriod - 1` values
are NaN.

| Function       | Type                                                            |
| -------------- | --------------------------------------------------------------- |
| `coppockCurve` | `(closings: number[], config?: CoppockCurveConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { coppockCurve } from 'indicatorts';

const defaultConfig = { rocPeriod1: 14, rocPeriod2: 11, wmaPeriod: 10 };
const result = coppockCurve(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/coppockCurve.ts#L48)

### fisher

Fisher Transform. It maps the position of the close within the range of
the last `period` closings to the -1 to 1 scale and applies the Fisher
transform to it, which spreads values near the ends of the range apart.

```
x = 2 * ((Close - Min(Close, period)) / (Max(Close, period) - Min(Close, period))) - 1
Fisher = 0.5 * ln((1 + x) / (1 - x))
```

`x` is clamped to -0.999 to 0.999. This is the simplified, non-recursive
form on the closings; `ehlersFisher` is the recursive form that John
Ehlers published, on the median price. A window whose closings are all
equal has no range, and its value is NaN.

Warm-up: the first `period - 1` values are NaN.

| Function | Type                                                      |
| -------- | --------------------------------------------------------- |
| `fisher` | `(closings: number[], config?: FisherConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { fisher } from 'indicatorts';

const defaultConfig = { period: 10 };
const result = fisher(closings, defaultConfig);

// Alternatively:
// const result = fisherTransform(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/fisherTransform.ts#L57)

### ehlersFisher

Ehlers Fisher Transform. It is the Fisher transform as John Ehlers
published it ("Using the Fisher Transform", Stocks & Commodities): it
uses the median price and smooths both the normalized price and the
transformed value recursively.

```
Price = (High + Low) / 2
Value1 = 0.33 * 2 * ((Price - Min(Price, period)) / (Max(Price, period) - Min(Price, period)) - 0.5) + 0.67 * Value1[previous]
Fisher = 0.5 * ln((1 + Value1) / (1 - Value1)) * 0.5 + 0.5 * Fisher[previous]
```

`Value1` is clamped to -0.999 to 0.999. The previous `Value1` and
`Fisher` start at 0. A window whose prices are all equal has no range,
and its price is placed at the middle of the range (0.5).

Warm-up: the first `period - 1` values are NaN.

| Function       | Type                                                                         |
| -------------- | ---------------------------------------------------------------------------- |
| `ehlersFisher` | `(highs: number[], lows: number[], config?: EhlersFisherConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `config`: configuration.

Examples:

```TypeScript
import { ehlersFisher } from 'indicatorts';

const defaultConfig = { period: 10 };
const result = ehlersFisher(highs, lows, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ehlersFisher.ts#L52)

### elderRay

Elder-Ray Index. It measures how far the high and the low are from an
exponential moving average of the closings. Alexander Elder named the
two outputs Bull Power and Bear Power.

```
Bull Power = High - EMA(closings, period)
Bear Power = Low - EMA(closings, period)
```

The EMA starts from the simple moving average of the first `period`
closings.

Warm-up: the first `period - 1` values are NaN.

| Function   | Type                                                                                               |
| ---------- | -------------------------------------------------------------------------------------------------- |
| `elderRay` | `(highs: number[], lows: number[], closings: number[], config?: ElderRayConfig) => ElderRayResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { elderRay } from 'indicatorts';

const defaultConfig = { period: 13 };
const { bullPower, bearPower } = elderRay(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/elderRay.ts#L57)

### ichimokuCloud

Ichimoku Cloud. Also known as Ichimoku Kinko Hyo, is a versatile indicator
that describes support and resistance levels, trend direction, and
momentum.

```
Tenkan-sen (Conversion Line) = (9-Period High + 9-Period Low) / 2
Kijun-sen (Base Line) = (26-Period High + 26-Period Low) / 2
Senkou Span A (Leading Span A) = (Conversion Line + Base Line) / 2, conventionally plotted 26 periods in the future
Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2, conventionally plotted 26 periods in the future
Chikou Span (Lagging Span) = Closing plotted 26 periods in the past.
```

All five arrays returned (`tenkan`, `kijun`, `ssa`, `ssb`, `laggingSpan`) are
the same length as the input (`highs`/`lows`/`closings`). `tenkan`, `kijun`,
`ssa` and `ssb` hold each indicator's value as of that bar, using only that
bar and earlier ones. Senkou Span A/B are conventionally _plotted_ `medium`
periods ahead of their bar on a chart, but that forward projection is a
display/rendering concern left to the caller -- it is not baked into the
shape of the returned `ssa`/`ssb` arrays.

`laggingSpan` is already shifted for plotting: `laggingSpan[i]` is the
closing `close` bars _after_ bar i, and the last `close` entries are 0.
Because it contains future closings, it must not be used to generate
signals at bar i; compare `closings[i]` with `closings[i - close]` instead.

| Function        | Type                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `ichimokuCloud` | `(highs: number[], lows: number[], closings: number[], config?: IchimokuCloudConfig) => IchimokuCloudResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { ichimokuCloud } from 'indicatorts';

const defaultConfig = { short: 9, medium: 26, long: 52, close: 26 };
const { tenkan, kijun, ssa, ssb, laggingSpan } = ichimokuCloud(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ichimokuCloud.ts#L202)

### ibs

Internal Bar Strength (IBS). It is the position of the close within the
bar's high-low range, on a 0 to 1 scale: 0 at the low and 1 at the high.

```
IBS = (Close - Low) / (High - Low)
```

A bar without a range (high equal to low) has an IBS of 0.

| Function | Type                                                                |
| -------- | ------------------------------------------------------------------- |
| `ibs`    | `(highs: number[], lows: number[], closings: number[]) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.

Examples:

```TypeScript
import { ibs } from 'indicatorts';

const result = ibs(highs, lows, closings);

// Alternatively:
// const result = internalBarStrength(highs, lows, closings);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/internalBarStrength.ts#L31)

### ppo

Percentage Price Oscillator (PPO). It is a momentum oscillator for the price.
It is used to indicate the ups and downs based on the price. A breakout is
confirmed when PPO is positive.

```
PVO = ((EMA(fastPeriod, prices) - EMA(slowPeriod, prices)) / EMA(longPeriod, prices)) * 100
Signal = EMA(9, PVO)
Histogram = PVO - Signal
```

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `ppo`    | `(prices: number[], config?: PPOConfig) => PPOResult` |

Parameters:

- `prices`: price values.
- `config`: configuration.

Returns:

oscillator result.

Examples:

```TypeScript
import { ppo } from 'indicatorts';

const defaultConfig = { fast: 12, slow: 26, signal: 9 };
const { ppoResult, signal, histogram } = ppo(prices, defaultConfig);

// Alternatively:
// const { ppoResult, signal, histogram } = percentagePriceOscillator(prices, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentagePriceOscillator.ts#L71)

### pvo

Percentage Volume Oscillator (PVO). It is a momentum oscillator for the volume.
It is used to indicate the ups and downs based on the volume. A breakout is
confirmed when PVO is positive.

```
PVO = ((EMA(fastPeriod, volumes) - EMA(slowPeriod, volumes)) / EMA(longPeriod, volumes)) * 100
Signal = EMA(9, PVO)
Histogram = PVO - Signal
```

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                   |
| -------- | ------------------------------------------------------ |
| `pvo`    | `(volumes: number[], config?: PVOConfig) => PVOResult` |

Parameters:

- `volumes`: volume values.
- `config`: configuration.

Returns:

oscillator result.

Examples:

```TypeScript
import { pvo } from 'indicatorts';

const defaultConfig = { fast: 12, slow: 26, signal: 9 };
const { pvoResult, signal, histogram } = pvo(volumes, defaultConfig);

// Alternatively:
// const { pvoResult, signal, histogram } = percentageVolumeOscillator(volumes, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentageVolumeOscillator.ts#L71)

### roc

Price Rate of Change (ROC).

```
ROC[i] = 0 when i < period
ROC[i] = (close[i] / close[i-period] - 1) * 100 when i >= period
```

| Function | Type                                                 |
| -------- | ---------------------------------------------------- |
| `roc`    | `(values: number[], config?: ROCConfig) => number[]` |

Parameters:

- `values`: values array.

Examples:

```TypeScript
import { roc } from 'indicatorts';

const defaultConfig = { period: 3 };
const result = roc(close, defaultConfig);

// Alternatively:
// const result = priceRateOfChange(close, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/priceRateOfChange.ts#L39)

### specialK

Martin Pring's Special K. It is a weighted sum of twelve rates of change,
from 10 to 530 bars, each smoothed with a simple moving average. The
rates of change are ratios, not percentages.

```
ROC(n) = (Close - Close n periods ago) / Close n periods ago
Special K = 1 * SMA(ROC(10), 10)   + 2 * SMA(ROC(15), 10)   + 3 * SMA(ROC(20), 10)   + 4 * SMA(ROC(30), 15)
          + 1 * SMA(ROC(40), 50)   + 2 * SMA(ROC(65), 65)   + 3 * SMA(ROC(75), 75)   + 4 * SMA(ROC(100), 100)
          + 1 * SMA(ROC(195), 130) + 2 * SMA(ROC(265), 130) + 3 * SMA(ROC(390), 130) + 4 * SMA(ROC(530), 195)
```

Warm-up: the first 724 values (530 + 195 - 1) are NaN.

| Function   | Type                               |
| ---------- | ---------------------------------- |
| `specialK` | `(closings: number[]) => number[]` |

Parameters:

- `closings`: closing values.

Examples:

```TypeScript
import { specialK } from 'indicatorts';

const result = specialK(closings);

// Alternatively:
// const result = pringsSpecialK(closings);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/pringsSpecialK.ts#L51)

### rvi

Relative Vigor Index (RVI). It compares the close-to-open move with the
high-low range, both filtered with a 4-bar symmetric FIR filter and
averaged over `period` bars, and adds a simple moving average of the
ratio as the signal line.

```
FIR(x) = (x[i] + 2 * x[i-1] + 2 * x[i-2] + x[i-3]) / 6
RVI = SMA(FIR(Close - Open), period) / SMA(FIR(High - Low), period)
Signal = SMA(RVI, signalPeriod)
```

Warm-up: both outputs are NaN for the first
`3 + period - 1 + signalPeriod - 1` bars.

| Function | Type                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| `rvi`    | `(openings: number[], highs: number[], lows: number[], closings: number[], config?: RVIConfig) => RVIResult` |

Parameters:

- `openings`: opening values.
- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { rvi } from 'indicatorts';

const defaultConfig = { period: 10, signalPeriod: 4 };
const { rvi: rviLine, signal } = rvi(openings, highs, lows, closings, defaultConfig);

// Alternatively:
// const { rvi: rviLine, signal } = relativeVigorIndex(openings, highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeVigorIndex.ts#L77)

### stoch

Stochastic Oscillator. It is a momentum indicator that shows the
location of the closing relative to high-low range over a
set number of periods.

```
K = (Closing - Lowest Low) / (Highest High - Lowest Low) * 100
D = 3-Period SMA of K
```

| Function | Type                                                                                         |
| -------- | -------------------------------------------------------------------------------------------- |
| `stoch`  | `(highs: number[], lows: number[], closings: number[], config?: StochConfig) => StochResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { stoch } from 'indicatorts';

const defaultConfig = { kPeriod: 14, dPeriod: 3 };
const { k, d } = stoch(highs, lows, closings, defaultConfig);

// Alternatively:
// const { k, d } = stochasticOscillator(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/stochasticOscillator.ts#L59)

### stochRsi

Stochastic Relative Strength Index (StochRSI). It places the RSI within
the range of its last `period` values, on a 0 to 1 scale.

```
StochRSI = (RSI - Min(RSI, period)) / (Max(RSI, period) - Min(RSI, period))
```

The RSI uses the same period and starts from a simple moving average
(`seed: 'sma'`). A window whose RSI values are all equal has no range,
and its value is NaN.

Warm-up: the first `2 * period - 1` values are NaN.

| Function   | Type                                                        |
| ---------- | ----------------------------------------------------------- |
| `stochRsi` | `(closings: number[], config?: StochRSIConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { stochRsi } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = stochRsi(closings, defaultConfig);

// Alternatively:
// const result = stochasticRsi(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/stochasticRsi.ts#L49)

### tdSequential

TD Sequential. It counts runs of closes in two phases. TD Sequential® is
a registered trademark of DeMark Analytics, LLC; this is an independent
implementation of the published counting rules for educational and
research purposes, not affiliated with or endorsed by DeMark Analytics.

```
Setup: count consecutive closes below (down) or above (up) the close
       lookback bars before, up to setupPeriod. Any other close resets
       that count to 0.
Countdown: after a setup reaches setupPeriod, count the closes at or
           below (down) or at or above (up) the close countdownLookback
           bars before, up to countdownPeriod. A completed setup in the
           opposite direction cancels the countdown.
```

The bar that completes a countdown reports `countdownPeriod`, and the
count restarts after it. The first `lookback` bars have no earlier close
to compare with and report 0.

| Function       | Type                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| `tdSequential` | `(closings: number[], config?: TDSequentialConfig) => TDSequentialResult` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { tdSequential } from 'indicatorts';

const { downSetup, upSetup, downCountdown, upCountdown } = tdSequential(closings);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/tdSequential.ts#L68)

### uo

Ultimate Oscillator (UO).

```
BP = Closing - Min(Low, Prior Close)
TR = Max(High - Low, Abs(High - Prior Close), Abs(Low - Prior Close))
```

```
Average7 = Sum(BP, 7) / Sum(TR, 7)
Average14 = Sum(BP, 14) / Sum(TR, 14)
Average28 = Sum(BP, 28) / Sum(TR, 28)
```

```
UO = 100 * ((4 * Average7) + (2 * Average14) + Average28) / (4 + 2 + 1)
```

| Function | Type                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| `uo`     | `(highs: number[], lows: number[], closings: number[], config?: UOConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { uo } from 'indicatorts';

const defaultConfig = { shortPeriod: 7, middlePeriod: 14, longPeriod: 28 };
const result = uo(highs, lows, closings, defaultConfig);

// Alternatively:
// const result = ultimateOscillator(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ultimateOscillator.ts#L66)

### willr

Williams R. Determine overbought and oversold.

```
WR = (Highest High - Closing) / (Highest High - Lowest Low) * -100.
```

| Function | Type                                                                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| `willr`  | `(highs: number[], lows: number[], closings: number[], config?: WillrConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { willr } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = willr(highs, lows, closings, defaultConfig);

// Alternatively:
// const result = williamsR(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/williamsR.ts#L45)

## Constants

- [AODefaultConfig](#aodefaultconfig)
- [CODefaultConfig](#codefaultconfig)
- [RSIDefaultConfig](#rsidefaultconfig)
- [ConnorsRSIDefaultConfig](#connorsrsidefaultconfig)
- [CoppockCurveDefaultConfig](#coppockcurvedefaultconfig)
- [FISHER_CLAMP](#fisher_clamp)
- [FisherDefaultConfig](#fisherdefaultconfig)
- [EhlersFisherDefaultConfig](#ehlersfisherdefaultconfig)
- [ElderRayDefaultConfig](#elderraydefaultconfig)
- [IchimokuCloudDefaultConfig](#ichimokuclouddefaultconfig)
- [PPODefaultConfig](#ppodefaultconfig)
- [PVODefaultConfig](#pvodefaultconfig)
- [ROCDefaultConfig](#rocdefaultconfig)
- [RVIDefaultConfig](#rvidefaultconfig)
- [StochDefaultConfig](#stochdefaultconfig)
- [StochRSIDefaultConfig](#stochrsidefaultconfig)
- [TDSequentialDefaultConfig](#tdsequentialdefaultconfig)
- [UODefaultConfig](#uodefaultconfig)
- [WillrDefaultConfig](#willrdefaultconfig)

### AODefaultConfig

The default configuration of AO.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `AODefaultConfig` | `Required<AOConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/awesomeOscillator.ts#L18)

### CODefaultConfig

The default configuration of Chaikin oscillator.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `CODefaultConfig` | `Required<COConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/chaikinOscillator.ts#L27)

### RSIDefaultConfig

The default configuration of RSI.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `RSIDefaultConfig` | `Required<RSIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeStrengthIndex.ts#L22)

### ConnorsRSIDefaultConfig

The default configuration of Connors RSI.

| Constant                  | Type                         |
| ------------------------- | ---------------------------- |
| `ConnorsRSIDefaultConfig` | `Required<ConnorsRSIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/connorsRsi.ts#L19)

### CoppockCurveDefaultConfig

The default configuration of Coppock Curve.

| Constant                    | Type                           |
| --------------------------- | ------------------------------ |
| `CoppockCurveDefaultConfig` | `Required<CoppockCurveConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/coppockCurve.ts#L19)

### FISHER_CLAMP

Bound of the normalized value before the logarithm, which keeps the
transform finite.

| Constant       | Type    |
| -------------- | ------- |
| `FISHER_CLAMP` | `0.999` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/fisherTransform.ts#L10)

### FisherDefaultConfig

The default configuration of Fisher Transform.

| Constant              | Type                     |
| --------------------- | ------------------------ |
| `FisherDefaultConfig` | `Required<FisherConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/fisherTransform.ts#L22)

### EhlersFisherDefaultConfig

The default configuration of Ehlers Fisher Transform.

| Constant                    | Type                           |
| --------------------------- | ------------------------------ |
| `EhlersFisherDefaultConfig` | `Required<EhlersFisherConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ehlersFisher.ts#L18)

### ElderRayDefaultConfig

The default configuration of Elder-Ray.

| Constant                | Type                       |
| ----------------------- | -------------------------- |
| `ElderRayDefaultConfig` | `Required<ElderRayConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/elderRay.ts#L25)

### IchimokuCloudDefaultConfig

The default configuration of Ichimoku cloud.

| Constant                     | Type                            |
| ---------------------------- | ------------------------------- |
| `IchimokuCloudDefaultConfig` | `Required<IchimokuCloudConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ichimokuCloud.ts#L36)

### PPODefaultConfig

The default configuration of PPO.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `PPODefaultConfig` | `Required<PPOConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentagePriceOscillator.ts#L34)

### PVODefaultConfig

The default configuration of PVO.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `PVODefaultConfig` | `Required<PVOConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentageVolumeOscillator.ts#L34)

### ROCDefaultConfig

The default configuration of ROC.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `ROCDefaultConfig` | `Required<ROCConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/priceRateOfChange.ts#L14)

### RVIDefaultConfig

The default configuration of RVI.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `RVIDefaultConfig` | `Required<RVIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeVigorIndex.ts#L26)

### StochDefaultConfig

The default configuration of stochastic oscillator.

| Constant             | Type                    |
| -------------------- | ----------------------- |
| `StochDefaultConfig` | `Required<StochConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/stochasticOscillator.ts#L28)

### StochRSIDefaultConfig

The default configuration of Stochastic RSI.

| Constant                | Type                       |
| ----------------------- | -------------------------- |
| `StochRSIDefaultConfig` | `Required<StochRSIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/stochasticRsi.ts#L17)

### TDSequentialDefaultConfig

The default configuration of TD Sequential.

| Constant                    | Type                           |
| --------------------------- | ------------------------------ |
| `TDSequentialDefaultConfig` | `Required<TDSequentialConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/tdSequential.ts#L31)

### UODefaultConfig

The default configuration of Ultimate Oscillator.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `UODefaultConfig` | `Required<UOConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ultimateOscillator.ts#L26)

### WillrDefaultConfig

The default configuration of Williams R.

| Constant             | Type                    |
| -------------------- | ----------------------- |
| `WillrDefaultConfig` | `Required<WillrConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/williamsR.ts#L18)

## Interfaces

- [AOConfig](#aoconfig)
- [COResult](#coresult)
- [COConfig](#coconfig)
- [RSIConfig](#rsiconfig)
- [ConnorsRSIConfig](#connorsrsiconfig)
- [CoppockCurveConfig](#coppockcurveconfig)
- [FisherConfig](#fisherconfig)
- [EhlersFisherConfig](#ehlersfisherconfig)
- [ElderRayResult](#elderrayresult)
- [ElderRayConfig](#elderrayconfig)
- [IchimokuCloudResult](#ichimokucloudresult)
- [IchimokuCloudConfig](#ichimokucloudconfig)
- [PPOResult](#pporesult)
- [PPOConfig](#ppoconfig)
- [PVOResult](#pvoresult)
- [PVOConfig](#pvoconfig)
- [ROCConfig](#rocconfig)
- [RVIResult](#rviresult)
- [RVIConfig](#rviconfig)
- [StochResult](#stochresult)
- [StochConfig](#stochconfig)
- [StochRSIConfig](#stochrsiconfig)
- [TDSequentialResult](#tdsequentialresult)
- [TDSequentialConfig](#tdsequentialconfig)
- [UOConfig](#uoconfig)
- [WillrConfig](#willrconfig)

### AOConfig

Optional configuration of AO parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `fast`   | `number or undefined` |             |
| `slow`   | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/awesomeOscillator.ts#L10)

### COResult

Chaikin oscillator result object.

| Property   | Type       | Description |
| ---------- | ---------- | ----------- |
| `adResult` | `number[]` |             |
| `coResult` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/chaikinOscillator.ts#L11)

### COConfig

Optional configuration of Chaikin oscillator parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `fast`   | `number or undefined` |             |
| `slow`   | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/chaikinOscillator.ts#L19)

### RSIConfig

Optional configuration of RSI parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `period` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeStrengthIndex.ts#L10)

### ConnorsRSIConfig

Optional configuration of Connors RSI parameters.

| Property            | Type                  | Description |
| ------------------- | --------------------- | ----------- |
| `rsiPeriod`         | `number or undefined` |             |
| `streakRsiPeriod`   | `number or undefined` |             |
| `percentRankPeriod` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/connorsRsi.ts#L10)

### CoppockCurveConfig

Optional configuration of Coppock Curve parameters.

| Property     | Type                  | Description |
| ------------ | --------------------- | ----------- |
| `rocPeriod1` | `number or undefined` |             |
| `rocPeriod2` | `number or undefined` |             |
| `wmaPeriod`  | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/coppockCurve.ts#L10)

### FisherConfig

Optional configuration of Fisher Transform parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/fisherTransform.ts#L15)

### EhlersFisherConfig

Optional configuration of Ehlers Fisher Transform parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ehlersFisher.ts#L11)

### ElderRayResult

Elder-Ray result object.

| Property    | Type       | Description |
| ----------- | ---------- | ----------- |
| `bullPower` | `number[]` |             |
| `bearPower` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/elderRay.ts#L10)

### ElderRayConfig

Optional configuration of Elder-Ray parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/elderRay.ts#L18)

### IchimokuCloudResult

Ichimoku cloud result object.

All five arrays are the same length as the input `highs`/`lows`/`closings`.
Each array represents that indicator's value as of that bar; Senkou Span A
(`ssa`) and Senkou Span B (`ssb`) are conventionally _plotted_ `medium`
periods ahead on a chart, but that projection is left to the caller/renderer
and is not reflected in the array shape/indexing itself.

| Property      | Type       | Description |
| ------------- | ---------- | ----------- |
| `tenkan`      | `number[]` |             |
| `kijun`       | `number[]` |             |
| `ssa`         | `number[]` |             |
| `ssb`         | `number[]` |             |
| `laggingSpan` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ichimokuCloud.ts#L15)

### IchimokuCloudConfig

Optional configuration of Ichimoku cloud parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `short`  | `number or undefined` |             |
| `medium` | `number or undefined` |             |
| `long`   | `number or undefined` |             |
| `close`  | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ichimokuCloud.ts#L26)

### PPOResult

Percentage price oscillator result.

| Property    | Type       | Description |
| ----------- | ---------- | ----------- |
| `ppoResult` | `number[]` |             |
| `signal`    | `number[]` |             |
| `histogram` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentagePriceOscillator.ts#L11)

### PPOConfig

Optional configuration of PPO parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `fast`   | `number or undefined` |                                                                                                                                       |
| `slow`   | `number or undefined` |                                                                                                                                       |
| `signal` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentagePriceOscillator.ts#L20)

### PVOResult

Percentage volume oscillator result.

| Property    | Type       | Description |
| ----------- | ---------- | ----------- |
| `pvoResult` | `number[]` |             |
| `signal`    | `number[]` |             |
| `histogram` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentageVolumeOscillator.ts#L11)

### PVOConfig

Optional configuration of PVO parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `fast`   | `number or undefined` |                                                                                                                                       |
| `slow`   | `number or undefined` |                                                                                                                                       |
| `signal` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentageVolumeOscillator.ts#L20)

### ROCConfig

Optional configuration of ROC parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/priceRateOfChange.ts#L7)

### RVIResult

RVI result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `rvi`    | `number[]` |             |
| `signal` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeVigorIndex.ts#L10)

### RVIConfig

Optional configuration of RVI parameters.

| Property       | Type                  | Description |
| -------------- | --------------------- | ----------- |
| `period`       | `number or undefined` |             |
| `signalPeriod` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeVigorIndex.ts#L18)

### StochResult

Stochastic oscillator result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `k`      | `number[]` |             |
| `d`      | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/stochasticOscillator.ts#L12)

### StochConfig

Optional configuration of stochastic oscillator parameters.

| Property  | Type                  | Description |
| --------- | --------------------- | ----------- |
| `kPeriod` | `number or undefined` |             |
| `dPeriod` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/stochasticOscillator.ts#L20)

### StochRSIConfig

Optional configuration of Stochastic RSI parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/stochasticRsi.ts#L10)

### TDSequentialResult

TD Sequential result object.

| Property        | Type       | Description                                                |
| --------------- | ---------- | ---------------------------------------------------------- |
| `downSetup`     | `number[]` | Consecutive closes below the close `lookback` bars before. |
| `upSetup`       | `number[]` | Consecutive closes above the close `lookback` bars before. |
| `downCountdown` | `number[]` | Countdown after a completed down setup.                    |
| `upCountdown`   | `number[]` | Countdown after a completed up setup.                      |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/tdSequential.ts#L7)

### TDSequentialConfig

Optional configuration of TD Sequential parameters.

| Property            | Type                  | Description |
| ------------------- | --------------------- | ----------- |
| `lookback`          | `number or undefined` |             |
| `countdownLookback` | `number or undefined` |             |
| `setupPeriod`       | `number or undefined` |             |
| `countdownPeriod`   | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/tdSequential.ts#L21)

### UOConfig

Optional configuration of Ultimate Oscillator parameters.

| Property       | Type                  | Description |
| -------------- | --------------------- | ----------- |
| `shortPeriod`  | `number or undefined` |             |
| `middlePeriod` | `number or undefined` |             |
| `longPeriod`   | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/ultimateOscillator.ts#L17)

### WillrConfig

Optional configuration of Williams R parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/williamsR.ts#L11)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

# Trend Indicators

Trend indicators measure the direction and strength of a trend.

**NOTE:** All configuration objects for all indicators are optional. If no configuration object is passed, the default configuration will be used. Likewise, you may also partially pass a configuration object, and the default values will be used for the missing properties.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [ema](#ema)
- [apo](#apo)
- [aroon](#aroon)
- [bop](#bop)
- [cfo](#cfo)
- [mcfo](#mcfo)
- [msum](#msum)
- [sma](#sma)
- [typprice](#typprice)
- [cci](#cci)
- [dpo](#dpo)
- [dema](#dema)
- [envelope](#envelope)
- [wma](#wma)
- [hma](#hma)
- [kama](#kama)
- [kst](#kst)
- [mi](#mi)
- [md](#md)
- [macd](#macd)
- [mmax](#mmax)
- [mmin](#mmin)
- [psar](#psar)
- [pivotPoint](#pivotpoint)
- [qstick](#qstick)
- [kdj](#kdj)
- [rma](#rma)
- [stochastic](#stochastic)
- [stc](#stc)
- [since](#since)
- [slope](#slope)
- [slowStochastic](#slowstochastic)
- [smma](#smma)
- [t3](#t3)
- [trima](#trima)
- [trix](#trix)
- [tema](#tema)
- [tsi](#tsi)
- [vwma](#vwma)
- [vortex](#vortex)
- [weightedClose](#weightedclose)

### ema

Exponential moving average (EMA).

Warm-up: the first value is used as the starting point
(`result[0] = values[0]`), so every index has a value. TA-Lib and many
other libraries start from the simple moving average of the first `period`
values instead, and leave the first `period - 1` results empty, so the
early values differ. The difference shrinks by a factor of
`1 - 2 / (period + 1)` every bar. Set `seed: 'sma'` to start from the
simple moving average instead, as TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                 |
| -------- | ---------------------------------------------------- |
| `ema`    | `(values: number[], config?: EMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { ema } from 'indicatorts';

const defaultConfig = { period: 12 };
const result = ema(values, defaultConfig);

// Alternatively:
// const result = exponentialMovingAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/exponentialMovingAverage.ts#L51)

### apo

Absolute Price Oscillator (APO) function calculates the difference between
a fast and a slow exponential moving average of the values. It is positive
when the fast EMA is above the slow EMA, and negative when it is below.

```
Fast = EMA(fastPeriod, values)
Slow = EMA(slowPeriod, values)
APO = Fast - Slow
```

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                 |
| -------- | ---------------------------------------------------- |
| `apo`    | `(values: number[], config?: APOConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { apo } from 'indicatorts';

const defaultConfig = { fast: 14, slow: 30 };
const result = apo(values, defaultConfig);

// Alternatively:
// const result = absolutePriceOscillator(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/absolutePriceOscillator.ts#L60)

### aroon

Aroon Indicator. It is a technical indicator that is used to identify trend changes
in the price of a stock, as well as the strength of that trend. It consists of two
lines, Aroon Up, and Aroon Down. The Aroon Up line measures the strength of the
uptrend, and the Aroon Down measures the strength of the downtrend.

```
Aroon Up = ((25 - Period Since Last 25 Period High) / 25) * 100
Aroon Down = ((25 - Period Since Last 25 Period Low) / 25) * 100
```

| Function | Type                                                                     |
| -------- | ------------------------------------------------------------------------ |
| `aroon`  | `(highs: number[], lows: number[], config?: AroonConfig) => AroonResult` |

Parameters:

- `highs`: highs values.
- `lows`: lows values.
- `config`: configuration.

Examples:

```TypeScript
import { aroon } from 'indicatorts';

const defaultConfig = { period: 25 };
const { up, down } = aroon(highs, lows, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/aroon.ts#L93)

### bop

The Balance of Power (BOP) function calculates the strength of buying and
selling pressure. Positive value indicates an upward trend, and negative
value indicates a downward trend. Zero indicates a balance between
the two.

```
BOP = (Closing - Opening) / (High - Low)
```

| Function | Type                                                                                    |
| -------- | --------------------------------------------------------------------------------------- |
| `bop`    | `(openings: number[], highs: number[], lows: number[], closings: number[]) => number[]` |

Parameters:

- `openings`: opening values.
- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.

Examples:

```TypeScript
import { bop } from 'indicatorts';

const result = bop(openings, highs, lows, closings);

// Alternatively:
// const result = balanceOfPower(openings, highs, lows, closings);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/balanceOfPower.ts#L31)

### cfo

The Chande Forecast Oscillator developed by Tushar Chande The Forecast
Oscillator plots the percentage difference between the closing price and
the n-period linear regression forecasted price. The oscillator is above
zero when the forecast price is greater than the closing price and less
than zero if it is below.

```
R = Linreg(Closing)
CFO = ((Closing - R) / Closing) * 100
```

WARNING: this computes a single linear regression over the _entire_
input series — every returned value depends on all of `closings`,
including bars after it. This makes cfo() unsuitable for point-in-time
signals (e.g. backtesting), where it would leak future information.
Use mcfo() (Moving Chande Forecast Oscillator) instead for a rolling,
point-in-time-safe computation.

Based on [Chande Forecast Oscillator Formula, Strategy](https://www.stockmaniacs.net/chande-forecast-oscillator/), [Forecast Oscillator](https://www.fmlabs.com/reference/default.htm?url=ForecastOscillator.htm), and [Least Squares Regression](https://www.mathsisfun.com/data/least-squares-regression.html).

| Function | Type                               |
| -------- | ---------------------------------- |
| `cfo`    | `(closings: number[]) => number[]` |

Parameters:

- `closings`: closing values.

Examples:

```TypeScript
import { cfo } from 'indicatorts';

const result = cfo(closings);

// Alternatively:
// const result = chandeForecastOscillator(closings);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/chandeForecastOscillator.ts#L48)

### mcfo

Moving Chande Forecast Oscillator calculates based on
the given period.

The Chande Forecast Oscillator developed by Tushar Chande The Forecast
Oscillator plots the percentage difference between the closing price and
the n-period linear regression forecasted price. The oscillator is above
zero when the forecast price is greater than the closing price and less
than zero if it is below.

```
R = Linreg(Closing)
CFO = ((Closing - R) / Closing) * 100
```

| Function | Type                                                    |
| -------- | ------------------------------------------------------- |
| `mcfo`   | `(closings: number[], config?: MCFOConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { mcfo } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = mcfo(closings, defaultConfig);

// Alternatively:
// const result = movingChandeForecastOscillator(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/chandeForecastOscillator.ts#L105)

### msum

Moving sum of the given values.

The sum is maintained incrementally, adding the incoming value and
subtracting the outgoing one, which keeps it O(n). Two safeguards keep
that running sum exact where it matters:

- A window holding only zeros sums to exactly 0. Without this, the
  floating point residue left by subtracting fractional values (for
  example, 4.4e-16) survives, and callers that guard divisions with
  `sum === 0` (VWAP, VWMA, CMF, MFI) would divide by it instead.
- A non-finite value (NaN or Infinity) only affects the windows that
  contain it. Subtracting it back out would leave NaN forever, so the
  sum is recomputed from the window once that value leaves it.

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `msum`   | `(values: number[], config?: MSumConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { msum } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = msum(values, defaultConfig);

// Alternatively:
// const result = movingSum(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingSum.ts#L47)

### sma

Simple moving average (SMA). Until a full period is available, the
average is taken over the values seen so far.

Built on msum, so a window of zeros averages to exactly 0, and a NaN or
Infinity input only affects the windows that contain it.

| Function | Type                                                 |
| -------- | ---------------------------------------------------- |
| `sma`    | `(values: number[], config?: SMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { sma } from 'indicatorts';

const defaultConfig = { period: 2 };
const result = sma(values);

// Alternatively:
// const result = simpleMovingAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/simpleMovingAverage.ts#L41)

### typprice

The Typical Price. It is another approximation of
average price for each period and can be used as
a filter for moving average systems.

```
TPI = (High + Low + Closing) / 3
```

| Function   | Type                                                                |
| ---------- | ------------------------------------------------------------------- |
| `typprice` | `(highs: number[], lows: number[], closings: number[]) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.

Examples:

```TypeScript
import { typprice } from 'indicatorts';

const result = typprice(highs, lows, closings);

// Alternatively:
// const result = typicalPrice(highs, lows, closings);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/typicalPrice.ts#L29)

### cci

The Commodity Channel Index (CCI) is a momentum-based oscillator
used to help determine when an investment vehicle is reaching a
condition of being overbought or oversold.

```
Moving Average = Sma(Period, Typical Price)
Mean Deviation = Sum(Abs(Typical Price[k] - Moving Average)) / Period
  for k over the current window, using the current window's moving average
CCI = (Typical Price - Moving Average) / (0.015 * Mean Deviation)
```

| Function | Type                                                                                    |
| -------- | --------------------------------------------------------------------------------------- |
| `cci`    | `(highs: number[], lows: number[], closings: number[], config?: CCIConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Returns:

cci values.

Examples:

```TypeScript
import { cci } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = cci(highs, lows, closings, defaultConfig);

// Alternatively:
// const result = commodityChannelIndex(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/commodityChannelIndex.ts#L50)

### dpo

Detrended Price Oscillator (DPO). It subtracts a simple moving average,
shifted back by `floor(period / 2) + 1` bars, from the price, which
removes the longer-term trend and leaves the shorter cycles.

```
k = floor(period / 2) + 1
DPO[i] = Price[i] - SMA(Price, period)[i - k]
```

Warm-up: the first `period - 1 + k` values are NaN.

| Function | Type                                                   |
| -------- | ------------------------------------------------------ |
| `dpo`    | `(closings: number[], config?: DPOConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { dpo } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = dpo(closings, defaultConfig);

// Alternatively:
// const result = detrendedPriceOscillator(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/detrendedPriceOscillator.ts#L46)

### dema

Dema calculates the Double Exponential Moving Average (DEMA).

```
DEMA = (2 * EMA(values)) - EMA(EMA(values))
```

Based on [Double Exponential Moving Average (DEMA)](https://www.investopedia.com/terms/d/double-exponential-moving-average.asp).

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `dema`   | `(values: number[], config?: DEMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration

Examples:

```TypeScript
import { dema } from 'indicatorts';

const defaultConfig = { period: 12 };
const result = dema(values, defaultConfig);

// Alternatively:
// const result = doubleExponentialMovingAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/doubleExponentialMovingAverage.ts#L56)

### envelope

Moving Average Envelope. It places an upper and a lower band at a fixed
percentage above and below a moving average of the price.

```
Middle = MA(closings, period)
Upper = Middle * (1 + percentage / 100)
Lower = Middle * (1 - percentage / 100)
```

Warm-up: the first `period - 1` values are NaN.

| Function   | Type                                                              |
| ---------- | ----------------------------------------------------------------- |
| `envelope` | `(closings: number[], config?: EnvelopeConfig) => EnvelopeResult` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { envelope } from 'indicatorts';

const defaultConfig = { period: 20, percentage: 20, ma: 'sma' };
const { upper, middle, lower } = envelope(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/envelope.ts#L64)

### wma

Weighted Moving Average (WMA). It averages the last `period` values with
linearly increasing weights, so the newest value has the weight `period`
and the oldest has the weight 1.

```
WMA = (1 * V[i-period+1] + 2 * V[i-period+2] + ... + period * V[i]) / (period * (period + 1) / 2)
```

Warm-up: the first `period - 1` values are NaN.

| Function | Type                                                 |
| -------- | ---------------------------------------------------- |
| `wma`    | `(values: number[], config?: WMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { wma } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = wma(values, defaultConfig);

// Alternatively:
// const result = weightedMovingAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/weightedMovingAverage.ts#L45)

### hma

Hull Moving Average (HMA). It combines weighted moving averages of two
lengths and smooths their difference with a third, shorter one, which
reduces the lag of the average.

```
HMA = WMA(2 * WMA(values, round(period / 2)) - WMA(values, period), round(sqrt(period)))
```

Warm-up: the first `period - 1 + round(sqrt(period)) - 1` values are NaN.

| Function | Type                                                 |
| -------- | ---------------------------------------------------- |
| `hma`    | `(values: number[], config?: HMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { hma } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = hma(values, defaultConfig);

// Alternatively:
// const result = hullMovingAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/hullMovingAverage.ts#L45)

### kama

Kaufman's Adaptive Moving Average (KAMA).

```
ER = abs(Close[i] - Close[i-period]) / Sum(abs(Close[j] - Close[j-1]), period)
SC = (ER * (fastSC - slowSC) + slowSC)^2
KAMA[i] = KAMA[i-1] + SC * (Close[i] - KAMA[i-1])
```

fastSC = 2 / (fast + 1), and slowSC = 2 / (slow + 1). Until a full period
is available, the first `period` values are the input values themselves,
and the first adaptive value (at index `period`) builds on
`values[period - 1]`. When the price did not move over the window, the
efficiency ratio is 0 instead of NaN (0 / 0).

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `kama`   | `(values: number[], config?: KAMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { kama } from 'indicatorts';

const defaultConfig = { period: 10, fast: 2, slow: 30 };
const result = kama(closings, defaultConfig);

// Alternatively:
// const result = kaufmanAdaptiveMovingAverage(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/kaufmanAdaptiveMovingAverage.ts#L51)

### kst

Know Sure Thing (KST). It is a weighted sum of four smoothed rates of
change over increasing periods, with a simple moving average of the sum
as the signal line. The rates of change are ratios, not percentages.

```
ROC(n) = (Close - Close n periods ago) / Close n periods ago
RCMA1 = SMA(ROC(rocPeriod1), smaPeriod1)
RCMA2 = SMA(ROC(rocPeriod2), smaPeriod2)
RCMA3 = SMA(ROC(rocPeriod3), smaPeriod3)
RCMA4 = SMA(ROC(rocPeriod4), smaPeriod4)
KST = (RCMA1 * 1) + (RCMA2 * 2) + (RCMA3 * 3) + (RCMA4 * 4)
Signal = SMA(KST, signalPeriod)
```

Warm-up: both outputs are NaN until the signal line has a value, which is
the first `max(rocPeriod + smaPeriod - 1) + signalPeriod - 1` bars.

| Function | Type                                                    |
| -------- | ------------------------------------------------------- |
| `kst`    | `(closings: number[], config?: KSTConfig) => KSTResult` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { kst } from 'indicatorts';

const { kst: kstLine, signal } = kst(closings);

// Alternatively:
// const { kst: kstLine, signal } = knowSureThing(closings);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/knowSureThing.ts#L75)

### mi

The Mass Index (MI) uses the high-low range to identify trend reversals
based on range expansions.

```
Singe EMA = EMA(9, Highs - Lows)
Double EMA = EMA(9, Single EMA)
Ratio = Single EMA / Double EMA
MI = Sum(25, Ratio)
```

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                               |
| -------- | ------------------------------------------------------------------ |
| `mi`     | `(highs: number[], lows: number[], config?: MIConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `config`: configuration.

Returns:

mi values.

Examples:

```TypeScript
import { mi } from 'indicatorts';

const defaultConfig = { emaPeriod: 9, miPeriod: 25 };
const result = mi(highs, lows, defaultConfig);

// Alternatively:
// const result = massIndex(highs, lows, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/massIndex.ts#L54)

### md

McGinley Dynamic (MD). It is a moving average whose smoothing adjusts to
the speed of the price: the ratio of the price to the previous value,
raised to the fourth power, scales the step toward the price.

```
MD[0] = Close[0]
MD[i] = MD[i-1] + (Close[i] - MD[i-1]) / (period * (Close[i] / MD[i-1])^4)
```

A previous value of 0 restarts the average from the current close.

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `md`     | `(closings: number[], config?: MDConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { md } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = md(closings, defaultConfig);

// Alternatively:
// const result = mcGinleyDynamic(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/mcGinleyDynamic.ts#L44)

### macd

Moving Average Convergence Divergence (MACD).

```
MACD = 12-Period EMA - 26-Period EMA.
Signal = 9-Period EMA of MACD.
```

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                      |
| -------- | --------------------------------------------------------- |
| `macd`   | `(closings: number[], config?: MACDConfig) => MACDResult` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { macd } from 'indicatorts';

const defaultConfig = { fast: 12, slow: 26, signal: 9 };
const { macdLine, signalLine } = macd(closings);

// Alternatively:
// const { macdLine, signalLine } = movingAverageConvergenceDivergence(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingAverageConvergenceDivergence.ts#L67)

### mmax

Moving max for the given period.

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `mmax`   | `(values: number[], config?: MMaxConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { mmax } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = mmax(values, defaultConfig);

// Alternatively:
// const result = movingMax(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingMax.ts#L37)

### mmin

Moving min for the given period.

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `mmin`   | `(values: number[], config?: MMinConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { mmin } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = mmin(values, defaultConfig);

// Alternatively:
// const result = movingMin(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingMin.ts#L37)

### psar

Parabolic SAR. It is a popular technical indicator for identifying the trend
and as a trailing stop.

```
PSAR = PSAR[i - 1] - ((PSAR[i - 1] - EP) * AF)
```

If the trend is Falling:

- PSAR is the maximum of PSAR or the previous two high values.
- If the current high is greather than or equals to PSAR, use EP.

If the trend is Rising:

- PSAR is the minimum of PSAR or the previous two low values.
- If the current low is less than or equals to PSAR, use EP.

When EP is used, the trend reverses, EP is set to the current high (if
now rising) or low (if now falling), and AF is reset to 0.02.

Otherwise the trend stays the same, EP is set to the maximum of EP or the
high (if rising) or the minimum of EP or the low (if falling), and when EP
changes AF is incremented by 0.02, up to 0.20.

Based on video https://www.youtube.com/watch?v=MuEpGBAH7pw&t=0s.

Based on video [How to Calculate the PSAR Using Excel - Revised Version](https://www.youtube.com/watch?v=MuEpGBAH7pw&t=0s).

| Function | Type                                                                                       |
| -------- | ------------------------------------------------------------------------------------------ |
| `psar`   | `(highs: number[], lows: number[], closings: number[], config?: PSARConfig) => PSARResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { psar } from 'indicatorts';

const defaultConfig = { step: 0.02, max: 0.2 };
const { trends, psarResult } = psar(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/parabolicSar.ts#L71)

### pivotPoint

Pivot Point. It computes a pivot level and the resistance (R) and support
(S) levels around it from the previous bar's high, low and close (and the
current bar's open, for the Woodie method).

```
Standard:
  P = (H + L + C) / 3
  R1 = 2P - L, S1 = 2P - H
  R2 = P + (H - L), S2 = P - (H - L)
  R3 = H + 2(P - L), S3 = L - 2(H - P)
  R4 = H + 3(P - L), S4 = L - 3(H - P)
Woodie:
  P = (H + L + 2 * Open) / 4, with R1 to R3 and S1 to S3 as in Standard
Camarilla:
  P = (H + L + C) / 3
  R1..R4 = C + (H - L) * 1.1 / 12, / 6, / 4, / 2
  S1..S4 = C - (H - L) * 1.1 / 12, / 6, / 4, / 2
Fibonacci:
  P = (H + L + C) / 3
  R1..R3 = P + (H - L) * 0.382, 0.618, 1.000
  S1..S3 = P - (H - L) * 0.382, 0.618, 1.000
```

H, L and C are the previous bar's high, low and close; Open is the
current bar's open.

Warm-up: the first value is NaN.

| Function     | Type                                                                                                                       |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `pivotPoint` | `(openings: number[], highs: number[], lows: number[], closings: number[], config?: PivotPointConfig) => PivotPointResult` |

Parameters:

- `openings`: opening values.
- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { pivotPoint } from 'indicatorts';

const defaultConfig = { method: 'standard' };
const { p, r1, s1 } = pivotPoint(openings, highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/pivotPoint.ts#L85)

### qstick

The Qstick function calculates the ratio of recent up and down bars.

```
QS = Sma(Closing - Opening)
```

| Function | Type                                                                          |
| -------- | ----------------------------------------------------------------------------- |
| `qstick` | `(openings: number[], closings: number[], config?: QstickConfig) => number[]` |

Parameters:

- `openings`: openinig values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { qstick } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = qstick(openings, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/qstick.ts#L40)

### kdj

The kdj function calculates the KDJ indicator, also known as
the Random Index. KDJ is calculated similar to the Stochastic
Oscillator with the difference of having the J line. It is
used to analyze the trend.

The K and D lines show if the asset is overbought when they
crosses above 80%, and oversold when they crosses below
20%. The J line represents the divergence.

```
RSV = ((Closing - Min(Low, rPeriod))
      / (Max(High, rPeriod) - Min(Low, rPeriod))) * 100
K = Sma(RSV, kPeriod)
D = Sma(K, dPeriod)
J = (3 * K) - (2 * D)
```

| Function | Type                                                                                     |
| -------- | ---------------------------------------------------------------------------------------- |
| `kdj`    | `(highs: number[], lows: number[], closings: number[], config?: KDJConfig) => KDJResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { kdj } from 'indicatorts';

const defaultConfig = { rPeriod: 9, kPeriod: 3, dPeriod: 3 };
const { k, d, j } = kdj(highs, lows, closings, defaultConfig);

// Alternatively:
// const { k, d, j } = randomIndex(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/randomIndex.ts#L70)

### rma

Rolling moving average (RMA).

```
R[0] to R[p-1] is SMA(values)
R[p] and after is R[i] = ((R[i-1]*(p-1)) + v[i]) / p
```

Warm-up: until `period` values are available, the result is the average
of the values seen so far, so every index has a value. At index
`period - 1` it equals the simple moving average of the first `period`
values. Set `seed: 'sma'` to leave the results before that NaN instead,
as TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                 |
| -------- | ---------------------------------------------------- |
| `rma`    | `(values: number[], config?: RMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Returns:

RMA values.

Examples:

```TypeScript
import { rma } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = rma(values, defaultConfig);

// Alternatively:
// const result = rollingMovingAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/rollingMovingAverage.ts#L54)

### stochastic

Stochastic of a single series. It places each value within the range of
the last `period` values, on a 0 to 100 scale, and smooths it with a
simple moving average. Unlike the Stochastic Oscillator (`stoch`), which
uses the highs, lows and closings, it works on any one series, such as
the MACD line in the Schaff Trend Cycle.

```
K = (Value - Min(Value, period)) / (Max(Value, period) - Min(Value, period)) * 100
D = SMA(K, dPeriod)
```

A window whose values are all equal has no range; K is 50 there.

Warm-up: the first `period + dPeriod - 2` values of both K and D are NaN.

| Function     | Type                                                                |
| ------------ | ------------------------------------------------------------------- |
| `stochastic` | `(values: number[], config?: StochasticConfig) => StochasticResult` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { stochastic } from 'indicatorts';

const defaultConfig = { period: 10, dPeriod: 3 };
const { k, d } = stochastic(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/stochastic.ts#L63)

### stc

Schaff Trend Cycle (STC). It applies the single-series Stochastic twice to
the difference of a fast and a slow exponential moving average, which
bounds the MACD line to a 0 to 100 scale.

```
MACD = EMA(closings, fast) - EMA(closings, slow)
%K1, %D1 = Stochastic(MACD, kPeriod, dPeriod)
%K2, %D2 = Stochastic(%D1, kPeriod, dPeriod)
STC = %D2
```

Both EMAs start from the simple moving average of their first values.

Warm-up: the first `slow - 1 + 2 * (kPeriod + dPeriod - 2)` values are
NaN.

| Function | Type                                                   |
| -------- | ------------------------------------------------------ |
| `stc`    | `(closings: number[], config?: STCConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { stc } from 'indicatorts';

const defaultConfig = { fast: 23, slow: 50, kPeriod: 10, dPeriod: 3 };
const result = stc(closings, defaultConfig);

// Alternatively:
// const result = schaffTrendCycle(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/schaffTrendCycle.ts#L58)

### since

Since value is changed.

| Function | Type                             |
| -------- | -------------------------------- |
| `since`  | `(values: number[]) => number[]` |

Parameters:

- `values`: values array.

Examples:

```TypeScript
import { since } from 'indicatorts';

const result = since(values);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/since.ts#L16)

### slope

Slope. It is the change of the value over `period` bars, divided by the
number of bars, that is, the average change per bar.

```
Slope = (V[i] - V[i - period]) / period
```

Warm-up: the first `period` values are NaN.

| Function | Type                                                   |
| -------- | ------------------------------------------------------ |
| `slope`  | `(values: number[], config?: SlopeConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { slope } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = slope(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/slope.ts#L41)

### slowStochastic

Slow Stochastic of a single series. It smooths the fast %K of the
single-series Stochastic with a simple moving average, and smooths the
result again to get %D.

```
Fast %K = (Value - Min(Value, period)) / (Max(Value, period) - Min(Value, period)) * 100
Slow %K = SMA(Fast %K, kPeriod)
Slow %D = SMA(Slow %K, dPeriod)
```

A window whose values are all equal has no range; Fast %K is 50 there.

Warm-up: the first `period + kPeriod + dPeriod - 3` values of both
outputs are NaN.

| Function         | Type                                                                        |
| ---------------- | --------------------------------------------------------------------------- |
| `slowStochastic` | `(values: number[], config?: SlowStochasticConfig) => SlowStochasticResult` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { slowStochastic } from 'indicatorts';

const defaultConfig = { period: 10, kPeriod: 3, dPeriod: 3 };
const { k, d } = slowStochastic(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/slowStochastic.ts#L60)

### smma

Smoothed Moving Average (SMMA). It starts from the simple moving average
of the first `period` values and then gives each new value a weight of
`1 / period`. It is the rolling moving average (RMA) with an SMA seed.

```
SMMA[period - 1] = SMA(values[0..period-1])
SMMA[i] = (SMMA[i-1] * (period - 1) + V[i]) / period
```

Warm-up: the first `period - 1` values are NaN.

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `smma`   | `(values: number[], config?: SMMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { smma } from 'indicatorts';

const defaultConfig = { period: 7 };
const result = smma(values, defaultConfig);

// Alternatively:
// const result = smoothedMovingAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/smoothedMovingAverage.ts#L46)

### t3

Tillson T3 Moving Average (T3). It chains six exponential moving averages
and combines the last four with weights derived from the volume factor.
The weights sum to 1, so a constant input is reproduced exactly.

```
EMA1 = EMA(closings, period), EMA2 = EMA(EMA1, period), ..., EMA6 = EMA(EMA5, period)
c1 = -a^3
c2 = 3a^2 + 3a^3
c3 = -6a^2 - 3a - 3a^3
c4 = 1 + 3a + 3a^2 + a^3
T3 = c1 * EMA6 + c2 * EMA5 + c3 * EMA4 + c4 * EMA3
```

where `a` is the volume factor. Each EMA starts from the simple moving
average of its first `period` values.

Warm-up: the first `6 * (period - 1)` values are NaN.

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `t3`     | `(closings: number[], config?: T3Config) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { t3 } from 'indicatorts';

const defaultConfig = { period: 5, volumeFactor: 0.7 };
const result = t3(closings, defaultConfig);

// Alternatively:
// const result = tillsonT3(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/tillsonT3.ts#L55)

### trima

Trima function calculates the Triangular Moving Average (TRIMA).

```
If period is even:
  TRIMA = SMA(period / 2, SMA((period / 2) + 1, values))
If period is odd:
  TRIMA = SMA((period + 1) / 2, SMA((period + 1) / 2, values))
```

Based on [Triangular Moving Average](https://tulipindicators.org/trima).

| Function | Type                                                   |
| -------- | ------------------------------------------------------ |
| `trima`  | `(values: number[], config?: TRIMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { trima } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = trima(values, defaultConfig);

// Alternatively:
// const result = triangularMovingAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/triangularMovingAverage.ts#L46)

### trix

Triple Exponential Average (TRIX) indicator is an oscillator used to
identify oversold and overbought markets, and it can also be used
as a momentum indicator. Like many oscillators, TRIX oscillates
around a zero line.

```
EMA1 = EMA(period, values)
EMA2 = EMA(period, EMA1)
EMA3 = EMA(period, EMA2)
TRIX = (EMA3 - Previous EMA3) / Previous EMA3
```

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `trix`   | `(values: number[], config?: TRIXConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Returns:

trix values.

Examples:

```TypeScript
import { trix } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = trix(values, defaultConfig);

// Alternatively:
// const result = tripleExponentialAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/tripleExponentialAverage.ts#L60)

### tema

Tema calculates the Triple Exponential Moving Average (TEMA).

```
TEMA = (3 * EMA1) - (3 * EMA2) + EMA3
EMA1 = EMA(values)
EMA2 = EMA(EMA1)
EMA3 = EMA(EMA2)
```

Based on [Triple Exponential Moving Average (TEMA)](https://www.investopedia.com/terms/t/triple-exponential-moving-average.asp).

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `tema`   | `(values: number[], config?: TEMAConfig) => number[]` |

Parameters:

- `values`: values array.
- `config`: configuration.

Examples:

```TypeScript
import { tema } from 'indicatorts';

const defaultConfig = { period: 2 };
const result = tema(values, defaultConfig);

// Alternatively:
// const result = tripleExponentialMovingAverage(values, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/tripleExponentialMovingAverage.ts#L59)

### tsi

True Strength Index (TSI). It is the ratio of the double-smoothed price
change to the double-smoothed absolute price change, on a -100 to 100
scale.

```
PC = Close - Previous Close
PCDS = EMA(EMA(PC, firstPeriod), secondPeriod)
APCDS = EMA(EMA(Abs(PC), firstPeriod), secondPeriod)
TSI = (PCDS / APCDS) * 100
```

Each EMA starts from the simple moving average of its first values. When
the price has not changed at all, APCDS is 0 and TSI is 0.

Warm-up: the first `firstPeriod + secondPeriod - 1` values are NaN.

| Function | Type                                                   |
| -------- | ------------------------------------------------------ |
| `tsi`    | `(closings: number[], config?: TSIConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { tsi } from 'indicatorts';

const defaultConfig = { firstPeriod: 25, secondPeriod: 13 };
const result = tsi(closings, defaultConfig);

// Alternatively:
// const result = trueStrengthIndex(closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/trueStrengthIndex.ts#L54)

### vwma

The vwma function calculates the Volume Weighted Moving Average (VWMA)
averaging the price data with an emphasis on volume, meaning areas
with higher volume will have a greater weight.

```
VWMA = Sum(Price * Volume) / Sum(Volume) for a given Period.
```

| Function | Type                                                                       |
| -------- | -------------------------------------------------------------------------- |
| `vwma`   | `(closings: number[], volumes: number[], config?: VWMAConfig) => number[]` |

Parameters:

- `closings`: asset closings.
- `volumes`: asset volumes.
- `config`: configuration.

Returns:

vwma values.

Examples:

```TypeScript
import { vwma } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = vwma(closings, volumes, defaultConfig);

// Alternatively:
// const result = volumeWeightedMovingAverage(closings, volumes, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/volumeWeightedMovingAverage.ts#L45)

### vortex

Vortex Indicator. It provides two oscillators that capture positive and
negative trend movement.

```
+VM = Abs(Current High - Prior Low)
-VM = Abs(Current Low - Prior High)
```

```
+VM14 = 14-Period Sum of +VM
-VM14 = 14-Period Sum of -VM
```

```
TR = Max((High[i]-Low[i]), Abs(High[i]-Closing[i-1]), Abs(Low[i]-Closing[i-1]))
TR14 = 14-Period Sum of TR
```

```
+VI14 = +VM14 / TR14
-VI14 = -VM14 / TR14
```

Based on https://school.stockcharts.com/doku.php?id=technical_indicators:vortex_indicator

Based on [Vortex Indicator](https://school.stockcharts.com/doku.php?id=technical_indicators:vortex_indicator)

| Function | Type                                                                                           |
| -------- | ---------------------------------------------------------------------------------------------- |
| `vortex` | `(highs: number[], lows: number[], closings: number[], config?: VortexConfig) => VortexResult` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `config`: configuration.

Examples:

```TypeScript
import { vortex } from 'indicatorts';

const defaultConfig = { period: 14 };
const { plus, minus } = vortex(highs, lows, closings, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/vortex.ts#L77)

### weightedClose

Weighted Close. It averages the high, the low and the close, counting the
close twice.

```
Weighted Close = (High + Low + (Close * 2)) / 4
```

| Function        | Type                                                                |
| --------------- | ------------------------------------------------------------------- |
| `weightedClose` | `(highs: number[], lows: number[], closings: number[]) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.

Examples:

```TypeScript
import { weightedClose } from 'indicatorts';

const result = weightedClose(highs, lows, closings);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/weightedClose.ts#L25)

## Constants

- [EMADefaultConfig](#emadefaultconfig)
- [APODefaultConfig](#apodefaultconfig)
- [AroonDefaultConfig](#aroondefaultconfig)
- [MCFODefaultConfig](#mcfodefaultconfig)
- [MSumDefaultConfig](#msumdefaultconfig)
- [SMADefaultConfig](#smadefaultconfig)
- [CCIDefaultConfig](#ccidefaultconfig)
- [DPODefaultConfig](#dpodefaultconfig)
- [DEMADefaultConfig](#demadefaultconfig)
- [EnvelopeDefaultConfig](#envelopedefaultconfig)
- [WMADefaultConfig](#wmadefaultconfig)
- [HMADefaultConfig](#hmadefaultconfig)
- [KAMADefaultConfig](#kamadefaultconfig)
- [KSTDefaultConfig](#kstdefaultconfig)
- [MIDefaultConfig](#midefaultconfig)
- [MDDefaultConfig](#mddefaultconfig)
- [MACDDefaultConfig](#macddefaultconfig)
- [MMaxDefaultConfig](#mmaxdefaultconfig)
- [MMinDefaultConfig](#mmindefaultconfig)
- [PSARDefaultConfig](#psardefaultconfig)
- [PivotPointDefaultConfig](#pivotpointdefaultconfig)
- [QstickDefaultConfig](#qstickdefaultconfig)
- [KDJDefaultConfig](#kdjdefaultconfig)
- [RMADefaultConfig](#rmadefaultconfig)
- [StochasticDefaultConfig](#stochasticdefaultconfig)
- [STCDefaultConfig](#stcdefaultconfig)
- [SlopeDefaultConfig](#slopedefaultconfig)
- [SlowStochasticDefaultConfig](#slowstochasticdefaultconfig)
- [SMMADefaultConfig](#smmadefaultconfig)
- [T3DefaultConfig](#t3defaultconfig)
- [TRIMADefaultConfig](#trimadefaultconfig)
- [TRIXDefaultConfig](#trixdefaultconfig)
- [TEMADefaultConfig](#temadefaultconfig)
- [TSIDefaultConfig](#tsidefaultconfig)
- [VWMADefaultConfig](#vwmadefaultconfig)
- [VortexDefaultConfig](#vortexdefaultconfig)

### EMADefaultConfig

The default configuration of EMA.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `EMADefaultConfig` | `Required<EMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/exponentialMovingAverage.ts#L21)

### APODefaultConfig

The default configuration of APO.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `APODefaultConfig` | `Required<APOConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/absolutePriceOscillator.ts#L24)

### AroonDefaultConfig

The default configuration of Aroon.

| Constant             | Type                    |
| -------------------- | ----------------------- |
| `AroonDefaultConfig` | `Required<AroonConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/aroon.ts#L29)

### MCFODefaultConfig

The default configuration of moving Chande forecast oscillator.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `MCFODefaultConfig` | `Required<MCFOConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/chandeForecastOscillator.ts#L72)

### MSumDefaultConfig

The default configuration of moving sum.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `MSumDefaultConfig` | `Required<MSumConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingSum.ts#L14)

### SMADefaultConfig

The default configuration of SMA.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `SMADefaultConfig` | `Required<SMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/simpleMovingAverage.ts#L16)

### CCIDefaultConfig

The default configuration of CCI.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `CCIDefaultConfig` | `Required<CCIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/commodityChannelIndex.ts#L18)

### DPODefaultConfig

The default configuration of DPO.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `DPODefaultConfig` | `Required<DPOConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/detrendedPriceOscillator.ts#L16)

### DEMADefaultConfig

The default configuration of DEMA.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `DEMADefaultConfig` | `Required<DEMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/doubleExponentialMovingAverage.ts#L23)

### EnvelopeDefaultConfig

The default configuration of Envelope.

| Constant                | Type                       |
| ----------------------- | -------------------------- |
| `EnvelopeDefaultConfig` | `Required<EnvelopeConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/envelope.ts#L35)

### WMADefaultConfig

The default configuration of WMA.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `WMADefaultConfig` | `Required<WMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/weightedMovingAverage.ts#L16)

### HMADefaultConfig

The default configuration of HMA.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `HMADefaultConfig` | `Required<HMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/hullMovingAverage.ts#L16)

### KAMADefaultConfig

The default configuration of KAMA.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `KAMADefaultConfig` | `Required<KAMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/kaufmanAdaptiveMovingAverage.ts#L16)

### KSTDefaultConfig

The default configuration of KST.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `KSTDefaultConfig` | `Required<KSTConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/knowSureThing.ts#L32)

### MIDefaultConfig

The default configuration of MI.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `MIDefaultConfig` | `Required<MIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/massIndex.ts#L19)

### MDDefaultConfig

The default configuration of McGinley Dynamic.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `MDDefaultConfig` | `Required<MDConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/mcGinleyDynamic.ts#L14)

### MACDDefaultConfig

The default configuration of MACD.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `MACDDefaultConfig` | `Required<MACDConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingAverageConvergenceDivergence.ts#L33)

### MMaxDefaultConfig

The default configuration of MMax.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `MMaxDefaultConfig` | `Required<MMaxConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingMax.ts#L16)

### MMinDefaultConfig

The default configuration of MMin.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `MMinDefaultConfig` | `Required<MMinConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingMin.ts#L16)

### PSARDefaultConfig

The default configuration of parabolic SAR.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `PSARDefaultConfig` | `Required<PSARConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/parabolicSar.ts#L26)

### PivotPointDefaultConfig

The default configuration of Pivot Point.

| Constant                  | Type                         |
| ------------------------- | ---------------------------- |
| `PivotPointDefaultConfig` | `Required<PivotPointConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/pivotPoint.ts#L38)

### QstickDefaultConfig

The default configuration of Qstick.

| Constant              | Type                     |
| --------------------- | ------------------------ |
| `QstickDefaultConfig` | `Required<QstickConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/qstick.ts#L17)

### KDJDefaultConfig

The default configuration of KDJ.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `KDJDefaultConfig` | `Required<KDJConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/randomIndex.ts#L30)

### RMADefaultConfig

The default configuration of RMA.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `RMADefaultConfig` | `Required<RMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/rollingMovingAverage.ts#L21)

### StochasticDefaultConfig

The default configuration of Stochastic.

| Constant                  | Type                         |
| ------------------------- | ---------------------------- |
| `StochasticDefaultConfig` | `Required<StochasticConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/stochastic.ts#L31)

### STCDefaultConfig

The default configuration of STC.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `STCDefaultConfig` | `Required<STCConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/schaffTrendCycle.ts#L20)

### SlopeDefaultConfig

The default configuration of Slope.

| Constant             | Type                    |
| -------------------- | ----------------------- |
| `SlopeDefaultConfig` | `Required<SlopeConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/slope.ts#L16)

### SlowStochasticDefaultConfig

The default configuration of Slow Stochastic.

| Constant                      | Type                             |
| ----------------------------- | -------------------------------- |
| `SlowStochasticDefaultConfig` | `Required<SlowStochasticConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/slowStochastic.ts#L27)

### SMMADefaultConfig

The default configuration of SMMA.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `SMMADefaultConfig` | `Required<SMMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/smoothedMovingAverage.ts#L16)

### T3DefaultConfig

The default configuration of T3.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `T3DefaultConfig` | `Required<T3Config>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/tillsonT3.ts#L17)

### TRIMADefaultConfig

The default configuration of TRIMA.

| Constant             | Type                    |
| -------------------- | ----------------------- |
| `TRIMADefaultConfig` | `Required<TRIMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/triangularMovingAverage.ts#L16)

### TRIXDefaultConfig

The default configuration of TRIX.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `TRIXDefaultConfig` | `Required<TRIXConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/tripleExponentialAverage.ts#L23)

### TEMADefaultConfig

The default configuration of TEMA.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `TEMADefaultConfig` | `Required<TEMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/tripleExponentialMovingAverage.ts#L23)

### TSIDefaultConfig

The default configuration of TSI.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `TSIDefaultConfig` | `Required<TSIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/trueStrengthIndex.ts#L18)

### VWMADefaultConfig

The default configuration of VWMA.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `VWMADefaultConfig` | `Required<VWMAConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/volumeWeightedMovingAverage.ts#L17)

### VortexDefaultConfig

The default configuration of vortex.

| Constant              | Type                     |
| --------------------- | ------------------------ |
| `VortexDefaultConfig` | `Required<VortexConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/vortex.ts#L32)

## Interfaces

- [EMAConfig](#emaconfig)
- [APOConfig](#apoconfig)
- [AroonResult](#aroonresult)
- [AroonConfig](#aroonconfig)
- [MCFOConfig](#mcfoconfig)
- [MSumConfig](#msumconfig)
- [SMAConfig](#smaconfig)
- [CCIConfig](#cciconfig)
- [DPOConfig](#dpoconfig)
- [DEMAConfig](#demaconfig)
- [EnvelopeResult](#enveloperesult)
- [EnvelopeConfig](#envelopeconfig)
- [WMAConfig](#wmaconfig)
- [HMAConfig](#hmaconfig)
- [KAMAConfig](#kamaconfig)
- [KSTResult](#kstresult)
- [KSTConfig](#kstconfig)
- [MIConfig](#miconfig)
- [MDConfig](#mdconfig)
- [MACDResult](#macdresult)
- [MACDConfig](#macdconfig)
- [MMaxConfig](#mmaxconfig)
- [MMinConfig](#mminconfig)
- [PSARResult](#psarresult)
- [PSARConfig](#psarconfig)
- [PivotPointResult](#pivotpointresult)
- [PivotPointConfig](#pivotpointconfig)
- [QstickConfig](#qstickconfig)
- [KDJResult](#kdjresult)
- [KDJConfig](#kdjconfig)
- [RMAConfig](#rmaconfig)
- [StochasticResult](#stochasticresult)
- [StochasticConfig](#stochasticconfig)
- [STCConfig](#stcconfig)
- [SlopeConfig](#slopeconfig)
- [SlowStochasticResult](#slowstochasticresult)
- [SlowStochasticConfig](#slowstochasticconfig)
- [SMMAConfig](#smmaconfig)
- [T3Config](#t3config)
- [TRIMAConfig](#trimaconfig)
- [TRIXConfig](#trixconfig)
- [TEMAConfig](#temaconfig)
- [TSIConfig](#tsiconfig)
- [VWMAConfig](#vwmaconfig)
- [VortexResult](#vortexresult)
- [VortexConfig](#vortexconfig)

### EMAConfig

Optional configuration of EMA parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `period` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/exponentialMovingAverage.ts#L9)

### APOConfig

Optional configuration of APO parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `fast`   | `number or undefined` |                                                                                                                                       |
| `slow`   | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/absolutePriceOscillator.ts#L11)

### AroonResult

Aroon result.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `up`     | `number[]` |             |
| `down`   | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/aroon.ts#L14)

### AroonConfig

Optional configuration of Aroon parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/aroon.ts#L22)

### MCFOConfig

Optional configuration of moving Chande forecast oscillator parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/chandeForecastOscillator.ts#L65)

### MSumConfig

Optional configuration of moving sum parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingSum.ts#L7)

### SMAConfig

Optional configuration of SMA parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/simpleMovingAverage.ts#L9)

### CCIConfig

Optional configuration of CCI parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/commodityChannelIndex.ts#L11)

### DPOConfig

Optional configuration of DPO parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/detrendedPriceOscillator.ts#L9)

### DEMAConfig

Optional configuration of DEMA parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `period` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/doubleExponentialMovingAverage.ts#L11)

### EnvelopeResult

Envelope result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `upper`  | `number[]` |             |
| `middle` | `number[]` |             |
| `lower`  | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/envelope.ts#L10)

### EnvelopeConfig

Optional configuration of Envelope parameters.

| Property     | Type                          | Description                                                                                                                                  |
| ------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `period`     | `number or undefined`         |                                                                                                                                              |
| `percentage` | `number or undefined`         | Distance of the bands from the middle line, in percent.                                                                                      |
| `ma`         | `"sma" or "ema" or undefined` | Moving average of the middle line: `'sma'` (default) or `'ema'`. The EMA starts from the simple moving average of the first `period` values. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/envelope.ts#L19)

### WMAConfig

Optional configuration of WMA parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/weightedMovingAverage.ts#L9)

### HMAConfig

Optional configuration of HMA parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/hullMovingAverage.ts#L9)

### KAMAConfig

Optional configuration of KAMA parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |
| `fast`   | `number or undefined` |             |
| `slow`   | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/kaufmanAdaptiveMovingAverage.ts#L7)

### KSTResult

KST result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `kst`    | `number[]` |             |
| `signal` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/knowSureThing.ts#L9)

### KSTConfig

Optional configuration of KST parameters.

| Property       | Type                  | Description |
| -------------- | --------------------- | ----------- |
| `rocPeriod1`   | `number or undefined` |             |
| `rocPeriod2`   | `number or undefined` |             |
| `rocPeriod3`   | `number or undefined` |             |
| `rocPeriod4`   | `number or undefined` |             |
| `smaPeriod1`   | `number or undefined` |             |
| `smaPeriod2`   | `number or undefined` |             |
| `smaPeriod3`   | `number or undefined` |             |
| `smaPeriod4`   | `number or undefined` |             |
| `signalPeriod` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/knowSureThing.ts#L17)

### MIConfig

Optional configuration of MI parameters.

| Property    | Type                  | Description |
| ----------- | --------------------- | ----------- |
| `emaPeriod` | `number or undefined` |             |
| `miPeriod`  | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/massIndex.ts#L11)

### MDConfig

Optional configuration of McGinley Dynamic parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/mcGinleyDynamic.ts#L7)

### MACDResult

Moving average convergence divergence (MACD) result object.

| Property     | Type       | Description |
| ------------ | ---------- | ----------- |
| `macdLine`   | `number[]` |             |
| `signalLine` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingAverageConvergenceDivergence.ts#L11)

### MACDConfig

Optional configuration of MACD parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `fast`   | `number or undefined` |                                                                                                                                       |
| `slow`   | `number or undefined` |                                                                                                                                       |
| `signal` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingAverageConvergenceDivergence.ts#L19)

### MMaxConfig

Optional configuration of MMax parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingMax.ts#L9)

### MMinConfig

Optional configuration of MMin parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/movingMin.ts#L9)

### PSARResult

Parabolic SAR result object.

| Property     | Type       | Description |
| ------------ | ---------- | ----------- |
| `trends`     | `Trend[]`  |             |
| `psarResult` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/parabolicSar.ts#L10)

### PSARConfig

Optional configuration of parabolic SAR parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `step`   | `number or undefined` |             |
| `max`    | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/parabolicSar.ts#L18)

### PivotPointResult

Pivot point result object. The Woodie and Fibonacci methods define three
levels on each side, so their r4 and s4 are NaN.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `p`      | `number[]` |             |
| `r1`     | `number[]` |             |
| `r2`     | `number[]` |             |
| `r3`     | `number[]` |             |
| `r4`     | `number[]` |             |
| `s1`     | `number[]` |             |
| `s2`     | `number[]` |             |
| `s3`     | `number[]` |             |
| `s4`     | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/pivotPoint.ts#L16)

### PivotPointConfig

Optional configuration of Pivot Point parameters.

| Property | Type                            | Description |
| -------- | ------------------------------- | ----------- |
| `method` | `PivotPointMethod or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/pivotPoint.ts#L31)

### QstickConfig

Optional configuration of Qstick parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/qstick.ts#L10)

### KDJResult

KDJ result.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `k`      | `number[]` |             |
| `d`      | `number[]` |             |
| `j`      | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/randomIndex.ts#L12)

### KDJConfig

Optional configuration of KDJ parameters.

| Property  | Type                  | Description |
| --------- | --------------------- | ----------- |
| `rPeriod` | `number or undefined` |             |
| `kPeriod` | `number or undefined` |             |
| `dPeriod` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/randomIndex.ts#L21)

### RMAConfig

Optional configuration of RMA parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `period` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/rollingMovingAverage.ts#L9)

### StochasticResult

Stochastic result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `k`      | `number[]` |             |
| `d`      | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/stochastic.ts#L15)

### StochasticConfig

Optional configuration of Stochastic parameters.

| Property  | Type                  | Description |
| --------- | --------------------- | ----------- |
| `period`  | `number or undefined` |             |
| `dPeriod` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/stochastic.ts#L23)

### STCConfig

Optional configuration of STC parameters.

| Property  | Type                  | Description |
| --------- | --------------------- | ----------- |
| `fast`    | `number or undefined` |             |
| `slow`    | `number or undefined` |             |
| `kPeriod` | `number or undefined` |             |
| `dPeriod` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/schaffTrendCycle.ts#L10)

### SlopeConfig

Optional configuration of Slope parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/slope.ts#L9)

### SlowStochasticResult

Slow Stochastic result object.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `k`      | `number[]` |             |
| `d`      | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/slowStochastic.ts#L10)

### SlowStochasticConfig

Optional configuration of Slow Stochastic parameters.

| Property  | Type                  | Description |
| --------- | --------------------- | ----------- |
| `period`  | `number or undefined` |             |
| `kPeriod` | `number or undefined` |             |
| `dPeriod` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/slowStochastic.ts#L18)

### SMMAConfig

Optional configuration of SMMA parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/smoothedMovingAverage.ts#L9)

### T3Config

Optional configuration of T3 parameters.

| Property       | Type                  | Description |
| -------------- | --------------------- | ----------- |
| `period`       | `number or undefined` |             |
| `volumeFactor` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/tillsonT3.ts#L9)

### TRIMAConfig

Optional configuration of TRIMA parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/triangularMovingAverage.ts#L9)

### TRIXConfig

Optional configuration of TRIX parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `period` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/tripleExponentialAverage.ts#L11)

### TEMAConfig

Optional configuration of TEMA parameters.

| Property | Type                  | Description                                                                                                                           |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `period` | `number or undefined` |                                                                                                                                       |
| `seed`   | `Seed or undefined`   | How the averages start: `'first'` (default) starts from the first value, `'sma'` starts from a simple moving average, as TA-Lib does. |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/tripleExponentialMovingAverage.ts#L11)

### TSIConfig

Optional configuration of TSI parameters.

| Property       | Type                  | Description |
| -------------- | --------------------- | ----------- |
| `firstPeriod`  | `number or undefined` |             |
| `secondPeriod` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/trueStrengthIndex.ts#L10)

### VWMAConfig

Optional configuration of VWMA parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/volumeWeightedMovingAverage.ts#L10)

### VortexResult

Vortex result.

| Property | Type       | Description |
| -------- | ---------- | ----------- |
| `plus`   | `number[]` |             |
| `minus`  | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/vortex.ts#L17)

### VortexConfig

Optional configuration of vortex parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/vortex.ts#L25)

## Types

- [PivotPointMethod](#pivotpointmethod)

### PivotPointMethod

Pivot point calculation method.

| Type               | Type                                                   |
| ------------------ | ------------------------------------------------------ |
| `PivotPointMethod` | `'standard' or 'woodie' or 'camarilla' or 'fibonacci'` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/trend/pivotPoint.ts#L9)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

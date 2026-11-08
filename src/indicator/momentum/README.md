# Momentum Indicators

Momentum indicators measure the speed of movement.

**NOTE:** All configuration objects for all indicators are optional. If no configuration object is passed, the default configuration will be used. Likewise, you may also partially pass a configuration object, and the default values will be used for the missing properties.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [ao](#ao)
- [co](#co)
- [ichimokuCloud](#ichimokucloud)
- [ppo](#ppo)
- [pvo](#pvo)
- [roc](#roc)
- [rsi](#rsi)
- [stoch](#stoch)
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
can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

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

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentagePriceOscillator.ts#L63)

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
can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

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

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentageVolumeOscillator.ts#L63)

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
bars. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

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

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeStrengthIndex.ts#L50)

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
- [IchimokuCloudDefaultConfig](#ichimokuclouddefaultconfig)
- [PPODefaultConfig](#ppodefaultconfig)
- [PVODefaultConfig](#pvodefaultconfig)
- [ROCDefaultConfig](#rocdefaultconfig)
- [RSIDefaultConfig](#rsidefaultconfig)
- [StochDefaultConfig](#stochdefaultconfig)
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

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentagePriceOscillator.ts#L28)

### PVODefaultConfig

The default configuration of PVO.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `PVODefaultConfig` | `Required<PVOConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentageVolumeOscillator.ts#L28)

### ROCDefaultConfig

The default configuration of ROC.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `ROCDefaultConfig` | `Required<ROCConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/priceRateOfChange.ts#L14)

### RSIDefaultConfig

The default configuration of RSI.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `RSIDefaultConfig` | `Required<RSIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeStrengthIndex.ts#L16)

### StochDefaultConfig

The default configuration of stochastic oscillator.

| Constant             | Type                    |
| -------------------- | ----------------------- |
| `StochDefaultConfig` | `Required<StochConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/stochasticOscillator.ts#L28)

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
- [IchimokuCloudResult](#ichimokucloudresult)
- [IchimokuCloudConfig](#ichimokucloudconfig)
- [PPOResult](#pporesult)
- [PPOConfig](#ppoconfig)
- [PVOResult](#pvoresult)
- [PVOConfig](#pvoconfig)
- [ROCConfig](#rocconfig)
- [RSIConfig](#rsiconfig)
- [StochResult](#stochresult)
- [StochConfig](#stochconfig)
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

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentagePriceOscillator.ts#L10)

### PPOConfig

Optional configuration of PPO parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `fast`   | `number or undefined` |             |
| `slow`   | `number or undefined` |             |
| `signal` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentagePriceOscillator.ts#L19)

### PVOResult

Percentage volume oscillator result.

| Property    | Type       | Description |
| ----------- | ---------- | ----------- |
| `pvoResult` | `number[]` |             |
| `signal`    | `number[]` |             |
| `histogram` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentageVolumeOscillator.ts#L10)

### PVOConfig

Optional configuration of PVO parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `fast`   | `number or undefined` |             |
| `slow`   | `number or undefined` |             |
| `signal` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/percentageVolumeOscillator.ts#L19)

### ROCConfig

Optional configuration of ROC parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/priceRateOfChange.ts#L7)

### RSIConfig

Optional configuration of RSI parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/momentum/relativeStrengthIndex.ts#L9)

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

# Volatility Indicators

Volatility indicators measure the rate of movement regardless of its direction.

**NOTE:** All configuration objects for all indicators are optional. If no configuration object is passed, the default configuration will be used. Likewise, you may also partially pass a configuration object, and the default values will be used for the missing properties.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [ab](#ab)
- [tr](#tr)
- [atr](#atr)
- [mstd](#mstd)
- [bb](#bb)
- [bbw](#bbw)
- [ce](#ce)
- [dc](#dc)
- [kc](#kc)
- [po](#po)
- [ui](#ui)

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
the following bars. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

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

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/averageTrueRange.ts#L61)

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

## Constants

- [ABDefaultConfig](#abdefaultconfig)
- [ATRDefaultConfig](#atrdefaultconfig)
- [MSTDDefaultConfig](#mstddefaultconfig)
- [BBDefaultConfig](#bbdefaultconfig)
- [BBWDefaultConfig](#bbwdefaultconfig)
- [CEDefaultConfig](#cedefaultconfig)
- [DCDefaultConfig](#dcdefaultconfig)
- [KCDefaultConfig](#kcdefaultconfig)
- [PODefaultConfig](#podefaultconfig)
- [UIDefaultConfig](#uidefaultconfig)

### ABDefaultConfig

The default configuration of acceleration bands.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `ABDefaultConfig` | `Required<ABConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/accelerationBands.ts#L35)

### ATRDefaultConfig

The default configuration of ATR.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `ATRDefaultConfig` | `Required<ATRConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/averageTrueRange.ts#L25)

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

### PODefaultConfig

The default configuration of PO.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `PODefaultConfig` | `Required<POConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/projectionOscillator.ts#L27)

### UIDefaultConfig

The default configuration of UI.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `UIDefaultConfig` | `Required<UIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/ulcerIndex.ts#L24)

## Interfaces

- [ABResult](#abresult)
- [ABConfig](#abconfig)
- [ATRResult](#atrresult)
- [ATRConfig](#atrconfig)
- [MSTDConfig](#mstdconfig)
- [BBResult](#bbresult)
- [BBConfig](#bbconfig)
- [BBWResult](#bbwresult)
- [BBWConfig](#bbwconfig)
- [CEResult](#ceresult)
- [CEConfig](#ceconfig)
- [DCResult](#dcresult)
- [DCConfig](#dcconfig)
- [KCResult](#kcresult)
- [KCConfig](#kcconfig)
- [POResult](#poresult)
- [POConfig](#poconfig)
- [UIConfig](#uiconfig)

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

### ATRResult

Average true range result.

| Property  | Type       | Description |
| --------- | ---------- | ----------- |
| `trLine`  | `number[]` |             |
| `atrLine` | `number[]` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/averageTrueRange.ts#L10)

### ATRConfig

Optional configuration of ATR parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/averageTrueRange.ts#L18)

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

### UIConfig

Optional configuration of UI parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volatility/ulcerIndex.ts#L17)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

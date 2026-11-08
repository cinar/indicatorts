# Volume Indicators

Volumne indicators measure the strength of a trend based the volume.

**NOTE:** All configuration objects for all indicators are optional. If no configuration object is passed, the default configuration will be used. Likewise, you may also partially pass a configuration object, and the default values will be used for the missing properties.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [ad](#ad)
- [cmf](#cmf)
- [emv](#emv)
- [fi](#fi)
- [mfi](#mfi)
- [nvi](#nvi)
- [obv](#obv)
- [vpt](#vpt)
- [vwap](#vwap)

### ad

Accumulation/Distribution Indicator (A/D). Cumulative indicator
that uses volume and price to assess whether a stock is
being accumulated or distributed.

```
MFM = ((Closing - Low) - (High - Closing)) / (High - Low)
MFV = MFM * Period Volume
AD = Previous AD + CMFV
```

Based on [Accumulation/Distribution Indicator (A/D)](https://www.investopedia.com/terms/a/accumulationdistribution.asp).

| Function | Type                                                                                  |
| -------- | ------------------------------------------------------------------------------------- |
| `ad`     | `(highs: number[], lows: number[], closings: number[], volume: number[]) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `volume`: volume values.

Examples:

```TypeScript
import { ad } from 'indicatorts';

const result = ad(highs, lows, closings, volumes);

// Alternatively:
// const result = accumulationDistribution(highs, lows, closings, volumes);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/accumulationDistribution.ts#L34)

### cmf

The Chaikin Money Flow (CMF) measures the amount of money flow volume
over a given period.

```
Money Flow Multiplier = ((Closing - Low) - (High - Closing)) / (High - Low)
Money Flow Volume = Money Flow Multiplier * Volume
Chaikin Money Flow = Sum(20, Money Flow Volume) / Sum(20, Volume)
```

| Function | Type                                                                                                       |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `cmf`    | `(highs: number[], lows: number[], closings: number[], volumes: number[], config?: CMFConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `volumes`: volume values.
- `config`: configuration.

Returns:

cmf values.

Examples:

```TypeScript
import { cmf } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = cmf(highs, lows, closings, volumes, defaultConfig);

// Alternatively:
// const result = chaikinMoneyFlow(highs, lows, closings, volumes, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/chaikinMoneyFlow.ts#L48)

### emv

The Ease of Movement (EMV) is a volume based oscillator measuring
the ease of price movement.

```
Distance Moved = ((High + Low) / 2) - ((Priod High + Prior Low) /2)
Box Ratio = ((Volume / 100000000) / (High - Low))
EMV(1) = Distance Moved / Box Ratio
EMV(14) = SMA(14, EMV(1))
```

| Function | Type                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| `emv`    | `(highs: number[], lows: number[], volumes: number[], config?: EMVConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `volumes`: volume values.
- `config`: configuration.

Examples:

```TypeScript
import { emv } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = emv(highs, lows, volumes, defaultConfig);

// Alternatively:
// const result = easeOfMovement(highs, lows, volumes, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/easeOfMovement.ts#L54)

### fi

The Force Index (FI) uses the closing price and the volume to assess
the power behind a move and identify turning points.

```
Force Index = EMA(period, (Current - Previous) * Volume)
```

Warm-up: built on the exponential moving average, which starts from the
first value rather than from a simple moving average, so the early values
can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).

| Function | Type                                                                     |
| -------- | ------------------------------------------------------------------------ |
| `fi`     | `(closings: number[], volumes: number[], config?: FIConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `volumes`: volume values.
- `config`: configuration.

Examples:

```TypeScript
import { fi } from 'indicatorts';

const defaultConfig = { period: 13 };
const result = fi(closings, volumes, defaultConfig);

// Alternatively:
// const result = forceIndex(closings, volumes, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/forceIndex.ts#L48)

### mfi

The Money Flow Index (MFI) analyzes both the closing price and the volume
to measure to identify overbought and oversold states. It is similar to
the Relative Strength Index (RSI), but it also uses the volume.

```
Raw Money Flow = Typical Price * Volume
Positive Money Flow = Sum of Raw Money Flow where Typical Price rose
Negative Money Flow = Sum of Raw Money Flow where Typical Price fell
Money Ratio = Positive Money Flow / Negative Money Flow
Money Flow Index = 100 - (100 / (1 + Money Ratio))
```

Bars whose typical price is unchanged from the previous bar, and the
first bar (which has no previous bar), contribute to neither flow.
When a window has no positive and no negative flow, the MFI is 50.

| Function | Type                                                                                                       |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `mfi`    | `(highs: number[], lows: number[], closings: number[], volumes: number[], config?: MFIConfig) => number[]` |

Parameters:

- `highs`: high values.
- `lows`: low values.
- `closings`: closing values.
- `volumes`: volume values.
- `config`: configuration.

Examples:

```TypeScript
import { mfi } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = mfi(highs, lows, closings, volumes, defaultConfig);

// Alternatively:
// const result = moneyFlowIndex(highs, lows, closings, volumes, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/moneyFlowIndex.ts#L56)

### nvi

The Negative Volume Index (NVI) is a cumulative indicator using
the change in volume, which only changes on days when volume decreases.

If Volume is less than Previous Volume:

```
  NVI = Previous NVI + (((Closing - Previous Closing) / Previous Closing) * Previous NVI)
```

Otherwise (Volume is greater than or equal to Previous Volume):

```
  NVI = Previous NVI
```

| Function | Type                                                                      |
| -------- | ------------------------------------------------------------------------- |
| `nvi`    | `(closings: number[], volumes: number[], config?: NVIConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `volumes`: volume values.
- `config`: configuration.

Returns:

nvi values.

Examples:

```TypeScript
import { nvi } from 'indicatorts';

const defaultConfig = { start: 1000, period: 255 };
const result = nvi(closings, volumes, defaultConfig);

// Alternatively:
// const result = negativeVolumeIndex(closings, volumes, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/negativeVolumeIndex.ts#L58)

### obv

On-Balance Volume (OBV). It is a cumulative momentum indicator that adds
the volume on up days and subtracts it on down days.

```
                  volume, if Closing > Closing-Prev
OBV = OBV-Prev +       0, if Closing = Closing-Prev
                 -volume, if Closing < Closing-Prev
```

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `obv`    | `(closings: number[], volumes: number[]) => number[]` |

Parameters:

- `closings`: closing values.
- `volumes`: volume values.

Examples:

```TypeScript
import {obv} from 'indicatorts';

const result = obv(closings, volumes);

// Alternatively:
// const result = onBalanceVolume(closings, volumes);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/onBalanceVolume.ts#L29)

### vpt

The Volume Price Trend (VPT) provides a correlation between the volume and
the price.

```
VPT = Previous VPT + (Volume * (Current Closing - Previous Closing) / Previous Closing)
```

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `vpt`    | `(closings: number[], volumes: number[]) => number[]` |

Parameters:

- `closings`: closing values.
- `volumes`: volume values.

Returns:

volume price trend values.

Examples:

```TypeScript
import { vpt } from 'indicatorts';

const result = vpt(closings, volumes);

// Alternatively:
// const result = volumePriceTrend(closings, volumes);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/volumePriceTrend.ts#L33)

### vwap

The Volume Weighted Average Price (VWAP) provides the average price
the asset has traded.

```
VWAP = Sum(Closing * Volume) / Sum(Volume)
```

| Function | Type                                                                       |
| -------- | -------------------------------------------------------------------------- |
| `vwap`   | `(closings: number[], volumes: number[], config?: VWAPConfig) => number[]` |

Parameters:

- `closings`: closing values.
- `volumes`: volume values.
- `config`: configuration.

Returns:

vwap values.

Examples:

```TypeScript
import { vwap } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = vwap(closings, volumes, defaultConfig);

// Alternatively:
// const result = volumeWeightedAveragePrice(closings, volumes, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/volumeWeightedAveragePrice.ts#L44)

## Constants

- [CMFDefaultConfig](#cmfdefaultconfig)
- [EMVDefaultConfig](#emvdefaultconfig)
- [FIDefaultConfig](#fidefaultconfig)
- [MFIDefaultConfig](#mfidefaultconfig)
- [NVIDefaultConfig](#nvidefaultconfig)
- [VWAPDefaultConfig](#vwapdefaultconfig)

### CMFDefaultConfig

The default configuration of CMF.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `CMFDefaultConfig` | `Required<CMFConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/chaikinMoneyFlow.ts#L17)

### EMVDefaultConfig

The default configuration of EMV.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `EMVDefaultConfig` | `Required<EMVConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/easeOfMovement.ts#L23)

### FIDefaultConfig

The default configuration of FI.

| Constant          | Type                 |
| ----------------- | -------------------- |
| `FIDefaultConfig` | `Required<FIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/forceIndex.ts#L17)

### MFIDefaultConfig

The default configuration of MFI.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `MFIDefaultConfig` | `Required<MFIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/moneyFlowIndex.ts#L18)

### NVIDefaultConfig

The default configuration of NVI.

| Constant           | Type                  |
| ------------------ | --------------------- |
| `NVIDefaultConfig` | `Required<NVIConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/negativeVolumeIndex.ts#L22)

### VWAPDefaultConfig

The default configuration of VWAP.

| Constant            | Type                   |
| ------------------- | ---------------------- |
| `VWAPDefaultConfig` | `Required<VWAPConfig>` |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/volumeWeightedAveragePrice.ts#L17)

## Interfaces

- [CMFConfig](#cmfconfig)
- [EMVConfig](#emvconfig)
- [FIConfig](#ficonfig)
- [MFIConfig](#mficonfig)
- [NVIConfig](#nviconfig)
- [VWAPConfig](#vwapconfig)

### CMFConfig

Optional configuration of CMF parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/chaikinMoneyFlow.ts#L10)

### EMVConfig

Optional configuration of EMV parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/easeOfMovement.ts#L16)

### FIConfig

Optional configuration of FI parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/forceIndex.ts#L10)

### MFIConfig

Optional configuration of MFI parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/moneyFlowIndex.ts#L11)

### NVIConfig

Optional configuration of NVI parameters.

Note: `period` is not used by nvi() itself — it only affects `start`.
`period` is provided so callers can pass this same config object to a
downstream smoothing function (e.g. an EMA signal line) alongside nvi(),
as demonstrated in examples/volume/negativeVolumeIndexStrategy.ts.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `start`  | `number or undefined` |             |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/negativeVolumeIndex.ts#L14)

### VWAPConfig

Optional configuration of VWAP parameters.

| Property | Type                  | Description |
| -------- | --------------------- | ----------- |
| `period` | `number or undefined` |             |

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/volume/volumeWeightedAveragePrice.ts#L10)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

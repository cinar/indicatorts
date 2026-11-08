# Volume Strategy Examples

The examples in this directory illustrate how developers can compose volume indicator calculations into trading signals.

> **Disclaimer:** The examples provided here are strictly for educational and research purposes. They do not constitute investment advice or trading recommendations.

**NOTE:** All configuration objects for all example strategies are optional. If no configuration object is passed, default values will be used.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [cmfStrategy](#cmfstrategy)
- [emvStrategy](#emvstrategy)
- [fiStrategy](#fistrategy)
- [mfiStrategy](#mfistrategy)
- [nviStrategy](#nvistrategy)
- [vwapStrategy](#vwapstrategy)

### cmfStrategy

Demonstrates how to compose Chaikin Money Flow (CMF) into an illustrative
volume flow signal.

Generates a BUY action when CMF > 0 (buying pressure), a SELL action when
CMF < 0 (selling pressure), and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function      | Type                                             |
| ------------- | ------------------------------------------------ |
| `cmfStrategy` | `(asset: Asset, config?: CMFConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Returns:

strategy actions.

Examples:

```TypeScript
import { cmfStrategy } from './chaikinMoneyFlowStrategy';

const defaultConfig = { period: 20 };
const actions = cmfStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/volume/chaikinMoneyFlowStrategy.ts#L31)

### emvStrategy

Demonstrates how to compose Ease of Movement (EMV) into an illustrative
volume/price trend signal.

Generates a BUY action when EMV > 0, a SELL action when EMV < 0, and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function      | Type                                             |
| ------------- | ------------------------------------------------ |
| `emvStrategy` | `(asset: Asset, config?: EMVConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Returns:

strategy actions.

Examples:

```TypeScript
import { emvStrategy } from './easeOfMovementStrategy';

const defaultConfig = { period: 14 };
const actions = emvStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/volume/easeOfMovementStrategy.ts#L30)

### fiStrategy

Demonstrates how to compose Force Index (FI) into an illustrative
volume-momentum signal.

Generates a BUY action when FI > 0, a SELL action when FI < 0, and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function     | Type                                            |
| ------------ | ----------------------------------------------- |
| `fiStrategy` | `(asset: Asset, config?: FIConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Returns:

strategy actions.

Examples:

```TypeScript
import { fiStrategy } from './forceIndexStrategy';

const defaultConfig = { period: 13 };
const actions = fiStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/volume/forceIndexStrategy.ts#L30)

### mfiStrategy

Demonstrates how to compose the Money Flow Index (MFI) into an illustrative
volume-weighted overbought/oversold signal.

Generates a SELL action when MFI >= 80 (overbought threshold), a BUY action
when MFI <= 20 (oversold threshold), and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function      | Type                                             |
| ------------- | ------------------------------------------------ |
| `mfiStrategy` | `(asset: Asset, config?: MFIConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { mfiStrategy } from './moneyFlowIndexStrategy';

const defaultConfig = { period: 14 };
const actions = mfiStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/volume/moneyFlowIndexStrategy.ts#L31)

### nviStrategy

Demonstrates how to compose the Negative Volume Index (NVI) and its EMA baseline
into an illustrative volume trend signal.

Generates a BUY action when NVI > EMA (the conventional bullish reading), a
SELL action when NVI < EMA, and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function      | Type                                             |
| ------------- | ------------------------------------------------ |
| `nviStrategy` | `(asset: Asset, config?: NVIConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Returns:

strategy actions.

Examples:

```TypeScript
import { nviStrategy } from './negativeVolumeIndexStrategy';

const defaultConfig = { start: 1000, period: 255 };
const actions = nviStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/volume/negativeVolumeIndexStrategy.ts#L32)

### vwapStrategy

Demonstrates how to compose the Volume Weighted Average Price (VWAP) into
an illustrative benchmark comparison signal.

Generates a BUY action when closing is below VWAP, a SELL action when
closing is above VWAP, and HOLD when equal.
Provided strictly as an illustrative example for educational and research purposes.

| Function       | Type                                              |
| -------------- | ------------------------------------------------- |
| `vwapStrategy` | `(asset: Asset, config?: VWAPConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Returns:

strategy actions.

Examples:

```TypeScript
import { vwapStrategy } from './volumeWeightedAveragePriceStrategy';

const defaultConfig = { period: 14 };
const actions = vwapStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/volume/volumeWeightedAveragePriceStrategy.ts#L32)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

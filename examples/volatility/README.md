# Volatility Strategy Examples

The examples in this directory illustrate how developers can compose volatility indicator calculations into trading signals.

> **Disclaimer:** The examples provided here are strictly for educational and research purposes. They do not constitute investment advice or trading recommendations.

**NOTE:** All configuration objects for all example strategies are optional. If no configuration object is passed, default values will be used.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [abStrategy](#abstrategy)
- [bbStrategy](#bbstrategy)
- [poStrategy](#postrategy)

### abStrategy

Demonstrates how to compose Acceleration Bands (upper and lower bands) into
an illustrative breakout trading signal.

Generates a BUY action when the closing breaks above the Upper Band, a SELL
action when it breaks below the Lower Band, and HOLD while it is between them.
Provided strictly as an illustrative example for educational and research purposes.

| Function     | Type                                            |
| ------------ | ----------------------------------------------- |
| `abStrategy` | `(asset: Asset, config?: ABConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { abStrategy } from './accelerationBandsStrategy';

const defaultConfig = { period: 20, multiplier: 4 };
const actions = abStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/volatility/accelerationBandsStrategy.ts#L31)

### bbStrategy

Demonstrates how to compose Bollinger Bands into an illustrative mean-reversion
volatility band signal.

Generates a SELL action when asset closing > Upper Band, a BUY action when
asset closing < Lower Band, and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function     | Type                                            |
| ------------ | ----------------------------------------------- |
| `bbStrategy` | `(asset: Asset, config?: BBConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { bbStrategy } from './bollingerBandsStrategy';

const defaultConfig = { period: 20 };
const actions = bbStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/volatility/bollingerBandsStrategy.ts#L31)

### poStrategy

Demonstrates how to compose the Projection Oscillator (PO) and smoothed PO
into an illustrative position signal. It emits an action on every bar based
on which value is higher, not only on the bars where they cross.

Generates a BUY action when PO > Smoothed PO, a SELL action when PO < Smoothed PO, and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function     | Type                                            |
| ------------ | ----------------------------------------------- |
| `poStrategy` | `(asset: Asset, config?: POConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { poStrategy } from './projectionOscillatorStrategy';

const defaultConfig = { period: 14, smooth: 3 };
const actions = poStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/volatility/projectionOscillatorStrategy.ts#L31)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

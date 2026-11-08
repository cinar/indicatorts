# Trend Strategy Examples

The examples in this directory illustrate how developers can compose trend indicator calculations into trading signals.

> **Disclaimer:** The examples provided here are strictly for educational and research purposes. They do not constitute investment advice or trading recommendations.

**NOTE:** All configuration objects for all example strategies are optional. If no configuration object is passed, default values will be used.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [apoStrategy](#apostrategy)
- [aroonStrategy](#aroonstrategy)
- [bopStrategy](#bopstrategy)
- [cfoStrategy](#cfostrategy)
- [kdjStrategy](#kdjstrategy)
- [macdStrategy](#macdstrategy)
- [psarStrategy](#psarstrategy)
- [typpriceStrategy](#typpricestrategy)
- [vortexStrategy](#vortexstrategy)
- [vwmaStrategy](#vwmastrategy)

### apoStrategy

Demonstrates how to compose the Absolute Price Oscillator (APO) indicator into
an illustrative trend-following signal.

Generates a BUY action when APO > 0, SELL when APO < 0, and HOLD when APO == 0.
Provided strictly as an illustrative example for educational and research purposes.

| Function      | Type                                             |
| ------------- | ------------------------------------------------ |
| `apoStrategy` | `(asset: Asset, config?: APOConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { apoStrategy } from './absolutePriceOscillatorStrategy';

const defaultConfig = { fast: 14, slow: 30 };
const actions = apoStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/absolutePriceOscillatorStrategy.ts#L30)

### aroonStrategy

Demonstrates how to compose the Aroon Indicator (Aroon Up and Aroon Down) into
an illustrative trend-following signal.

Generates a BUY action when Aroon Up > Aroon Down, SELL when Aroon Down > Aroon Up, and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function        | Type                                               |
| --------------- | -------------------------------------------------- |
| `aroonStrategy` | `(asset: Asset, config?: AroonConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { aroonStrategy } from './aroonStrategy';

const defaultConfig = { period: 25 };
const actions = aroonStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/aroonStrategy.ts#L30)

### bopStrategy

Demonstrates how to compose the Balance of Power (BOP) indicator into
an illustrative market strength signal.

Generates a BUY action when BOP > 0, SELL when BOP < 0, and HOLD when BOP == 0.
Provided strictly as an illustrative example for educational and research purposes.

| Function      | Type                         |
| ------------- | ---------------------------- |
| `bopStrategy` | `(asset: Asset) => Action[]` |

Parameters:

- `asset`: asset object.

Examples:

```TypeScript
import { bopStrategy } from './balanceOfPowerStrategy';

const actions = bopStrategy(asset);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/balanceOfPowerStrategy.ts#L24)

### cfoStrategy

Demonstrates how to compose the Chande Forecast Oscillator (CFO) indicator into
an illustrative trend signal.

Generates a BUY action when CFO > 0, SELL when CFO < 0, and HOLD when CFO == 0.
Provided strictly as an illustrative example for educational and research purposes.

Uses the moving CFO (mcfo), which fits the regression only over the
trailing window ending at each bar. The whole-series cfo fits its
regression over every bar, including future ones, so it would leak
future prices into earlier signals.

| Function      | Type                                              |
| ------------- | ------------------------------------------------- |
| `cfoStrategy` | `(asset: Asset, config?: MCFOConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { cfoStrategy } from './chandeForecastOscillatorStrategy';

const defaultConfig = { period: 4 };
const actions = cfoStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/chandeForecastOscillatorStrategy.ts#L35)

### kdjStrategy

Demonstrates how to compose Random Index (KDJ) indicator lines (%K and %D)
into an illustrative momentum crossover signal.

Generates a BUY action when %K crosses above %D and %K <= 20, a SELL action when
%K crosses below %D and %K >= 80, and HOLD otherwise. Equal and non-finite
values produce HOLD without changing the last strictly unequal, finite side.
No action is emitted until both sides have been observed.
Provided strictly as an illustrative example for educational and research purposes.

| Function      | Type                                             |
| ------------- | ------------------------------------------------ |
| `kdjStrategy` | `(asset: Asset, config?: KDJConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { kdjStrategy } from './kdjStrategy';

const defaultConfig = { rPeriod: 9, kPeriod: 3, dPeriod: 3 };
const actions = kdjStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/kdjStrategy.ts#L33)

### macdStrategy

Demonstrates how to compose Moving Average Convergence Divergence (MACD)
line and Signal line into an illustrative crossover signal.

Generates a BUY action when MACD Line crosses above Signal Line, a SELL action
when MACD Line crosses below Signal Line, and HOLD otherwise. Equal and
non-finite values produce HOLD without changing the last strictly unequal,
finite side. No action is emitted until both sides have been observed.
Provided strictly as an illustrative example for educational and research purposes.

| Function       | Type                                              |
| -------------- | ------------------------------------------------- |
| `macdStrategy` | `(asset: Asset, config?: MACDConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { macdStrategy } from './macdStrategy';

const defaultConfig = { fast: 12, slow: 26, signal: 9 };
const actions = macdStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/macdStrategy.ts#L33)

### psarStrategy

Demonstrates how to compose Parabolic SAR (PSAR) trend directions into
an illustrative trend-following signal.

Generates a BUY action when the trend is RISING, a SELL action when
the trend is FALLING, and HOLD when STABLE.
Provided strictly as an illustrative example for educational and research purposes.

| Function       | Type                                              |
| -------------- | ------------------------------------------------- |
| `psarStrategy` | `(asset: Asset, config?: PSARConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { psarStrategy } from './parabolicSarStrategy';

const defaultConfig = { step: 0.02, max: 0.2 };
const actions = psarStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/parabolicSarStrategy.ts#L42)

### typpriceStrategy

Demonstrates how to compose Typical Price changes into an illustrative
price-action signal.

Generates a BUY action when Typical Price increases relative to previous bar,
a SELL action when it decreases, and HOLD when unchanged.
Provided strictly as an illustrative example for educational and research purposes.

| Function           | Type                         |
| ------------------ | ---------------------------- |
| `typpriceStrategy` | `(asset: Asset) => Action[]` |

Parameters:

- `asset`: asset object.

Examples:

```TypeScript
import { typpriceStrategy } from './typicalPriceStrategy';

const actions = typpriceStrategy(asset);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/typicalPriceStrategy.ts#L25)

### vortexStrategy

Demonstrates how to compose Vortex Indicator (+VI and -VI) lines into
an illustrative directional trend signal.

Generates a BUY action when +VI > -VI, a SELL action when +VI < -VI, and HOLD when equal.
Provided strictly as an illustrative example for educational and research purposes.

| Function         | Type                                                |
| ---------------- | --------------------------------------------------- |
| `vortexStrategy` | `(asset: Asset, config?: VortexConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { vortexStrategy } from './vortexStrategy';

const defaultConfig = { period: 14 };
const actions = vortexStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/vortexStrategy.ts#L30)

### vwmaStrategy

Demonstrates how to compose Volume Weighted Moving Average (VWMA) and
Simple Moving Average (SMA) into an illustrative moving average position
signal. It emits an action on every bar based on which average is higher,
not only on the bars where they cross.

Generates a BUY action when VWMA > SMA, a SELL action when VWMA < SMA, and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function       | Type                                              |
| -------------- | ------------------------------------------------- |
| `vwmaStrategy` | `(asset: Asset, config?: VWMAConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Returns:

strategy actions.

Examples:

```TypeScript
import { vwmaStrategy } from './vwmaStrategy';

const defaultConfig = { period: 20 };
const actions = vwmaStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/trend/vwmaStrategy.ts#L33)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

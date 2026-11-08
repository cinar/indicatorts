# Momentum Strategy Examples

The examples in this directory illustrate how developers can compose momentum indicator calculations into trading signals.

> **Disclaimer:** The examples provided here are strictly for educational and research purposes. They do not constitute investment advice or trading recommendations.

**NOTE:** All configuration objects for all example strategies are optional. If no configuration object is passed, default values will be used.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [aoStrategy](#aostrategy)
- [ichimokuCloudStrategy](#ichimokucloudstrategy)
- [rsi2Strategy](#rsi2strategy)
- [stochStrategy](#stochstrategy)
- [willRStrategy](#willrstrategy)

### aoStrategy

Demonstrates how to compose the Awesome Oscillator (AO) indicator into an
illustrative momentum-based trading signal.

Generates a BUY action when AO > 0, SELL when AO < 0, and HOLD when AO == 0.
Provided strictly as an illustrative example for educational and research purposes.

| Function     | Type                                            |
| ------------ | ----------------------------------------------- |
| `aoStrategy` | `(asset: Asset, config?: AOConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { aoStrategy } from './awesomeOscillatorStrategy';

const defaultConfig = { fast: 5, slow: 34 };
const actions = aoStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/momentum/awesomeOscillatorStrategy.ts#L30)

### ichimokuCloudStrategy

Demonstrates how to compose Ichimoku Cloud components (Leading Span A and
Leading Span B) into an illustrative trend-following signal.

Generates a BUY action when Leading Span A > Leading Span B, SELL when Leading Span A < Leading Span B,
and HOLD when Leading Span A == Leading Span B.
Provided strictly as an illustrative example for educational and research purposes.

| Function                | Type                                                       |
| ----------------------- | ---------------------------------------------------------- |
| `ichimokuCloudStrategy` | `(asset: Asset, config?: IchimokuCloudConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { ichimokuCloudStrategy } from './ichimokuCloudStrategy';

const defaultConfig = { short: 9, medium: 26, long: 52, close: 26 };
const actions = ichimokuCloudStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/momentum/ichimokuCloudStrategy.ts#L31)

### rsi2Strategy

Demonstrates how to compose a 2-period Relative Strength Index (RSI) into
an illustrative mean-reversion trading signal.

Generates a BUY action when 2-period RSI < 10 (illustrating an oversold threshold),
a SELL action when 2-period RSI > 90 (illustrating an overbought threshold), and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function       | Type                         |
| -------------- | ---------------------------- |
| `rsi2Strategy` | `(asset: Asset) => Action[]` |

Parameters:

- `asset`: asset object.

Returns:

strategy actions.

Examples:

```TypeScript
import { rsi2Strategy } from './rsi2Strategy';

const actions = rsi2Strategy(asset);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/momentum/rsi2Strategy.ts#L25)

### stochStrategy

Demonstrates how to compose Stochastic Oscillator (%K and %D) indicators into
an illustrative overbought/oversold signal.

Generates a SELL action when %K >= 80 and %D >= 80, a BUY action when %K <= 20 and %D <= 20,
and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function        | Type                                               |
| --------------- | -------------------------------------------------- |
| `stochStrategy` | `(asset: Asset, config?: StochConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { stochStrategy } from './stochasticOscillatorStrategy';

const defaultConfig = { kPeriod: 14, dPeriod: 3 };
const actions = stochStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/momentum/stochasticOscillatorStrategy.ts#L31)

### willRStrategy

Demonstrates how to compose the Williams %R indicator into an illustrative
momentum trading signal.

Generates a BUY action when %R <= -80, a SELL action when %R >= -20, and HOLD otherwise.
Provided strictly as an illustrative example for educational and research purposes.

| Function        | Type                                               |
| --------------- | -------------------------------------------------- |
| `willRStrategy` | `(asset: Asset, config?: WillrConfig) => Action[]` |

Parameters:

- `asset`: asset object.
- `config`: configuration.

Examples:

```TypeScript
import { willRStrategy } from './williamsRStrategy';

const defaultConfig = { period: 14 };
const actions = willRStrategy(asset, defaultConfig);
```

[Source](https://github.com/cinar/indicatorts/tree/main/examples/momentum/williamsRStrategy.ts#L30)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

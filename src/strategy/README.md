# Strategy Core Primitives

This module provides the lightweight, generic abstractions and data structures for defining trading strategies, managing asset time series, and evaluating strategy action signals.

- [Strategy Core Primitives](#strategy-core-primitives)
  - [Asset](#asset)
    - [New Asset with Length](#new-asset-with-length)
    - [Concat Assets](#concat-assets)
  - [Strategy Function](#strategy-function)
  - [Action](#action)
    - [Reverse Actions](#reverse-actions)
    - [Apply Actions](#apply-actions)
  - [Strategy Examples](#strategy-examples)
  - [Disclaimer](#disclaimer)
  - [License](#license)

## Asset

The [Asset](./asset.ts) interface represents OHLCV (Open, High, Low, Close, Volume) bar series data along with timestamps:

```TypeScript
interface Asset {
  dates: Date[];
  openings: number[];
  closings: number[];
  highs: number[];
  lows: number[];
  volumes: number[];
}
```

### New Asset with Length

The [newAssetWithLength](./asset.ts) helper allocates an `Asset` object with all array fields pre-allocated to the specified length:

```TypeScript
import { newAssetWithLength } from 'indicatorts';

const asset = newAssetWithLength(2);
asset.closings[0] = 10;
asset.closings[1] = 20;
```

### Concat Assets

The [concatAssets](./asset.ts) helper joins two `Asset` time series into a single contiguous `Asset`:

```TypeScript
import { concatAssets } from 'indicatorts';

const combined = concatAssets(asset1, asset2);
```

## Strategy Function

The [StrategyFunction](./strategyFunction.ts) type represents a generic mathematical strategy mapping price bars into an array of signal actions:

```TypeScript
type StrategyFunction = (asset: Asset) => Action[];
```

## Action

The [Action](./action.ts) enum provides generic execution action states:

```TypeScript
enum Action {
  SELL = -1,
  HOLD = 0,
  BUY = 1,
}
```

### Reverse Actions

The [reverseActions](./action.ts) function inverts an array of actions (`BUY` becomes `SELL`, `SELL` becomes `BUY`, `HOLD` remains `HOLD`):

```TypeScript
import { Action, reverseActions } from 'indicatorts';

const actions = [Action.SELL, Action.HOLD, Action.BUY];
const reversed = reverseActions(actions);
// [Action.BUY, Action.HOLD, Action.SELL]
```

### Apply Actions

The [applyActions](./action.ts) function computes cumulative simulated gains across price bars given an array of actions and closing prices:

```TypeScript
import { applyActions } from 'indicatorts';

const gains = applyActions(closings, actions);
```

## Strategy Examples

Concrete strategy implementations (such as moving average crossovers, RSI thresholding, MACD signal lines, Bollinger Band breakouts, etc.) are located in the [`examples/`](../../examples) directory as pedagogical demonstrations.

## Disclaimer

The mathematical calculations, generic abstractions, and backtesting utilities provided in this project are strictly for educational and research purposes. They do not constitute investment advice or trading recommendations.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

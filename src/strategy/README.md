# Strategies

The strategies are where the results from one or more indicators gets combined to produce a recommended action.

**The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.**

- [Strategies](#strategies)
  - [Asset](#asset)
    - [New Asset with Length](#new-asset-with-length)
    - [Concat Assets](#concat-assets)
  - [Strategy Function](#strategy-function)
  - [Action](#action)
    - [Reverse Actions](#reverse-actions)
    - [Apply Actions](#apply-actions)
  - [Buy and Hold Strategy](#buy-and-hold-strategy)
  - [Disclaimer](#disclaimer)
  - [License](#license)

## Asset

The stragies operates on an [Asset](./asset.ts) with the following members.

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

The [newAssetWithLength](./asset.ts) function provides a new asset with each field initialized to the given length.

```TypeScript
import {newAssetWithLength} from 'indicatorts';

const asset = newAssetWithLength(2);

asset.closings[0] = 10;
asset.closings[1] = 20;
```

### Concat Assets

The [concatAssets](./asset.ts) function concats the given two assets.

```TypeScript
import {concatAssets} from 'indicatorts';

const asset = concatAssets(asset1, asset2);
```

## Strategy Function

The [StrategyFunction](./strategyFunction.ts) takes an [Asset](#asset), and provides an array of [Action](#action) for each row.

```TypeScript
type StrategyFunction = (asset: Asset) => Action[];
```

## Action

The following [Action](./action.ts) values are currently provided.

```TypeScript
enum Action {
  SELL = -1,
  HOLD = 0,
  BUY = 1,
}
```

### Reverse Actions

The [reverseActions](./action.ts) function returns the reverse of the provided actions.

```TypeScript
import {Action, reverseActions} from 'indicatorts';

const actions = [
	Action.SELL,
	Action.HOLD,
	Action.BUY
];

const result = reverseActions(actions);
// [
// 	Actions.BUY,
// 	Actions.HOLD,
// 	Actions.SELL
// ];
```

### Apply Actions

The [applyActions](./action.ts) function applies the given actions to the given closings and provides the gains at each step.

```TypeScript
import {applyActions} from 'indicatorts';

const gains = applyActions(closings, actions);
```

## Buy and Hold Strategy

The [buyAndHoldStrategy](./buyAndHoldStrategy.ts) provides a simple strategy to buy the given asset and hold it. It provides a good indicator for the change of asset's value without any other strategy is used.

```TypeScript
import {buyAndHoldStrategy} from 'indicatorts';

const actions = buyAndHoldStrategy(asset);
```

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

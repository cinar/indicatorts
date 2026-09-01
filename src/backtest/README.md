# Backtest

Backtesting evaluates how historical price series data would have behaved under a defined strategy function. The following backtesting data structures and functions are provided.

- [Backtest](#backtest)
  - [Strategy Info](#strategy-info)
  - [Strategy Result](#strategy-result)
  - [Backtest Function](#backtest-function)
  - [Company Info](#company-info)
  - [Company Result](#company-result)
  - [Strategy Stats](#strategy-stats)
    - [Compute Strategy Stats](#compute-strategy-stats)
  - [Disclaimer](#disclaimer)
  - [License](#license)

## Strategy Info

The [StrategyInfo](./strategyInfo.ts) pairs a strategy function with an identifying name.

```TypeScript
interface StrategyInfo {
  name: string;
  strategy: StrategyFunction;
}
```

It is used to define strategies for evaluation:

```TypeScript
import { StrategyInfo, Asset, Action } from 'indicatorts';

const myStrategyInfo: StrategyInfo = {
  name: 'Sample Strategy',
  strategy: (asset: Asset): Action[] => {
    // Custom strategy implementation returning Action[]
    return new Array(asset.closings.length).fill(Action.HOLD);
  }
};
```

For pre-built illustrative strategy examples, see the [examples/](../../examples) directory.

## Strategy Result

The [StrategyResult](./strategyResult.ts) provides the evaluated outcome of a strategy on an asset:

```TypeScript
interface StrategyResult {
  info: StrategyInfo;
  gain: number;
  lastAction: Action;
}
```

The _info_ is the [Strategy Info](#strategy-info), the _gain_ is the cumulative return at the end of the time series, and _lastAction_ is the final signal generated.

## Backtest Function

The [backtest](./backtest.ts) function takes an [Asset](../strategy/README.md#asset) and an array of [StrategyInfo](#strategy-info), returning a ranked array of [StrategyResult](#strategy-result) sorted by gain descending.

```TypeScript
import { backtest } from 'indicatorts';

const results = backtest(asset, [myStrategyInfo]);
```

## Company Info

The [CompanyInfo](../company/companyInfo.ts) provides metadata for a tracked instrument or company:

```TypeScript
interface CompanyInfo {
  symbol: string;
  name: string;
  sector: string;
  subIndustry: string;
}
```

## Company Result

The [CompanyResult](./companyResult.ts) associates company metadata with its strategy backtest results:

```TypeScript
interface CompanyResult {
  companyInfo: CompanyInfo;
  strategyResults: StrategyResult[];
}
```

## Strategy Stats

The [StrategyStats](./strategyStats.ts) aggregates strategy performance across multiple company/asset results:

```TypeScript
interface StrategyStats {
  strategyInfo: StrategyInfo;
  score: number;
  minGain: number;
  maxGain: number;
  averageGain: number;
}
```

### Compute Strategy Stats

The [computeStrategyStats](./strategyStats.ts) aggregates an array of [CompanyResult](#company-result) into [StrategyStats](#strategy-stats):

```TypeScript
import { computeStrategyStats } from 'indicatorts';

const stats = computeStrategyStats(companyResults);
```

## Disclaimer

The information and backtest framework provided in this project are strictly for informational, educational, and research purposes. Simulated results do not represent actual trading and are subject to inherent limitations.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

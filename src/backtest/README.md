# Backtest

Backtesting is the method for seeing how well a strategy would have done. The following backtesting functions are provided for evaluating strategies.

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

The [StrategyInfo](./strategyInfo.ts) provides a strategy function with a name.

```TypeScript
interface StrategyInfo {
  name: string;
  strategy: StrategyFunction;
}
```

It is used to define a new strategy for the backtest.

```TypeScript
import {StrategyInfo} from 'indicatorts';

const strategyInfo: StrategyInfo = {
    name: 'My Strategy',
    strategy: (asset: Asset): Action[] => {
        // Strategy Function
    }
};
```

The strategy infos for all strategies are provided under [STRATEGY_INFOS](./strategyInfo.ts).

## Strategy Result

The [StrategyResult](./strategyResult.ts) provides the result of a given strategy after the backtest.

```TypeScript
interface StrategyResult {
  info: StrategyInfo;
  gain: number;
  lastAction: Action;
}
```

The _info_ is the [Strategy Info](#strategy-info), the _gain_ is the result of the strategy at the end, and the _lastAction_ is the last action provided by the given strategy.

## Backtest Function

The [backtest](./backtest.ts) function takes an [Asset](../strategy/README.md#Asset), an array of [StrategyInfo](#strategy-info), and returns an array of [StrategyResult](#strategy-result).

```TypeScript
import {bactest} from 'indicatorts';

const results = backtest(asset, STRATEGY_INFOS);
```

## Company Info

The [CompanyInfo](../company/companyInfo.ts) provides the company information.

```TypeScript
interface CompanyInfo {
  symbol: string;
  name: string;
  sector: string;
  subIndustry: string;
}
```

The [SP500_COMPANIES](../company/companyInfo.ts) are provided.

## Company Result

The [CompanyResult](./companyResult.ts) provides the company result.

```TypeScript
interface CompanyResult {
  companyInfo: CompanyInfo;
  strategyResults: StrategyResult[];
}
```

The _companyInfo_ is the [CompanyInfo](#company-info), and _strategyResults_ is an array of [StrategyResult](#strategy-result).

## Strategy Stats

The [StrategyStats](./strategyStats.ts) provides the stats for a given strategy.

```TypeScript
interface StrategyStats {
  strategyInfo: StrategyInfo;
  score: number;
  minGain: number;
  maxGain: number;
  averageGain: number;
}
```

The _strategyInfo_ is the [StrategyInfo](#strategy-info) of the given strategy, _score_ is the total count of times this strategy generated the highest gain, the _minGain_ is the minimum gain, _maxGain_ is the maximum gain, and the _averageGain_ is the average gain.

### Compute Strategy Stats

The [computeStrategyStats](./strategyStats.ts) takes an array for [CompanyResult](#company-result), and returns an array of [StrategyStats](#strategy-stats).

```TypeScript
import {StrategyStats, computeStrategyStats} from 'indicatorts';

const stats = computeStrategyStats(companyResults);
```

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

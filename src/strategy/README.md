# Strategy Core Primitives

This module provides the lightweight, generic abstractions and data structures for defining trading strategies, managing asset time series, and evaluating strategy action signals.

- [Strategy Core Primitives](#strategy-core-primitives)
  - [Asset](#asset)
    - [New Asset with Length](#new-asset-with-length)
    - [Concat Assets](#concat-assets)
    - [Resample](#resample)
    - [Align Resampled](#align-resampled)
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

### Resample

The [resample](./resample.ts) function aggregates the bars of an `Asset` into a coarser interval, such as 1-minute bars into 1-hour bars or daily bars into weekly bars. Each output bar takes the first open, the highest high, the lowest low, the last close and the sum of the volumes of its bucket, and is dated at the start of the bucket.

```TypeScript
import { resample } from 'indicatorts';

const hourly = resample(minutes, { unit: 'hour' });
const fourHour = resample(minutes, { unit: 'hour', size: 4 });
const weekly = resample(daily, { unit: 'week' });
const quarterly = resample(daily, { unit: 'month', size: 3 });
```

Bucket boundaries are in UTC:

- `minute`, `hour` and `day` buckets are fixed durations counted from 1970-01-01 00:00 UTC, so 4-hour buckets start at 00:00, 04:00, 08:00 and so on.
- `week` buckets start on Monday 00:00 UTC.
- `month` buckets start on the first day of the month at 00:00 UTC; 3-month buckets start in January, April, July and October.

Buckets without any bars, such as weekends and holidays, are left out. The dates must be in ascending order, otherwise an error is thrown. The last bucket may hold only part of its interval when the data ends inside it; the `dropLast` option leaves it out.

### Align Resampled

The [alignResampled](./resample.ts) function maps values computed on a resampled series, one per bucket, back onto the original dates, so that results at two intervals can be compared row by row. A bucket's value is assigned to the last original row of that bucket, the first row at which all of its bars are known, and is carried forward to the following rows. Rows before the first bucket ends are `NaN`.

```TypeScript
import { alignResampled, resample, sma } from 'indicatorts';

const config = { unit: 'week' } as const;
const weekly = resample(daily, config);
const weeklySma = sma(weekly.closings, { period: 4 });
const aligned = alignResampled(daily.dates, weeklySma, config);
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

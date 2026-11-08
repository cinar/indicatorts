# Educational Strategy Examples

This directory contains illustrative strategy implementations demonstrating how developers can consume core indicator mathematics, combine signals, and evaluate strategies using the generic backtesting framework.

> **Disclaimer:** All strategies provided in this directory are strictly educational, illustrative demonstrations. They are not intended for live trading, and do not constitute financial, investment, or trading advice. Past or hypothetical performance is no guarantee of future results.

> **Note:** The example strategies are **not part of the `indicatorts` npm package**, so `import { macdStrategy } from 'indicatorts'` does not work. Copy the example you need into your own project, and import the indicators it uses from `indicatorts`. For example:
>
> ```TypeScript
> import { Action, Asset, macd } from 'indicatorts';
>
> export function macdStrategy(asset: Asset): Action[] {
>   const { macdLine, signalLine } = macd(asset.closings);
>   // ... see examples/trend/macdStrategy.ts
> }
> ```

## Overview

The examples demonstrate how to construct functions adhering to the `StrategyFunction` type signature:

```TypeScript
type StrategyFunction = (asset: Asset) => Action[];
```

Each strategy maps historical price bar data (`Asset`) into generic signal actions (`Action.BUY`, `Action.SELL`, `Action.HOLD`).

## Strategy Categories

- [Baseline Strategy](./buyAndHoldStrategy.ts)
  - [Buy and Hold Strategy](./buyAndHoldStrategy.ts)
- [Momentum Strategies](./momentum/README.md)
  - [Awesome Oscillator Strategy](./momentum/README.md#aostrategy)
  - [Ichimoku Cloud Strategy](./momentum/README.md#ichimokucloudstrategy)
  - [RSI 2 Strategy](./momentum/README.md#rsi2strategy)
  - [Stochastic Oscillator Strategy](./momentum/README.md#stochstrategy)
  - [Williams R Strategy](./momentum/README.md#willrstrategy)
- [Trend Strategies](./trend/README.md)
  - [Absolute Price Oscillator Strategy](./trend/README.md#apostrategy)
  - [Aroon Strategy](./trend/README.md#aroonstrategy)
  - [Balance of Power Strategy](./trend/README.md#bopstrategy)
  - [Chande Forecast Oscillator Strategy](./trend/README.md#cfostrategy)
  - [KDJ Strategy](./trend/README.md#kdjstrategy)
  - [MACD Strategy](./trend/README.md#macdstrategy)
  - [Parabolic SAR Strategy](./trend/README.md#psarstrategy)
  - [Typical Price Strategy](./trend/README.md#typpricestrategy)
  - [Volume Weighted Moving Average (VWMA) Strategy](./trend/README.md#vwmastrategy)
  - [Vortex Strategy](./trend/README.md#vortexstrategy)
- [Volatility Strategies](./volatility/README.md)
  - [Acceleration Bands Strategy](./volatility/README.md#abstrategy)
  - [Bollinger Bands Strategy](./volatility/README.md#bbstrategy)
  - [Projection Oscillator Strategy](./volatility/README.md#postrategy)
- [Volume Strategies](./volume/README.md)
  - [Chaikin Money Flow Strategy](./volume/README.md#cmfstrategy)
  - [Ease of Movement Strategy](./volume/README.md#emvstrategy)
  - [Force Index Strategy](./volume/README.md#fistrategy)
  - [Money Flow Index Strategy](./volume/README.md#mfistrategy)
  - [Negative Volume Index Strategy](./volume/README.md#nvistrategy)
  - [Volume Weighted Average Price Strategy](./volume/README.md#vwapstrategy)

## Usage Example

```TypeScript
import { backtest } from 'indicatorts';
import { STRATEGY_INFOS } from './strategyInfo';

const asset = {
  dates: [new Date(2023, 0, 1), new Date(2023, 0, 2)],
  openings: [100, 102],
  closings: [101, 105],
  highs: [103, 106],
  lows: [99, 101],
  volumes: [1000, 1500],
};

const results = backtest(asset, STRATEGY_INFOS);
console.log(results);
```

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.

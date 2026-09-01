# Educational Strategy Examples

This directory contains illustrative strategy implementations demonstrating how developers can consume core indicator mathematics, combine signals, and evaluate strategies using the generic backtesting framework.

> **Disclaimer:** All strategies provided in this directory are strictly educational, illustrative demonstrations. They are not intended for live trading, and do not constitute financial, investment, or trading advice. Past or hypothetical performance is no guarantee of future results.

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
  - [Awesome Oscillator Strategy](./momentum/README.md#awesome-oscillator-strategy)
  - [Ichimoku Cloud Strategy](./momentum/README.md#ichimoku-cloud-strategy)
  - [RSI 2 Strategy](./momentum/README.md#rsi-2-strategy)
  - [Stochastic Oscillator Strategy](./momentum/README.md#stochastic-oscillator-strategy)
  - [Williams R Strategy](./momentum/README.md#williams-r-strategy)
- [Trend Strategies](./trend/README.md)
  - [Absolute Price Oscillator Strategy](./trend/README.md#absolute-price-oscillator-strategy)
  - [Aroon Strategy](./trend/README.md#aroon-strategy)
  - [Balance of Power Strategy](./trend/README.md#balance-of-power-strategy)
  - [Chande Forecast Oscillator Strategy](./trend/README.md#chande-forecast-oscillator-strategy)
  - [KDJ Strategy](./trend/README.md#kdj-strategy)
  - [MACD Strategy](./trend/README.md#macd-strategy)
  - [Parabolic SAR Strategy](./trend/README.md#parabolic-sar-strategy)
  - [Typical Price Strategy](./trend/README.md#typical-price-strategy)
  - [Volume Weighted Moving Average (VWMA) Strategy](./trend/README.md#volume-weighted-moving-average-vwma-strategy)
  - [Vortex Strategy](./trend/README.md#vortex-strategy)
- [Volatility Strategies](./volatility/README.md)
  - [Acceleration Bands Strategy](./volatility/README.md#acceleration-bands-strategy)
  - [Bollinger Bands Strategy](./volatility/README.md#bollinger-bands-strategy)
  - [Projection Oscillator Strategy](./volatility/README.md#projection-oscillator-strategy)
- [Volume Strategies](./volume/README.md)
  - [Chaikin Money Flow Strategy](./volume/README.md#chaikin-money-flow-strategy)
  - [Ease of Movement Strategy](./volume/README.md#ease-of-movement-strategy)
  - [Force Index Strategy](./volume/README.md#force-index-strategy)
  - [Money Flow Index Strategy](./volume/README.md#money-flow-index-strategy)
  - [Negative Volume Index Strategy](./volume/README.md#negative-volume-index-strategy)
  - [Volume Weighted Average Price Strategy](./volume/README.md#volume-weighted-average-price-strategy)

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

[![npm version](https://badge.fury.io/js/indicatorts.svg)](https://badge.fury.io/js/indicatorts)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/cinar/indicatorts/actions/workflows/ci.yml/badge.svg)](https://github.com/cinar/indicatorts/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/cinar/indicatorts/branch/main/graph/badge.svg?token=302HZICPD0)](https://codecov.io/gh/cinar/indicatorts)
[![CodeQL Analysis](https://github.com/cinar/indicatorts/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/cinar/indicatorts/actions/workflows/codeql-analysis.yml)

# Indicator TS

Indicator is a TypeScript module providing various stock technical analysis indicators, strategies, and a backtest framework for trading.

_This is a clone of my [Indicator Go](https://github.com/cinar/indicator) Golang module._

## Indicators Provided

The following list of indicators are currently supported by this package:

### Trend Indicators

- [Absolute Price Oscillator (APO)](src/indicator/trend/README.md#absolute-price-oscillator-apo)
- [Aroon Indicator](src/indicator/trend/README.md#aroon)
- [Balance of Power (BOP)](src/indicator/trend/README.md#balance-of-power-bop)
- [Chande Forecast Oscillator (CFO)](src/indicator/trend/README.md#chande-forecast-oscillator-cfo)
- [Community Channel Index (CCI)](src/indicator/trend/README.md#community-channel-index-cci)
- [Double Exponential Moving Average (DEMA)](src/indicator/trend/README.md#double-exponential-moving-average-dema)
- [Exponential Moving Average (EMA)](src/indicator/trend/README.md#exponential-moving-average-ema)
- [Mass Index (MI)](src/indicator/trend/README.md#mass-index-mi)
- [Moving Average Convergence Divergence (MACD)](src/indicator/trend/README.md#moving-average-convergence-divergence-macd)
- [Moving Max (MMAX)](src/indicator/trend/README.md#moving-max-mmax)
- [Moving Min (MMIN)](src/indicator/trend/README.md#moving-min-mmin)
- [Moving Sum (MSUM)](src/indicator/trend/README.md#moving-sum-msum)
- [Parabolic SAR (PSAR)](src/indicator/trend/README.md#parabolic-sar-psar)
- [Qstick](src/indicator/trend/README.md#qstick)
- [Random Index (KDJ)](src/indicator/trend/README.md#random-index-kdj)
- [Rolling Moving Average (RMA)](src/indicator/trend/README.md#rolling-moving-average-rma)
- [Simple Moving Average (SMA)](src/indicator/trend/README.md#simple-moving-average-sma)
- [Since Change](src/indicator/trend/README.md#since-change)
- [Triple Exponential Moving Average (TEMA)](src/indicator/trend/README.md#triple-exponential-moving-average-tema)
- [Triangular Moving Average (TRIMA)](src/indicator/trend/README.md#triangular-moving-average-trima)
- [Triple Exponential Average (TRIX)](src/indicator/trend/README.md#triple-exponential-average-trix)
- [Typical Price](src/indicator/trend/README.md#typical-price)
- [Volume Weighted Moving Average (VWMA)](src/indicator/trend/README.md#volume-weighted-moving-average-vwma)
- [Vortex Indicator](src/indicator/trend/README.md#vortex-indicator)

### Momentum Indicators

- [Awesome Oscillator (AO)](src/indicator/momentum/README.md#awesome-oscillator-ao)
- [Chaikin Oscillator (CMO)](src/indicator/momentum/README.md#chaikin-oscillator-cmo)
- [Ichimoku Cloud](src/indicator/momentum/README.md#ichimoku-cloud)
- [Percentage Price Oscillator (PPO)](src/indicator/momentum/README.md#percentage-price-oscillator-ppo)
- [Percentage Volume Oscillator (PVO)](src/indicator/momentum/README.md#percentage-volume-oscillator-pvo)
- [Price Rate of Change (ROC)](src/indicator/momentum/README.md#price-rate-of-change-roc)
- [Relative Strength Index (RSI)](src/indicator/momentum/README.md#relative-strength-index-rsi)
- [Stochastic Oscillator (STOCH)](src/indicator/momentum/README.md#stochastic-oscillator-stoch)
- [Williams R (WILLR)](src/indicator/momentum/README.md#williams-r-willr)

### Volatility Indicators

- [Acceleration Bands (AB)](src/indicator/volatility/README.md#acceleration-bands-ab)
- [Average True Range (ATR)](src/indicator/volatility/README.md#average-true-range-atr)
- [Bollinger Bands (BB)](src/indicator/volatility/README.md#bollinger-bands-bb)
- [Bollinger Band Width (BBW)](src/indicator/volatility/README.md#bollinger-band-width-bbw)
- [Chandelier Exit (CE)](src/indicator/volatility/README.md#chandelier-exit-ce)
- [Donchian Channel (DC)](src/indicator/volatility/README.md#donchian-channel-dc)
- [Keltner Channel (KC)](src/indicator/volatility/README.md#keltner-channel-kc)
- [Moving Standard Deviation (MSTD)](src/indicator/volatility/README.md#moving-standard-deviation-mstd)
- [Projection Oscillator (PO)](src/indicator/volatility/README.md#projection-oscillator-po)
- [True Range (TR)](src/indicator/volatility/README.md#true-range-tr)
- [Ulcer Index (UI)](src/indicator/volatility/README.md#ulcer-index-ui)

### Volume Indicators

- [Accumulation/Distribution (AD)](src/indicator/volume/README.md#accumulationdistribution-ad)
- [Chaikin Money Flow (CMF)](src/indicator/volume/README.md#chaikin-money-flow-cmf)
- [Ease of Movement (EMV)](src/indicator/volume/README.md#ease-of-movement-emv)
- [Force Index (FI)](src/indicator/volume/README.md#force-index-fi)
- [Money Flow Index (MFI)](src/indicator/volume/README.md#money-flow-index-mfi)
- [Negative Volume Index (NVI)](src/indicator/volume/README.md#negative-volume-index-nvi)
- [On-Balance Volume (OBV)](src/indicator/volume/README.md#on-balance-volume-obv)
- [Volume Price Trend (VPT)](src/indicator/volume/README.md#volume-price-trend-vpt)
- [Volume Weighted Average Price (VWAP)](src/indicator/volume/README.md#volume-weighted-average-price-vwap)

## Strategies Provided

Strategies relies on the following:

- [Asset](src/strategy/README.md#asset)
  - [New Asset with Length](src/strategy/README.md#new-asset-with-length)
  - [Concat Assets](src/strategy/README.md#concat-assets)
- [Action](src/strategy/README.md#action)
  - [Reverse Actions](src/strategy/README.md#reverse-actions)
  - [Apply Actions](src/strategy/README.md#apply-actions)
- [Strategy Function](src/strategy/README.md#strategy-function)
- [Buy and Hold Strategy](src/strategy/README.md#buy-and-hold-strategy)

The following list of strategies are currently supported by this package:

### Trend Strategies

- [Absolute Price Oscillator Strategy](src/strategy/trend/README.md#absolute-price-oscillator-strategy)
- [Aroon Strategy](src/strategy/trend/README.md#aroon-strategy)
- [Balance of Power Strategy](src/strategy/trend/README.md#balance-of-power-strategy)
- [Chande Forecast Oscillator Strategy](src/strategy/trend/README.md#chande-forecast-oscillator-strategy)
- [KDJ Strategy](src/strategy/trend/README.md#kdj-strategy)
- [MACD Strategy](src/strategy/trend/README.md#macd-strategy)
- [Parabolic SAR Strategy](src/strategy/trend/README.md#parabolic-sar-strategy)
- [Typical Price Strategy](src/strategy/trend/README.md#typical-price-strategy)
- [Volume Weighted Moving Average (VWMA) Strategy](src/strategy/trend/README.md#volume-weighted-moving-average-vwma-strategy)
- [Vortex Strategy](src/strategy/trend/README.md#vortex-strategy)

### Momentum Strategies

- [Awesome Oscillator Strategy](src/strategy/momentum/README.md#awesome-oscillator-strategy)
- [Ichimoku Cloud Strategy](src/strategy/momentum/README.md#ichimoku-cloud-strategy)
- [RSI 2 Stategy](src/strategy/momentum/README.md#rsi-2-strategy)
- [Stochastic Oscillator Strategy](src/strategy/momentum/README.md#stochastic-oscillator-strategy)
- [Williams R Strategy](src/strategy/momentum/README.md#williams-r-strategy)

### Volatility Strategies

- [Acceleration Bands Strategy](src/strategy/volatility/README.md#acceleration-bands-strategy)
- [Bollinger Bands Strategy](src/strategy/volatility/README.md#bollinger-bands-strategy)
- [Projection Oscillator Strategy](src/strategy/volatility/README.md#projection-oscillator-strategy)

### Volume Strategies

- [Chaikin Money Flow Strategy](src/strategy/volume/README.md#chaikin-money-flow-strategy)
- [Ease of Movement Strategy](src/strategy/volume/README.md#ease-of-movement-strategy)
- [Force Index Strategy](src/strategy/volume/README.md#force-index-strategy)
- [Money Flow Index Strategy](src/strategy/volume/README.md#money-flow-index-strategy)
- [Negative Volume Index Strategy](src/strategy/volume/README.md#negative-volume-index-strategy)
- [Volume Weighted Average Price Strategy](src/strategy/volume/README.md#volume-weighted-average-price-strategy)

## Backtest

Backtesting is the method for seeing how well a strategy would have done. The following backtesting functions are provided for evaluating strategies.

- [Strategy Info](src/backtest/README.md#strategy-info)
- [Strategy Result](src/backtest/README.md#strategy-result)
- [Backtest Function](src/backtest/README.md#backtest-function)
- [Company Info](src/backtest/README.md#company-info)
- [Company Result](src/backtest/README.md#company-result)
- [Strategy Stats](src/backtest/README.md#strategy-stats)
  - [Compute Strategy Stats](src/backtest/README.md#compute-strategy-stats)

## Chart

Chart provides an easy way to plot the outcome of the indicators and the strategies.

- [Chart Initialization](src/chart/README.md#chart-initialization)
- [Data Set](src/chart/README.md#data-set)
- [Add Data](src/chart/README.md#add-data)
- [Remove Data](src/chart/README.md#remove-data)
- [Draw Chart](src/chart/README.md#draw-chart)

## Build

The project can be build from its source through the build command.

```bash
npm run build
```

## Usage

Install package.

```bash
npm install indicatorts
```

Import indicator.

```TypeScript
import { ao } from 'indicatorts';

const highs = [10, 20, 30, 40];
const lows = [1, 2, 3, 4];

// Awesome Oscillator!
const result = ao(highs, lows);
```

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

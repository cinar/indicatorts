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

- [Absolute Price Oscillator (APO)](src/indicator/trend/index.md#absolute-price-oscillator-apo)
- [Aroon Indicator](src/indicator/trend/index.md#aroon-indicator)
- [Balance of Power (BOP)](src/indicator/trend/index.md#balance-of-power-bop)
- [Chande Forecast Oscillator (CFO)](src/indicator/trend/index.md#chande-forecast-oscillator-cfo)
- [Community Channel Index (CMI)](src/indicator/trend/index.md#community-channel-index-cmi)
- [Double Exponential Moving Average (DEMA)](src/indicator/trend/index.md#double-exponential-moving-average-dema)
- [Exponential Moving Average (EMA)](src/indicator/trend/index.md#exponential-moving-average-ema)
- [Mass Index (MI)](src/indicator/trend/index.md#mass-index-mi)
- [Moving Average Convergence Divergence (MACD)](src/indicator/trend/index.md#moving-average-convergence-divergence-macd)
- [Moving Max](src/indicator/trend/index.md#moving-max)
- [Moving Min](src/indicator/trend/index.md#moving-min)
- [Moving Sum](src/indicator/trend/index.md#moving-sum)
- [Parabolic SAR](src/indicator/trend/index.md#parabolic-sar)
- [Qstick](src/indicator/trend/index.md#qstick)
- [Random Index (KDJ)](src/indicator/trend/index.md#random-index-kdj)
- [Rolling Moving Average (RMA)](src/indicator/trend/index.md#rolling-moving-average-rma)
- [Simple Moving Average (SMA)](src/indicator/trend/index.md#simple-moving-average-sma)
- [Since Change](src/indicator/trend/index.md#since-change)
- [Triple Exponential Moving Average (TEMA)](src/indicator/trend/index.md#triple-exponential-moving-average-tema)
- [Triangular Moving Average (TRIMA)](src/indicator/trend/index.md#triangular-moving-average-trima)
- [Triple Exponential Average (TRIX)](#triple-exponential-average-trix)
- [Typical Price](src/indicator/trend/index.md#typical-price)
- [Volume Weighted Moving Average (VWMA)](src/indicator/trend/index.md#volume-weighted-moving-average-vwma)
- [Vortex Indicator](src/indicator/trend/index.md#vortex-indicator)

### Momentum Indicators

- [Awesome Oscillator](src/indicator/momentum/index.md#awesome-oscillator)
- [Chaikin Oscillator](src/indicator/momentum/index.md#chaikin-oscillator)
- [Custom RSI](src/indicator/momentum/index.md#custom-rsi)
- [Ichimoku Cloud](src/indicator/momentum/index.md#ichimoku-cloud)
- [Percentage Price Oscillator (PPO)](src/indicator/momentum/index.md#percentage-price-oscillator-ppo)
- [Percentage Volume Oscillator (PVO)](src/indicator/momentum/index.md#percentage-volume-oscillator-pvo)
- [Price Rate of Change (ROC)](src/indicator/momentum/index.md#price-rate-of-change-roc)
- [Relative Strength Index (RSI)](src/indicator/momentum/index.md#relative-strength-index-rsi)
- [RSI 2](src/indicator/momentum/index.md#rsi-2)
- [Stochastic Oscillator](src/indicator/momentum/index.md#stochastic-oscillator)
- [Williams R](src/indicator/momentum/index.md#williams-r)

### Volatility Indicators

- [Acceleration Bands](src/indicator/volatility/index.md#acceleration-bands)
- [Actual True Range (ATR)](src/indicator/volatility/index.md#actual-true-range-atr)
- [Bollinger Band Width](src/indicator/volatility/index.md#bollinger-band-width)
- [Bollinger Bands](src/indicator/volatility/index.md#bollinger-bands)
- [Chandelier Exit](src/indicator/volatility/index.md#chandelier-exit)
- [Donchian Channel (DC)](src/indicator/volatility/index.md#donchian-channel-dc)
- [Keltner Channel (KC)](src/indicator/volatility/index.md#keltner-channel-kc)
- [Moving Standard Deviation (Std)](src/indicator/volatility/index.md#moving-standard-deviation-std)
- [Projection Oscillator (PO)](src/indicator/volatility/index.md#projection-oscillator-po)
- [Ulcer Index (UI)](src/indicator/volatility/index.md#ulcer-index-ui)

### Volume Indicators

- [Accumulation/Distribution (A/D)](src/indicator/volume/index.md#accumulationdistribution-ad)
- [Chaikin Money Flow (CMF)](src/indicator/volume/index.md#chaikin-money-flow-cmf)
- [Ease of Movement (EMV)](src/indicator/volume/index.md#ease-of-movement-emv)
- [Force Index (FI)](src/indicator/volume/index.md#force-index-fi)
- [Money Flow Index (MFI)](src/indicator/volume/index.md#money-flow-index-mfi)
- [Negative Volume Index (NVI)](src/indicator/volume/index.md#negative-volume-index-nvi)
- [On-Balance Volume (OBV)](src/indicator/volume/index.md#on-balance-volume-obv)
- [Volume Price Trend (VPT)](src/indicator/volume/index.md#volume-price-trend-vpt)
- [Volume Weighted Average Price (VWAP)](src/indicator/volume/index.md#volume-weighted-average-price-vwap)

## Strategies Provided

Strategies relies on the following:

- [Asset](src/strategy/index.md#asset)
  - [New Asset with Length](src/strategy/index.md#new-asset-with-length)
  - [Concat Assets](src/strategy/index.md#concat-assets)
- [Action](src/strategy/index.md#action)
  - [Reverse Actions](src/strategy/index.md#reverse-actions)
  - [Apply Actions](src/strategy/index.md#apply-actions)
- [Strategy Function](src/strategy/index.md#strategy-function)
- [Buy and Hold Strategy](src/strategy/index.md#buy-and-hold-strategy)

The following list of strategies are currently supported by this package:

### Trend Strategies

- [Absolute Price Oscillator Strategy](src/strategy/trend/index.md#absolute-price-oscillator-strategy)
- [Aroon Strategy](src/strategy/trend/index.md#aroon-strategy)
- [Balance of Power Strategy](src/strategy/trend/index.md#balance-of-power-strategy)
- [Chande Forecast Oscillator Strategy](src/strategy/trend/index.md#chande-forecast-oscillator-strategy)
- [MACD Strategy](src/strategy/trend/index.md#macd-strategy)
- [KDJ Strategy](src/strategy/trend/index.md#kdj-strategy)
- [Parabolic SAR Strategy](src/strategy/trend/index.md#parabolic-sar-strategy)
- [Typical Price Strategy](src/strategy/trend/index.md#typical-price-strategy)
- [Volume Weighted Moving Average (VWMA) Strategy](src/strategy/trend/index.md#volume-weighted-moving-average-vwma-strategy)
- [Vortex Strategy](src/strategy/trend/index.md#vortex-strategy)

### Momentum Strategies

- [Awesome Oscillator Strategy](src/strategy/momentum/index.md#awesome-oscillator-strategy)
- [Ichimoku Cloud Strategy](src/strategy/momentum/index.md#ichimoku-cloud-strategy)
- [RSI 2 Stategy](src/strategy/momentum/index.md#rsi-2-strategy)
- [Stochastic Oscillator Strategy](src/strategy/momentum/index.md#stochastic-oscillator-strategy)
- [Williams R Strategy](src/strategy/momentum/index.md#williams-r-strategy)

### Volatility Strategies

- [Acceleration Bands Strategy](src/strategy/volatility/index.md#acceleration-bands-strategy)
- [Bollinger Bands Strategy](src/strategy/volatility/index.md#bollinger-bands-strategy)
- [Projection Oscillator Strategy](src/strategy/volatility/index.md#projection-oscillator-strategy)

### Volume Strategies

- [Chaikin Money Flow Strategy](src/strategy/volume/index.md#chaikin-money-flow-strategy)
- [Ease of Movement Strategy](src/strategy/volume/index.md#ease-of-movement-strategy)
- [Force Index Strategy](src/strategy/volume/index.md#force-index-strategy)
- [Money Flow Index Strategy](src/strategy/volume/index.md#money-flow-index-strategy)
- [Negative Volume Index Strategy](src/strategy/volume/index.md#negative-volume-index-strategy)
- [Volume Weighted Average Price Strategy](src/strategy/volume/index.md#volume-weighted-average-price-strategy)

## Backtest

Backtesting is the method for seeing how well a strategy would have done. The following backtesting functions are provided for evaluating strategies.

- [Strategy Info](src/backtest/index.md#strategy-info)
- [Strategy Result](src/backtest/index.md#strategy-result)
- [Backtest Function](src/backtest/index.md#backtest-function)
- [Company Info](src/backtest/index.md#company-info)
- [Company Result](src/backtest/index.md#company-result)
- [Strategy Stats](src/backtest/index.md#strategy-stats)
  - [Compute Strategy Stats](src/backtest/index.md#compute-strategy-stats)

## Chart

Chart provides an easy way to plot the outcome of the indicators and the strategies.

- [Chart Initialization](src/chart/index.md#chart-initialization)
- [Data Set](src/chart/index.md#data-set)
- [Add Data](src/chart/index.md#add-data)
- [Remove Data](src/chart/index.md#remove-data)
- [Draw Chart](src/chart/index.md#draw-chart)

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
import {awesomeOscillator} from 'indicatorts';

const highs = [10, 20, 30, 40];
const lows = [1, 2, 3, 4];

const ao = awesomeOscillator(highs, lows);
```

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

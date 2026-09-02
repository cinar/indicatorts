[![npm version](https://badge.fury.io/js/indicatorts.svg)](https://badge.fury.io/js/indicatorts)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/cinar/indicatorts/actions/workflows/ci.yml/badge.svg)](https://github.com/cinar/indicatorts/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/cinar/indicatorts/branch/main/graph/badge.svg?token=302HZICPD0)](https://codecov.io/gh/cinar/indicatorts)
[![CodeQL Analysis](https://github.com/cinar/indicatorts/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/cinar/indicatorts/actions/workflows/codeql-analysis.yml)

# Indicator TS

Indicator TS is a TypeScript module providing pure technical analysis mathematics, statistical calculations, and generic backtesting utilities for browser and server environments.

_This is a TypeScript implementation of the [Indicator Go](https://github.com/cinar/indicator) Golang module._

## ⚠️ Legal Disclaimers & Risk Disclosures

### 1. Educational and Research Purpose Only
The software, algorithms, technical indicators, mathematical formulas, demonstrative strategy examples, and backtesting utilities provided in this project are strictly for educational, research, and informational purposes. Nothing contained in this codebase, documentation, or associated examples constitutes financial, investment, legal, tax, or trading advice, nor a solicitation, recommendation, endorsement, or offer to buy or sell any security, commodity, futures contract, option, cryptocurrency, or other financial instrument.

### 2. Non-Advisory and Non-Fiduciary Status
The authors, maintainers, and contributors of this library are NOT registered investment advisors (RIAs), commodity trading advisors (CTAs), broker-dealers, or certified financial analysts under the jurisdiction of the U.S. Securities and Exchange Commission (SEC), Commodity Futures Trading Commission (CFTC), Financial Industry Regulatory Authority (FINRA), or any other regulatory authority worldwide. No fiduciary, advisory, or professional relationship is created through your access, use, or implementation of this software.

### 3. Risk of Substantial Financial Loss and Leverage
Trading in financial markets—including stocks, options, futures, foreign exchange (Forex), and cryptocurrencies—involves substantial risk of loss and is not suitable for every investor. Market values fluctuate rapidly, and the use of leverage, margin, or derivative instruments can multiply losses, potentially resulting in the total loss of capital or liabilities exceeding the initial investment. You should independently assess your risk tolerance and financial situation before engaging in any trading activity.

### 4. CFTC Rule 4.41: Hypothetical Performance Disclosure
HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN INHERENT LIMITATIONS. UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. ALSO, SINCE THE TRADES HAVE NOT ACTUALLY BEEN EXECUTED, THE RESULTS MAY HAVE UNDER- OR OVER-COMPENSATED FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY, SPREADS, COMMISSIONS, OR MARKET SLIPPAGE. SIMULATED TRADING PROGRAMS IN GENERAL ARE ALSO SUBJECT TO THE FACT THAT THEY ARE DESIGNED WITH THE BENEFIT OF HINDSIGHT. NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFITS OR LOSSES SIMILAR TO THOSE SHOWN. PAST PERFORMANCE IS NO GUARANTEE OF FUTURE RESULTS.

### 5. "AS IS" Warranty & Limitation of Liability
THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS, CONTRIBUTORS, OR COPYRIGHT HOLDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, FINANCIAL LOSSES, TRADING LOSSES, LOSS OF PROFITS, DATA LOSS OR CORRUPTION, SYSTEM DOWNTIME, OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY ARISING IN ANY WAY OUT OF THE USE OF OR INABILITY TO USE THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

---

## Indicators Provided

The following technical analysis indicators are supported by this package:

### Trend Indicators

- [Absolute Price Oscillator (APO)](src/indicator/trend/README.md#absolute-price-oscillator-apo)
- [Aroon Indicator](src/indicator/trend/README.md#aroon)
- [Balance of Power (BOP)](src/indicator/trend/README.md#balance-of-power-bop)
- [Chande Forecast Oscillator (CFO)](src/indicator/trend/README.md#chande-forecast-oscillator-cfo)
- [Commodity Channel Index (CCI)](src/indicator/trend/README.md#commodity-channel-index-cci)
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
- [Chaikin Oscillator (CO)](src/indicator/momentum/README.md#chaikin-oscillator-co)
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

## Strategy Primitives & Execution Abstractions

The core engine provides lightweight, generic abstractions for price bar series and trading signals:

- [Asset](src/strategy/README.md#asset)
  - [New Asset with Length](src/strategy/README.md#new-asset-with-length)
  - [Concat Assets](src/strategy/README.md#concat-assets)
- [Action](src/strategy/README.md#action)
  - [Reverse Actions](src/strategy/README.md#reverse-actions)
  - [Apply Actions](src/strategy/README.md#apply-actions)
- [Strategy Function](src/strategy/README.md#strategy-function)

## Educational Strategy Examples

Pre-baked illustrative strategies are organized in the [`examples/`](examples) directory as pedagogical demonstrations showing how developers can consume indicator mathematics:

- **Baseline Strategy:** [Buy and Hold Strategy](examples/buyAndHoldStrategy.ts)
- **Momentum Strategy Examples:** [Awesome Oscillator](examples/momentum/README.md#awesome-oscillator-strategy), [Ichimoku Cloud](examples/momentum/README.md#ichimoku-cloud-strategy), [RSI 2](examples/momentum/README.md#rsi-2-strategy), [Stochastic Oscillator](examples/momentum/README.md#stochastic-oscillator-strategy), [Williams R](examples/momentum/README.md#williams-r-strategy)
- **Trend Strategy Examples:** [APO](examples/trend/README.md#absolute-price-oscillator-strategy), [Aroon](examples/trend/README.md#aroon-strategy), [BOP](examples/trend/README.md#balance-of-power-strategy), [CFO](examples/trend/README.md#chande-forecast-oscillator-strategy), [KDJ](examples/trend/README.md#kdj-strategy), [MACD](examples/trend/README.md#macd-strategy), [Parabolic SAR](examples/trend/README.md#parabolic-sar-strategy), [Typical Price](examples/trend/README.md#typical-price-strategy), [VWMA](examples/trend/README.md#volume-weighted-moving-average-vwma-strategy), [Vortex](examples/trend/README.md#vortex-strategy)
- **Volatility Strategy Examples:** [Acceleration Bands](examples/volatility/README.md#acceleration-bands-strategy), [Bollinger Bands](examples/volatility/README.md#bollinger-bands-strategy), [Projection Oscillator](examples/volatility/README.md#projection-oscillator-strategy)
- **Volume Strategy Examples:** [Chaikin Money Flow](examples/volume/README.md#chaikin-money-flow-strategy), [Ease of Movement](examples/volume/README.md#ease-of-movement-strategy), [Force Index](examples/volume/README.md#force-index-strategy), [Money Flow Index](examples/volume/README.md#money-flow-index-strategy), [Negative Volume Index](examples/volume/README.md#negative-volume-index-strategy), [VWAP](examples/volume/README.md#volume-weighted-average-price-strategy)

## Backtest Framework

A lightweight, generic backtest utility is provided for evaluating custom strategy functions against historical data:

- [Strategy Info](src/backtest/README.md#strategy-info)
- [Strategy Result](src/backtest/README.md#strategy-result)
- [Backtest Function](src/backtest/README.md#backtest-function)
- [Company Info](src/backtest/README.md#company-info)
- [Company Result](src/backtest/README.md#company-result)
- [Strategy Stats](src/backtest/README.md#strategy-stats)
  - [Compute Strategy Stats](src/backtest/README.md#compute-strategy-stats)

## Chart

Chart provides utilities to plot indicator values and simulated strategies:

- [Chart Initialization](src/chart/README.md#chart-initialization)
- [Data Set](src/chart/README.md#data-set)
- [Add Data](src/chart/README.md#add-data)
- [Remove Data](src/chart/README.md#remove-data)
- [Draw Chart](src/chart/README.md#draw-chart)

## Build

The project can be built from source:

```bash
npm run build
```

## Usage

Install the package:

```bash
npm install indicatorts
```

Import and calculate technical indicators:

```TypeScript
import { ao } from 'indicatorts';

const highs = [10, 20, 30, 40];
const lows = [1, 2, 3, 4];

// Calculate Awesome Oscillator (AO)
const result = ao(highs, lows);
```

## License

The source code is provided under the MIT License.

```
Copyright © 2022-2026 The Indicator Authors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Trademarks

- **Bollinger Bands®** is a registered trademark of John Bollinger.
- All other product names, logos, and brands mentioned herein are trademarks or registered trademarks of their respective owners. Mention of third-party products, services, or trademarks is for nominative identification and educational purposes only and does not imply affiliation or endorsement.

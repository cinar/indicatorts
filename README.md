<p align="center">
    <a href="https://www.npmjs.com/package/indicatorts"><img src="https://img.shields.io/npm/v/indicatorts?style=for-the-badge&logo=npm&logoColor=white" alt="npm version" /></a>
    <a href="LICENSE.md"><img src="https://img.shields.io/github/license/cinar/indicatorts?style=for-the-badge" alt="License" /></a>
    <a href="https://github.com/cinar/indicatorts/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/cinar/indicatorts/ci.yml?branch=main&style=for-the-badge&logo=github&label=CI" alt="Build Status" /></a>
    <a href="https://codecov.io/gh/cinar/indicatorts"><img src="https://img.shields.io/codecov/c/github/cinar/indicatorts?style=for-the-badge&logo=codecov&logoColor=white" alt="codecov" /></a>
    <a href="https://github.com/cinar/indicatorts/actions/workflows/codeql-analysis.yml"><img src="https://img.shields.io/github/actions/workflow/status/cinar/indicatorts/codeql-analysis.yml?branch=main&style=for-the-badge&logo=github&label=CodeQL" alt="CodeQL Analysis" /></a>
    <a href="https://github.com/cinar/indicatorts/stargazers"><img src="https://img.shields.io/github/stars/cinar/indicatorts?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Stars" /></a>
</p>

# Indicator TS

Indicator TS is a TypeScript module providing pure technical analysis mathematics, statistical calculations, and generic backtesting utilities for browser and server environments.

_This is a TypeScript implementation of the [Indicator Go](https://github.com/cinar/indicator) Golang module._

> **Maintenance status:** This project is no longer actively developed, and new features are not planned. I will do my best to review issues and pull requests. It is provided as is under the [MIT License](LICENSE.md).

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

- [Absolute Price Oscillator (APO)](src/indicator/trend/README.md#apo)
- [Aroon Indicator](src/indicator/trend/README.md#aroon)
- [Balance of Power (BOP)](src/indicator/trend/README.md#bop)
- [Chande Forecast Oscillator (CFO)](src/indicator/trend/README.md#cfo)
- [Commodity Channel Index (CCI)](src/indicator/trend/README.md#cci)
- [Detrended Price Oscillator (DPO)](src/indicator/trend/README.md#dpo)
- [Double Exponential Moving Average (DEMA)](src/indicator/trend/README.md#dema)
- [Exponential Moving Average (EMA)](src/indicator/trend/README.md#ema)
- [Hull Moving Average (HMA)](src/indicator/trend/README.md#hma)
- [Kaufman's Adaptive Moving Average (KAMA)](src/indicator/trend/README.md#kama)
- [Know Sure Thing (KST)](src/indicator/trend/README.md#kst)
- [Mass Index (MI)](src/indicator/trend/README.md#mi)
- [McGinley Dynamic (MD)](src/indicator/trend/README.md#md)
- [Moving Average Convergence Divergence (MACD)](src/indicator/trend/README.md#macd)
- [Moving Average Envelope](src/indicator/trend/README.md#envelope)
- [Moving Max (MMAX)](src/indicator/trend/README.md#mmax)
- [Moving Min (MMIN)](src/indicator/trend/README.md#mmin)
- [Moving Sum (MSUM)](src/indicator/trend/README.md#msum)
- [Parabolic SAR (PSAR)](src/indicator/trend/README.md#psar)
- [Pivot Point](src/indicator/trend/README.md#pivotpoint)
- [Qstick](src/indicator/trend/README.md#qstick)
- [Random Index (KDJ)](src/indicator/trend/README.md#kdj)
- [Rolling Moving Average (RMA)](src/indicator/trend/README.md#rma)
- [Schaff Trend Cycle (STC)](src/indicator/trend/README.md#stc)
- [Simple Moving Average (SMA)](src/indicator/trend/README.md#sma)
- [Since Change](src/indicator/trend/README.md#since)
- [Slope](src/indicator/trend/README.md#slope)
- [Slow Stochastic](src/indicator/trend/README.md#slowstochastic)
- [Smoothed Moving Average (SMMA)](src/indicator/trend/README.md#smma)
- [Stochastic](src/indicator/trend/README.md#stochastic)
- [Tillson T3 Moving Average (T3)](src/indicator/trend/README.md#t3)
- [Triple Exponential Moving Average (TEMA)](src/indicator/trend/README.md#tema)
- [Triangular Moving Average (TRIMA)](src/indicator/trend/README.md#trima)
- [Triple Exponential Average (TRIX)](src/indicator/trend/README.md#trix)
- [True Strength Index (TSI)](src/indicator/trend/README.md#tsi)
- [Typical Price](src/indicator/trend/README.md#typprice)
- [Volume Weighted Moving Average (VWMA)](src/indicator/trend/README.md#vwma)
- [Vortex Indicator](src/indicator/trend/README.md#vortex)
- [Weighted Close](src/indicator/trend/README.md#weightedclose)
- [Weighted Moving Average (WMA)](src/indicator/trend/README.md#wma)

### Momentum Indicators

- [Awesome Oscillator (AO)](src/indicator/momentum/README.md#ao)
- [Chaikin Oscillator (CO)](src/indicator/momentum/README.md#co)
- [Connors RSI (CRSI)](src/indicator/momentum/README.md#crsi)
- [Coppock Curve](src/indicator/momentum/README.md#coppockcurve)
- [Ehlers Fisher Transform](src/indicator/momentum/README.md#ehlersfisher)
- [Elder-Ray Index](src/indicator/momentum/README.md#elderray)
- [Fisher Transform](src/indicator/momentum/README.md#fisher)
- [Ichimoku Cloud](src/indicator/momentum/README.md#ichimokucloud)
- [Internal Bar Strength (IBS)](src/indicator/momentum/README.md#ibs)
- [Percentage Price Oscillator (PPO)](src/indicator/momentum/README.md#ppo)
- [Percentage Volume Oscillator (PVO)](src/indicator/momentum/README.md#pvo)
- [Price Rate of Change (ROC)](src/indicator/momentum/README.md#roc)
- [Pring's Special K](src/indicator/momentum/README.md#specialk)
- [Relative Strength Index (RSI)](src/indicator/momentum/README.md#rsi)
- [Relative Vigor Index (RVI)](src/indicator/momentum/README.md#rvi)
- [Stochastic Oscillator (STOCH)](src/indicator/momentum/README.md#stoch)
- [Stochastic RSI (StochRSI)](src/indicator/momentum/README.md#stochrsi)
- [TD Sequential](src/indicator/momentum/README.md#tdsequential)
- [Ultimate Oscillator (UO)](src/indicator/momentum/README.md#uo)
- [Williams R (WILLR)](src/indicator/momentum/README.md#willr)

### Volatility Indicators

- [Acceleration Bands (AB)](src/indicator/volatility/README.md#ab)
- [Annualized Historical Volatility (AHV)](src/indicator/volatility/README.md#ahv)
- [Average True Range (ATR)](src/indicator/volatility/README.md#atr)
- [Bollinger Bands (BB)](src/indicator/volatility/README.md#bb)
- [Bollinger Band Width (BBW)](src/indicator/volatility/README.md#bbw)
- [Chandelier Exit (CE)](src/indicator/volatility/README.md#ce)
- [Choppiness Index (CHOP)](src/indicator/volatility/README.md#chop)
- [Donchian Channel (DC)](src/indicator/volatility/README.md#dc)
- [Historical Volatility (HV)](src/indicator/volatility/README.md#hv)
- [Keltner Channel (KC)](src/indicator/volatility/README.md#kc)
- [Moving Standard Deviation (MSTD)](src/indicator/volatility/README.md#mstd)
- [Percent B (%B)](src/indicator/volatility/README.md#percentb)
- [Projection Oscillator (PO)](src/indicator/volatility/README.md#po)
- [Super Trend](src/indicator/volatility/README.md#supertrend)
- [True Range (TR)](src/indicator/volatility/README.md#tr)
- [Ulcer Index (UI)](src/indicator/volatility/README.md#ui)
- [Z-Score](src/indicator/volatility/README.md#zscore)

### Volume Indicators

- [Accumulation/Distribution (AD)](src/indicator/volume/README.md#ad)
- [Chaikin Money Flow (CMF)](src/indicator/volume/README.md#cmf)
- [Ease of Movement (EMV)](src/indicator/volume/README.md#emv)
- [Force Index (FI)](src/indicator/volume/README.md#fi)
- [Klinger Volume Oscillator (KVO)](src/indicator/volume/README.md#kvo)
- [Money Flow Index (MFI)](src/indicator/volume/README.md#mfi)
- [Money Flow Multiplier (MFM)](src/indicator/volume/README.md#mfm)
- [Money Flow Volume (MFV)](src/indicator/volume/README.md#mfv)
- [Negative Volume Index (NVI)](src/indicator/volume/README.md#nvi)
- [On-Balance Volume (OBV)](src/indicator/volume/README.md#obv)
- [Volume Price Trend (VPT)](src/indicator/volume/README.md#vpt)
- [Volume Weighted Average Price (VWAP)](src/indicator/volume/README.md#vwap)

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

- **Baseline Strategy:** [Buy and Hold Strategy](examples/buyAndHoldStrategy.ts)
- **Momentum Strategy Examples:** [Awesome Oscillator](examples/momentum/README.md#aostrategy), [Ichimoku Cloud](examples/momentum/README.md#ichimokucloudstrategy), [RSI 2](examples/momentum/README.md#rsi2strategy), [Stochastic Oscillator](examples/momentum/README.md#stochstrategy), [Williams R](examples/momentum/README.md#willrstrategy)
- **Trend Strategy Examples:** [APO](examples/trend/README.md#apostrategy), [Aroon](examples/trend/README.md#aroonstrategy), [BOP](examples/trend/README.md#bopstrategy), [CFO](examples/trend/README.md#cfostrategy), [KDJ](examples/trend/README.md#kdjstrategy), [MACD](examples/trend/README.md#macdstrategy), [Parabolic SAR](examples/trend/README.md#psarstrategy), [Typical Price](examples/trend/README.md#typpricestrategy), [VWMA](examples/trend/README.md#vwmastrategy), [Vortex](examples/trend/README.md#vortexstrategy)
- **Volatility Strategy Examples:** [Acceleration Bands](examples/volatility/README.md#abstrategy), [Bollinger Bands](examples/volatility/README.md#bbstrategy), [Projection Oscillator](examples/volatility/README.md#postrategy)
- **Volume Strategy Examples:** [Chaikin Money Flow](examples/volume/README.md#cmfstrategy), [Ease of Movement](examples/volume/README.md#emvstrategy), [Force Index](examples/volume/README.md#fistrategy), [Money Flow Index](examples/volume/README.md#mfistrategy), [Negative Volume Index](examples/volume/README.md#nvistrategy), [VWAP](examples/volume/README.md#vwapstrategy)

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

## Contributing

Bug reports and pull requests are welcome. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for the development setup, coding standards and the reference data testing approach.

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

## Warm-up and seeding

Indicators that smooth values recursively need a starting value. This library returns an output for every input index, so it starts at the first bar, while TA-Lib and several other libraries start from a simple average of the first `period` values and leave the earlier outputs empty. The formulas are otherwise the same, so the outputs converge, but the first values differ.

| Building block                                    | This library                                                     | TA-Lib                                                                  |
| ------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [EMA](src/indicator/trend/README.md#ema)          | Starts from the first value: `ema[0] = values[0]`                | Starts from the SMA of the first `period` values, at index `period - 1` |
| [RMA](src/indicator/trend/README.md#rma) (Wilder) | Average of the values so far until `period` values are available | Same                                                                    |
| [RSI](src/indicator/momentum/README.md#rsi)       | Counts the first bar as a gain and loss of 0                     | Starts from the second bar (the first price change)                     |
| [ATR](src/indicator/volatility/README.md#atr)     | Includes the first bar's true range (high minus low)             | Starts from the second bar                                              |

The difference fades over time. For a 12-period EMA on the test data, it is 0.21 at the 12th bar, 0.03 at the 24th, and below 0.004 after the 36th. Indicators built on these blocks inherit the difference: DEMA, TEMA, TRIX, MACD, APO, PPO, PVO, Chaikin Oscillator, Mass Index, Bollinger Bands Width, Keltner Channel, Chandelier Exit, Projection Oscillator and Force Index. Both conventions are supported. The building blocks and the indicators that TA-Lib also provides take a `seed` option: `'first'` (the default) is the behavior described above, and `'sma'` starts from a simple moving average and leaves the warm-up results `NaN`, as TA-Lib does. With `seed: 'sma'`, these match TA-Lib's output, which the tests check against reference data generated with TA-Lib:

| Indicator                   | TA-Lib function                                            |
| --------------------------- | ---------------------------------------------------------- |
| `ema`, `dema`, `tema`       | `EMA`, `DEMA`, `TEMA`                                      |
| `trix`                      | `TRIX` (TA-Lib returns a percentage, this library a ratio) |
| `macd`, `apo`, `ppo`, `pvo` | `MACD`, `APO`, `PPO` (with an EMA)                         |
| `rsi`, `atr`                | `RSI`, `ATR`                                               |
| `rma`                       | Wilder smoothing, as used by `RSI` and `ATR`               |

```TypeScript
import { macd, rsi } from 'indicatorts';

const { macdLine, signalLine } = macd(closings, { seed: 'sma' });
const result = rsi(closings, { period: 14, seed: 'sma' });
```

The other indicators built on these blocks use the default. To compare them with other libraries, skip the first few multiples of `period` values.

Indicators without recursive smoothing, such as SMA, Bollinger Bands, Stochastic Oscillator, Williams %R, CCI and MFI, match TA-Lib from the first full window.

The indicators ported from the [Go version](https://github.com/cinar/indicator) of this library, such as WMA, HMA, T3 and KST, follow its conventions instead: their exponential and Wilder averages start from a simple moving average, and the results that are not available yet are `NaN`. Each one documents its warm-up period, and the tests check them against reference data generated with the Go library.

## License

The source code is provided under the [MIT License](LICENSE.md).

> Copyright © 2022-2026 The Indicator Authors
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Trademarks

- **Bollinger Bands®** is a registered trademark of John Bollinger.
- All other product names, logos, and brands mentioned herein are trademarks or registered trademarks of their respective owners. Mention of third-party products, services, or trademarks is for nominative identification and educational purposes only and does not imply affiliation or endorsement.

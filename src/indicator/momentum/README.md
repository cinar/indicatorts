# Momentum Indicators

Momentum indicators measure the speed of movement.

- [Momentum Indicators](#momentum-indicators)
  - [Awesome Oscillator (AO)](#awesome-oscillator-ao)
  - [Chaikin Oscillator (CMO)](#chaikin-oscillator-cmo)
  - [Ichimoku Cloud](#ichimoku-cloud)
  - [Percentage Price Oscillator (PPO)](#percentage-price-oscillator-ppo)
  - [Percentage Volume Oscillator (PVO)](#percentage-volume-oscillator-pvo)
  - [Price Rate of Change (ROC)](#price-rate-of-change-roc)
  - [Relative Strength Index (RSI)](#relative-strength-index-rsi)
  - [Stochastic Oscillator (STOCH)](#stochastic-oscillator-stoch)
  - [Williams R (WILLR)](#williams-r-willr)
  - [Disclaimer](#disclaimer)
  - [License](#license)

**NOTE:** All configuration objects for all indicators are optional. If no configuration object is passed, the default configuration will be used. Likewise, you may also partially pass a configuration object, and the default values will be used for the missing properties.

## Awesome Oscillator (AO)

The [awesomeOscillator](./awesomeOscillator.ts) function calculates the awesome oscillator based on low and high daily prices for a given stock. It is an indicator used to measure market momentum.

```
Median Price = ((Low + High) / 2)
AO = 5-Period SMA - 34-Period SMA.
```

```TypeScript
import { ao } from 'indicatorts';

const defaultConfig =  { fast: 5, slow: 34 };
const result = ao(highs, lows, defaultConfig);

// Alternatively:
// const result = awesomeOscillator(highs, lows, defaultConfig);
```

## Chaikin Oscillator (CMO)

The [chaikinOscillator](./chaikinOscillator.ts) function measures the momentum of the [Accumulation/Distribution (A/D)](../volume/README.md#accumulationdistribution-ad) using the [Moving Average Convergence Divergence (MACD)](../trend/README.md#moving-average-convergence-divergence-macd) formula. It takes the difference between fast and slow periods EMA of the A/D. Cross above the A/D line indicates bullish.

```
CO = Ema(fastPeriod, AD) - Ema(slowPeriod, AD)
```

```TypeScript
import { cmo } from 'indicatorts';

const defaultConfig =  { fast: 3, slow: 10 };
const { adResult, cmoResult } = cmo(highs, lows, closings, volumes, defaultConfig);

// Alternatively:
// const { adResult, cmoResult } = chaikinOscillator(highs, lows, closings, volumes, defaultConfig);
```

Most frequently used fast and short periods are 3 and 10.

## Ichimoku Cloud

The [ichimokuCloud](./ichimokuCloud.ts), also known as Ichimoku Kinko Hyo, calculates a versatile indicator that defines support and resistence, identifies trend direction, gauges momentum, and provides trading signals.

```
Tenkan-sen (Conversion Line) = (9-Period High + 9-Period Low) / 2
Kijun-sen (Base Line) = (26-Period High + 26-Period Low) / 2
Senkou Span A (Leading Span A) = (Conversion Line + Base Line) / 2 projected 26 periods in the future
Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2 projected 26 periods in the future
Chikou Span (Lagging Span) = Closing plotted 26 periods in the past.
```

```TypeScript
import { ichimokuCloud } from 'indicatorts';

const defaultConfig = { short: 9, medium: 26, long: 52, close: 26 };
const { tenkan, kijub, ssa, ssb, leadingSpan } = ichimokuCloud(highs, lows, closings, defaultConfig);
```

## Percentage Price Oscillator (PPO)

The [percentagePriceOscillator](./percentagePriceOscillator.ts) function calculates a momentum oscillator for the price It is used to indicate the ups and downs based on the price. A breakout is confirmed when PPO is positive.

```
PPO = ((EMA(fastPeriod, prices) - EMA(slowPeriod, prices)) / EMA(longPeriod, prices)) * 100
Signal = EMA(9, PPO)
Histogram = PPO - Signal
```

```TypeScript
import { ppo } from 'indicatorts';

const defaultConfig = { fast: 12, slow: 26, signal: 9 };
const { ppoResult, signal, histogram } = ppo(prices, defaultConfig);

// Alternatively:
// const { ppoResult, signal, histogram } = percentagePriceOscillator(prices, defaultConfig);
```

## Percentage Volume Oscillator (PVO)

The [percentageVolumeOscillator](./percentageVolumeOscillator.ts) function calculates a momentum oscillator for the volume It is used to indicate the ups and downs based on the volume. A breakout is confirmed when PVO is positive.

```
PVO = ((EMA(fastPeriod, volumes) - EMA(slowPeriod, volumes)) / EMA(longPeriod, volumes)) * 100
Signal = EMA(9, PVO)
Histogram = PVO - Signal
```

```TypeScript
import { pvo } from 'indicatorts';

const defaultConfig = { fast: 12, slow: 26, signal: 9 };
const { pvoResult, signal, histogram } = pvo(volumes, defaultConfig);

// Alternatively:
// const { pvoResult, signal, histogram } = percentageVolumeOscillator(volumes, defaultConfig);
```

## Price Rate of Change (ROC)

The [roc](./priceRateOfChange.ts) function calculates a unbounded momentum indicator for the closing prices. A rising ROC above zero typically indicates an uptrend whereas a falling ROC below zero indicates a downtrend.

```
ROC[i] = 0 when i < period
ROC[i] = (close[i] / close[i-period] - 1) * 100 when i >= period
```

```TypeScript
import { roc } from 'indicatorts';

const defaultConfig = { period: 3 };
const result = roc(close, defaultConfig);

// Alternatively:
// const result = priceRateOfChange(close, defaultConfig);
```

Ensure that the array `close` does not contain $0$ to avoid division by 0 errors.

## Relative Strength Index (RSI)

The [rsi](./relativeStrengthIndex.ts) function calculates a momentum indicator that measures the magnitude of recent price changes to evaluate overbought and oversold conditions using a window period.

```
RS = Average Gain / Average Loss
RSI = 100 - (100 / (1 + RS))
```

```TypeScript
import { rsi } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = rsi(closings, defaultConfig);

// Alternatively:
// const result = relativeStrengthIndex(closings, defaultConfig);
```

## Stochastic Oscillator (STOCH)

The [stochasticOscillator](./stochasticOscillator.ts) function calculates a momentum indicator that shows the location of the closing relative to high-low range over a set number of periods.

```
K = (Closing - Lowest Low) / (Highest High - Lowest Low) * 100
D = 3-Period SMA of K
```

```TypeScript
import { stoch } from 'indicatorts';

const defaultConfig = { kPeriod: 14, dPeriod: 3 };
const { k, d } = stoch(highs, lows, closings, defaultConfig);

// Alternatively:
// const { k, d } = stochasticOscillator(highs, lows, closings, defaultConfig);
```

## Williams R (WILLR)

The [williamsR](./williamsR.ts) function calculates the Williams R based on low, high, and closing prices. It is a type of momentum indicator that moves between 0 and -100 and measures overbought and oversold levels.

```
WR = (Highest High - Closing) / (Highest High - Lowest Low)
```

```TypeScript
import { willr } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = willr(highs, lows, closings, defaultConfig);

// Alternatively:
// const result = williamsR(highs, lows, closings, defaultConfig);
```

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

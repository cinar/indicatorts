### Momentum Indicators

Momentum indicators measure the speed of movement.

- [Awesome Oscillator](#awesome-oscillator)
- [Chaikin Oscillator](#chaikin-oscillator)
- [Custom RSI](#custom-rsi)
- [Ichimoku Cloud](#ichimoku-cloud)
- [Percentage Price Oscillator (PPO)](#percentage-price-oscillator-ppo)
- [Percentage Volume Oscillator (PVO)](#percentage-volume-oscillator-pvo)
- [Price Rate of CHange (ROC)](#price-rate-of-change-roc)
- [Relative Strength Index (RSI)](#relative-strength-index-rsi)
- [RSI 2](#rsi-2)
- [Stochastic Oscillator](#stochastic-oscillator)
- [Williams R](#williams-r)

#### Awesome Oscillator

The [awesomeOscillator](./awesomeOscillator.ts) function calculates the awesome oscillator based on low and high daily prices for a given stock. It is an indicator used to measure market momentum.

```
Median Price = ((Low + High) / 2)
AO = 5-Period SMA - 34-Period SMA.
```

```TypeScript
import {awesomeOscillator} from 'indicatorts';

const optionalConfig =  { fast: 5, slow: 34 };
const result = awesomeOscillator(highs, lows, optionalConfig);
```

#### Chaikin Oscillator

The [chaikinOscillator](./chaikinOscillator.ts) function measures the momentum of the [Accumulation/Distribution (A/D)](../volume/index.md#accumulationdistribution-ad) using the [Moving Average Convergence Divergence (MACD)](../trend/index.md#moving-average-convergence-divergence-macd) formula. It takes the difference between fast and slow periods EMA of the A/D. Cross above the A/D line indicates bullish.

```
CO = Ema(fastPeriod, AD) - Ema(slowPeriod, AD)
```

```TypeScript
import {chaikinOscillator} from 'indicatorts';

const optionalConfig =  { fast: 3, slow: 10 };
const result = chaikinOscillator(highs, lows, closings, volumes, optionalConfig);
```

Most frequently used fast and short periods are 3 and 10.

#### Custom RSI

The [customRsi](./rsi.ts) function calculates Relative Strength Index (RSI), a momentum indicator that measures the magnitude of recent price changes to evaluate overbought and oversold conditions using the given window period.

```
RS = Average Gain / Average Loss
RSI = 100 - (100 / (1 + RS))
```

```TypeScript
import {customRsi} from 'indicatorts';

const result = customRsi(period, closings);
```

#### Ichimoku Cloud

The [ichimokuCloud](./ichimokuCloud.ts), also known as Ichimoku Kinko Hyo, calculates a versatile indicator that defines support and resistence, identifies tred direction, gauges momentum, and provides trading signals.

```
Tenkan-sen (Conversion Line) = (9-Period High + 9-Period Low) / 2
Kijun-sen (Base Line) = (26-Period High + 26-Period Low) / 2
Senkou Span A (Leading Span A) = (Conversion Line + Base Line) / 2
Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2
Chikou Span (Lagging Span) = Closing plotted 26 days in the past.
```

```TypeScript
import {ichimokuCloud} from 'indicatorts';

const result = ichimokuCloud(
    highs,
    lows,
    closings,
    {
        short: 9,
        medium: 26,
        long: 52,
        close: 26,
    }
);
```

#### Percentage Price Oscillator (PPO)

The [percentagePriceOscillator](./percentagePriceOscillator.ts) function calculates a momentum oscillator for the price It is used to indicate the ups and downs based on the price. A breakout is confirmed when PPO is positive.

```
PPO = ((EMA(fastPeriod, prices) - EMA(slowPeriod, prices)) / EMA(longPeriod, prices)) * 100
Signal = EMA(9, PPO)
Histogram = PPO - Signal
```

```TypeScript
import {percentagePriceOscillator} from 'indicatorts';

const result = percentagePriceOscillator(
    fastPeriod,
    slowPeriod,
    signalPeriod,
    prices
);
```

The [defaultPercentagePriceOscillator](./percentagePriceOscillator.ts) function calculates it with the default periods of 12, 26, 9.

```TypeScript
import {defaultPercentagePriceOscillator} from 'indicatorts';

const result = defaultPercentagePriceOscillator(prices);
```

#### Percentage Volume Oscillator (PVO)

The [percentageVolumeOscillator](./percentageVolumeOscillator.ts) function calculates a momentum oscillator for the volume It is used to indicate the ups and downs based on the volume. A breakout is confirmed when PVO is positive.

```
PVO = ((EMA(fastPeriod, volumes) - EMA(slowPeriod, volumes)) / EMA(longPeriod, volumes)) * 100
Signal = EMA(9, PVO)
Histogram = PVO - Signal
```

```TypeScript
import {percentageVolumeOscillator} from 'indicatorts';

const result = percentageVolumeOscillator(
    fastPeriod,
    slowPeriod,
    signalPeriod,
    volumes
);
```

The [defaultPercentageVolumeOscillator](./percentageVolumeOscillator.ts) function calculates it with the default periods of 12, 26, 9.

```TypeScript
import {defaultPercentageVolumeOscillator} from 'indicatorts';

const result = defaultPercentageVolumeOscillator(volumes);
```

#### Price Rate of Change (ROC)

The [roc](./priceRateOfChange.ts) function calculates a unbounded momentum indicator for the closing prices. A rising ROC above zero typically indicates an uptrend whereas a falling ROC below zero indicates a downtrend.

```
ROC[i] = 0 when i < period
ROC[i] = (close[i] / close[i-period] - 1) * 100 when i >= period
```

```TypeScript
import {roc} from 'indicatorts';

const result = roc(
    period,
    close
);
```

Ensure that the array `close` does not contain $0$ to avoid division by 0 errors.

#### Relative Strength Index (RSI)

The [rsi](./rsi.ts) function calculates a momentum indicator that measures the magnitude of recent price changes to evaluate overbought and oversold conditions using the window period of 14.

```
RS = Average Gain / Average Loss
RSI = 100 - (100 / (1 + RS))
```

```TypeScript
import {rsi} from 'indicatorts';

const result = rsi(closings);
```

#### RSI 2

The [rsi2](./rsi2.ts) function calculates a RSI with 2 period that provides a mean-reversion trading strategy. It is developed by Larry Connors.

```TypeScript
import {rsi2} from 'indicatorts';

const result = rsi2(closings);
```

#### Stochastic Oscillator

The [stochasticOscillator](./stochasticOscillator.ts) function calculates a momentum indicator that shows the location of the closing relative to high-low range over a set number of periods.

```
K = (Closing - Lowest Low) / (Highest High - Lowest Low) * 100
D = 3-Period SMA of K
```

```TypeScript
import {stochasticOscillator} from 'indicatorts';

const result = stochasticOscillator(highs, lows, closings);
```

#### Williams R

The [williamsR](./williamsR.ts) function calculates the Williams R based on low, high, and closing prices. It is a type of momentum indicator that moves between 0 and -100 and measures overbought and oversold levels.

```
WR = (Highest High - Closing) / (Highest High - Lowest Low)
```

```TypeScript
import {williamsR} from 'indicatorts';

const result = williamsR(highs, lows, closings);
```

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

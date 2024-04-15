# Trend Indicators

Trend indicators measure the direction and strength of a trend.

- [Trend Indicators](#trend-indicators)
  - [Absolute Price Oscillator (APO)](#absolute-price-oscillator-apo)
  - [Aroon](#aroon)
  - [Balance of Power (BOP)](#balance-of-power-bop)
  - [Chande Forecast Oscillator (CFO)](#chande-forecast-oscillator-cfo)
  - [Community Channel Index (CCI)](#community-channel-index-cci)
  - [Double Exponential Moving Average (DEMA)](#double-exponential-moving-average-dema)
  - [Exponential Moving Average (EMA)](#exponential-moving-average-ema)
  - [Mass Index (MI)](#mass-index-mi)
  - [Moving Average Convergence Divergence (MACD)](#moving-average-convergence-divergence-macd)
  - [Moving Max (MMAX)](#moving-max-mmax)
  - [Moving Min (MMIN)](#moving-min-mmin)
  - [Moving Sum (MSUM)](#moving-sum-msum)
  - [Parabolic SAR (PSAR)](#parabolic-sar-psar)
  - [Qstick](#qstick)
  - [Random Index (KDJ)](#random-index-kdj)
  - [Rolling Moving Average (RMA)](#rolling-moving-average-rma)
  - [Simple Moving Average (SMA)](#simple-moving-average-sma)
  - [Since Change](#since-change)
  - [Triple Exponential Moving Average (TEMA)](#triple-exponential-moving-average-tema)
  - [Triangular Moving Average (TRIMA)](#triangular-moving-average-trima)
  - [Triple Exponential Average (TRIX)](#triple-exponential-average-trix)
  - [Typical Price](#typical-price)
  - [Volume Weighted Moving Average (VWMA)](#volume-weighted-moving-average-vwma)
  - [Vortex Indicator](#vortex-indicator)
  - [Disclaimer](#disclaimer)
  - [License](#license)

**NOTE:** All configuration objects for all indicators are optional. If no configuration object is passed, the default configuration will be used. Likewise, you may also partially pass a configuration object, and the default values will be used for the missing properties.

## Absolute Price Oscillator (APO)

The [absolutePriceOscillator](./absolutePriceOscillator.ts) function calculates a technical indicator that is used to follow trends. APO crossing above zero indicates bullish, while crossing below zero indicates bearish. Positive value is upward trend, while negative value is downward trend.

```
Fast = Ema(fastPeriod, values)
Slow = Ema(slowPeriod, values)
APO = Fast - Slow
```

```TypeScript
import { apo } from 'indicatorts';

const defaultConfig = { fast: 14, slow: 30 };
const result = apo(values, defaultConfig);

// Alternatively:
// const result = absolutePriceOscillator(values, defaultConfig);
```

## Aroon

The [Aroon](./aroon.ts) function calculates a technical indicator that is used to identify trend changes in the price of a stock, as well as the strength of that trend. It consists of two lines, Aroon Up, and Aroon Down. The Aroon Up line measures measures the strength of the uptrend, and the Aroon Down measures the strength of the downtrend. When Aroon Up is above Aroon Down, it indicates bullish price, and when Aroon Down is above Aroon Up, it indicates bearish price.

```
Aroon Up = ((25 - Period Since Last 25 Period High) / 25) * 100
Aroon Down = ((25 - Period Since Last 25 Period Low) / 25) * 100
```

```TypeScript
import { aroon } from 'indicatorts';

const defaultConfig = { period: 25 };
const { up, down } = aroon(highs, lows, defaultConfig);
```

## Balance of Power (BOP)

The [BalanceOfPower](./balanceOfPower.ts) function calculates the strength of buying and selling pressure. Positive value indicates an upward trend, and negative value indicates a downward trend. Zero indicates a balance between the two.

```
BOP = (Closing - Opening) / (High - Low)
```

```Typescript
import { bop } from 'indicatorts';

const result = bop(openings, highs, lows, closings);

// Alternatively:
// const result = balanceOfPower(openings, highs, lows, closings);
```

## Chande Forecast Oscillator (CFO)

The [chandeForecastOscillator](./chandeForecastOscillator.ts) developed by Tushar Chande The Forecast Oscillator plots the percentage difference between the closing price and the n-period linear regression forecasted price. The oscillator is above zero when the forecast price is greater than the closing price and less than zero if it is below.

```
R = Linreg(Closing)
CFO = ((Closing - R) / Closing) * 100
```

Based on [Chande Forecast Oscillator Formula, Strategy](https://www.stockmaniacs.net/chande-forecast-oscillator/), [Forecast Oscillator
](https://www.fmlabs.com/reference/default.htm?url=ForecastOscillator.htm), and [Least Squares Regression](https://www.mathsisfun.com/data/least-squares-regression.html).

```TypeScript
import { cfo } from 'indicatorts';

const result = cfo(closings);

// Alternatively:
// const result = chandeForecastOscillator(closings);
```

There is also an oscillator for calculating the moving chande forecast oscillator.

```TypeScript
import { mfco } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = mfco(closings, defaultConfig);

// Alternatively:
// const result = movingChandeForecastOscillator(closings, defaultConfig);
```

## Community Channel Index (CCI)

The [communityChannelIndex](./communityChannelIndex.ts) is a momentum-based oscillator used to help determine when an investment vehicle is reaching a condition of being overbought or oversold.

```
Moving Average = Sma(Period, Typical Price)
Mean Deviation = Sma(Period, Abs(Typical Price - Moving Average))
CMI = (Typical Price - Moving Average) / (0.015 * Mean Deviation)
```

```TypeScript
import { cci } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = cci(highs, lows, closings, defaultConfig);

// Alternatively:
// const result = communityChannelIndex(highs, lows, closings, defaultConfig);
```

## Double Exponential Moving Average (DEMA)

The [dema](./doubleExponentialMovingAverage.ts) function calculates the Double Exponential Moving Average (DEMA) for a given period.

The double exponential moving average (DEMA) is a technical indicator introduced by Patrick Mulloy. The purpose is to reduce the amount of noise present in price charts used by technical traders. The DEMA uses two exponential moving averages (EMAs) to eliminate lag. It helps confirm uptrends when the price is above the average, and helps confirm downtrends when the price is below the average. When the price crosses the average that may signal a trend change.

```
DEMA = (2 * EMA(values)) - EMA(EMA(values))
```

```TypeScript
import { dema } from 'indicatorts';

const defaultConfig = { period: 12 };
const result = dema(values, defaultConfig);

// Alternatively:
// const result = doubleExponentialMovingAverage(values, defaultConfig);
```

Based on [Double Exponential Moving Average (DEMA)](https://www.investopedia.com/terms/d/double-exponential-moving-average.asp).

## Exponential Moving Average (EMA)

The [ema](./exponentialMovingAverage.ts) function calculates the exponential moving average for a given period.

```TypeScript
import { ema } from 'indicatorts';

const defaultConfig = { period: 12 };
const result = ema(values, defaultConfig);

// Alternatively:
// const result = exponentialMovingAverage(values, defaultConfig);
```

## Mass Index (MI)

The [massIndex](./massIndex.ts) uses the high-low range to identify trend reversals based on range expansions.

```
Singe EMA = EMA(9, Highs - Lows)
Double EMA = EMA(9, Single EMA)
Ratio = Single EMA / Double EMA
MI = Sum(25, Ratio)
```

```TypeScript
import { mi } from 'indicatorts';

const defaultConfig = { emaPeriod: 9, miPeriod: 25 };
const result = mi(highs, lows, defaultConfig);

// Alternatively:
// const result = massIndex(highs, lows, defaultConfig);
```

## Moving Average Convergence Divergence (MACD)

The [macd](./movingAverageConvergenceDivergence.ts) function calculates a trend-following momentum indicator that shows the relationship between two moving averages of price.

```
MACD = 12-Period EMA - 26-Period EMA.
Signal = 9-Period EMA of MACD.
```

```TypeScript
import { macd } from 'indicatorts';

const defaultConfig = { fast: 12, slow: 26, signal: 9 };
const { macdLine, signalLine } = macd(closings);

// Alternatively:
// const { macdLine, signalLine } = movingAverageConvergenceDivergence(closings, defaultConfig);
```

## Moving Max (MMAX)

The [mmax](./movingMax.ts) function gives the maximum value within the given moving period. It can be used to get the moving maximum closing price and other values.

```TypeScript
import { mmax } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = mmax(values, defaultConfig);

// Alternatively:
// const result = movingMax(values, defaultConfig);
```

## Moving Min (MMIN)

The [mmin](./movingMin.ts) function gives the minimum value within the given moving period. It can be used to get the moving minimum closing price and other values.

```TypeScript
import { mmin } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = mmin(values, defaultConfig);

// Alternatively:
// const result = movingMin(values, defaultConfig);
```

## Moving Sum (MSUM)

The [msum](./movingSum.ts) function gives the sum value within the given moving period.

```TypeScript
import { msum } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = msum(values, defaultConfig);

// Alternatively:
// const result = movingSum(values, defaultConfig);
```

## Parabolic SAR (PSAR)

The [parabolicSar](./parabolicSar.ts) function calculates an identifier for the trend and the trailing stop.

```
PSAR = PSAR[i - 1] - ((PSAR[i - 1] - EP) * AF)
```

If the trend is Falling:

- PSAR is the maximum of PSAR or the previous two high values.
- If the current high is greather than or equals to PSAR, use EP.

If the trend is Rising:

- PSAR is the minimum of PSAR or the previous two low values.
- If the current low is less than or equials to PSAR, use EP.

If PSAR is greather than the closing, trend is falling, and the EP is set to the minimum of EP or the low.

If PSAR is lower than or equals to the closing, trend is rising, and the EP is set to the maximum of EP or the high.

If the trend is the same, and AF is less than 0.20, increment it by 0.02. If the trend is not the same, set AF to 0.02.

Based on video [How to Calculate the PSAR Using Excel - Revised Version](https://www.youtube.com/watch?v=MuEpGBAH7pw&t=0s).

```TypeScript
import { psar } from 'indicatorts';

const defaultConfig = { step: 0.02, max: 0.2 };
const { trends, psarResult } = psar(highs, lows, closings, defaultConfig);

// Alternatively:
// const { trends, psarResult } = parabolicSar(highs, lows, closings, defaultConfig);
```

## Qstick

The [qstick](./qstick.ts) function calculates the ratio of recent up and down bars.

```
QS = Sma(Closing - Opening)
```

```TypeScript
import { qstick } from 'indicatorts';

const defaultConfig = { period: 14 };
const result = qstick(openings, closings, defaultConfig);
```

## Random Index (KDJ)

The [kdj](./randomIndex.ts) function calculates the KDJ indicator, also known as the Random Index. KDJ is calculated similar to the Stochastic Oscillator with the difference of having the J line. It is used to analyze the trend and entry points.

The K and D lines show if the asset is overbought when they crosses above 80%, and oversold when they crosses below 20%. The J line represents the divergence.

```
RSV = ((Closing - Min(Low, rPeriod)) / (Max(High, rPeriod) - Min(Low, rPeriod))) * 100
K = Sma(RSV, kPeriod)
D = Sma(K, dPeriod)
J = (3 * K) - (2 * D)
```

```TypeScript
import { kdj } from 'indicatorts';

const defaultConfig = { rPeriod: 9, kPeriod: 3, dPeriod: 3 };
const { k, d, j } = kdj(highs, lows, closings, defaultConfig);

// Alternatively:
// const { k, d, j } = randomIndex(highs, lows, closings, defaultConfig);
```

## Rolling Moving Average (RMA)

The [rma](./rollingMovingAverage.ts) function calculates the rolling moving average for a given period.

```
R[0] to R[p-1] is SMA(values)
R[p] and after is R[i] = ((R[i-1]*(p-1)) + v[i]) / p
```

```TypeScript
import { rma } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = rma(values, defaultConfig);

// Alternatively:
// const result = rollingMovingAverage(values, defaultConfig);
```

## Simple Moving Average (SMA)

The [sma](./simpleMovingAverage.ts) function calculates the simple moving average for a given period.

```TypeScript
import { sma } from 'indicatorts';

const defaultConfig = { period: 2 };
const result = sma(values);

// Alternatively:
// const result = simpleMovingAverage(values, defaultConfig);
```

## Since Change

The [since](./since.ts) function provides the number values since the last change.

```TypeScript
import { since } from 'indicatorts';

const result = since(values);
```

## Triple Exponential Moving Average (TEMA)

The [tema](./tripleExponentialMovingAverage.ts) function calculates the Triple Exponential Moving Average (TEMA) for a given period.

The triple exponential moving average (TEMA) was designed to smooth value fluctuations, thereby making it easier to identify trends without the lag associated with traditional moving averages. It does this by taking multiple exponential moving averages (EMA) of the original EMA and subtracting out some of the lag.

```
TEMA = (3 * EMA1) - (3 * EMA2) + EMA3
EMA1 = EMA(values)
EMA2 = EMA(EMA1)
EMA3 = EMA(EMA2)
```

```TypeScript
import { tema } from 'indicatorts';

const defaultConfig = { period: 2 };
const result = tema(values, defaultConfig);

// Alternatively:
// const result = tripleExponentialMovingAverage(values, defaultConfig);
```

Based on [Triple Exponential Moving Average (TEMA)](https://www.investopedia.com/terms/t/triple-exponential-moving-average.asp).

## Triangular Moving Average (TRIMA)

The [trima](./triangularMovingAverage.ts) function calculates the Triangular Moving Average (TRIMA) for a given period.

The Triangular Moving Average (TRIMA) is a weighted moving average putting more weight to the middle values.

```
If period is even:
   TRIMA = SMA(period / 2, SMA((period / 2) + 1, values))
If period is odd:
   TRIMA = SMA((period + 1) / 2, SMA((period + 1) / 2, values))
```

```TypeScript
import { trima } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = trima(values, defaultConfig);

// Alternatively:
// const result = triangularMovingAverage(values, defaultConfig);
```

Based on [Triangular Moving Average](https://tulipindicators.org/trima).

## Triple Exponential Average (TRIX)

The [trix](./tripleExponentialAverage.ts) indicator is an oscillator used to identify oversold and overbought markets, and it can also be used as a momentum indicator. Like many oscillators, TRIX oscillates around a zero line.

```
EMA1 = EMA(period, values)
EMA2 = EMA(period, EMA1)
EMA3 = EMA(period, EMA2)
TRIX = (EMA3 - Previous EMA3) / Previous EMA3
```

```TypeScript
import { trix } from 'indicatorts';

const defaultConfig = { period: 4 };
const result = trix(values, defaultConfig);

// Alternatively:
// const result = tripleExponentialAverage(values, defaultConfig);
```

## Typical Price

The [typicalPrice](./typicalPrice.ts) function calculates another approximation of average price for each period and can be used as a filter for moving average systems.

```
Typical Price = (High + Low + Closing) / 3
```

```TypeScript
import { typprice } from 'indicatorts';

const result = typprice(highs, lows, closings);

// Alternatively:
// const result = typicalPrice(highs, lows, closings);
```

## Volume Weighted Moving Average (VWMA)

The [vwma](./volumeWeightedMovingAverage.ts) function calculates the Volume Weighted Moving Average (VWMA) averaging the price data with an emphasis on volume, meaning areas with higher volume will have a greater weight.

```
VWMA = Sum(Price * Volume) / Sum(Volume) for a given Period.
```

```TypeScript
import { vwma } from 'indicatorts';

const defaultConfig = { period: 20 };
const result = vwma(closings, volumes, defaultConfig);

// Alternatively:
// const result = volumeWeightedMovingAverage(closings, volumes, defaultConfig);
```

## Vortex Indicator

The [vortex](./vortex.ts) function provides two oscillators that capture positive and negative trend movement. A bullish signal triggers when the positive trend indicator crosses above the negative trend indicator or a key level. A bearish signal triggers when the negative trend indicator crosses above the positive trend indicator or a key level.

```
+VM = Abs(Current High - Prior Low)
-VM = Abs(Current Low - Prior High)

+VM14 = 14-Period Sum of +VM
-VM14 = 14-Period Sum of -VM

TR = Max((High[i]-Low[i]), Abs(High[i]-Closing[i-1]), Abs(Low[i]-Closing[i-1]))
TR14 = 14-Period Sum of TR

+VI14 = +VM14 / TR14
-VI14 = -VM14 / TR14
```

```TypeScript
import { vortex } from 'indicatorts';

const defaultConfig = { period: 14 };
const { plus, minus } = vortex(highs, lows, closings, defaultConfig);
```

Based on [Vortex Indicator](https://school.stockcharts.com/doku.php?id=technical_indicators:vortex_indicator)

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

### Trend Indicators

Trend indicators measure the direction and strength of a trend.

- [Absolute Price Oscillator (APO)](#absolute-price-oscillator-apo)
- [Aroon Indicator](#aroon-indicator)
- [Balance of Power (BOP)](trend_indicators.md#balance-of-power-bop)
- [Chande Forecast Oscillator (CFO)](#chande-forecast-oscillator-cfo)
- [Double Exponential Moving Average (DEMA)](#double-exponential-moving-average-dema)
- [Exponential Moving Average (EMA)](#exponential-moving-average-ema)
- [Moving Average Convergence Divergence (MACD)](#moving-average-convergence-divergence-macd)
- [Moving Max](#moving-max)
- [Moving Min](#moving-min)
- [Moving Sum](#moving-sum)
- [Parabolic SAR](#parabolic-sar)
- [Qstick](trend_indicator.md#qstick)
- [Random Index (KDJ)](#random-index-kdj)
- [Simple Moving Average (SMA)](#simple-moving-average-sma)
- [Since Change](#since-change)
- [Triangular Moving Average (TRIMA)](#triangular-moving-average-trima)
- [Triple Exponential Moving Average (TEMA)](#triple-exponential-moving-average-tema)
- [Typical Price](#typical-price)
- [Vortex Indicator](#vortex-indicator)

#### Absolute Price Oscillator (APO)

The [absolutePriceOscillator](./absolutePriceOscillator.ts) function calculates a technical indicator that is used to follow trends. APO crossing above zero indicates bullish, while crossing below zero indicates bearish. Positive value is upward trend, while negative value is downward trend.

```
Fast = Ema(fastPeriod, values)
Slow = Ema(slowPeriod, values)
APO = Fast - Slow
```

```TypeScript
import {absolutePriceOscillator} from 'indicatorts';

const result = absolutePriceOscillator(fastPeriod, slowPeriod, values);
```

Most frequently used fast and short periods are 14 and 30. The [defaultAbsolutePriceOscillator](./absolutePriceOscillator.ts) function calculates APO with those periods.

#### Aroon Indicator

The [Aroon](./aroon.ts) function calculates a technical indicator that is used to identify trend changes in the price of a stock, as well as the strength of that trend. It consists of two lines, Aroon Up, and Aroon Down. The Aroon Up line measures measures the strength of the uptrend, and the Aroon Down measures the strength of the downtrend. When Aroon Up is above Aroon Down, it indicates bullish price, and when Aroon Down is above Aroon Up, it indicates bearish price.

```
Aroon Up = ((25 - Period Since Last 25 Period High) / 25) * 100
Aroon Down = ((25 - Period Since Last 25 Period Low) / 25) * 100
```

```TypeScript
import {aroon} from 'indicatorts';

const result = aroon(highs, lows);
```

#### Balance of Power (BOP)

The [BalanceOfPower](./balanceOfPower.ts) function calculates the strength of buying and selling pressure. Positive value indicates an upward trend, and negative value indicates a downward trend. Zero indicates a balance between the two.

```
BOP = (Closing - Opening) / (High - Low)
```

```Typescript
import {balanceOfPower} from 'indicatorts';

const bop = balanceOfPower(openings, highs, lows, closings);
```

#### Chande Forecast Oscillator (CFO)

The [chandeForecastOscillator](./chandeForecastOscillator.ts) developed by Tushar Chande The Forecast Oscillator plots the percentage difference between the closing price and the n-period linear regression forecasted price. The oscillator is above zero when the forecast price is greater than the closing price and less than zero if it is below.

```
R = Linreg(Closing)
CFO = ((Closing - R) / Closing) * 100
```

Based on [Chande Forecast Oscillator Formula, Strategy](https://www.stockmaniacs.net/chande-forecast-oscillator/), [Forecast Oscillator
](https://www.fmlabs.com/reference/default.htm?url=ForecastOscillator.htm), and [Least Squares Regression](https://www.mathsisfun.com/data/least-squares-regression.html).

```TypeScript
import {chandeForecastOscillator} from 'indicatorts';

const cfo = chandeForecastOscillator(closings);
```

#### Double Exponential Moving Average (DEMA)

The [dema](./dema.ts) function calculates the Double Exponential Moving Average (DEMA) for a given period.

The double exponential moving average (DEMA) is a technical indicator introduced by Patrick Mulloy. The purpose is to reduce the amount of noise present in price charts used by technical traders. The DEMA uses two exponential moving averages (EMAs) to eliminate lag. It helps confirm uptrends when the price is above the average, and helps confirm downtrends when the price is below the average. When the price crosses the average that may signal a trend change.

```
DEMA = (2 * EMA(values)) - EMA(EMA(values))
```

```TypeScript
import {dema} from 'indicatorts';

const result = dema(period, values);
```

Based on [Double Exponential Moving Average (DEMA)](https://www.investopedia.com/terms/d/double-exponential-moving-average.asp).

#### Exponential Moving Average (EMA)

The [ema](./ema.ts) function calculates the exponential moving average for a given period.

```TypeScript
import {ema} from 'indicatorts';

const result = ema(period, values);
```

#### Moving Average Convergence Divergence (MACD)

The [macd](./macd.ts) function calculates a trend-following momentum indicator that shows the relationship between two moving averages of price.

```
MACD = 12-Period EMA - 26-Period EMA.
Signal = 9-Period EMA of MACD.
```

```TypeScript
import {macd} from 'indicatorts';

const result = macd(closings);
```

#### Moving Max

The [mmax](./mmax.ts) function gives the maximum value within the given moving period. It can be used to get the moving maximum closing price and other values.

```TypeScript
import {mmax} from 'indicatorts';

const result = mmax(period, values);
```

#### Moving Min

The [mmin](./mmin.ts) function gives the minimum value within the given moving period. It can be used to get the moving minimum closing price and other values.

```TypeScript
import {mmin} from 'indicatorts';

const result = mmin(period, values);
```

#### Moving Sum

The [msum](./msum.ts) function gives the sum value within the given moving period.

```TypeScript
import {msum} from 'indicatorts';

const result = msum(period, values);
```

#### Parabolic SAR

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
import {parabolicSar} from 'indicatorts';

const result = parabolicSar(highs, lows, closings);
```

#### Qstick

The [qstick](./qstick.ts) function calculates the ratio of recent up and down bars.

```
QS = Sma(Closing - Opening)
```

```TypeScript
import {qstick} from 'indicatorts';

const result = qstick(period, openings, closings);
```

#### Random Index (KDJ)

The [kdj](./kdj.ts) function calculates the KDJ indicator, also known as the Random Index. KDJ is calculated similar to the Stochastic Oscillator with the difference of having the J line. It is used to analyze the trend and entry points.

The K and D lines show if the asset is overbought when they crosses above 80%, and oversold when they crosses below 20%. The J line represents the divergence.

```
RSV = ((Closing - Min(Low, rPeriod)) / (Max(High, rPeriod) - Min(Low, rPeriod))) * 100
K = Sma(RSV, kPeriod)
D = Sma(K, dPeriod)
J = (3 * K) - (2 * D)
```

```TypeScript
import {kdj} from 'indicatorts';

const result = kdj(rPeriod, kPeriod, dPeriod, highs, lows, closings);
```

By default, _rPeriod_ of 9, _kPeriod_ of 3, and _dPeriod_ of 3 are used. The [defaultKdj](./kdj.ts) function can be used with those periods.

```TypeScript
import {defaultKdj} from 'indicatorts';

const result = defaultKdj(highs, lows, closings);
```

#### Simple Moving Average (SMA)

The [sma](./sma.ts) function calculates the simple moving average for a given period.

```TypeScript
import {sma} from 'indicatorts';

const result = sma(period, values);
```

#### Since Change

The [since](./since.ts) function provides the number values since the last change.

```TypeScript
import {since} from 'indicatorts';

const result = since(values);
```

#### Triangular Moving Average (TRIMA)

The [trima](./trima.ts) function calculates the Triangular Moving Average (TRIMA) for a given period.

The Triangular Moving Average (TRIMA) is a weighted moving average putting more weight to the middle values.

```
If period is even:
   TRIMA = SMA(period / 2, SMA((period / 2) + 1, values))
If period is odd:
   TRIMA = SMA((period + 1) / 2, SMA((period + 1) / 2, values))
```

```TypeScript
import {trima} from 'indicatorts';

const result = trima(period, values);
```

Based on [Triangular Moving Average](https://tulipindicators.org/trima).

#### Triple Exponential Moving Average (TEMA)

The [tema](./tema.ts) function calculates the Triple Exponential Moving Average (TEMA) for a given period.

The triple exponential moving average (TEMA) was designed to smooth value fluctuations, thereby making it easier to identify trends without the lag associated with traditional moving averages. It does this by taking multiple exponential moving averages (EMA) of the original EMA and subtracting out some of the lag.

```
TEMA = (3 * EMA1) - (3 * EMA2) + EMA3
EMA1 = EMA(values)
EMA2 = EMA(EMA1)
EMA3 = EMA(EMA2)
```

```TypeScript
import {tema} from 'indicatorts';

const result = tema(period, values);
```

Based on [Triple Exponential Moving Average (TEMA)](https://www.investopedia.com/terms/t/triple-exponential-moving-average.asp).

#### Typical Price

The [typicalPrice](./typicalPrice.ts) function calculates another approximation of average price for each period and can be used as a filter for moving average systems.

```
Typical Price = (High + Low + Closing) / 3
```

```TypeScript
import {typicalPrice} from 'indicatorts';

const result = typicalPrice(highs, lows, closings);
```

#### Vortex Indicator

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

Based on [Vortex Indicator](https://school.stockcharts.com/doku.php?id=technical_indicators:vortex_indicator)

```TypeScript
import {vortex} from 'indicatorts';

const result = vortex(highs, lows, closings);
```

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

### Volume Indicators

Volumne indicators measure the strength of a trend based the volume.

- [Accumulation/Distribution (A/D)](#accumulationdistribution-ad)
- [Ease of Movement (EMV)](#ease-of-movement-emv)
- [Force Index (FI)](#force-index-fi)
- [Money Flow Index (MFI)](#money-flow-index-mfi)
- [On-Balance Volume (OBV)](#on-balance-volume-obv)
- [Volume Price Trend (VPT)](#volume-price-trend-vpt)

#### Accumulation/Distribution (A/D)

The [accumulationDistribution](./accumulationDistribution.ts) is a cumulative indicator that uses volume and price to assess whether a stock is being accumulated or distributed.

The Accumulation/Distribution seeks to identify divergences between the stock price and the volume flow.

```
MFM = ((Closing - Low) - (High - Closing)) / (High - Low)
MFV = MFM * Period Volume
AD = Previous AD + CMFV
```

Based on [Accumulation/Distribution Indicator (A/D)](https://www.investopedia.com/terms/a/accumulationdistribution.asp).

```TypeScript
import {accumulationDistribution} from 'indicatorts';

const result = accumulationDistribution(highs, lows, closings, volumes);
```

#### Ease of Movement (EMV)

The [easeOfMovement](./easeOfMovement.ts) is a volume based oscillator measuring the ease of price movement.

```
Distance Moved = ((High + Low) / 2) - ((Priod High + Prior Low) /2)
Box Ratio = ((Volume / 100000000) / (High - Low))
EMV(1) = Distance Moved / Box Ratio
EMV(14) = SMA(14, EMV(1))
```

```TypeScript
import {easeOfMovement} from 'indicatorts';

const result = easeOfMovement(period, highs, lows, volumes);
```

The [defaultEaseOfMovement](./easeOfMovement.ts) functio uses the default period of 14.

```TypeScript
import {defaultEaseOfMovement} from 'indicatorts';

const result = defaultEaseOfMovement(highs, lows, volumes);
```

#### Force Index (FI)

The [forceIndex](./forceIndex.ts) uses the closing price and the volume to assess the power behind a move and identify turning points.

```
Force Index = EMA(period, (Current - Previous) * Volume)
```

```TypeScript
import {forceIndex} from 'indicatorts';

const result = forceIndex(period, closings, volumes);
```

The [defaultForceIndex](./forceIndex.ts) function uses the default period of 13.

```TypeScript
import {defaultForceIndex} from 'indicatorts';

const result = defaultForceIndex(closings, volumes);
```

#### Money Flow Index (MFI)

The [moneyFlowIndex](./moneyFlowIndex.ts) function analyzes both the closing price and the volume to measure to identify overbought and oversold states. It is similar to the Relative Strength Index (RSI), but it also uses the volume.

```
Raw Money Flow = Typical Price * Volume
Money Ratio = Positive Money Flow / Negative Money Flow
Money Flow Index = 100 - (100 / (1 + Money Ratio))
```

```TypeScript
import {moneyFlowIndex} from 'indicatorts';

const result = moneyFlowIndex(14, highs, lows, closings, volumes);
```

The [defaultMoneyFlowIndex](./moneyFlowIndex.ts) function uses the default period of 14.

#### On-Balance Volume (OBV)

The [onBalanceVolume](./onBalanceVolume.ts) function calculates a technical trading momentum indicator that uses volume flow to predict changes in stock price.

```
                  volume, if Closing > Closing-Prev
OBV = OBV-Prev +       0, if Closing = Closing-Prev
                 -volume, if Closing < Closing-Prev
```

```TypeScript
import {onBalanceVolume} from 'indicatorts';

const result = onBalanceVolume(closings, volumes);
```

#### Volume Price Trend (VPT)

The [volumePriceTrend](./volumePriceTrend.ts) provides a correlation between the volume and the price.

```
VPT = Previous VPT + (Volume * (Current Closing - Previous Closing) / Previous Closing)
```

```TypeScript
import {volumePriceTrend} from 'indicatorts';

const result = volumePriceTrend(closings, volumes);
```

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.

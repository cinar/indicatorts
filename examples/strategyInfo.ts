// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { StrategyInfo } from '../src/backtest/strategyInfo';
// buy and hold example
import { buyAndHoldStrategy } from './buyAndHoldStrategy';
// momentum examples
import { awesomeOscillatorStrategy } from './momentum/awesomeOscillatorStrategy';
import { ichimokuCloudStrategy } from './momentum/ichimokuCloudStrategy';
import { rsi2Strategy } from './momentum/rsi2Strategy';
import { stochasticOscillatorStrategy } from './momentum/stochasticOscillatorStrategy';
import { williamsRStrategy } from './momentum/williamsRStrategy';
// trend examples
import { absolutePriceOscillatorStrategy } from './trend/absolutePriceOscillatorStrategy';
import { aroonStrategy } from './trend/aroonStrategy';
import { balanceOfPowerStrategy } from './trend/balanceOfPowerStrategy';
import { chandeForecastOscillatorStrategy } from './trend/chandeForecastOscillatorStrategy';
import { kdjStrategy } from './trend/kdjStrategy';
import { macdStrategy } from './trend/macdStrategy';
import { psarStrategy } from './trend/parabolicSarStrategy';
import { typicalPriceStrategy } from './trend/typicalPriceStrategy';
import { vortexStrategy } from './trend/vortexStrategy';
import { vwmaStrategy } from './trend/vwmaStrategy';
// volatility examples
import { accelerationBandsStrategy } from './volatility/accelerationBandsStrategy';
import { bollingerBandsStrategy } from './volatility/bollingerBandsStrategy';
import { projectionOscillatorStrategy } from './volatility/projectionOscillatorStrategy';
// volume examples
import { chaikinMoneyFlowStrategy } from './volume/chaikinMoneyFlowStrategy';
import { easeOfMovementStrategy } from './volume/easeOfMovementStrategy';
import { forceIndexStrategy } from './volume/forceIndexStrategy';
import { moneyFlowIndexStrategy } from './volume/moneyFlowIndexStrategy';
import { negativeVolumeIndexStrategy } from './volume/negativeVolumeIndexStrategy';
import { volumeWeightedAveragePriceStrategy } from './volume/volumeWeightedAveragePriceStrategy';

/**
 * Example strategy infos illustrating how to configure strategies for backtesting.
 */
export const STRATEGY_INFOS: StrategyInfo[] = [
  // buy and hold example
  {
    name: 'Buy Hold',
    strategy: buyAndHoldStrategy,
  },
  // momentum examples
  {
    name: 'Awesome Oscillator',
    strategy: awesomeOscillatorStrategy,
  },
  {
    name: 'RSI 2',
    strategy: rsi2Strategy,
  },
  {
    name: 'Ichimoku Cloud',
    strategy: ichimokuCloudStrategy,
  },
  {
    name: 'Stochastic Oscillator',
    strategy: stochasticOscillatorStrategy,
  },
  {
    name: 'Williams R',
    strategy: williamsRStrategy,
  },
  // trend examples
  {
    name: 'Absolute Price Oscillator (APO)',
    strategy: absolutePriceOscillatorStrategy,
  },
  {
    name: 'Aroon Strategy',
    strategy: aroonStrategy,
  },
  {
    name: 'Balance of Power (BOM)',
    strategy: balanceOfPowerStrategy,
  },
  {
    name: 'Chande Forecast Oscillator (CFO)',
    strategy: chandeForecastOscillatorStrategy,
  },
  {
    name: 'KDJ Strategy',
    strategy: kdjStrategy,
  },
  {
    name: 'MACD Strategy',
    strategy: macdStrategy,
  },
  {
    name: 'Parabolic SAR',
    strategy: psarStrategy,
  },
  {
    name: 'Typical Price',
    strategy: typicalPriceStrategy,
  },
  {
    name: 'Volume Weighted Moving Average (VWMA)',
    strategy: vwmaStrategy,
  },
  {
    name: 'Vortex Strategy',
    strategy: vortexStrategy,
  },
  // volatility examples
  {
    name: 'Acceleration Bands',
    strategy: accelerationBandsStrategy,
  },
  {
    name: 'Bollinger Bands',
    strategy: bollingerBandsStrategy,
  },
  {
    name: 'Projection Oscillator',
    strategy: projectionOscillatorStrategy,
  },
  // volume examples
  {
    name: 'Chaikin Money Flow (CMF)',
    strategy: chaikinMoneyFlowStrategy,
  },
  {
    name: 'Ease of Movement (EMV)',
    strategy: easeOfMovementStrategy,
  },
  {
    name: 'Force Index',
    strategy: forceIndexStrategy,
  },
  {
    name: 'Money Flow Index',
    strategy: moneyFlowIndexStrategy,
  },
  {
    name: 'Negative Volume Index (NVI)',
    strategy: negativeVolumeIndexStrategy,
  },
  {
    name: 'Volume Weighted Average Price',
    strategy: volumeWeightedAveragePriceStrategy,
  },
];

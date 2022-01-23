// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { buyAndHoldStrategy } from '../strategy/buyAndHoldStrategy';
import { awesomeOscillatorStrategy } from '../strategy/momentum/awesomeOscillatorStrategy';
import { ichimokuCloudStrategy } from '../strategy/momentum/ichimokuCloudStrategy';
import { stochasticOscillatorStrategy } from '../strategy/momentum/stochasticOscillatorStrategy';
import { williamsRStrategy } from '../strategy/momentum/williamsRStrategy';
import { StrategyFunction } from '../strategy/strategyFunction';
import { defaultAbsolutePriceOscillatorStrategy } from '../strategy/trend/absolutePriceOscillatorStrategy';
import { aroonStrategy } from '../strategy/trend/aroonStrategy';
import { balanceOfPowerStrategy } from '../strategy/trend/balanceOfPowerStrategy';
import { chandeForecastOscillatorStrategy } from '../strategy/trend/chandeForecastOscillatorStrategy';
import { kdjStrategy } from '../strategy/trend/kdjStrategy';
import { macdStrategy } from '../strategy/trend/macdStrategy';
import { parabolicSarStrategy } from '../strategy/trend/parabolicSarStrategy';
import { typicalPriceStrategy } from '../strategy/trend/typicalPriceStrategy';
import { vortexStrategy } from '../strategy/trend/vortexStrategy';
import { accelerationBandsStrategy } from '../strategy/volatility/accelerationBandsStrategy';
import { bollingerBandsStrategy } from '../strategy/volatility/bollingerBandsStrategy';
import { projectionOscillatorStrategy } from '../strategy/volatility/projectionOscillatorStrategy';
import { chaikinMoneyFlowStrategy } from '../strategy/volume/chaikinMoneyFlowStrategy';
import { easeOfMovementStrategy } from '../strategy/volume/easeOfMovementStrategy';
import { forceIndexStrategy } from '../strategy/volume/forceIndexStrategy';
import { moneyFlowIndexStrategy } from '../strategy/volume/moneyFlowIndexStrategy';
import { negativeVolumeIndexStrategy } from '../strategy/volume/negativeVolumeIndexStrategy';
import { volumeWeightedAveragePriceStrategy } from '../strategy/volume/volumeWeightedAveragePriceStrategy';

/**
 * Strategy info.
 */
export interface StrategyInfo {
  name: string;
  strategy: StrategyFunction;
}

/**
 * Strategy infos.
 */
export const STRATEGY_INFOS: StrategyInfo[] = [
  {
    name: 'Buy Hold',
    strategy: buyAndHoldStrategy,
  },
  {
    name: 'Awesome Oscillator',
    strategy: awesomeOscillatorStrategy,
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
  {
    name: 'Absolute Price Oscillator (APO)',
    strategy: defaultAbsolutePriceOscillatorStrategy,
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
    strategy: parabolicSarStrategy,
  },
  {
    name: 'Typical Price',
    strategy: typicalPriceStrategy,
  },
  {
    name: 'Vortex Strategy',
    strategy: vortexStrategy,
  },
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

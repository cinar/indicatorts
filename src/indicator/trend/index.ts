// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Trend indicators measure the direction and strength of a trend.
 *
 * **NOTE:** All configuration objects for all indicators are optional. If no configuration object is passed, the default configuration will be used. Likewise, you may also partially pass a configuration object, and the default values will be used for the missing properties.
 *
 * @module Trend Indicators
 */

export * from './absolutePriceOscillator';
export * from './aroon';
export * from './balanceOfPower';
export * from './chandeForecastOscillator';
export * from './commodityChannelIndex';
export * from './doubleExponentialMovingAverage';
export * from './exponentialMovingAverage';
export * from './kaufmanAdaptiveMovingAverage';
export * from './massIndex';
export * from './movingAverageConvergenceDivergence';
export * from './movingMax';
export * from './movingMin';
export * from './movingSum';
export * from './parabolicSar';
export * from './qstick';
export * from './randomIndex';
export * from './rollingMovingAverage';
export * from './simpleMovingAverage';
export * from './since';
export * from './triangularMovingAverage';
export * from './tripleExponentialAverage';
export * from './tripleExponentialMovingAverage';
export * from './typicalPrice';
export * from './volumeWeightedMovingAverage';
export * from './vortex';

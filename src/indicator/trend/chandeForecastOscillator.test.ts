// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { cfo, mcfo } from './chandeForecastOscillator';

describe('Chande Forecast Oscillator (CFO)', () => {
  const closings = [1, 5, 12, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  it('should be able to compute', () => {
    const expected = [
      603.8462, 13.3566, -14.19, -15.3671, -8.1469, -4.5367, -2.3706, -0.9266,
      0.1049, 0.8785, 1.4802, 1.9615,
    ];
    const actual = cfo(closings);
    deepStrictEqual(roundDigitsAll(4, actual), expected);
  });

  it('should be able to compute (moving) with a config', () => {
    const expected = [
      100, 0, 4.1667, 4.5, 6, 5.3571, 4.5, 3.75, 1.4286, 0.4167, 0, 0,
    ];
    const actual = mcfo(closings, { period: 8 });
    deepStrictEqual(roundDigitsAll(4, actual), expected);
  });

  it('should be able to compute (moving) without a config', () => {
    const expected = [100, 0, 4.1667, 4.5, 2.6667, 1, 0, 0, 0, 0, 0, 0];
    const actual = mcfo(closings);
    deepStrictEqual(roundDigitsAll(4, actual), expected);
  });
});

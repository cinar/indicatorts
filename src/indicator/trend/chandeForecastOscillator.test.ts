// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {deepStrictEqual} from 'assert';
import {roundDigitsAll} from '../../helper/numArray';
import {chandeForecastOscillator} from './chandeForecastOscillator';

describe('Chande Forecast Oscillator (CFO)', () => {
  it('should be able to compute CFO', () => {
    const closings = [1, 5, 12, 20];
    const expected = [110, -26, -5.8333, 4.5];
    const actual = chandeForecastOscillator(closings);
    deepStrictEqual(roundDigitsAll(4, actual), expected);
  });
});

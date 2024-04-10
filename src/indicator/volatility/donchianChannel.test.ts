// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { dc } from './donchianChannel';

describe('Donchian Channel (DC)', () => {
  it('should be able to compute with a config', () => {
    const closings = [9, 11, 7, 10, 8];
    const expectedUpperChannel = [9, 11, 11, 11, 11];
    const expectedMiddleChannel = [9, 10, 9, 9, 9];
    const expectedLowerChannel = [9, 9, 7, 7, 7];

    const actual = dc(closings, { period: 4 });
    expect(roundDigitsAll(2, actual.upperChannel)).toStrictEqual(
      expectedUpperChannel
    );
    expect(roundDigitsAll(2, actual.middleChannel)).toStrictEqual(
      expectedMiddleChannel
    );
    expect(roundDigitsAll(2, actual.lowerChannel)).toStrictEqual(
      expectedLowerChannel
    );
  });

  // TODO: Test - without a config
});

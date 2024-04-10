import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { roc } from './priceRateOfChange';

describe('Price Rate of Change (ROC)', () => {
  it('should be able to compute ROC', () => {
    const values = [1, 3, 5, 4, 2, 5, 3];
    const expected = [0, 0, 0, 300, -33.33, 0, -25];
    const period = 3;

    const actual = roc(values, { period });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});

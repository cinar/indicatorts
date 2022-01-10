// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {BinarySearchTree} from '../../helper/binarySearchTree';

/**
 * Moving min for the given period.
 * @param {number} period window period.
 * @param {number[]} values values array.
 * @return {number[]} moving min.
 */
export function mmin(period: number, values: number[]): number[] {
  const result = new Array<number>(values.length);
  const bst = new BinarySearchTree();

  for (let i = 0; i < values.length; i++) {
    bst.insert(values[i]);

    if (i >= period) {
      bst.remove(values[i - period]);
    }

    result[i] = bst.min();
  }

  return result;
}

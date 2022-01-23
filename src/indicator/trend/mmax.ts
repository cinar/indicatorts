// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { BinarySearchTree } from '../../helper/binarySearchTree';

/**
 * Moving max for the given period.
 * @param period window period.
 * @param values values array.
 * @return moving max.
 */
export function mmax(period: number, values: number[]): number[] {
  const result = new Array<number>(values.length);
  const bst = new BinarySearchTree();

  for (let i = 0; i < values.length; i++) {
    bst.insert(values[i]);

    if (i >= period) {
      bst.remove(values[i - period]);
    }

    result[i] = bst.max();
  }

  return result;
}

// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { BinarySearchTree } from '../../helper/binarySearchTree';

/**
 * Optional configuration of MMin parameters.
 */
export interface MMinConfig {
  period?: number;
}

/**
 * The default configuration of MMin.
 */
export const MMinDefaultConfig: Required<MMinConfig> = {
  period: 4,
};

/**
 * Moving min for the given period.
 * @param values values array.
 * @param config configuration.
 * @return moving min.
 */
export function mmin(values: number[], config: MMinConfig = {}): number[] {
  const { period } = { ...MMinDefaultConfig, ...config };
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

// Export full name
export { mmin as movingMin };

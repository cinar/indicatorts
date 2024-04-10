// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { BinarySearchTree } from '../../helper/binarySearchTree';

/**
 * Optional configuration of MovingMax parameters.
 */
export interface MovingMaxConfig {
  period?: number;
}

/**
 * The default configuration of MovingMax.
 */
export const MovingMaxDefaultConfig: Required<MovingMaxConfig> = {
  period: 4,
};

/**
 * Moving max for the given period.
 * @param values values array.
 * @param config configuration.
 * @return moving max.
 */
export function mmax(values: number[], config: MovingMaxConfig = {}): number[] {
  const { period } = { ...MovingMaxDefaultConfig, ...config };
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

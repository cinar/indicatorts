// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { strictEqual } from 'assert';
import { BinarySearchTree } from './binarySearchTree';

describe('Binary Search Tree (BST)', () => {
  it('should be able to compute min', () => {
    const values = [2, 1, 3, 4, 0, 6, 6, 10, -1, 9];
    const expected = [2, 1, 1, 1, 0, 0, 0, 0, -1, -1];
    const bst = new BinarySearchTree();

    for (let i = 0; i < values.length; i++) {
      bst.insert(values[i]);
      strictEqual(bst.min(), expected[i]);
    }

    for (let i = values.length - 1; i > 0; i--) {
      const removed = bst.remove(values[i]);
      strictEqual(removed, true);
      strictEqual(bst.min(), expected[i - 1]);
    }
  });
  it('should be able to compute max', () => {
    const values = [2, 1, 3, 4, 0, 6, 6, 10, -1, 9];
    const expected = [2, 2, 3, 4, 4, 6, 6, 10, 10, 10];
    const bst = new BinarySearchTree();

    for (let i = 0; i < values.length; i++) {
      bst.insert(values[i]);
      strictEqual(bst.max(), expected[i]);
    }

    for (let i = values.length - 1; i > 0; i--) {
      const removed = bst.remove(values[i]);
      strictEqual(removed, true);
      strictEqual(bst.max(), expected[i - 1]);
    }
  });
});

// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
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

  it('should stay balanced and correct on a large monotonic sliding window', () => {
    // A strongly trending (monotonically increasing) series is exactly the
    // case that degenerates an unbalanced BST into a linked list. This
    // proves the tree stays balanced (no stack overflow, no timeout) and
    // still reports correct min/max throughout, using the same
    // insert-then-remove-oldest sliding-window pattern that mmax/mmin use.
    const size = 20000;
    const period = 14;
    const bst = new BinarySearchTree();

    for (let i = 0; i < size; i++) {
      bst.insert(i);

      if (i >= period) {
        const removedValue = i - period;
        const removed = bst.remove(removedValue);
        strictEqual(removed, true);
      }

      const windowStart = Math.max(0, i - period + 1);
      strictEqual(bst.min(), windowStart);
      strictEqual(bst.max(), i);
    }
  });

  it('should stay balanced and correct on a large decreasing sliding window with duplicates', () => {
    // Decreasing values with heavy duplicates exercise the same worst case
    // for an unbalanced BST, and also the multiset removal semantics.
    const size = 10000;
    const period = 10;
    const bst = new BinarySearchTree();
    const values: number[] = [];

    for (let i = 0; i < size; i++) {
      // Repeats every value once, so every other insert is a duplicate.
      const value = size - Math.floor(i / 2);
      values.push(value);

      bst.insert(value);

      if (i >= period) {
        const removed = bst.remove(values[i - period]);
        strictEqual(removed, true);
      }

      const windowStart = Math.max(0, i - period + 1);
      let expectedMin = Infinity;
      let expectedMax = -Infinity;
      for (let j = windowStart; j <= i; j++) {
        expectedMin = Math.min(expectedMin, values[j]);
        expectedMax = Math.max(expectedMax, values[j]);
      }

      strictEqual(bst.min(), expectedMin);
      strictEqual(bst.max(), expectedMax);
    }
  });
});

// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * AVL tree node.
 */
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
}

/**
 * Result of a recursive remove operation.
 */
interface RemoveResult {
  node: TreeNode | null;
  removed: boolean;
}

/**
 * Binary search tree object.
 *
 * This is a self-balancing (AVL) binary search tree that behaves as a
 * multiset: duplicate values are allowed, and removing a value removes
 * exactly one node holding it. Balancing keeps insert, remove, min, and
 * max at O(log n) regardless of insertion order, including monotonic or
 * duplicate-heavy sequences that would otherwise degenerate a plain BST
 * into a linked list.
 */
export class BinarySearchTree {
  private root: TreeNode | null = null;

  /**
   * Inserts the given value.
   * @param value numeric value.
   */
  insert(value: number): void {
    this.root = BinarySearchTree.insertNode(this.root, value);
  }

  /**
   * Removes the given value.
   * @param value numeric value.
   * @return value removed.
   */
  remove(value: number): boolean {
    const result = BinarySearchTree.removeNode(this.root, value);
    this.root = result.node;
    return result.removed;
  }

  /**
   * Min value.
   * @return min value.
   */
  min(): number {
    if (this.root === null) {
      throw new Error('Tree empty');
    }

    return BinarySearchTree.minNode(this.root).value;
  }

  /**
   * Max value.
   * @return max value.
   */
  max(): number {
    if (this.root === null) {
      throw new Error('Tree empty');
    }

    return BinarySearchTree.maxNode(this.root).value;
  }

  /**
   * Height of the given node, or 0 for an empty subtree.
   * @param node tree node.
   * @return height.
   */
  private static height(node: TreeNode | null): number {
    return node === null ? 0 : node.height;
  }

  /**
   * Recomputes and stores the height of the given node from its children.
   * @param node tree node.
   */
  private static updateHeight(node: TreeNode): void {
    node.height =
      1 +
      Math.max(
        BinarySearchTree.height(node.left),
        BinarySearchTree.height(node.right)
      );
  }

  /**
   * Balance factor of the given node (left height minus right height).
   * @param node tree node.
   * @return balance factor.
   */
  private static balanceFactor(node: TreeNode): number {
    return (
      BinarySearchTree.height(node.left) - BinarySearchTree.height(node.right)
    );
  }

  /**
   * Rotates the given node right, and returns the new subtree root.
   * @param node tree node.
   * @return new subtree root.
   */
  private static rotateRight(node: TreeNode): TreeNode {
    const left = node.left as TreeNode;
    node.left = left.right;
    left.right = node;

    BinarySearchTree.updateHeight(node);
    BinarySearchTree.updateHeight(left);

    return left;
  }

  /**
   * Rotates the given node left, and returns the new subtree root.
   * @param node tree node.
   * @return new subtree root.
   */
  private static rotateLeft(node: TreeNode): TreeNode {
    const right = node.right as TreeNode;
    node.right = right.left;
    right.left = node;

    BinarySearchTree.updateHeight(node);
    BinarySearchTree.updateHeight(right);

    return right;
  }

  /**
   * Updates the given node's height, and rebalances it with single or
   * double rotations if it has become unbalanced.
   * @param node tree node.
   * @return new, balanced subtree root.
   */
  private static rebalance(node: TreeNode): TreeNode {
    BinarySearchTree.updateHeight(node);
    const balance = BinarySearchTree.balanceFactor(node);

    if (balance > 1) {
      const left = node.left as TreeNode;

      if (BinarySearchTree.balanceFactor(left) < 0) {
        // Left-right case.
        node.left = BinarySearchTree.rotateLeft(left);
      }

      // Left-left case.
      return BinarySearchTree.rotateRight(node);
    }

    if (balance < -1) {
      const right = node.right as TreeNode;

      if (BinarySearchTree.balanceFactor(right) > 0) {
        // Right-left case.
        node.right = BinarySearchTree.rotateRight(right);
      }

      // Right-right case.
      return BinarySearchTree.rotateLeft(node);
    }

    return node;
  }

  /**
   * Recursively inserts the given value under the given subtree root, and
   * returns the new, balanced subtree root.
   * @param node subtree root.
   * @param value numeric value.
   * @return new subtree root.
   */
  private static insertNode(node: TreeNode | null, value: number): TreeNode {
    if (node === null) {
      return { value, left: null, right: null, height: 1 };
    }

    if (value <= node.value) {
      node.left = BinarySearchTree.insertNode(node.left, value);
    } else {
      node.right = BinarySearchTree.insertNode(node.right, value);
    }

    return BinarySearchTree.rebalance(node);
  }

  /**
   * Recursively removes one node holding the given value from under the
   * given subtree root, and returns the new, balanced subtree root along
   * with whether a node was removed.
   * @param node subtree root.
   * @param value numeric value.
   * @return remove result.
   */
  private static removeNode(
    node: TreeNode | null,
    value: number
  ): RemoveResult {
    if (node === null) {
      return { node: null, removed: false };
    }

    let removed: boolean;

    if (value < node.value) {
      const result = BinarySearchTree.removeNode(node.left, value);
      node.left = result.node;
      removed = result.removed;
    } else if (value > node.value) {
      const result = BinarySearchTree.removeNode(node.right, value);
      node.right = result.node;
      removed = result.removed;
    } else {
      removed = true;

      if (node.left === null) {
        return { node: node.right, removed: true };
      }

      if (node.right === null) {
        return { node: node.left, removed: true };
      }

      // Two children: replace this node's value with its in-order
      // successor (the min of the right subtree), then remove that
      // successor's node from the right subtree.
      const successor = BinarySearchTree.minNode(node.right);
      node.value = successor.value;

      const result = BinarySearchTree.removeNode(node.right, successor.value);
      node.right = result.node;
    }

    return {
      node: removed ? BinarySearchTree.rebalance(node) : node,
      removed,
    };
  }

  /**
   * Min node under the given subtree root.
   * @param node subtree root.
   * @return min node.
   */
  private static minNode(node: TreeNode): TreeNode {
    let current = node;

    while (current.left !== null) {
      current = current.left;
    }

    return current;
  }

  /**
   * Max node under the given subtree root.
   * @param node subtree root.
   * @return max node.
   */
  private static maxNode(node: TreeNode): TreeNode {
    let current = node;

    while (current.right !== null) {
      current = current.right;
    }

    return current;
  }
}

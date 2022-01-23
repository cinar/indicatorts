// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Tree node.
 */
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Tree result info object.
 */
interface TreeNodeInfo {
  node: TreeNode | null;
  parent: TreeNode | null;
}

/**
 * Binary search tree object.
 */
export class BinarySearchTree {
  private root: TreeNode | null = null;

  /**
   * Inserts the given value.
   * @param value numeric value.
   */
  insert(value: number): void {
    const node: TreeNode = {
      value: value,
      left: null,
      right: null,
    };

    if (this.root === null) {
      this.root = node;
      return;
    }

    let current = this.root;
    let found = false;

    while (!found) {
      if (node.value <= current.value) {
        if (current.left === null) {
          current.left = node;
          found = true;
        } else {
          current = current.left;
        }
      } else {
        if (current.right === null) {
          current.right = node;
          found = true;
        } else {
          current = current.right;
        }
      }
    }
  }

  /**
   * Removes the given value.
   * @param value numeric value.
   * @return value removed.
   */
  remove(value: number): boolean {
    const info: TreeNodeInfo = {
      node: this.root,
      parent: null,
    };

    while (info.node !== null) {
      if (value === info.node.value) {
        this.removeNode(info);
        return true;
      } else {
        info.parent = info.node;

        if (value < info.node.value) {
          info.node = info.node.left;
        } else {
          info.node = info.node.right;
        }
      }
    }

    return false;
  }

  /**
   * Min value.
   * @return min value.
   */
  min(): number {
    const minInfo = BinarySearchTree.minNode(this.root);
    if (minInfo.node === null) {
      throw new Error('Tree empty');
    }

    return minInfo.node.value;
  }

  /**
   * Max value.
   * @return max value.
   */
  max(): number {
    const maxInfo = BinarySearchTree.maxNode(this.root);
    if (maxInfo.node === null) {
      throw new Error('Tree empty');
    }

    return maxInfo.node?.value;
  }

  /**
   * Removes the node info.
   * @param info node info.
   */
  private removeNode(info: TreeNodeInfo) {
    if (info.node === null) {
      return;
    }

    if (info.node.left !== null && info.node.right !== null) {
      const minInfo = BinarySearchTree.minNode(info.node.right);
      if (minInfo.parent === null) {
        minInfo.parent = info.node;
      }

      this.removeNode(minInfo);
      if (minInfo.node !== null) {
        info.node.value = minInfo.node.value;
      }
    } else {
      let child: TreeNode | null = null;

      if (info.node.left !== null) {
        child = info.node.left;
      } else {
        child = info.node.right;
      }

      if (info.parent === null) {
        this.root = child;
      } else if (info.parent.left === info.node) {
        info.parent.left = child;
      } else {
        info.parent.right = child;
      }
    }
  }

  /**
   * Min node function returns the min node and its parent.
   * @param root root node.
   * @return node info.
   */
  private static minNode(root: TreeNode | null): TreeNodeInfo {
    const info: TreeNodeInfo = {
      node: null,
      parent: null,
    };

    if (root !== null) {
      info.node = root;

      while (info.node.left !== null) {
        info.parent = info.node;
        info.node = info.node.left;
      }
    }

    return info;
  }

  /**
   * Max node funection returns the mac node and its parent.
   * @param root root node.
   * @return node info.
   */
  private static maxNode(root: TreeNode | null): TreeNodeInfo {
    const info: TreeNodeInfo = {
      node: null,
      parent: null,
    };

    if (root !== null) {
      info.node = root;

      while (info.node.right !== null) {
        info.parent = info.node;
        info.node = info.node.right;
      }
    }

    return info;
  }
}

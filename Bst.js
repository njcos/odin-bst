class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = this.sort(array);
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }
  sort(arr) {
    let sortedArray = arr.sort((a, b) => a - b);
    let preparedArray = [...new Set(sortedArray)];
    return preparedArray;
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);
    return root;
  }

  insert(num, root = this.root) {
    if (root === null) {
      return;
    } else {
      if (num < root.data) {
        if (root.left === null) {
          root.left = new Node(num);
        }
        this.insert(num, root.left);
      } else if (num > root.data) {
        if (root.right === null) {
          root.right = new Node(num);
        }
        this.insert(num, root.right);
      }
    }
  }

  remove(data) {
    this.root = this.removeNode(data, this.root);
  }

  removeNode(num, node) {
    if (!node) {
      return null;
    }
    if (num < node.data) {
      node.left = this.removeNode(num, node.left);
      return node;
    } else if (num > node.data) {
      node.right = this.removeNode(num, node.right);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        const temp = this.findMin(node.right);
        node.data = temp.data;
        node.right = this.removeNode(temp.data, node.right);
        return node;
      }
    }
  }

  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  find(value, root = this.root) {
    if (!root) {
      return value;
    }
    if (value === root.data) {
      return root;
    }
    if (value < root.data) {
      this.find(value, root.left);
    } else if (value > root.data) {
      this.find(value, root.right);
    }
  }

  levelOrder(callback, root = this.root) {
    let q = [root];
    if (root === null) {
      return;
    }
    while (q.length !== 0) {
      let curr = q[0];
      q.shift();
      if (curr.left) {
        q.push(curr.left);
      }
      if (curr.right) {
        q.push(curr.right);
      }
      callback(curr);
    }
  }
  preOrder(callback, root = this.root) {
    if (root === null) {
      return;
    }
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }
  inOrder(callback, root = this.root) {
    if (root === null) {
      return;
    }
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }
  postOrder(callback, root = this.root) {
    if (root === null) {
      return;
    }
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }
  depth(value, root = this.root) {
    let height = 1;
    if (root === null) {
      return value;
    }
    while (root !== null || root.data !== value) {
      if (value === root.data) {
        console.log(height);
        return height;
      }
      if (value < root.data) {
        height++;
        root = root.left;
      } else if (value > root.data) {
        height++;
        root = root.right;
      }
    }
  }
  bottom(root = this.root, height = 1) {
    if (root === null) {
      return -1;
    }
    if (root.left === null && root.right === null) {
      return height;
    }
    const leftHeight = this.bottom(root.left, height++);
    const rightHeight = this.bottom(root.right, height++);
    return Math.max(leftHeight, rightHeight);
  }

  height(value) {
    const depth = this.depth(value);
    const tree = this.bottom();
    // console.log(tree - depth);
    return tree - depth;
  }

  isBalanced() {
    let left = this.bottom(this.root.left);
    let right = this.bottom(this.root.right);
    if (left > right + 1) {
      console.log("left is larger");
    } else if (right > left + 1) {
      console.log("right is larger");
    } else {
      console.log("balanced");
    }
  }

  rebalance() {
    let newArray = [];
    this.inOrder((e) => {
      newArray.push(e.data);
    });
    this.array = newArray;
    this.root = this.buildTree(newArray, 0, newArray.length - 1);
  }
}
export { Tree };

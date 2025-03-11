import { Tree } from "./Bst.js";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const newArray = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 200)
);

const tree = new Tree(array);
const newTree = new Tree(newArray);
console.log(newTree);
newTree.insert(202);
newTree.insert(203);
newTree.insert(205);
newTree.insert(206);

newTree.isBalanced();
newTree.rebalance();
newTree.isBalanced();

tree.insert(10);
tree.insert(12);
tree.insert(13);
tree.insert(14);

tree.remove(67);
tree.find(7);
tree.depth(10);
tree.height(9);
console.log(tree);
tree.isBalanced();
tree.rebalance();
console.log(tree);
// tree.isBalanced();
// tree.levelOrder(console.log);
// tree.preOrder(console.log);
// tree.inOrder(console.log);
// tree.postOrder(console.log);

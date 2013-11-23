/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/21/13
 * Time: 7:03 AM
 * To change this template use File | Settings | File Templates.
 */
//binary search tree

//to do methods:  balance, isBalanced, depth, height,

;(function (){

  var BSTree = function () {
    this.root = null;
  };

  BSTree.prototype.insert = function (key) {
    var newNode;
    newNode = new Node(key);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this._addChild(this.root, newNode);
    }
  };

  BSTree.prototype.search = function (key) {
    var focusNode = this.root;

    while (focusNode !== null && focusNode.key !== key) {
      focusNode = key < focusNode.key ? focusNode.leftChild : focusNode.rightChild;
    }

    if (focusNode === null) return -1;
    return focusNode;
  };

  BSTree.prototype.delete = function (key) {
    var nodeToDelete = this.search(key);
    var successor;

    if (nodeToDelete.leftChild !== null && nodeToDelete.rightChild !== null) {
      // Swap successor with node to delete;
      successor = nodeToDelete._findSuccessor();
      nodeToDelete.key = successor.key;

      this._deleteBranchNode(successor.parent, successor, true);

    } else if (nodeToDelete.leftChild && nodeToDelete.rightChild === null) {

      this._deleteBranchNode(nodeToDelete.parent, nodeToDelete, false);

    } else if (nodeToDelete.rightChild && nodeToDelete.leftChild === null) {

      this._deleteBranchNode(nodeToDelete.parent, nodeToDelete, true);

    } else {
      this._deleteLeafNode(nodeToDelete.parent, nodeToDelete);
    }
  };

  BSTree.prototype._deleteBranchNode = function (parentNode, nodeToDelete, isRightSubtree) {
    parentNode.leftChild = isRightSubtree ? nodeToDelete.rightChild : nodeToDelete.leftChild;
    nodeToDelete.parent = null
  };

  BSTree.prototype._deleteLeafNode = function (parentNode, nodeToDelete) {
    if (parentNode === null) {
      this.root = null;
      return
    }
    if (nodeToDelete.key < parentNode.key) {
      parentNode.leftChild = null;
    } else {
      parentNode.rightChild = null;
    }
    nodeToDelete.parent = null;
  };

  BSTree.prototype.inOrderTraversal = function (focusNode) {
    if (focusNode === null) return;

    this.inOrderTraversal(focusNode.leftChild);
    console.log(focusNode.key);
    this.inOrderTraversal(focusNode.rightChild);

  };

  BSTree.prototype.preOrderTraversal = function (focusNode) {
    if (focusNode === null) return;

    console.log(focusNode.key);
    this.preOrderTraversal(focusNode.leftChild);
    this.preOrderTraversal(focusNode.rightChild);
  };

  BSTree.prototype.postOrderTraversal = function (focusNode) {
    if (focusNode === null) return;

    this.postOrderTraversal(focusNode.leftChild);
    this.postOrderTraversal(focusNode.rightChild);
    console.log(focusNode.key);
  };

  BSTree.prototype._addChild = function (parentNode, nodeToInsert) {
    if (nodeToInsert.key < parentNode.key) {
      this._insertIntoLeftSubTree(parentNode, nodeToInsert);
    } else {
      this._insertIntoRightSubTree(parentNode, nodeToInsert);
    }
  };

  BSTree.prototype._insertIntoRightSubTree = function (parentNode, nodeToInsert) {
    if (parentNode.rightChild === null) {
      parentNode.rightChild = nodeToInsert;
      nodeToInsert.parent = parentNode;
    } else {
      this._addChild(parentNode.rightChild, nodeToInsert);
    }
  };

  BSTree.prototype._insertIntoLeftSubTree = function (parentNode, nodeToInsert) {
    if (parentNode.leftChild === null) {
      parentNode.leftChild = nodeToInsert;
      nodeToInsert.parent = parentNode;
    } else {
      this._addChild(parentNode.leftChild, nodeToInsert);
    }
  };

  var Node = function (key) {
    this.key = key;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
  };

  Node.prototype._findSuccessor = function () {
    var focusNode = this.rightChild;

    if (focusNode === null) return this.parent;

    while (focusNode.leftChild !== null) {
      focusNode = focusNode.leftChild
    }
    return focusNode;
  };

  Algorithms.DataStructures.BSTree = BSTree;

}());





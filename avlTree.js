/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/22/13
 * Time: 4:54 PM
 * To change this template use File | Settings | File Templates.
 */

;
(function () {

//  constructor for AVL tree node

  var Node = function (key) {
    this.key = key;
    this.parent = null;
    this.rightChild = null;
    this.leftChild = null;
    this.height = 0;
  };

  Node.prototype.getChildrenMaxHeight = function () {
    var left = this.leftChild, right = this.rightChild;
    if (right && left) {
      return Math.max(right.height, left.height)
    } else if (right) {
      return right.height
    } else if (left) {
      return left.height
    }
    return -1
  };

  Node.prototype.getBalanceFactor = function () {
    var leftHeight = this.leftChild ? this.leftChild.height : -1;
    var rightHeight = this.rightChild ? this.rightChild.height : -1;
    return leftHeight - rightHeight
  };

  Node.prototype._findSuccessor = function () {
    var focusNode = this.rightChild;

    if (focusNode === null) return this.parent;

    while (focusNode.leftChild !== null) {
      focusNode = focusNode.leftChild
    }
    return focusNode;
  };

  // Constructor for AVL tree
  var AVLTree = function () {
    this.root = null;
    this._statistics = {
      numberOfNodes: 0,
      totalRebalances: 0
    };
  };

  AVLTree.prototype.getTreeHeight = function () {
    return this.root ? this.root.height : 0
  };

  AVLTree.prototype.insertNode = function (key) {
    var newNode = new Node(key);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._addChild(this.root, newNode);
    }
    this._statistics.numberOfNodes += 1; //with root
  };

  AVLTree.prototype.search = function (key) {
    return this._searchInSubtree(this.root, key)
  };

  AVLTree.prototype._searchInSubtree = function (node, key) {
    if (node === null) return -1;
    if (node.key === key) return node;
    if (key < node.key) {
      return this._searchInSubtree(node.leftChild, key)
    }
    return this._searchInSubtree(node.rightChild, key)
  };

  AVLTree.prototype.delete = function (key) {
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

  AVLTree.prototype._deleteBranchNode = function (parentNode, nodeToDelete, isRightSubtree) {
    var unbalanceNode;

    parentNode.leftChild = isRightSubtree ? nodeToDelete.rightChild : nodeToDelete.leftChild;
    nodeToDelete.parent = null;
    this._recalculateHeight(parentNode);

    unbalanceNode = this._findUnbalancedNode(parentNode);
    if (unbalanceNode) {
      this._rebalancing(unbalanceNode);
    }
  };

  AVLTree.prototype._deleteLeafNode = function (parentNode, nodeToDelete) {
    var unbalanceNode;

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
    this._recalculateHeight(parent);

    unbalanceNode = this._findUnbalancedNode(parentNode);
    if (unbalanceNode) {
      this._rebalancing(unbalanceNode);
    }
  };

  AVLTree.prototype._addChild = function (parentNode, nodeToInsert) {
    if (nodeToInsert.key < parentNode.key) {
      this._insertIntoLeftSubTree(parentNode, nodeToInsert);
    } else {
      this._insertIntoRightSubTree(parentNode, nodeToInsert);
    }
  };

  AVLTree.prototype._insertIntoLeftSubTree = function (parentNode, nodeToInsert) {
    var unbalancedNode;

    if (parentNode.leftChild === null) {
      parentNode.leftChild = nodeToInsert;
      nodeToInsert.parent = parentNode;

      if (parentNode.height === 0) {
        unbalancedNode = this._findUnbalancedNode(parentNode);
      }
    } else {
      // Go deeper into left subTree to find place to insert new node
      this._addChild(parentNode.leftChild, nodeToInsert);
    }

    // Trigger self-balancing process
    if (unbalancedNode) {
      this._rebalancing(unbalancedNode);
    }
  };

  AVLTree.prototype._insertIntoRightSubTree = function (parentNode, nodeToInsert) {
    var unbalancedNode;

    if (parentNode.rightChild === null) {
      parentNode.rightChild = nodeToInsert;
      nodeToInsert.parent = parentNode;

      if (parentNode.height === 0) {
        unbalancedNode = this._findUnbalancedNode(parentNode);
      }
    } else {
      // Go deeper into right subTree to find place to insert new node
      this._addChild(parentNode.rightChild, nodeToInsert);
    }

    // Trigger self-balancing process
    if (unbalancedNode) {
      this._rebalancing(unbalancedNode);
    }
  };

  AVLTree.prototype._findUnbalancedNode = function (node) {
    var focusNode = node, unbalancedNode;
    while (focusNode !== null) {
      focusNode.height = focusNode.getChildrenMaxHeight() + 1;
      // Check if after insert we have unbalanced tree
      if (focusNode.getBalanceFactor() < -1 || focusNode.getBalanceFactor() > 1) {
        unbalancedNode = focusNode;
        break;
      }
      focusNode = focusNode.parent;
    }

    return unbalancedNode
  };

  AVLTree.prototype._rebalancing = function (node) {
    var balanceFactor = node.getBalanceFactor();

    this._statistics.totalRebalances += 1;  //do I need this?

    if (balanceFactor === -2) {
      if (node.rightChild.getBalanceFactor() <= 0) {
        // Right right case
        this._rotateRight(node)
      } else {
        // Right left case
        this._rotateRightLeft(node)
      }
    } else if (balanceFactor == 2) {
      if (node.leftChild.getBalanceFactor() >= 0) {
        // Left left case
        this._rotateLeft(node);
      } else {
        // Left right case
        this._rotateLeftRight(node);
      }
    }
  };

  AVLTree.prototype._rotateRightLeft = function (node) {
    var rightSubtree = node.rightChild;
    var leftSubtreeOfRightSubtree = rightSubtree.leftChild;

    // Rearranging subtrees of rotating nodes if exists
    rightSubtree.leftChild = leftSubtreeOfRightSubtree.rightChild;
    if (rightSubtree.leftChild) {
      rightSubtree.leftChild.parent = rightSubtree;
    }

    node.rightChild = leftSubtreeOfRightSubtree;
    leftSubtreeOfRightSubtree.parent = node;

    leftSubtreeOfRightSubtree.rightChild = rightSubtree;
    rightSubtree.parent = leftSubtreeOfRightSubtree;

    //Recalculate heights of rotated nodes
    this._recalculateHeight(rightSubtree);
    this._recalculateHeight(leftSubtreeOfRightSubtree);

    this._rotateRight(node);
  };

  AVLTree.prototype._rotateLeftRight = function (node) {
    var leftSubtree = node.leftChild;
    var rightSubtreeOfLeftSubTree = leftSubtree.rightChild;

    leftSubtree.rightChild = rightSubtreeOfLeftSubTree.leftChild;
    if (leftSubtree.rightChild) {
      leftSubtree.rightChild.parent = leftSubtree;
    }

    node.leftChild = rightSubtreeOfLeftSubTree;
    rightSubtreeOfLeftSubTree.parent = node;

    rightSubtreeOfLeftSubTree.leftChild = leftSubtree;
    leftSubtree.parent = rightSubtreeOfLeftSubTree;

    //Recalculate heights of rotated nodes
    this._recalculateHeight(leftSubtree);
    this._recalculateHeight(rightSubtreeOfLeftSubTree);

    this._rotateLeft(node);
  };

  AVLTree.prototype._rotateLeft = function (node) {
    var leftSubtree = node.leftChild;
    var parent = node.parent;

    // Rearranging subtrees of rotating nodes if exists
    node.leftChild = leftSubtree.rightChild;
    if (node.leftChild) {
      node.leftChild.parent = node;
    }

    leftSubtree.rightChild = node;
    node.parent = leftSubtree;

    //Check if rotation happens at the root level
    if (parent === null) {
      this.root = leftSubtree;
      this.root.parent = null;
    } else {
      // Check if balancing happens in right subTree or left subtree
      if (parent.rightChild === node) {
        parent.rightChild = leftSubtree;
      } else {
        parent.leftChild = leftSubtree;
      }
      leftSubtree.parent = parent;
    }

//    Recalculate heights of rotated nodes
    this._recalculateHeight(node);
    this._recalculateHeight(leftSubtree);

  };

  AVLTree.prototype._rotateRight = function (node) {
    var rightSubTree = node.rightChild;
    var parent = node.parent;
    //do i need next right subtree??

    // Left subtree of node which goes up becomes a left subtree of unbalanced node
    node.rightChild = rightSubTree.leftChild;
    //Setup a new parent for this subtree
    if (node.rightChild) {
      node.rightChild.parent = node;
    }

    // Unbalanced node becomes a left subtree for node which went up
    rightSubTree.leftChild = node;
    node.parent = rightSubTree;

    //Check if rotation happens at the root level
    if (parent === null) {
      this.root = rightSubTree;
      this.root.parent = null;
    } else {
      // Check if balancing happens in right subTree or left subtree
      if (parent.rightChild === node) {
        parent.rightChild = rightSubTree;
      } else {
        parent.leftChild = rightSubTree;
      }
      rightSubTree.parent = parent;
    }

    //Recalculate heights of rotated nodes
    this._recalculateHeight(node);
    this._recalculateHeight(rightSubTree);
  };

  AVLTree.prototype._recalculateHeight = function (node) {
    var isChanged = true;
    var focusNode = node;
    var prevHeight;

    while (focusNode !== null && isChanged) {
      prevHeight = focusNode.height;
      focusNode.height = focusNode.leftChild || focusNode.rightChild ? focusNode.getChildrenMaxHeight() + 1 : 0;
      isChanged = prevHeight !== focusNode.height;
      focusNode = focusNode.parent;
    }
  };

  AVLTree.prototype.toString = function () {
    return this.root
  };

  Algorithms.DataStructures.AVLTree = AVLTree;

}());

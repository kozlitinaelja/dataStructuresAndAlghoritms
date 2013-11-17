/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/9/13
 * Time: 12:30 PM
 * To change this template use File | Settings | File Templates.
 */

var Heap = function () {
  var _heap = [];

  function siftUp() {
    var indexOfNewItem = _heap.length - 1;
    var parentIndex = decreaseKey(indexOfNewItem);
    var buffer;

    if (parentIndex === -1) return;

    while (parentIndex !== -1) {
      if (_heap[indexOfNewItem] < _heap[parentIndex]) {
        buffer = _heap[indexOfNewItem];
        _heap[indexOfNewItem] = _heap[parentIndex];
        _heap[parentIndex] = buffer;
        indexOfNewItem = parentIndex;
        parentIndex = decreaseKey(indexOfNewItem);
      } else {
        break;
      }
    }
  }

  function siftDown() {
    var buffer;
    var parentIndex = 0;
    var leftChildrenIndex = 2 * parentIndex + 1;
    var rightChildrenIndex, minChildren;

    if (leftChildrenIndex > _heap.length) {
      return;
    }

    while (leftChildrenIndex < _heap.length) {
      minChildren = leftChildrenIndex;
      rightChildrenIndex = leftChildrenIndex + 1;
      if (rightChildrenIndex < _heap.length) {
        if (_heap[rightChildrenIndex] < _heap[leftChildrenIndex]) {
          minChildren = rightChildrenIndex;
          buffer = _heap[parentIndex];
          _heap[parentIndex] = _heap[rightChildrenIndex];
          _heap[rightChildrenIndex] = buffer;
          parentIndex = minChildren;
          leftChildrenIndex = 2 * parentIndex + 1;
        }
      } else {
        break;
      }
    }
  }

  function insert(newElement) {
    _heap[_heap.length] = newElement;
    siftUp();
    console.log(_heap);
    return _heap.toString();
  }

  function deleteMin() {
    var itemToDelete;

    if (isEmpty()) {
      console.log("Heap is empty. There is nothing to delete");
    }

    itemToDelete = _heap[0];

    siftDown();

    _heap.length = _heap.length - 1;

    if (isEmpty()) {
     console.log("Last item was deletet. Heap is empty");
    }

    return itemToDelete;

  }

  function findMin() {
    return _heap[0]
  }

  function heapify(array) {
    array.forEach(function(elem) {
      insert(elem);
    });

    return _heap.toString();
  }

  function decreaseKey(childrenNodeIndex) {
    return childrenNodeIndex === 0 ? -1 : ~~((childrenNodeIndex - 1) / 2);
  }

  function toString() {
     return _heap.join(",")
  }

  function isEmpty() {
    return !_heap.length;
  }

  return {
    insert: insert,
    deleteMin: deleteMin,
    findMin: findMin
  }
};

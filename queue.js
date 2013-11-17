/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/9/13
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */
;(function () {
  var Queue = function () {
    var _queue = [];
    var head = 0;
    var tail = 0;

    function enqueue(el) {
     _queue[tail++] = el;
    }

    function dequeue() {
      if (isEmpty()) {
        console.log("Queue is empty");
        return -1
      }
      return _queue[head++];
    }

    function isEmpty() {
      return !!(head === tail);
    }

    return {
      enqueue: enqueue,
      dequeue: dequeue,
      isEmpty: isEmpty
    }
  };

  Algorithms.DataStructures.Queue = Queue;

}());
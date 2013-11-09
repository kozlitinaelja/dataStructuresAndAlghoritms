/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/9/13
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */

(function() {
  var _stack = [];
  var maxSize;
 function Stack(size) {
   maxSize = size || Infinity;
   this.srackSize = _stack.length
 }
  Stack.prototype.top = function () {
    return _stack.length ? _stack[_stack.length - 1] : -1;
  };

  Stack.prototype.pop = function () {
    if (_stack.length === 0) {
      console.log("Stack is empty");
      return -1;
    }
    var delItem = _stack[length-1];
    _stack.length = _stack.length - 1;
    return delItem
  };

  Stack.prototype.push = function (el) {
    if (_stack.length === maxSize) {
      console.log("Stack is full");
      return;
    }
    _stack[_stack.length] = el;
  };

  Algorithms.DataStructures.Stack = Stack;

})();

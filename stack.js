/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/9/13
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */

;
(function () {
  function Stack(size) {
    this._stack = [];
    this.maxSize = size || Infinity;
  }

  Stack.prototype.top = function () {
    if (this.isEmpty() === 0) {
      console.log("Stack is empty");
    } else {
      return this._stack.length ? this._stack[this._stack.length - 1] : -1;
    }
  };

  Stack.prototype.pop = function () {
    if (this.isEmpty() === 0) {
      console.log("Stack is empty");
      return
    }
    var delItem = this._stack[this._stack.length - 1];
    this._stack.length = this._stack.length - 1;
    return delItem
  };

  Stack.prototype.push = function (el) {
    if (this._stack.length === this.maxSize) {
      console.log("Stack is full");
      return;
    }
    this._stack[this._stack.length] = el;
  };

  Stack.prototype.isEmpty = function () {
    return this._stack.length ? false : true;
  };

  Algorithms.DataStructures.Stack = Stack;

})();

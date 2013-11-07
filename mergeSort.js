/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/7/13
 * Time: 10:28 AM
 * To change this template use File | Settings | File Templates.
 */

;(function(){
  algorithms.sorts.mergeSort = mergeSort;

  function mergeSort(arr) {
    if (arr.length < 2) return arr;

    var mid = parseInt(arr.length / 2, 10);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid, arr.length);
    return merge(mergeSort(left), mergeSort(right))
  }

  function merge(leftArr, rightArr) {
    var result = [];
    while (leftArr.length && rightArr.length) {
      if (leftArr[0] <= rightArr[0]) {
        result.push(leftArr.shift());
      } else {
        result.push(rightArr.shift());
      }
    }
    while (leftArr.length) {
      result.push(leftArr.shift());
    }
    while (rightArr.length) {
      result.push(rightArr.shift());
    }
    return result;
  }
}());

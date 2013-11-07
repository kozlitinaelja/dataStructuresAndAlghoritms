/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/7/13
 * Time: 12:06 PM
 * To change this template use File | Settings | File Templates.
 */

;(function(namespace){
  namespace.quickSort = quickSort;

  function quickSort(array, startIndex, endIndex) {
    if (startIndex >= endIndex) return array;

    var pivotIndex = Partition (array, startIndex, endIndex);
    quickSort(array, startIndex, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, endIndex);
    return array
  }

  function Partition(array, start, end) {
    var i, pivot = array[end], pIndex = start;

    for (i = start; i <= end - 1; i++ ) {
      if ( array[i] <= pivot ) {
        var buffer = array[i];
        array[i] = array[pIndex];
        array[pIndex] = buffer;
        buffer = null;
        pIndex++;
      }
    }

    buffer = array[pIndex];
    array[pIndex] = pivot;
    array[end] = buffer;
    buffer = null;
    return pIndex;
  }

}(Algorithms.Sorts || {}));

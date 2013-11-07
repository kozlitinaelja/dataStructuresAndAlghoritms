/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/7/13
 * Time: 1:30 PM
 * To change this template use File | Settings | File Templates.
 */

;
(function () {
  var hashTableSize;

  var Item = function (city, state) {
    this.city = city || "empty";
    this.state = state || "empty";
    this.next = null;
  };

  var HashTable = function (params) {
    params = params || {};
    hashTableSize =  params.hashTableSize || 10;
    this._hashTable = [];
    this.hashTableSize =  hashTableSize;
    this.initializeHashTable();
  };

  HashTable.prototype.initializeHashTable = function() {
    for (var i = 0; i < this.hashTableSize; i++) {
      this._hashTable[i] = new Item();
    }
  };

  HashTable.prototype.addItem = function (city, state) {
    var index = getBucketIndex(city);

    if (this._hashTable[index].city === "empty") {
      this._hashTable[index] = new Item(city, state);
    } else {
      var storedItem = this._hashTable[index];
      var newItem = new Item(city, state);
      while (storedItem.next !== null) {
        storedItem = storedItem.next;
      }
      storedItem.next = newItem;
    }
  };

  HashTable.prototype.numberOfItemsInBucket = function(index) {
    var count = 0;
    if (this._hashTable[index].city !== "empty") {
      count++;
      var storedItem = this._hashTable[index];
      while (storedItem.next !== null) {
        storedItem = storedItem.next;
        count++;
      }
    }
    return count;
  };

  HashTable.prototype.printTable = function() {
    var totalItemsInBucket;

    for (var i = 0; i < this.hashTableSize; i++) {
      totalItemsInBucket = this.numberOfItemsInBucket(i);
      console.log("-------------------------\n");
      console.log("bucket = " + i);
      console.log(this._hashTable[i].city);
      console.log(this._hashTable[i].state);
      console.log("Total number of items in the bucket = " + totalItemsInBucket);
      console.log("-------------------------\n");
    }
  };

  function getBucketIndex(key) {
    var hashValue = 0;
    for (var i = 0, len = key.length; i < len; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % hashTableSize;
  }

  Algorithms.DataStructures.HashTable = HashTable;

}());

var hashTable = new Algorithms.DataStructures.HashTable();

hashTable.addItem("New York", "NY");
hashTable.addItem("Miami", "FL");
hashTable.addItem("Chicago", "IL");
hashTable.addItem("Itaka", "NY");
hashTable.addItem("Minneapolis", "MN");
hashTable.addItem("Boston", "MA");
hashTable.addItem("Hoboken", "NJ");



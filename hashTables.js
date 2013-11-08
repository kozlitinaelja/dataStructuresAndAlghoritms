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
    hashTableSize = params.hashTableSize || 5;
    this._hashTable = [];
    this.hashTableSize = hashTableSize;
    this.initializeHashTable();
  };

  HashTable.prototype.initializeHashTable = function () {
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

  HashTable.prototype.findState = function (city) {
    var bucket = getBucketIndex(city);
    var storedItem = this._hashTable[bucket];
    if (storedItem.city === "empty") {
      console.log("There is no such city in the hash table");
    } else {
      while (storedItem !== null) {
        if (storedItem.city === city) {
          console.log("State is " + storedItem.state);
          return storedItem.state;
        }
        storedItem = storedItem.next;
      }
    }
    return 0;
  };

  HashTable.prototype.removeItem = function (city) {
    var bucket = getBucketIndex(city);
    if (this._hashTable[bucket].city === "empty") {
      console.log("There is no such city in the hash table");
    } else if (this._hashTable[bucket].city === city && this._hashTable[bucket].next === null) {
      this._hashTable[bucket].city = "empty";
      this._hashTable[bucket].state = "empty";

    } else if (this._hashTable[bucket].city === city) {
      var itemToDelete = this._hashTable[bucket];
      this._hashTable[bucket] = this._hashTable[bucket].next;
      itemToDelete = null;

    } else {
      var nextItem = this._hashTable[bucket].next;
      var prevItem = this._hashTable[bucket];

      while (nextItem !== null && nextItem.city !== city) {
        prevItem = nextItem;
        nextItem = prevItem.next;
      }

      if (nextItem === null) {
        console.log("There is no such city in the hash table");
      } else {
        itemToDelete = nextItem;
        nextItem = nextItem.next;
        prevItem.next = nextItem;
        itemToDelete = null;
      }
    }
  };

  HashTable.prototype.numberOfItemsInBucket = function (index) {
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

  HashTable.prototype.printTable = function () {
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

  HashTable.prototype.printItemsPerBucket = function (index) {
    var storedItem = this._hashTable[index];
    if (storedItem.city === "empty") {
      console.log("Bucket is empty");
    } else {
      console.log("Bucket contains: \n");
      while (storedItem !== null) {
        console.log("-------------------------\n");
        console.log(storedItem.city);
        console.log(storedItem.state);
        console.log("-------------------------\n");
        storedItem = storedItem.next;
      }
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

hashTable.printItemsPerBucket(3);



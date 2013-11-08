/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/7/13
 * Time: 1:30 PM
 * To change this template use File | Settings | File Templates.
 */

Algorithms.DataStructures.hashTable = (function () {
  var _hashTable = [];
  var hashTableSize;

  function Item(city, state) {
    this.city = city || "empty";
    this.state = state || "empty";
    this.next = null;
  }

  function initializeHashTable(size) {
    hashTableSize = size || 5;
    for (var i = 0; i < hashTableSize; i++) {
      _hashTable[i] = new Item();
    }
  }

  function addItem(city, state) {
    var index = getBucketIndex(city);

    if (_hashTable[index].city === "empty") {
      _hashTable[index] = new Item(city, state);
    } else {
      var storedItem = _hashTable[index];
      var newItem = new Item(city, state);
      while (storedItem.next !== null) {
        storedItem = storedItem.next;
      }
      storedItem.next = newItem;
    }
  }

  function findState(city) {
    var bucket = getBucketIndex(city);
    var storedItem = _hashTable[bucket];
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
  }

  function removeItem(city) {
    var bucket = getBucketIndex(city);
    if (_hashTable[bucket].city === "empty") {
      console.log("There is no such city in the hash table");
    } else if (_hashTable[bucket].city === city && _hashTable[bucket].next === null) {
      _hashTable[bucket].city = "empty";
      _hashTable[bucket].state = "empty";

    } else if (_hashTable[bucket].city === city) {
      _hashTable[bucket] = _hashTable[bucket].next;

    } else {
      var nextItem = _hashTable[bucket].next;
      var prevItem = _hashTable[bucket];

      while (nextItem !== null && nextItem.city !== city) {
        prevItem = nextItem;
        nextItem = prevItem.next;
      }

      if (nextItem === null) {
        console.log("There is no such city in the hash table");
      } else {
        nextItem = nextItem.next;
        prevItem.next = nextItem;
      }
    }
  }

  function numberOfItemsInBucket(index) {
    var count = 0;
    if (_hashTable[index].city !== "empty") {
      count++;
      var storedItem = _hashTable[index];
      while (storedItem.next !== null) {
        storedItem = storedItem.next;
        count++;
      }
    }
    return count;
  }

  function printTable() {
    var totalItemsInBucket;

    for (var i = 0; i < hashTableSize; i++) {
      totalItemsInBucket = numberOfItemsInBucket(i);
      console.log("-------------------------\n");
      console.log("bucket = " + i);
      console.log(_hashTable[i].city);
      console.log(_hashTable[i].state);
      console.log("Total number of items in the bucket = " + totalItemsInBucket);
      console.log("-------------------------\n");
    }
  }

  function printItemsPerBucket(index) {
    var storedItem = _hashTable[index];
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
  }

  function getBucketIndex(key) {
    var hashValue = 0;
    for (var i = 0, len = key.length; i < len; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % hashTableSize;
  }

  return {
    createTable: function(size) {
      initializeHashTable();
    },
    hashTableSize: hashTableSize,
    addItem: addItem,
    findState: findState,
    removeItem: removeItem,
    numberOfItemsInBucket: numberOfItemsInBucket,
    printTable: printTable,
    printItemsPerBucket: printItemsPerBucket
  }

}());




var hashTable = Algorithms.DataStructures.hashTable;

hashTable.createTable(5);

hashTable.addItem("New York", "NY");
hashTable.addItem("Miami", "FL");
hashTable.addItem("Chicago", "IL");
hashTable.addItem("Itaka", "NY");
hashTable.addItem("Minneapolis", "MN");
hashTable.addItem("Boston", "MA");
hashTable.addItem("Hoboken", "NJ");

hashTable.printItemsPerBucket(3);



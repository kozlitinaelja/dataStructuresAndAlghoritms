/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/17/13
 * Time: 8:59 AM
 * To change this template use File | Settings | File Templates.
 */

;
(function () {
  var Vertex = function (value) {
    this.value = value
  };

  // element of adjacency list: {vertexKey : [[connectedVertexKey, weight]]}

  var Graph = function (isDirected) {
    this._vertexes = {};
    this.adgacencyList = {};
    this._isDirected = isDirected || false;
  };

  Graph.prototype.addVertex = function (value) {
    if (!value) {
      console.warning("Vertex has to have a name");
      return;
    }

    if (_inSet(value, this._vertexes) === -1) {
      this._vertexes[value] = new Vertex(value);
    }

  };

  Graph.prototype.addEdge = function (startVertex, endVertex, weight) {
    if (_inSet(startVertex, this.adgacencyList) === -1) {
      this.adgacencyList[startVertex] = [
        [endVertex, weight ? weight : 1]
      ];
    } else {
      //to do: check if vertex already exists
      this.adgacencyList[startVertex].push([endVertex, weight ? weight : 1])
    }

    if (!this._isDirected) {
      if (_inSet(endVertex, this.adgacencyList) === -1) {
        this.adgacencyList[endVertex] = [
          [startVertex, weight ? weight : 1]
        ];
      } else {
        //to do: check if vertex already exists
        this.adgacencyList[endVertex].push([startVertex, weight ? weight : 1])
      }
    }
  };

  Graph.prototype.neighbors = function (value) {
    var neighbors = [];
    var neighborVertex;
    for (var i = 0; i < this.adgacencyList[value].length; i++) {
      neighborVertex = this._vertexes[this.adgacencyList[value][i][0]];
      neighbors[neighbors.length] = neighborVertex;
    }

    return neighbors;
  };

  Graph.prototype._findWeight = function (startVertex, endVertex) {
     var neighborsList = this.adgacencyList[startVertex];

    for(var i = 0; i < neighborsList.length; i++) {
      if (neighborsList[i][0] === endVertex) {
        return neighborsList[i][1];
      }
    }

    return 0;

  };

  Graph.prototype._forEachVertex = function(callback) {
    for(var key in this._vertexes) {
      if (this._vertexes.hasOwnProperty(key)) {
        callback(this._vertexes[key])
      }
    }
  };

  Graph.prototype.dijkstra = function (source) {
    var vertexes = this._vertexes;
    var minHeap = new Heap("dist");
    var currentVertex;
    var neighbors = [];
    var list = this.adgacencyList;
    var _this = this;
    var parent = {};
    var dist = {};



    _this._forEachVertex(function (vertex) {
      dist[vertex.value] = Infinity;
      vertex.visited = false;
      vertex.dist = Infinity;
      parent[vertex.value] = undefined;
    });

    dist[source] = 0;
    minHeap.insert(vertexes[source]);

    while (!minHeap.isEmpty()) {
      currentVertex = minHeap.deleteMin();
      currentVertex.visited = true;
      neighbors = this.neighbors(currentVertex.value);

      neighbors.forEach(function (neighbor, index, array) {
        var path = dist[currentVertex.value] + _this._findWeight(currentVertex.value, neighbor.value);
        if (path < dist[neighbor.value] && !neighbor.visited) {
          neighbor.dist = path;
          dist[neighbor.value] = path;
          parent[neighbor.value] = currentVertex;
          minHeap.insert(neighbor);
        }
      })
    }

  return dist;
  };

  function _inSet(vertex, obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if ("" + vertex === key) {
          return 1
        }
      }
    }
    return -1;
  }

  Algorithms.DataStructures.Graph = Graph;

}());



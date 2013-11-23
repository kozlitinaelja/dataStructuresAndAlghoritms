/**
 * Created with JetBrains WebStorm.
 * User: elle
 * Date: 11/9/13
 * Time: 9:41 PM
 * To change this template use File | Settings | File Templates.
 */

/*
 # Graph implementation in Adjacency Matrix
 */

(function () {
  var Graph = function (vertexes, isDirected) {
    this._vertexes = [];
    this._edges = [];


    for (var i = 0, len = vertexes.length; i < len; i++) {
      this._vertexes.push(new Vertex(vertexes[i]));
    }

    for (i = 0; i < len; i++) {
      this._edges[i] = [];
      for (var j = 0; j < len; j++) {
        this._edges[i][[j]] = 0;
      }
    }

    this._isDirected = isDirected || false;
  };

  Graph.prototype.addVertex = function (value) {
    var vertex = new Vertex(value);

    this._vertexes.push(vertex);

    this._edges[this._vertexes.length - 1] = [];

    for (var i = 0, len = this._vertexes.length; i < len; i++) {
      this._edges[this._vertexes.length - 1][i] = 0;
      this._edges[i][this._vertexes.length - 1] = 0;
    }
  };

  Graph.prototype.addEdge = function (startVertex, endVertex, weight) {
    this._edges[inArray(startVertex, this._vertexes)][inArray(endVertex, this._vertexes)] = weight ? weight : 1;
    if (!this._isDirected) {
      this._edges[inArray(endVertex, this._vertexes)][inArray(startVertex, this._vertexes)] = weight ? weight : 1;
    }
  };

  Graph.prototype.deleteEdge = function (startVertex, endVertex) {
    this._edges[inArray(startVertex, this._vertexes)][inArray(endVertex, this._vertexes)] = 0;
    if (!this._isDirected) {
      this._edges[inArray(endVertex, this._vertexes)][inArray(startVertex, this._vertexes)] = 0;
    }
  };

  Graph.prototype.deleteVertex = function (vertex) {
    var vIndex = inArray(vertex, this._vertexes);

    if (vIndex === -1) {
      console.log("There is no such vertex in da graph");
      return;
    }

    for (var i = 0, len = this._vertexes.length; i < len; i++) {
      this._edges[i].splice(this._edges[i][vIndex], 1);
    }
    this._edges.splice(vIndex, 1);
    this._vertexes.splice(vIndex, 1);
  };

  Graph.prototype.isAdjacent = function (startVertex, endVertex) {
    return this._edges[inArray(startVertex, this._vertexes)][inArray(endVertex, this._vertexes)] !== 0;
  };

  Graph.prototype.findNeighbors = function (vertex) {
    var neighbors = [];
    for (var i = 0, len = this._vertexes.length; i < len; i++) {
      if (this._edges[inArray(vertex, this._vertexes)][i] > 0) {
        neighbors.push(this._vertexes[i]);
      }
    }
    return neighbors
  };

  Graph.prototype.depthFirstTraversal = function (vertexToStart) {
    var stack = new Algorithms.DataStructures.Stack();
    var result = [];
    var vertex;
    var neighbors;

    for (var i = 0, len = this._vertexes.length; i < len; i++) {
      this._vertexes[i].discovered = false;
    }

    vertex = this._vertexes[inArray(vertexToStart, this._vertexes)];

    stack.push(vertex);
    vertex.discovered = true;
    result.push(vertex.value);

    while (!stack.isEmpty()) {
      vertex = stack.top();
      neighbors = this.findNeighbors(vertex.value);

      for (var j = 0, length = neighbors.length; j < length; j++) {
        if (isNextVertex(neighbors)) {
          if (this._edges[inArray(vertex.value, this._vertexes)][inArray(neighbors[j].value, this._vertexes)] !== 0 && neighbors[j].discovered) continue;
          if (this._edges[inArray(vertex.value, this._vertexes)][inArray(neighbors[j].value, this._vertexes)] !== 0) {
            vertex = neighbors[j];
            neighbors[j].discovered = true;
            this._vertexes[inArray(neighbors[j].value, this._vertexes)].discovered = true;
            stack.push(vertex);
            result.push(vertex.value);
            break;
          }
        } else {
          stack.pop();
          break;
        }
      }
    }

    return result.join(", ")
  };

  Graph.prototype.breadthFirstTraversal = function (vertexToStart) {
    var queue = new Algorithms.DataStructures.Queue();
    var result = [];
    var vertex;
    var neighbors;

    for (var i = 0, len = this._vertexes.length; i < len; i++) {
      this._vertexes[i].discovered = false;
    }

    vertex = this._vertexes[inArray(vertexToStart, this._vertexes)];

    queue.enqueue(vertex);
    vertex.discovered = true;
    result.push(vertex.value);

    while (!queue.isEmpty()) {
      vertex = queue.dequeue();
      vertex.inProcess = true;
      neighbors = this.findNeighbors(vertex.value);
      for (var j = 0, length = neighbors.length; j < length; j++) {

        if (isNextVertex(neighbors)) {
          if (neighbors[j].discovered) continue;
          queue.enqueue(neighbors[j]);
          neighbors[j].discovered = true;
          result.push(neighbors[j].value);
        } else {
          vertex.inProcess = false;
          break;
        }

      }
    }

  return result.join(", ");
  };


  var Vertex = function (value) {
    this.value = value;
  };

  function inArray(value, array) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i].value === value) {
        return i;
      }
    }
    return -1;
  }

  function isNextVertex(neighbors) {
    for (var i = 0, len = neighbors.length; i < len; i++) {
      if (!neighbors[i].discovered) {
        return true;
      }
    }
    return false;
  }

  Algorithms.DataStructures.GraphMatrix = Graph;

}());

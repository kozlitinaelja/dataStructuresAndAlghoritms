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

var graph;

(function () {
  var Graph = function (vertexes) {
    this._vertexes = vertexes || [];
    this._edges = [];
    for (var i = 0, len = vertexes.length; i < len; i++) {
      this._edges[i] = [];
      for (var j = 0; j < len; j++) {
        this._edges[i][[j]] = 0;
      }
    }
  };

  Graph.prototype.addVertex = function (vertex) {
    this._vertexes[this._vertexes.length] = vertex;

    this._edges[this._vertexes.length -1] = [];

    for (var i = 0, len = this._vertexes.length; i < len; i++) {
      this._edges[this._vertexes.length - 1][i] = 0;
      this._edges[i][this._vertexes.length - 1] = 0;
    }
  };

  Graph.prototype.addEdge = function (startVertex, endVertex, isDirected, weight) {
    this._edges[this._vertexes.indexOf(startVertex)][this._vertexes.indexOf(endVertex)] = weight ? weight : 1;
    if (!isDirected) {
      this._edges[this._vertexes.indexOf(endVertex)][this._vertexes.indexOf(startVertex)] = weight ? weight : 1;
    }
  };

  Graph.prototype.deleteEdge = function (startVertex, endVertex, isDirected) {
    this._edges[this._vertexes.indexOf(startVertex)][this._vertexes.indexOf(endVertex)] = 0;
    if (!isDirected) {
      this._edges[this._vertexes.indexOf(endVertex)][this._vertexes.indexOf(startVertex)] = 0;
    }
  };

  Graph.prototype.deleteVertex = function (vertex) {
    for (var i = 0, len = this._vertexes.length; i < len; i++) {
      this._edges[i].splice(this._edges[i][this._vertexes.indexOf(vertex)], 1);
    }
    this._edges.splice(this._vertexes.indexOf(vertex), 1);
    this._vertexes.splice(this._vertexes.indexOf(vertex), 1);
  };

  Graph.prototype.isAdjacent = function (startVertex, endVertex) {
    return this._edges[this._vertexes.indexOf(startVertex)][this._vertexes.indexOf(endVertex)] !== 0;
  };

  Graph.prototype.findNeighbors = function (vertex) {
    var neighbors = [];
    for (var i = 0, len = this._vertexes.length; i < len; i++) {
      if (this._edges[this._vertexes.indexOf(vertex)][i] > 0 ){
        neighbors.push(this._vertexes[i]);
      }
    }
    return neighbors
  };

  Graph.prototype.depthFirstTraversal = function (vertexToStart) {

  };




  graph = new Graph([1, 2, 3, 4, 5]);
  //graph.addEdge(3, 5, true);
  console.log(graph._edges);

}());

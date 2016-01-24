// D3 implementation http://bl.ocks.org/mbostock/4060366
var p5 = require("p5"),
    d3_voronoi = require("d3-voronoi"),
    d3_array = require("d3-array"),
    Point = require("./geometry/Point"),
    Region = require("./geometry/Region");

var sketch = function(p){
  var width = 960,
      height = 800,
      vertices,
      voronoi,
      polygons;

  p.setup = function(){
    p.createCanvas(width,height);

    // build random points
    vertices = d3_array.range(250).map(function(){
      return [
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height)
      ]
    });

    // add corners to ensure full coverage of the tesselation
    vertices = vertices.concat([[0,0],[0,height],[width,0],[width,height]]);
    polygons = d3_voronoi
      .voronoi()
      // clip to canvas bounds
      .extent([
        [0,0],
        [width, height]
      ])
      (vertices);

    // convert to Regions
    polygons = polygons.map(function(coords){
      var points = coords.map(function(pair){
        return new Point(pair[0], pair[1]);
      });
      return new Region(points);
    });

    // draw vertices
    polygons.forEach(function(currPolygon){
      p.fill(255, 100);
      p.beginShape();
      p.strokeWeight(0);
      currPolygon.getInsetPoints(5).forEach(function(curr, i, points){
        p.vertex(
          curr.x,
          curr.y
        );
      });
      p.endShape(p.CLOSE);
    });

    vertices.forEach(function(pair){
      p.point(pair[0],pair[1]);
    });

  };
  p.draw = function(){

  };
};
module.exports = new p5(sketch, document.getElementById("sketch-container"));

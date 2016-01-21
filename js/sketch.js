// D3 implementation http://bl.ocks.org/mbostock/4060366

(function(){
  var sketch = function(p){
    var
      width = 960,
      height = 500,
      vertices,
      voronoi,
      polygons;

    var randomGaussian = function(dev){
      var r = d3.random.normal(0.5, dev || 0.5/2)();
      if (r > 1){
        r = 1;
      } else if (r < 0){
        r = 0;
      }
      return r;
    };

    p.setup = function(){
      p.createCanvas(width,height);

      vertices = d3.range(100).map(function(){
        return [
          Math.floor(Math.random() * width),
          Math.floor(Math.random() * height)
        ]
      });

      vertices = vertices.concat([[0,0],[0,height],[width,0],[width,height]]);
      voronoi = d3.geom.voronoi().clipExtent([0,0], [width, height]);
      polygons = voronoi(vertices);

      polygons.forEach(function(polygon){
        p.fill(255,100);
        p.stroke(255);
        p.strokeWeight(0.5);
        p.strokeJoin(p.ROUND);
        // p.scale(0.99,0.99);
        p.beginShape();
        polygon.forEach(function(polygonPoint){
          p.vertex(polygonPoint[0],polygonPoint[1]);
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
  new p5(sketch, document.getElementById("sketch-container"));
})()

// D3 implementation http://bl.ocks.org/mbostock/4060366

(function(){

  function Point(x, y) {
      this.x = x;
      this.y = y;
  }

  function Region(points) {
      this.points = points || [];
      this.length = points.length;
  }

  Region.prototype.area = function () {
      var area = 0,
          i,
          j,
          point1,
          point2;

      for (i = 0, j = this.length - 1; i < this.length; j=i,i++) {
          point1 = this.points[i];
          point2 = this.points[j];
          area += point1.x * point2.y;
          area -= point1.y * point2.x;
      }
      area /= 2;

      return area;
  };

  Region.prototype.centroid = function () {
      var x = 0,
          y = 0,
          i,
          j,
          f,
          point1,
          point2;

      for (i = 0, j = this.length - 1; i < this.length; j=i,i++) {
          point1 = this.points[i];
          point2 = this.points[j];
          f = point1.x * point2.y - point2.x * point1.y;
          x += (point1.x + point2.x) * f;
          y += (point1.y + point2.y) * f;
      }

      f = this.area() * 6;

      return new Point(x / f, y / f);
  };

  var sketch = function(p){
    var
      width = 960,
      height = 800,
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

      vertices = d3.range(250).map(function(){
        return [
          Math.floor(Math.random() * width),
          Math.floor(Math.random() * height)
        ]
      });

      vertices = vertices.concat([[0,0],[0,height],[width,0],[width,height]]);
      voronoi = d3.geom.voronoi().clipExtent([0,0], [width, height]);
      polygons = voronoi(vertices);

      var testPolygons = [
        [
          [100, 600],
          [500, 650],
          [400, 400],
          [600, 112],
          [150, 110],
          [250, 280]
        ]
      ];

      testPolygons = testPolygons.map(function(coords){
        var points = coords.map(function(pair){
          return new Point(pair[0], pair[1]);
        });
        return new Region(points);
      });

      console.log(testPolygons);

      p.fill(255, 0, 0, 100);
      p.beginShape();
      p.strokeWeight(0);
      testPolygons.forEach(function(currPolygon){
        var centroid = currPolygon.centroid();
        currPolygon.points.forEach(function(curr, i, points){
          var prev = i > 0 ? points[i-1] : points[points.length-1];
          var next = i < points.length-1 ? points[i+1] : points[0];

          var vPrev = p.createVector(
            (prev.x - curr.x),
            (prev.y - curr.y)
          );
          var vNext = p.createVector(
            (next.x - curr.x),
            (next.y - curr.y)
          );

          var vCenter = p.createVector(
            centroid.x - curr.x,
            centroid.y - curr.y
          );

          var prevArc = p.atan2(vPrev.y,vPrev.x);
          var nextArc = p.atan2(vNext.y,vNext.x);

          var centerArc = p.atan2(vCenter.y,vCenter.x);
          var correctionArc = (nextArc - prevArc)/2 + prevArc;
          if

          console.log("prevArc = " + prevArc);
          console.log("nextArc = " + nextArc);
          console.log("correctionArc = " + correctionArc);

          p.push();
          p.fill(0,255,0,200);
          p.arc(
            curr.x,
            curr.y,
            50,
            50,
            prevArc,
            nextArc
          );
          p.pop();

          p.vertex(
            curr.x,
            curr.y
          );

          p.ellipse(
            curr.x + p.cos(correctionArc)*50,
            curr.y + p.sin(correctionArc)*50,
            5,
            5
          );

        });

      });
      p.endShape(p.CLOSE);

      // console.log(polygons);
      //
      //
      //
      // polygons.forEach(function(polygon){
      //   p.fill(255,100);
      //   // p.scale(0.99,0.99);
      //   p.beginShape();
      //   p.strokeWeight(0);
      //   polygon.forEach(function(polygonPoint, i, points){
      //     var prev = i > 0 ? points[i-1] : points[points.length-1];
      //     var next = i < points.length-1 ? points[i+1] : points[0];
      //
      //     var vPrev = p.createVector(prev[0]-polygonPoint[0],prev[1]-polygonPoint[1]);
      //     var vNext = p.createVector(next[0]-polygonPoint[0],next[1]-polygonPoint[1]);
      //
      //     var prevArc = p.atan2(vPrev.y,vPrev.x);
      //
      //     var correctionArc = p.atan2(vNext.y,vNext.x);
      //     // console.log(correctionArc)
      //     // console.log(polygonPoint)
      //
      //     p.vertex(
      //       polygonPoint[0] + p.cos(correctionArc)*2,
      //       polygonPoint[1] + p.sin(correctionArc)*2
      //     );
      //   });
      //   p.endShape(p.CLOSE);
      // });

      // vertices.forEach(function(pair){
      //   p.point(pair[0],pair[1]);
      // });

    };
    p.draw = function(){

    };
  };
  new p5(sketch, document.getElementById("sketch-container"));
})()

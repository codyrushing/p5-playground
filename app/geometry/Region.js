var Point = require("./Point"),
    inside = require("point-in-polygon");

var Region = function(points) {
    this.points = points || [];
    this.length = points.length;
};

Region.prototype = {
  area: function () {
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
  },
  asPairs: function(){
    return this.points.map(function(point){
      return point.asPair();
    });
  },
  centroid: function(){
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
  },
  inside: function(point){
    console.log(this.points);
    return inside([point.x, point.y], this.asPairs());
  },
  insetPoints: function(inset){
    var self = this;
    return this.points.map(function(point, i, points){
      // get next and prev points
      var prev = i > 0 ? points[i-1] : points[points.length-1];
      var next = i < points.length-1 ? points[i+1] : points[0];

      // use them to construct vectors
      var prevArc = Math.atan2(
        prev.y - curr.y,
        prev.x - curr.x
      );
      var nextArc = Math.atan2(
        next.y - curr.y,
        next.x - curr.x
      );
      // get difference between arcs, and subtract by 2, and that's our bisected arc
      var correctionArc = (nextArc - prevArc)/2 + prevArc;

      // create test point to determine to inset inwards or outwards (depends on Region shape)
      var testPoint = new Point(
        curr.x + Math.cos(correctionArc),
        curr.y + Math.sin(correctionArc)
      );

      inset = inset || 1;

      return self.inside(testPoint)){
        ?
          new Point(
            curr.x + Math.cos(correctionArc) * inset,
            curr.y + Math.sin(correctionArc) * inset
          )
        : new Point(
          curr.x + Math.cos(correctionArc) * inset,
          curr.y + Math.sin(correctionArc) * inset
        );

    });

  }
};

module.exports = Region;

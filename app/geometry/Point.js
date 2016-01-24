function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype: function(){
  asPair: function(){
    return [this.x, this.y];
  }
}

module.exports = Point;

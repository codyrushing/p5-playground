(function(){
  var sketch = function(p){
    p.setup = function(){
      p.createCanvas(600,600);
      p.background(255,0,0);
    };
    p.draw = function(){
      p.ellipse(200,200,100,100);
    };
  };
  new p5(sketch, document.getElementById("sketch-container"));
})()

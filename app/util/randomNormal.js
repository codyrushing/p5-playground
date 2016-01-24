var randomNormal = function(dev){
  var r = d3.random.normal(0.5, dev || 0.5/3)();
  if (r > 1){
    r = 1;
  } else if (r < 0){
    r = 0;
  }
  return r;
};

module.exports = randomNormal;

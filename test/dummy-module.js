const ONE = 1;

var getOne = function() {
  return ONE;
};

module.exports.dev = {};
module.exports.dev.ONE = ONE;

module.exports.getOne = getOne;

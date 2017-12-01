const ONE = 1;

var getOne = function() {
  return ONE;
};

// underscore indicates requiree private member
module.exports._ONE = ONE;

module.exports.getOne = getOne;

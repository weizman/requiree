// must be initialized with the desired require function
// from the module that uses requiree, because the
// require function that needs to be used must
// come from the module's scope.
var requireFunc; // will be initialized with the desired require function

/**
 * var onAllProps - execute object callback for every property in given object recursivley
 *
 * @param  {object} obj   object to iterate
 * @param  {function} cb  callback to execute for each property
 * @returns {undefined}
 */
var onAllProps = function(obj, cb) {
  for (var prop in obj) {
    if (Array.isArray(obj[prop])) {
      return;
    }

    if ('object' === typeof obj[prop]) {
      onAllProps(obj[prop], cb);
    }

    cb(obj, prop);
  }
};

/**
 * var base - main logic of how to require package in dev/prod mode
 *
 * @param  {string} path           path of module to require
 * @param  {boolean} isDev         whether should dev properties be required as well or not
 * @returns {module}               module required
 */
var base = function(path, isDev) {

  var mod = requireFunc(path);

  onAllProps(mod, function(mod, prop) {

    // prop name starts with '_'? that is the requiree default prefix
    if ('_' === prop[0]) {

      // is dev? save it noramlly to the module.exports object
      if (isDev) {
        mod[prop.replace('_', '')] = mod[prop]
      }

      // get rid of the old one (the prop with the '_' at the beginning)
      delete mod[prop];
    }
  });

  return mod;
};

/**
 * var init - initialize the desired require function to use within requiree
 *
 * @param  {function} reqFunc desired require function
 * @returns {function}        the prod and dev functions used
 */
var init = function(reqFunc) {
  // throw error when @reqFunc is not of type function
  if ('function' !== typeof reqFunc) {
    throw 'param @reqFunc must be of type function when initializing requiree'
  }

  if (!requireFunc) {
    requireFunc = reqFunc;
  }

  // this is the true export after requiree has been initialized
  prod.dev = dev;
  return prod;
};

/**
 * var dev - require package in dev mode
 *
 * @param  {string} path           path of module to require
 * @returns {module}               module required
 */
var dev = function(path) {
  return base(path, true);
};

/**
 * var prod - require package in prod mode (normally)
 *
 * @param  {string} path           path of module to require
 * @returns {module}               module required
 */
var prod = function(path) {
  return base(path, false);
};


module.exports = init;

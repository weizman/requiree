/**
 * var base - main logic of how to require package in dev/prod mode
 *
 * @param  {string} path           path of module to require
 * @param  {boolean} [isDev]       whether should dev properties be required as well or not
 * @param  {string} [requireFunc]  optionally use customed require method
 * @returns {module}               module required
 */
var base = function(path, isDev, requireFunc) {
  if (requireFunc) {
    if ('string' !== typeof requireFunc) {
      throw 'parameter @requireFunc must be of type string (if used)';
    }

    // is it require? not need to require it then
    if ('require' === requireFunc) {
      requireFunc = require;

    // anything else? require the customed require method
    } else {
      requireFunc = require(requireFunc);
    }
  }

  var mod = (requireFunc || require)(path);

  if (mod.dev) {

    // not dev? delete dev properties
    if (!isDev) {
      delete mod.dev;

    // dev? move all properties to the main module.exports object
    } else {
      for (var prop in mod.dev) {
        mod[prop] = mod.dev[prop];
      }
    }
  }

  return mod;
};

/**
 * var dev - require package in dev mode
 *
 * @param  {string} path           path of module to require
 * @param  {string} [requireFunc]  optionally use customed require method
 * @returns {module}               module required
 */
var dev = function(path, requireFunc) {
  return base(path, true, requireFunc);
};

/**
 * var prod - require package in prod mode (normally)
 *
 * @param  {string} path           path of module to require
 * @param  {string} [requireFunc]  optionally use customed require method
 * @returns {module}               module required
 */
var prod = function(path, requireFunc) {
  return base(path, false, requireFunc);
};


prod.dev = dev;
module.exports = prod;

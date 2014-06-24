/**
 * Namespace object.
 * @type {Object}
 */
var NDP = {};

/**
 * Semantic version string.
 * @type {String}
 * @see http://semver.org/
 */
Object.defineProperty(NDP, 'VERSION', {
  value: '0.1.0'
});

/**
 * Default number of dimensions to use when creating new component instances.
 * @type {Number}
 */
NDP.__DIMENSIONS = 2;
Object.defineProperty(NDP, 'DIMENSIONS', {
  set: function(value) {
    NDP.__DIMENSIONS = Math.clamp(parseInt(value, 10), 1, 3);
  },
  get: function() {
    return NDP.__DIMENSIONS;
  }
});

/**
 * Non-zeroing threshold value.
 * @type {Number}
 */
NDP.__THRESHOLD = 1e-6;
Object.defineProperty(NDP, 'THRESHOLD', {
  set: function(value) {
    NDP.__THRESHOLD = Math.clamp(parseFloat(value, 10), 1e-6, 1e-1);
  },
  get: function() {
    return NDP.__THRESHOLD;
  }
});

/**
 * Component axis identifiers.
 * @type {Array}
 */
Object.defineProperty(NDP, 'COMPONENTS', {
  value: ['x', 'y', 'z']
});

/**
 * Determines whether or not a value is of an expected type.
 * @param {Object} value Value to check.
 * @param {Object} expected Expected value to check against.
 * @return {Boolean} Whether or not the value is of the expected type.
 */
NDP.isType = function(value, expected) {
  if (expected === String) {
    return typeof value === 'string' || value instanceof String;
  }
  if (expected === Number) {
    return typeof value === 'number' || value instanceof Number;
  }
  if (expected === Function) {
    return typeof value === 'function' || value instanceof Function;
  }
  if (expected === Object) {
    return typeof value === 'object';
  }
  if (expected === Boolean) {
    return typeof value === 'boolean';
  }
  return value instanceof expected;
};

/**
 * Determines whether or not the supplied value is a Boolean.
 * @param {Object} value Value to check.
 * @return {Boolean} Whether or not the supplied value is a Boolean.
 */
NDP.isBoolean = function(value) {
  return NDP.isType(value, Boolean);
};

/**
 * Determines whether or not the supplied value is a Number.
 * @param {Object} value Value to check.
 * @return {Boolean} Whether or not the supplied value is a Number.
 */
NDP.isNumber = function(value) {
  return NDP.isType(value, Number);
};

/**
 * Determines whether or not the supplied value is an NDP.Array.
 * @param {Object} value Value to check.
 * @return {Boolean} Whether or not the supplied value is an NDP.Array.
 */
NDP.isArray = function(value) {
  return NDP.isType(value, NDP.Array);
};

/**
 * Returns the number of milliseconds since 1st January 1970 00:00:00 UTC.
 * @return {Number}
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
 */
NDP.getTime = function() {
  return new Date().getTime();
};

/**
 * Returns the Vector Object for the number of specified dimensions.
 * @param {Number} dimensions
 * @return {VectorClass}
 */
NDP.getVector = function(dimensions) {
  return NDP['Vector' + dimensions];
};

/**
 * Returns an object containing the unique axis combinations for the specified number of dimensions.
 * @param {Number} dimensions
 * @return {Object}
 */
NDP.getAxes = function(dimensions) {
  var x, y, key, axes = {length:0, axes:[]};
  if (!!dimensions) {
    for (x = 0; x < dimensions; x++) {
      for (y = 0; y < dimensions; y++) {
        if (x !== y) {
          key = NDP.COMPONENTS[x] + NDP.COMPONENTS[y];
          sum = (x + 1) * (y + 1);
          if (!axes[sum]) {
            axes.axes.push(axes[sum] = [x, y]);
            axes.length++;
          }
        }
      }
    }
  }
  return axes;
};

/**
 * Adds an item to an array only if the item does not exist within the array.
 * @param {Object} item The item to add to the array.
 * @param {Array} array The array to add the item to.
 * @param {Object} opt_type Optional type Object to filter the addition by.
 * @return {Boolean} Whether or not the item was added to the array.
 */
NDP.addItemToArray = function(item, array, opt_type) {
  var index = array.indexOf(item),
      add = index === -1;
  if (opt_type !== undefined && add) add = NDP.isType(item, opt_type);
  if (add) array.push(item);
  return add;
};

/**
 * Removes an item from an array.
 * @param {Object} item The item to be removed from the array.
 * @param {Array} array The array to remove the item from.
 * @return {Boolean} Whether or not the item was removed from the array.
 */
NDP.removeItemFromArray = function(item, array) {
  var index = array.indexOf(item),
      remove = index !== -1;
  if (remove) array.splice(index, 1);
  return remove;
};

/**
 * Copies values from a source Array to a target Array.
 * @param {Array} source Source Array to copy values from.
 * @param {Array} target Target Array to copy values to.
 * @param {Boolean} opt_limit Whether or not to limit the copy to the length of the target Array. Defaults to true.
 */
NDP.copyValuesToArray = function(source, target, opt_limit) {
  opt_limit = this.isBoolean(opt_limit) ? opt_limit : true;
  for (var i = 0, l = source.length; i < l; i++) {
    if (opt_limit) {
      if (i < target.length) {
        target[i] = source[i];
      } else {
        break;
      }
    } else {
      target[i] = source[i];
    }
  }
};

/**
 * Array class constructor. Favours Float32Array if available.
 * @constructor
 * @type {ArrayClass}
 */
NDP.Array = !!window.Float32Array ? Float32Array : Array;

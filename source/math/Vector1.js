/**
 * Vector1 object.
 * @type {Object}
 */
NDP.Vector1 = {};

/**
 * Creates a new Vector1 Array.
 * @param {Number} opt_x Optional value to set the x component to. Defaults to 0.
 * @return {Array} Vector1 Array.
 */
NDP.Vector1.create = function(opt_x) {
  var vector = new NDP.Array(1);
  vector[0] = NDP.isNumber(opt_x) ? opt_x : 0;
  return vector;
};

/**
 * Identity: target[n] = 0.
 * @param {Array} target Target Vector1 Array to set the component values of.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.identity = function(target) {
  target[0] = 0;
  return target;
};

/**
 * Sets the values of a Vector1 Array.
 * @param {Array} target Target Vector1 Array.
 * @param {Number} x Value to set the x component to.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.set = function(target, x) {
  target[0] = x;
  return target;
};

/**
 * Copy: target[n] = a[n].
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.copy = function(target, a) {
  target[0] = a[0];
  return target;
};

/**
 * Add: target[n] = a[n] + b[n].
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array A.
 * @param {Array} b Source Vector1 Array B.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.add = function(target, a, b) {
  target[0] = a[0] + b[0];
  return target;
};

/**
 * Subtract: target[n] = a[n] - b[n].
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array A.
 * @param {Array} b Source Vector1 Array B.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.subtract = function(target, a, b) {
  target[0] = a[0] - b[0];
  return target;
};

/**
 * Scale: target[n] = a[n] * scalar.
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array.
 * @param {Number} scalar Scalar value to multiply the source Vector1 Array components by.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.scale = function(target, a, scalar) {
  target[0] = a[0] * scalar;
  return target;
};

/**
 * Calculates the squared length of a given Vector1 Array.
 * @param {Array} vector Target Vector1 Array.
 * @return {Number} The squared length of the Vector1 Array.
 */
NDP.Vector1.squaredLength = function(vector) {
  var x = vector[0];
  return x*x;
};

/**
 * Calculates the length of a given Vector1 Array.
 * @param {Array} vector Target Vector1 Array.
 * @return {Number} The length of the Vector1 Array.
 */
NDP.Vector1.length = function(vector) {
  return Math.abs(vector[0]);
};

/**
 * Normalizes a Vector1 Array to a given length.
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array.
 * @param {Number} opt_length Optional length value to normalize the Vector1 Array to. Defaults to 1.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.normalize = function(target, a, opt_length) {
  opt_length = opt_length || 1;
  var l = NDP.Vector1.length(a);
  if (l > 0) {
    l = opt_length / l;
    NDP.Vector1.scale(target, a, l);
  } else {
    NDP.Vector1.identity(target);
  }
  return target;
};

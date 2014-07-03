/**
 * Vector2 object.
 * @type {Object}
 */
NDP.Vector2 = {};

/**
 * Creates a new Vector2 Array.
 * @param {Number} opt_x Optional value to set the x component to. Defaults to 0.
 * @param {Number} opt_y Optional value to set the y component to. Defaults to 0.
 * @return {Array} Vector2 Array.
 */
NDP.Vector2.create = function(opt_x, opt_y) {
  var vector = new NDP.Array(2);
  vector[0] = NDP.isNumber(opt_x) ? opt_x : 0;
  vector[1] = NDP.isNumber(opt_y) ? opt_y : 0;
  return vector;
};

/**
 * Identity: target[n] = 0.
 * @param {Array} target Target Vector2 Array to set the component values of.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.identity = function(target) {
  target[0] = 0;
  target[1] = 0;
  return target;
};

/**
 * Sets the values of a Vector2 Array.
 * @param {Array} target Target Vector2 Array.
 * @param {Number} x Value to set the x component to.
 * @param {Number} y Value to set the y component to.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.set = function(target, x, y) {
  target[0] = x;
  target[1] = y;
  return target;
};

/**
 * Copy: target[n] = a[n].
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.copy = function(target, a) {
  target[0] = a[0];
  target[1] = a[1];
  return target;
};

/**
 * Add: target[n] = a[n] + b[n].
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array A.
 * @param {Array} b Source Vector2 Array B.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.add = function(target, a, b) {
  target[0] = a[0] + b[0];
  target[1] = a[1] + b[1];
  return target;
};

/**
 * Subtract: target[n] = a[n] - b[n].
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array A.
 * @param {Array} b Source Vector2 Array B.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.subtract = function(target, a, b) {
  target[0] = a[0] - b[0];
  target[1] = a[1] - b[1];
  return target;
};

/**
 * Scale: target[n] = a[n] * scalar.
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array.
 * @param {Number} scalar Scalar value to multiply the source Vector2 Array components by.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.scale = function(target, a, scalar) {
  target[0] = a[0] * scalar;
  target[1] = a[1] * scalar;
  return target;
};

/**
 * Calculates the squared length of a given Vector2 Array.
 * @param {Array} vector Target Vector2 Array.
 * @return {Number} The squared length of the Vector2 Array.
 */
NDP.Vector2.squaredLength = function(vector) {
  var x = vector[0];
  var y = vector[1];
  return x*x + y*y;
};

/**
 * Calculates the length of a given Vector2 Array.
 * @param {Array} vector Target Vector2 Array.
 * @return {Number} The length of the Vector2 Array.
 */
NDP.Vector2.length = function(vector) {
  return Math.sqrt(NDP.Vector2.squaredLength(vector));
};

/**
 * Normalizes a Vector2 Array to a given length.
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array.
 * @param {Number} opt_length Optional length value to normalize the Vector2 Array to. Defaults to 1.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.normalize = function(target, a, opt_length) {
  opt_length = opt_length || 1;
  var l = NDP.Vector2.squaredLength(a);
  if (l > 0) {
    l = opt_length / Math.sqrt(l);
    NDP.Vector2.scale(target, a, l);
  } else {
    NDP.Vector2.identity(target);
  }
  return target;
};

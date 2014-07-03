/**
 * Vector3 object.
 * @type {Object}
 */
NDP.Vector3 = {};

/**
 * Creates a new Vector3 Array.
 * @param {Number} opt_x Optional value to set the x component to. Defaults to 0.
 * @param {Number} opt_y Optional value to set the y component to. Defaults to 0.
 * @param {Number} opt_z Optional value to set the z component to. Defaults to 0.
 * @return {Array} Vector3 Array.
 */
NDP.Vector3.create = function(opt_x, opt_y, opt_z) {
  var vector = new NDP.Array(3);
  vector[0] = NDP.isNumber(opt_x) ? opt_x : 0;
  vector[1] = NDP.isNumber(opt_y) ? opt_y : 0;
  vector[2] = NDP.isNumber(opt_z) ? opt_z : 0;
  return vector;
};

/**
 * Identity: target[n] = 0.
 * @param {Array} target Target Vector3 Array to set the component values of.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.identity = function(target) {
  target[0] = 0;
  target[1] = 0;
  target[2] = 0;
  return target;
};

/**
 * Sets the values of a Vector3 Array.
 * @param {Array} target Target Vector3 Array.
 * @param {Number} x Value to set the x component to.
 * @param {Number} y Value to set the y component to.
 * @param {Number} z Value to set the z component to.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.set = function(target, x, y, z) {
  target[0] = x;
  target[1] = y;
  target[2] = z;
  return target;
};

/**
 * Copy: target[n] = a[n].
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.copy = function(target, a) {
  target[0] = a[0];
  target[1] = a[1];
  target[2] = a[2];
  return target;
};

/**
 * Add: target[n] = a[n] + b[n].
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array A.
 * @param {Array} b Source Vector3 Array B.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.add = function(target, a, b) {
  target[0] = a[0] + b[0];
  target[1] = a[1] + b[1];
  target[2] = a[2] + b[2];
  return target;
};

/**
 * Subtract: target[n] = a[n] - b[n].
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array A.
 * @param {Array} b Source Vector3 Array B.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.subtract = function(target, a, b) {
  target[0] = a[0] - b[0];
  target[1] = a[1] - b[1];
  target[2] = a[2] - b[2];
  return target;
};

/**
 * Scale: target[n] = a[n] * scalar.
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array.
 * @param {Number} scalar Scalar value to multiply the source Vector3 Array components by.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.scale = function(target, a, scalar) {
  target[0] = a[0] * scalar;
  target[1] = a[1] * scalar;
  target[2] = a[2] * scalar;
  return target;
};

/**
 * Calculates the squared length of a given Vector3 Array.
 * @param {Array} vector Target Vector3 Array.
 * @return {Number} The squared length of the Vector3 Array.
 */
NDP.Vector3.squaredLength = function(vector) {
  var x = vector[0],
      y = vector[1],
      z = vector[2];
  return x*x + y*y + z*z;
};

/**
 * Calculates the length of a given Vector3 Array.
 * @param {Array} vector Target Vector3 Array.
 * @return {Number} The length of the Vector3 Array.
 */
NDP.Vector3.length = function(vector) {
  return Math.sqrt(NDP.Vector3.squaredLength(vector));
};

/**
 * Normalizes a Vector3 Array to a given length.
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array.
 * @param {Number} opt_length Optional length value to normalize the Vector3 Array to. Defaults to 1.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.normalize = function(target, a, opt_length) {
  opt_length = opt_length || 1;
  var l = NDP.Vector3.squaredLength(a);
  if (l > 0) {
    l = opt_length / Math.sqrt(l);
    NDP.Vector3.scale(target, a, l);
  } else {
    NDP.Vector3.identity(target);
  }
  return target;
};

/**
 * Math.PI * 2.
 * @type {Number}
 */
Object.defineProperty(Math, 'PI2', {
  value: Math.PI * 2
});

/**
 * Math.PI / 2.
 * @type {Number}
 */
Object.defineProperty(Math, 'PIH', {
  value: Math.PI / 2
});

/**
 * Normalizes a value to a given scale.
 * @param {Number} value Value to plot on the given scale.
 * @param {Number} opt_min Optional lower limit of the scale. Defaults to 0.
 * @param {Number} opt_max Optional upper limit of the scale. Defaults to 1.
 * @return {Number} Normalized value.
 */
Math.normalize = function(value, opt_min, opt_max) {
  opt_min = NDP.isNumber(opt_min) ? opt_min : 0;
  opt_max = NDP.isNumber(opt_max) ? opt_max : 1;
  return (value - opt_min) / (opt_max - opt_min);
};

/**
 * Calculates a value on a given scale.
 * @param {Number} value Location on the scale. Typically a ratio (0-1).
 * @param {Number} min Lower limit of the scale.
 * @param {Number} max Upper limit of the scale.
 * @return {Number} Plotted value on the scale.
 */
Math.interpolate = function(value, min, max) {
  return min + (max - min) * value;
};

/**
 * Maps a value from one scale to another scale.
 * @param {Number} value Value to map.
 * @param {Number} min1 Lower limit of the source scale.
 * @param {Number} max1 Upper limit of the source scale.
 * @param {Number} min2 Lower limit of the target scale.
 * @param {Number} max2 Upper limit of the target scale.
 * @return {Number} Mapped value.
 */
Math.map = function(value, min1, max1, min2, max2) {
  return Math.interpolate(Math.normalize(value, min1, max1), min2, max2);
};

/**
 * Clamps a value within a specified range.
 * @param {Number} value Value to clamp.
 * @param {Number} min Lower limit of the range.
 * @param {Number} max Upper limit of the range.
 * @return {Number} Clamped value.
 */
Math.clamp = function(value, min, max) {
  value = Math.max(value, min);
  value = Math.min(value, max);
  return value;
};

/**
 * Determines the sign of a value as either +1 or -1.
 * @param {Number} value Value to determine the sign of.
 * @return {Number} Sign of the given value.
 */
Math.sign = function(value) {
  return value >= 0 ? 1 : -1;
};

/**
 * Returns a random number within a specified range.
 * @param {Number} min Lower limit of the range.
 * @param {Number} max Upper limit of the range.
 * @param {Boolean} opt_round Optional flag specifying whether or not to round the generated value. Defaults to false.
 * @return {Number} Generated random value.
 */
Math.randomInRange = function(min, max, opt_round) {
  opt_round = NDP.isBoolean(opt_round) ? opt_round : false;
  value = Math.map(Math.random(), 0, 1, min, max);
  if (opt_round) value = Math.round(value);
  return value;
};

/**
 * Returns a random sign (+1 or -1).
 * @param {Number} opt_probability Optional probability value for biasing the output. Defalts to 0.5.
 * @return {Number} Sign value (+1 or -1).
 */
Math.randomSign = function(opt_probability) {
  opt_probability = NDP.isNumber(opt_probability) ? opt_probability : 0.5;
  return Math.random() < opt_probability ? 1 : -1;
};

/**
 * Returns a random boolean value.
 * @param {Number} opt_probability Optional probability value for biasing the output. Defalts to 0.5.
 * @return {Boolean} true or false.
 */
Math.randomBoolean = function(opt_probability) {
  opt_probability = NDP.isNumber(opt_probability) ? opt_probability : 0.5;
  return Math.random() < opt_probability;
};

/**
 * Returns a random item within an array.
 * @param {Array} array Array to extract the random item from.
 * @return {Object} Random item from the array.
 */
Math.randomItem = function(array) {
  return array[Math.floor(Math.random() * (array.length - 1e-6))];
};

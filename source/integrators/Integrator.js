/**
 * Integrator constructor.
 * Integrates particle motion.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the integrator should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Integrator = function(opt_dimensions) {

  /**
   * Dimensional size.
   * @type {Number}
   */
  Object.defineProperty(this, 'dimensions', {
    value: NDP.isNumber(opt_dimensions) ? parseInt(opt_dimensions, 10) : NDP.DIMENSIONS
  });

  // Cache dimensions privately for performance.
  this.__dimensions = this.dimensions;

  // Set vector object.
  this.__vector = NDP.getVector(this.__dimensions);

  // Validate vector object.
  if (!this.__vector) {
    throw 'Integrator: No Vector Object available for ['+this.__dimensions+'] dimensions';
  }

  // Create worker vectors.
  this.__acc = this.__vector.create();
  this.__vel = this.__vector.create();
  this.__pos = this.__vector.create();
};

/**
 * Integrates motion for a collection of particles.
 * @param {Array.<Particle>} particles Particle collection to integrate motion on.
 * @param {Number} delta Time delta in milliseconds since last integration.
 * @param {Number} lubricity Lubricity within the system.
 */
NDP.Integrator.prototype.integrate = function(particles, delta, lubricity) {
};

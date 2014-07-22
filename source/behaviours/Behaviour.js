/**
 * Behaviour constructor.
 * Applies forces to a particle.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the behaviour should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Behaviour = function(opt_dimensions) {

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
    throw 'Behaviour: No Vector Object available for ['+this.__dimensions+'] dimensions';
  }

  // Active flag.
  this.active = true;
};

/**
 * Unique identifier.
 * @type {String}
 */
NDP.Behaviour.id = 'Behaviour';

/**
 * Behaviour constructor.
 * @param {Particle} particle Particle instance to apply the behaviour to.
 * @param {Number} delta Time delta in milliseconds since last integration.
 * @param {Number} index Index of the particle within the system.
 */
NDP.Behaviour.prototype.apply = function(particle, delta, index) {
};

/**
 * Particle constructor.
 * Creates a particle that can have behaviours that are applied on each time step within the system.
 * @constructor
 * @param {Number} mass Mass of the particle.
 * @param {Number} opt_radius Optional radius value for the particle. Defaults to the same value as the mass.
 * @param {Boolean} opt_fixed Optional flag specifying whether or not the particle is fixed within the system. Behaviours are not applied to fixed particles. Defaults to false.
 * @param {Number} opt_dimensions Optional number of component dimension that the particle should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Particle = function(mass, opt_radius, opt_fixed, opt_dimensions) {

  // Validate mass argument.
  if (!NDP.isNumber(mass)) {
    throw 'Particle: mass must be a Number ['+mass+']';
  }

  // Set particle properties.
  this.mass = mass;
  this.radius = NDP.isNumber(opt_radius) ? opt_radius : mass;
  this.fixed = NDP.isBoolean(opt_fixed) ? opt_fixed : false;

  // Set dimensions property.
  Object.defineProperty(this, 'dimensions', {
    value: NDP.isNumber(opt_dimensions) ? parseInt(opt_dimensions, 10) : NDP.DIMENSIONS
  });

  // Set unique identifier.
  Object.defineProperty(this, 'id', {
    value: this.constructor.__uid++
  });

  // Set vector object.
  this.__vector = NDP.getVector(this.dimensions);

  // Validate vector object.
  if (!this.__vector) {
    throw 'Particle: No Vector Object available for ['+this.dimensions+'] dimensions';
  }
};

/**
 * Particle unique identifier.
 * @type {Number}
 */
NDP.Particle.__uid = 0;

/**
 * Adds a behaviour to the particle.
 * @param {Behaviour} behaviour Behaviour to add to the particle.
 * @return {Particle} Particle instance for chaining.
 */
NDP.Particle.prototype.addBehaviour = function(behaviour) {
  return this;
};

/**
 * Removes a behaviour from the particle.
 * @param {Behaviour} behaviour Behaviour to remove from the particle.
 * @return {Particle} Particle instance for chaining.
 */
NDP.Particle.prototype.removeBehaviour = function(behaviour) {
  return this;
};

/**
 * Applies registered behaviours to the particle and updates its vectors.
 * @param {Number} delta Time delta since last integration.
 * @param {Number} index Index of the particle within the system.
 * @return {Particle} Particle instance for chaining.
 */
NDP.Particle.prototype.update = function(delta, index) {
  return this;
};

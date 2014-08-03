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

  // Create caches.
  this.__delta = 0;
  this.__oldDelta = 0;
  this.__deltaSquared = 0;
  this.__halfDeltaSquared = 0;
};

/**
 * Integrates motion for a collection of particles.
 * @param {Array.<Particle>} particles Particle collection to integrate motion on.
 * @param {Number} delta Time delta in milliseconds since last integration.
 * @param {Number} lubricity Lubricity within the system.
 */
NDP.Integrator.prototype.integrate = function(particles, delta, lubricity) {
  var i, l, particle;

  // Set delta values.
  this.__deltaSquared = delta * delta;
  this.__halfDeltaSquared = this.__deltaSquared * 0.5;
  this.__oldDelta = this.__delta;
  this.__delta = delta;

  // Integrate motion for each particle in the particles collection.
  for (i = 0, l = particles.length; i < l; i++) {
    particle = particles[i];
    if (!particle.__fixed) {
      this.__integrate(particle, delta, lubricity);
    }
  }
};

/**
 * Integrates motion for a single particle.
 * @param {Particle} particle Particle to integrate motion on.
 * @param {Number} delta Time delta in milliseconds since last integration.
 * @param {Number} lubricity Lubricity within the system.
 */
NDP.Integrator.prototype.__integrate = function(particle, delta, lubricity) {

  // NOTE: Integration is not implementated in this abstract Integrator.
  // Use NDP.Integrator.create(namespace, integration) to create an operational Integrator.
  // The following line is for testing purposes only.
  this.__vector.copy(particle.__pos, particle.__pos);
};

/**
 * Creates an Integrator constructor and links the integration function to its prototype.
 * @param {String} namespace Namespace of the integrator.
 * @param {Function} integrate Particle motion integration function.
 * @return {Integrator} Integrator constructor.
 */
NDP.Integrator.create = function(namespace, integration) {
  if (NDP[namespace]) {
    throw 'Integrator: Object already defined for NDP['+namespace+']';
  }
  var Integrator = NDP[namespace] = function() {
    NDP.Integrator.call(this);
  };
  Integrator.prototype = Object.create(NDP.Integrator.prototype);
  Integrator.prototype.constructor = Integrator;
  Integrator.prototype.__integrate = integration;
  return Integrator;
};

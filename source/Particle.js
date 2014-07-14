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
};

/**
 * Applies registered behaviours to the particle and updates its vectors.
 * @param {Number} delta Time delta since last integration.
 * @param {Number} index Index of the particle within the system.
 * @return {NDP.Particle} Particle instance for chaining.
 */
NDP.Particle.prototype.update = function(delta, index) {
};

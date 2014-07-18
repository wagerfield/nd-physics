/**
 * Spring constructor.
 * Creates a constraint between 2 particles.
 * @constructor
 * @param {Particle} p1 Particle to constrain to p2.
 * @param {Particle} p2 Particle to constrain to p1.
 * @param {Number} length Rest length of the spring.
 * @param {Number} stiffness Stiffness of the spring where 0 is elastic and 1 is rigid.
 */
NDP.Spring = function(p1, p2, length, stiffness) {

  // Validate p1 argument.
  if (!NDP.isType(p1, NDP.Particle)) {
    throw 'Spring: p1 must be a Particle instance ['+p1+']';
  }

  // Validate p2 argument.
  if (!NDP.isType(p2, NDP.Particle)) {
    throw 'Spring: p2 must be a Particle instance ['+p2+']';
  }

  // Validate particle compatibility.
  if (p1.dimensions !== p2.dimensions) {
    throw 'Spring: Particles must be of the same dimensions. P1['+p1.dimensions+'] P2['+p2.dimensions+']';
  }

  /**
   * Unique identifier.
   * @type {Number}
   */
  Object.defineProperty(this, 'id', {
    value: this.constructor.__uid++
  });
};

/**
 * Spring unique identifier counter.
 * @type {Number}
 */
NDP.Spring.__uid = 0;

/**
 * Updates the positions of the two particles attached to the spring.
 * @param {Number} delta Time delta since last integration.
 * @param {Number} index Index of the spring within the system.
 * @return {Spring} Spring instance for chaining.
 */
NDP.Spring.prototype.update = function(delta, index) {
};

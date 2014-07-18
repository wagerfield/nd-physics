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
};

/**
 * Updates the positions of the two particles attached to the spring.
 * @param {Number} delta Time delta since last integration.
 * @param {Number} index Index of the spring within the system.
 * @return {Spring} Spring instance for chaining.
 */
NDP.Spring.prototype.update = function(delta, index) {
};

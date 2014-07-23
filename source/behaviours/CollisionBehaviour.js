/**
 * CollisionBehaviour constructor.
 * Manages collisions between a collection of particles.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the behaviour should have. Defaults to NDP.DIMENSIONS.
 */
(function(Behaviour) {

  Behaviour.prototype.addParticle = function(particle) {
  };

  Behaviour.prototype.removeParticle = function(particle) {
  };

})(NDP.Behaviour.create('CollisionBehaviour'));

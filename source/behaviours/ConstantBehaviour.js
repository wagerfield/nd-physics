/**
 * ConstantBehaviour constructor.
 * Applies a constant force to the acceleration of a particle.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the behaviour should have. Defaults to NDP.DIMENSIONS.
 */
(function(Behaviour) {

  // this.__force = this.__vector.create();

  Object.defineProperty(Behaviour.prototype, 'force', {
    set: function(value) {
      if (NDP.isArray(value)) {
        this.__force = value;
      }
    },
    get: function() {
      return this.__force;
    }
  });

  Behaviour.prototype.setForce = function(force) {
    NDP.copyValuesToArray(force, this.__force);
  };

})(NDP.Behaviour.create('ConstantBehaviour',
  function(particle, delta, index) {
    this.__vector.add(particle.__acc, particle.__acc, this.__force);
  }
));

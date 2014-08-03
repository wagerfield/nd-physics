(function(Behaviour) {

})(NDP.Behaviour.create('ConstantBehaviour',
  function() {
  },
  function(particle, delta, index) {
  }
));



// /**
//  * Behaviour constructor.
//  * Applies a constant force to a particle.
//  * @constructor
//  * @param {Array} force Array of force values to apply to each respective component.
//  * @param {Number} opt_dimensions Optional number of component dimension that the behaviour should have. Defaults to NDP.DIMENSIONS.
//  */
// NDP.ConstantBehaviour = function(force, opt_dimensions) {
//   NDP.Behaviour.call(this);

//   // Create force vector.
//   this.__force = this.__vector.create();

//   // Set force.
//   this.setForce.apply(this, force);
// };

// NDP.ConstantBehaviour.prototype = Object.create(NDP.Behaviour.prototype);
// NDP.ConstantBehaviour.prototype.constructor = NDP.ConstantBehaviour;

// /**
//  * Unique identifier.
//  * @type {String}
//  */
// NDP.ConstantBehaviour.id = 'Behaviour';

// /**
//  * Array of component force values.
//  * @type {Array}
//  */
// Object.defineProperty(NDP.ConstantBehaviour.prototype, 'force', {
//   set: function(value) {
//     if (NDP.isArray(value)) {
//       this.__force = value;
//     }
//   },
//   get: function() {
//     return this.__force;
//   }
// });

// /**
//  * Sets the force component values to respective numerical arguments. force[n] = arguments[n].
//  * @param {Array} arguments List of numerical force values to set each respective component to.
//  */
// NDP.ConstantBehaviour.prototype.setForce = function() {
//   NDP.copyValuesToArray(arguments, this.__force, true, Number);
// };

// /**
//  * Calculates and adds the force of the behaviour to the particle force vector.
//  * @param {Particle} particle Particle instance to apply the behaviour to.
//  * @param {Number} delta Time delta in milliseconds since last integration.
//  * @param {Number} index Index of the particle within the system.
//  */
// NDP.ConstantBehaviour.prototype.apply = function(particle, delta, index) {
//   this.__vector.add(particle.__force, particle.__force, this.__force);
// };

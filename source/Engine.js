/**
 * Engine constructor.
 * Manages particles and spring collections.
 * Regulates the time step that integrates physics calculations.
 * @constructor
 * @param {Integrator} opt_integrator Optional integrator instance to use for integrating the particle physics calculations. Defaults to a new EulerIntegrator instance.
 * @param {Boolean} opt_physical Optional flag specifying whether or not to use a physical time step. Defaults to false.
 */
NDP.Engine = function(opt_integrator, opt_physical) {

  // Time Properties
  this.__buffer = 0.0;
  this.__delta = null;
  this.__time = null;

  // Step Properties
  this.physical = NDP.isBoolean(opt_physical) ? opt_physical : false;
  this.lubricity = 0.999;
  this.timeStep = 1/60;
  this.maxSteps = 4;

  /**
   * Integrator to use for calculating physics.
   * @type {Integrator}
   */
  this.integrator = NDP.isType(opt_integrator, NDP.Integrator) ? opt_integrator : new NDP.EulerIntegrator();

  /**
   * Particle collection.
   * @type {Array.<Particle>}
   */
  this.particles = [];

  /**
   * Spring collection.
   * @type {Array.<Spring>}
   */
  this.springs = [];
};

/**
 * Specifies whether or not to use a physical time step.
 * @type {Boolean}
 */
Object.defineProperty(NDP.Engine.prototype, 'physical', {
  set: function(value) {
    if (NDP.isBoolean(value)) {
      this.__physical = value;
    }
  },
  get: function() {
    return this.__physical;
  }
});

/**
 * Amount of lubricity within the system.
 * @type {Number}
 */
Object.defineProperty(NDP.Engine.prototype, 'lubricity', {
  set: function(value) {
    if (NDP.isNumber(value)) {
      this.__lubricity = Math.clamp(value, 0.000001, 0.999999);
    }
  },
  get: function() {
    return this.__lubricity;
  }
});

/**
 * Time step between physics calculations.
 * @type {Number}
 */
Object.defineProperty(NDP.Engine.prototype, 'timeStep', {
  set: function(value) {
    if (NDP.isNumber(value)) {
      this.__timeStep = value;
    }
  },
  get: function() {
    return this.__timeStep;
  }
});

/**
 * Maximum number of steps to perform inside each step.
 * @type {Number}
 */
Object.defineProperty(NDP.Engine.prototype, 'maxSteps', {
  set: function(value) {
    if (NDP.isNumber(value)) {
      this.__maxSteps = Math.clamp(Math.floor(value), 1, 10);
    }
  },
  get: function() {
    return this.__maxSteps;
  }
});

/**
 * Adds a particle to the system.
 * @param {Particle} particle Particle to add to the system.
 * @return {Engine} Engine instance for chaining.
 */
NDP.Engine.prototype.addParticle = function(particle) {
  NDP.addItemToArray(particle, this.particles, NDP.Particle);
  return this;
};

/**
 * Removes a particle from the system.
 * @param {Particle} particle Particle to remove from the system.
 * @return {Engine} Engine instance for chaining.
 */
NDP.Engine.prototype.removeParticle = function(particle) {
  NDP.removeItemFromArray(particle, this.particles);
  return this;
};

/**
 * Adds a spring to the system.
 * @param {Spring} spring Spring to add to the system.
 * @return {Engine} Engine instance for chaining.
 */
NDP.Engine.prototype.addSpring = function(spring) {
  NDP.addItemToArray(spring, this.springs, NDP.Spring);
  return this;
};

/**
 * Removes a spring from the system.
 * @param {Spring} spring Spring to remove from the system.
 * @return {Engine} Engine instance for chaining.
 */
NDP.Engine.prototype.removeSpring = function(spring) {
  NDP.removeItemFromArray(spring, this.springs);
  return this;
};

/**
 * Steps the physics engine calling integrate on each step.
 * @param {Number} opt_time Optional time value to override current time.
 * @return {Engine} Engine instance for chaining.
 */
NDP.Engine.prototype.step = function(opt_time) {

  // Set initial time value.
  if (!this.__time) this.__time = NDP.getTime();

  // Compute delta time since last step.
  var i = 0,
      time = opt_time || NDP.getTime(),
      delta = time - this.__time;

  // No sufficient change.
  if (delta <= 0) return this;

  // Convert delta to seconds.
  this.__delta = delta * 0.001;

  // Update time.
  this.__time = time;

  // Increment time buffer by delta.
  this.__buffer += this.__delta;

  // Use physical time step.
  if (this.__physical) {

    // Integrate until the buffer is empty or until the
    // maximum amount of iterations per step is reached.
    while (this.__buffer >= this.__timeStep && ++i < this.__maxSteps) {

      // Integrate by timeStep.
      this.integrate(this.__timeStep);

      // Reduce buffer by timeStep.
      this.__buffer -= this.__timeStep;
    }

  // Use delta time step.
  } else {

    // Integrate by delta time step.
    this.integrate(this.__delta);
  }
  return this;
};

/**
 * Integrates particle physics calculations and updates particle and spring properties.
 * @param {Number} delta Time delta in milliseconds since last integration.
 * @return {Engine} Engine instance for chaining.
 */
NDP.Engine.prototype.integrate = function(delta) {

  // Return if delta is 0 or there are no particles within the Engine.
  if (!delta || !this.particles.length) return this;

  // Update particles.
  for (var pi = 0, pl = this.particles.length; pi < pl; pi++) {
    this.particles[pi].update(delta, pi);
  }

  // Integrate physics.
  this.integrator.integrate(this.particles, delta, this.__lubricity);

  // Update springs.
  for (var si = 0, sl = this.springs.length; si < sl; si++) {
    this.springs[si].update(delta, si);
  }
  return this;
};

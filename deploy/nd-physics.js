/**
 * Namespace object.
 * @type {Object}
 */
var NDP = {};

/**
 * Semantic version string.
 * @type {String}
 * @see http://semver.org/
 */
Object.defineProperty(NDP, 'VERSION', {
  value: '0.1.0'
});

/**
 * Default number of dimensions to use when creating new component instances.
 * @type {Number}
 */
NDP.__DIMENSIONS = 2;
Object.defineProperty(NDP, 'DIMENSIONS', {
  set: function(value) {
    NDP.__DIMENSIONS = Math.clamp(parseInt(value, 10), 1, 3);
  },
  get: function() {
    return NDP.__DIMENSIONS;
  }
});

/**
 * Non-zeroing threshold value.
 * @type {Number}
 */
NDP.__THRESHOLD = 1e-6;
Object.defineProperty(NDP, 'THRESHOLD', {
  set: function(value) {
    NDP.__THRESHOLD = Math.clamp(parseFloat(value, 10), 1e-6, 1e-1);
  },
  get: function() {
    return NDP.__THRESHOLD;
  }
});

/**
 * Component axis identifiers.
 * @type {Array}
 */
Object.defineProperty(NDP, 'COMPONENTS', {
  value: ['x', 'y', 'z']
});

/**
 * Determines whether or not a value is of an expected type.
 * @param {Object} value Value to check.
 * @param {Object} expected Expected value to check against.
 * @return {Boolean} Whether or not the value is of the expected type.
 */
NDP.isType = function(value, expected) {
  if (expected === String) {
    return typeof value === 'string' || value instanceof String;
  }
  if (expected === Number) {
    return typeof value === 'number' || value instanceof Number;
  }
  if (expected === Function) {
    return typeof value === 'function' || value instanceof Function;
  }
  if (expected === Object) {
    return typeof value === 'object';
  }
  if (expected === Boolean) {
    return typeof value === 'boolean';
  }
  return value instanceof expected;
};

/**
 * Determines whether or not the supplied value is a Boolean.
 * @param {Object} value Value to check.
 * @return {Boolean} Whether or not the supplied value is a Boolean.
 */
NDP.isBoolean = function(value) {
  return NDP.isType(value, Boolean);
};

/**
 * Determines whether or not the supplied value is a Number.
 * @param {Object} value Value to check.
 * @return {Boolean} Whether or not the supplied value is a Number.
 */
NDP.isNumber = function(value) {
  return NDP.isType(value, Number);
};

/**
 * Determines whether or not the supplied value is an NDP.Array.
 * @param {Object} value Value to check.
 * @return {Boolean} Whether or not the supplied value is an NDP.Array.
 */
NDP.isArray = function(value) {
  return NDP.isType(value, NDP.Array);
};

/**
 * Returns the number of milliseconds since 1st January 1970 00:00:00 UTC.
 * @return {Number}
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
 */
NDP.getTime = function() {
  return NDP.Timer.now();
};

/**
 * Returns the Vector Object for the number of specified dimensions.
 * @param {Number} dimensions
 * @return {VectorClass}
 */
NDP.getVector = function(dimensions) {
  return NDP['Vector' + dimensions];
};

/**
 * Returns an object containing the unique axis combinations for the specified number of dimensions.
 * @param {Number} dimensions
 * @return {Object}
 */
NDP.getAxes = function(dimensions) {
  var x, y, key, axes = {length:0, axes:[]};
  if (!!dimensions) {
    for (x = 0; x < dimensions; x++) {
      for (y = 0; y < dimensions; y++) {
        if (x !== y) {
          key = NDP.COMPONENTS[x] + NDP.COMPONENTS[y];
          sum = (x + 1) * (y + 1);
          if (!axes[sum]) {
            axes.axes.push(axes[sum] = [x, y]);
            axes.length++;
          }
        }
      }
    }
  }
  return axes;
};

/**
 * Adds an item to an array only if the item does not exist within the array.
 * @param {Object} item The item to add to the array.
 * @param {Array} array The array to add the item to.
 * @param {Object} opt_type Optional type Object to filter the addition by.
 * @return {Boolean} Whether or not the item was added to the array.
 */
NDP.addItemToArray = function(item, array, opt_type) {
  var index = array.indexOf(item),
      add = index === -1;
  if (add && opt_type !== undefined) add = NDP.isType(item, opt_type);
  if (add) array.push(item);
  return add;
};

/**
 * Removes an item from an array.
 * @param {Object} item The item to be removed from the array.
 * @param {Array} array The array to remove the item from.
 * @return {Boolean} Whether or not the item was removed from the array.
 */
NDP.removeItemFromArray = function(item, array) {
  var index = array.indexOf(item),
      remove = index !== -1;
  if (remove) array.splice(index, 1);
  return remove;
};

/**
 * Copies values from a source Array to a target Array.
 * @param {Array} source Source Array to copy values from.
 * @param {Array} target Target Array to copy values to.
 * @param {Boolean} opt_limit Whether or not to limit the copy to the length of the target Array. Defaults to true.
 * @param {Object} opt_type Optional type Object to filter the copy by.
 */
NDP.copyValuesToArray = function(source, target, opt_limit, opt_type) {
  opt_limit = this.isBoolean(opt_limit) ? opt_limit : true;
  for (var i = 0, l = source.length; i < l; i++) {
    if (opt_type !== undefined && !NDP.isType(source[i], opt_type)) continue;
    if (opt_limit) {
      if (i < target.length) {
        target[i] = source[i];
      } else {
        break;
      }
    } else {
      target[i] = source[i];
    }
  }
};

/**
 * Array class constructor. Favours Float32Array if available.
 * @constructor
 * @type {ArrayClass}
 */
NDP.Array = !!window.Float32Array ? window.Float32Array : Array;

/**
 * Timer class. Favours performance if available.
 * @constructor
 * @type {Date|performance}
 */
NDP.Timer = !!window.performance ? window.performance : Date;

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
    while (this.__buffer >= this.__timeStep && ++i <= this.__maxSteps) {

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

/**
 * Particle constructor.
 * Manages behaviours collection.
 * Updates translation vectors by applying forces from registered behaviours.
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
    throw 'Particle: No Vector Object available for ['+this.__dimensions+'] dimensions';
  }

  // Set particle properties.
  this.mass = mass;
  this.radius = NDP.isNumber(opt_radius) ? opt_radius : mass;
  this.fixed = NDP.isBoolean(opt_fixed) ? opt_fixed : false;

  /**
   * Behaviour collection.
   * @type {Array.<Behaviour>}
   */
  this.behaviours = [];

  /**
   * Unique identifier.
   * @type {Number}
   */
  Object.defineProperty(this, 'id', {
    value: this.constructor.__uid++
  });

  // Create particle vectors.
  this.__force = this.__vector.create();
  this.__acc = this.__vector.create();
  this.__vel = this.__vector.create();
  this.__pos = this.__vector.create();
  this.__old = {
    force: this.__vector.create(),
    acc: this.__vector.create(),
    vel: this.__vector.create(),
    pos: this.__vector.create()
  };

  // Define component getters and setters.
  for (var i = 0; i < this.__dimensions; i++) {
    this.__defineComponent(i, 'force', 'f');
    this.__defineComponent(i, 'acc', 'a');
    this.__defineComponent(i, 'vel', 'v');
    this.__defineComponent(i, 'pos');
  }
};

/**
 * Particle unique identifier counter.
 * @type {Number}
 */
NDP.Particle.__uid = 0;

/**
 * Creates a getter and setter for a dimension component.
 * @param {Number} index Index of the component.
 * @param {String} arrayKey Array key.
 * @param {String} opt_prefix Optional component prefix. Defaults to '';
 */
NDP.Particle.prototype.__defineComponent = function(index, arrayKey, opt_prefix) {

  // Build property keys.
  var prefix = typeof opt_prefix === 'string' ? opt_prefix : '',
      componentKeyPublic = prefix + NDP.COMPONENTS[index],
      componentKeyPrivate = '__' + componentKeyPublic,
      arrayKeyPrivate = '__' + arrayKey;

  // Set initial component value.
  this[componentKeyPrivate] = this[arrayKeyPrivate][index];

  // Define getter and setter.
  Object.defineProperty(this, componentKeyPublic, {
    set: function(value) {
      if (NDP.isNumber(value)) {
        this[componentKeyPrivate] = value;
        this[arrayKeyPrivate][index] = value;
        this.__old[arrayKey][index] = value;
      }
    },
    get: function() {
      return this[componentKeyPrivate];
    }
  });
};

/**
 * Mass of the particle.
 * @type {Number}
 */
Object.defineProperty(NDP.Particle.prototype, 'mass', {
  set: function(value) {
    if (NDP.isNumber(value)) {
      this.__mass = value;
      this.__inverseMass = 1.0 / value;
    }
  },
  get: function() {
    return this.__mass;
  }
});

/**
 * Radius of the particle.
 * @type {Number}
 */
Object.defineProperty(NDP.Particle.prototype, 'radius', {
  set: function(value) {
    if (NDP.isNumber(value)) {
      this.__radius = value;
      this.__radiusSquared = value * value;
    }
  },
  get: function() {
    return this.__radius;
  }
});

/**
 * Whether or not the particle is fixed.
 * @type {Boolean}
 */
Object.defineProperty(NDP.Particle.prototype, 'fixed', {
  set: function(value) {
    if (NDP.isBoolean(value)) {
      this.__fixed = value;
    }
  },
  get: function() {
    return this.__fixed;
  }
});

/**
 * Adds a behaviour to the particle.
 * @param {Behaviour} behaviour Behaviour to add to the particle.
 * @return {Particle} Particle instance for chaining.
 */
NDP.Particle.prototype.addBehaviour = function(behaviour) {
  if (NDP.addItemToArray(behaviour, this.behaviours, NDP.Behaviour)) {
    switch (behaviour.constructor.id) {
      case NDP.CollisionBehaviour.id:
        behaviour.addParticle(this);
        break;
    }
  }
  return this;
};

/**
 * Removes a behaviour from the particle.
 * @param {Behaviour} behaviour Behaviour to remove from the particle.
 * @return {Particle} Particle instance for chaining.
 */
NDP.Particle.prototype.removeBehaviour = function(behaviour) {
  if (NDP.removeItemFromArray(behaviour, this.behaviours)) {
    switch (behaviour.constructor.id) {
      case NDP.CollisionBehaviour.id:
        behaviour.removeParticle(this);
        break;
    }
  }
  return this;
};

/**
 * Applies registered behaviours to the particle and updates its vectors.
 * @param {Number} delta Time delta since last integration.
 * @param {Number} index Index of the particle within the system.
 * @return {Particle} Particle instance for chaining.
 */
NDP.Particle.prototype.update = function(delta, index) {
  var i, l, behaviour, component;

  // Apply behaviours.
  if (!this.__fixed && delta !== 0) {
    for (i = 0, l = this.behaviours.length; i < l; i++) {
      behaviour = this.behaviours[i];
      if (behaviour.__active) {
        behaviour.apply(this, delta, index);
      }
    }
  }

  // Set private component properties.
  for (i = 0, l = this.__dimensions; i < l; i++) {
    component = NDP.COMPONENTS[i];
    this['__f' + component] = this.__force[i];
    this['__a' + component] = this.__acc[i];
    this['__v' + component] = this.__vel[i];
    this['__'  + component] = this.__pos[i];
  }
  return this;
};

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

  // Validate particle dimension compatibility.
  if (p1 === p2) {
    throw 'Spring: p1 and p2 cannot be the same Particle instance';
  }

  // Validate particle dimension compatibility.
  if (p1.dimensions !== p2.dimensions) {
    throw 'Spring: Particles must have equal dimensions. p1.dimensions['+p1.dimensions+'] p2.dimensions['+p2.dimensions+']';
  }

  // Validate length argument.
  if (!NDP.isNumber(length)) {
    throw 'Spring: length must be a Number ['+length+']';
  }

  // Validate stiffness argument.
  if (!NDP.isNumber(stiffness)) {
    throw 'Spring: stiffness must be a Number ['+stiffness+']';
  }

  /**
   * Unique identifier.
   * @type {Number}
   */
  Object.defineProperty(this, 'id', {
    value: this.constructor.__uid++
  });

  // Set properties.
  this.p1 = p1;
  this.p2 = p2;
  this.length = length;
  this.stiffness = stiffness;

  // Set vector object.
  this.__vector = p1.__vector;

  // Create spring worker vectors.
  this.__delta = this.__vector.create();
  this.__slave = this.__vector.create();
};

/**
 * Spring unique identifier counter.
 * @type {Number}
 */
NDP.Spring.__uid = 0;

/**
 * Particle 1.
 * @type {Particle}
 */
Object.defineProperty(NDP.Spring.prototype, 'p1', {
  set: function(value) {
    if (NDP.isType(value, NDP.Particle)) {
      this.__p1 = value;
    }
  },
  get: function() {
    return this.__p1;
  }
});

/**
 * Particle 2.
 * @type {Particle}
 */
Object.defineProperty(NDP.Spring.prototype, 'p2', {
  set: function(value) {
    if (NDP.isType(value, NDP.Particle)) {
      this.__p2 = value;
    }
  },
  get: function() {
    return this.__p2;
  }
});

/**
 * Rest length of the spring.
 * @type {Number}
 */
Object.defineProperty(NDP.Spring.prototype, 'length', {
  set: function(value) {
    if (NDP.isNumber(value)) {
      this.__length = value;
    }
  },
  get: function() {
    return this.__length;
  }
});

/**
 * Stiffness of the spring where 0 is elastic and 1 is rigid.
 * @type {Number}
 */
Object.defineProperty(NDP.Spring.prototype, 'stiffness', {
  set: function(value) {
    if (NDP.isNumber(value)) {
      this.__stiffness = value;
    }
  },
  get: function() {
    return this.__stiffness;
  }
});

/**
 * Updates the positions of the two particles attached to the spring.
 * @param {Number} delta Time delta since last integration.
 * @param {Number} index Index of the spring within the system.
 * @return {Spring} Spring instance for chaining.
 */
NDP.Spring.prototype.update = function(delta, index) {

  // Calculate delta.
  this.__vector.subtract(this.__delta, this.__p2.__pos, this.__p1.__pos);

  // Calculate force.
  var distance = NDP.__THRESHOLD + this.__vector.length(this.__delta);
  var inverseMass = this.__p1.__inverseMass + this.__p2.__inverseMass;
  var force = (distance - this.__length) / (distance * inverseMass) * this.__stiffness;

  // Apply force to particles.
  this.apply(this.__p1, force);
  this.apply(this.__p2,-force);

  return this;
};

/**
 * Applies spring force to a particle.
 * @param {Particle} particle Particle to apply force to.
 * @param {Number} force Force to apply to the particle.
 * @return {Spring} Spring instance for chaining.
 */
NDP.Spring.prototype.apply = function(particle, force) {
  if (!particle.__fixed) {
    this.__vector.scale(this.__slave, this.__delta, particle.__inverseMass * force);
    this.__vector.add(particle.__pos, particle.__pos, this.__slave);
  }
  return this;
};

/**
 * Math.PI * 2.
 * @type {Number}
 */
Object.defineProperty(Math, 'PI2', {
  value: Math.PI * 2
});

/**
 * Math.PI / 2.
 * @type {Number}
 */
Object.defineProperty(Math, 'PIH', {
  value: Math.PI / 2
});

/**
 * Normalizes a value to a given scale.
 * @param {Number} value Value to plot on the given scale.
 * @param {Number} opt_min Optional lower limit of the scale. Defaults to 0.
 * @param {Number} opt_max Optional upper limit of the scale. Defaults to 1.
 * @return {Number} Normalized value.
 */
Math.normalize = function(value, opt_min, opt_max) {
  opt_min = NDP.isNumber(opt_min) ? opt_min : 0;
  opt_max = NDP.isNumber(opt_max) ? opt_max : 1;
  return (value - opt_min) / (opt_max - opt_min);
};

/**
 * Calculates a value on a given scale.
 * @param {Number} value Location on the scale. Typically a ratio (0-1).
 * @param {Number} min Lower limit of the scale.
 * @param {Number} max Upper limit of the scale.
 * @return {Number} Plotted value on the scale.
 */
Math.interpolate = function(value, min, max) {
  return min + (max - min) * value;
};

/**
 * Maps a value from one scale to another scale.
 * @param {Number} value Value to map.
 * @param {Number} min1 Lower limit of the source scale.
 * @param {Number} max1 Upper limit of the source scale.
 * @param {Number} min2 Lower limit of the target scale.
 * @param {Number} max2 Upper limit of the target scale.
 * @return {Number} Mapped value.
 */
Math.map = function(value, min1, max1, min2, max2) {
  return Math.interpolate(Math.normalize(value, min1, max1), min2, max2);
};

/**
 * Clamps a value within a specified range.
 * @param {Number} value Value to clamp.
 * @param {Number} min Lower limit of the range.
 * @param {Number} max Upper limit of the range.
 * @return {Number} Clamped value.
 */
Math.clamp = function(value, min, max) {
  value = Math.max(value, min);
  value = Math.min(value, max);
  return value;
};

/**
 * Determines the sign of a value as either +1 or -1.
 * @param {Number} value Value to determine the sign of.
 * @return {Number} Sign of the given value.
 */
Math.sign = function(value) {
  return value >= 0 ? 1 : -1;
};

/**
 * Returns a random number within a specified range.
 * @param {Number} min Lower limit of the range.
 * @param {Number} max Upper limit of the range.
 * @param {Boolean} opt_round Optional flag specifying whether or not to round the generated value. Defaults to false.
 * @return {Number} Generated random value.
 */
Math.randomInRange = function(min, max, opt_round) {
  opt_round = NDP.isBoolean(opt_round) ? opt_round : false;
  value = Math.map(Math.random(), 0, 1, min, max);
  if (opt_round) value = Math.round(value);
  return value;
};

/**
 * Returns a random sign (+1 or -1).
 * @param {Number} opt_probability Optional probability value for biasing the output. Defalts to 0.5.
 * @return {Number} Sign value (+1 or -1).
 */
Math.randomSign = function(opt_probability) {
  opt_probability = NDP.isNumber(opt_probability) ? opt_probability : 0.5;
  return Math.random() < opt_probability ? 1 : -1;
};

/**
 * Returns a random boolean value.
 * @param {Number} opt_probability Optional probability value for biasing the output. Defalts to 0.5.
 * @return {Boolean} true or false.
 */
Math.randomBoolean = function(opt_probability) {
  opt_probability = NDP.isNumber(opt_probability) ? opt_probability : 0.5;
  return Math.random() < opt_probability;
};

/**
 * Returns a random item within an array.
 * @param {Array} array Array to extract the random item from.
 * @return {Object} Random item from the array.
 */
Math.randomItem = function(array) {
  return array[Math.floor(Math.random() * (array.length - 1e-6))];
};

/**
 * Vector1 object.
 * @type {Object}
 */
NDP.Vector1 = {};

/**
 * Creates a new Vector1 Array.
 * @param {Number} opt_x Optional value to set the x component to. Defaults to 0.
 * @return {Array} Vector1 Array.
 */
NDP.Vector1.create = function(opt_x) {
  var vector = new NDP.Array(1);
  vector[0] = NDP.isNumber(opt_x) ? opt_x : 0;
  return vector;
};

/**
 * Identity: target[n] = 0.
 * @param {Array} target Target Vector1 Array to set the component values of.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.identity = function(target) {
  target[0] = 0;
  return target;
};

/**
 * Sets the values of a Vector1 Array.
 * @param {Array} target Target Vector1 Array.
 * @param {Number} x Value to set the x component to.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.set = function(target, x) {
  target[0] = x;
  return target;
};

/**
 * Copy: target[n] = a[n].
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.copy = function(target, a) {
  target[0] = a[0];
  return target;
};

/**
 * Add: target[n] = a[n] + b[n].
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array A.
 * @param {Array} b Source Vector1 Array B.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.add = function(target, a, b) {
  target[0] = a[0] + b[0];
  return target;
};

/**
 * Subtract: target[n] = a[n] - b[n].
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array A.
 * @param {Array} b Source Vector1 Array B.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.subtract = function(target, a, b) {
  target[0] = a[0] - b[0];
  return target;
};

/**
 * Scale: target[n] = a[n] * scalar.
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array.
 * @param {Number} scalar Scalar value to multiply the source Vector1 Array components by.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.scale = function(target, a, scalar) {
  target[0] = a[0] * scalar;
  return target;
};

/**
 * Calculates the squared length of a given Vector1 Array.
 * @param {Array} vector Target Vector1 Array.
 * @return {Number} The squared length of the Vector1 Array.
 */
NDP.Vector1.squaredLength = function(vector) {
  var x = vector[0];
  return x*x;
};

/**
 * Calculates the length of a given Vector1 Array.
 * @param {Array} vector Target Vector1 Array.
 * @return {Number} The length of the Vector1 Array.
 */
NDP.Vector1.length = function(vector) {
  return Math.abs(vector[0]);
};

/**
 * Normalizes a Vector1 Array to a given length.
 * @param {Array} target Target Vector1 Array.
 * @param {Array} a Source Vector1 Array.
 * @param {Number} opt_length Optional length value to normalize the Vector1 Array to. Defaults to 1.
 * @return {Array} The supplied target Vector1 Array.
 */
NDP.Vector1.normalize = function(target, a, opt_length) {
  opt_length = opt_length || 1;
  var l = NDP.Vector1.length(a);
  if (l > 0) {
    l = opt_length / l;
    NDP.Vector1.scale(target, a, l);
  } else {
    NDP.Vector1.identity(target);
  }
  return target;
};

/**
 * Vector2 object.
 * @type {Object}
 */
NDP.Vector2 = {};

/**
 * Creates a new Vector2 Array.
 * @param {Number} opt_x Optional value to set the x component to. Defaults to 0.
 * @param {Number} opt_y Optional value to set the y component to. Defaults to 0.
 * @return {Array} Vector2 Array.
 */
NDP.Vector2.create = function(opt_x, opt_y) {
  var vector = new NDP.Array(2);
  vector[0] = NDP.isNumber(opt_x) ? opt_x : 0;
  vector[1] = NDP.isNumber(opt_y) ? opt_y : 0;
  return vector;
};

/**
 * Identity: target[n] = 0.
 * @param {Array} target Target Vector2 Array to set the component values of.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.identity = function(target) {
  target[0] = 0;
  target[1] = 0;
  return target;
};

/**
 * Sets the values of a Vector2 Array.
 * @param {Array} target Target Vector2 Array.
 * @param {Number} x Value to set the x component to.
 * @param {Number} y Value to set the y component to.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.set = function(target, x, y) {
  target[0] = x;
  target[1] = y;
  return target;
};

/**
 * Copy: target[n] = a[n].
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.copy = function(target, a) {
  target[0] = a[0];
  target[1] = a[1];
  return target;
};

/**
 * Add: target[n] = a[n] + b[n].
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array A.
 * @param {Array} b Source Vector2 Array B.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.add = function(target, a, b) {
  target[0] = a[0] + b[0];
  target[1] = a[1] + b[1];
  return target;
};

/**
 * Subtract: target[n] = a[n] - b[n].
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array A.
 * @param {Array} b Source Vector2 Array B.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.subtract = function(target, a, b) {
  target[0] = a[0] - b[0];
  target[1] = a[1] - b[1];
  return target;
};

/**
 * Scale: target[n] = a[n] * scalar.
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array.
 * @param {Number} scalar Scalar value to multiply the source Vector2 Array components by.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.scale = function(target, a, scalar) {
  target[0] = a[0] * scalar;
  target[1] = a[1] * scalar;
  return target;
};

/**
 * Calculates the squared length of a given Vector2 Array.
 * @param {Array} vector Target Vector2 Array.
 * @return {Number} The squared length of the Vector2 Array.
 */
NDP.Vector2.squaredLength = function(vector) {
  var x = vector[0];
  var y = vector[1];
  return x*x + y*y;
};

/**
 * Calculates the length of a given Vector2 Array.
 * @param {Array} vector Target Vector2 Array.
 * @return {Number} The length of the Vector2 Array.
 */
NDP.Vector2.length = function(vector) {
  return Math.sqrt(NDP.Vector2.squaredLength(vector));
};

/**
 * Normalizes a Vector2 Array to a given length.
 * @param {Array} target Target Vector2 Array.
 * @param {Array} a Source Vector2 Array.
 * @param {Number} opt_length Optional length value to normalize the Vector2 Array to. Defaults to 1.
 * @return {Array} The supplied target Vector2 Array.
 */
NDP.Vector2.normalize = function(target, a, opt_length) {
  opt_length = opt_length || 1;
  var l = NDP.Vector2.squaredLength(a);
  if (l > 0) {
    l = opt_length / Math.sqrt(l);
    NDP.Vector2.scale(target, a, l);
  } else {
    NDP.Vector2.identity(target);
  }
  return target;
};

/**
 * Vector3 object.
 * @type {Object}
 */
NDP.Vector3 = {};

/**
 * Creates a new Vector3 Array.
 * @param {Number} opt_x Optional value to set the x component to. Defaults to 0.
 * @param {Number} opt_y Optional value to set the y component to. Defaults to 0.
 * @param {Number} opt_z Optional value to set the z component to. Defaults to 0.
 * @return {Array} Vector3 Array.
 */
NDP.Vector3.create = function(opt_x, opt_y, opt_z) {
  var vector = new NDP.Array(3);
  vector[0] = NDP.isNumber(opt_x) ? opt_x : 0;
  vector[1] = NDP.isNumber(opt_y) ? opt_y : 0;
  vector[2] = NDP.isNumber(opt_z) ? opt_z : 0;
  return vector;
};

/**
 * Identity: target[n] = 0.
 * @param {Array} target Target Vector3 Array to set the component values of.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.identity = function(target) {
  target[0] = 0;
  target[1] = 0;
  target[2] = 0;
  return target;
};

/**
 * Sets the values of a Vector3 Array.
 * @param {Array} target Target Vector3 Array.
 * @param {Number} x Value to set the x component to.
 * @param {Number} y Value to set the y component to.
 * @param {Number} z Value to set the z component to.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.set = function(target, x, y, z) {
  target[0] = x;
  target[1] = y;
  target[2] = z;
  return target;
};

/**
 * Copy: target[n] = a[n].
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.copy = function(target, a) {
  target[0] = a[0];
  target[1] = a[1];
  target[2] = a[2];
  return target;
};

/**
 * Add: target[n] = a[n] + b[n].
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array A.
 * @param {Array} b Source Vector3 Array B.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.add = function(target, a, b) {
  target[0] = a[0] + b[0];
  target[1] = a[1] + b[1];
  target[2] = a[2] + b[2];
  return target;
};

/**
 * Subtract: target[n] = a[n] - b[n].
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array A.
 * @param {Array} b Source Vector3 Array B.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.subtract = function(target, a, b) {
  target[0] = a[0] - b[0];
  target[1] = a[1] - b[1];
  target[2] = a[2] - b[2];
  return target;
};

/**
 * Scale: target[n] = a[n] * scalar.
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array.
 * @param {Number} scalar Scalar value to multiply the source Vector3 Array components by.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.scale = function(target, a, scalar) {
  target[0] = a[0] * scalar;
  target[1] = a[1] * scalar;
  target[2] = a[2] * scalar;
  return target;
};

/**
 * Calculates the squared length of a given Vector3 Array.
 * @param {Array} vector Target Vector3 Array.
 * @return {Number} The squared length of the Vector3 Array.
 */
NDP.Vector3.squaredLength = function(vector) {
  var x = vector[0],
      y = vector[1],
      z = vector[2];
  return x*x + y*y + z*z;
};

/**
 * Calculates the length of a given Vector3 Array.
 * @param {Array} vector Target Vector3 Array.
 * @return {Number} The length of the Vector3 Array.
 */
NDP.Vector3.length = function(vector) {
  return Math.sqrt(NDP.Vector3.squaredLength(vector));
};

/**
 * Normalizes a Vector3 Array to a given length.
 * @param {Array} target Target Vector3 Array.
 * @param {Array} a Source Vector3 Array.
 * @param {Number} opt_length Optional length value to normalize the Vector3 Array to. Defaults to 1.
 * @return {Array} The supplied target Vector3 Array.
 */
NDP.Vector3.normalize = function(target, a, opt_length) {
  opt_length = opt_length || 1;
  var l = NDP.Vector3.squaredLength(a);
  if (l > 0) {
    l = opt_length / Math.sqrt(l);
    NDP.Vector3.scale(target, a, l);
  } else {
    NDP.Vector3.identity(target);
  }
  return target;
};

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
  this.__delta = null;
  this.__deltaSquared = null;
  this.__halfDeltaSquared = null;
  this.__deltaCorrection = null;
};

/**
 * Integrates motion for a collection of particles.
 * @param {Array.<Particle>} particles Particle collection to integrate motion on.
 * @param {Number} delta Time delta in milliseconds since last integration.
 * @param {Number} lubricity Lubricity within the system.
 */
NDP.Integrator.prototype.integrate = function(particles, delta, lubricity) {
  var i, l, particle;

  // Handle first integration.
  if (this.__delta === null) this.__delta = delta;

  // Set delta values.
  this.__deltaSquared = delta * delta;
  this.__halfDeltaSquared = this.__deltaSquared * 0.5;
  this.__deltaCorrection = delta / this.__delta;
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

/**
 * EulerIntegrator constructor.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the integrator should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Integrator.create('EulerIntegrator',

  /**
   * Integrates motion for a single particle using Euler integration.
   * a(i+1) = a(i) * dt(i)
   * v(i+1) = v(i) + a(i+1)
   * x(i+1) = x(i) + v(i+1) * dt(i)
   * @param {Particle} particle Particle to integrate motion on.
   * @param {Number} delta Time delta in milliseconds since last integration.
   * @param {Number} lubricity Lubricity within the system.
   */
  function(particle, delta, lubricity) {

    // Calculate acceleration.
    // force = mass * acceleration
    // acceleration = force / mass || force * inverseMass
    this.__vector.scale(particle.__acc, particle.__force, particle.__inverseMass * delta);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Scale velocity by lubricity.
    // velocity *= lubricity
    this.__vector.scale(particle.__vel, particle.__vel, lubricity);

    // Calculate velocity into slave to preserve momentum.
    // velocity *= delta
    this.__vector.scale(this.__vel, particle.__vel, delta);

    // Add slave velocity to position.
    // position += velocity
    this.__vector.add(particle.__pos, particle.__pos, this.__vel);

    // Reset force.
    this.__vector.identity(particle.__force);
  }
);

/**
 * ImprovedEulerIntegrator constructor.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the integrator should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Integrator.create('ImprovedEulerIntegrator',

  /**
   * Integrates motion for a single particle using Improved Euler integration.
   * a(i+1) = a(i) * dt(i) * dt(i) * 0.5
   * x(i+1) = x(i) + v(i) * dt(i) + a(i+1)
   * v(i+1) = v(i) + a(i) * dt(i)
   * @param {Particle} particle Particle to integrate motion on.
   * @param {Number} delta Time delta in milliseconds since last integration.
   * @param {Number} lubricity Lubricity within the system.
   */
  function(particle, delta, lubricity) {

    // Calculate acceleration.
    // force = mass * acceleration
    // acceleration = force / mass || force * inverseMass
    this.__vector.scale(this.__acc, particle.__force, particle.__inverseMass * this.__halfDeltaSquared);

    // Calculate velocity into slave to preserve momentum.
    // velocity *= delta
    this.__vector.scale(this.__vel, particle.__vel, delta);

    // Add slave acceleration to slave velocity.
    // velocity += acceleration
    this.__vector.add(this.__vel, this.__vel, this.__acc);

    // Add slave velocity to position.
    // position += velocity
    this.__vector.add(particle.__pos, particle.__pos, this.__vel);

    // Calculate acceleration.
    // acceleration *= delta
    this.__vector.scale(particle.__acc, particle.__force, particle.__inverseMass * delta);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Scale velocity by lubricity.
    // velocity *= lubricity
    this.__vector.scale(particle.__vel, particle.__vel, lubricity);

    // Reset force.
    this.__vector.identity(particle.__force);
  }
);

/**
 * TimeCorrectedVerletIntegrator constructor.
 * @author Jonathan Dummer
 * @see http://lonesock.net/article/verlet.html
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the integrator should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Integrator.create('TimeCorrectedVerletIntegrator',

  /**
   * Integrates motion for a single particle using Verlet integration.
   * a(i+1) = a(i) * dt(i) * dt(i)
   * v(i) = x(i) - x(i-1)
   * x(i+1) = x(i) + v(i) * (dt(i) / dt(i-1)) + a(i+1)
   * @param {Particle} particle Particle to integrate motion on.
   * @param {Number} delta Time delta in milliseconds since last integration.
   * @param {Number} lubricity Lubricity within the system.
   */
  function(particle, delta, lubricity) {

    // Calculate acceleration.
    // force = mass * acceleration
    // acceleration = force / mass || force * inverseMass
    this.__vector.scale(particle.__acc, particle.__force, particle.__inverseMass * this.__deltaSquared);

    // Calculate velocity.
    // velocity = position - oldPosition
    this.__vector.subtract(particle.__vel, particle.__pos, particle.__old.pos);

    // Scale velocity by deltaCorrection.
    // velocity *= deltaCorrection
    this.__vector.scale(particle.__vel, particle.__vel, this.__deltaCorrection);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Scale velocity by lubricity.
    // velocity *= lubricity
    this.__vector.scale(particle.__vel, particle.__vel, lubricity);

    // Store old position.
    // oldPosition = position
    this.__vector.copy(particle.__old.pos, particle.__pos);

    // Add velocity to position.
    // position += velocity
    this.__vector.add(particle.__pos, particle.__pos, particle.__vel);

    // Reset force.
    this.__vector.identity(particle.__force);
  }
);

/**
 * VerletIntegrator constructor.
 * @constructor
 * @param {Number} opt_dimensions Optional number of component dimension that the integrator should have. Defaults to NDP.DIMENSIONS.
 */
NDP.Integrator.create('VerletIntegrator',

  /**
   * Integrates motion for a single particle using Verlet integration.
   * a(i+1) = a(i) * dt(i) * dt(i)
   * v(i+1) = x(i) - x(i-1)
   * x(i+1) = x(i) + v(i+1) + a(i+1)
   * @param {Particle} particle Particle to integrate motion on.
   * @param {Number} delta Time delta in milliseconds since last integration.
   * @param {Number} lubricity Lubricity within the system.
   */
  function(particle, delta, lubricity) {

    // Calculate acceleration.
    // force = mass * acceleration
    // acceleration = force / mass || force * inverseMass
    this.__vector.scale(particle.__acc, particle.__force, particle.__inverseMass * this.__deltaSquared);

    // Calculate velocity.
    // velocity = position - oldPosition
    this.__vector.subtract(particle.__vel, particle.__pos, particle.__old.pos);

    // Add acceleration to velocity.
    // velocity += acceleration
    this.__vector.add(particle.__vel, particle.__vel, particle.__acc);

    // Scale velocity by lubricity.
    // velocity *= lubricity
    this.__vector.scale(particle.__vel, particle.__vel, lubricity);

    // Store old position.
    // oldPosition = position
    this.__vector.copy(particle.__old.pos, particle.__pos);

    // Add velocity to position.
    // position += velocity
    this.__vector.add(particle.__pos, particle.__pos, particle.__vel);

    // Reset force.
    this.__vector.identity(particle.__force);
  }
);

/**
 * Behaviour constructor.
 * Applies a force to a particle.
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

  // Set active state.
  this.active = true;
};

/**
 * Unique identifier.
 * @type {String}
 */
NDP.Behaviour.id = 'Behaviour';

/**
 * Active state of the behaviour.
 * @type {Boolean}
 */
Object.defineProperty(NDP.Behaviour.prototype, 'active', {
  set: function(value) {
    if (NDP.isBoolean(value)) {
      this.__active = value;
    }
  },
  get: function() {
    return this.__active;
  }
});

/**
 * Calculates and adds the force of the behaviour to the particle force vector.
 * @param {Particle} particle Particle instance to apply the behaviour to.
 * @param {Number} delta Time delta in milliseconds since last integration.
 * @param {Number} index Index of the particle within the system.
 */
NDP.Behaviour.prototype.apply = function(particle, delta, index) {
};

/**
 * Creates an Behaviour constructor.
 * @param {String} namespace Namespace of the behaviour.
 * @return {Behaviour} Behaviour constructor.
 */
NDP.Behaviour.create = function(namespace, constructor, apply) {
  if (NDP[namespace]) {
    throw 'Behaviour: Object already defined for NDP['+namespace+']';
  }
  var Behaviour = NDP[namespace] = function() {
    NDP.Behaviour.call(this);
  };
  Behaviour.id = namespace;
  Behaviour.prototype = Object.create(NDP.Behaviour.prototype);
  Behaviour.prototype.constructor = Behaviour;
  Behaviour.prototype.apply = apply;
  return Behaviour;
};

(function(Behaviour) {

  Behaviour.prototype.addParticle = function(particle) {
  };

  Behaviour.prototype.removeParticle = function(particle) {
  };

})(NDP.Behaviour.create('CollisionBehaviour',
  function() {
  },
  function(particle, delta, index) {
  }
));

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

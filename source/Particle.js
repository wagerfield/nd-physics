/**
 * Particle constructor.
 * Manages behaviours collection.
 * Updates translation vectors by applying the effects of registered behaviours.
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
  this.__acc = this.__vector.create();
  this.__vel = this.__vector.create();
  this.__pos = this.__vector.create();
  this.__old = {
    acc: this.__vector.create(),
    vel: this.__vector.create(),
    pos: this.__vector.create()
  };

  // Define component getters and setters.
  for (var i = 0; i < this.__dimensions; i++) {
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
    this['__a' + component] = this.__acc[i];
    this['__v' + component] = this.__vel[i];
    this['__'  + component] = this.__pos[i];
  }
  return this;
};

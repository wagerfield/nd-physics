describe('NDP.Particle(mass, opt_radius, opt_fixed, opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    this.particleA = new NDP.Particle(1);
    this.particleB = new NDP.Particle(2);
    this.behaviour = new NDP.Behaviour();
  });

  it('should be a Function Object', function() {
    expect(NDP.Particle).toEqual(jasmine.any(Function));
  });
  it('should throw an error if the [mass] argument is not a Number', function() {
    expect(function() {
      new NDP.Particle();
    }).toThrow('Particle: mass must be a Number ['+undefined+']');
    expect(function() {
      new NDP.Particle('kittens');
    }).toThrow('Particle: mass must be a Number [kittens]');
  });
  it('should set [mass] to the first argument', function() {
    expect(this.particleA.mass).toBe(1);
    expect(this.particleB.mass).toBe(2);
  });
  it('should default [radius] to the value of [mass]', function() {
    expect(this.particleA.radius).toEqual(this.particleA.mass);
    expect(this.particleB.radius).toEqual(this.particleB.mass);
  });
  it('should set [radius] to the second argument if passed', function() {
    this.particleA = new NDP.Particle(1, 2);
    this.particleB = new NDP.Particle(3, 4);
    expect(this.particleA.mass).toEqual(1);
    expect(this.particleA.radius).toEqual(2);
    expect(this.particleB.mass).toEqual(3);
    expect(this.particleB.radius).toEqual(4);
  });
  it('should default [fixed] to false', function() {
    expect(this.particleA.fixed).toBe(false);
  });
  it('should set [fixed] to the third argument if passed', function() {
    this.particleA = new NDP.Particle(1, 2, true);
    this.particleB = new NDP.Particle(3, 4, false);
    expect(this.particleA.fixed).toBe(true);
    expect(this.particleB.fixed).toBe(false);
  });
  it('should default [dimensions] to NDP.DIMENSIONS', function() {
    expect(this.particleA.dimensions).toBe(NDP.DIMENSIONS);
  });
  it('should set [dimensions] to the fourth argument if passed', function() {
    this.particleA = new NDP.Particle(1, 2, true, 3);
    expect(this.particleA.dimensions).toBe(3);
  });

  describe('constructor.__uid', function() {
    it('should be an Integer', function() {
      expect(NDP.Particle.__uid).toBeAnInteger();
      expect(this.particleA.constructor.__uid).toBeAnInteger();
    });
    it('should increment with each new Particle instance', function() {
      var uid = NDP.Particle.__uid;
      var particle = new NDP.Particle(1);
      expect(NDP.Particle.__uid).toBe(uid + 1);
    });
  });

  describe('dimensions', function() {
    it('should be an Integer', function() {
      this.particleB = new NDP.Particle(1, 1, false, 2.4);
      expect(this.particleA.dimensions).toBeAnInteger();
      expect(this.particleB.dimensions).toBeAnInteger();
      expect(this.particleB.dimensions).toBe(2);
    });
    it('should be readonly', function() {
      var dimensions = this.particleA.dimensions;
      this.particleA.dimensions = 'kittens';
      expect(this.particleA.dimensions).toBe(dimensions);
    });
    it('should have a private __dimensions cache', function() {
      expect(this.particleA.__dimensions).toBeDefined();
      expect(this.particleA.__dimensions).toBeAnInteger();
      expect(this.particleA.__dimensions).toBe(this.particleA.dimensions);
    });
  });

  describe('__vector', function() {
    it('should be an Object', function() {
      expect(this.particleA.__vector).toEqual(jasmine.any(Object));
    });
    it('should reference NDP.Vector[dimensions]', function() {
      expect(this.particleA.__vector).toEqual(NDP['Vector' + this.particleA.dimensions]);
    });
    it('should throw an error for cases where a Vector Object is not available', function() {
      expect(function() {
        new NDP.Particle(1, 1, false, 0);
      }).toThrow('Particle: No Vector Object available for [0] dimensions');
    });
  });

  describe('mass', function() {
    it('should be a Number', function() {
      expect(this.particleA.mass).toEqual(jasmine.any(Number));
    });
    it('should only accept Numbers', function() {
      var mass = this.particleA.mass;
      this.particleA.mass = 'kittens';
      expect(this.particleA.mass).toBe(mass);
    });
    it('should not set other Particle instance mass values', function() {
      var massA = this.particleA.mass;
      var massB = this.particleB.mass;
      expect(massA).toBe(1);
      expect(massB).toBe(2);
      this.particleA.mass = massA = 3;
      expect(this.particleA.mass).toBe(massA);
      expect(this.particleB.mass).toBe(massB);
    });
    it('should set __mass', function() {
      expect(this.particleA.__mass).toBe(this.particleA.mass);
      this.particleA.mass = 2;
      expect(this.particleA.__mass).toBe(this.particleA.mass);
    });
    it('should set __inverseMass to 1 / mass', function() {
      expect(this.particleA.__inverseMass).toBe(1 / this.particleA.mass);
      this.particleA.mass = 2;
      expect(this.particleA.__inverseMass).toBe(1 / this.particleA.mass);
    });
  });

  describe('__inverseMass', function() {
    it('should be a Number', function() {
      expect(this.particleA.__inverseMass).toEqual(jasmine.any(Number));
    });
    it('should be __private', function() {
      expect(this.particleA.__inverseMass).toBeDefined();
      expect(this.particleA.inverseMass).toBeUndefined();
    });
  });

  describe('radius', function() {
    it('should be a Number', function() {
      expect(this.particleA.radius).toEqual(jasmine.any(Number));
    });
    it('should only accept Numbers', function() {
      var radius = this.particleA.radius;
      this.particleA.radius = 'kittens';
      expect(this.particleA.radius).toBe(radius);
    });
    it('should not set other Particle instance radius values', function() {
      var radiusA = this.particleA.radius;
      var radiusB = this.particleB.radius;
      expect(radiusA).toBe(1);
      expect(radiusB).toBe(2);
      this.particleA.radius = radiusA = 3;
      expect(this.particleA.radius).toBe(radiusA);
      expect(this.particleB.radius).toBe(radiusB);
    });
    it('should set __radius', function() {
      expect(this.particleA.__radius).toBe(this.particleA.radius);
      this.particleA.radius = 2;
      expect(this.particleA.__radius).toBe(this.particleA.radius);
    });
    it('should set __radiusSquared to radius * radius', function() {
      expect(this.particleA.__radiusSquared).toBe(Math.pow(this.particleA.radius, 2));
      this.particleA.radius = 2;
      expect(this.particleA.__radiusSquared).toBe(Math.pow(this.particleA.radius, 2));
    });
  });

  describe('__radiusSquared', function() {
    it('should be a Number', function() {
      expect(this.particleA.__radiusSquared).toEqual(jasmine.any(Number));
    });
    it('should be __private', function() {
      expect(this.particleA.__radiusSquared).toBeDefined();
      expect(this.particleA.radiusSquared).toBeUndefined();
    });
  });

  describe('fixed', function() {
    it('should be a Boolean', function() {
      expect(this.particleA.fixed).toEqual(jasmine.any(Boolean));
    });
    it('should only accept Boolean values', function() {
      var fixed = this.particleA.fixed;
      this.particleA.fixed = 'kittens';
      expect(this.particleA.fixed).toBe(fixed);
    });
    it('should not set other Particle instance fixed values', function() {
      var fixedA = this.particleA.fixed;
      var fixedB = this.particleB.fixed;
      expect(fixedA).toBe(false);
      expect(fixedB).toBe(false);
      this.particleA.fixed = fixedA = true;
      expect(this.particleA.fixed).toBe(fixedA);
      expect(this.particleB.fixed).toBe(fixedB);
    });
    it('should set __fixed', function() {
      expect(this.particleA.__fixed).toBe(false);
      expect(this.particleA.__fixed).toBe(this.particleA.fixed);
      this.particleA.fixed = true;
      expect(this.particleA.__fixed).toBe(true);
      expect(this.particleA.__fixed).toBe(this.particleA.fixed);
    });
  });

  describe('behaviours', function() {
    it('should be a Array', function() {
      expect(this.particleA.behaviours).toEqual(jasmine.any(Array));
    });
    it('should create a new Array per instance', function() {
      expect(this.particleA.behaviours).not.toBe(this.particleB.behaviours);
    });
    it('should be empty initially', function() {
      expect(this.particleA.behaviours).toEqual([]);
    });
    it('should be writable', function() {
      var behaviours = this.particleA.behaviours;
      this.particleA.behaviours = this.particleB.behaviours;
      expect(this.particleA.behaviours).not.toBe(behaviours);
      expect(this.particleA.behaviours).toBe(this.particleB.behaviours);
    });
  });

  describe('id', function() {
    it('should be an Integer', function() {
      expect(this.particleA.id).toBeAnInteger();
    });
    it('should be readonly', function() {
      var id = this.particleA.id;
      this.particleA.id = 'kittens';
      expect(this.particleA.id).toBe(id);
    });
    it('should be 1 greater than a previously created Particle instance [id]', function() {
      this.particleA = new NDP.Particle(1);
      this.particleB = new NDP.Particle(1);
      expect(this.particleB.id).toBe(this.particleA.id + 1);
    });
  });

  describe('__acc, __vel, __pos', function() {
    beforeEach(function() {
      this.vectorKeys = ['__acc', '__vel', '__pos'];
    });
    it('should be __private', function() {
      for (var i = 0; i < this.vectorKeys.length; i++) {
        var privateKey = this.vectorKeys[i];
        var publicKey = privateKey.replace(/_/g, '');
        expect(this.particleA[privateKey]).toBeDefined();
        expect(this.particleA[publicKey]).toBeUndefined();
      }
    });
    it('should be an NDP.Array instance', function() {
      for (var i = 0; i < this.vectorKeys.length; i++) {
        expect(this.particleA[this.vectorKeys[i]]).toEqual(jasmine.any(NDP.Array));
      }
    });
    it('should be of length [dimensions]', function() {
      for (var i = 0; i < this.vectorKeys.length; i++) {
        expect(this.particleA[this.vectorKeys[i]].length).toBe(this.particleA.dimensions);
      }
    });
  });

  describe('__old', function() {
    it('should be __private', function() {
      expect(this.particleA.__old).toBeDefined();
      expect(this.particleA.old).toBeUndefined();
    });
    it('should be an Object', function() {
      expect(this.particleA.__old).toEqual(jasmine.any(Object));
    });
    it('should only contain references to NDP.Array instances', function() {
      for (var key in this.particleA.__old) {
        expect(this.particleA.__old[key]).toEqual(jasmine.any(NDP.Array));
      }
    });
    describe('acc, vel, pos', function() {
      beforeEach(function() {
        this.vectorKeys = ['acc', 'vel', 'pos'];
      });
      it('should be an NDP.Array instance', function() {
        for (var i = 0; i < this.vectorKeys.length; i++) {
          var key = this.vectorKeys[i];
          expect(this.particleA.__old[key]).toEqual(jasmine.any(NDP.Array));
        }
      });
      it('should be of length [dimensions]', function() {
        for (var i = 0; i < this.vectorKeys.length; i++) {
          var key = this.vectorKeys[i];
          expect(this.particleA.__old[key].length).toBe(this.particleA.dimensions);
        }
      });
    });
  });

  describe('__defineComponent(index, arrayKey, opt_prefix)', function() {
    beforeEach(function() {
      this.particle1 = new NDP.Particle(1, 1, false, 1);
      this.particle2 = new NDP.Particle(1, 1, false, 2);
      this.particle3 = new NDP.Particle(1, 1, false, 3);
      this.map = [
        {prefix:'a', array:'__acc'},
        {prefix:'v', array:'__vel'},
        {prefix:'' , array:'__pos'}
      ];
      this.particles = [
        this.particle1,
        this.particle2,
        this.particle3
      ];
    });
    it('should add a setter and getter for a prefixed component', function() {
      var particle = new NDP.Particle(1, 1, false, 2);

      // Check component definitions for [cx] and [cy].
      expect(particle.c).toBeUndefined();
      expect(particle.__c).toBeUndefined();
      expect(particle.cx).toBeUndefined();
      expect(particle.__cx).toBeUndefined();
      expect(particle.cy).toBeUndefined();
      expect(particle.__cy).toBeUndefined();

      // Add prefixed x component [cx]
      var X = 0;
      particle.__defineComponent(X, 'acc', 'c');
      expect(particle.cx).toBeDefined();
      expect(particle.__cx).toBeDefined();
      expect(particle.cx).toBe(particle.__acc[X]);
      expect(particle.__cx).toBe(particle.__acc[X]);

      // Add prefixed y component [cy]
      var Y = 1;
      particle.__acc[Y] = 100;
      particle.__defineComponent(Y, 'acc', 'c');
      expect(particle.cy).toBeDefined();
      expect(particle.__cy).toBeDefined();
      expect(particle.cy).toBe(particle.__acc[Y]);
      expect(particle.__cy).toBe(particle.__acc[Y]);
    });
    it('should have defined and set [public] and [__private] properties for acceleration, velocity and position', function() {
      this.particle1.x = 10;
      this.particle2.y = 10;
      this.particle3.z = 10;
      // console.log(JSON.stringify(this.particle1, null, 4));
      // console.log(JSON.stringify(this.particle2, null, 4));
      // console.log(JSON.stringify(this.particle3, null, 4));
      for (var p = 0; p < this.particles.length; p++) {
        var particle = this.particles[p];
        for (var c = 0; c < NDP.COMPONENTS.length; c++) {
          var component = NDP.COMPONENTS[c];
          for (var i = 0; i < this.map.length; i++) {
            var item = this.map[i],
                pubKey = item.prefix + component,
                priKey = '__' + pubKey;
            if (c < particle.dimensions) {
              var arrayValue = particle[item.array][c];
              expect(particle[pubKey]).toBeDefined();
              expect(particle[pubKey]).toBe(arrayValue);
              expect(particle[priKey]).toBeDefined();
              expect(particle[priKey]).toBe(arrayValue);
            } else {
              expect(particle[pubKey]).toBeUndefined();
              expect(particle[priKey]).toBeUndefined();
            }
          }
        }
      }
    });
    it('should set the [public] [__private] [__array] and [__old.array] values for a component', function() {

      // Position
      var NEW_POSITION = 10;
      this.particle3.x = NEW_POSITION;
      expect(this.particle3.x).toBe(NEW_POSITION);
      expect(this.particle3.__x).toBe(NEW_POSITION);
      expect(this.particle3.__pos[0]).toBe(NEW_POSITION);
      expect(this.particle3.__old.pos[0]).toBe(NEW_POSITION);

      // Acceleration
      var NEW_ACCELERATION = 20;
      this.particle3.ay = NEW_ACCELERATION;
      expect(this.particle3.ay).toBe(NEW_ACCELERATION);
      expect(this.particle3.__ay).toBe(NEW_ACCELERATION);
      expect(this.particle3.__acc[1]).toBe(NEW_ACCELERATION);
      expect(this.particle3.__old.acc[1]).toBe(NEW_ACCELERATION);

      // Velocity
      var NEW_VELOCITY = 30;
      this.particle3.vz = NEW_VELOCITY;
      expect(this.particle3.vz).toBe(NEW_VELOCITY);
      expect(this.particle3.__vz).toBe(NEW_VELOCITY);
      expect(this.particle3.__vel[2]).toBe(NEW_VELOCITY);
      expect(this.particle3.__old.vel[2]).toBe(NEW_VELOCITY);
    });
    it('should only accept Number values', function() {

      // Cache position.
      var position = this.particle3.x;
      expect(position).toEqual(jasmine.any(Number));

      // Try setting string value.
      this.particle1.x = 'kittens';
      expect(this.particle1.x).toBe(position);
      expect(this.particle1.__x).toBe(position);
      expect(this.particle1.__pos[0]).toBe(position);
      expect(this.particle1.__old.pos[0]).toBe(position);
    });
  });

  describe('addBehaviour(behaviour)', function() {
    beforeEach(function() {
      this.abstractBehaviour1 = new NDP.Behaviour();
      this.abstractBehaviour2 = new NDP.Behaviour();
      this.constantBehaviour = new NDP.ConstantBehaviour();
      this.collisionBehaviour = new NDP.CollisionBehaviour();
      spyOn(this.collisionBehaviour, 'addParticle');
    });
    it('should add a unique behaviour to the [behaviours] collection', function() {
      expect(this.particleA.behaviours).toEqual([]);

      // Add abstractBehaviour1 for the first time.
      this.particleA.addBehaviour(this.abstractBehaviour1);
      expect(this.particleA.behaviours.length).toBe(1);
      expect(this.particleA.behaviours).toEqualArray([
        this.abstractBehaviour1
      ]);

      // Add abstractBehaviour1 a second time.
      this.particleA.addBehaviour(this.abstractBehaviour1);
      expect(this.particleA.behaviours.length).toBe(1);
      expect(this.particleA.behaviours).toEqualArray([
        this.abstractBehaviour1
      ]);

      // Add constantBehaviour for the first time.
      this.particleA.addBehaviour(this.constantBehaviour);
      expect(this.particleA.behaviours.length).toBe(2);
      expect(this.particleA.behaviours).toEqualArray([
        this.abstractBehaviour1,
        this.constantBehaviour
      ]);

      // Add abstractBehaviour1 a third time.
      this.particleA.addBehaviour(this.abstractBehaviour1);
      expect(this.particleA.behaviours.length).toBe(2);
      expect(this.particleA.behaviours).toEqualArray([
        this.abstractBehaviour1,
        this.constantBehaviour
      ]);

      // Add abstractBehaviour2 for the first time.
      this.particleA.addBehaviour(this.abstractBehaviour2);
      expect(this.particleA.behaviours.length).toBe(3);
      expect(this.particleA.behaviours).toEqualArray([
        this.abstractBehaviour1,
        this.constantBehaviour,
        this.abstractBehaviour2
      ]);
    });
    it('should return the Particle instance that called it', function() {
      expect(this.particleA.addBehaviour(this.abstractBehaviour1)).toBe(this.particleA);
      expect(this.particleA.addBehaviour(this.constantBehaviour)).toBe(this.particleA);
    });
    describe('CollisionBehaviour', function() {
      it('should call addParticle(particle)', function() {
        this.particleA.addBehaviour(this.collisionBehaviour);
        expect(this.particleA.behaviours.length).toBe(1);
        expect(this.particleA.behaviours).toEqualArray([
          this.collisionBehaviour
        ]);
        expect(this.collisionBehaviour.addParticle).toHaveBeenCalledWith(this.particleA);
      });
    });
  });

  describe('removeBehaviour(behaviour)', function() {
    beforeEach(function() {
      this.abstractBehaviour = new NDP.Behaviour();
      this.constantBehaviour = new NDP.ConstantBehaviour();
      this.collisionBehaviour = new NDP.CollisionBehaviour();
      spyOn(this.collisionBehaviour, 'removeParticle');
    });
    it('should remove a behaviour from the [behaviours] collection', function() {
      expect(this.particleA.behaviours).toEqual([]);

      // Add abstractBehaviour for the first time.
      this.particleA.addBehaviour(this.abstractBehaviour);
      expect(this.particleA.behaviours.length).toBe(1);
      expect(this.particleA.behaviours).toEqualArray([
        this.abstractBehaviour
      ]);

      // Remove abstractBehaviour for the first time.
      this.particleA.removeBehaviour(this.abstractBehaviour);
      expect(this.particleA.behaviours.length).toBe(0);
      expect(this.particleA.behaviours).toEqualArray([]);

      // Add abstractBehaviour a second time.
      this.particleA.addBehaviour(this.abstractBehaviour);
      expect(this.particleA.behaviours.length).toBe(1);
      expect(this.particleA.behaviours).toEqualArray([
        this.abstractBehaviour
      ]);

      // Add constantBehaviour for the first time.
      this.particleA.addBehaviour(this.constantBehaviour);
      expect(this.particleA.behaviours.length).toBe(2);
      expect(this.particleA.behaviours).toEqualArray([
        this.abstractBehaviour,
        this.constantBehaviour
      ]);

      // Remove abstractBehaviour a second time.
      this.particleA.removeBehaviour(this.abstractBehaviour);
      expect(this.particleA.behaviours.length).toBe(1);
      expect(this.particleA.behaviours).toEqualArray([
        this.constantBehaviour
      ]);
    });
    it('should return the Particle instance that called it', function() {

      // Test with an empty behaviours collection.
      expect(this.particleA.behaviours).toEqual([]);
      expect(this.particleA.removeBehaviour(this.abstractBehaviour)).toBe(this.particleA);
      expect(this.particleA.removeBehaviour(this.constantBehaviour)).toBe(this.particleA);

      // Test with a populated behaviours collection.
      this.particleA.addBehaviour(this.abstractBehaviour);
      this.particleA.addBehaviour(this.constantBehaviour);
      expect(this.particleA.behaviours).toEqualArray([
        this.abstractBehaviour,
        this.constantBehaviour
      ]);
      expect(this.particleA.removeBehaviour(this.abstractBehaviour)).toBe(this.particleA);
      expect(this.particleA.removeBehaviour(this.constantBehaviour)).toBe(this.particleA);
      expect(this.particleA.behaviours).toEqual([]);
    });
    describe('CollisionBehaviour', function() {
      it('should call removeParticle(particle)', function() {
        this.particleA.addBehaviour(this.collisionBehaviour);
        expect(this.particleA.behaviours.length).toBe(1);
        expect(this.particleA.behaviours).toEqualArray([
          this.collisionBehaviour
        ]);
        this.particleA.removeBehaviour(this.collisionBehaviour);
        expect(this.collisionBehaviour.removeParticle).toHaveBeenCalledWith(this.particleA);
        expect(this.particleA.behaviours).toEqualArray([]);
      });
    });
  });

  describe('update(delta, index)', function() {
    beforeEach(function() {
      this.abstractBehaviour = new NDP.Behaviour();
      this.constantBehaviour = new NDP.ConstantBehaviour();

      spyOn(this.abstractBehaviour, 'apply');
      spyOn(this.constantBehaviour, 'apply');

      this.particle1 = new NDP.Particle(1, 1, false, 2);
      this.particle1.addBehaviour(this.abstractBehaviour);
      this.particle1.addBehaviour(this.constantBehaviour);

      this.particle2 = new NDP.Particle(1, 1, true, 2);
      this.particle2.addBehaviour(this.abstractBehaviour);
      this.particle2.addBehaviour(this.constantBehaviour);
    });
    it('should not call behaviour.apply() when particle.fixed is true', function() {
      expect(this.particle2.fixed).toBe(true);
      expect(this.particle2.behaviours).toEqualArray([
        this.abstractBehaviour,
        this.constantBehaviour
      ]);
      expect(this.abstractBehaviour.apply).not.toHaveBeenCalled();
      expect(this.constantBehaviour.apply).not.toHaveBeenCalled();
      this.particle2.update(10);
      expect(this.abstractBehaviour.apply).not.toHaveBeenCalled();
      expect(this.constantBehaviour.apply).not.toHaveBeenCalled();
    });
    it('should not call behaviour.apply() when [delta] is 0 and particle.fixed is false', function() {
      expect(this.particle1.fixed).toBe(false);
      expect(this.particle1.behaviours).toEqualArray([
        this.abstractBehaviour,
        this.constantBehaviour
      ]);
      expect(this.abstractBehaviour.apply).not.toHaveBeenCalled();
      expect(this.constantBehaviour.apply).not.toHaveBeenCalled();
      this.particle1.update(0);
      expect(this.abstractBehaviour.apply).not.toHaveBeenCalled();
      expect(this.constantBehaviour.apply).not.toHaveBeenCalled();
    });
    it('should not call behaviour.apply() when behaviour.active is false', function() {
      expect(this.particle1.fixed).toBe(false);
      expect(this.particle1.behaviours).toEqualArray([
        this.abstractBehaviour,
        this.constantBehaviour
      ]);
      expect(this.abstractBehaviour.apply).not.toHaveBeenCalled();
      expect(this.constantBehaviour.apply).not.toHaveBeenCalled();

      this.abstractBehaviour.active = false;
      expect(this.abstractBehaviour.active).toBe(false);

      this.particle1.update(1);
      expect(this.abstractBehaviour.apply).not.toHaveBeenCalled();
      expect(this.constantBehaviour.apply).toHaveBeenCalled();

      this.abstractBehaviour.active = true;
      expect(this.abstractBehaviour.active).toBe(true);

      this.particle1.update(1);
      expect(this.abstractBehaviour.apply).toHaveBeenCalled();
      expect(this.constantBehaviour.apply).toHaveBeenCalled();
      expect(this.abstractBehaviour.apply.calls.count()).toBe(1);
      expect(this.constantBehaviour.apply.calls.count()).toBe(2);
    });
    it('should call behaviour.apply() on all registered behaviours', function() {
      expect(this.particle1.fixed).toBe(false);
      expect(this.particle1.behaviours).toEqualArray([
        this.abstractBehaviour,
        this.constantBehaviour
      ]);
      expect(this.abstractBehaviour.apply).not.toHaveBeenCalled();
      expect(this.constantBehaviour.apply).not.toHaveBeenCalled();

      this.particle1.update(1);
      this.particle1.update(1);
      this.particle1.update(1);
      expect(this.abstractBehaviour.apply).toHaveBeenCalled();
      expect(this.constantBehaviour.apply).toHaveBeenCalled();
      expect(this.abstractBehaviour.apply.calls.count()).toBe(3);
      expect(this.constantBehaviour.apply.calls.count()).toBe(3);
    });
    it('should set __private acceleration, velocity and position properties', function() {
    });
    it('should return the Particle instance that called it', function() {
      expect(this.particleA.update(0)).toBe(this.particleA);
      expect(this.particleA.update(0, 0)).toBe(this.particleA);
      expect(this.particleA.update(1, 0)).toBe(this.particleA);
    });
  });
});

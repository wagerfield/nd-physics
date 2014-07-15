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

  describe('mass', function() {
    it('should be a Number', function() {
      expect(this.particleA.mass).toEqual(jasmine.any(Number));
    });
  });

  describe('radius', function() {
    it('should be a Number', function() {
      expect(this.particleA.radius).toEqual(jasmine.any(Number));
    });
  });

  describe('fixed', function() {
    it('should be a Boolean', function() {
      expect(this.particleA.fixed).toEqual(jasmine.any(Boolean));
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
      this.particleB.dimensions = 'kittens';
      expect(this.particleA.dimensions).toBe(dimensions);
    });
  });

  describe('id', function() {
    it('should be an Integer', function() {
      expect(this.particleA.id).toBeAnInteger();
    });
    it('should be readonly', function() {
      var id = this.particleA.id;
      this.particleB.id = 'kittens';
      expect(this.particleA.id).toBe(id);
    });
    it('should be 1 greater than a previously created Particle instance [id]', function() {
      this.particleA = new NDP.Particle(1);
      this.particleB = new NDP.Particle(1);
      expect(this.particleB.id).toBe(this.particleA.id + 1);
    });
  });

  describe('__vector', function() {
    it('should be an Object', function() {
      expect(this.particleA.__vector).toEqual(jasmine.any(Object));
    });
    it('should reference NDP.Vector[particle.dimensions]', function() {
      expect(this.particleA.__vector).toEqual(NDP['Vector' + this.particleA.dimensions]);
    });
    it('should throw an error for cases where a Vector Object is not available', function() {
      expect(function() {
        new NDP.Particle(1, 1, false, 0);
      }).toThrow('Particle: No Vector Object available for [0] dimensions');
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

  describe('addBehaviour(behaviour)', function() {
    it('should return the Particle instance that called it', function() {
      expect(this.particleA.addBehaviour(this.behaviour)).toBe(this.particleA);
    });
  });

  describe('removeBehaviour(behaviour)', function() {
    it('should return the Particle instance that called it', function() {
      expect(this.particleA.removeBehaviour(this.behaviour)).toBe(this.particleA);
    });
  });

  describe('update(delta, index)', function() {
    it('should return the Particle instance that called it', function() {
      expect(this.particleA.update(1, 0)).toBe(this.particleA);
    });
  });
});

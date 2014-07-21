describe('NDP.Spring(p1, p2, length, stiffness)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    this.particleA = new NDP.Particle(1);
    this.particleB = new NDP.Particle(2);
    this.springA = new NDP.Spring(this.particleA, this.particleB, 1, 0.1);
    this.springB = new NDP.Spring(this.particleB, this.particleA, 2, 0.9);
  });

  it('should be a Function Object', function() {
    expect(NDP.Spring).toEqual(jasmine.any(Function));
  });
  it('should throw an error if [p1] or [p2] are not a Particle instances', function() {
    expect(function() {
      new NDP.Spring();
    }).toThrow('Spring: p1 must be a Particle instance [undefined]');
    expect(function() {
      new NDP.Spring('kittens');
    }).toThrow('Spring: p1 must be a Particle instance [kittens]');
    expect(function() {
      new NDP.Spring(new NDP.Particle(1));
    }).toThrow('Spring: p2 must be a Particle instance [undefined]');
    expect(function() {
      new NDP.Spring(new NDP.Particle(1), 'kittens');
    }).toThrow('Spring: p2 must be a Particle instance [kittens]');
  });
  it('should throw an error if [p1] === [p2]', function() {
    expect(function() {
      var p = new NDP.Particle(1, 1, false, 1);
      new NDP.Spring(p, p);
    }).toThrow('Spring: p1 and p2 cannot be the same Particle instance');
  });
  it('should throw an error if [p1.dimensions] !== [p2.dimensions]', function() {
    expect(function() {
      var p1 = new NDP.Particle(1, 1, false, 1);
      var p2 = new NDP.Particle(1, 1, false, 2);
      new NDP.Spring(p1, p2, 1, 1);
    }).toThrow('Spring: Particles must have equal dimensions. p1.dimensions[1] p2.dimensions[2]');
  });
  it('should throw an error if [length] is not a Number', function() {
    var p1 = new NDP.Particle(1, 1, false, 2);
    var p2 = new NDP.Particle(1, 1, false, 2);
    expect(function() {
      new NDP.Spring(p1, p2);
    }).toThrow('Spring: length must be a Number [undefined]');
    expect(function() {
      new NDP.Spring(p1, p2, 'kittens');
    }).toThrow('Spring: length must be a Number [kittens]');
  });
  it('should throw an error if [stiffness] is not a Number', function() {
    var p1 = new NDP.Particle(1, 1, false, 2);
    var p2 = new NDP.Particle(1, 1, false, 2);
    expect(function() {
      new NDP.Spring(p1, p2, 1);
    }).toThrow('Spring: stiffness must be a Number [undefined]');
    expect(function() {
      new NDP.Spring(p1, p2, 1, 'kittens');
    }).toThrow('Spring: stiffness must be a Number [kittens]');
  });

  describe('constructor.__uid', function() {
    it('should be an Integer', function() {
      expect(NDP.Spring.__uid).toBeAnInteger();
      expect(this.springA.constructor.__uid).toBeAnInteger();
    });
    it('should increment with each new Spring instance', function() {
      var uid = NDP.Spring.__uid;
      new NDP.Spring(this.particleA, this.particleB, 1, 1);
      expect(NDP.Spring.__uid).toBe(uid + 1);
    });
  });

  describe('id', function() {
    it('should be an Integer', function() {
      expect(this.springA.id).toBeAnInteger();
    });
    it('should be readonly', function() {
      var id = this.springA.id;
      this.springA.id = 'kittens';
      this.springA.id = 1000000;
      expect(this.springA.id).toBe(id);
    });
    it('should be 1 greater than a previously created Spring instance [id]', function() {
      expect(this.springB.id).toBe(this.springA.id + 1);
    });
  });

  describe('p1 and p2', function() {
    it('should be Particle instances', function() {
      expect(this.springA.p1).toEqual(jasmine.any(NDP.Particle));
      expect(this.springA.p2).toEqual(jasmine.any(NDP.Particle));
    });
    it('should be exposed on a __private property', function() {
      expect(this.springA.__p1).toEqual(jasmine.any(NDP.Particle));
      expect(this.springA.__p2).toEqual(jasmine.any(NDP.Particle));
    });
    it('should only accept Particle instances', function() {
      var p1 = this.springA.p1;
      var p2 = this.springA.p2;
      this.springA.p1 = 'cats';
      this.springA.p2 = 'dogs';
      expect(this.springA.p1).toBe(p1);
      expect(this.springA.p2).toBe(p2);

      var p3 = new NDP.Particle(1);
      var p4 = new NDP.Particle(2);
      this.springA.p1 = p3;
      this.springA.p2 = p4;
      expect(this.springA.p1).toBe(p3);
      expect(this.springA.p2).toBe(p4);
    });
  });

  describe('length', function() {
    it('should be a Number', function() {
      expect(this.springA.length).toEqual(jasmine.any(Number));
    });
    it('should be exposed on a __private property', function() {
      expect(this.springA.__length).toEqual(jasmine.any(Number));
    });
    it('should only accept Number values', function() {
      var length = this.springA.length;
      this.springA.length = 'cats';
      expect(this.springA.length).toBe(length);

      this.springA.length += 10;
      expect(this.springA.length).toBe(length + 10);
    });
  });

  describe('stiffness', function() {
    it('should be a Number', function() {
      expect(this.springA.stiffness).toEqual(jasmine.any(Number));
    });
    it('should be exposed on a __private property', function() {
      expect(this.springA.__stiffness).toEqual(jasmine.any(Number));
    });
    it('should only accept Number values', function() {
      var stiffness = this.springA.stiffness;
      this.springA.stiffness = 'cats';
      expect(this.springA.stiffness).toBe(stiffness);

      this.springA.stiffness += 10;
      expect(this.springA.stiffness).toBe(stiffness + 10);
    });
  });

  describe('__vector', function() {
    it('should be an Object', function() {
      expect(this.springA.__vector).toEqual(jasmine.any(Object));
    });
    it('should reference NDP.Vector[p1.dimensions]', function() {
      expect(this.springA.__vector).toEqual(NDP['Vector' + this.springA.p1.dimensions]);
    });
  });

  describe('__delta, __slave', function() {
    beforeEach(function() {
      this.vectorKeys = ['__delta', '__slave'];
    });
    it('should be __private', function() {
      for (var i = 0; i < this.vectorKeys.length; i++) {
        var privateKey = this.vectorKeys[i];
        var publicKey = privateKey.replace(/_/g, '');
        expect(this.springA[privateKey]).toBeDefined();
        expect(this.springA[publicKey]).toBeUndefined();
      }
    });
    it('should be an NDP.Array instance', function() {
      for (var i = 0; i < this.vectorKeys.length; i++) {
        expect(this.springA[this.vectorKeys[i]]).toEqual(jasmine.any(NDP.Array));
      }
    });
    it('should be of length [p1.dimensions]', function() {
      for (var i = 0; i < this.vectorKeys.length; i++) {
        expect(this.springA[this.vectorKeys[i]].length).toBe(this.springA.p1.dimensions);
      }
    });
  });

  describe('update(delta, index)', function() {
    it('should return the Spring instance that called it', function() {
      expect(this.springA.update()).toBe(this.springA);
      expect(this.springA.update(0)).toBe(this.springA);
      expect(this.springA.update(0, 0)).toBe(this.springA);
    });
  });

  describe('apply(particle, force)', function() {
    it('should return the Spring instance that called it', function() {
      this.springA.p1.fixed = false;
      this.springA.p2.fixed = true;
      expect(this.springA.apply(this.springA.p1)).toBe(this.springA);
      expect(this.springA.apply(this.springA.p2)).toBe(this.springA);
    });
  });
});

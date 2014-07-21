describe('NDP.Integrator(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    NDP.DIMENSIONS = 2;
    this.integratorA = new NDP.Integrator();
    this.integratorB = new NDP.Integrator(1);
  });

  it('should be a Function Object', function() {
    expect(NDP.Integrator).toEqual(jasmine.any(Function));
  });
  it('should default [dimensions] to NDP.DIMENSIONS', function() {
    expect(this.integratorA.dimensions).toBe(NDP.DIMENSIONS);
  });
  it('should set [dimensions] to the first argument if passed', function() {
    this.integratorA = new NDP.Integrator(1);
    expect(this.integratorA.dimensions).toBe(1);

    this.integratorB = new NDP.Integrator(2);
    expect(this.integratorB.dimensions).toBe(2);
  });
  it('should only accept Numbers and set [dimensions] to an Integer', function() {
    this.integratorA = new NDP.Integrator('1');
    expect(this.integratorA.dimensions).toBe(NDP.DIMENSIONS);

    this.integratorA = new NDP.Integrator('cats');
    expect(this.integratorA.dimensions).toBe(NDP.DIMENSIONS);

    this.integratorA = new NDP.Integrator(2.8);
    expect(this.integratorA.dimensions).toBe(2);

    this.integratorA = new NDP.Integrator(3.2);
    expect(this.integratorA.dimensions).toBe(3);
  });
  it('should set [__dimensions] to [dimensions]', function() {
    expect(this.integratorA.__dimensions).toBe(this.integratorA.dimensions);
  });

  describe('dimensions', function() {
    it('should be an Integer', function() {
      expect(this.integratorA.dimensions).toBeAnInteger();
    });
    it('should be readonly', function() {
      var dimensions = this.integratorA.dimensions;
      this.integratorA.dimensions = 100;
      expect(this.integratorA.dimensions).toBe(dimensions);
    });
    it('should have a private __dimensions counterpart', function() {
      expect(this.integratorA.__dimensions).toBe(this.integratorA.dimensions);
      expect(this.integratorA.__dimensions).toBeAnInteger();
    });
  });

  describe('__vector', function() {
    it('should be an Object', function() {
      expect(this.integratorA.__vector).toEqual(jasmine.any(Object));
    });
    it('should reference NDP.Vector[dimensions]', function() {
      expect(this.integratorA.__vector).toEqual(NDP['Vector' + this.integratorA.dimensions]);
    });
    it('should throw an error for cases where a Vector Object is not available', function() {
      expect(function() {
        new NDP.Integrator(0);
      }).toThrow('Integrator: No Vector Object available for [0] dimensions');
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
        expect(this.integratorA[privateKey]).toBeDefined();
        expect(this.integratorA[publicKey]).toBeUndefined();
      }
    });
    it('should be an NDP.Array instance', function() {
      for (var i = 0; i < this.vectorKeys.length; i++) {
        expect(this.integratorA[this.vectorKeys[i]]).toEqual(jasmine.any(NDP.Array));
      }
    });
    it('should be of length [dimensions]', function() {
      for (var i = 0; i < this.vectorKeys.length; i++) {
        expect(this.integratorA[this.vectorKeys[i]].length).toBe(this.integratorA.dimensions);
      }
    });
  });

  describe('integrate(particles, delta, lubricity)', function() {
    beforeEach(function() {
      this.particles = [
        this.particleA = new NDP.Particle(1, 1, false),
        this.particleB = new NDP.Particle(2, 2, true),
        this.particleC = new NDP.Particle(3, 2, false)
      ];
      spyOn(this.integratorA, '__integrate');
    });
    it('should call __integrate(particle, delta, lubricity) for each unfixed particle', function() {
      this.integratorA.integrate(this.particles);
      expect(this.integratorA.__integrate.calls.count()).toBe(2);
    });
    it('should call __integrate(particle, delta, lubricity) passing the unfixed particle instance', function() {
      var DELTA = 2, LUBRICITY = 0.5;
      this.integratorA.integrate(this.particles, DELTA, LUBRICITY);
      expect(this.integratorA.__integrate).toHaveBeenCalledWith(this.particleA, DELTA, LUBRICITY);
      expect(this.integratorA.__integrate).not.toHaveBeenCalledWith(this.particleB, DELTA, LUBRICITY);
      expect(this.integratorA.__integrate).toHaveBeenCalledWith(this.particleC, DELTA, LUBRICITY);
    });
  });

  describe('__integrate(particle, delta, lubricity)', function() {
    beforeEach(function() {
      this.particleA = new NDP.Particle(1, 1, false);
      this.particleB = new NDP.Particle(2, 2, true);
      spyOn(this.integratorA.__vector, 'copy');
    });
    it('should be defined', function() {
      expect(this.integratorA.__integrate).toBeDefined();
    });
    it('should call copy on [__vector], passing [particle.__pos]', function() {
      var DELTA = 2, LUBRICITY = 0.5;
      this.integratorA.__integrate(this.particleA, DELTA, LUBRICITY);
      expect(this.integratorA.__vector.copy).toHaveBeenCalledWith(this.particleA.__pos, this.particleA.__pos);
    });
  });
});

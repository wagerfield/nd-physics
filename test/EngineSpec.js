describe('NDP.Engine(opt_integrator, opt_physical)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);

    this.integratorA = new NDP.Integrator();
    this.integratorB = new NDP.Integrator();
    this.engineA = new NDP.Engine();
    this.engineB = new NDP.Engine(this.integratorA, true);

    this.particleA = new NDP.Particle();
    this.particleB = new NDP.Particle();
    this.springA = new NDP.Spring(this.particleA, this.particleB);
  });

  it('should be a Function Object', function() {
    expect(NDP.Engine).toEqual(jasmine.any(Function));
  });
  it('should take and set [integrator] as the first optional argument', function() {
    var engineA = new NDP.Engine();
    var engineB = new NDP.Engine();
    expect(engineA.integrator).toEqual(jasmine.any(NDP.Integrator));
    expect(engineA.integrator).not.toBe(engineB.integrator);

    var integrator = new NDP.Integrator();
    var engineC = new NDP.Engine(integrator);
    var engineD = new NDP.Engine(integrator);
    expect(engineC.integrator).toBe(integrator);
    expect(engineC.integrator).toBe(engineD.integrator);
  });
  it('should take and set [physical] as the second optional argument', function() {
    var engineA = new NDP.Engine();
    expect(engineA.physical).toEqual(jasmine.any(Boolean));
    expect(engineA.physical).toBe(false);

    var engineB = new NDP.Engine(new NDP.Integrator(), true);
    expect(engineB.physical).toEqual(jasmine.any(Boolean));
    expect(engineB.physical).toBe(true);
  });

  describe('__buffer', function() {
    it('should be __private', function() {
      expect(this.engineA.__buffer).toBeDefined();
      expect(this.engineA.buffer).toBeUndefined();
    });
    it('should be a Number', function() {
      expect(this.engineA.__buffer).toEqual(jasmine.any(Number));
    });
    it('should be 0 initially', function() {
      expect(this.engineA.__buffer).toBe(0);
    });
  });

  describe('__time', function() {
    it('should be __private', function() {
      expect(this.engineA.__time).toBeDefined();
      expect(this.engineA.time).toBeUndefined();
    });
    it('should be null initially', function() {
      expect(this.engineA.__time).toBeNull();
    });
    it('should be null initially', function() {
      expect(this.engineA.__time).toBeNull();
    });
    it('should be an Integer after calling step()', function() {
      expect(this.engineA.__time).toBeNull();
      this.engineA.step();
      expect(this.engineA.__time).toBeAnInteger();
    });
    it('should increment by a predetermined delta after calling step() again', function(done) {
      var delay = 100;
      var engine = this.engineA;
      engine.step();
      var timeA = engine.__time;
      setTimeout(function() {
        engine.step();
        var timeB = engine.__time;
        var delta = timeB - timeA;
        expect(delta >= delay).toBeTruthy();
        done();
      }, delay);
    });
  });

  describe('particles', function() {
    it('should be an Array', function() {
      expect(this.engineA.particles).toEqual(jasmine.any(Array));
    });
    it('should create a new Array per instance', function() {
      expect(this.engineA.particles).not.toBe(this.engineB.particles);
    });
    it('should be empty initially', function() {
      expect(this.engineA.particles).toEqual([]);
    });
    it('should be writable', function() {
      var particles = this.engineA.particles;
      this.engineA.particles = this.engineB.particles;
      expect(this.engineA.particles).not.toBe(particles);
      expect(this.engineA.particles).toBe(this.engineB.particles);
    });
  });

  describe('springs', function() {
    it('should be an Array', function() {
      expect(this.engineA.springs).toEqual(jasmine.any(Array));
    });
    it('should create a new Array per instance', function() {
      expect(this.engineA.springs).not.toBe(this.engineB.springs);
    });
    it('should be empty initially', function() {
      expect(this.engineA.springs).toEqual([]);
    });
    it('should be writable', function() {
      var springs = this.engineA.springs;
      this.engineA.springs = this.engineB.springs;
      expect(this.engineA.springs).not.toBe(springs);
      expect(this.engineA.springs).toBe(this.engineB.springs);
    });
  });

  describe('integrator', function() {
    it('should be an Integrator', function() {
      expect(this.engineA.integrator).toEqual(jasmine.any(NDP.Integrator));
    });
    it('should be [opt_integrator] if passed to the first argument', function() {
      expect(this.engineB.integrator).toBe(this.integratorA);
    });
    it('should be writable', function() {
      expect(this.engineB.integrator).toBe(this.integratorA);
      this.engineB.integrator = this.integratorB;
      expect(this.engineB.integrator).toBe(this.integratorB);
    });
  });

  describe('physical', function() {
    it('should be a Boolean', function() {
      expect(this.engineA.physical).toEqual(jasmine.any(Boolean));
    });
    it('should be false by default', function() {
      expect(this.engineA.physical).toBe(false);
    });
    it('should be [opt_physical] if passed to the second argument', function() {
      expect(this.engineB.physical).toBe(true);
    });
    it('should be writable', function() {
      expect(this.engineA.physical).toBe(false);
      this.engineA.physical = true;
      expect(this.engineA.physical).toBe(true);
    });
  });

  describe('lubricity', function() {
    it('should be a Number', function() {
      expect(this.engineA.lubricity).toEqual(jasmine.any(Number));
    });
    it('should be 0.999 by default', function() {
      expect(this.engineA.lubricity).toBe(0.999);
    });
    it('should be writable', function() {
      expect(this.engineA.lubricity).toBe(0.999);
      this.engineA.lubricity = 0.5;
      expect(this.engineA.lubricity).toBe(0.5);
    });
    it('should clamp values to be greater than 0 and less than 1', function() {
      expect(this.engineA.lubricity).toBeLessThan(1);
      expect(this.engineA.lubricity).toBeGreaterThan(0);

      this.engineA.lubricity = 2;
      expect(this.engineA.lubricity).toBeLessThan(1);
      expect(this.engineA.lubricity).toBeGreaterThan(0);
      expect(this.engineA.lubricity).toBe(0.999999);

      this.engineA.lubricity = -2;
      expect(this.engineA.lubricity).toBeLessThan(1);
      expect(this.engineA.lubricity).toBeGreaterThan(0);
      expect(this.engineA.lubricity).toBe(0.000001);
    });
  });

  describe('timeStep', function() {
  });

  describe('maxSteps', function() {
  });

  describe('addParticle(particle)', function() {
  });

  describe('removeParticle(particle)', function() {
  });

  describe('addSpring(spring)', function() {
  });

  describe('removeSpring(spring)', function() {
  });

  describe('step()', function() {
  });

  describe('integrate(delta)', function() {
  });
});

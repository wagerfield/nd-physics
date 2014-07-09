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
    this.springB = new NDP.Spring(this.particleB, this.particleA);
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
    it('should only accept Boolean values', function() {
      var physical = this.engineA.physical;
      this.engineA.physical = 'kittens';
      expect(this.engineA.physical).toBe(physical);
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
    it('should only accept Numeric values', function() {
      var lubricity = this.engineA.lubricity;
      this.engineA.lubricity = 'kittens';
      expect(this.engineA.lubricity).toBe(lubricity);
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
    it('should be a Number', function() {
      expect(this.engineA.timeStep).toEqual(jasmine.any(Number));
    });
    it('should be 1/60 by default', function() {
      expect(this.engineA.timeStep).toBe(1/60);
    });
    it('should be writable', function() {
      expect(this.engineA.timeStep).toBe(1/60);
      this.engineA.timeStep = 1/30;
      expect(this.engineA.timeStep).toBe(1/30);
    });
    it('should only accept Numeric values', function() {
      var timeStep = this.engineA.timeStep;
      this.engineA.timeStep = 'kittens';
      expect(this.engineA.timeStep).toBe(timeStep);
    });
  });

  describe('maxSteps', function() {
    it('should be a Number', function() {
      expect(this.engineA.maxSteps).toEqual(jasmine.any(Number));
    });
    it('should be 4 by default', function() {
      expect(this.engineA.maxSteps).toBe(4);
    });
    it('should be writable', function() {
      expect(this.engineA.maxSteps).toBe(4);
      this.engineA.maxSteps = 2;
      expect(this.engineA.maxSteps).toBe(2);
    });
    it('should only accept Numeric values', function() {
      var maxSteps = this.engineA.maxSteps;
      this.engineA.maxSteps = 'kittens';
      expect(this.engineA.maxSteps).toBe(maxSteps);
    });
    it('should floor Numeric values', function() {
      this.engineA.maxSteps = 1.1;
      expect(this.engineA.maxSteps).toBe(1);
      this.engineA.maxSteps = 2.5;
      expect(this.engineA.maxSteps).toBe(2);
      this.engineA.maxSteps = 3.9;
      expect(this.engineA.maxSteps).toBe(3);
    });
    it('should clamp values between 1 and 10', function() {
      this.engineA.maxSteps = 0;
      expect(this.engineA.maxSteps).toBe(1);
      this.engineA.maxSteps = 20;
      expect(this.engineA.maxSteps).toBe(10);
    });
  });

  describe('addParticle(particle)', function() {
    it('should add a particle to the [particles] collection', function() {
      expect(this.engineA.particles.length).toBe(0);

      this.engineA.addParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(1);
      expect(this.engineA.particles[0]).toBe(this.particleA);

      this.engineA.addParticle(this.particleB);
      expect(this.engineA.particles.length).toBe(2);
      expect(this.engineA.particles[1]).toBe(this.particleB);
    });
    it('should only accept Particle instances', function() {
      expect(this.engineA.particles.length).toBe(0);

      this.engineA.addParticle('cats');
      expect(this.engineA.particles.length).toBe(0);

      this.engineA.addParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(1);
      expect(this.engineA.particles[0]).toBe(this.particleA);

      this.engineA.addParticle(this.springA);
      expect(this.engineA.particles.length).toBe(1);

      this.engineA.addParticle(this.particleB);
      expect(this.engineA.particles.length).toBe(2);
      expect(this.engineA.particles[1]).toBe(this.particleB);

      expect(this.engineA.particles).toOnlyContain(jasmine.any(NDP.Particle));
    });
    it('should only accept unique Particle instances', function() {
      expect(this.engineA.particles.length).toBe(0);

      this.engineA.addParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(1);
      expect(this.engineA.particles[0]).toBe(this.particleA);

      this.engineA.addParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(1);
      expect(this.engineA.particles[0]).toBe(this.particleA);

      this.engineA.addParticle(this.particleB);
      expect(this.engineA.particles.length).toBe(2);
      expect(this.engineA.particles[1]).toBe(this.particleB);

      this.engineA.addParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(2);
      expect(this.engineA.particles[0]).toBe(this.particleA);
      expect(this.engineA.particles[1]).toBe(this.particleB);
    });
    it('should return the Engine instance that called it', function() {
      expect(this.engineA.addParticle(this.particleA)).toBe(this.engineA);
      expect(this.engineB.addParticle(this.particleB)).toBe(this.engineB);
    });
  });

  describe('removeParticle(particle)', function() {
    beforeEach(function() {
      this.engineA.addParticle(this.particleA);
      this.engineA.addParticle(this.particleB);
    });
    it('should remove a particle from the [particles] collection', function() {
      expect(this.engineA.particles.length).toBe(2);
      expect(this.engineA.particles[0]).toBe(this.particleA);
      expect(this.engineA.particles[1]).toBe(this.particleB);

      this.engineA.removeParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(1);
      expect(this.engineA.particles[0]).toBe(this.particleB);
      expect(this.engineA.particles[1]).toBeUndefined();

      this.engineA.removeParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(1);
      expect(this.engineA.particles[0]).toBe(this.particleB);
      expect(this.engineA.particles[1]).toBeUndefined();

      this.engineA.removeParticle(this.particleB);
      expect(this.engineA.particles.length).toBe(0);
      expect(this.engineA.particles[0]).toBeUndefined();
      expect(this.engineA.particles[1]).toBeUndefined();
    });
    it('should return the Engine instance that called it', function() {
      expect(this.engineA.removeParticle(this.particleA)).toBe(this.engineA);
      expect(this.engineB.removeParticle(this.particleB)).toBe(this.engineB);
    });
  });

  describe('addSpring(spring)', function() {
    it('should add a spring to the [springs] collection', function() {
      expect(this.engineA.springs.length).toBe(0);

      this.engineA.addSpring(this.springA);
      expect(this.engineA.springs.length).toBe(1);
      expect(this.engineA.springs[0]).toBe(this.springA);

      this.engineA.addSpring(this.springB);
      expect(this.engineA.springs.length).toBe(2);
      expect(this.engineA.springs[1]).toBe(this.springB);
    });
    it('should only accept Spring instances', function() {
      expect(this.engineA.springs.length).toBe(0);

      this.engineA.addSpring('dogs');
      expect(this.engineA.springs.length).toBe(0);

      this.engineA.addSpring(this.springA);
      expect(this.engineA.springs.length).toBe(1);
      expect(this.engineA.springs[0]).toBe(this.springA);

      this.engineA.addSpring(this.particleA);
      expect(this.engineA.springs.length).toBe(1);

      this.engineA.addSpring(this.springB);
      expect(this.engineA.springs.length).toBe(2);
      expect(this.engineA.springs[1]).toBe(this.springB);

      expect(this.engineA.springs).toOnlyContain(jasmine.any(NDP.Spring));
    });
    it('should only accept unique Spring instances', function() {
      expect(this.engineA.springs.length).toBe(0);

      this.engineA.addSpring(this.springA);
      expect(this.engineA.springs.length).toBe(1);
      expect(this.engineA.springs[0]).toBe(this.springA);

      this.engineA.addSpring(this.springA);
      expect(this.engineA.springs.length).toBe(1);
      expect(this.engineA.springs[0]).toBe(this.springA);

      this.engineA.addSpring(this.springB);
      expect(this.engineA.springs.length).toBe(2);
      expect(this.engineA.springs[1]).toBe(this.springB);

      this.engineA.addSpring(this.springA);
      expect(this.engineA.springs.length).toBe(2);
      expect(this.engineA.springs[0]).toBe(this.springA);
      expect(this.engineA.springs[1]).toBe(this.springB);
    });
    it('should return the Engine instance that called it', function() {
      expect(this.engineA.addSpring(this.springA)).toBe(this.engineA);
      expect(this.engineB.addSpring(this.springB)).toBe(this.engineB);
    });
  });

  describe('removeSpring(spring)', function() {
    beforeEach(function() {
      this.engineA.addSpring(this.springA);
      this.engineA.addSpring(this.springB);
    });
    it('should remove a spring from the [springs] collection', function() {
      expect(this.engineA.springs.length).toBe(2);
      expect(this.engineA.springs[0]).toBe(this.springA);
      expect(this.engineA.springs[1]).toBe(this.springB);

      this.engineA.removeSpring(this.springA);
      expect(this.engineA.springs.length).toBe(1);
      expect(this.engineA.springs[0]).toBe(this.springB);
      expect(this.engineA.springs[1]).toBeUndefined();

      this.engineA.removeSpring(this.springA);
      expect(this.engineA.springs.length).toBe(1);
      expect(this.engineA.springs[0]).toBe(this.springB);
      expect(this.engineA.springs[1]).toBeUndefined();

      this.engineA.removeSpring(this.springB);
      expect(this.engineA.springs.length).toBe(0);
      expect(this.engineA.springs[0]).toBeUndefined();
      expect(this.engineA.springs[1]).toBeUndefined();
    });
    it('should return the Engine instance that called it', function() {
      expect(this.engineA.removeSpring(this.springA)).toBe(this.engineA);
      expect(this.engineB.removeSpring(this.springB)).toBe(this.engineB);
    });
  });

  describe('step()', function() {
    it('should return the Engine instance that called it', function() {
      expect(this.engineA.step()).toBe(this.engineA);
    });
  });

  describe('integrate(delta)', function() {
    it('should return if [delta] is 0', function() {
    });
    it('should return if there are no [particles]', function() {
    });
    it('should call particles[n].update(delta, index)', function() {
    });
    it('should call integrator.integrate(particles, delta, lubricity)', function() {
    });
    it('should call springs[n].update(delta, index)', function() {
    });
    it('should call, in order, particles[n].update(), integrator.integrate(), springs[n].update()', function() {
    });
    it('should return the Engine instance that called it', function() {
      expect(this.engineA.integrate(100)).toBe(this.engineA);
    });
  });
});

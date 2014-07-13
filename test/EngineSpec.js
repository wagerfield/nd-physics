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

  describe('__delta', function() {
    it('should be __private', function() {
      expect(this.engineA.__delta).toBeDefined();
      expect(this.engineA.delta).toBeUndefined();
    });
    it('should be null initially', function() {
      expect(this.engineA.__delta).toBeNull();
    });
    it('should be a Number after calling step() twice over time', function(done) {
      var delay = 1;
      var engine = this.engineA;
      expect(engine.__delta).toBeNull();
      setTimeout(function() {
        engine.step();
        expect(engine.__delta).toEqual(jasmine.any(Number));
        done();
      }, delay);
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
    it('should be an Integer after calling step()', function() {
      expect(this.engineA.__time).toBeNull();
      this.engineA.step();
      expect(this.engineA.__time).toEqual(jasmine.any(Number));
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
    beforeEach(function() {
      this.engineA = new NDP.Engine(this.integratorA, true);
      this.engineB = new NDP.Engine(this.integratorB, false);
      spyOn(this.engineA, 'integrate');
      spyOn(this.engineB, 'integrate');
    });
    it('should set [__time] if called for the first time', function() {
      expect(this.engineA.__time).toBeNull();
      this.engineA.step();
      expect(this.engineA.__time).not.toBeNull();
      expect(this.engineA.__time).toEqual(jasmine.any(Number));
    });
    it('should return the Engine instance if [time delta] <= 0', function() {
      expect(this.engineA.__time).toBeNull();
      expect(this.engineA.__delta).toBeNull();
      this.engineA.step();
      expect(this.engineA.step(this.engineA.__time)).toBe(this.engineA);
      expect(this.engineA.step(this.engineA.__time * 2)).toBe(this.engineA);
    });
    it('should set [__delta] to [time delta] converted from milliseconds to seconds', function() {
      expect(this.engineA.__time).toBeNull();
      expect(this.engineA.__delta).toBeNull();
      this.engineA.step();
      this.engineA.step(this.engineA.__time + 1000);
      expect(this.engineA.__delta).toBe(1);
    });
    it('should increment [__buffer] by [__delta]', function() {
      expect(this.engineB.__time).toBeNull();
      expect(this.engineB.__delta).toBeNull();
      expect(this.engineB.__buffer).toBe(0);
      this.engineB.step();
      var buffer = this.engineB.__buffer;
      // Only works with values > timeStep when engine isn't using physical integration
      this.engineB.step(this.engineB.__time + 1000);
      expect(this.engineB.__buffer).toBe(buffer + 1);
    });
    it('should use [timeStep] delta integration when [physical] is true', function() {
      expect(this.engineA.physical).toBe(true);
      this.engineA.step();
      this.engineA.step(this.engineA.__time + this.engineA.timeStep * 2 * 1000);
      expect(this.engineA.integrate).toHaveBeenCalledWith(this.engineA.timeStep);
      expect(this.engineA.integrate.calls.count()).toEqual(2);
    });
    it('should reduce [__buffer] if [__buffer] >= [timeStep]', function() {
      var INTEGRATIONS = 3;
      expect(this.engineA.physical).toBe(true);
      this.engineA.step();
      this.engineA.step(this.engineA.__time + this.engineA.timeStep * 1000 * INTEGRATIONS);
      expect(this.engineA.integrate).toHaveBeenCalledWith(this.engineA.timeStep);
      expect(this.engineA.integrate.calls.count()).toEqual(INTEGRATIONS);
      expect(this.engineA.__buffer).toBeCloseTo(0);
    });
    it('should exit [__buffer] reduction loop if [maxSteps] is exceeded', function() {
      var OVERFLOW = 2;
      var INTEGRATIONS = this.engineA.maxSteps + OVERFLOW;
      expect(this.engineA.physical).toBe(true);
      this.engineA.step();
      this.engineA.step(this.engineA.__time + this.engineA.timeStep * 1000 * INTEGRATIONS);
      expect(this.engineA.integrate).toHaveBeenCalledWith(this.engineA.timeStep);
      expect(this.engineA.integrate.calls.count()).toEqual(this.engineA.maxSteps);
      expect(this.engineA.__buffer).toBeCloseTo(this.engineA.timeStep * OVERFLOW);
    });
    it('should use [__delta] integration when [physical] is false', function() {
      expect(this.engineB.physical).toBe(false);
      this.engineB.step();
      expect(this.engineB.integrate).toHaveBeenCalledWith(this.engineB.__delta);
      this.engineB.step();
      expect(this.engineB.integrate).toHaveBeenCalledWith(this.engineB.__delta);
    });
    it('should return the Engine instance that called it', function() {
      expect(this.engineA.step()).toBe(this.engineA);
    });
  });

  describe('integrate(delta)', function() {
    beforeEach(function() {
      this.deltaA = 1;
      this.deltaB = 2;
      this.engineA = new NDP.Engine(this.integratorA);
      this.particles = this.engineA.particles;
      this.lubricity = this.engineA.lubricity;
      this.calls = [];
      spyOn(this.integratorA, 'integrate');
      spyOn(this.particleA, 'update');
      spyOn(this.particleB, 'update');
      spyOn(this.springA, 'update');
      spyOn(this.springB, 'update');
    });
    it('should return the Engine instance if [delta] is 0', function() {
      this.engineA.addParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(1);
      expect(this.integratorA.integrate).not.toHaveBeenCalled();

      expect(this.engineA.integrate()).toBe(this.engineA);
      expect(this.integratorA.integrate).not.toHaveBeenCalled();

      this.engineA.integrate(this.deltaA);
      expect(this.integratorA.integrate).toHaveBeenCalledWith(this.particles, this.deltaA, this.lubricity);
    });
    it('should return the Engine instance if there are no [particles]', function() {
      expect(this.engineA.particles.length).toBe(0);
      expect(this.integratorA.integrate).not.toHaveBeenCalled();

      expect(this.engineA.integrate(this.deltaA)).toBe(this.engineA);
      expect(this.integratorA.integrate).not.toHaveBeenCalled();

      this.engineA.addParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(1);

      this.engineA.integrate(this.deltaA);
      expect(this.integratorA.integrate).toHaveBeenCalledWith(this.particles, this.deltaA, this.lubricity);
    });
    it('should call particles[n].update(delta, index)', function() {
      this.engineA.addParticle(this.particleA);
      expect(this.engineA.particles.length).toBe(1);
      expect(this.particleA.update).not.toHaveBeenCalled();

      this.engineA.integrate(this.deltaA);
      expect(this.particleA.update).toHaveBeenCalledWith(this.deltaA, 0);

      this.engineA.addParticle(this.particleB);
      expect(this.engineA.particles.length).toBe(2);
      expect(this.particleB.update).not.toHaveBeenCalled();

      this.engineA.integrate(this.deltaB);
      expect(this.particleA.update).toHaveBeenCalledWith(this.deltaB, 0);
      expect(this.particleB.update).toHaveBeenCalledWith(this.deltaB, 1);

      expect(this.particleA.update.calls.count()).toEqual(2);
      expect(this.particleB.update.calls.count()).toEqual(1);
    });
    it('should call integrator.integrate(particles, delta, lubricity)', function() {
      expect(this.integratorA.integrate).not.toHaveBeenCalled();

      this.engineA.addParticle(this.particleA);
      this.engineA.integrate(this.deltaA);
      expect(this.integratorA.integrate).toHaveBeenCalledWith(this.particles, this.deltaA, this.lubricity);
      expect(this.integratorA.integrate.calls.count()).toEqual(1);

      this.engineA.integrate(this.deltaB);
      expect(this.integratorA.integrate).toHaveBeenCalledWith(this.particles, this.deltaB, this.lubricity);
      expect(this.integratorA.integrate.calls.count()).toEqual(2);
    });
    it('should call springs[n].update(delta, index)', function() {
      this.engineA.addParticle(this.particleA);
      this.engineA.addSpring(this.springA);
      expect(this.engineA.springs.length).toBe(1);
      expect(this.springA.update).not.toHaveBeenCalled();

      this.engineA.integrate(this.deltaA);
      expect(this.springA.update).toHaveBeenCalledWith(this.deltaA, 0);

      this.engineA.addSpring(this.springB);
      expect(this.engineA.springs.length).toBe(2);
      expect(this.particleB.update).not.toHaveBeenCalled();

      this.engineA.integrate(this.deltaB);
      expect(this.springA.update).toHaveBeenCalledWith(this.deltaB, 0);
      expect(this.springB.update).toHaveBeenCalledWith(this.deltaB, 1);

      expect(this.springA.update.calls.count()).toEqual(2);
      expect(this.springB.update.calls.count()).toEqual(1);
    });
    it('should call, in order: particles[n].update(), integrator.integrate(), springs[n].update()', function() {
      var calls = [],
          deltaA = 1,
          deltaB = 2,
          integrator = new NDP.Integrator(),
          engine = new NDP.Engine(integrator),
          particleA = new NDP.Particle(),
          particleB = new NDP.Particle(),
          springA = new NDP.Spring(particleA, particleB),
          springB = new NDP.Spring(particleB, particleA);

      spyOn(integrator, 'integrate').and.callFake(function() {
        calls.push('i');
      });
      spyOn(particleA, 'update').and.callFake(function() {
        calls.push('pA');
      });
      spyOn(particleB, 'update').and.callFake(function() {
        calls.push('pB');
      });
      spyOn(springA, 'update').and.callFake(function() {
        calls.push('sA');
      });
      spyOn(springB, 'update').and.callFake(function() {
        calls.push('sB');
      });

      engine.addParticle(particleA);
      engine.addParticle(particleB);
      engine.addSpring(springA);
      engine.addSpring(springB);

      expect(integrator.integrate).not.toHaveBeenCalled();
      expect(particleA.update).not.toHaveBeenCalled();
      expect(particleB.update).not.toHaveBeenCalled();
      expect(springA.update).not.toHaveBeenCalled();
      expect(springB.update).not.toHaveBeenCalled();

      engine.integrate(deltaA);

      expect(integrator.integrate.calls.count()).toEqual(1);
      expect(particleA.update.calls.count()).toEqual(1);
      expect(particleB.update.calls.count()).toEqual(1);
      expect(springA.update.calls.count()).toEqual(1);
      expect(springB.update.calls.count()).toEqual(1);

      expect(calls).toEqualArray(['pA', 'pB', 'i', 'sA', 'sB']);
    });
    it('should return the Engine instance that called it', function() {
      expect(this.engineA.integrate(100)).toBe(this.engineA);
    });
  });
});

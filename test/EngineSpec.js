describe('NDP.Engine(opt_integrator, opt_physical)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    this.engine = new NDP.Engine();
  });

  it('should be a Function Object', function() {
    expect(NDP.Engine).toEqual(jasmine.any(Function));
  });
  it('should take an Integrator as the first optional argument [opt_integrator]', function() {
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
  it('should take a Boolean as the second optional argument [opt_physical]', function() {
    var engineA = new NDP.Engine();
    expect(engineA.physical).toEqual(jasmine.any(Boolean));
    expect(engineA.physical).toBe(false);

    var engineB = new NDP.Engine(new NDP.Integrator(), true);
    expect(engineB.physical).toEqual(jasmine.any(Boolean));
    expect(engineB.physical).toBe(true);
  });

  describe('__buffer', function() {
    it('should be __private', function() {
      expect(this.engine.__buffer).toBeDefined();
      expect(this.engine.buffer).toBeUndefined();
    });
    it('should be a Number', function() {
      expect(this.engine.__buffer).toEqual(jasmine.any(Number));
    });
    it('should be 0 initially', function() {
      expect(this.engine.__buffer).toBe(0);
    });
  });

  describe('__time', function() {
    it('should be __private', function() {
      expect(this.engine.__time).toBeDefined();
      expect(this.engine.time).toBeUndefined();
    });
    it('should be null initially', function() {
      expect(this.engine.__time).toBeNull();
    });
    it('should be null initially', function() {
      expect(this.engine.__time).toBeNull();
    });
    it('should be an Integer after calling step()', function() {
      expect(this.engine.__time).toBeNull();
      this.engine.step();
      expect(this.engine.__time).toBeAnInteger();
    });
    it('should increment by a predetermined delta after calling step() again', function(done) {
      var delay = 100;
      var engine = this.engine;
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
  });

  describe('springs', function() {
  });

  describe('integrator', function() {
  });

  describe('physical', function() {
  });

  describe('lubricity', function() {
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

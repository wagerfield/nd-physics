describe('NDP.Engine(opt_integrator, opt_physical)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    this.engine1 = new NDP.Engine();
    this.engine2 = new NDP.Engine(null, true);
  });

  it('should be a Function Object', function() {
    expect(NDP.Engine).toEqual(jasmine.any(Function));
  });
  it('should take an Integrator as the first optional argument [opt_integrator]', function() {

  });
  it('should take a Boolean as the second optional argument [opt_physical]', function() {
  });

  describe('__buffer', function() {
    it('should be __private', function() {
      expect(this.engine1.__buffer).toBeDefined();
      expect(this.engine1.buffer).toBeUndefined();
    });
    it('should be a Number', function() {
      expect(this.engine1.__buffer).toEqual(jasmine.any(Number));
    });
    it('should be 0 initially', function() {
      expect(this.engine1.__buffer).toBe(0);
    });
  });

  describe('__time', function() {
    it('should be __private', function() {
      expect(this.engine1.__time).toBeDefined();
      expect(this.engine1.time).toBeUndefined();
    });
    it('should be null initially', function() {
      expect(this.engine1.__time).toBeNull();
    });
    it('should be null initially', function() {
      expect(this.engine1.__time).toBeNull();
    });
    it('should be an Integer after calling step()', function() {
      expect(this.engine1.__time).toBeNull();
      this.engine1.step();
      expect(this.engine1.__time).toBeAnInteger();
    });
    it('should increment by a predetermined delta after calling step() again', function(done) {
      var delay = 100;
      var engine = this.engine1;
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

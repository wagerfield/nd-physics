describe('NDP.ImprovedEulerIntegrator(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    this.integrator = new NDP.ImprovedEulerIntegrator();
    this.engine = new NDP.Engine(this.integrator);
    this.particle = new NDP.Particle(1);
  });

  it('should be a Function Object', function() {
    expect(NDP.ImprovedEulerIntegrator).toEqual(jasmine.any(Function));
  });

  describe('__integrate(particle, delta, lubricity)', function() {
    it('should integrate motion using Improved Euler equation', function() {
      this.integrator.__integrate(this.particle, 1, this.engine.lubricity);
    });
  });
});

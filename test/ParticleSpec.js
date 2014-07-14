describe('NDP.Particle(mass, opt_radius, opt_fixed, opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
  });

  it('should be a Function Object', function() {
    expect(NDP.Particle).toEqual(jasmine.any(Function));
  });
});

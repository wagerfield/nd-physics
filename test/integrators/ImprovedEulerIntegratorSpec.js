describe('NDP.ImprovedEulerIntegrator(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
  });

  it('should be a Function Object', function() {
    expect(NDP.ImprovedEulerIntegrator).toEqual(jasmine.any(Function));
  });
});

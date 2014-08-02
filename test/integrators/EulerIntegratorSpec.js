describe('NDP.EulerIntegrator(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
  });

  it('should be a Function Object', function() {
    expect(NDP.EulerIntegrator).toEqual(jasmine.any(Function));
  });
});

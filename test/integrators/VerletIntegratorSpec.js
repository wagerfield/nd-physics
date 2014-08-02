describe('NDP.VerletIntegrator(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
  });

  it('should be a Function Object', function() {
    expect(NDP.VerletIntegrator).toEqual(jasmine.any(Function));
  });
});

describe('NDP.ConstantBehaviour(force, opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    NDP.DIMENSIONS = 2;
    this.behaviourA = new NDP.ConstantBehaviour();
    this.behaviourB = new NDP.ConstantBehaviour([1, 2]);
  });

  it('should be a Function Object', function() {
    expect(NDP.ConstantBehaviour).toEqual(jasmine.any(Function));
  });
});

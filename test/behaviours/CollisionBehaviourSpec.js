describe('NDP.CollisionBehaviour(force, opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    NDP.DIMENSIONS = 2;
    this.behaviourA = new NDP.CollisionBehaviour();
    this.behaviourB = new NDP.CollisionBehaviour();
  });

  it('should be a Function Object', function() {
    expect(NDP.CollisionBehaviour).toEqual(jasmine.any(Function));
  });
});

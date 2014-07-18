describe('NDP.Spring(p1, p2, length, stiffness)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    this.particleA = new NDP.Particle(1);
    this.particleB = new NDP.Particle(2);
    this.springA = new NDP.Spring(this.particleA, this.particleB, 1, 0.1);
    this.springB = new NDP.Spring(this.particleB, this.particleA, 2, 0.9);
  });

  it('should be a Function Object', function() {
    expect(NDP.Spring).toEqual(jasmine.any(Function));
  });
});

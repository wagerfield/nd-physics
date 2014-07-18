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
  it('should throw an error if [p1] or [p2] are not a Particle instances', function() {
    expect(function() {
      new NDP.Spring();
    }).toThrow('Spring: p1 must be a Particle instance [undefined]');
    expect(function() {
      new NDP.Spring('kittens');
    }).toThrow('Spring: p1 must be a Particle instance [kittens]');
    expect(function() {
      new NDP.Spring(new NDP.Particle(1));
    }).toThrow('Spring: p2 must be a Particle instance [undefined]');
    expect(function() {
      new NDP.Spring(new NDP.Particle(1), 'kittens');
    }).toThrow('Spring: p2 must be a Particle instance [kittens]');
  });
  it('should throw an error if [p1] === [p2]', function() {
    expect(function() {
      var p = new NDP.Particle(1, 1, false, 1);
      new NDP.Spring(p, p);
    }).toThrow('Spring: p1 and p2 cannot be the same Particle instance.');
  });
  it('should throw an error if [p1.dimensions] !== [p2.dimensions]', function() {
    expect(function() {
      var p1 = new NDP.Particle(1, 1, false, 1);
      var p2 = new NDP.Particle(1, 1, false, 2);
      new NDP.Spring(p1, p2, 1, 1);
    }).toThrow('Spring: Particles must have equal dimensions. p1.dimensions[1] p2.dimensions[2]');
  });
  it('should throw an error if [length] is not a Number', function() {
    var p1 = new NDP.Particle(1, 1, false, 2);
    var p2 = new NDP.Particle(1, 1, false, 2);
    expect(function() {
      new NDP.Spring(p1, p2);
    }).toThrow('Spring: length must be a Number [undefined]');
    expect(function() {
      new NDP.Spring(p1, p2, 'kittens');
    }).toThrow('Spring: length must be a Number [kittens]');
  });
});

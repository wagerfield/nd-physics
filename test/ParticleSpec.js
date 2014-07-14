describe('NDP.Particle(mass, opt_radius, opt_fixed, opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
  });

  it('should be a Function Object', function() {
    expect(NDP.Particle).toEqual(jasmine.any(Function));
  });
  it('should throw an error if the [mass] argument is not a Number', function() {
    expect(function() {
      new NDP.Particle();
    }).toThrow('Particle: mass must be a Number ['+undefined+']');
    expect(function() {
      new NDP.Particle('kittens');
    }).toThrow('Particle: mass must be a Number [kittens]');
  });
  it('should set [mass] to the first argument', function() {
  });
  it('should default [radius] to the value of [mass]', function() {
  });
  it('should set [radius] to the second argument if passed', function() {
  });
  it('should default [fixed] to false', function() {
  });
  it('should set [fixed] to the third argument if passed', function() {
  });
  it('should default [dimensions] to NDP.DIMENSIONS', function() {
  });
  it('should set [dimensions] to the fourth argument if passed', function() {
  });

  describe('dimensions', function() {
    it('should be an Integer', function() {
    });
    it('should be readonly', function() {
    });
  });
});

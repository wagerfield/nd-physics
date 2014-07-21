describe('NDP.Integrator(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    NDP.DIMENSIONS = 2;
    this.integratorA = new NDP.Integrator();
    this.integratorB = new NDP.Integrator(1);
  });

  it('should be a Function Object', function() {
    expect(NDP.Integrator).toEqual(jasmine.any(Function));
  });
  it('should default [dimensions] to NDP.DIMENSIONS', function() {
    expect(this.integratorA.dimensions).toBe(NDP.DIMENSIONS);
  });
  it('should set [dimensions] to the first argument if passed', function() {
    this.integratorA = new NDP.Integrator(1);
    expect(this.integratorA.dimensions).toBe(1);

    this.integratorB = new NDP.Integrator(2);
    expect(this.integratorB.dimensions).toBe(2);
  });
  it('should only accept Numbers and set [dimensions] to an Integer', function() {
    this.integratorA = new NDP.Integrator('1');
    expect(this.integratorA.dimensions).toBe(NDP.DIMENSIONS);

    this.integratorA = new NDP.Integrator('cats');
    expect(this.integratorA.dimensions).toBe(NDP.DIMENSIONS);

    this.integratorA = new NDP.Integrator(2.8);
    expect(this.integratorA.dimensions).toBe(2);

    this.integratorA = new NDP.Integrator(3.2);
    expect(this.integratorA.dimensions).toBe(3);
  });
  it('should set [__dimensions] to [dimensions]', function() {
    expect(this.integratorA.__dimensions).toBe(this.integratorA.dimensions);
  });

  describe('dimensions', function() {
    it('should be an Integer', function() {
      expect(this.integratorA.dimensions).toBeAnInteger();
    });
    it('should be readonly', function() {
      var dimensions = this.integratorA.dimensions;
      this.integratorA.dimensions = 100;
      expect(this.integratorA.dimensions).toBe(dimensions);
    });
    it('should have a private __dimensions counterpart', function() {
      expect(this.integratorA.__dimensions).toBe(this.integratorA.dimensions);
      expect(this.integratorA.__dimensions).toBeAnInteger();
    });
  });

  describe('__vector', function() {
    it('should be an Object', function() {
      expect(this.integratorA.__vector).toEqual(jasmine.any(Object));
    });
    it('should reference NDP.Vector[dimensions]', function() {
      expect(this.integratorA.__vector).toEqual(NDP['Vector' + this.integratorA.dimensions]);
    });
    it('should throw an error for cases where a Vector Object is not available', function() {
      expect(function() {
        new NDP.Integrator(0);
      }).toThrow('Integrator: No Vector Object available for [0] dimensions');
    });
  });
});

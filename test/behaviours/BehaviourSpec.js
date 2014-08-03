describe('NDP.Behaviour(opt_dimensions)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    NDP.DIMENSIONS = 2;
    this.behaviourA = new NDP.Behaviour();
    this.behaviourB = new NDP.Behaviour(1);
  });

  it('should be a Function Object', function() {
    expect(NDP.Behaviour).toEqual(jasmine.any(Function));
  });
  it('should default [dimensions] to NDP.DIMENSIONS', function() {
    expect(this.behaviourA.dimensions).toBe(NDP.DIMENSIONS);
  });
  it('should set [dimensions] to the first argument if passed', function() {
    this.behaviourA = new NDP.Behaviour(1);
    expect(this.behaviourA.dimensions).toBe(1);

    this.behaviourB = new NDP.Behaviour(2);
    expect(this.behaviourB.dimensions).toBe(2);
  });
  it('should only accept Numbers and set [dimensions] to an Integer', function() {
    this.behaviourA = new NDP.Behaviour('1');
    expect(this.behaviourA.dimensions).toBe(NDP.DIMENSIONS);

    this.behaviourA = new NDP.Behaviour('cats');
    expect(this.behaviourA.dimensions).toBe(NDP.DIMENSIONS);

    this.behaviourA = new NDP.Behaviour(2.8);
    expect(this.behaviourA.dimensions).toBe(2);

    this.behaviourA = new NDP.Behaviour(3.2);
    expect(this.behaviourA.dimensions).toBe(3);
  });
  it('should set [__dimensions] to [dimensions]', function() {
    expect(this.behaviourA.__dimensions).toBe(this.behaviourA.dimensions);
  });
});

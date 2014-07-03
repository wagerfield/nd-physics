describe('NDP.Vector1', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    this.a = NDP.Vector1.create();
    this.b = NDP.Vector1.create(10);
    this.c = NDP.Vector1.create(-5);
  });

  it('should be an Object', function() {
    expect(NDP.Vector1).toEqual(jasmine.any(Object));
  });

  describe('create(opt_x)', function() {
    it('should create a NDP.Array', function() {
      expect(this.a).toEqual(jasmine.any(NDP.Array));
      expect(this.b).toEqual(jasmine.any(NDP.Array));
    });
    it('should create a NDP.Array of length: 1', function() {
      expect(this.a.length).toEqual(1);
      expect(this.b.length).toEqual(1);
    });
    it('should create a NDP.Array with an initial value [opt_x](0)', function() {
      expect(this.a[0]).toEqual(0);
      expect(this.b[0]).toEqual(10);
      expect(this.c[0]).toEqual(-5);
    });
  });

  describe('identity(target)', function() {
    it('should set [target][n] to 0', function() {
      NDP.Vector1.identity(this.a);
      NDP.Vector1.identity(this.b);
      NDP.Vector1.identity(this.c);
      expect(this.a[0]).toEqual(0);
      expect(this.b[0]).toEqual(0);
      expect(this.c[0]).toEqual(0);
    });
  });

  describe('set(target, x)', function() {
    it('should set [target][n] to [x]', function() {
      NDP.Vector1.set(this.a, 1);
      NDP.Vector1.set(this.b, 2);
      NDP.Vector1.set(this.c, 3);
      expect(this.a[0]).toEqual(1);
      expect(this.b[0]).toEqual(2);
      expect(this.c[0]).toEqual(3);
    });
  });

  describe('copy(target, a)', function() {
    it('should copy [a][n] to [target][n]', function() {
      var target = NDP.Vector1.create();
      NDP.Vector1.copy(target, this.a);
      expect(target[0]).toEqual(this.a[0]);
      NDP.Vector1.copy(target, this.b);
      expect(target[0]).toEqual(this.b[0]);
      NDP.Vector1.copy(target, this.c);
      expect(target[0]).toEqual(this.c[0]);
    });
  });

  describe('add(target, a, b)', function() {
    it('should set [target][n] to [a][n] + [b][n]', function() {
      var target = NDP.Vector1.create();
      NDP.Vector1.add(target, this.a, this.b);
      expect(target[0]).toEqual(this.a[0] + this.b[0]);
      NDP.Vector1.add(target, this.a, this.c);
      expect(target[0]).toEqual(this.a[0] + this.c[0]);
      NDP.Vector1.add(target, this.b, this.c);
      expect(target[0]).toEqual(this.b[0] + this.c[0]);
    });
  });

  describe('subtract(target, a, b)', function() {
    it('should set [target][n] to [a][n] - [b][n]', function() {
      var target = NDP.Vector1.create();
      NDP.Vector1.subtract(target, this.a, this.b);
      expect(target[0]).toEqual(this.a[0] - this.b[0]);
      NDP.Vector1.subtract(target, this.a, this.c);
      expect(target[0]).toEqual(this.a[0] - this.c[0]);
      NDP.Vector1.subtract(target, this.b, this.c);
      expect(target[0]).toEqual(this.b[0] - this.c[0]);
    });
  });

  describe('scale(target, a, scalar)', function() {
    it('should set [target][n] to [a][n] * [scalar]', function() {
      var scalar = 10;
      var target = NDP.Vector1.create();
      NDP.Vector1.scale(target, this.a, scalar);
      expect(target[0]).toEqual(this.a[0] * scalar);
      NDP.Vector1.scale(target, this.b, scalar);
      expect(target[0]).toEqual(this.b[0] * scalar);
      NDP.Vector1.scale(target, this.c, scalar);
      expect(target[0]).toEqual(this.c[0] * scalar);
    });
  });

  describe('squaredLength(target)', function() {
    it('should return [target][n] * [target][n]', function() {
      expect(NDP.Vector1.squaredLength(this.a)).toEqual(this.a[0] * this.a[0]);
      expect(NDP.Vector1.squaredLength(this.b)).toEqual(this.b[0] * this.b[0]);
      expect(NDP.Vector1.squaredLength(this.c)).toEqual(this.c[0] * this.c[0]);
    });
  });

  describe('length(target)', function() {
    it('should return Math.sqrt([target][n] * [target][n])', function() {
      expect(NDP.Vector1.length(this.a)).toEqual(Math.sqrt(this.a[0] * this.a[0]));
      expect(NDP.Vector1.length(this.b)).toEqual(Math.sqrt(this.b[0] * this.b[0]));
      expect(NDP.Vector1.length(this.c)).toEqual(Math.sqrt(this.c[0] * this.c[0]));
    });
  });

  describe('normalize(target, a, opt_length)', function() {
    it('should set [target] to [a] normalized to [opt_length](1)', function() {
      var target = NDP.Vector1.create(10);
      NDP.Vector1.normalize(target, this.a);
      expect(target[0]).toEqual(0);
      NDP.Vector1.normalize(target, this.b);
      expect(target[0]).toEqual(1);
      NDP.Vector1.normalize(target, this.c);
      expect(target[0]).toEqual(-1);
      NDP.Vector1.normalize(target, this.a, 10);
      expect(target[0]).toEqual(0);
      NDP.Vector1.normalize(target, this.b, 10);
      expect(target[0]).toEqual(10);
      NDP.Vector1.normalize(target, this.c, 10);
      expect(target[0]).toEqual(-10);
      NDP.Vector1.normalize(target, this.c, -2);
      expect(target[0]).toEqual(2);
    });
  });
});

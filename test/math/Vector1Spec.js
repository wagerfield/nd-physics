describe('NDP.Vector1', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    this.a = NDP.Vector1.create();
    this.b = NDP.Vector1.create(10);
    this.c = NDP.Vector1.create(-5);
    this.target = NDP.Vector1.create();
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
      expect(this.c.length).toEqual(1);
    });
    it('should create a NDP.Array with an initial value [opt_x](0)', function() {
      expect(this.a).toEqualArray([0]);
      expect(this.b).toEqualArray([10]);
      expect(this.c).toEqualArray([-5]);
    });
  });

  describe('identity(target)', function() {
    it('should set [target][n] to 0', function() {
      NDP.Vector1.identity(this.a);
      NDP.Vector1.identity(this.b);
      NDP.Vector1.identity(this.c);
      expect(this.a).toEqualArray([0]);
      expect(this.b).toEqualArray([0]);
      expect(this.c).toEqualArray([0]);
    });
  });

  describe('set(target, x)', function() {
    it('should set [target][n] to [x]', function() {
      NDP.Vector1.set(this.a, 1);
      NDP.Vector1.set(this.b, 2);
      NDP.Vector1.set(this.c, 3);
      expect(this.a).toEqualArray([1]);
      expect(this.b).toEqualArray([2]);
      expect(this.c).toEqualArray([3]);
    });
  });

  describe('copy(target, a)', function() {
    it('should copy [a][n] to [target][n]', function() {
      NDP.Vector1.copy(this.target, this.a);
      expect(this.target).toEqualArray(this.a);
      NDP.Vector1.copy(this.target, this.b);
      expect(this.target).toEqualArray(this.b);
      NDP.Vector1.copy(this.target, this.c);
      expect(this.target).toEqualArray(this.c);
    });
  });

  describe('add(target, a, b)', function() {
    function add(a, b) {
      return [a[0]+b[0]];
    }
    it('should set [target][n] to [a][n] + [b][n]', function() {
      NDP.Vector1.add(this.target, this.a, this.b);
      expect(this.target).toEqualArray(add(this.a, this.b));
      NDP.Vector1.add(this.target, this.a, this.c);
      expect(this.target).toEqualArray(add(this.a, this.c));
      NDP.Vector1.add(this.target, this.b, this.c);
      expect(this.target).toEqualArray(add(this.b, this.c));
    });
  });

  describe('subtract(target, a, b)', function() {
    function subtract(a, b) {
      return [a[0]-b[0]];
    }
    it('should set [target][n] to [a][n] - [b][n]', function() {
      NDP.Vector1.subtract(this.target, this.a, this.b);
      expect(this.target).toEqualArray(subtract(this.a, this.b));
      NDP.Vector1.subtract(this.target, this.a, this.c);
      expect(this.target).toEqualArray(subtract(this.a, this.c));
      NDP.Vector1.subtract(this.target, this.b, this.c);
      expect(this.target).toEqualArray(subtract(this.b, this.c));
    });
  });

  describe('scale(target, a, scalar)', function() {
    function scalar(v, s) {
      return [v[0]*s];
    }
    it('should set [target][n] to [a][n] * [scalar]', function() {
      var SCALAR = 10;
      NDP.Vector1.scale(this.target, this.a, SCALAR);
      expect(this.target).toEqualArray(scalar(this.a, SCALAR));
      NDP.Vector1.scale(this.target, this.b, SCALAR);
      expect(this.target).toEqualArray(scalar(this.b, SCALAR));
      NDP.Vector1.scale(this.target, this.c, SCALAR);
      expect(this.target).toEqualArray(scalar(this.c, SCALAR));
    });
  });

  describe('squaredLength(vector)', function() {
    function squaredLength(v) {
      return v[0]*v[0];
    }
    it('should return [vector][n] * [vector][n]', function() {
      expect(NDP.Vector1.squaredLength(this.a)).toEqual(squaredLength(this.a));
      expect(NDP.Vector1.squaredLength(this.b)).toEqual(squaredLength(this.b));
      expect(NDP.Vector1.squaredLength(this.c)).toEqual(squaredLength(this.c));
    });
  });

  describe('length(vector)', function() {
    function length(v) {
      return Math.sqrt(v[0]*v[0]);
    }
    it('should return Math.sqrt([vector][n] * [vector][n])', function() {
      expect(NDP.Vector1.length(this.a)).toEqual(length(this.a));
      expect(NDP.Vector1.length(this.b)).toEqual(length(this.b));
      expect(NDP.Vector1.length(this.c)).toEqual(length(this.c));
    });
  });

  describe('normalize(target, a, opt_length)', function() {
    function normalize(v, opt_length) {
      opt_length = opt_length || 1;
      var length = NDP.Vector1.length(v);
      var output = NDP.Vector1.create();
      if (length > 0) {
        length = opt_length / length;
        output[0] = v[0] * length;
      }
      return output;
    }
    it('should set [target] to [a] normalized to [opt_length](1)', function() {
      NDP.Vector1.normalize(this.target, this.a);
      expect(this.target).toEqualArray(normalize(this.a));
      NDP.Vector1.normalize(this.target, this.b);
      expect(this.target).toEqualArray(normalize(this.b));
      NDP.Vector1.normalize(this.target, this.c);
      expect(this.target).toEqualArray(normalize(this.c));
      NDP.Vector1.normalize(this.target, this.a, 10);
      expect(this.target).toEqualArray(normalize(this.a, 10));
      NDP.Vector1.normalize(this.target, this.b, 10);
      expect(this.target).toEqualArray(normalize(this.b, 10));
      NDP.Vector1.normalize(this.target, this.c, 10);
      expect(this.target).toEqualArray(normalize(this.c, 10));
      NDP.Vector1.normalize(this.target, this.c, -2);
      expect(this.target).toEqualArray(normalize(this.c, -2));
    });
  });
});

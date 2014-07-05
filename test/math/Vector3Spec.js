describe('NDP.Vector3', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
    this.add = function(a, b) {
      return [a[0]+b[0], a[1]+b[1], a[2]+b[2]];
    };
    this.subtract = function(a, b) {
      return [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
    };
    this.scale = function(v, s) {
      return [v[0]*s, v[1]*s, v[2]*s];
    };
    this.squaredLength = function(v) {
      return v[0]*v[0] + v[1]*v[1]+ v[2]*v[2];
    };
    this.length = function(v) {
      return Math.sqrt(this.squaredLength(v));
    };
    this.normalize = function(v, opt_length) {
      opt_length = opt_length || 1;
      var length = NDP.Vector3.length(v);
      var output = NDP.Vector3.create();
      if (length > 0) {
        length = opt_length / length;
        NDP.Vector3.scale(output, v, length);
      }
      return output;
    };
    this.a = NDP.Vector3.create();
    this.b = NDP.Vector3.create(10);
    this.c = NDP.Vector3.create(-5, 10, -2);
    this.target = NDP.Vector3.create();
  });

  it('should be an Object', function() {
    expect(NDP.Vector3).toEqual(jasmine.any(Object));
  });

  describe('create(opt_x, opt_y, opt_z)', function() {
    it('should create a NDP.Array', function() {
      expect(this.a).toEqual(jasmine.any(NDP.Array));
      expect(this.b).toEqual(jasmine.any(NDP.Array));
    });
    it('should create a NDP.Array of length: 3', function() {
      expect(this.a.length).toEqual(3);
      expect(this.b.length).toEqual(3);
      expect(this.c.length).toEqual(3);
    });
    it('should create a NDP.Array with initial values of [opt_x](0) [opt_y](0) [opt_z](0)', function() {
      expect(this.a).toEqualArray([0, 0, 0]);
      expect(this.b).toEqualArray([10, 0, 0]);
      expect(this.c).toEqualArray([-5, 10, -2]);
    });
  });

  describe('identity(target)', function() {
    it('should set [target][n] to 0', function() {
      NDP.Vector3.identity(this.a);
      NDP.Vector3.identity(this.b);
      NDP.Vector3.identity(this.c);
      expect(this.a).toEqualArray([0, 0, 0]);
      expect(this.b).toEqualArray([0, 0, 0]);
      expect(this.c).toEqualArray([0, 0, 0]);
    });
  });

  describe('set(target, x, y, z)', function() {
    it('should set [target][n] to [x, y, z]', function() {
      NDP.Vector3.set(this.a, 1, 3, 2);
      NDP.Vector3.set(this.b, 2, 4, 1);
      NDP.Vector3.set(this.c, 3, 1, 4);
      expect(this.a).toEqualArray([1, 3, 2]);
      expect(this.b).toEqualArray([2, 4, 1]);
      expect(this.c).toEqualArray([3, 1, 4]);
    });
  });

  describe('copy(target, a)', function() {
    it('should copy [a][n] to [target][n]', function() {
      NDP.Vector3.copy(this.target, this.a);
      expect(this.target).toEqualArray(this.a);
      NDP.Vector3.copy(this.target, this.b);
      expect(this.target).toEqualArray(this.b);
      NDP.Vector3.copy(this.target, this.c);
      expect(this.target).toEqualArray(this.c);
    });
  });

  describe('add(target, a, b)', function() {
    it('should set [target][n] to [a][n] + [b][n]', function() {
      NDP.Vector3.add(this.target, this.a, this.b);
      expect(this.target).toEqualArray(this.add(this.a, this.b));
      NDP.Vector3.add(this.target, this.a, this.c);
      expect(this.target).toEqualArray(this.add(this.a, this.c));
      NDP.Vector3.add(this.target, this.b, this.c);
      expect(this.target).toEqualArray(this.add(this.b, this.c));
    });
  });

  describe('subtract(target, a, b)', function() {
    it('should set [target][n] to [a][n] - [b][n]', function() {
      NDP.Vector3.subtract(this.target, this.a, this.b);
      expect(this.target).toEqualArray(this.subtract(this.a, this.b));
      NDP.Vector3.subtract(this.target, this.a, this.c);
      expect(this.target).toEqualArray(this.subtract(this.a, this.c));
      NDP.Vector3.subtract(this.target, this.b, this.c);
      expect(this.target).toEqualArray(this.subtract(this.b, this.c));
    });
  });

  describe('scale(target, a, scalar)', function() {
    it('should set [target][n] to [a][n] * [scalar]', function() {
      var SCALAR = 10;
      NDP.Vector3.scale(this.target, this.a, SCALAR);
      expect(this.target).toEqualArray(this.scale(this.a, SCALAR));
      NDP.Vector3.scale(this.target, this.b, SCALAR);
      expect(this.target).toEqualArray(this.scale(this.b, SCALAR));
      NDP.Vector3.scale(this.target, this.c, SCALAR);
      expect(this.target).toEqualArray(this.scale(this.c, SCALAR));
    });
  });

  describe('squaredLength(vector)', function() {
    it('should return [vector][n] * [vector][n]', function() {
      expect(NDP.Vector3.squaredLength(this.a)).toEqual(this.squaredLength(this.a));
      expect(NDP.Vector3.squaredLength(this.b)).toEqual(this.squaredLength(this.b));
      expect(NDP.Vector3.squaredLength(this.c)).toEqual(this.squaredLength(this.c));
    });
  });

  describe('length(vector)', function() {
    it('should return Math.sqrt([vector][n] * [vector][n])', function() {
      expect(NDP.Vector3.length(this.a)).toEqual(this.length(this.a));
      expect(NDP.Vector3.length(this.b)).toEqual(this.length(this.b));
      expect(NDP.Vector3.length(this.c)).toEqual(this.length(this.c));
    });
  });

  describe('normalize(target, a, opt_length)', function() {
    it('should set [target] to [a] normalized to [opt_length](1)', function() {
      NDP.Vector3.normalize(this.target, this.a);
      expect(this.target).toEqualArray(this.normalize(this.a));
      NDP.Vector3.normalize(this.target, this.b);
      expect(this.target).toEqualArray(this.normalize(this.b));
      NDP.Vector3.normalize(this.target, this.c);
      expect(this.target).toEqualArray(this.normalize(this.c));
      NDP.Vector3.normalize(this.target, this.a, 10);
      expect(this.target).toEqualArray(this.normalize(this.a, 10));
      NDP.Vector3.normalize(this.target, this.b, 10);
      expect(this.target).toEqualArray(this.normalize(this.b, 10));
      NDP.Vector3.normalize(this.target, this.c, 10);
      expect(this.target).toEqualArray(this.normalize(this.c, 10));
      NDP.Vector3.normalize(this.target, this.c, -2);
      expect(this.target).toEqualArray(this.normalize(this.c, -2));
    });
  });
});

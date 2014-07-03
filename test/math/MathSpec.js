describe('Math', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
  });

  it('should be an Object', function() {
    expect(Math).toEqual(jasmine.any(Object));
  });

  describe('PI2', function() {
    it('should be equal to Math.PI * 2', function() {
      expect(Math.PI2).toEqual(Math.PI * 2);
    });
    it('should be readonly', function() {
      var PI2 = Math.PI2;
      Math.PI2 = 'kittens';
      expect(Math.PI2).toBe(PI2);
    });
  });

  describe('PIH', function() {
    it('should be equal to Math.PI / 2', function() {
      expect(Math.PIH).toEqual(Math.PI / 2);
    });
    it('should be readonly', function() {
      var PIH = Math.PIH;
      Math.PIH = 'kittens';
      expect(Math.PIH).toBe(PIH);
    });
  });

  describe('normalize(value, opt_min, opt_max)', function() {
    it('should return a ratio within a given scale', function() {
      expect(Math.normalize(-2)).toEqual(-2);
      expect(Math.normalize(-1)).toEqual(-1);
      expect(Math.normalize(0)).toEqual(0);
      expect(Math.normalize(0.5)).toEqual(0.5);
      expect(Math.normalize(1)).toEqual(1);
      expect(Math.normalize(2)).toEqual(2);

      expect(Math.normalize(-10, 0, 10)).toEqual(-1);
      expect(Math.normalize(0, 0, 10)).toEqual(0);
      expect(Math.normalize(5, 0, 10)).toEqual(0.5);
      expect(Math.normalize(10, 0, 10)).toEqual(1);
      expect(Math.normalize(20, 0, 10)).toEqual(2);

      expect(Math.normalize(-20, -10, 10)).toEqual(-0.5);
      expect(Math.normalize(-10, -10, 10)).toEqual(0);
      expect(Math.normalize(0, -10, 10)).toEqual(0.5);
      expect(Math.normalize(10, -10, 10)).toEqual(1);
      expect(Math.normalize(20, -10, 10)).toEqual(1.5);
    });
  });

  describe('interpolate(value, min, max)', function() {
    it('should return a value on a given scale', function() {
      expect(Math.interpolate(-1, 0, 10)).toEqual(-10);
      expect(Math.interpolate(-0.5, 0, 10)).toEqual(-5);
      expect(Math.interpolate(0, 0, 10)).toEqual(0);
      expect(Math.interpolate(0.5, 0, 10)).toEqual(5);
      expect(Math.interpolate(1, 0, 10)).toEqual(10);
      expect(Math.interpolate(2, 0, 10)).toEqual(20);

      expect(Math.interpolate(-1, -2, 2)).toEqual(-6);
      expect(Math.interpolate(0, -2, 2)).toEqual(-2);
      expect(Math.interpolate(0.5, -2, 2)).toEqual(0);
      expect(Math.interpolate(1, -2, 2)).toEqual(2);
      expect(Math.interpolate(2, -2, 2)).toEqual(6);
    });
  });

  describe('map(value, min1, max1, min2, max2)', function() {
    it('should map a value from one scale to another', function() {
      expect(Math.map(-2, 0, 1, 0, 10)).toEqual(-20);
      expect(Math.map(-1, 0, 1, 0, 10)).toEqual(-10);
      expect(Math.map(0, 0, 1, 0, 10)).toEqual(0);
      expect(Math.map(0.5, 0, 1, 0, 10)).toEqual(5);
      expect(Math.map(1, 0, 1, 0, 10)).toEqual(10);
      expect(Math.map(2, 0, 1, 0, 10)).toEqual(20);

      expect(Math.map(-10, 0, 10, 0, 1)).toEqual(-1);
      expect(Math.map(-5, 0, 10, 0, 1)).toEqual(-0.5);
      expect(Math.map(0, 0, 10, 0, 1)).toEqual(0);
      expect(Math.map(1, 0, 10, 0, 1)).toEqual(0.1);
      expect(Math.map(10, 0, 10, 0, 1)).toEqual(1);
      expect(Math.map(20, 0, 10, 0, 1)).toEqual(2);

      expect(Math.map(-4, -2, 2, 5, 10)).toEqual(2.5);
      expect(Math.map(-2, -2, 2, 5, 10)).toEqual(5);
      expect(Math.map(0, -2, 2, 5, 10)).toEqual(7.5);
      expect(Math.map(2, -2, 2, 5, 10)).toEqual(10);
      expect(Math.map(6, -2, 2, 5, 10)).toEqual(15);
    });
  });

  describe('clamp(value, min, max)', function() {
    it('should clamp values to within a specified range', function() {
      expect(Math.clamp(-1, 0, 1)).toEqual(0);
      expect(Math.clamp(0, 0, 1)).toEqual(0);
      expect(Math.clamp(0.5, 0, 1)).toEqual(0.5);
      expect(Math.clamp(1, 0, 1)).toEqual(1);
      expect(Math.clamp(2, 0, 1)).toEqual(1);

      expect(Math.clamp(-4, -2, 2)).toEqual(-2);
      expect(Math.clamp(-2, -2, 2)).toEqual(-2);
      expect(Math.clamp(-1, -2, 2)).toEqual(-1);
      expect(Math.clamp(0, -2, 2)).toEqual(0);
      expect(Math.clamp(1, -2, 2)).toEqual(1);
      expect(Math.clamp(2, -2, 2)).toEqual(2);
      expect(Math.clamp(4, -2, 2)).toEqual(2);
    });
  });

  describe('sign(value)', function() {
    it('should return the sign of a given value as either +1 or -1 ', function() {
      expect(Math.sign(-100)).toEqual(-1);
      expect(Math.sign(-2)).toEqual(-1);
      expect(Math.sign(-1)).toEqual(-1);
      expect(Math.sign(0)).toEqual(1);
      expect(Math.sign(1)).toEqual(1);
      expect(Math.sign(2)).toEqual(1);
      expect(Math.sign(100)).toEqual(1);
    });
  });

  describe('randomInRange(min, max, opt_round)', function() {
    var value;
    it('should return a random number within a specified range', function() {
      value = Math.randomInRange(0, 1);
      expect((value >= 0) && (value <= 1)).toBeTruthy();
      value = Math.randomInRange(-10, 10);
      expect((value >= -10) && (value <= 10)).toBeTruthy();
      value = Math.randomInRange(-100, 100, true);
      expect((value >= -100) && (value <= 100)).toBeTruthy();
      expect(value).toBeAnInteger();
    });
  });

  describe('randomSign(opt_probability)', function() {
    var value;
    it('should return a random sign for a specified probability', function() {
      value = Math.randomSign();
      expect((value === -1) || (value === 1)).toBeTruthy();
      expect(Math.randomSign(0)).toEqual(-1);
      expect(Math.randomSign(1)).toEqual(1);
    });
  });

  describe('randomBoolean(opt_probability)', function() {
    var value;
    it('should return a random boolean for a specified probability', function() {
      value = Math.randomBoolean();
      expect((value === true) || (value === false)).toBeTruthy();
      expect(Math.randomBoolean(0)).toEqual(false);
      expect(Math.randomBoolean(1)).toEqual(true);
    });
  });

  describe('randomItem(array)', function() {
    var value, array = 'abc'.split('');
    it('should return a random item from a specified array', function() {
      value = Math.randomItem(array);
      expect(value).toEqual(jasmine.any(String));
      expect(array).toContain(value);
    });
  });
});

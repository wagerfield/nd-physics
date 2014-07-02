describe('Core (NDP Object)', function() {

  beforeEach(function() {
    jasmine.addMatchers(CustomMatchers);
  });

  describe('NDP namespace', function() {
    it('should be an Object', function() {
      expect(NDP).toEqual(jasmine.any(Object));
    });
  });

  describe('VERSION', function() {
    it('should be a String', function() {
      expect(NDP.VERSION).toEqual(jasmine.any(String));
    });
    it('should be readonly', function() {
      var version = NDP.VERSION;
      NDP.VERSION = 'kittens';
      expect(NDP.VERSION).toBe(version);
    });
    it('should conform to semantic versioning "[v]MAJOR.MINOR.PATCH"', function() {
      expect(NDP.VERSION).toMatch(/^v?\d+\.\d+\.\d+$/);
    });
  });

  describe('DIMENSIONS', function() {
    it('should be an Integer', function() {
      expect(NDP.DIMENSIONS).toBeAnInteger();
      NDP.DIMENSIONS = 2.5;
      expect(NDP.DIMENSIONS).toBeAnInteger();
      NDP.DIMENSIONS = '2.5';
      expect(NDP.DIMENSIONS).toBeAnInteger();
    });
    it('should clip values below 1 and above 3', function() {
      NDP.DIMENSIONS = 0;
      expect(NDP.DIMENSIONS).toBe(1);
      NDP.DIMENSIONS = 4;
      expect(NDP.DIMENSIONS).toBe(3);
    });
  });

  describe('THRESHOLD', function() {
    it('should be a Number', function() {
      expect(NDP.THRESHOLD).toEqual(jasmine.any(Number));
    });
    it('should be clamp values between 1e-6 and 1e-1', function() {
      NDP.THRESHOLD = 0;
      expect(NDP.THRESHOLD).toBe(1e-6);
      NDP.THRESHOLD = 1;
      expect(NDP.THRESHOLD).toBe(1e-1);
    });
  });

  describe('COMPONENTS', function() {
    it('should be an Array', function() {
      expect(NDP.COMPONENTS).toEqual(jasmine.any(Array));
    });
    it('should be readonly', function() {
      var components = NDP.COMPONENTS;
      NDP.COMPONENTS = ['a', 'b', 'c'];
      expect(NDP.COMPONENTS).toBe(components);
    });
    it('should only contain Strings', function() {
      expect(NDP.COMPONENTS).toOnlyContain(jasmine.any(String));
    });
    it('should contain unique values', function() {
      expect(NDP.COMPONENTS).toContainUniqueValues();
    });
  });

  describe('isType(value, expected)', function() {
    it("should assert true for values of an expected type", function() {
      expect(NDP.isType(false, Boolean)).toBeTruthy();
      expect(NDP.isType(true, Boolean)).toBeTruthy();
      expect(NDP.isType(0.1, Number)).toBeTruthy();
      expect(NDP.isType('a', String)).toBeTruthy();
      expect(NDP.isType({}, Object)).toBeTruthy();
      expect(NDP.isType([], Array)).toBeTruthy();
      expect(NDP.isType(0.2, String)).toBeFalsy();
      expect(NDP.isType(0.3, Function)).toBeFalsy();

      var Animal = function(type) { this.type = type; };
      var Rodent = function(type) { Animal.call(this, type); };
      Rodent.prototype = Object.create(Animal.prototype);

      var cat = new Animal('cat');
      var rat = new Rodent('rat');

      expect(NDP.isType(Animal, Function)).toBeTruthy();
      expect(NDP.isType(cat, Animal)).toBeTruthy();
      expect(NDP.isType(rat, Animal)).toBeTruthy();
      expect(NDP.isType(cat, Rodent)).toBeFalsy();
      expect(NDP.isType(rat, Rodent)).toBeTruthy();
    });
  });

  describe('isBoolean(value)', function() {
    it("should assert true for Boolean values", function() {
      expect(NDP.isBoolean(true)).toBeTruthy();
      expect(NDP.isBoolean(false)).toBeTruthy();
      expect(NDP.isBoolean(1)).toBeFalsy();
      expect(NDP.isBoolean('a')).toBeFalsy();
      expect(NDP.isBoolean({})).toBeFalsy();
      expect(NDP.isBoolean([])).toBeFalsy();
    });
  });

  describe('isNumber(value)', function() {
    it("should assert true for Number values", function() {
      expect(NDP.isNumber(0.1)).toBeTruthy();
      expect(NDP.isNumber(100)).toBeTruthy();
      expect(NDP.isNumber(1e10)).toBeTruthy();
      expect(NDP.isNumber(1e-10)).toBeTruthy();
      expect(NDP.isNumber(null)).toBeFalsy();
      expect(NDP.isNumber('a')).toBeFalsy();
      expect(NDP.isNumber({})).toBeFalsy();
      expect(NDP.isNumber([])).toBeFalsy();
    });
  });

  describe('isArray(value)', function() {
    it("should assert true for NDP.Array values", function() {
      expect(NDP.isArray(new NDP.Array())).toBeTruthy();
      expect(NDP.isArray(1)).toBeFalsy();
      expect(NDP.isArray(null)).toBeFalsy();
      expect(NDP.isArray('a')).toBeFalsy();
      expect(NDP.isArray({})).toBeFalsy();
    });
  });

  describe('getTime()', function() {
    it('should be an Integer', function() {
      expect(NDP.getTime()).toBeAnInteger();
    });
    it('should increment by [delay] milliseconds', function(done) {
      var delay = 100;
      var timeA = NDP.getTime();
      setTimeout(function() {
        var timeB = NDP.getTime();
        var delta = timeB - timeA;
        expect(delta >= delay).toBeTruthy();
        done();
      }, delay);
    });
  });

  describe('getVector(dimensions)', function() {
    it('should return a Vector Object for the number of provided dimensions', function() {
      expect(NDP.getVector(0)).toBeUndefined();
      expect(NDP.getVector(1)).toBe(NDP.Vector1);
      expect(NDP.getVector(2)).toBe(NDP.Vector2);
      expect(NDP.getVector(3)).toBe(NDP.Vector3);
      expect(NDP.getVector(4)).toBeUndefined();
    });
  });

  describe("getAxes(dimensions)", function() {
    var axesU = NDP.getAxes(),
        axes0 = NDP.getAxes(0),
        axes1 = NDP.getAxes(1),
        axes2 = NDP.getAxes(2),
        axes3 = NDP.getAxes(3);
    it("should return 0 axes for undefined dimensions", function() {
      expect(axesU.length).toBe(0);
    });
    it("should return 0 axes for dimensions less than 2", function() {
      expect(axes0.length).toBe(0);
      expect(axes1.length).toBe(0);
    });
    it("should return 1 axis for 2 dimensions", function() {
      expect(axes2.length).toBe(1);
    });
    it("should return 3 axes for 3 dimensions", function() {
      expect(axes3.length).toBe(3);
    });
  });

  describe("addItemToArray(item, array)", function() {
    beforeEach(function() {
      this.valueA = 1;
      this.valueB = 'b';
      this.valueC = {key: 'c'};
      this.array = [this.valueA, this.valueB, this.valueC];
    });
    it("should only add a unique item to an array", function() {
      expect(this.array.length).toBe(3);
      expect(NDP.addItemToArray(1, this.array)).toBeFalsy();
      expect(this.array.length).toBe(3);
      expect(NDP.addItemToArray(2, this.array)).toBeTruthy();
      expect(this.array.length).toBe(4);
      expect(NDP.addItemToArray('beans', this.array)).toBeTruthy();
      expect(this.array.length).toBe(5);
      expect(NDP.addItemToArray('beans', this.array)).toBeFalsy();
      expect(this.array.length).toBe(5);
    });
    it("should only add items of a certain type when specified", function() {
      expect(this.array.length).toBe(3);
      expect(NDP.addItemToArray(2, this.array)).toBeTruthy();
      expect(this.array.length).toBe(4);
      expect(NDP.addItemToArray(3, this.array, Number)).toBeTruthy();
      expect(this.array.length).toBe(5);
      expect(NDP.addItemToArray(4, this.array, String)).toBeFalsy();
      expect(this.array.length).toBe(5);
    });
  });

  describe("removeItemFromArray(item, array)", function() {
    beforeEach(function() {
      this.valueA = 1;
      this.valueB = 'b';
      this.valueC = {key: 'c'};
      this.array = [this.valueA, this.valueB, this.valueC];
    });
    it("should only add a unique item to an array", function() {
      expect(this.array.length).toBe(3);
      expect(NDP.removeItemFromArray(1, this.array)).toBeTruthy();
      expect(this.array.length).toBe(2);
      expect(NDP.removeItemFromArray(2, this.array)).toBeFalsy();
      expect(this.array.length).toBe(2);
      expect(NDP.removeItemFromArray(this.valueC, this.array)).toBeTruthy();
      expect(this.array.length).toBe(1);
    });
  });

  describe("copyValuesToArray(values, array)", function() {
    beforeEach(function() {
      this.valueA = 1;
      this.valueB = 'b';
      this.valueC = {key: 'c'};
      this.source = [this.valueA, this.valueB, this.valueC];
      this.target = ['one', 'two'];
    });
    it("should copy values from a source array to a target array", function() {
      expect(this.source.length).toBe(3);
      expect(this.target.length).toBe(2);
      expect(this.target).not.toContain(this.valueA);
      expect(this.target).not.toContain(this.valueB);
      expect(this.target).not.toContain(this.valueC);

      NDP.copyValuesToArray(this.source, this.target);
      expect(this.target.length).toBe(2);
      expect(this.target).toContain(this.valueA);
      expect(this.target).toContain(this.valueB);
      expect(this.target).not.toContain(this.valueC);

      this.target = ['one', 'two'];
      expect(this.target.length).toBe(2);
      expect(this.target).not.toContain(this.valueA);
      expect(this.target).not.toContain(this.valueB);
      expect(this.target).not.toContain(this.valueC);
      NDP.copyValuesToArray(this.source, this.target, true);
      expect(this.target.length).toBe(2);
      expect(this.target).toContain(this.valueA);
      expect(this.target).toContain(this.valueB);
      expect(this.target).not.toContain(this.valueC);

      NDP.copyValuesToArray(this.source, this.target, false);
      expect(this.target.length).toBe(this.source.length);
      expect(this.target).toContain(this.valueA);
      expect(this.target).toContain(this.valueB);
      expect(this.target).toContain(this.valueC);
    });
  });

  describe('Array', function() {
    it('should be a Float32Array if available, otherwise Array', function() {
      if (!!window.Float32Array) {
        expect(NDP.Array).toBe(Float32Array);
      } else {
        expect(NDP.Array).toBe(Array);
      }
    });
  });
});

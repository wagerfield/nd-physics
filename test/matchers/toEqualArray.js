var CustomMatchers = CustomMatchers || {};
CustomMatchers.toEqualArray = function(util, customEqualityTesters) {
  return {
    compare: function(actual, expected) {
      function isArray(object) {
        return typeof object === 'object' && typeof object.length === 'number';
      }
      var result = {
        pass: isArray(actual),
        message: 'Expected ' + jasmine.pp(actual) + ' to be an Array.'
      };
      if (result.pass) {
        result.pass = isArray(expected);
        result.message = 'Expected ' + jasmine.pp(expected) + ' to be an Array.';
      }
      if (result.pass) {
        for (var i = 0; i < actual.length; i++) {
          if (!util.equals(actual[i], expected[i])) {
            result.pass = false;
            break;
          }
        }
        result.message = "Expected " + jasmine.pp(actual) + " to equal " + jasmine.pp(expected) + ".";
      }
      return result;
    }
  };
};

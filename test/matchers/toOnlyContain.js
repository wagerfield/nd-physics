var CustomMatchers = CustomMatchers || {};
CustomMatchers.toOnlyContain = function(util, customEqualityTesters) {
  return {
    compare: function(actual, expected) {
      var result = {
        pass: util.equals(actual, jasmine.any(Array)),
        message: 'Expected ' + jasmine.pp(actual) + ' to be an Array.'
      };
      if (result.pass) {
        for (var i = 0; i < actual.length; i++) {
          if (!util.equals(actual[i], expected)) {
            result.pass = false;
            break;
          }
        }
        result.message = "Expected " + jasmine.pp(actual) + " to only contain " + jasmine.pp(expected) + ".";
      }
      return result;
    }
  };
};

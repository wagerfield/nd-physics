var CustomMatchers = CustomMatchers || {};
CustomMatchers.toContainUniqueValues = function(util, customEqualityTesters) {
  return {
    compare: function(actual) {
      var result = {
        pass: util.equals(actual, jasmine.any(Array)),
        message: 'Expected ' + jasmine.pp(actual) + ' to be an Array.'
      };
      if (result.pass) {
        for (var i = 0; i < actual.length; i++) {
          var others = actual.concat();
          others.splice(i, 1);
          if (util.contains(others, actual[i])) {
            result.pass = false;
            break;
          }
        }
        result.message = "Expected " + jasmine.pp(actual) + " to contain unique values.";
      }
      return result;
    }
  };
};

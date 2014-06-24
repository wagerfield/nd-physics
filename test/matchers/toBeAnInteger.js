var CustomMatchers = CustomMatchers || {};
CustomMatchers.toBeAnInteger = function(util, customEqualityTesters) {
  return {
    compare: function(actual) {
      var result = {
        pass: util.equals(actual, parseInt(actual, 10)),
        message: 'Expected ' + jasmine.pp(actual) + ' to be an Integer.'
      };
      return result;
    }
  };
};

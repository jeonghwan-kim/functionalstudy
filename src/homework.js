const _ = require('underscore');
const _02 = require('./02');
const _04 = require('./04');
const _05 = require('./05');
const mapcat = _02.mapcat;
const validator = _04.validator;
const partial = _05.partial;
const condition1 = _05.condition1;
const __ = {};

const condition2 = (...validators) => {
  return (fun, arg1, arg2) => {
    const errors =  mapcat(isValid => {
      return isValid(arg1) && isValid(arg2) ? [] : [isValid.message]
    }, validators);

    if (!_.isEmpty(errors)) throw new Error(errors.join(', '));

    return fun(arg1, arg2);
  };
};
const numbers = condition2(validator('args must be a number', _.isNumber));
const sum = (p, v) => p + v;
const lt = max => condition1(validator(`result must be less than ${max}`, n => n < max));
__.solution1 = _.compose(partial(lt(50), _.identity), partial(numbers, sum));

module.exports = __;

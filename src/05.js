const _ = require('underscore');
const _01 = require('./01');
const _02 = require('./02');
const _03 = require('./03');
const _04 = require('./04');
const __ = {};

/**
 * 으마으마한 함수구만
 * @param funs
 * @returns {function(*=, ...[*]=)}
 */
__.dispatch = (...funs) => {
  const size = funs.length;

  return (target, ...args) => {
    let ret = undefined;

    for(let funIndex = 0; funIndex < size; funIndex++) {
      const fun = funs[funIndex];
      ret = fun.apply(fun, _02.construct(target, args));

      if (_01.existy(ret)) return ret;
    }

    return ret;
  };
};
__.stringReverse = s => {
  if (!_.isString(s)) return undefined;
  return s.split('').reverse().join('');
};
__.rightAwayInvoker = (...args) => {
  const method = args.shift();
  const target = args.shift();
  return method.apply(target, args);
};
__.curry  = fun => arg => fun(arg);
__.curry2 = fun => secondArg => firstArg => fun(firstArg, secondArg);
__.curry3 = fun => last => middle => first => fun(first, middle, last);
__.partial1 = (fun, arg1) => {
  return (...args) => {
    args = _02.construct(arg1, args);
    return fun.apply(fun, args);
  };
};
__.partial2 = (fun, arg1, arg2) => {
  return (...args) => {
    args = _02.cat([arg1, arg2], args);
    return fun.apply(fun, args);
  };
};
__.partial = (fun, ...pargs) => {
  return (...args) => {
    args = _02.cat(pargs, args);
    return fun.apply(fun, args);
  };
};
__.condition1 = (...validators) => {
  return (fun, arg) => {
    const errors = _02.mapcat(isValid => {
      return isValid(arg) ? [] : [isValid.message]
    }, validators);

    if (!_.isEmpty(errors)) throw new Error(errors.join(', '));

    return fun(arg);
  };
};
__.uncheckedSqr = n => n * n;
__.rev = __.dispatch(
  _04.invoker('reverse', Array.prototype.reverse),
  __.stringReverse);
__.sillyReverse = __.dispatch(__.rev, _04.always(42));
__.greaterThan = __.curry2((lhs, rhs) => lhs > rhs);
__.lessThan = __.curry2((lhs, rhs) => lhs < rhs);
__.withInRange = _04.checker(
  _04.validator('must be greater than 10', __.greaterThan(10)),
  _04.validator('must be less than 20', __.lessThan(20)));
__.sqrPre = __.condition1(
  _04.validator('arg must not be zero', n => n !== 0),
  _04.validator('arg must be a number', _.isNumber));
__.sqrPost = __.condition1(
  _04.validator('result should be a number', _.isNumber),
  _04.validator('result should not be zero', n => n !== 0),
  _04.validator('result should be positive', n => n > 0));
__.checkedSqr = __.partial1(__.sqrPre, __.uncheckedSqr);
__.sillySquare = __.partial1(
  __.condition1(_04.validator('should be event', _03.isEven)),
  __.checkedSqr);

module.exports = __;

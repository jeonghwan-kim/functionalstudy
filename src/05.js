const _ = require('underscore');
const _01 = require('./01');
const _02 = require('./02');
const _03 = require('./03');
const _04 = require('./04');

let _05 = {
  /**
   * 으마으마한 함수구만
   * @param funs
   * @returns {function(*=, ...[*]=)}
   */
  dispatch(...funs) {
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
  },

  stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join('');
  },

  rightAwayInvoker(...args) {
    const method = args.shift();
    const target = args.shift();
    return method.apply(target, args);
  },

  curry(fun) {
    return arg => fun(arg)
  },

  curry2(fun) {
    return secondArg => firstArg => fun(firstArg, secondArg);
  },

  curry3(fun) {
    return last => middle => first => {
      return fun(first, middle, last)
    };
  },

  partial1(fun, arg1) {
    return (...args) => {
      args = _02.construct(arg1, args);
      return fun.apply(fun, args);
    };
  },

  partial2(fun, arg1, arg2) {
    return (...args) => {
      args = _02.cat([arg1, arg2], args);
      return fun.apply(fun, args);
    };
  },

  partial(fun, ...pargs) {
    return (...args) => {
      args = _02.cat(pargs, args);
      return fun.apply(fun, args);
    }
  },

  condition1(...validators) {
    return (fun, arg) => {
      const errors = _02.mapcat(isValid => {
        return isValid(arg) ? [] : [isValid.message]
      }, validators);

      if (!_.isEmpty(errors)) throw new Error(errors.join(', '));

      return fun(arg);
    }
  },

  uncheckedSqr(n) { return n * n; }
};

_05.rev = _05.dispatch(
    _04.invoker('reverse', Array.prototype.reverse),
    _05.stringReverse);

_05.sillyReverse = _05.dispatch(_05.rev, _04.always(42));

_05.greaterThan = _05.curry2((lhs, rhs) => lhs > rhs);
_05.lessThan = _05.curry2((lhs, rhs) => lhs < rhs);
_05.withInRange = _04.checker(
    _04.validator('must be greater than 10', _05.greaterThan(10)),
    _04.validator('must be less than 20', _05.lessThan(20)));

_05.sqrPre = _05.condition1(
    _04.validator('arg must not be zero', n => n !== 0),
    _04.validator('arg must be a number', _.isNumber));
_05.sqrPost = _05.condition1(
    _04.validator('result should be a number', _.isNumber),
    _04.validator('result should not be zero', n => n !== 0),
    _04.validator('result should be positive', n => n > 0));


_05.checkedSqr = _05.partial1(_05.sqrPre, _05.uncheckedSqr);

_05.sillySquare = _05.partial1(
    _05.condition1(_04.validator('should be event', _03.isEven)),
    _05.checkedSqr);


module.exports = _05;

const _ = require('underscore');
const _01 = require('./01');
const _02 = require('./02');

const finder = (valueFun, bestFun, coll) => {
  return _.reduce(coll, (best, current) => {
    const bestVal = valueFun(best);
    const currentVal = valueFun(current);
    return (bestVal === bestFun(bestVal, currentVal)) ? best: current;
  });
};

const best = (fun, coll) => {
  return _.reduce(coll, (x, y) => {
    return fun(x, y) ? x : y
  });
};

const repeat = (times, VALUE) => _.map(_.range(times), () => VALUE);
const repeatedly = (times, fun) => _.map(_.range(times), fun);

const iterateUntil = (fun, check, init) => {
  let ret = [];
  let result = fun(init);

  while (check(result)) {
    ret.push(result);
    result = fun(result);
  }

  return ret;
};

/**
 * Combinator (5장에서 설명할 것임)
 * @param n
 */
const always = n => () => n;

const invoker = (NAME, METHOD) => {
  return (target, ...args) => {
    if (!_01.existy(target)) _01.fail('Must provide a target');

    const targetMethod = target[NAME];

    return _01.doWhen((_01.existy(targetMethod) && METHOD === targetMethod), () => {
      return targetMethod.apply(target, args);
    });
  } ;
};

const uniqueString = prefix => [prefix, new Date().getTime()].join('');
const makeUniquStringFunction = start => {
  let COUNTER = start;
  return prefix => [prefix, COUNTER++].join('');
};

/**
 * 끝내주네
 * @param fun
 * @param args
 * @returns {function(...[*]=)}
 */
const fnull = (fun, ...args) => {
  let defaults = args;

  return (...args) => {
    let args1 = _.map(args, (e, i) => {
      return _01.existy(e) ? e : defaults[i];
    });
    return fun.apply(null, args1);
  };
};

/**
 * 어마무시하네
 * @param d
 * @returns {function(*=, *)}
 */
const defaults = d => {
  return (o, k) => {
    const val = fnull(_.identity, d[k]);
    return o && val(o[k]);
  };
};

const checker = (...validators) => {
  return obj => {
    return _.reduce(validators, (errs, check) => {
      if (check(obj)) return errs;
      else return _.chain(errs).push(check.message).value();
    }, []);
  }
};

const validator = (msg, fun) => {
  const f = (...args) => fun.apply(fun, args);
  f['message'] = msg;
  return f;
};

/**
 * validator와 비슷한 패턴인데
 * @param KEYS
 * @returns {function(*=)}
 */
const hasKeys = (...KEYS) => {
  const fun = obj => {
    return _.every(KEYS, k => _.has(obj, k));
  };

  fun.message = _02.cat(['Must have values for keys:'], KEYS).join(' ');
  return fun;
};


module.exports = {
  finder: finder,
  best: best,
  repeat: repeat,
  repeatedly: repeatedly,
  iterateUntil: iterateUntil,
  always: always,
  invoker: invoker,
  uniqueString: uniqueString,
  makeUniquStringFunction: makeUniquStringFunction,
  fnull: fnull,
  defaults: defaults,

  checker: checker,
  validator: validator,
  hasKeys: hasKeys,
};
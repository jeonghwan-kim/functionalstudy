const _ = require('underscore');
const _01 = require('./01');
const _02 = require('./02');
const __ = {};

__.finder = (valueFun, bestFun, coll) =>{
  return _.reduce(coll, (best, current) => {
    const bestVal = valueFun(best);
    const currentVal = valueFun(current);
    return (bestVal === bestFun(bestVal, currentVal)) ? best: current;
  });
};
__.best = (fun, coll) => _.reduce(coll, (x, y) => fun(x, y) ? x : y);
__.repeat = (times, VALUE) => _.map(_.range(times), () => VALUE);
__.repeatedly = (times, fun) => _.map(_.range(times), fun);
__.iterateUntil = (fun, check, init) => {
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
__.always = n => () => n;
__.invoker = (NAME, METHOD) => {
  return (target, ...args) => {
    if (!_01.existy(target)) _01.fail('Must provide a target');

    const targetMethod = target[NAME];

    return _01.doWhen(
        _01.existy(targetMethod) && METHOD === targetMethod,
        () => targetMethod.apply(target, args));
  };
};
__.uniqueString = prefix => [prefix, new Date().getTime()].join('');
__.makeUniquStringFunction = start =>  {
  let COUNTER = start;
  return prefix => [prefix, COUNTER++].join('');
};
/**
 * 끝내주네
 * @param fun
 * @param args
 * @returns {function(...[*]=)}
 */
__.fnull = (fun, ...args) => {
  let defaults = args;

  return (...args) => {
    let args1 = _.map(args, (e, i) => _01.existy(e) ? e : defaults[i]);
    return fun.apply(null, args1);
  };
};
/**
 * 어마무시하네
 * @param d
 * @returns {function(*=, *)}
 */
__.defaults = d => {
  return (o, k) => {
    const val = __.fnull(_.identity, d[k]);
    return o && val(o[k]);
  };
};
__.checker = (...validators) => {
  return obj => {
    return _.reduce(validators, (errs, check) => {
      if (check(obj)) return errs;
      else return _.chain(errs).push(check.message).value();
    }, []);
  }
};
__.validator = (msg, fun) => {
  const f = (...args) => fun.apply(fun, args);
  f['message'] = msg;
  return f;
};
/**
 * validator와 비슷한 패턴인데
 * @param KEYS
 * @returns {function(*=)}
 */
__.hasKeys =  (...KEYS) => {
  const fun = obj => _.every(KEYS, k => _.has(obj, k));
  fun.message = _02.cat(['Must have values for keys:'], KEYS).join(' ');
  return fun;
};

module.exports = __;

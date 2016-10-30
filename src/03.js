const _ = require('underscore');
const __ = {};

__.globals = {};
__.makeBindFun = resolver => {
  return (k, v) => {
    let stack = __.globals[k] || [];
    __.globals[k] = resolver(stack, v);
    return __.globals;
  };
};
__.stackBinder = __.makeBindFun((stack, v) => {
  stack.push(v);
  return stack;
});
__.stackUnbinder = __.makeBindFun(stack => {
  stack.pop();
  return stack;
});
/**
 * this 레퍼런스 해석 시뮬레이션으로 보자
 * @param k
 */
__.dynamicLookup = k => {
  const slot = __.globals[k] || [];
  return _.last(slot);
};
__.whatWasTheLocal = () => {
  const CAPTURED = "Oh hai";
  return () => `The local was: ${CAPTURED}`;
};
__.createScaleFunction = FACTOR => v => _.map(v, n => n * FACTOR);
__.createWeirdScaleFunction = FACTOR => {
  return function(v) {
    this['FACTOR'] = FACTOR;
    var captures = this;
    return _.map(v, _.bind(function(n) {return n * this['FACTOR'];}, captures));
  }
};
__.complement = PRED => (...args) => !PRED.apply(null, ...args);
__.isEven = n => n % 2 === 0;
__.isOdd = n => __.complement(__.isEven);
__.plucker = FIELD => obj => obj && obj[FIELD];

module.exports = __;
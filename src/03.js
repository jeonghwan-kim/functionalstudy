const _ = require('underscore');

// 3.3 동적 스코프

let globals = {};

const makeBindFun = resolver => {
  return (k, v) => {
    let stack = globals[k] || [];
    globals[k] = resolver(stack, v);
    return globals;
  };
};

const stackBinder = makeBindFun((stack, v) => {
  stack.push(v);
  return stack;
});

const stackUnbinder = makeBindFun(stack => {
  stack.pop();
  return stack;
});

/**
 * this 레퍼런스 해석 시뮬레이션으로 보자
 * @param k
 */
const dynamicLookup = k => {
  const slot = globals[k] || [];
  return _.last(slot);
};

const whatWasTheLocal = () => {
  const CAPTURED = "Oh hai";
  return () => `The local was: ${CAPTURED}`;
};

const createScaleFunction = FACTOR => v => _.map(v, n => n * FACTOR);

const createWeirdScaleFunction = FACTOR => {
  return function(v) {
    this['FACTOR'] = FACTOR;
    var captures = this;

    return _.map(v, _.bind(function(n) {return n * this['FACTOR'];}, captures));
  }
};

const complement = PRED => (...args) => !PRED.apply(null, ...args);
const isEven = n => n % 2 === 0;
const isOdd = n => complement(isEven);

const plucker = FIELD => obj => obj && obj[FIELD];


module.exports = {
  globals: globals,
  makeBindFun: makeBindFun,
  stackBinder: stackBinder,
  stackUnbinder: stackUnbinder,
  dynamicLookup: dynamicLookup,

  whatWasTheLocal: whatWasTheLocal,
  createScaleFunction: createScaleFunction,
  createWeirdScaleFunction: createWeirdScaleFunction,

  complement: complement,
  isEven: isEven,
  isOdd: isOdd,

  plucker: plucker,
};

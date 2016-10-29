const _ = require('underscore');
const _01 = require('./01');
const _02 = require('./02');
const _03 = require('./03');
const _04 = require('./04');
const _05 = require('./05');
const _06 = require('./06');

let __ = {};

__.LazyChain = function(obj) {
  this._calls = [];
  this._target = obj
} ;
__.LazyChain.prototype.invoke =  function(methodName, ...args) {
  this._calls.push(target => {
    const meth = target[methodName];
    return meth.apply(target, args)
  });
  return this;
};
__.LazyChain.prototype.force = function () {
  return _.reduce(this._calls, (target, thunk) => {
    return thunk(target);
  }, this._target);
};
__.LazyChain.prototype.tap = function(fun) {
  this._calls.push(target => {
    fun(target);
    return target;
  });
  return this;
};
__.LazyChainChain = function (obj) {
  const isLC = obj instanceof __.LazyChain;
  this._calls = isLC ? _02.cat(obj._calls, []) : [];
  this._target = isLC ? obj._target : obj;
};
__.LazyChainChain.prototype = __.LazyChain.prototype;
__.pipeline = (seed, ...args) => _.reduce(args, (l, r) => r(l), seed);

module.exports = __;
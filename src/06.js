const _ = require('underscore');
const _01 = require('./01');
const _02 = require('./02');
const _03 = require('./03');
const _04 = require('./04');
const _05 = require('./05');
const __ = {};

__.myLength = (ary) => {
  if (_.isEmpty(ary)) return 0;
  return 1 + __.myLength(_.rest(ary));
};
__.tcLength = (ary, n) => {
  const l = n ? n : 0;
  if (_.isEmpty(ary)) return l;
  else return __.tcLength(_.rest(ary), l + 1);
};
__.cycle = (times, ary) => {
  if (times <= 0) return [];
  return _02.cat(ary, __.cycle(times - 1, ary));
};
__.constructPair = (pair, rests) => {
  return [_02.construct(_.first(pair), _.first(rests)),
          _02.construct(_01.second(pair), _01.second(rests))];
};
__.unzip = (pairs) => {
  if (_.isEmpty(pairs)) return [[], []];
  return __.constructPair(_.first(pairs), __.unzip(_.rest(pairs)));
};
__.nexts = (graph, node) => {
  if (_.isEmpty(graph)) return [];

  const pair = _.first(graph);
  const from = _.first(pair);
  const to = _01.second(pair);
  const more = _.rest(graph);

  if (_.isEqual(node, from)) return _02.construct(to, __.nexts(more, node));
  else return __.nexts(more, node);
};
__.depthSearch = (graph, nodes, seen) => {
  if (_.isEmpty(nodes)) return _05.rev(seen);

  const node = _.first(nodes);
  const more = _.rest(nodes);

  if (_.contains(seen, node)) return __.depthSearch(graph, more, seen);
  else return __.depthSearch(graph,
                               _02.cat(__.nexts(graph, node), more),
                               _02.construct(node, seen));
};
__.andify = (...preds) => {
  return (...args) => {
    const everything = (ps, truth) => {
      if (_.isEmpty(ps)) return truth;
      else return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
    };
    return everything(preds, true);
  };
};
__.orify = (...preds) => {
  return (...args) => {
    const something = (ps, truth) => {
      if (_.isEmpty(ps)) return truth;
      else return _.every(args, _.first(ps)) || something(_.rest(ps), truth);
    };
    return something(preds, true);
  };
};
__.evenSteven = (n) => {
  if (n === 0) return true;
  return __.oddJohn(Math.abs(n) - 1);
};
__.oddJohn = (n) => {
  if (n === 0) return false;
  return __.evenSteven(Math.abs(n) - 1);
};
__.deepClone = (obj) => {
  if (!_01.existy(obj) || !_.isObject(obj)) return obj;

  let tmp = new obj.constructor();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) tmp[key] = __.deepClone(obj[key]);
  }

  return tmp;
};
__.visit = (mapFun, resultFun, array) => {
  if (_.isArray(array)) return resultFun(_.map(array, mapFun));
  return resultFun(array);
};
__.postDepth = (fun, ary) => __.visit(_05.partial1(__.postDepth, fun), fun, ary);
__.preDepth = (fun, ary) => __.visit(_05.partial1(__.preDepth, fun), fun, fun(ary));
__.influencedWithStrategy = (strategy, lang, graph) => {
  let results = [];

  strategy(x => {
    if (_.isArray(x) && _.first(x) === lang) results.push(_01.second(x));
    return x;
  }, graph);

  return results;
};
__.evenOline = n => {
  if (n === 0) return true;
  return _05.partial(__.oddOline, Math.abs(n) - 1);
};
__.oddOline = n => {
  if (n === 0) return false;
  return _05.partial(__.evenOline, Math.abs(n) - 1);
};
__.trampoline = (fun, ...args) => {
  let result = fun.apply(fun, args);
  while (_.isFunction(result)) result = result();
  return result;
};
__.isEvenSafe = n => {
  if (n === 0) return true;
  else return __.trampoline(_05.partial1(__.oddOline, Math.abs(n) -1 ));
};
__.isOddSafe = n => {
  if (n === 0) return false;
  else return __.trampoline(_05.partial1(__.evenOline, Math.abs(n) -1 ));
};
__.flat = arr => {
  if (_.isArray(arr)) return _02.cat.apply(_02.cat, _.map(arr, __.flat));
  else return [arr];
};

module.exports = __;
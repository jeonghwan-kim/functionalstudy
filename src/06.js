const _ = require('underscore');
const _01 = require('./01');
const _02 = require('./02');
const _03 = require('./03');
const _04 = require('./04');
const _05 = require('./05');

const _06 = {
  myLength(ary) {
    if (_.isEmpty(ary)) return 0;
    return 1 + this.myLength(_.rest(ary));
  },
  tcLength(ary, n) {
    const l = n ? n : 0;
    if (_.isEmpty(ary)) return l;
    else return this.tcLength(_.rest(ary), l + 1);
  },
  cycle(times, ary) {
    if (times <= 0) return [];
    return _02.cat(ary, this.cycle(times - 1, ary));
  },
  constructPair(pair, rests) {
    return [_02.construct(_.first(pair), _.first(rests)),
            _02.construct(_01.second(pair), _01.second(rests))];
  },
  unzip(pairs) {
    if (_.isEmpty(pairs)) return [[], []];
    return this.constructPair(_.first(pairs), this.unzip(_.rest(pairs)));
  },
  nexts(graph, node) {
    if (_.isEmpty(graph)) return [];

    const pair = _.first(graph);
    const from = _.first(pair);
    const to = _01.second(pair);
    const more = _.rest(graph);

    if (_.isEqual(node, from))
      return _02.construct(to, this.nexts(more, node));
    else
      return this.nexts(more, node);
  },
  depthSearch(graph, nodes, seen) {
    if (_.isEmpty(nodes)) return _05.rev(seen);

    const node = _.first(nodes);
    const more = _.rest(nodes);

    if (_.contains(seen, node))
      return this.depthSearch(graph, more, seen);
    else
      return this.depthSearch(graph,
                             _02.cat(this.nexts(graph, node), more),
                             _02.construct(node, seen));
  },
  andify(...preds) {
    return (...args) => {
      const everything = (ps, truth) => {
        if (_.isEmpty(ps))
          return truth;
        else
          return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
      };
      return everything(preds, true);
    };
  },
  orify(...preds) {
    return (...args) => {
      const something = (ps, truth) => {
        if (_.isEmpty(ps))
          return truth;
        else
          return _.every(args, _.first(ps)) || something(_.rest(ps), truth);
      };
      return something(preds, true);
    };
  },
  evenSteven(n) {
    if (n === 0) return true;
    return this.oddJohn(Math.abs(n) - 1);
  },
  oddJohn(n) {
    if (n === 0) return false;
    return this.evenSteven(Math.abs(n) - 1);
  },
  deepClone(obj) {
    if (!_01.existy(obj) || !_.isObject(obj)) return obj;

    let tmp = new obj.constructor();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) tmp[key] = this.deepClone(obj[key]);
    }

    return tmp;
  },
  visit(mapFun, resultFun, array) {
    if (_.isArray(array)) return resultFun(_.map(array, mapFun));
    else                  return resultFun(array);
  },
};

_06.postDepth = (fun, ary) => {
  return _06.visit(_05.partial1(_06.postDepth, fun), fun, ary);
};

_06.preDepth = (fun, ary) => {
  return _06.visit(_05.partial1(_06.preDepth, fun), fun, fun(ary));
};

_06.influencedWithStrategy = (strategy, lang, graph) => {
  let results = [];

  strategy(x => {
    if (_.isArray(x) && _.first(x) === lang) results.push(_01.second(x));
    return x;
  }, graph);

  return results;
};

_06.evenOline = (n) => {
  if (n === 0) return true;
  return _05.partial(_06.oddOline, Math.abs(n) - 1);
};
_06.oddOline = (n) => {
  if (n === 0) return false;
  return _05.partial(_06.evenOline, Math.abs(n) - 1);
};
_06.trampoline = (fun, ...args) => {
  let result = fun.apply(fun, args)
  while (_.isFunction(result)) result = result();
  return result;
};
_06.isEvenSafe = n => {
  if (n === 0) return true;
  else return _06.trampoline(_05.partial1(_06.oddOline, Math.abs(n) -1 ));
};
_06.isOddSafe = n => {
  if (n === 0) return false;
  else return _06.trampoline(_05.partial1(_06.evenOline, Math.abs(n) -1 ));
};

_06.flat = arr => {
  if (_.isArray(arr)) {
    return _02.cat.apply(_02.cat, _.map(arr, _06.flat));
  } else{
    return [arr];
  }
};

module.exports = _06;

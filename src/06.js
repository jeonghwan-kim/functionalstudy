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
  flat(arr) {
    if (_.isArray(arr)) {
      // HACK
      // return _02.cat.apply(_02.cat, _.map(arr, this.flat));
      return _02.cat.apply(_02.cat, _.map(arr, a => this.flat(a)));
    } else{
      return [arr];
    }
  },
  deepClone(obj) {
    if (!_01.existy(obj) || !_.isObject(obj)) return obj;

    let tmp = new obj.constructor();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) tmp[key] = this.deepClone(obj[key]);
    }

    return tmp;
  }
};

module.exports = _06;

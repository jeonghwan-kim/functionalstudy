const _ = require('underscore');
const _01 = require('./01');
const __ = {};

__.doubleAll = arr => _.map(arr, n => n * 2);
__.average = arr => _.reduce(arr, (a, n) => a + n) / _.size(arr);
__.onlyEven = arr => _.filter(arr, n => (n % 2) === 0);
__.cat = (...args) => {
  const head = _.first(args);
  if (_01.existy(head)) return head.concat.apply(head, _.rest(args));
  else return [];
};
__.construct = (head, tail) => __.cat([head], _.toArray(tail));
__.mapcat = (fun, coll) => __.cat.apply(null, _.map(coll, fun));
__.butLast = coll => _.toArray(coll).slice(0, -1);
__.interpose = (inter, coll) => {
  return __.butLast(__.mapcat(e => __.construct(e, [inter]), coll));
};
__.project = (table, keys) => {
  return _.map(table, obj => _.pick.apply(null, __.construct(obj, keys)));
};
__.rename = (obj, newNames) => {
  return _.reduce(newNames, (o, nu, old) => {
    if (_.has(obj, old)) o[nu] = obj[old];
    return o;
  }, _.omit.apply(null, __.construct(obj, _.keys(newNames))));
};
__.as = (table, newNames) => _.map(table, obj => __.rename(obj, newNames));
__.restrict = (table, pred) => {
  return _.reduce(table, (newTable, obj) => {
    if (_01.truthy(pred(obj))) return newTable;
    else return _.without(newTable, obj);
  }, table);
};

module.exports = __;

const _ = require('underscore');
const _01 = require('./01');

const doubleAll = arr => _.map(arr, n => n * 2);

const average = arr => _.reduce(arr, (a, n) => a + n) / _.size(arr);

const onlyEven = arr => _.filter(arr, n => (n % 2) === 0);

const cat = (...args) => {
  const head = _.first(args);
  if (_01.existy(head)) return head.concat.apply(head, _.rest(args));
  else return [];
};

const construct = (head, tail) => cat([head], _.toArray(tail));

const mapcat = (fun, coll) => cat.apply(null, _.map(coll, fun));

const butLast = coll => _.toArray(coll).slice(0, -1);

const interpose = (inter, coll) => {
  return butLast(mapcat(e => construct(e, [inter]), coll));
};

const project = (table, keys) => {
  return _.map(table, obj => {
    return _.pick.apply(null, construct(obj, keys));
  });
};

const rename = (obj, newNames) => {
  return _.reduce(newNames, (o, nu, old) => {
    if (_.has(obj, old)) o[nu] = obj[old];
    return o;
  }, _.omit.apply(null, construct(obj, _.keys(newNames))));
};

const as = (table, newNames) => _.map(table, obj => rename(obj, newNames));

const restrict = (table, pred) => {
  return _.reduce(table, (newTable, obj) => {
    if (_01.truthy(pred(obj))) return newTable;
    else return _.without(newTable, obj);
  }, table);
};


module.exports = {
  doubleAll: doubleAll,
  average: average,
  onlyEven: onlyEven,
  cat: cat,
  construct: construct,
  mapcat: mapcat,
  butLast: butLast,
  interpose: interpose,
  project: project,
  rename: rename,
  as: as,
  restrict: restrict,
};


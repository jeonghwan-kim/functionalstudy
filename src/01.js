const _ = require('underscore');


const splat = fun => array => fun.apply(null, array);

const unsplat = fun => {
  return function() { return fun.call(null, _.toArray(arguments)); };
};


// 32 page
const parseAge = age => {
  if (!_.isString(age)) fail('Expecting a string');
  var a;

  note('Attempting to parse an age');
  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    warn(["Could not parse age:", age].join(' '));
    a = 0;
  }

  return a;
};


const fail = thing => { throw new Error(thing); };
const warn = thing => console.log(["WARNING:", thing].join(' '));
const note = thing => console.log(["NOTE:", thing].join(' '));

// 35 page
const isIndexed = data => _.isArray(data) || _.isString(data);

const nth = (a, index) => {
  if (!_.isNumber(index)) fail("Expected a number as the index");
  if (!isIndexed(a)) fail("Not supported on non-indexed type");
  if ((index < 0) || (index > a.length - 1)) fail("index value is out of bounds");
  return a[index];
};

const second = a => nth(a, 1);

// 37 page
const existy = x => x != null;
const truthy = x => x !== false && existy(x);

const comparator = pred => {
  return (x, y) => {
    if (truthy(pred(x, y))) return -1;
    if (truthy(pred(y, x))) return 1;
    return 1;
  };
};

// 41 page
const lameCSV = str => {
  return _.reduce(str.split("\n"), (table, row) => {
    table.push(_.map(row.split(','), c => c.trim()));
    return table;
  }, [])
};
const selectNames = table => _.rest(_.map(table, _.first));
const selectAge = table => _.rest(_.map(table, second));
const selectHair = table => _.rest(_.map(table, row => nth(row, 2)));


const doWhen = (cond, action) => {
  if (truthy(cond)) return action();
  else return undefined;
};


module.exports = {
  splat: splat,
  unsplat: unsplat,
  parseAge: parseAge,
  fail: fail,
  warn: warn,
  note: note,
  nth: nth,
  second: second,
  existy: existy,
  truthy: truthy,
  comparator: comparator,
  lameCSV: lameCSV,
  selectNames: selectNames,
  selectAge: selectAge,
  selectHair: selectHair,
  doWhen: doWhen,
};
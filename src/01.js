const _ = require('underscore');
const __ = {};

__.splat = fun => array => fun.apply(null, array);
__.unsplat = fun => (...args) => fun.call(null, _.toArray(args));
__.parseAge = age => {
  if (!_.isString(age)) fail('Expecting a string');
  var a;
  __.note('Attempting to parse an age');
  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    __.warn(["Could not parse age:", age].join(' '));
    a = 0;
  }
  return a;
};
__.fail = thing => { throw new Error(thing); };
__.warn = thing => console.log(["WARNING:", thing].join(' '));
__.note = thing => console.log(["NOTE:", thing].join(' '));
__.isIndexed = data => _.isArray(data) || _.isString(data);
__.nth = (a, index) => {
  if (!_.isNumber(index)) fail("Expected a number as the index");
  if (!__.isIndexed(a)) fail("Not supported on non-indexed type");
  if ((index < 0) || (index > a.length - 1)) fail("index value is out of bounds");
  return a[index];
};
__.second = a => __.nth(a, 1);
__.existy = x => x != null;
__.truthy = x => x !== false && __.existy(x);
__.comparator = pred => {
  return (x, y) => {
    if (__.truthy(pred(x, y))) return -1;
    if (__.truthy(pred(y, x))) return 1;
    return 1;
  };
};
__.lameCSV = str => {
  return _.reduce(str.split("\n"), (table, row) => {
    table.push(_.map(row.split(','), c => c.trim()));
    return table;
  }, [])
};
__.selectNames = table => _.rest(_.map(table, _.first));
__.selectAge = table => _.rest(_.map(table, __.second));
__.selectHair = table => _.rest(_.map(table, row => __.nth(row, 2)));
__.doWhen = (cond, action) => {
  if (__.truthy(cond)) return action();
  else return undefined;
};

module.exports = __;

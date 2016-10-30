const _ = require('underscore');
const _04 = require('./04');
const _05 = require('./05');
const __ = {};

__.rand = _05.partial1(_.random, 1);
__.randString = len => {
  const ascii = _04.repeatedly(len, _05.partial1(__rand, 26));
  return _.map(ascii, n => n.toString(36)).join('');
};

module.exports = __;

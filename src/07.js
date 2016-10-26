const _ = require('underscore');
const _01 = require('./01');
const _02 = require('./02');
const _03 = require('./03');
const _04 = require('./04');
const _05 = require('./05');
const _06 = require('./06');

let _07 = {};

const rand = _05.partial1(_.random, 1);

_07.randString = len => {
  const ascii = _04.repeatedly(len, _05.partial1(rand, 26));
  return _.map(ascii, n => n.toString(36)).join('');
};

module.exports = _07;

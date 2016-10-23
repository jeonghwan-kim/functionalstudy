const _ = require('underscore');
const should = require('should');
const util = require('./util');
const _01 = require('./01');
const _02 = require('./02');
const _03 = require('./03');
const _04 = require('./04');
const _05 = require('./05');
const _06 = require('./06');

describe('06.js', () => {
  describe('myLength()', () => {
    it('myLength()', () => {
      _06.myLength(_.range(10)).should.be.equal(10)
    });
    it('tcLength()', () => {
      _06.tcLength(_.range(10)).should.be.equal(10)
    });
  });
  describe('cycle()', () => {
    it('', () => {
      _06.cycle(2, [1, 2, 3]).should.be.deepEqual([1, 2, 3, 1, 2, 3]);
    });
  });
  describe('unzip()', () => {
    it('constructPair()', () => {
      _06.constructPair(['a', 1], [[], []])
          .should.be.deepEqual([['a'], [1]]);
    });
    it('', () => {
      _.zip.apply(null, _06.constructPair(['a', 1], [[], []]))
          .should.be.deepEqual([['a', 1]]);
    });
    it('', () => {
      _06.unzip(_.zip([1, 2, 3], [4, 5, 6]))
          .should.be.deepEqual([[1, 2, 3], [4, 5, 6]]);
    })
  });
  describe('graph', () => {
    const influences = [
      ['Lisp', 'Smalltalk'],
      ['Lisp', 'Scheme'],
      ['Smalltalk', 'Self'],
      ['Scheme', 'JavaScript'],
      ['Scheme', 'Lua'],
      ['Self', 'Lua'],
      ['Self', 'JavaScript']
    ];

    it('next()', () => {
      _06.nexts(influences, 'Lisp').should.be.deepEqual(['Smalltalk', 'Scheme']);
    });
    it('depthSearch()', () => {
      _06.depthSearch(influences, ['Lisp'], []).should.be.deepEqual(
          ['Lisp', 'Smalltalk', 'Self', 'Lua', 'JavaScript', 'Scheme']);
    })
  });
  describe('andify()', () => {
    it('', () => {
      const evenNums = _06.andify(_.isNumber, _02.isEven);
      evenNums(1, 2).should.be.false;
      evenNums(2, 4, 6, 8).should.be.true;
    });
  });
  describe('orify()', () => {
    it('', () => {
      const evenNums = _06.orify(_02.isOdd, n => n === 0);
      evenNums(1, 2).should.be.true;
      evenNums(0, 2).should.be.true;
      evenNums(2, 4).should.be.false;
    });
  });
  describe('evenSteven()/oddJohn()', () => {
    it('evenSteven()', () => {
      _06.evenSteven(12).should.be.true;
    });
    it('oddJohn()', () => {
      _06.oddJohn(12).should.be.false;
    });
  });
  describe('flat()', () => {
    it('', () => {
      _06.flat([[1, 2], [3, 4]]).should.be.deepEqual([1, 2, 3, 4]);
      _06.flat([[1, 2], [[[3, [4]]]]]).should.be.deepEqual([1, 2, 3, 4]);
    });
  });
  describe('deepEqual()', () => {
    it('', () => {
      let x = [{a: [1,2,3], b: 42}, {c: {d: []}}];
      let y = _06.deepClone(x);

      _.isEqual(x, y).should.be.true;
      y[1].c.d = 42;
      _.isEqual(x, y).should.be.false;
    })
  })
});
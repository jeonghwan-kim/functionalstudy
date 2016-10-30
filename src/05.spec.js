const _ = require('underscore');
const should = require('should');
const util = require('./util');
const _04 = require('./04');
const _05 = require('./05');

describe('05.js', () => {
  const plays = [
    {artist: 'Burial', track: 'Archangel'},
    {artist: 'Ben Frost', track: 'Stomp'},
    {artist: 'Ben Frost', track: 'Stomp'},
    {artist: 'Burial', track: 'Archangel'},
    {artist: 'Emeralds', track: 'Snores'},
    {artist: 'Burial', track: 'Archangel'}];
  const songToString = song => `${song.artist}-${song.track}`;
  describe('despatch()', () => {
    it('', () => {
      const str = _05.dispatch(
          _04.invoker('toString', Array.prototype.toString),
          _04.invoker('toString', String.prototype.toString));

      str('a').should.be.equal('a');
      str(_.range(10)).should.be.equal('0,1,2,3,4,5,6,7,8,9');
    });
  });
  describe('rev()', () => {
    it('', () => {
      _05.rev([1, 2, 3]).should.be.deepEqual([3, 2, 1]);
      _05.rev('abc').should.be.equal('cba')
    });
  });
  describe('sillyReverse()', () => {
    it('', () => {
      _05.sillyReverse([1, 2, 3]).should.be.deepEqual([3, 2, 1]);
      _05.sillyReverse('abc').should.be.equal('cba');
      _05.sillyReverse(1000000).should.be.equal(42)
    });
  });
  describe('rightAwayInvoker()', () => {
    it('', () => {
      _05.rightAwayInvoker(Array.prototype.reverse, [1, 2, 3])
          .should.be.deepEqual([3, 2, 1]);
    });
  });
  describe('curry()', () => {
    it('', () => {
      ['11', '11', '11', '11'].map(_05.curry(parseInt))
          .should.be.deepEqual([11, 11, 11, 11])
    });
  });
  describe('curry2()', () => {
    it('my idea', () => {
      ['11', '11', '11', '11'].map(_05.curry2(parseInt)(2))
          .should.be.deepEqual([3, 3, 3, 3])
    });
    it('134', () => {
      const div = (n, d) => n / d;
      const div10 = _05.curry2(div)(10);
      div10(50).should.be.equal(5);
    });
    it('songCount example', () => {
      const songCount = _05.curry2(_.countBy)(songToString);
      songCount(plays)['Burial-Archangel'].should.be.equal(3);
      songCount(plays)['Ben Frost-Stomp'].should.be.equal(2);
      songCount(plays)['Emeralds-Snores'].should.be.equal(1);
    });
  });
  describe('curry3()', () => {
    it('136', () => {
      const songsPlayed = _05.curry3(_.uniq)(songToString)(false);
      songsPlayed(plays).should.be.deepEqual([
        {artist: 'Burial', track: 'Archangel'},
        {artist: 'Ben Frost', track: 'Stomp'},
        {artist: 'Emeralds', track: 'Snores'}
      ]);
    });
    it('blueGreenish()', () => {
      const toHex = n => {
        n = n.toString(16);
        return n.length < 2 ? `0${n}` : n;
      };
      const rgbToHexString = (r, g, b) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      rgbToHexString(255, 255, 255).should.be.equal('#ffffff');
      const blueGreenish = _05.curry3(rgbToHexString)(255)(200);
      blueGreenish(0).should.be.equal('#00c8ff');
    });
  });
  describe('withInRange()', () => {
    it('', () => {
      _05.withInRange(15).should.have.length(0);
      _05.withInRange(9).should.have.length(1);
      _05.withInRange(21).should.have.length(1);
    });
  });
  describe('partial1()', () => {
    it('140', () => {
      const over10Part1 = _05.partial1((a,b) => a/b, 10);
      over10Part1(5).should.be.equal(2);
    });
  });
  describe('partial2()', () => {
    it('141', () => {
      const div10By2 = _05.partial2((a,b) => a/b, 10, 2);
      div10By2().should.be.equal(5);
    });
  });
  describe('partial()', () => {
    it('141', () => {
      const over10Partial = _05.partial((a,b) => a/b, 10);
      over10Partial(2).should.be.equal(5);
    });
    it('142', () => {
      const div10By2By4By5000Partial = _05.partial((a,b) => a/b, 10, 2, 4, 5000);
      div10By2By4By5000Partial().should.be.equal(5);
    });
  });
  describe('condition1()', () => {
    it('sqrPre()', () => {
      _05.sqrPre(_.identity, 10).should.be.equal(10)
      should.throws(() => sqrPre(_.identity, ''));
    });
    it('sqrPost()', () => {
      should.throws(() => _05.sqrPost(_.identity, 0));
      should.throws(() => _05.sqrPost(_.identity, -1));
      should.throws(() => _05.sqrPost(_.identity, ''));
      _05.sqrPost(_.identity, 100).should.be.equal(100);
    });
  });
  describe('checkedSqr()', () => {
    it('', () => {
      _05.checkedSqr(10).should.be.equal(100);
      should.throws(() => _05.checkedSqr(''))
      should.throws(() => _05.checkedSqr(0))
    });
  });
  describe('sillySquare()', () => {
    it('', () => {
      _05.sillySquare(10).should.be.equal(100);
      should.throws(() => _05.sillySquare(11))
      should.throws(() => _05.sillySquare(''))
      should.throws(() => _05.sillySquare(0))
    });
  });

});

const _ = require('underscore');
const should = require('should');
const util = require('./util');
const _01 = require('./01');
const _02 = require('./02');
const _03 = require('./03');
const _04 = require('./04');
const _05 = require('./05');
const _06 = require('./06');
const _07 = require('./07');
const _08 = require('./08');

describe('08.js', ()=> {
  let hook;
  beforeEach('', ()=> hook = util.captureStream(process.stdout));
  afterEach('', ()=> hook.unhook());
  describe('LazyChain()', ()=> {
    it('force()', ()=> {
      new _08.LazyChain([2,1,3])
          .invoke('sort')
          .force().should.be.equal([1,2,3]);
    });
    it('multi invokes', ()=> {
      new _08.LazyChain([2,1,3])
          .invoke('concat', [8,5,6,7])
          .invoke('sort')
          .invoke('join', ' ')
          .force().should.be.equal('1 2 3 5 6 7 8');
    });
    it('tap', ()=> {
      const r = new _08.LazyChain([2,1,3])
          .invoke('sort')
          .tap(console.log)
          .force();
      hook.captured().should.be.equal('[ 1, 2, 3 ]\n');
    });
    it('tap', ()=> {
      const r = new _08.LazyChain([2,1,3])
          .invoke('sort')
          .tap(console.log).should.be.instanceOf(_08.LazyChain);
    });
    it('LazyChainChain', ()=> {
      const deferredSort = new _08.LazyChain([2,1,3])
          .invoke('sort')
          .tap(console.log);
      new _08.LazyChainChain(deferredSort)
          .invoke('toString')
          .force().should.be.equal('1,2,3');
      hook.captured().should.be.equal('[ 1, 2, 3 ]\n');
    });
    it.only('pipeline()', ()=> {
      (_08.pipeline() === undefined).should.be.true;
      _08.pipeline(42).should.be.equal(42);
      _08.pipeline(42, n => -n).should.be.equal(-42);
    })


  });
});

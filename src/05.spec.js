const _ = require('underscore');
const should = require('should');
const _04 = require('./04');
const _05 = require('./05');

describe.only('05.js', () => {
  describe('despatch', () => {
    it('', () => {
      const str = _05.dispatch(
          _04.invoker('toString', Array.prototype.toString),
          _04.invoker('toString', String.prototype.toString));

      str('a').should.be.equal('a');
      str(_.range(10)).should.be.equal('0,1,2,3,4,5,6,7,8,9');
    });
  });
});

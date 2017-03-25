const should = require('should');
const app = require('./index');

describe('high-order-function', ()=> {
  describe('sum', ()=> {
    const sum = app.sum;
    it('모든 값을 더한다', ()=>{
      sum(1,2,3,4,5).should.be.equal(15)
    })
  })
  describe('sumArr', ()=> {
    const sumArr = app.sumArr;
    it('배열의 모든 값을 더한다', ()=>{
      sumArr([1,2,3,4,5]).should.be.equal(15)
    })
  })
  describe('safeSum', ()=> {
    const safeSum = app.safeSum;
    it('null 값이 있는 경우 0으로 대채하고 더한다', ()=>{
      safeSum(1,null,3,4,5).should.be.equal(13)
    })
    it('null 첫번째 파라매터로 올경우 0으로 대채하고 더한다', ()=>{
      safeSum(null,2,3,4,5).should.be.equal(14)
    })
  });
  describe('safeMultiply', ()=> {
    const safeMultiply = app.safeMultiply;
    it('null 값이 있는 경우 1으로 대채하고 곱한다', ()=>{
      safeMultiply(1,null,3,4,5).should.be.equal(60)
    })
    it('null 첫번째 파라매터로 올경우 1으로 대채하고 곱한다', ()=>{
      safeMultiply(null,2,3,4,5).should.be.equal(120)
    })
  });
  describe('checkObj', ()=> {
    const {checkObj, isObj, hasProp, isNum} = app;
    it('객체인지 체크한다', ()=> {
      const checker = checkObj(isObj(), hasProp('age'), isNum('age'));
      checker({age: 1}).should.be.equal(true);
    })
  })
})
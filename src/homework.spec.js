const should = require('should');
const homework = require('./homework');

describe('homework', () => {
  describe('solution1', () => {
    it('should return sum value', () => {
      [1, 2, 3, 4].reduce(homework.solution1).should.be.equal(10);
      [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(homework.solution1).should.be.equal(45);
    });
    it('should check parameters', () => {
      (() => ['1', 2].reduce(homework.solution1)).should.throw();
      (() => [1, '2'].reduce(homework.solution1)).should.throw();
      (() => ['1', '2'].reduce(homework.solution1)).should.throw();
    });
    it('should check result', () => {
      (() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce(homework.solution1)).should.throw();
    });
  });
});

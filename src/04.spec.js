const _ = require('underscore');
const should = require('should');
const _04 = require('./04');
const _03 = require('./03');

describe('04.js', () => {
  it('finder()', () => {
    _04.finder(_.identity, Math.max, [1,2,3,4,5]).should.be.equal(5);

    const people = [
      {name: 'Daniel', age: 36},
      {name: 'Chris', age: 34},
      {name: 'Marcus', age: 35},
    ];

    _04.finder(_03.plucker('age'), Math.max, people)
        .should.be.deepEqual(people[0]);
    _04.finder(_03.plucker('name'),
              (a, b) => a.charAt(0) === 'M' ? a : b,
              people)
        .should.be.deepEqual(people[2]);
  });

  it('best()', () => {
    _04.best((x, y) => x > y, [1,2,3,4,5]).should.be.equal(5);
  });

  it('repeat()', () => {
    _04.repeat(5, 'a').should.be.deepEqual(['a','a','a','a','a']);
  });

  it('repeatedly', () => {
    _04.repeatedly(3, () => Math.floor(Math.random()*10) + 1)
        .should.have.length(3);
  });

  it('iterateUntil()', () => {
    _04.iterateUntil(n => n + n, n => n <= 32, 1)
        .should.be.deepEqual([2, 4, 8, 16, 32]);
  });

  it('always()', () => {
    const f = _04.always(() => {});
    // alway는 항상 일정한 값을 생산하므로 VALUE에 바운드된 캡처 함수가 항상 같다
    f().should.be.equal(f());

    const g = _04.always(() => {});
    // 새로운 클로저는 매번 다른 값을 캡쳐한다 (111쪽)
    (g() === f()).should.be.false;
  });

  it('invoker()', () => {
    const rev = _04.invoker('reverse', Array.prototype.reverse);
    _.map([[1,2,3]], rev).should.be.deepEqual([[3,2,1]]);
  });

  it('uniqueString()', () => {
    _04.uniqueString('foo').substr(0, 3).should.be.equal('foo');

    const uniqueString = _04.makeUniquStringFunction(1);
    uniqueString('foo').should.be.equal('foo1');
    uniqueString('foo').should.be.equal('foo2');
  });

  it('fnull()', () => {
    const nums = [1, 2, 3, null, 5];
    const safeMult = _04.fnull((total, n) => total * n, 1/* reduce 2nd params*/, 1);
    _.reduce(nums, safeMult).should.be.equal(30);
  });

  it('defaults', () => {
    const doSomthing = config => {
      let lookup = _04.defaults({critical: 108});
      return lookup(config, 'critical');
    };
    doSomthing({critical: 9}).should.be.equal(9);
    doSomthing({}).should.be.equal(108);
  });

  describe('객체 검증자', () => {
    it('checker()', () => {
      const alwaysPasses = _04.checker(_04.always(true), _04.always(true));
      alwaysPasses({}).should.have.length(0);

      const fails = _04.always(false);
      fails.message = 'a failure in life';
      const alwaysFails = _04.checker(fails);

      alwaysFails({}).should.be.deepEqual([fails.message]);
    });

    it('validator()', () => {
      const gonnaFail = _04.checker(_04.validator('ZOMG!', _04.always(false)));
      gonnaFail(100)[0].should.be.equal('ZOMG!');

      const aMap = obj => _.isObject(obj);
      const checkCmd = _04.checker(_04.validator('must be a map', aMap));
      checkCmd({}).should.be.true;
      checkCmd(42)[0].should.be.equal('must be a map');
    });

    it('hasKeys()', () => {
      const aMap = obj => _.isObject(obj);
      const checkCmd = _04.checker(
          _04.validator('must be a map', aMap),
          _04.hasKeys('msg', 'type'));

      checkCmd({msg: 'foo', type: 'bar'}).should.have.length(0);
      checkCmd(32).should.have.length(2);
      checkCmd({}).should.have.length(1);
    })
  });


});

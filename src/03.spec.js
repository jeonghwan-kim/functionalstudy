const _ = require('underscore');
const should = require('should');
const _03 = require('./03');

describe('03.js', () => {
  it('3.1 동적 스코핑 시뮬레이션', () => {
    _03.stackBinder('a', 1);
    _03.stackBinder('b', 100);

    _03.dynamicLookup('a').should.be.equal(1);
    _03.globals.should.be.deepEqual({a: [1], b: [100]});

    _03.stackBinder('a', '*');
    _03.dynamicLookup('a').should.be.equal('*');
    _03.globals.should.be.deepEqual({a: [1, '*'], b: [100]});

    _03.stackUnbinder('a');
    _03.dynamicLookup('a').should.be.equal(1);
    _03.globals.should.be.deepEqual({a: [1], b: [100]});

    const f = () => _03.dynamicLookup('a');
    const g = () => {
      _03.stackBinder('a', 'g');
      _03.stackUnbinder('a');
      return f();
    };

    f().should.be.equal(1); // f() 에서 this 값
    g().should.be.equal(1); // g() -> f()에서 this 값
  });

  it('3.3.1 자바스크립트의 동적 스코핑', () => {
    let target = {
      name: 'the right value',
      aux: function() { return this.name; },
      act: function() { return this.aux(); }
    };

    should.throws(() => target.act.call('wat'));

    _.bindAll(target, 'aux', 'act');
    target.act.call('wat').should.be.equal(target.name);
  });

  it('3.4 함수수코프', () => {
    function strangeIdentity(n) {
      for(this['i']=0; this['i']<n; this['i']++);
      return this['i'];
    }

    strangeIdentity(108).should.be.equal(108);
    i.should.be.equal(108);

    strangeIdentity.call({}, 1000).should.be.not.equal(108).and.equal(1000);
    i.should.be.equal(108);

    function f() {
      this['a'] = 200;
      return this['a'] + this['b'];
    }

    let globals = { b: 2 };

    f.call(_.clone(globals)).should.be.equal(202);
    globals.should.be.deepEqual(globals)
  });

  describe('3.5 동적스코핑', () => {
    it('3.5.1 클로져 시뷸레이션', () => {
      const reportLocal = _03.whatWasTheLocal();
      reportLocal().should.be.equal('The local was: Oh hai');

      let scale10 = _03.createScaleFunction(10);
      scale10([1,2,3]).should.be.deepEqual([10,20,30]);

      scale10 = _03.createWeirdScaleFunction(10);
      scale10([1,2,3]).should.be.deepEqual([10,20,30]);
    });

    it('3.5.2 클로저 사용하기', () => {
      _03.isOdd(2).should.be.false;
      _03.isOdd(1).should.be.true;

      const showObject = OBJ => () => OBJ;
      let o = {a: 42};
      let showO = showObject(o);
      showO().should.be.deepEqual({a: 42});
      o.newField = 108;
      showO().should.be.deepEqual({a: 42, newField: 108});

      const pingpong = (() => {
        let PRIVATE = 0;
        return {
          inc(n) { return PRIVATE += n; },
          dec(n) { return PRIVATE -= n; }
        }
      })();
      pingpong.inc(10).should.be.equal(10);
      pingpong.dec(7).should.be.equal(3);
      pingpong.div = n => PRIVATE / n;
      should.throws(() => pingpong.div(3));
    });

    it('3.5.2 추상화 도구 클로져', () => {
      const best = {title: 'title1', author: 'author1'};
      const getTitle = _03.plucker('title');
      getTitle(best).should.be.equal('title1');

      const books = [{title: 'title1'}, {starts: 5}];
      const second = _03.plucker(1);
      second(books).should.be.deepEqual(books[1]);

      _.filter(books, getTitle).should.be.deepEqual([books[0]])
    })
  });
});

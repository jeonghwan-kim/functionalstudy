const _ = require('underscore');
const should = require('should');
const util = require('./util');
const _01 = require('./01');

describe('01.js', () => {
  describe('splat()', () => {
    it('배열 파라매터를 처리', () => {
      const addArrayElements = _01.splat((x, y) => x + y);
      addArrayElements([1, 2]).should.be.equal(3);
    });
  });

  describe('unsplate()', () => {
    it('arguments 형식의 파라매터 처리', () => {
      const joinElements = _01.unsplat(array => array.join(' '));
      joinElements(1, 2).should.be.equal('1 2');
    });
  });

  describe('parseAge()', () => {
    let hook;
    beforeEach('', () => hook = util.captureStream(process.stdout));
    afterEach('', () => hook.unhook());

    it('should parse number string', () => {
      _01.parseAge("42").should.be.equal(42);
      hook.captured().should.be.equal('NOTE: Attempting to parse an age\n');
    });

    it('should parse not number string to 0', () => {
      _01.parseAge("frob").should.be.equal(0);
      hook.captured().should.be.equal('NOTE: Attempting to parse an age\nWARNING: Could not parse age: frob\n');
    });
  });

  describe('warn()', () => {
    let hook;
    before('', () => hook = util.captureStream(process.stdout));
    after('', () => hook.unhook());
    it('', () => {
      _01.warn('msg');
      hook.captured().should.be.equal('WARNING: msg\n');
    });
  });

  describe('note()', () => {
    let hook;
    before('', () => hook = util.captureStream(process.stdout));
    after('', () => hook.unhook());
    it('', () => {
      _01.note('msg');
      hook.captured().should.be.equal('NOTE: msg\n');
    });
  });

  describe('nth()', () => {
    const letters = ['a', 'b', 'c'];
    it('', () => {
      _01.nth(letters, 1).should.be.equal('b');
      _01.nth('abc', 1).should.be.equal('b');
      should.throws(() => _01.nth({}, 1));
      should.throws(() => _01.nth(letters, 400));
      should.throws(() => _01.nth(letters, 'aaaa'));
    });
  });

  describe('second()', () => {
    it('', () => {
      _01.second(['a', 'b']).should.be.equal('b');
      _01.second('fogus').should.be.equal('o');
      should.throws(() => _01.second({}));
    });
  });

  describe('existy()', () => {
    it('', () => _01.existy(null).should.be.false());
    it('', () => _01.existy(undefined).should.be.false());
    it('', () => _01.existy({}.notHere).should.be.false());
    it('', () => _01.existy(0).should.be.true());
    it('', () => _01.existy(false).should.be.true());
    it('', () => [null, undefined, 1, 2, false].map(_01.existy)
        .should.be.deepEqual([false, false, true, true, true]));
  });

  describe('truthy()', () => {
    it('', () => _01.truthy(null).should.be.false());
    it('', () => _01.truthy(undefined).should.be.false());
    it('', () => _01.truthy({}.notHere).should.be.false());
    it('', () => _01.truthy(0).should.be.true());
    it('', () => _01.truthy(false).should.be.false());
    it('', () => [null, undefined, 1, 2, false].map(_01.truthy)
        .should.be.deepEqual([false, false, true, true, false]));
  });

  describe('comparator()', () => {
    it('', () => {
      const lessOrEqual = (x, y) => x <= y;
      [0, -1, -2].sort(_01.comparator(lessOrEqual))
          .should.be.deepEqual([-2, -1, 0])
    });
  });

  describe('lameCSV()', () => {
    let peopleTable;
    beforeEach(() => {
      peopleTable = _01.lameCSV('name,age,hair\nMerble,35,red\nBob,64,blonde');
    });

    it('should return double array', () => {
      peopleTable.should.deepEqual([
          ['name', 'age', 'hair'],
          ['Merble', '35', 'red'],
          ['Bob', '64', 'blonde'],
      ]);
    });
    it('should ...', () => {
      peopleTable = _.rest(peopleTable).sort();
      peopleTable.should.deepEqual([
        ['Bob', '64', 'blonde'],
        ['Merble', '35', 'red'],
      ]);
    });
  });

  describe('selectNames()', () => {
    let peopleTable;
    beforeEach(() => {
      peopleTable = _01.lameCSV('name,age,hair\nMerble,35,red\nBob,64,blonde');
    });

    it('', () => {
      _01.selectNames(peopleTable).should.be.deepEqual(['Merble', 'Bob']);
    });
  });

  describe('selectAge()', () => {
    let peopleTable;
    beforeEach(() => {
      peopleTable = _01.lameCSV('name,age,hair\nMerble,35,red\nBob,64,blonde');
    });

    it('', () => {
      _01.selectAge(peopleTable).should.be.deepEqual(['35', '64']);
    });
  });

  describe('selectHair()', () => {
    let peopleTable;
    beforeEach(() => {
      peopleTable = _01.lameCSV('name,age,hair\nMerble,35,red\nBob,64,blonde');
    });

    it('', () => {
      _01.selectHair(peopleTable).should.be.deepEqual(['red', 'blonde']);
    });
  });

  describe('doWhen()', () => {
    it('', () => {
      const executeIfHasField = (target, name) => {
        return _01.doWhen(_01.existy(target[name]), () => {
          const result = _.result(target, name);
          return result;
        });
      };

      executeIfHasField([1,2,3], 'reverse').should.be.deepEqual([3,2,1]);
      executeIfHasField({foo: 42}, 'foo').should.be.equal(42);
      (executeIfHasField([1,2,3], 'notHere') === undefined).should.be.true;
    });
  });
});

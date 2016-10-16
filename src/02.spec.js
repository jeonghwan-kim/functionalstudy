const _ = require('underscore');
const should = require('should');
const _02 = require('./02');

describe('02.js', () => {
  describe('doubleAll()', () => {
    it('', () => _02.doubleAll([1, 2, 3, 4, 5]).should.be.deepEqual([2, 4, 6, 8, 10]));
  });

  describe('average()', () => {
    it('', () => _02.average([1, 2, 3, 4, 5]).should.be.equal(3));
  });

  describe('onlyEven()', () => {
    it('', () => _02.onlyEven([1, 2, 3, 4, 5]).should.be.deepEqual([2, 4]));
  });

  describe('cat()', () => {
    it('', () => {
      _02.cat([1, 2, 3], [4, 5], [6, 7, 8]).should.be.deepEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });
  });

  describe('construct()', () => {
    it('', () => {
      _02.construct(42, [1, 2, 3]).should.be.deepEqual([42, 1, 2, 3]);
    });
  });

  describe('mapcat()', () => {
    it('', () => {
      _02.mapcat(e => _02.construct(e, [',']), [1, 2, 3])
          .should.be.deepEqual([1, ',', 2, ',', 3, ',']);
    })
  });

  describe('interpose()', () => {
    it('', () => {
      _02.interpose(',', [1, 2, 3]).should.be.deepEqual([1, ',', 2, ',', 3]);
    });
  });

  describe('interpose()', () => {
    it('', () => {
      _02.interpose(',', [1, 2, 3]).should.be.deepEqual([1, ',', 2, ',', 3]);
    });
  });

  describe('product()', () => {
    const library = [
      {title: 'SICP', isbn: '0000000', ed: 1},
      {title: 'SICP', isbn: '0000001', ed: 2},
      {title: 'Joy of Clojure', isbn: '0000002', ed: 1},
    ];

    it('', () => {
      _02.project(library, ['title', 'isbn']).should.be.deepEqual([
        {title: 'SICP', isbn: '0000000'},
        {title: 'SICP', isbn: '0000001'},
        {title: 'Joy of Clojure', isbn: '0000002'},
      ]);

      const isbnResults = _02.project(library, ['isbn']);
      _.pluck(isbnResults, 'isbn').should.be
          .deepEqual(['0000000', '0000001','0000002'])
    });
  });

  describe('rename()', () => {
    _02.rename({a: 1, b: 2}, {a: 'AAA'}).should.be.deepEqual({AAA: 1, b: 2});
  });

  describe('as()', () => {
    const library = [
      {title: 'SICP', isbn: '0000000', ed: 1},
      {title: 'SICP', isbn: '0000001', ed: 2},
      {title: 'Joy of Clojure', isbn: '0000002', ed: 1},
    ];

    _02.as(library, {ed: 'edition'}).forEach(l => {
      l.should.have.property('edition');
    });
  });

  describe('as(), project()', () => {
    const library = [
      {title: 'SICP', isbn: '0000000', ed: 1},
      {title: 'SICP', isbn: '0000001', ed: 2},
      {title: 'Joy of Clojure', isbn: '0000002', ed: 1},
    ];

    _02.project(_02.as(library, {ed: 'edition'}), ['edition'])
        .should.be.deepEqual([{edition: 1}, {edition: 2}, {edition: 1}]);
  });

  describe('restrict()', () => {
    it('', () => {
      const library = [
        {title: 'SICP', isbn: '0000000', ed: 1},
        {title: 'SICP', isbn: '0000001', ed: 2},
        {title: 'Joy of Clojure', isbn: '0000002', ed: 1},
      ];

      _02.restrict(library, (book) => book.ed > 1).should.be.deepEqual([
        {title: 'SICP', isbn: '0000001', ed: 2}
      ]);

      _02.restrict(
          _02.project(
              _02.as(library, {ed: 'edition'}),
              ['title', 'isbn', 'edition']
          ),
          book => book.edition > 1
      ).should.be.deepEqual([{title: 'SICP', isbn: '0000001', edition: 2},]);
    });
  });
});


const _ = require('underscore');
const _01 = require('./01');
const _02 = require('./02');

module.exports = {
  /**
   * 으마으마한 함수구만
   * @param funs
   * @returns {function(*=, ...[*]=)}
   */
  dispatch(...funs) {
    const size = funs.length;

    return (target, ...args) => {
      let ret = undefined;

      for(let funIndex = 0; funIndex < size; funIndex++) {
        const fun = funs[funIndex];
        ret = fun.apply(fun, _02.construct(target, args));

        if (_01.existy(ret)) return ret;
      }

      return res;
    };
  }
};


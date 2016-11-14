// const _ = require('underscore');
// const _02 = require('./02');
// const _04 = require('./04');
// const _05 = require('./05');
// const mapcat = _02.mapcat;
// const validator = _04.validator;
// const partial = _05.partial;
// const condition1 = _05.condition1;
// const __ = {};

/**
 * Homework 1: 두 정수를 체크하여 더하고 누적값이 50 미만임을 체크하는 리듀서 함수를 작성한다
 */
const condition2 = (...validators) => {
  return (fun, arg1, arg2) => {
    const errors =  mapcat(isValid => {
      return isValid(arg1) && isValid(arg2) ? [] : [isValid.message]
    }, validators);

    if (!_.isEmpty(errors)) throw new Error(errors.join(', '));

    return fun(arg1, arg2);
  };
};
const numbers = condition2(validator('args must be a number', _.isNumber));
const sum = (p, v) => p + v;
const lt = max => condition1(validator(`result must be less than ${max}`, n => n < max));
__.solution1 = _.compose(partial(lt(50), _.identity), partial(numbers, sum));


/**
 * Homeworkd 2: 자식 엘레멘트에서 태그 네임을 찾는다
 * Check in index.html: descendant(getElementById('first-div'), 'p'), d(getElementById('first-div'), 'p')
 */
const find = (children, tagName, arr = []) => {
  for (c of children) {
    if (c.tagName === tagName.toUpperCase()) arr.push(c);
    if (c.children.length) find(c.children, tagName, arr);
  }
  return arr;
};
const descendant = (el, tagName) => find(el.children, tagName);
const d = (el, tagName, r = []) => Array.from(el.children).reduce((r, el) => {
  if(el.tagName == tagName.toUpperCase()) r.push(el);
  if(el.children.length) d(el, tagName, r);
  return r;
}, r);


module.exports = __;

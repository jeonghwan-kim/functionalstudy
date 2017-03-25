/*
@everyone 지난 시간 복습퀴즈 나갑니다
아래에 나오는 함수를 함수형으로 구현해 보는게 문제입니다 :)
스텝바이 스텝으로 책에 나온 과정처럼 기본 기능 구현 -> 추상화 -> 함수의 조합으로 문제 해결 이렇게 해보시면 좋습니다

sum(1, 2, 3, 4, 5);
sumArr([1,2,3,4,5]);
safeSum(1, null, 3, 4, 5);
safeMultiply(1, null, 3, 4, 5); 
checkObj(객체형인지 확인, 특정프로퍼티가 있는지 확인, 특정 프로퍼티의 값이 숫자인지 확인);
*/

const sum = (...args) => args.reduce((v, n)=> v + n);
const sumArr = arr => arr.reduce((v, n)=> v + n);
const safeSum = (...args) => args.reduce((v, n) => Number.isInteger(n) ? n + v : v);
const safeMultiply = (...args) => args.reduce((v, n) => Number.isInteger(n) ? n * v : v, 1);
const checkObj = (...checkers) => {
  return o => checkers.every(checker => checker(o));
}
const isObj = () => {
  return o => o && o instanceof Object;
}
const hasProp = propertyName => {
  return o => isObj()(o) && o.hasOwnProperty(propertyName);
}
const isNum = propertyName =>  {
  return o => {
    return isObj()(o) && 
           hasProp(propertyName)(o) && 
           Number.isInteger(o[propertyName])
  }
}
module.exports = {
  sum, sumArr, safeSum, safeMultiply, 
  checkObj, isObj, hasProp, isNum
};
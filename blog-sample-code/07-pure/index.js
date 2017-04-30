const partial1 = (fun, ...arg1) => (...arg2) => fun.apply(null, [...arg1, ...arg2]);
const repeatedly = (n, fun) => [...Array(n).keys()].map(fun);

const random = (min, max) => Math.round(Math.random() * (max - min) + min);
const rand = partial1(random, 1);
console.log(rand(10)); // 1~10 랜덤 수
console.log(repeatedly(10, partial1(rand, 10))); // 1~10 랜덤수 배열

const randString = len => {
  const digit36Numbers = repeatedly(len, partial1(rand, 36)); // 1~36 랜덤수 배열
  return digit36Numbers.map(num => num.toString(36)).join('');
}

console.log(randString(0)); // ''
console.log(randString(1)); // 'i'
console.log(randString(5)); // 'i'
console.log(randString(7)); // 'i'
console.log(randString(9)); // 'i'
console.log(randString(10)); // '5l2g5jbl7b'

const genRandChar = () => rand(36).toString(36);
const genString = (charGen, len) => repeatedly(len, charGen).join('');

console.log(genString(genRandChar, 5)); // 'iyrph'

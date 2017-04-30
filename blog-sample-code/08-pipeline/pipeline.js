const pipeline = (seed, ...funs) => funs.reduce((value, fun) => fun(value), seed);

console.log(pipeline()); // undefeind
console.log(pipeline(42)); // 42
console.log(pipeline(42, n => -n)); // -42

const sqr = n => n * n
console.log(pipeline(2, sqr, sqr));

const doubleSqr = n => pipeline(n, sqr, sqr);
console.log(pipeline(2, doubleSqr, sqr)); // 256


const curry = (fun, arg2) => arg1 => fun(arg1, arg2)
const add = (a, b) => a + b;
const add4 = curry(add, 4);
console.log(pipeline(2, doubleSqr, add4)); // 20


console.log(pipeline(2, sqr, console.log, sqr)); // 4, NaN

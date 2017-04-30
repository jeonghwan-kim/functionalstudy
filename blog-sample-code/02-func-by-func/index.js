function invoker(name, method) {
  return target => {
    if (!target) throw new Error('target이 있어야 함');

    if (target[name] && target[name] === method) {
      return method.apply(target);
    }
  }
}

console.log(invoker('toString', String.prototype.toString)('abc')); // 'abc'
console.log(invoker('toString', String.prototype.toString)([1,2,3])); // undefined
console.log('-------------');


function dispatch(...funs) {
  return target => {
    for (let fun of funs) {
      const ret = fun.call(null, target);
      if (ret !== undefined) return ret;
    }
  };
}

const str = dispatch(
  invoker('toString', Array.prototype.toString),
  invoker('toString', String.prototype.toString));
console.log(str('abc'));
console.log(str([1,2,3]));
console.log('-------------');

const stringReverse = str => {
  if (typeof str !== 'string') return;
  return str.split('').reverse().join('');
}

const rev = dispatch(
  stringReverse,
  invoker('reverse', Array.prototype.reverse)
);
console.log(rev('abc'));
console.log(rev([1,2,3]));
console.log('-------------');

const isa = (type, action) => {
  return cmd => {
    if (cmd.type === type) {
      return action(cmd);
    }
  }
}

const runCommand = dispatch(
  isa('doubble', cmd => cmd.num * 2),
  isa('greeting', cmd => `Hello ${cmd.name}`),
  isa('log', cmd => `LOG: ${cmd.msg}`)
);
const runCommand1 = dispatch(
  runCommand,
  isa('kill', cmd => `shut down reason: ${cmd.reason}`)
)

console.log(runCommand({type: 'log', msg: 'some log'}));
console.log(runCommand({type: 'doubble', num: 2}));
console.log(runCommand({type: 'greeting', name: 'Chris'}));
console.log(runCommand1({type: 'kill', reason: 'memory leak'}));
console.log('-------------');

const curry2 = fun => arg2 => arg1 => fun(arg1, arg2);
const greaterThan = curry2((l, r) => l > r);
const lessThan = curry2((l, r) => l < r);

const checker = (...validators) => val => validators.reduce(
  (isValid, vali) => vali(val) ? isValid : false,
  true
);

const withInRange = checker(greaterThan(30),lessThan(50));

console.log(withInRange(40)); // true
console.log(withInRange(29)); // false
console.log(withInRange(51)); // false
console.log('-------------');


const partial = (fun, ...args1) => {
  return (...args2) => fun.apply(null, [...args1, ...args2]);
}
const div = (n, d) => n / d;
const divOver10 = partial(div, 10);
console.log(divOver10(2)); // 5

const sqr = n => n * n;
const condition = (...validators) => (fun, arg) => {
  const result = validators.reduce(
    (isValid, vali) => vali(arg) ? isValid : false,
    true
  );

  if (!result) throw new Error();
  return fun(arg);
}
const isInteger = arg => Number.isInteger(arg);
const sqrCondition = condition(isInteger);
console.log(sqrCondition(sqr, 2)); // 4
// console.log(sqrCondition(sqr, 'a')); // throw error

const checkedSqr = partial(sqrCondition, sqr);
// const curry2Left = fun => arg1 => arg2 => fun(arg1, arg2);
// const checkedSqr = curry2Left(sqrCondition)(sqr);
console.log(checkedSqr(3)); // 9
// console.log(checkedSqr('b')); // throw

const isOdd = n => n % 2;
const checkedOddSqr = partial(condition(isOdd), checkedSqr);
console.log(checkedOddSqr(5)); // 25
// console.log(checkedOddSqr(6)); // throw

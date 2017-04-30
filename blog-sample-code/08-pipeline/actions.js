const actions = (...acts) => seed => acts.reduce(
  (stateObj, action) => {
    const result = action(stateObj.state),
          answers = [...stateObj.answers, result.answer];
    return { answers, state: result.state };
  },
  { answers: [], state: seed }
);

const sqr = n => n * n;
const msqr = n => ({answer: sqr(n), state: sqr(n)});
const doubleSqr = actions(msqr, msqr);
console.log(doubleSqr(2)); // { values: [ 4, 16 ], state: 16 }

console.log('-------------')
const log = msg => console.log('mlog', msg);
const mlog = msg => (log(msg), {state: msg});
const doubleSqrLog = actions(msqr, mlog, msqr);
console.log(doubleSqrLog(2)); // { values: [ 4, undefined, 16 ], state: 16 }

console.log('-------------')
const lift = (answerFun, stateFun) => state => {
  const answer = answerFun(state);
  state = stateFun ? stateFun(state) : answer;
  return { answer, state };
}
const lsqr = lift(sqr);
const llog = lift(log, v => v);
const add = (a, b) => a + b;
const curry = (fun, arg2) => arg1 => fun(arg1, arg2)
const ladd6 = lift(curry(add, 6));
const doubleSqrLog2 = actions(lsqr, llog, ladd6);
console.log(doubleSqrLog2(2));

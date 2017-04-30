const LazyChain = require('./LazyChain')

let nums = [2,1,3]
const a =new LazyChain(nums)
  .invoke('concat', [6, 4, 5])
  .tap(console.log)
  .invoke('sort')
  .force();
console.log('a', a);
console.log('nums', nums);

const r = new LazyChain([2, 1, 3])
  .invoke('concat', [6, 4, 5])
  .tap(console.log)
  .invoke('sort')
  .invoke('join', ' ')
  .force();
console.log('r', r);


// const obj = {
//   a: 'aaa',
//   m1: function(val) {this.a = val}
// }
// console.log('obj', obj)
// const r2 = new LazyChain(obj)
//   .invoke('m1', 'bbb')
//   .force();
// console.log('r2', r2)
// console.log('obj', obj)

let data = [2, 1, 3]
new LazyChain(data)
  .invoke('splice', 2, 1)
  .force();
console.log('data', data); // [2, 1]

const _ = require('lodash')


var r = _
  .chain([2,1,3])
  .sort()
  .tap(console.log)
  .map(n => n*2)
  .value()

console.log(r);

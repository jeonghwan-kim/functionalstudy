class LazyChain {
  constructor(obj) {
    this._calls = [];
    this._target = obj;
  }

  invoke(methodName, ...args) {
    this._calls.push(target => {
      return target[methodName].apply(target,args);
    });
    return this;
  }

  force() {
    return this._calls.reduce(
      (target, thunk) => thunk(target),
      this._target
    );
  }

  tap(fun) {
    this._calls.push(target => (fun(target), target));
    return this;
  }
}

module.exports = LazyChain;

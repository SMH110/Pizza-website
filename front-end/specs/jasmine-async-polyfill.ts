
['it', 'fit', 'xit'].forEach(methodName => {
  let global = window as any;
  let oldMethod = global[methodName] as (expectation: string, assertion?: (done: DoneFn) => void, timeout?: number) => void;
  global[methodName] = function(expectation: string, assertion: (done?: DoneFn) => void | Promise<void>, timeout?: number) {
    if (assertion.length > 0) {
      oldMethod(expectation, assertion, timeout);
    } else {
      oldMethod(expectation, async done => {
        try {
          await assertion();
          done();
        } catch(error) {
          done.fail(error);
        }
      }, timeout);
    }
  }
});

['beforeEach', 'beforeAll', 'afterEach', 'afterAll'].forEach(methodName => {
  let global = window as any;
  let oldMethod = global[methodName] as (action: (done: DoneFn) => void, timeout?: number) => void;
  global[methodName] = function(action: (done?: DoneFn) => void | Promise<void>, timeout?: number) {
    if (action.length > 0) {
      oldMethod(action, timeout);
    } else {
      oldMethod(async done => {
        try {
          await action();
          done();
        } catch(error) {
          done.fail(error);
        }
      }, timeout);
    }
  }
});

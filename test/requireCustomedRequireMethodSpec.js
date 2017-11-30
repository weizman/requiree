var requiree = require('../index.js');

describe("requiree", function() {
  it("should be able to require a module using a customed require method (as string)", function() {
    var dummyModule = requiree('./test/dummy-module.js', 'require');

    expect(dummyModule.getOne).not.toBe(undefined);
    expect(dummyModule.getOne()).toBe(1);

    expect(dummyModule.ONE).toBe(undefined);
  });
});

var requiree = require('../index.js');

describe("requiree", function() {
  it("should be able to regulary import a standard module", function() {
    var dummyModule = requiree('./test/dummy-module.js');

    expect(dummyModule.getOne).not.toBe(undefined);
    expect(dummyModule.getOne()).toBe(1);

    expect(dummyModule.ONE).toBe(undefined);

    expect(dummyModule._ONE).toBe(undefined);
  });
});

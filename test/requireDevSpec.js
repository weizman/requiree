var requiree = require('../index.js');

describe("requiree", function() {
  it("should be able to import a standard module with it's dev properties", function() {
    var dummyModule = requiree.dev('./test/dummy-module.js');

    expect(dummyModule.getOne).not.toBe(undefined);
    expect(dummyModule.getOne()).toBe(1);

    expect(dummyModule.ONE).not.toBe(undefined);
    expect(dummyModule.ONE).toBe(1);
    
    expect(dummyModule._ONE).toBe(undefined);
  });
});

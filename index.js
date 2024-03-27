const {AsyncLocalStorage, executionAsyncId} = require("node:async_hooks");
const { after, before, describe, it } = require("node:test");

const asyncLocalStorage = new AsyncLocalStorage

function Feature(text, testFn) {
  return asyncLocalStorage.run(new Map(), () => {
    return describe(`Feature: ${text}`, testFn);
  });
}

function Scenario(text, testFn) {
  const beforeHook = asyncLocalStorage.getStore().get(executionAsyncId() + "_before");
  const afterHook = asyncLocalStorage.getStore().get(executionAsyncId() + "_after");
  return describe(`Scenario: ${text}`, () => {
    if (beforeHook) {
      before(beforeHook);
    }
    if (afterHook) {
      after(afterHook);
    }
    testFn()
  });
}

function Given(text, testFn) {
  return it(`Given ${text}`, testFn);
}

function When(text, testFn) {
  return it(`When ${text}`, testFn);
}

function Then(text, testFn) {
  return it(`Then ${text}`, testFn);
}

function And(text, testFn) {
  return it(`And ${text}`, testFn);
}

function But(text, testFn) {
  return it(`But ${text}`, testFn);
}


function afterEachScenario(hookFn) {
  asyncLocalStorage.getStore().set(executionAsyncId() + "_after", hookFn);
}

function beforeEachScenario(hookFn) {
  asyncLocalStorage.getStore().set(executionAsyncId() + "_before", hookFn);
}

module.exports = {
  Feature,
  Scenario,
  Given,
  When,
  Then,
  And,
  But,
  afterEachScenario,
  beforeEachScenario
};

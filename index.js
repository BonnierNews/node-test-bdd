"use strict";

const { AsyncLocalStorage, executionAsyncId } = require("node:async_hooks");
const { after, before, describe, it } = require("node:test");

const featureStorage = new AsyncLocalStorage();
const globalBeforeEachScenarioHooks = [];
const globalAfterEachScenarioHooks = [];

function Feature(text, testFn) {
  return featureStorage.run(new Map(), () => {
    return describe(`Feature: ${text}`, testFn);
  });
}

function Scenario(text, testFn) {
  const beforeHook = featureStorage.getStore().get(`${executionAsyncId()}_before`);
  const afterHook = featureStorage.getStore().get(`${executionAsyncId()}_after`);
  return describe(`Scenario: ${text}`, () => {
    if (beforeHook) {
      before(beforeHook);
    }
    for (const hook of globalBeforeEachScenarioHooks) {
      before(hook);
    }
    if (afterHook) {
      after(afterHook);
    }
    for (const hook of globalAfterEachScenarioHooks) {
      after(hook);
    }
    testFn();
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
  if (featureStorage.getStore()) {
    featureStorage.getStore().set(`${executionAsyncId()}_after`, hookFn);
  } else {
    globalAfterEachScenarioHooks.push(hookFn);
  }
}

function beforeEachScenario(hookFn) {
  if (featureStorage.getStore()) {
    featureStorage.getStore().set(`${executionAsyncId()}_before`, hookFn);
  } else {
    globalBeforeEachScenarioHooks.push(hookFn);
  }
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
  beforeEachScenario,
};

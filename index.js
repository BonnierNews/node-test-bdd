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

Feature.skip = function (text, testFn) {
  return describe.skip(`Scenario: ${text}`, () => {
    testFn();
  });
};

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

Scenario.skip = function (text, testFn) {
  return describe.skip(`Scenario: ${text}`, () => {
    testFn();
  });
};

function Given(text, testFn) {
  return it(`Given ${text}`, testFn);
}

Given.skip = function (text, testFn) {
  return it.skip(`Given ${text}`, testFn);
};

function When(text, testFn) {
  return it(`When ${text}`, testFn);
}

When.skip = function (text, testFn) {
  return it.skip(`When ${text}`, testFn);
};

function Then(text, testFn) {
  return it(`Then ${text}`, testFn);
}

Then.skip = function (text, testFn) {
  return it.skip(`Then ${text}`, testFn);
};

function And(text, testFn) {
  return it(`And ${text}`, testFn);
}

And.skip = function (text, testFn) {
  return it.skip(`And ${text}`, testFn);
};

function But(text, testFn) {
  return it(`But ${text}`, testFn);
}

But.skip = function (text, testFn) {
  return it.skip(`But ${text}`, testFn);
};

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

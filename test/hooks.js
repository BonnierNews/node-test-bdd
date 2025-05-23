"use strict";

const assert = require("node:assert");
const { after } = require("node:test");

const { Feature, Scenario, Given, When, Then, And, But, afterEachScenario, beforeEachScenario } = require("../index.js");

const globalBefore = [];
const globalAfter = [];

beforeEachScenario(() => {
  globalBefore.push("global beforeEachScenario");
});
afterEachScenario(() => {
  globalAfter.push("global afterEachScenario");
});

Feature("a feature", () => {
  const testArr = [];
  beforeEachScenario((t) => {
    testArr.push(`beforeEachScenario in ${t.name}`);
  });
  afterEachScenario((t) => {
    testArr.push(`afterEachScenario in ${t.name}`);
  });
  after(() => {
    assert.deepStrictEqual(testArr, [
      "beforeEachScenario in Scenario: a scenario",
      "afterEachScenario in Scenario: a scenario",
      "beforeEachScenario in Scenario: another scenario",
      "afterEachScenario in Scenario: another scenario",
    ]);
    assert.deepStrictEqual(globalBefore, [
      "global beforeEachScenario",
      "global beforeEachScenario",
    ]);
    assert.deepStrictEqual(globalAfter, [
      "global afterEachScenario",
      "global afterEachScenario",
    ]);
  });
  Scenario("a scenario", () => {
    let a;
    Given("a variable", () => {
      a = 1;
    });
    When("adding to that variable", () => {
      a = a + 2;
    });
    Then("the variable should be updated", () => {
      assert.ok(a === 3);
    });
    And("the variable should be greater than 1", () => {
      assert.ok(a > 1);
    });
    But("the variable should be less than 5", () => {
      assert.ok(a < 5);
    });
  });

  Scenario("another scenario", () => {
    let b;
    Given("another variable", () => {
      b = 1;
    });
    When("adding to that variable", () => {
      b = b + 2;
    });
    Then("the variable should be updated", () => {
      assert.ok(b === 3);
    });
    And("the variable should be greater than 1", () => {
      assert.ok(b > 1);
    });
    But("the variable should be less than 5", () => {
      assert.ok(b < 5);
    });
  });
});

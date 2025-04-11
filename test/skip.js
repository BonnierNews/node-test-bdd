"use strict";

const assert = require("node:assert");

const { after } = require("node:test");

const { Feature, Scenario, Given, When, Then, And, But } = require("../index.js");

const skipped = [];
Feature.skip("a skipped feature", () => {
  skipped.push("skipped feature");
});

Feature("feature", () => {
  Scenario.skip("a skipped scenario", () => {
    skipped.push("skipped scenario");
  });
  Scenario("scenario", () => {
    Given.skip("a skipped given", () => {
      skipped.push("skipped given");
    });
    When.skip("a skipped when", () => {
      skipped.push("skipped when");
    });
    Then.skip("a skipped then", () => {
      skipped.push("skipped then");
    });
    And.skip("a skipped and", () => {
      skipped.push("skipped and");
    });
    But.skip("a skipped but", () => {
      skipped.push("skipped but");
    });
  });
});

after(() => {
  assert.deepStrictEqual(skipped, [ ]);
});

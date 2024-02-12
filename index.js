const { describe, it } = require("node:test");

function Feature(text, testFn) {
  return describe(`Feature: ${text}`, testFn);
}

function Scenario(text, testFn) {
  return describe(`Scenario: ${text}`, testFn);
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

module.exports = {
  Feature,
  Scenario,
  Given,
  When,
  Then,
  And,
  But,
};

"use strict";

const {
  Feature,
  Scenario,
  Given,
  When,
  Then,
  And,
  But,
  afterEachScenario,
  beforeEachScenario,
} = require("./index.js");

globalThis.Feature = Feature;
globalThis.Scenario = Scenario;
globalThis.Given = Given;
globalThis.When = When;
globalThis.Then = Then;
globalThis.And = And;
globalThis.But = But;
globalThis.afterEachScenario = afterEachScenario;
globalThis.beforeEachScenario = beforeEachScenario;

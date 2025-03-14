# @bonniernews/node-test-bdd

**Node Test BDD** is a Gherkin/Cucumber-style testing framework for Node.js, designed to work seamlessly with the [Node test runner](https://nodejs.org/api/test.html#test-runner).  

It serves as a drop-in replacement for [Mocha Cakes 2](https://www.npmjs.com/package/mocha-cakes-2) for users transitioning from [Mocha](https://mochajs.org/) to Node's native test runner.

## 🚀 Quick Start  

Install the package:

```sh
npm install --save-dev @bonniernews/node-test-bdd
```

Write your first test:

```js
import assert from "node:assert";
import { Feature, Scenario, Given, When, Then } from "@bonniernews/node-test-bdd";

Feature("Basic Math", () => {
  Scenario("Incrementing a number", () => {
    let number = 1;

    Given("I have a number 1", () => {
      assert.strictEqual(number, 1);
    });

    When("I add 1", () => {
      number += 1;
    });

    Then("The number should be 2", () => {
      assert.strictEqual(number, 2);
    });
  });
});
```

Run the test using Node's built-in test runner:

```sh
node --test
```

The output should look like this:

![Test output](test-output.png)

## Installation

Install as a development dependency:

```sh
npm install --save-dev @bonniernews/node-test-bdd
```

## Usage

Node Test BDD provides Gherkin-style syntax for defining tests:

```js
import assert from "node:assert";
import { Feature, Scenario, Given, When, Then, And } from "@bonniernews/node-test-bdd";

Feature("Example feature", () => {
  Scenario("Example scenario", () => {
    let number;
    Given("I have a number", () => {
      number = 1;
    });
    And("That number is 1", () => {
      assert.ok(number === 1);
    });
    When("Adding 1 to that number", () => {
      number += 1;
    });
    Then("The number should be 2", () => {
      assert.ok(number === 2);
    });
  });
});
```

### Register the BDD test functions globally

To avoid importing BDD functions in every test file, you can register them globally:

Option 1: Import in your test setup file

```js
import "@bonniernews/node-test-bdd/register-bdd";
```

Option 2: Import dynamically when running tests

```shell
node --test --import '@bonniernews/node-test-bdd/register-bdd'
```

## API

Node Test BDD provides the following test functions:

* `Feature(description, fn)`
  * `Scenario(description, fn)`
    * `Given(description, fn)`
    * `When(description, fn)`
    * `Then(description, fn)`
    * `And(description, fn)`
    * `But(description, fn)`

## Scenario Hooks

You can use hooks to set up and clean up before and after each scenario.

```js
Feature("Some feature", () => {
  beforeEachScenario(() => {
    someSetup();
  });

  afterEachScenario(() => {
    doCleanup();
  });

  Scenario("First scenario", () => {
    // Test logic...
  });

  Scenario("Second scenario", () => {
    // Test logic...
  });
});
```

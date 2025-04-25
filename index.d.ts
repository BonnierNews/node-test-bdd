interface NodeTestBDDFunction {
  (description: string, testFn: Function): any;
}

interface NodeTestBDDHook {
  (callback: Function): void;
  (description: string, callback: Function): void;
}

declare let Feature: NodeTestBDDFunction;
declare let Scenario: NodeTestBDDFunction;
declare let Given: NodeTestBDDFunction;
declare let And: NodeTestBDDFunction;
declare let When: NodeTestBDDFunction;
declare let Then: NodeTestBDDFunction;
declare let But: NodeTestBDDFunction;

declare let afterEachScenario: NodeTestBDDHook;
declare let beforeEachScenario: NodeTestBDDHook;

interface NodeTestBDDFunction {
  (description: string, testFn: Function): any;
}

interface NodeTestBDDHook {
  (callback: Function): void;
  (description: string, callback: Function): void;
}

export declare const Feature: NodeTestBDDFunction;
export declare const Scenario: NodeTestBDDFunction;
export declare const Given: NodeTestBDDFunction;
export declare const And: NodeTestBDDFunction;
export declare const When: NodeTestBDDFunction;
export declare const Then: NodeTestBDDFunction;
export declare const But: NodeTestBDDFunction;

export declare const afterEachScenario: NodeTestBDDHook;
export declare const beforeEachScenario: NodeTestBDDHook;

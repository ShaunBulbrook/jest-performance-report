import { AggregatedResult } from "@jest/reporters";

export const testResultFromTestRun: AggregatedResult = {
  numFailedTestSuites: 0,
  numFailedTests: 0,
  numPassedTestSuites: 2,
  numPassedTests: 2,
  numPendingTestSuites: 1,
  numPendingTests: 1,
  numRuntimeErrorTestSuites: 0,
  numTodoTests: 0,
  numTotalTestSuites: 3,
  numTotalTests: 3,
  openHandles: [],
  snapshot: {
    added: 0,
    didUpdate: false,
    failure: false,
    filesAdded: 0,
    filesRemoved: 0,
    filesRemovedList: [],
    filesUnmatched: 0,
    filesUpdated: 0,
    matched: 0,
    total: 0,
    unchecked: 0,
    uncheckedKeysByFile: [],
    unmatched: 0,
    updated: 0,
  },
  startTime: 1680995626826,
  success: false,
  testResults: [
    {
      leaks: false,
      numFailingTests: 0,
      numPassingTests: 1,
      numPendingTests: 0,
      numTodoTests: 0,
      openHandles: [],
      perfStats: {
        end: 0,
        runtime: 100,
        slow: true,
        start: 0,
      },
      skipped: false,
      snapshot: {
        added: 0,
        fileDeleted: false,
        matched: 0,
        unchecked: 0,
        uncheckedKeys: [],
        unmatched: 0,
        updated: 0,
      },
      testFilePath: "/jest-performance-report/tests/test.test.ts",
      testResults: [
        {
          ancestorTitles: ["test description"],
          duration: 1,
          failureDetails: [],
          failureMessages: [],
          fullName: "test description test name",
          invocations: 1,
          location: null,
          numPassingAsserts: 0,
          status: "passed",
          title: "test name",
        },
        {
          ancestorTitles: ["test description 2"],
          duration: 10,
          failureDetails: [],
          failureMessages: [],
          fullName: "test description 2 test name 2",
          invocations: 1,
          location: null,
          numPassingAsserts: 0,
          status: "passed",
          title: "test name 2",
        },
      ],
      console: undefined,
      displayName: undefined,
      failureMessage: null,
      testExecError: undefined,
      coverage: undefined,
    },
  ],
  wasInterrupted: false,
};
import { TestContext } from "@jest/reporters";
import TestReporter from "../src/performance-reporter";
import { IReportService, PerformanceAnalysisResult, TestResult } from "../src/ReportService/ReportService";
import { testResultFromTestRun } from "./testResultFromTestRun";

const testContexts: Set<TestContext> = new Set();

describe("Performance report is generate", () => {
  describe("onRunComplete hook is called:", () => {
    const mockReportService: IReportService = {
      createReport: jest.fn().mockImplementation(async () => Promise.resolve()),
    };
    const testReporter = new TestReporter(mockReportService);

    testReporter.onRunComplete(testContexts, testResultFromTestRun);

    test("ReportService should be called with the report data", () => {
      expect(mockReportService.createReport).toHaveBeenCalledWith([
        {
          ancestorTitles: ["test description"],
          title: "test name",
          specName: "/jest-performance-report/tests/test.test.ts",
          timeElapsedForTest: 1,
          timeElapsedForSpec: 100,
          passing: true,
        },
        {
          ancestorTitles: ["test description 2"],
          title: "test name 2",
          specName: "/jest-performance-report/tests/test.test.ts",
          timeElapsedForTest: 10,
          timeElapsedForSpec: 100,
          passing: true,
        },
        {
          ancestorTitles: ["slow running test description"],
          title: "slow running test name",
          specName: "/jest-performance-report/tests/test.test.ts",
          timeElapsedForTest: 70,
          timeElapsedForSpec: 100,
          passing: true,
        },
      ] as TestResult[]);
    });

    test("should flag and order the slowest running tests", () => {
      expect(mockReportService.createReport).toHaveBeenCalledWith([
        {
          ancestorTitles: ["test description"],
          title: "test name",
          specName: "/jest-performance-report/tests/test.test.ts",
          timeElapsedForTest: 1,
          timeElapsedForSpec: 100,
          passing: true,
          slowRunning: false,
          deviationFromMean: -26,
        },
        {
          ancestorTitles: ["test description 2"],
          title: "test name 2",
          specName: "/jest-performance-report/tests/test.test.ts",
          timeElapsedForTest: 10,
          timeElapsedForSpec: 100,
          passing: true,
          slowRunning: false,
          deviationFromMean: -17,
        },
        {
          ancestorTitles: ["slow running test description"],
          title: "slow running test name",
          specName: "/jest-performance-report/tests/test.test.ts",
          timeElapsedForTest: 70,
          timeElapsedForSpec: 100,
          passing: true,
          slowRunning: true,
          deviationFromMean: 43,
        },
      ] as PerformanceAnalysisResult[]);
    });
  });
});

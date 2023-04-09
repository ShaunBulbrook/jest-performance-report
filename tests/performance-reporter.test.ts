import { TestContext } from "@jest/reporters";
import TestReporter from "../src/performance-reporter";
import { ReportService } from "../src/ReportService/ReportService";
import { testResultFromTestRun } from "./testResultFromTestRun";

const testContexts: Set<TestContext> = new Set();

describe("Performance report is generate", () => {
  describe("onRunComplete hook is called:", () => {
    test("ReportService should be called with the report data", () => {
      const mockReportService: ReportService = {
        saveTests: jest.fn().mockImplementation(() => Promise.resolve()),
      };
      const testReporter = new TestReporter(mockReportService);

      testReporter.onRunComplete(testContexts, testResultFromTestRun);

      expect(mockReportService.saveTests).toHaveBeenCalledWith([
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
      ]);
    });
  });
});

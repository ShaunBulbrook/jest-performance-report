import { TestContext } from "@jest/reporters";
import TestReporter from "../performance-reporter";
import {
  IReportService,
  ReportService,
  TestResult,
} from "../ReportService/ReportService";
import { testResultFromTestRun } from "./testResultFromTestRun";
import { TestReportRepository } from "../ReportService/repositories/TestReportRepository/TestReportRepository";
import * as fs from "fs";

const testContexts: Set<TestContext> = new Set();

describe("Performance report is generated", () => {
  describe("onRunComplete hook is called:", () => {
    test("ReportService should be called with the report data", () => {
      const mockReportService: IReportService = {
        createReport: jest
          .fn()
          .mockImplementation(async () => Promise.resolve()),
      };
      const testReporter = new TestReporter(mockReportService);

      testReporter.onRunComplete(testContexts, testResultFromTestRun);

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
      ] as TestResult[]);
    });
  });
});

describe("e2e", () => {
  test.skip("onRunComplete", () => {
    const testReporter = new TestReporter(
      new ReportService(new Date(), new TestReportRepository(fs))
    );
    testReporter.onRunComplete(testContexts, testResultFromTestRun);
    //TODO: Add assertions
  });
});

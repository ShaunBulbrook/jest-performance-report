import { TestResult } from "../../ReportService";
import { TestReport } from "./TestReport";

describe("TestReport", () => {
  describe("create test report", () => {
    test("The current time is added to the report", () => {
      const time = new Date(0);
      const testReport = new TestReport(time, []);
      expect(testReport.startTime).toBe(time);
    });
  });
});

import { TestReport } from "./TestReport";

describe("TestReport", () => {
  describe("Empty test report", () => {
    const time = new Date(0);
    const testReport = new TestReport(time, []);
    test("Current time is added to the report", () => {
      expect(testReport.startTime).toBe(time);
    });
    test("Empty set of results", () => {
      expect(testReport.testResults).toHaveLength(0);
    });
  });
});

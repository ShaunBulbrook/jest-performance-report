import { AggregatedResult, Reporter, TestContext } from "@jest/reporters";
import { IReportService, TestResult } from "./ReportService/ReportService";

export default class TestReporter implements Pick<Reporter, "onRunComplete"> {
  private reportService: IReportService;
  constructor(reportService: IReportService) {
    this.reportService = reportService;
  }

  async onRunComplete(
    _testContexts: Set<TestContext>,
    results: AggregatedResult
  ): Promise<void> {
    const testResults: TestResult[] = this.mapResultsToTestResults(results);
    this.reportService.createReport(testResults);
  }

  private mapResultsToTestResults(results: AggregatedResult): TestResult[] {
    return results.testResults.reduce(
      (
        resultsList: TestResult[],
        { testFilePath, testResults, perfStats: { runtime } }
      ) => {
        const testDetails: TestResult[] = testResults.map(
          ({ ancestorTitles, title, duration, status }) => {
            return {
              ancestorTitles,
              title,
              timeElapsedForTest: duration,
              passing: status === "passed",
              specName: testFilePath,
              timeElapsedForSpec: runtime,
            };
          }
        );
        return [...resultsList, ...testDetails];
      },
      []
    );
  }
}

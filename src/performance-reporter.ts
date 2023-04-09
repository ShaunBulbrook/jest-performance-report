import { AggregatedResult, Reporter, TestContext } from "@jest/reporters";
import { ReportService, TestResult } from "./ReportService/ReportService";

export default class TestReporter implements Pick<Reporter, "onRunComplete"> {
  private reportService: ReportService;
  constructor(reportService: ReportService) {
    this.reportService = reportService;
  }

  async onRunComplete(
    _testContexts: Set<TestContext>,
    results: AggregatedResult
  ): Promise<void> {
    const testResults: TestResult[] = this.mapResultsToTestResult(results);
    this.reportService.saveTests(testResults);
  }

  private mapResultsToTestResult(results: AggregatedResult): TestResult[] {
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

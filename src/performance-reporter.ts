import { AggregatedResult, Reporter, TestContext } from "@jest/reporters";
import {
  IReportService,
  PerformanceAnalysisResult,
  TestResult,
} from "./ReportService/ReportService";

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
    const flaggedSlowRunningTests = this.flagSlowRunningTests(testResults);

    this.reportService.createReport(testResults);
    this.reportService.createReport(flaggedSlowRunningTests);
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

  private flagSlowRunningTests(
    testResults: TestResult[]
  ): PerformanceAnalysisResult[] {
    const testTimeMean = this.calculateMean(testResults);
    return testResults.map((testResult: TestResult) => {
      const timeElapsedForTest = testResult.timeElapsedForTest ?? 0;
      return {
        ...testResult,
        slowRunning: timeElapsedForTest > testTimeMean,
        deviationFromMean: timeElapsedForTest - testTimeMean,
      };
    });
  }

  private calculateMean(testResults: TestResult[]): number {
    const testDurations = testResults.map((tr) => {
      return tr.timeElapsedForTest ?? 0;
    });
    const totalTestDuration = testDurations.reduce(
      (trA: number, trB: number) => {
        return trA + trB;
      }
    );
    return totalTestDuration / testResults.length;
  }
}

import { TestResult } from "../../ReportService";

type TestReportResult = {
  startTime: Date;
  testResults: Array<TestResult>;
};

export interface IReportRepository {
  create: (testReportResult: TestReportResult) => Promise<void>;
}

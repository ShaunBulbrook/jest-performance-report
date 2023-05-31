import { TestResult } from "../../ReportService";

export interface ITestReport {
  startTime: Date;
  testResults: TestResult[];
}
export class TestReport implements ITestReport {
  constructor(
    public readonly startTime: Date,
    public readonly testResults: TestResult[]
  ) {}
}

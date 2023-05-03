import { IReportRepository } from "./repositories/TestReportRepository/TestReportRepository";
import { TestReport } from "./models/TestReport/TestReport";

export type TestResult = {
  ancestorTitles: string[];
  title: string;
  specName: string;
  timeElapsedForTest: number | null | undefined;
  timeElapsedForSpec: number | null | undefined;
  passing: boolean;
};

export interface IReportService {
  createReport: (testResults: Array<TestResult>) => Promise<void>;
}

export class ReportService implements IReportService {
  constructor(
    private readonly time: Date,
    private readonly reportRepository: IReportRepository
  ) {}
  async createReport(testResults: Array<TestResult>) {
    const report = new TestReport(this.time, testResults);
    await this.reportRepository.create(report);
  }
}

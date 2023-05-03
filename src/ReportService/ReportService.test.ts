import { IReportRepository } from "./repositories/TestReportRepository/TestReportRepository";
import { ReportService, TestResult } from "./ReportService";

describe("ReportService", () => {
  describe("create report", () => {
    describe("successful", () => {
      test("calls save operation on repository with correct data", () => {
        const testResults: Array<TestResult> = [
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
        ];
        const mockReportRepository: IReportRepository = {
          create: jest.fn(),
        };
        const time = new Date(0);
        const reportService = new ReportService(time, mockReportRepository);
        reportService.createReport(testResults);
        expect(mockReportRepository.create).toHaveBeenCalledWith(
          expect.objectContaining({
            startTime: time,
            testResults,
          })
        );
      });
      test.skip("returns a success message", () => {});
    });
    describe("failed", () => {
      test.skip("throws error", () => {});
    });
  });
});

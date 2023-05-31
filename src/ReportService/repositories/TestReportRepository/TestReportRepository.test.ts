import { IFileService, TestReportRepository } from "./TestReportRepository";
import { ITestReport } from "../../models/TestReport/TestReport";

describe("TestReportRepository", () => {
  describe("create empty test report", () => {
    test("saves file", () => {
      const mockFileService: IFileService = {
        writeFileSync: jest.fn(),
      };
      const testReportRepository = new TestReportRepository(mockFileService);
      const testReportResult: ITestReport = {
        startTime: new Date("2000-1-1"),
        testResults: [],
      };
      testReportRepository.create(testReportResult);
      expect(mockFileService.writeFileSync).toHaveBeenCalledWith(
        "./file.json",
        JSON.stringify({ startTime: new Date("2000-1-1"), testResults: [] })
      );
    });
    test.todo("saves file with current time as name");
    test.todo("creates folder if it doesn't exist");
  });
});

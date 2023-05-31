import { ITestReport } from "../../models/TestReport/TestReport";
import { PathOrFileDescriptor, WriteFileOptions } from "fs";

export interface IFileService {
  writeFileSync: (
    file: PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView,
    options?: WriteFileOptions
  ) => void;
}

export interface IReportRepository {
  create: (testReportResult: ITestReport) => Promise<void>;
}

export class TestReportRepository implements IReportRepository {
  constructor(private fileService: IFileService) {}
  async create(testReportResult: ITestReport) {
    this.fileService.writeFileSync(
      "./file.json",
      JSON.stringify(testReportResult)
    );
  }
}

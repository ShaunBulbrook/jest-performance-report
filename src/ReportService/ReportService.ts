export type TestResult = {
  ancestorTitles: string[];
  title: string;
  specName: string;
  timeElapsedForTest: number | null | undefined;
  timeElapsedForSpec: number | null | undefined;
  passing: boolean;
};

export interface ReportService {
  saveTests: (testResultsList: Array<TestResult>) => Promise<void>;
}

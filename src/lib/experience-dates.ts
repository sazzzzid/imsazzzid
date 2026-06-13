/** Machine-readable dateTime values for experience period labels */
const PERIOD_DATE_TIME: Record<string, string> = {
  "Apr 2023 to Present": "2023-04",
  "Jul 2022 to Mar 2023": "2022-07/2023-03",
};

export function experienceDateTime(period: string): string {
  return PERIOD_DATE_TIME[period] ?? period;
}

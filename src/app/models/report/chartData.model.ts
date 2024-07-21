// chart-data.model.ts
export interface ChartData {
  chartLabels: string[];
  chartDatasets: ChartDataset[];
  coveredSubjectsByMonth?: { [month: number]: string[] };
  notCoveredSubjectsByMonth?: { [month: number]: string[] };
}

export interface ChartDataset {
  data: number[];
  label: string;
  fill?: string;
  // Add more styling properties as needed
}

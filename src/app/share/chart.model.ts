export interface chartModel {
  success: boolean;
  message: string;
  kpiData: KpiData;
}

export interface KpiData {
  chartData: ChartData[];
}

export interface ChartData {
  name: string;
  submittal: number;
  rfi: number;
  asi: number;
  pr: number;
}

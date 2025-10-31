export type PatientData = {
  age: number | null;
  sex: 'Male' | 'Female' | 'Other' | null;
};

// Fix: Removed unused English statuses to match application usage.
export type AnalyteStatus = 'Normal' | 'Bajo' | 'Alto' | 'Límite';

export interface Analyte {
  name: string;
  value: string;
  unit: string;
  range: string;
  status: AnalyteStatus;
  explanation: string;
}

export interface LabReport {
  analytes: Analyte[];
  patientSummary: string;
  doctorSummary: string;
  specialistRecommendation: string;
}

export interface HistoricalDataPoint {
  date: string;
  [key: string]: number | string;
}

export type ChartData = HistoricalDataPoint[];
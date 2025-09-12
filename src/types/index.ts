export interface FormData {
  material: string;
  recycledContent: string;
  totalMass: number;
  energySource: string;
  transportDistance: number;
  endOfLife: string;
}

export interface EnvironmentalImpacts {
  carbonFootprint: number;
  waterUsage: number;
}

export interface CircularityMetrics {
  recycledContentRate: number;
  circularityScore: number;
  resourceEfficiency: number;
  extendedProductLife: string;
}

export interface FlowData {
  source: string;
  target: string;
  value: number;
}

export interface LCAResponse {
  material: string;
  scenario: string;
  environmentalImpacts: EnvironmentalImpacts;
  baselineImpacts: EnvironmentalImpacts;
  circularityMetrics: CircularityMetrics;
  flowData: FlowData[];
  recommendations: string[];
}
import { FormData, LCAResponse } from '../types';
import { predictWithModel, generateBaseline } from './mlModel';

export const generateLCAReport = async (formData: FormData): Promise<LCAResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Use ML model for predictions
  const prediction = predictWithModel(formData);
  const baseline = generateBaseline(formData);

  return {
    material: formData.material,
    scenario: `${formData.recycledContent}% Recycled ${formData.material}`,
    environmentalImpacts: {
      carbonFootprint: prediction.carbonFootprint,
      waterUsage: 0 // Removed water usage as it's not in your model
    },
    baselineImpacts: {
      carbonFootprint: baseline.carbonFootprint,
      waterUsage: 0 // Removed water usage as it's not in your model
    },
    circularityMetrics: {
      recycledContentRate: getRecycledContentRate(formData.recycledContent), 
      circularityScore: prediction.circularityScore / 100, // Keep as 0-1 scale for internal use
      resourceEfficiency: calculateResourceEfficiency(formData),
      extendedProductLife: `${Math.round(3 + (prediction.circularityScore / 100 * 5))} years`
    },
    flowData: generateFlowData(formData),
    recommendations: generateRecommendations(formData)
  };
};

function getRecycledContentRate(recycledContent: string): number {
  const rates = {
    'Ore': 0,
    'Both': 50,
    'Recycled': 90
  };
  return rates[recycledContent as keyof typeof rates] || 0;
}

function calculateResourceEfficiency(formData: FormData): number {
  const baseEfficiency = 0.6;
  const recyclingBonus = (getRecycledContentRate(formData.recycledContent) / 100) * 0.3;
  const transportPenalty = formData.transportDistance > 1000 ? -0.05 : 0;

  return Math.min(1.0, baseEfficiency + recyclingBonus + transportPenalty);
}

function generateFlowData(formData: FormData): any[] {
  const recycledValue = getRecycledContentRate(formData.recycledContent);
  const virginValue = 100 - recycledValue;
  const recyclingPotential = 70; // Default recycling potential
  const wasteValue = 100 - recyclingPotential;

  return [
    { source: 'Recycled Material', target: 'Product', value: recycledValue },
    { source: 'Virgin Material', target: 'Product', value: virginValue },
    { source: 'Product', target: 'Recycling Loop', value: recyclingPotential },
    { source: 'Product', target: 'Waste', value: wasteValue }
  ];
}

function generateRecommendations(formData: FormData): string[] {
  const recommendations = [];

  if (formData.recycledContent === 'Ore') {
    recommendations.push('Consider using both or fully recycled materials for a 30-60% reduction in carbon footprint.');
  } else if (formData.recycledContent === 'Both') {
    recommendations.push('Upgrade to fully recycled materials for an additional 30% reduction in environmental impact.');
  }

  if (formData.transportDistance > 500) {
    recommendations.push('Optimize transport logistics to reduce emissions by 5-10%.');
  }

  // Add general recycling recommendation
  recommendations.push('Consider improving recycling processes to enhance circular economy performance.');

  if (recommendations.length === 0) {
    recommendations.push('Your current configuration shows excellent sustainability practices!');
  }

  return recommendations;
}
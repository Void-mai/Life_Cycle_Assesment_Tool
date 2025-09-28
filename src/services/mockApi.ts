import { FormData, LCAResponse } from '../types';

// Updated to use the new backend API endpoint
export const generateLCAReport = async (formData: FormData): Promise<LCAResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL || '/api';
  
  try {
    const response = await fetch(`${apiUrl}/lca-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to generate LCA report');
    }

    return result.data;
  } catch (error) {
    console.error('Error calling LCA API:', error);
    
    // Fallback to mock data if API fails
    console.log('Falling back to mock data...');
    return generateMockLCAReport(formData);
  }
};

// Fallback mock data generator
function generateMockLCAReport(formData: FormData): LCAResponse {
  // Use actual recycled content percentage for more accurate calculations
  const actualRecycledPercentage = formData.recycledContentPercentage || getRecycledContentRate(formData.recycledContent);
  const virginPercentage = 100 - actualRecycledPercentage;

  // Base carbon footprint values
  const baseVirginCoal = formData.material === 'Aluminium' ? 16.90 : 4.84;
  const baseVirginElectricity = formData.material === 'Aluminium' ? 8.57 : 2.58;
  const baseRecycledCoal = formData.material === 'Aluminium' ? 2.11 : 1.69;
  const baseRecycledElectricity = formData.material === 'Aluminium' ? 0.89 : 0.74;

  // Calculate weighted carbon footprint
  let virginCarbonFootprint, recycledCarbonFootprint;
  
  if (formData.energySource === 'Electricity') {
    virginCarbonFootprint = baseVirginElectricity;
    recycledCarbonFootprint = baseRecycledElectricity;
  } else if (formData.energySource === 'Coal') {
    virginCarbonFootprint = baseVirginCoal;
    recycledCarbonFootprint = baseRecycledCoal;
  } else { // Both
    virginCarbonFootprint = (baseVirginElectricity + baseVirginCoal) / 2;
    recycledCarbonFootprint = (baseRecycledElectricity + baseRecycledCoal) / 2;
  }

  // Weighted average based on actual recycled content percentage
  let carbonFootprint = (virginPercentage / 100) * virginCarbonFootprint + 
                       (actualRecycledPercentage / 100) * recycledCarbonFootprint;

  // Add transport impact
  carbonFootprint += formData.transportDistance * 0.0002;

  // Calculate circularity score
  let circularityScore = 10; // Base score
  circularityScore += (actualRecycledPercentage / 100) * 75; // Up to 75 points for 100% recycled
  
  if (formData.energySource === 'Electricity') {
    circularityScore += 10;
  } else if (formData.energySource === 'Both') {
    circularityScore += 5;
  }
  
  // Transport penalties
  if (formData.transportDistance > 1000) {
    circularityScore -= 5;
  } else if (formData.transportDistance > 600) {
    circularityScore -= 3;
  }

  // Ensure bounds
  carbonFootprint = Math.max(0.5, Math.min(20, carbonFootprint));
  circularityScore = Math.max(5, Math.min(95, circularityScore));

  const mockPrediction = {
    carbonFootprint: Math.round(carbonFootprint * 100) / 100,
    circularityScore: Math.round(circularityScore)
  };
  
  const baseline = {
    carbonFootprint: 16.9,
    circularityScore: 8
  };

  return {
    material: formData.material,
    scenario: `${formData.recycledContent} Route ${formData.material}`,
    recycledContentAmount: (formData.recycledContentPercentage * formData.totalMass / 100),
    environmentalImpacts: {
      carbonFootprint: mockPrediction.carbonFootprint,
      waterUsage: 0
    },
    baselineImpacts: {
      carbonFootprint: baseline.carbonFootprint,
      waterUsage: 0
    },
    circularityMetrics: {
      recycledContentRate: getRecycledContentRate(formData.recycledContent),
      circularityScore: mockPrediction.circularityScore / 100,
      resourceEfficiency: calculateResourceEfficiency(formData),
      extendedProductLife: `${Math.round(3 + (mockPrediction.circularityScore / 100 * 5))} years`
    },
    flowData: generateFlowData(formData),
    recommendations: generateMockRecommendations(formData)
  };
}

function getRecycledContentRate(recycledContent: string): number {
  const rates = {
    'Ore': 0,
    'Both': 50,
    'Recycled': 90
  };
  return rates[recycledContent as keyof typeof rates] || 0;
}

function calculateResourceEfficiency(formData: FormData): number {
  // Use actual recycled content percentage
  const actualRecycledPercentage = formData.recycledContentPercentage || getRecycledContentRate(formData.recycledContent);
  
  // Start with base efficiency
  let efficiency = 0.15; // Base efficiency for worst-case scenario
  
  // Linear relationship with recycled content (major factor)
  efficiency += (actualRecycledPercentage / 100) * 0.6; // Up to 60% boost for 100% recycled
  
  // Energy source impact
  if (formData.energySource === 'Electricity') {
    efficiency += 0.15; // Clean energy bonus
  } else if (formData.energySource === 'Both') {
    efficiency += 0.05; // Mixed energy small bonus
  }
  // Coal gets no bonus (worst case)
  
  // Transport distance penalties
  if (formData.transportDistance > 1000) {
    efficiency -= 0.15; // Long distance major penalty
  } else if (formData.transportDistance > 600) {
    efficiency -= 0.1; // Medium distance penalty
  } else if (formData.transportDistance > 300) {
    efficiency -= 0.05; // Short distance small penalty
  }
  
  // Additional penalty for high amounts with inefficient processes
  if (formData.totalMass > 200 && actualRecycledPercentage === 0 && formData.energySource === 'Coal') {
    efficiency -= 0.1; // Large scale inefficient operation penalty
  }

  // Ensure efficiency stays within realistic bounds  
  return Math.max(0.15, Math.min(0.90, efficiency));
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

function generateMockRecommendations(formData: FormData): string[] {
  const recommendations = [];

  if (formData.recycledContent === 'Ore') {
    recommendations.push('Switch to recycled materials to save 85.9% CO₂ emissions.');
  } else if (formData.recycledContent === 'Both') {
    recommendations.push('Switch to recycled materials to save 78.2% CO₂ emissions.');
  }

  if (formData.transportDistance > 500) {
    recommendations.push('Reduce transport distance by 50% to save 1.1% CO₂ emissions.');
  }

  if (formData.energySource === 'Coal') {
    recommendations.push('Switch to electricity to save 36.7% CO₂ emissions.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Your current configuration shows excellent sustainability practices!');
    recommendations.push('Consider monitoring emerging technologies for further optimization opportunities.');
  }

  return recommendations;
}
import React from 'react';
import { EnvironmentalImpacts } from '../../types';

interface BarChartProps {
  userImpacts: EnvironmentalImpacts;
  baselineImpacts: EnvironmentalImpacts;
  scenario: string;
}

const BarChart: React.FC<BarChartProps> = ({ userImpacts, baselineImpacts, scenario }) => {
  const data = [
    {
      category: 'Carbon Footprint',
      user: userImpacts.carbonFootprint,
      baseline: baselineImpacts.carbonFootprint,
      unit: 'kg CO₂e',
      color: 'blue'
    }
  ];

  const maxValue = Math.max(...data.flatMap(d => [d.user, d.baseline]));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Environmental Impact Comparison</h3>
      
      <div className="space-y-8">
        {data.map((item) => {
          const userPercentage = (item.user / maxValue) * 100;
          const baselinePercentage = (item.baseline / maxValue) * 100;
          
          return (
            <div key={item.category} className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-700">{item.category}</h4>
              </div>
              
              <div className="space-y-2">
                {/* User Scenario Bar */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-24">{scenario}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${userPercentage}%` }}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-700">
                      {item.user.toFixed(1)} {item.unit}
                    </span>
                  </div>
                </div>
                
                {/* Baseline Bar */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-24">Virgin Material</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${baselinePercentage}%` }}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-700">
                      {item.baseline.toFixed(1)} {item.unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">
          <strong>Impact Summary:</strong> Your configuration shows significant environmental benefits 
          compared to using 100% virgin materials, with reduced carbon emissions and improved circularity.
        </p>
      </div>
    </div>
  );
};

export default BarChart;
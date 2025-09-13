import React from 'react';
import { EnvironmentalImpacts } from '../../types';
import { TrendingDown, TrendingUp } from 'lucide-react';

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
  const impactReduction = ((baselineImpacts.carbonFootprint - userImpacts.carbonFootprint) / baselineImpacts.carbonFootprint * 100);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Environmental Impact Comparison</h3>
          <p className="text-slate-300">Your configuration vs. conventional baseline</p>
        </div>
        {impactReduction > 0 && (
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
            <TrendingDown className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">
              {impactReduction.toFixed(1)}% Reduction
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-8">
        {data.map((item) => {
          const userPercentage = (item.user / maxValue) * 100;
          const baselinePercentage = (item.baseline / maxValue) * 100;
          
          return (
            <div key={item.category} className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-slate-200">{item.category}</h4>
              </div>
              
              <div className="space-y-4">
                {/* User Scenario Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-300">{scenario}</span>
                    <span className="text-sm font-bold text-blue-400">
                      {item.user.toFixed(2)} {item.unit}
                    </span>
                  </div>
                  <div className="relative bg-slate-700/50 rounded-full h-8 overflow-hidden border border-slate-600">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${userPercentage}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </div>
                
                {/* Baseline Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-300">Virgin Material Baseline</span>
                    <span className="text-sm font-bold text-slate-400">
                      {item.baseline.toFixed(2)} {item.unit}
                    </span>
                  </div>
                  <div className="relative bg-slate-700/50 rounded-full h-8 overflow-hidden border border-slate-600">
                    <div
                      className="h-full bg-gradient-to-r from-slate-500 to-slate-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${baselinePercentage}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl border border-green-500/20">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <TrendingDown className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-2">Impact Analysis</h4>
            <p className="text-slate-300 leading-relaxed">
              Your configuration demonstrates significant environmental benefits compared to conventional 
              virgin material processing. The reduced carbon footprint reflects improved resource efficiency 
              and circular economy principles in your manufacturing approach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
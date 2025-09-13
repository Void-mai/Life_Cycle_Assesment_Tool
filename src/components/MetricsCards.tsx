import React from 'react';
import { Recycle, Zap, TrendingUp, Award } from 'lucide-react';
import { CircularityMetrics, EnvironmentalImpacts } from '../types';

interface MetricsCardsProps {
  metrics: CircularityMetrics;
  environmentalImpacts: EnvironmentalImpacts;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, environmentalImpacts }) => {
  const cards = [
    {
      title: 'Circularity Score',
      value: metrics.circularityScore * 100,
      unit: '/100',
      icon: Recycle,
      color: 'blue',
      description: 'Overall circular economy performance',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Carbon Footprint',
      value: environmentalImpacts.carbonFootprint,
      unit: 'kg CO₂e',
      icon: Zap,
      color: 'green',
      description: 'Carbon emissions per unit mass',
      gradient: 'from-green-500 to-emerald-400'
    },
    {
      title: 'Resource Efficiency',
      value: metrics.resourceEfficiency * 100,
      unit: '%',
      icon: TrendingUp,
      color: 'purple',
      description: 'Material utilization effectiveness',
      gradient: 'from-purple-500 to-pink-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="group bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 bg-gradient-to-r ${card.gradient} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                {card.title}
              </h3>
              
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                  {typeof card.value === 'number' ? Math.round(card.value) : card.value}
                </span>
                {card.unit && (
                  <span className="text-lg text-slate-400 font-medium">{card.unit}</span>
                )}
              </div>
              
              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {card.description}
              </p>
            </div>

            {/* Progress bar for percentage values */}
            {(card.unit === '%' || card.unit === '/100') && (
              <div className="mt-4 w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${card.unit === '/100' ? card.value : Math.min(card.value, 100)}%` 
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;
import React from 'react';
import { Recycle, Zap } from 'lucide-react';
import { CircularityMetrics, EnvironmentalImpacts } from '../types';

interface MetricsCardsProps {
  metrics: CircularityMetrics;
  environmentalImpacts: EnvironmentalImpacts;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, environmentalImpacts }) => {
  const cards = [
    {
      title: 'Circularity Score',
      value: metrics.circularityScore * 100, // Convert from 0-1 to 0-100 scale
      unit: '/100',
      icon: Recycle,
      color: 'blue',
      description: 'Overall circular economy performance'
    },
    {
      title: 'Carbon Emissions',
      value: environmentalImpacts.carbonFootprint,
      unit: 'kg CO₂e',
      icon: Zap,
      color: 'green',
      description: 'Carbon footprint per unit mass'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg border ${getColorClasses(card.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-gray-900">
                  {typeof card.value === 'number' ? Math.round(card.value) : card.value}
                </span>
                {card.unit && (
                  <span className="text-sm text-gray-500">{card.unit}</span>
                )}
              </div>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Zap, Recycle, Factory } from 'lucide-react';

interface RouteData {
  name: string;
  carbonFootprint: number;
  circularityScore: number;
  resourceEfficiency: number;
  color: string;
  gradient: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface RouteComparisonChartsProps {
  currentRoute: string;
  material: string;
  currentCarbonFootprint: number;
  currentCircularityScore: number;
  currentResourceEfficiency: number;
}

const RouteComparisonCharts: React.FC<RouteComparisonChartsProps> = ({
  currentRoute,
  material,
  currentCarbonFootprint,
  currentCircularityScore,
  currentResourceEfficiency
}) => {
  const [activeChart, setActiveChart] = useState<'carbon' | 'circularity' | 'efficiency'>('carbon');
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  // Generate route data based on material and current configuration
  const generateRouteData = (): RouteData[] => {
    const isAluminium = material === 'Aluminium';
    
    return [
      {
        name: 'Current',
        carbonFootprint: currentCarbonFootprint,
        circularityScore: currentCircularityScore * 100,
        resourceEfficiency: currentResourceEfficiency * 100,
        color: 'blue',
        gradient: 'from-blue-500 to-cyan-400',
        icon: BarChart3,
        description: `Your current ${currentRoute} configuration`
      },
      {
        name: 'Baseline',
        carbonFootprint: isAluminium ? 16.90 : 4.84,
        circularityScore: 10,
        resourceEfficiency: 15,
        color: 'gray',
        gradient: 'from-gray-500 to-gray-400',
        icon: Factory,
        description: 'Virgin material with coal energy'
      },
      {
        name: 'Optimal Recycled',
        carbonFootprint: isAluminium ? 0.89 : 0.74,
        circularityScore: 92,
        resourceEfficiency: 85,
        color: 'green',
        gradient: 'from-green-500 to-emerald-400',
        icon: Recycle,
        description: '100% recycled with clean electricity'
      },
      {
        name: 'Clean Energy',
        carbonFootprint: currentCarbonFootprint * 0.7,
        circularityScore: (currentCircularityScore * 100) + 15,
        resourceEfficiency: (currentResourceEfficiency * 100) + 10,
        color: 'yellow',
        gradient: 'from-yellow-500 to-orange-400',
        icon: Zap,
        description: 'Current route with renewable energy'
      },
      {
        name: 'Hybrid Optimization',
        carbonFootprint: isAluminium ? 0.80 : 0.65,
        circularityScore: 95,
        resourceEfficiency: 90,
        color: 'purple',
        gradient: 'from-purple-500 to-pink-400',
        icon: Award,
        description: 'Best of all optimization strategies'
      }
    ];
  };

  const routeData = generateRouteData();

  const getChartData = () => {
    switch (activeChart) {
      case 'carbon':
        return {
          title: 'Carbon Footprint Comparison',
          unit: 'kg CO₂e',
          data: routeData.map(route => ({ ...route, value: route.carbonFootprint })),
          maxValue: Math.max(...routeData.map(r => r.carbonFootprint)),
          lowerIsBetter: true
        };
      case 'circularity':
        return {
          title: 'Circularity Score Comparison',
          unit: '/100',
          data: routeData.map(route => ({ ...route, value: route.circularityScore })),
          maxValue: 100,
          lowerIsBetter: false
        };
      case 'efficiency':
        return {
          title: 'Resource Efficiency Comparison',
          unit: '%',
          data: routeData.map(route => ({ ...route, value: route.resourceEfficiency })),
          maxValue: 100,
          lowerIsBetter: false
        };
      default:
        return {
          title: 'Carbon Footprint Comparison',
          unit: 'kg CO₂e',
          data: routeData.map(route => ({ ...route, value: route.carbonFootprint })),
          maxValue: Math.max(...routeData.map(r => r.carbonFootprint)),
          lowerIsBetter: true
        };
    }
  };

  const chartData = getChartData();

  const getPerformanceColor = (value: number, isCurrentRoute: boolean) => {
    if (isCurrentRoute) return 'text-blue-400';
    
    if (chartData.lowerIsBetter) {
      if (value <= chartData.maxValue * 0.2) return 'text-green-400';
      if (value <= chartData.maxValue * 0.5) return 'text-yellow-400';
      return 'text-red-400';
    } else {
      if (value >= chartData.maxValue * 0.8) return 'text-green-400';
      if (value >= chartData.maxValue * 0.5) return 'text-yellow-400';
      return 'text-red-400';
    }
  };

  const getBestPerformingRoute = () => {
    const sortedData = [...chartData.data].sort((a, b) => 
      chartData.lowerIsBetter ? a.value - b.value : b.value - a.value
    );
    return sortedData[0];
  };

  const bestRoute = getBestPerformingRoute();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Route Performance Comparison</h3>
          <p className="text-slate-300">Compare your current route against optimized alternatives</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
          <Award className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-medium">
            Best: {bestRoute.name}
          </span>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex space-x-2 mb-8 p-1 bg-slate-800/50 rounded-xl">
        {[
          { key: 'carbon', label: 'Carbon Footprint', icon: Factory },
          { key: 'circularity', label: 'Circularity Score', icon: Recycle },
          { key: 'efficiency', label: 'Resource Efficiency', icon: TrendingUp }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveChart(key as any)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 flex-1 ${
              activeChart === key
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-white">{chartData.title}</h4>
          <div className="text-sm text-slate-400">
            {chartData.lowerIsBetter ? 'Lower is better' : 'Higher is better'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {chartData.data.map((route, index) => {
            const Icon = route.icon;
            const percentage = (route.value / chartData.maxValue) * 100;
            const isCurrentRoute = route.name === 'Current';
            const isHovered = hoveredRoute === route.name;
            
            return (
              <div
                key={route.name}
                className={`group relative p-4 bg-slate-800/30 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isCurrentRoute 
                    ? 'border-blue-500/50 bg-blue-900/20' 
                    : isHovered
                    ? 'border-white/30 bg-white/5'
                    : 'border-slate-600/30 hover:border-slate-500/50'
                }`}
                onMouseEnter={() => setHoveredRoute(route.name)}
                onMouseLeave={() => setHoveredRoute(null)}
              >
                {/* Route Icon and Name */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 bg-gradient-to-r ${route.gradient} rounded-lg shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">{route.name}</h5>
                    {isCurrentRoute && (
                      <span className="text-xs text-blue-400 font-medium">Your Route</span>
                    )}
                  </div>
                </div>

                {/* Value Display */}
                <div className="mb-4">
                  <div className={`text-2xl font-bold ${getPerformanceColor(route.value, isCurrentRoute)}`}>
                    {route.value.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-400">{chartData.unit}</div>
                </div>

                {/* Bar Chart */}
                <div className="relative bg-slate-700/50 rounded-full h-3 overflow-hidden mb-4">
                  <div
                    className={`h-full bg-gradient-to-r ${route.gradient} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
                </div>

                {/* Performance Indicator */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Performance</span>
                  <div className="flex items-center space-x-1">
                    {route.value === bestRoute.value && (
                      <Award className="w-3 h-3 text-yellow-400" />
                    )}
                    <span className={getPerformanceColor(route.value, isCurrentRoute)}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Hover Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-slate-900 rounded-lg shadow-xl border border-slate-600 z-10 min-w-48">
                    <div className="text-sm text-white font-medium mb-1">{route.name}</div>
                    <div className="text-xs text-slate-300">{route.description}</div>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Carbon:</span>
                        <span className="text-white">{route.carbonFootprint.toFixed(2)} kg CO₂e</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Circularity:</span>
                        <span className="text-white">{route.circularityScore.toFixed(0)}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Efficiency:</span>
                        <span className="text-white">{route.resourceEfficiency.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/20">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-green-400">Best Performance</span>
          </div>
          <div className="text-white font-medium">{bestRoute.name}</div>
          <div className="text-xs text-slate-300">{bestRoute.description}</div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-500/20">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">Current Status</span>
          </div>
          <div className="text-white font-medium">
            {chartData.data.find(r => r.name === 'Current')?.value.toFixed(2)} {chartData.unit}
          </div>
          <div className="text-xs text-slate-300">Your current configuration</div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/20">
          <div className="flex items-center space-x-3 mb-2">
            <Award className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">Improvement Potential</span>
          </div>
          <div className="text-white font-medium">
            {chartData.lowerIsBetter 
              ? `${(((chartData.data.find(r => r.name === 'Current')?.value || 0) - bestRoute.value) / (chartData.data.find(r => r.name === 'Current')?.value || 1) * 100).toFixed(1)}%`
              : `+${((bestRoute.value - (chartData.data.find(r => r.name === 'Current')?.value || 0)) / (chartData.data.find(r => r.name === 'Current')?.value || 1) * 100).toFixed(1)}%`
            } possible
          </div>
          <div className="text-xs text-slate-300">
            {chartData.lowerIsBetter ? 'Reduction potential' : 'Improvement potential'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteComparisonCharts;
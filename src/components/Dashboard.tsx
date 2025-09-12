import React from 'react';
import { ArrowLeft, Download, Share2, AlertCircle } from 'lucide-react';
import { LCAResponse } from '../types';
import MetricsCards from './MetricsCards';
import BarChart from './charts/BarChart';

interface DashboardProps {
  data: LCAResponse;
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center px-4 py-2 text-gray-600 bg-white rounded-lg shadow hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">LCA Report</h1>
              <p className="text-gray-600">{data.scenario}</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200">
              <Share2 className="w-4 h-4 mr-2" />
              Share Report
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <MetricsCards 
          metrics={data.circularityMetrics} 
          environmentalImpacts={data.environmentalImpacts}
        />

        {/* Carbon Footprint Chart */}
        <div className="mb-8">
          <BarChart
            userImpacts={data.environmentalImpacts}
            baselineImpacts={data.baselineImpacts}
            scenario={data.scenario}
          />
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">Recommendations</h3>
          </div>
          
          <div className="space-y-4">
            {data.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Material:</span>
              <span className="ml-2 text-gray-600">{data.material}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Route:</span>
              <span className="ml-2 text-gray-600">{data.scenario.split(' ')[0]}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Circularity Score:</span>
              <span className="ml-2 text-blue-600 font-medium">
                {Math.round(data.circularityMetrics.circularityScore * 100)}/100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
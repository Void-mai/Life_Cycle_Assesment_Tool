import React from 'react';
import { ArrowLeft, Download, Share2, AlertCircle, TrendingUp, Award, Zap } from 'lucide-react';
import { LCAResponse } from '../types';
import { PDFExportService } from '../services/pdfExport';
import MetricsCards from './MetricsCards';
import BarChart from './charts/BarChart';
import RouteComparisonCharts from './charts/RouteComparisonCharts';

interface DashboardProps {
  data: LCAResponse;
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onBack }) => {
  const impactReduction = data.baselineImpacts.carbonFootprint > 0 
    ? ((data.baselineImpacts.carbonFootprint - data.environmentalImpacts.carbonFootprint) / data.baselineImpacts.carbonFootprint * 100)
    : 0;

  const handleExportPDF = async () => {
    try {
      const pdfService = new PDFExportService();
      await pdfService.generateDetailedReport(data);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Geometric Shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-blue-400/10 rotate-45 hidden lg:block" />
      <div className="absolute bottom-40 left-20 w-24 h-24 border border-slate-400/10 rotate-12 hidden lg:block" />

      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <button
                onClick={onBack}
                className="flex items-center px-6 py-3 text-slate-300 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-all duration-200 backdrop-blur-sm border border-slate-600 hover:border-slate-500"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Setup
              </button>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Sustainability Analysis
                </h1>
                <p className="text-xl text-slate-300 mt-2">{data.scenario}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-400">Analysis Complete</span>
                  </div>
                  {impactReduction > 0 && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">
                        {impactReduction.toFixed(1)}% Impact Reduction
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={handleExportPDF}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" />
                Export Report
              </button>
              <button className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-xl hover:from-green-600 hover:to-emerald-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Share2 className="w-5 h-5 mr-2" />
                Share Results
              </button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="mb-12">
            <MetricsCards 
              metrics={data.circularityMetrics} 
              environmentalImpacts={data.environmentalImpacts}
              recycledContentAmount={data.recycledContentAmount || 0}
            />
          </div>

          {/* Carbon Footprint Chart */}
          <div className="mb-12">
            <BarChart
              userImpacts={data.environmentalImpacts}
              baselineImpacts={data.baselineImpacts}
              scenario={data.scenario}
            />
          </div>

          {/* Route Comparison Charts */}
          <div className="mb-12">
            <RouteComparisonCharts
              currentRoute={data.scenario.split(' ')[0]}
              material={data.material}
              currentCarbonFootprint={data.environmentalImpacts.carbonFootprint}
              currentCircularityScore={data.circularityMetrics.circularityScore}
              currentResourceEfficiency={data.circularityMetrics.resourceEfficiency}
            />
          </div>

          {/* AI Recommendations */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">AI-Powered Recommendations</h3>
                <p className="text-slate-300">Intelligent insights to optimize your sustainability performance</p>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-400 font-medium">Smart Analysis</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="group p-6 bg-gradient-to-r from-slate-800/50 to-blue-800/30 rounded-xl border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl border border-green-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-green-400">AI Analysis Complete</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                These recommendations are generated by analyzing multiple scenarios and comparing their environmental 
                impact against your current configuration. Our machine learning model considers material properties, 
                energy sources, and circular economy principles to provide actionable insights.
              </p>
            </div>
          </div>

          {/* Enhanced Summary */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Analysis Summary</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600/50">
                <div className="text-sm text-slate-400 mb-1">Material</div>
                <div className="text-lg font-semibold text-white">{data.material}</div>
              </div>
              
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600/50">
                <div className="text-sm text-slate-400 mb-1">Manufacturing Route</div>
                <div className="text-lg font-semibold text-white">{data.scenario.split(' ')[0]}</div>
              </div>
              
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600/50">
                <div className="text-sm text-slate-400 mb-1">Circularity Score</div>
                <div className="text-lg font-semibold text-blue-400">
                  {Math.round(data.circularityMetrics.circularityScore * 100)}/100
                </div>
              </div>
              
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600/50">
                <div className="text-sm text-slate-400 mb-1">Resource Efficiency</div>
                <div className="text-lg font-semibold text-green-400">
                  {Math.round(data.circularityMetrics.resourceEfficiency * 100)}%
                </div>
              </div>
            </div>

            {impactReduction > 0 && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl border border-green-500/30">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-semibold text-green-400">Environmental Impact Reduction</span>
                </div>
                <p className="text-slate-300">
                  Your configuration achieves a <strong className="text-green-400">{impactReduction.toFixed(1)}%</strong> reduction 
                  in carbon emissions compared to conventional virgin material processing, demonstrating significant 
                  progress toward circular economy principles.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
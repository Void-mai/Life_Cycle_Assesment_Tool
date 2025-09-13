import React from 'react';
import { Brain, Zap, Recycle } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden flex items-center justify-center">
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
      <div className="absolute top-20 right-20 w-32 h-32 border border-blue-400/10 rotate-45 hidden lg:block animate-pulse" />
      <div className="absolute bottom-40 left-20 w-24 h-24 border border-slate-400/10 rotate-12 hidden lg:block animate-pulse" />

      <div className="relative z-10 text-center">
        {/* Main Loading Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-r-cyan-400 rounded-full animate-spin mx-auto" style={{ animationDelay: '0.15s' }}></div>
          <div className="absolute inset-2 w-20 h-20 border-4 border-transparent border-b-purple-500 rounded-full animate-spin mx-auto" style={{ animationDelay: '0.3s' }}></div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
            AI Analysis in Progress
          </h3>
          <p className="text-xl text-slate-300 max-w-md mx-auto leading-relaxed">
            Processing your sustainability data with advanced machine learning
          </p>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-white">Analyzing Material Properties</div>
              <div className="text-xs text-slate-400">Processing material composition and sourcing data</div>
            </div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-white">Calculating Environmental Impact</div>
              <div className="text-xs text-slate-400">Computing carbon footprint and energy metrics</div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-white">Generating Recommendations</div>
              <div className="text-xs text-slate-400">Creating AI-powered optimization insights</div>
            </div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-slate-400 mt-3">
            This may take a few moments while our AI processes your data...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
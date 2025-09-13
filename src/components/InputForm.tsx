import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Package, Zap, Sparkles, CheckCircle } from 'lucide-react';
import { FormData } from '../types';

interface InputFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    material: 'Aluminium',
    recycledContent: 'Both',
    totalMass: 100,
    energySource: 'Electricity',
    transportDistance: 500,
    endOfLife: 'Open-Loop Recycling'
  });

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const steps = [
    { number: 1, title: 'Material & Sourcing', icon: Package, description: 'Define your material specifications' },
    { number: 2, title: 'Process & Energy', icon: Zap, description: 'Configure energy and logistics' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden py-12">
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              LCA Analysis Setup
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Configure your material and process parameters for comprehensive sustainability analysis
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-slate-800/50 to-blue-800/50 p-8 border-b border-white/10">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : isActive
                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25' 
                          : 'border-slate-400 text-slate-400 bg-slate-700/50'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="hidden md:block">
                        <h3 className={`font-semibold transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-slate-300'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-400">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-8 transition-all duration-300 ${
                        currentStep > step.number ? 'bg-green-500' : 'bg-slate-600'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="min-h-[400px]">
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Material Specifications</h2>
                    <p className="text-slate-300">Define the core material properties for your analysis</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-200 mb-3">
                        Material Type
                      </label>
                      <select
                        value={formData.material}
                        onChange={(e) => updateFormData('material', e.target.value)}
                        className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      >
                        <option value="Aluminium">Aluminium</option>
                        <option value="Copper">Copper</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-200 mb-3">
                        Manufacturing Route
                      </label>
                      <select
                        value={formData.recycledContent}
                        onChange={(e) => updateFormData('recycledContent', e.target.value)}
                        className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      >
                        <option value="Ore">Ore</option>
                        <option value="Both">Both</option>
                        <option value="Recycled">Recycled</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      Total Amount (tons)
                    </label>
                    <input
                      type="number"
                      value={formData.totalMass}
                      onChange={(e) => updateFormData('totalMass', parseFloat(e.target.value))}
                      className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      min="0"
                      step="0.1"
                      placeholder="Enter material quantity"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Process Configuration</h2>
                    <p className="text-slate-300">Configure energy sources and logistics parameters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-200 mb-3">
                        Energy Source
                      </label>
                      <select
                        value={formData.energySource}
                        onChange={(e) => updateFormData('energySource', e.target.value)}
                        className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      >
                        <option value="Electricity">Electricity</option>
                        <option value="Coal">Coal</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-200 mb-3">
                        Transport Distance (km)
                      </label>
                      <input
                        type="number"
                        value={formData.transportDistance}
                        onChange={(e) => updateFormData('transportDistance', parseFloat(e.target.value))}
                        className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                        min="0"
                        step="1"
                        placeholder="Enter transport distance"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">AI Analysis Ready</h3>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Our advanced machine learning model will analyze your configuration and provide 
                      comprehensive sustainability insights with actionable recommendations.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-8 py-4 text-slate-300 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm border border-slate-600"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              {currentStep < 2 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-xl hover:from-green-600 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Analysis
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
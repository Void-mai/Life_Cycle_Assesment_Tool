import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Package, Zap, Recycle } from 'lucide-react';
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
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const steps = [
    { number: 1, title: 'Material & Sourcing', icon: Package },
    { number: 2, title: 'Process & Energy', icon: Zap }
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {step.number < 2 && (
                  <div className={`w-24 h-1 mx-4 transition-all duration-300 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {steps[currentStep - 1].title}
        </h2>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material
              </label>
              <select
                value={formData.material}
                onChange={(e) => updateFormData('material', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Aluminium">Aluminium</option>
                <option value="Copper">Copper</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Route
              </label>
              <select
                value={formData.recycledContent}
                onChange={(e) => updateFormData('recycledContent', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Ore">Ore</option>
                <option value="Both">Both</option>
                <option value="Recycled">Recycled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (tons)
              </label>
              <input
                type="number"
                value={formData.totalMass}
                onChange={(e) => updateFormData('totalMass', parseFloat(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy
              </label>
              <select
                value={formData.energySource}
                onChange={(e) => updateFormData('energySource', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Electricity">Electricity</option>
                <option value="Coal">Coal</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transport distance (km)
              </label>
              <input
                type="number"
                value={formData.transportDistance}
                onChange={(e) => updateFormData('transportDistance', parseFloat(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="1"
              />
            </div>
          </div>
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {currentStep < 2 ? (
          <button
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? 'Generating...' : 'Generate Report'}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputForm;
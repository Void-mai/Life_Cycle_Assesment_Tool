import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { FormData, LCAResponse } from './types';
import { generateLCAReport } from './services/mockApi';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'loading' | 'dashboard'>('form');
  const [reportData, setReportData] = useState<LCAResponse | null>(null);

  const handleFormSubmit = async (formData: FormData) => {
    setCurrentView('loading');
    
    try {
      const response = await generateLCAReport(formData);
      setReportData(response);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Error generating report:', error);
      setCurrentView('form');
    }
  };

  const handleBackToForm = () => {
    setCurrentView('form');
    setReportData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {currentView === 'form' && (
        <div className="py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-green-600 rounded-full">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">LCA Platform</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Analyze the environmental impact and circularity of your materials with our comprehensive Life Cycle Assessment tool.
            </p>
          </div>

          <InputForm onSubmit={handleFormSubmit} isLoading={false} />
        </div>
      )}

      {currentView === 'loading' && <LoadingSpinner />}

      {currentView === 'dashboard' && reportData && (
        <Dashboard data={reportData} onBack={handleBackToForm} />
      )}
    </div>
  );
}

export default App;
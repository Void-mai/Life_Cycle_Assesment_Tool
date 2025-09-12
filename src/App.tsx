import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { FormData, LCAResponse } from './types';
import { generateLCAReport } from './services/mockApi';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'form' | 'loading' | 'dashboard'>('landing');
  const [reportData, setReportData] = useState<LCAResponse | null>(null);

  const handleGetStarted = () => {
    setCurrentView('form');
  };

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
    setCurrentView('landing');
    setReportData(null);
  };

  return (
    <div className="min-h-screen">
      {currentView === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {currentView === 'form' && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <button
                onClick={() => setCurrentView('landing')}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                ← Back to Home
              </button>
            </div>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                </svg>
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
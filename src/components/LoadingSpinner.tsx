import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-600 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Analyzing Your LCA Data
        </h3>
        <p className="text-gray-600">
          Processing environmental impact calculations...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
import React from 'react';
import { ArrowRight, Lightbulb, BarChart3, Settings, Github } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Geometric Shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-blue-400/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-40 left-20 w-24 h-24 border border-slate-400/20 rotate-12 hidden lg:block" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-500/10 rotate-45 hidden lg:block" />

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              <span className="text-slate-200">
                Life Cycle Assessment
              </span>
              <br />
              <span className="text-slate-300 text-4xl md:text-5xl">
                for the Metals Industry
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Bridge the gap between engineering and sustainability. 
              <br className="hidden md:block" />
              Instantly calculate your carbon footprint and circularity score.
            </p>

            {/* CTA Button */}
            <button
              onClick={onGetStarted}
              className="group relative inline-flex items-center px-12 py-4 text-lg font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">USE THE TOOL</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Industrial Background Image */}
            <div className="mt-16 relative">
              <div className="relative mx-auto max-w-5xl">
                <img
                  src="https://images.pexels.com/photos/162568/steel-mill-factory-industry-162568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Industrial steel mill facility"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <Lightbulb className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Insights</h3>
              <p className="text-slate-300 leading-relaxed">
                Predict carbon footprint and circularity score in real-time using our advanced AI model trained on industry data.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <BarChart3 className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Scenario Comparison</h3>
              <p className="text-slate-300 leading-relaxed">
                Compare your process against a conventional, linear baseline to quantify sustainability improvements.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <Settings className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Actionable Intelligence</h3>
              <p className="text-slate-300 leading-relaxed">
                Get data-driven recommendations to optimize your process and enhance circular economy performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Industrial Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Transform Your <span className="text-blue-400">Manufacturing Process</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Move beyond traditional linear models. Our platform helps metallurgists and engineers 
                make informed decisions that reduce environmental impact while maintaining operational efficiency.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-slate-300">Aluminum and Copper Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-slate-300">Energy Source Optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-slate-300">Recycling Route Comparison</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Mining and industrial operations"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">
              © 2024 LCA Platform. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
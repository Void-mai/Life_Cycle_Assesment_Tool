const { PythonShell } = require('python-shell');
const path = require('path');

class MLService {
  constructor() {
    this.pythonScriptPath = path.join(__dirname, '..', 'ml_models', 'predict.py');
  }

  async predict(inputData) {
    return new Promise((resolve, reject) => {
      const options = {
        mode: 'json',
        pythonPath: 'python3', // or 'python' depending on your system
        scriptPath: path.dirname(this.pythonScriptPath),
        args: []
      };

      const pyshell = new PythonShell('predict.py', options);
      
      // Send input data to Python script
      pyshell.send(inputData);
      
      let result = null;
      
      pyshell.on('message', (message) => {
        result = message;
      });
      
      pyshell.end((err) => {
        if (err) {
          console.error('Python script error:', err);
          // Return fallback prediction
          resolve(this.getFallbackPrediction(inputData));
        } else if (result && result.error) {
          console.error('Model prediction error:', result.error);
          // Return fallback prediction
          resolve(this.getFallbackPrediction(inputData));
        } else {
          resolve(result);
        }
      });
    });
  }

  getFallbackPrediction(inputData) {
    // Fallback to simulation if ML model fails
    console.log('Using fallback prediction simulation');
    
    const { material, recycledContent, energySource, transportDistance } = inputData;
    
    let carbonFootprint = 5.0;
    let circularityScore = 50.0;
    
    // Simple fallback logic
    if (recycledContent === 'Recycled') {
      carbonFootprint = material === 'Aluminium' ? 1.2 : 0.9;
      circularityScore = 85;
    } else if (recycledContent === 'Both') {
      carbonFootprint = material === 'Aluminium' ? 6.5 : 3.2;
      circularityScore = 50;
    } else { // Ore
      carbonFootprint = material === 'Aluminium' ? 12.8 : 4.5;
      circularityScore = 15;
    }
    
    // Adjust for energy source
    if (energySource === 'Coal') {
      carbonFootprint *= 1.5;
      circularityScore *= 0.9;
    } else if (energySource === 'Electricity') {
      carbonFootprint *= 0.8;
      circularityScore *= 1.1;
    }
    
    // Adjust for transport distance
    carbonFootprint += (transportDistance / 1000) * 0.1;
    
    return {
      carbonFootprint: Math.round(carbonFootprint * 100) / 100,
      circularityScore: Math.round(Math.min(100, circularityScore) * 100) / 100
    };
  }

  async isModelAvailable() {
    try {
      const fs = require('fs');
      const modelPath = path.join(__dirname, '..', 'ml_models', 'SIH_predict.pkl');
      const scalerPath = path.join(__dirname, '..', 'ml_models', 'predict_scaler.pkl');
      
      return fs.existsSync(modelPath) && fs.existsSync(scalerPath);
    } catch (error) {
      return false;
    }
  }
}

module.exports = MLService;
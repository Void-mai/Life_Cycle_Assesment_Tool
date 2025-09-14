#!/usr/bin/env python3
import pickle
import json
import sys
import numpy as np
import pandas as pd
from pathlib import Path

def load_models():
    """Load the trained model and scaler"""
    try:
        # Get the directory where this script is located
        script_dir = Path(__file__).parent
        
        # Load the trained model
        model_path = script_dir / 'SIH_predict.pkl'
        scaler_path = script_dir / 'predict_scaler.pkl'
        
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        
        with open(scaler_path, 'rb') as f:
            scaler = pickle.load(f)
            
        return model, scaler
    except Exception as e:
        print(f"Error loading models: {str(e)}", file=sys.stderr)
        sys.exit(1)

def prepare_input_data(input_data):
    """Convert input data to the format expected by the model"""
    try:
        # Create feature vector based on your model's expected input format
        features = {
            'Amount (tons)': float(input_data.get('totalMass', 0)),
            'Transport Distance (km)': float(input_data.get('transportDistance', 0)),
            
            # Material one-hot encoding
            'Material_Aluminium': 1 if input_data.get('material') == 'Aluminium' else 0,
            'Material_Copper': 1 if input_data.get('material') == 'Copper' else 0,
            
            # Route one-hot encoding
            'Route_Both': 1 if input_data.get('recycledContent') == 'Both' else 0,
            'Route_Ore': 1 if input_data.get('recycledContent') == 'Ore' else 0,
            'Route_Recycled': 1 if input_data.get('recycledContent') == 'Recycled' else 0,
            
            # Energy Source one-hot encoding
            'Energy Source_Both': 1 if input_data.get('energySource') == 'Both' else 0,
            'Energy Source_Coal': 1 if input_data.get('energySource') == 'Coal' else 0,
            'Energy Source_Electricity': 1 if input_data.get('energySource') == 'Electricity' else 0,
        }
        
        # Convert to DataFrame with the correct column order
        feature_names = [
            'Amount (tons)', 'Transport Distance (km)',
            'Material_Aluminium', 'Material_Copper',
            'Route_Both', 'Route_Ore', 'Route_Recycled',
            'Energy Source_Both', 'Energy Source_Coal', 'Energy Source_Electricity'
        ]
        
        df = pd.DataFrame([features], columns=feature_names)
        return df
        
    except Exception as e:
        print(f"Error preparing input data: {str(e)}", file=sys.stderr)
        sys.exit(1)

def make_prediction(model, scaler, input_df):
    """Make prediction using the trained model"""
    try:
        # Scale the input data
        scaled_input = scaler.transform(input_df)
        
        # Make prediction
        prediction = model.predict(scaled_input)
        
        # The model should return [carbon_footprint, circularity_score]
        # Adjust this based on your actual model output format
        if len(prediction[0]) >= 2:
            carbon_footprint = float(prediction[0][0])
            circularity_score = float(prediction[0][1])
        else:
            # If model only predicts one value, assume it's carbon footprint
            carbon_footprint = float(prediction[0])
            # Calculate circularity score based on input characteristics
            circularity_score = calculate_circularity_score(input_df.iloc[0])
        
        # Ensure reasonable bounds
        carbon_footprint = max(0.1, min(50.0, carbon_footprint))
        circularity_score = max(0.0, min(100.0, circularity_score))
        
        return {
            'carbonFootprint': round(carbon_footprint, 2),
            'circularityScore': round(circularity_score, 2)
        }
        
    except Exception as e:
        print(f"Error making prediction: {str(e)}", file=sys.stderr)
        sys.exit(1)

def calculate_circularity_score(features):
    """Calculate circularity score based on input features"""
    score = 0
    
    # Base score from recycling route
    if features['Route_Recycled'] == 1:
        score += 80
    elif features['Route_Both'] == 1:
        score += 50
    else:  # Ore route
        score += 10
    
    # Bonus for clean energy
    if features['Energy Source_Electricity'] == 1:
        score += 10
    elif features['Energy Source_Both'] == 1:
        score += 5
    
    # Penalty for long transport
    if features['Transport Distance (km)'] > 1000:
        score -= 5
    
    return max(0, min(100, score))

def main():
    try:
        # Read input from stdin
        input_data = json.loads(sys.stdin.read())
        
        # Load models
        model, scaler = load_models()
        
        # Prepare input data
        input_df = prepare_input_data(input_data)
        
        # Make prediction
        result = make_prediction(model, scaler, input_df)
        
        # Output result as JSON
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            'error': str(e),
            'carbonFootprint': 5.0,  # Fallback values
            'circularityScore': 50.0
        }
        print(json.dumps(error_result))
        sys.exit(1)

if __name__ == '__main__':
    main()
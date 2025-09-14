# ML Models Directory

This directory contains the trained machine learning models for the LCA Platform.

## Required Files

Please place your trained model files in this directory:

1. **SIH_predict.pkl** - Your trained RandomForestRegressor model
2. **predict_scaler.pkl** - Your MinMaxScaler for input preprocessing

## File Structure
```
ml_models/
├── SIH_predict.pkl          # Your trained model (place here)
├── predict_scaler.pkl       # Your scaler (place here)
├── predict.py               # Python prediction script
└── README.md               # This file
```

## Model Input Format

The model expects the following features in this order:
- Amount (tons)
- Transport Distance (km)
- Material_Aluminium (0 or 1)
- Material_Copper (0 or 1)
- Route_Both (0 or 1)
- Route_Ore (0 or 1)
- Route_Recycled (0 or 1)
- Energy Source_Both (0 or 1)
- Energy Source_Coal (0 or 1)
- Energy Source_Electricity (0 or 1)

## Model Output Format

The model should output:
- Carbon Footprint (kg CO₂e/kg)
- Circularity Score (0-100)

## Usage

The Python script is called automatically by the Node.js backend when predictions are needed.
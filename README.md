Life_Cycle_Assesment_Tool

This project is an AI-powered platform designed to help engineers, metallurgists, and manufacturers easily assess and improve the sustainability of their processes. By bridging the gap between traditional industry practices and the principles of a circular economy, our tool provides instant, data-driven insights to promote resource efficiency, reduce waste, and lower carbon footprints.

The Problem:
The metals industry has historically operated on a linear "take-make-dispose" model, which leads to significant environmental and economic challenges:

1. Resource Depletion: High reliance on mining depletes finite natural resources.
2. High Environmental Impact: Manufacturing from virgin materials is energy-intensive, generating substantial greenhouse gas emissions and pollution.
3. Lack of Insight: Engineers and manufacturers often lack the practical tools to quickly quantify the environmental impact of their material and process choices. Traditional Life Cycle Assessments (LCA) are complex, time-consuming, and require specialized expertise.

Our project addresses this problem head-on by providing an accessible and actionable solution.

Our Solution:
Our solution is a simple, intuitive web application that uses a machine learning model to democratize LCA. The platform takes a few key user inputs and instantly provides quantifiable sustainability metrics, making it easy to compare different manufacturing scenarios.

The tool’s core functionality includes:

1. Predictive AI: A trained RandomForestRegressor model instantly predicts a process’s Carbon Footprint and Circularity Score based on a minimal number of inputs.
2.Scenario Comparison: Users can compare their proposed process (e.g., using 90% recycled material) against a conventional baseline (e.g., 100% virgin material) to visualize the sustainability benefits.
3.Actionable Insights: The platform provides clear recommendations to help users make more sustainable decisions.

Key Features:
1. Intuitive User Interface: A clean, multi-step form for effortless data input.
2. Real-time Metrics: Instant feedback on two critical metrics: Carbon Footprint (kg CO2e/kg) and Circularity Score (0-100).
3. Visual Data Representation: A dynamic dashboard with charts and diagrams to visualize environmental impacts and material flows.
4. Minimal Inputs: Requires only a few key parameters, such as Material, Manufacturing Route, and Energy Source, to provide a comprehensive analysis.

How It Works:
The project consists of a frontend and a backend, working together to deliver the analysis.

1. Frontend (UI): The user interacts with a web-application built to collect key parameters.
2. Backend (API): The backend server receives the user's input and passes it to the AI model. It handles the data preparation, including one-hot encoding for categorical variables.
3. AI Model: A pre-trained RandomForestRegressor model (SIH_predict.pkl) and a MinMaxScaler (predict_scaler.pkl) process the input data and generate predictions for the Carbon Footprint and Circularity Score.
4. Result Delivery: The backend sends the final, human-readable predictions back to the frontend, where they are displayed on a dynamic dashboard.

THE DIRECT LINK TO THE HOST WEBSITE IS GIVEN BELOW:-

https://complete-lca-platfor-6l8s.bolt.host/

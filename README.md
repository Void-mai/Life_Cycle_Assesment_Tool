
# \# Life_Cycle_Assesment_Tool

This project is an AI-powered platform designed to help engineers, metallurgists, and manufacturers easily assess and improve the sustainability of their processes. By bridging the gap between traditional industry practices and the principles of a circular economy, our tool provides instant, data-driven insights to promote resource efficiency, reduce waste, and lower carbon footprints.

## The Problem:

### The metals industry has historically operated on a linear "take-make-dispose" model, which leads to significant environmental and economic challenges:

1. Resource Depletion: High reliance on mining depletes finite natural resources.
2. High Environmental Impact: Manufacturing from virgin materials is energy-intensive, generating substantial greenhouse gas emissions and pollution.
3. Lack of Insight: Engineers and manufacturers often lack the practical tools to quickly quantify the environmental impact of their material and process choices. Traditional Life Cycle Assessments (LCA) are complex, time-consuming, and require specialized expertise.
Our project addresses this problem head-on by providing an accessible and actionable solution.

## Our Solution:

Our solution is a simple, intuitive web application that uses a machine learning model to democratize LCA. The platform takes a few key user inputs and instantly provides quantifiable sustainability metrics, making it easy to compare different manufacturing scenarios.
The tool’s core functionality includes:

1. Predictive AI: A trained RandomForestRegressor model instantly predicts a process’s Carbon Footprint and Circularity Score based on a minimal number of inputs.
2.Scenario Comparison: Users can compare their proposed process (e.g., using 90% recycled material) against a conventional baseline (e.g., 100% virgin material) to visualize the sustainability benefits.
3.Actionable Insights: The platform provides clear recommendations to help users make more sustainable decisions.
Key Features:
2. Intuitive User Interface: A clean, multi-step form for effortless data input.
3. Real-time Metrics: Instant feedback on two critical metrics: Carbon Footprint (kg CO2e/kg) and Circularity Score (0-100).
4. Visual Data Representation: A dynamic dashboard with charts and diagrams to visualize environmental impacts and material flows.
5. Minimal Inputs: Requires only a few key parameters, such as Material, Manufacturing Route, and Energy Source, to provide a comprehensive analysis.
How It Works:
The project consists of a frontend and a backend, working together to deliver the analysis.
6. Frontend (UI): The user interacts with a web-application built to collect key parameters.
7. Backend (API): The backend server receives the user's input and passes it to the AI model. It handles the data preparation, including one-hot encoding for categorical variables.
8. AI Model: A pre-trained RandomForestRegressor model (SIH_predict.pkl) and a MinMaxScaler (predict_scaler.pkl) process the input data and generate predictions for the Carbon Footprint and Circularity Score.
9. Result Delivery: The backend sends the final, human-readable predictions back to the frontend, where they are displayed on a dynamic dashboard.

## THE DIRECT LINK TO THE HOST WEBSITE IS GIVEN BELOW:-

#### [https://complete-lca-platfor-6l8s.bolt.host/](https://complete-lca-platfor-6l8s.bolt.host/)

Make this more attractive readme

Here’s a more attractive and engaging README for your Life_Cycle_Assessment_Tool. This version is designed to impress hackathon judges, collaborators, and industry users alike!

***

# 🌱 Life Cycle Assessment (LCA) AI Platform

**Instant, Actionable Insights for Sustainable Metallurgy and Manufacturing**

[Visit Our Platform ▶️](https://complete-lca-platfor-6l8s.bolt.host/)

***

## 🚩 **The Sustainability Challenge in Metals**

Traditional metals production is stuck in a linear **“take–make–dispose”** loop:

- **Resource Depletion** — Mining drains finite natural reserves.
- **Huge Environmental Impact** — Virgin material processing = high energy use, increased carbon emissions, and pollution.
- **Zero Visibility** — Most engineers, metallurgists, and manufacturers *don’t* have quick, practical tools to quantify a process’s *real* environmental cost. Classic LCA methods are complex, slow, and require expert knowledge.

***

## 💡 **Our Mission: LCA for Everyone**

We empower industry professionals to make **data-driven, sustainable choices**—quickly, intuitively, and visually.

### **How?**

By **democratizing LCA** through a web platform that delivers instant feedback and smart recommendations, powered by machine learning.

***

## ⚙️ **How It Works (in 4 Steps)**

1. **User-Friendly Web App:** Streamlined UI collects only essential details (Material, Manufacturing Route, Energy Source…).
2. **AI Magic:** Inputs are processed by a pre-trained `RandomForestRegressor` model and `MinMaxScaler`, blending expert datasets with your scenario.
3. **Instant Results:** Instantly see your *Carbon Footprint (kg CO2e/kg)* and *Circularity Score (0–100)*.
4. **Visual Dashboard:** Interactive charts make it effortless to compare scenarios, spot key drivers, and explore “what if” questions.

***

## 🚀 **Key Features**

- **Intuitive Multi-Step Form**: No jargon — just clear steps!
- **Predictive AI**: Get robust, real-world predictions in seconds.
- **Scenario Comparison:** See how recycled vs. virgin inputs change your impact.
- **Rich Visuals**: Dynamic charts capture sustainability outcomes and material flows.
- **Clear Recommendations:** Actionable suggestions empower greener decisions.

***

## 🔍 **Example Use Cases**

- See how using 90% recycled aluminum slashes your carbon impact vs. virgin metal.
- Instantly compare different process routes (e.g., electric arc vs. blast furnace).
- Prioritize sustainability in R\&D, sourcing, client proposals, or compliance.

***

## 👩‍💻 **Technical Overview**

- **Frontend:** Built for clarity, responsiveness, and minimal input hassle.
- **Backend:** Python/Flask API connects input to models, handles preprocessing, and returns results.
- **ML Model:** RandomForestRegressor trained on rich LCA datasets for accuracy + robustness.
- **Deployment:** Hosted and ready for industrial use, experimentation, or education.

***

## 🌍 **Why It Matters**

With sustainability mandates and circular economy goals accelerating worldwide, our platform fills a critical industry gap: *instant, accessible, data-driven LCA—for everyone.* Whether you’re a lead engineer, a sustainability director, or a student, actionable insights are now just a few clicks away.

***

## 🎯 **Try It Now!**

👉 **[Live Demo](https://complete-lca-platfor-6l8s.bolt.host/)**

***

## 🤝 **Contact \& Contributions**

We welcome feedback, collaboration, and contributions from the community! Reach out via [Issues](#) or email the team.

***

**Built by passionate engineers, metallurgists, and AI enthusiasts for a greener tomorrow.**


***

# 🌱 Life Cycle Assessment (LCA) AI Platform

**Instant, Actionable Insights for Sustainable Metallurgy and Manufacturing**

> **Ready for Production Deployment** 🚀
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

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd lca-platform

# Install all dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the full application (frontend + backend)
npm run dev:full

# Or start components separately:
npm run dev        # Frontend only (port 5173)
npm run dev:server # Backend only (port 3001)
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

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
- **PDF Export**: Generate detailed reports for stakeholders.
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile.

***

## 🔍 **Example Use Cases**

- See how using 90% recycled aluminum slashes your carbon impact vs. virgin metal.
- Instantly compare different process routes (e.g., electric arc vs. blast furnace).
- Prioritize sustainability in R\&D, sourcing, client proposals, or compliance.
- Generate professional reports for sustainability audits.
- Benchmark your processes against industry standards.

***

## 👩‍💻 **Technical Overview**

- **Frontend:** React + TypeScript + Vite for modern, fast development
- **Backend:** Node.js + Express API with ML model integration
- **ML Model:** RandomForestRegressor trained on rich LCA datasets for accuracy + robustness.
- **Styling:** Tailwind CSS for responsive, beautiful UI
- **Charts:** Chart.js for interactive data visualization
- **Export:** PDF generation with detailed analysis reports
- **Deployment:** Production-ready with optimized builds

***

## 📁 **Project Structure**

```
lca-platform/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API and utility services
│   └── types/             # TypeScript type definitions
├── server/                # Backend Node.js server
│   ├── index.cjs          # Main server file
│   └── mlService.cjs      # ML model integration
├── ml_models/             # Machine learning models (optional)
├── public/                # Static assets
└── dist/                  # Production build output
```

***

## 🔧 **Available Scripts**

- `npm run dev` - Start frontend development server
- `npm run dev:server` - Start backend API server
- `npm run dev:full` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

***

## 🌐 **Deployment Options**

### Static Hosting (Frontend Only)
- Netlify, Vercel, GitHub Pages
- Run `npm run build` and deploy the `dist/` folder

### Full-Stack Deployment
- Railway, Render, DigitalOcean App Platform
- Supports both frontend and backend with API

### Docker Deployment
```bash
# Build Docker image
docker build -t lca-platform .

# Run container
docker run -p 5173:5173 -p 3001:3001 lca-platform
```

***

## 🌍 **Why It Matters**

With sustainability mandates and circular economy goals accelerating worldwide, our platform fills a critical industry gap: *instant, accessible, data-driven LCA—for everyone.* Whether you’re a lead engineer, a sustainability director, or a student, actionable insights are now just a few clicks away.

***

## 🛠️ **Development & Contributing**

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Adding ML Models
Place your trained models in the `ml_models/` directory:
- `SIH_predict.pkl` - Your trained model
- `predict_scaler.pkl` - Your scaler

***

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

***



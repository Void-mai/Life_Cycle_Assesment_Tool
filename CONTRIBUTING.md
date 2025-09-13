# Contributing to LCA Platform

Thank you for your interest in contributing to the LCA Platform! This document provides guidelines for contributing to this AI-powered Life Cycle Assessment tool.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/Void-mai/Life_Cycle_Assesment_Tool`
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Project Structure
```
src/
├── components/          # React components
├── pages/              # Page components
├── services/           # API and ML model services
├── types/              # TypeScript type definitions
└── styles/             # CSS and styling

server/                 # Backend API server
├── index.cjs           # Express server with ML model simulation
└── README.md           # Server documentation
```

### Running the Application

```bash
# Frontend only
npm run dev

# Backend only
npm run dev:server

# Both frontend and backend
npm run dev:full
```

## Contributing Guidelines

### Code Style
- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Reference issues when applicable

### Pull Requests
1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request with a clear description

## Areas for Contribution

- **ML Model Integration**: Improve the AI model accuracy
- **UI/UX Enhancements**: Better user experience and design
- **Data Visualization**: Enhanced charts and diagrams
- **Performance Optimization**: Faster loading and processing
- **Documentation**: Improve code documentation and user guides

## Questions?

Feel free to open an issue for any questions or suggestions!

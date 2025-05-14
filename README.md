# perplexity_code_review
A full-stack AI-powered code review platform built for the Perplexity Hackathon. It uses the Sonar model from Perplexity's API to analyze source code and provide intelligent feedback for code quality, third-party dependencies, and license checks.


 🚀 Project Structure

- **Frontend:** ReactJS
- **Backend:** Python Flask
- **AI Model:** Perplexity Sonar (default), with support for OpenAI, LLaMA, DeepSeek


🔧 How to Run the Project

📦 Backend
  Navigate to the backend folder:
   ```bash
   cd perplexity_code_review/backend
   pip install ./requirements.txt         # For all the python related dependencies
   python3 ./server.py
  ./install.sh  # Install nginx as reverse proxy


🌐 Frontend
cd frontend/code-review-frontend/
npm install      # First time only
npm run start


✅ Features
Multi-task code analysis (Code Review, BOM, License Check)
Parallel execution with ThreadPoolExecutor
Model selector dropdown (Sonar, OpenAI, etc.)
Responsive and clean ReactJS UI
Highlighted code improvement blocks

Dependencies:-
Python 3
Flask
React 18+
Node.js & NPM
NGINX (optional for production/reverse proxy)

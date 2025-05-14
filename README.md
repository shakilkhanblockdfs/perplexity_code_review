# perplexity_code_review
A full-stack AI-powered code review platform built for the Perplexity Hackathon. It uses the Sonar model from Perplexity's API to analyze source code and provide intelligent feedback for code quality, third-party dependencies, and license checks.

## Important 
Substitute the API key in the file backend_config.py and the frontend reactjs renderer server in frontend_config.py
If you only want to use SOnar API then you dont need OpenAI Key.
Also if you are not using local hosted model like llama2 etc from ollama then dont need a ollama endpoint,
just the perplexity API key is enough.
####

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


Youtube Video Link:-
https://www.youtube.com/watch?v=ZeyRSIMEQo8

githublink:
https://github.com/shakilkhanblockdfs/perplexity_code_review

Why Code review with GenAI like Sonar LLM:-
	Code reviews helps in Code Quality, Catching bugs and meeting coding standard.
	Code reviews are rushed or skipped due to Manual effort.
	Code reviews can be prone to error due to Human effort.
	Different programming language requires different skills for code review.
	GenAI helps in consistent code review.
	Not prone to fatigue like Humans.
	Code reviews are faster.
	Coding standard check can be very effective.
	Reviews pull request and add detailed summarization if configured.
	Ensure that Keys and secret not part of Code check-in and flag it appropriately.
	Provides a diff patch to be applied to fix all the issues.
	Provides test cases to test new changes.
	Add comments or docstring to code.
	It can perform License check and provide feedback as to what license type the code follows.
	Creates an Automatic  BOM(Bill of materials) for all the libraries and code used.

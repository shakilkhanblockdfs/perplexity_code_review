🔍 Submission: AI Code Review Assistant Powered by Perplexity Sonar API
🛠️ Project Description
AI Code Review Assistant is a full-stack web application designed to automate code analysis using the Perplexity Sonar API. The app allows users to paste source code into a simple interface and get immediate, AI-powered feedback on:

🧠 Code Quality (Bug detection, improvements)

📦 Bill of Materials (BOM) for 3rd-party dependencies

📜 License Identification

This project was built specifically for the Perplexity Hackathon and leverages the Sonar API for all inference tasks. Users can choose between different models (e.g., OpenAI, LLaMA, DeepSeek), but Sonar is the default and recommended model due to its concise and fast responses.

🚀 How Perplexity Sonar API Was Used
Sonar is used for multi-threaded, parallel evaluation of different code review tasks. On form submission:

Prompts for Code Review, BOM, and License Check are built.

All three are sent concurrently to the Perplexity Sonar API using Python’s ThreadPoolExecutor.

The results are parsed and returned as structured JSON to the React frontend.

The Sonar API enables high-performance, high-precision completions for domain-specific tasks. In this project, the API consistently responded with actionable suggestions for code refactoring, dependency detection, and license clarification.

💡 Features and Functionality
✅ Built-in prompt engineering for multiple static analysis tasks.

✅ Fully React-based frontend for a clean and intuitive UI.

✅ Model selection dropdown with Sonar as the default.

✅ Robust error handling and task isolation using async futures.

✅ Color-coded sections for better UX (e.g., yellow highlight for "Improved Code").

📁 Project Repo (Private for Judging)
🔒 Private GitHub Repository

✅ Access granted to:

james.liounis@perplexity.ai

testing@devpost.com

📹 Demo Video (2 min)
▶️ Watch on YouTube

Video Includes:

Code submission in the React UI

Live interaction with Sonar API

Highlighted output results per task

Demonstration of model switching and error handling

📜 README & Setup Instructions
Repo includes a complete README.md with:

Setup instructions for the Flask backend and React frontend

Environment variable details (for Sonar API key)

Example prompts and sample responses

Architecture diagram (optional but recommended)

📂 Categories
Category: Best Developer Tool

Bonus: Most Creative/Fun Project

📌 Technical Stack
Frontend: ReactJS, Fetch API

Backend: Flask (Python)

API: Perplexity Sonar API (https://api.perplexity.ai/chat/completions)

Concurrency: Python ThreadPoolExecutor for parallel task dispatch

Deployment: Localhost (but can be containerized)

✅ Submission Checklist
✅ Used required Perplexity Sonar API

✅ Text description of features and API usage

✅ Private GitHub repo shared with judges

✅ Detailed README.md

✅ Less than 3-minute demo video

✅ Clear explanation of improvements during the Hackathon

✅ No use of restricted third-party copyrighted content
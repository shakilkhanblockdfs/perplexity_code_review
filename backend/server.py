from flask import Flask, request, jsonify
from flask_cors import CORS
from backend_config import *
from openai_inference import openai_inference
from ollama_inference import ollama_inference
from sonar_inference import sonar_inference
from concurrent.futures import ThreadPoolExecutor, as_completed

app = Flask(__name__)
CORS(app)

executor = ThreadPoolExecutor(max_workers=3)

@app.route('/api/chat', methods=['POST'])
def chat_handler():
    data = request.get_json()
    code = data.get('code')
    model_name = data.get('model', 'openai').lower()
    tasks = data.get('tasks', {})

    if not code:
        return jsonify({"error": "Code is required"}), 400

    # Choose appropriate inference function
    if model_name == 'llama3':
        model_fn = lambda prompt: ollama_inference(prompt, "llama3")
    elif model_name == 'openai':
        model_fn = lambda prompt: openai_inference(prompt, "gpt-4")
    elif model_name == 'perplexity_sonar':
        model_fn = lambda prompt: sonar_inference(prompt, "sonar")
    else:
        return jsonify({"error": f"Unsupported model '{model_name}'."}), 400

    prompts = {
        "codeReview": "## Code Review\nPlease review the following code and provide improvements, bugs, and a unified diff patch. If a diff cannot be generated then provide the new corrected or refactored code. Provide a patch even if the changes are extensive.",
        "bom": "## Bill of Materials\nList any third-party libraries or dependencies used in the code.",
        "licenseCheck": "## License Check\nIdentify licenses associated with any third-party libraries used."
    }

    # Submit tasks in parallel
    futures = {}
    for key, prompt_text in prompts.items():
        if tasks.get(key):
            full_prompt = f"{prompt_text}\n\nHere is the code:\n\n{code}"
            futures[executor.submit(model_fn, full_prompt)] = key

    # Prepare response
    results = {
        "codeReview": "",
        "bom": "",
        "license": ""
    }

    try:
        for future in as_completed(futures):
            task_type = futures[future]
            response = future.result()

            results_key = task_type if task_type != "licenseCheck" else "license"

            if isinstance(response, dict) and "error" in response:
                results[results_key] = f"Error: {response['error']}"
            else:
                results[results_key] = response.strip()

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"response": results})


if __name__ == '__main__':
    app.run(debug=True)

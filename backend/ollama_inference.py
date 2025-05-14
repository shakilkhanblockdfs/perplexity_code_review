import requests
from backend_config import *

def ollama_inference(prompt_text, model_name):
    print("Calling Llama3 model...")
    payload = {
        "model": model_name,
        "prompt": prompt_text,
        "stream": False
    }
    try:
        response = requests.post(f"{OLLAMA_BASE_URL}/api/generate", json=payload)
        response.raise_for_status()
        response_json = response.json()
        return response_json.get("response")
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
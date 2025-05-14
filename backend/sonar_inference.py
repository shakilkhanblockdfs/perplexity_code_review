
import requests
from backend_config import *

def sonar_inference(prompt_text, model_name="sonar"):
    print("Calling Sonar model...")

    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": model_name,
        "messages": [
            {"role": "system", "content": "Be precise and concise."},
            {"role": "user", "content": prompt_text}
        ]
    }

    try:
        response = requests.post(SONAR_CHAT_COMPLETION_URL, headers=headers, json=payload)
        response.raise_for_status()
        response_json = response.json()
        print(f"Sonar response_json: {response_json}")
        final_response = response_json['choices'][0]['message']['content']
        print(f"The final Sonar response is: {final_response}")
        return final_response
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

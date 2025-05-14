import requests
from backend_config import *

def openai_inference(prompt_text, model_name):
    print("Calling ChatGPT model... the APi_key is ", OPENAI_API_KEY)
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": model_name,
        "messages": [{"role": "user", "content": prompt_text}],
        "temperature": 0.3
    }
    try:
        response = requests.post(OPENAI_CHAT_COMPLETION_URL, headers=headers, json=payload)
        # print(f"shakil...the response is response_type={response} {response}")
        response.raise_for_status()
        response_json = response.json()
        print(f"response_json is  response_json={response_json}")
        final_response = response_json['choices'][0]['message']['content']
        print(f"The final response is {final_response}")
        return final_response
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
import requests

API_URL = "http://localhost:5000/chat"  # This should match your Flask server URL

def send_prompt_to_ollama(prompt):
    try:
        response = requests.post(API_URL, json={"prompt": prompt})
        response.raise_for_status()
        result = response.json()
        return result.get("response", "No response received.")
    except requests.exceptions.RequestException as e:
        return f"Error: {e}"

if __name__ == "__main__":
    # user_prompt = input("Enter your prompt: ")
    user_prompt = '''#include <iostream>
using namespace std;

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};

    // Intent: Print all array elements
    for (int i = 0; i <= 5; i++) {
        cout << numbers[i] << " ";
    }

    return 0;
}
'''
    response = send_prompt_to_ollama(user_prompt)
    print("\nResponse from LLaMA3:\n")
    print(response)


#curl https://sandbox.xola.com/api/users/<my_user_id>/apiKey -u "john.doe@gmail.com:password123"
import requests

url = "https://xola.com/api/users/me"

payload = {
    "name": "Jayantha Salagundi",
    "email": "jksalagundi@icloud.com",
    "password": "Escaped2$23$$",
    "roles": ["ROLE_DEVELOPER"]
}
headers = {"Content-type": "application/json"}

print("Getting an API Key")
response = requests.request("GET", url, json=payload, headers=headers)
print("Response", response)
print(response.text)

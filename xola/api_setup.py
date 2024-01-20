import requests

url = "https://xola.com/api/users"

payload = {
    "name": "Jayantha Salagundi",
    "email": "jksalagundi@icloud.com",
    "password": "Escaped2$23$$",
    "roles": ["ROLE_DEVELOPER"]
}
headers = {"Content-type": "application/json"}

print("Creating an API Endpoint")
response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)

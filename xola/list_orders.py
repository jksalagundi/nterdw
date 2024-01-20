import requests
import json

url = "https://xola.com/api/orders?seller=591a17b5332e75a52a8b458f&items.experience=596952ad6864eabc768b459b&sort=-id&limit=20&skip=0"

headers = {
    "accept": "application/json",
    "X-API-VERSION": "2018-06-26",
    "X-API-KEY": "_gGNcJfcct-f4v355FFOZmXVf4fbr7XmAcxnrzrHBKM"
}

try:
    response = requests.get(url, headers=headers)
    fp = open("./orders.json", "w")
    fp.write(json.dumps(response.json()))
    for record in response.json()['data']:
        print(record['id'])
        print(record)
    fp.close()

except Exception as ex:
    print(f"Error occurred ... {ex.__str__()}")
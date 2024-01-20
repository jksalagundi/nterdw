import requests

url = "https://xola.com/api/experiences?limit=20&skip=0"

headers = {
    "X-API-VERSION": "2018-06-26",
    "X-API-KEY": "arW2SqaWs_CL1u8dXiSi9NSZGtGE_d42DViWZecNfhw",
    # "X-API-KEY": "_gGNcJfcct-f4v355FFOZmXVf4fbr7XmAcxnrzrHBKM",
    # data-seller="591a17b5332e75a52a8b458f"
    # data-experience="596952ad6864eabc768b459b"
    #
}

response = requests.get(url, headers=headers)

print(response.text)
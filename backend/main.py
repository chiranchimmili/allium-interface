import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=["POST"])
def getInputs():
    print(request.get_json())
    return "Configuration Saved"
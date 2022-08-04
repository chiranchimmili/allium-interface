import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=["POST"])
def getInputs():
    print(request.get_json())
    return "Configuration Saved"


@app.route('/start', methods=["POST"])
def startTests():
    print(request.get_json())
    return "Tests Starting"
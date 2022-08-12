import time, json
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=["POST"])
def getInputs():
    print(request.get_json())
    return "Configuration Saved"


@app.route('/start', methods=["POST"])
def startTests():
    print(request.get_json())
    writeToFile(request.get_json())
    return "Tests Started"


def writeToFile(json_test):
    json_object = json.dumps(json_test[1][0], indent=1)
    with open("test.json", "w") as outfile:
        outfile.write(json_object)
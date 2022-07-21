import os
from flask import Flask, render_template, request, json, jsonify
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/save", methods=['POST'])
def save():
    aufgabe = request.get_json()
    with open(os.path.join(os.path.dirname(__file__),"aufgaben.json"), 'r') as f:       
        d = json.load(f)
    d["aufgaben"].append(aufgabe)
    with open(os.path.join(os.path.dirname(__file__),"aufgaben.json"), 'w') as f:
        f.write(json.dumps(d, indent = 2, ensure_ascii=False))
    return "success"

@app.route('/api/return_All', methods=['GET'])
def return_All():
    with open(os.path.join(os.path.dirname(__file__),"aufgaben.json"), 'r') as f:       
        d = json.load(f)
    alle_Aufgaben = d["aufgaben"]
    return jsonify(alle_Aufgaben)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
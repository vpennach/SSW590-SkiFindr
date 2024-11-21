from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS
CORS(app)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello, vinny!"})

if __name__ == '__main__':
    app.run(debug=True, port=8000)


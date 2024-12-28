from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)  # Enable CORS for all requests
socketio = SocketIO(app, cors_allowed_origins="*")

port = 3000

# Define a route handler for the root path
@app.route('/')
def index():
    return "Hello, world!"

@socketio.on('connect')
def handle_connect():
    print("New client connected")

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

# Start the server
if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=port)

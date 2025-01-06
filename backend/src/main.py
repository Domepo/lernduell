from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import datetime
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all requests
socketio = SocketIO(app, cors_allowed_origins="*")

port = 3000

# Define a route handler for the root path
@app.route('/')
def index():
    return "Hello, world!"

# Background task to emit the current time
def send_time():
    while True:
        now = datetime.datetime.now().strftime("%H:%M:%S")
        socketio.emit('time', {'time': now})  # Send time to all clients
        time.sleep(1)  # Wait for 1 second before sending the next update

@socketio.on('connect')
def handle_connect():
    print("New client connected")
    if not hasattr(send_time, 'started'):  # Prevent starting multiple tasks
        send_time.started = True
        socketio.start_background_task(send_time)

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

# Start the server
if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=port)

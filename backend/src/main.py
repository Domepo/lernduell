from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import time
from flashcard import FlashcardDB

app = Flask(__name__)
db = FlashcardDB("backend/database/flashcards.db")

CORS(app)  # Enable CORS
socketio = SocketIO(app, cors_allowed_origins="*")

port = 3000

@app.route('/')
def index():
    return "Hello, world!"


# Hintergrund-Task: Schickt alle Flashcards periodisch an alle verbundenen Clients
def send_flashcards():
    flashcards = db.get_all_flashcards()
    for card in flashcards:
        socketio.emit('card', {'card': card})  # Format: card = (id, front, back, title, creator, set_name, timestamp)
        
# While True wird für die Hintergrund aktualisierung genutzt
def send_flashcards_loop():
    while True:
        send_flashcards()
        time.sleep(30)  # 1 Sekunde warten

@socketio.on('connect')
def handle_connect():
    print("Neuer Client verbunden.")
    # send flashcards ohne Hintergrund Aktualisierung, für einen Page Reload
    send_flashcards()
    if not hasattr(send_flashcards, 'started'):
        send_flashcards.started = True
        socketio.start_background_task(send_flashcards_loop)

@socketio.on('disconnect')
def handle_disconnect():
    print("Client getrennt.")

# NEU: Event zum Aktualisieren einer Flashcard in der Datenbank
@socketio.on('updateCard')
def handle_update_card(data):
    """
    Erwartet ein Dictionary "data", z.B.:
    {
      'id': 1,
      'front': 'Neue Vorderseite',
      'back': 'Neue Rückseite',
      'title': 'Neuer Titel',
      'creator': 'John Doe',
      'set_name': 'Basics',
      'timestamp': '2025-01-01 12:00:00'
    }
    """
    db.update_flashcard(
        card_id=data['id'],
        front=data['front'],
        back=data['back'],
        title=data['title'],
        creator=data['creator'],
        set_name=data['set_name'],
        timestamp=data['timestamp']
    )
    
    # Schicke eine Bestätigung oder die aktualisierten Daten zurück
    emit('cardUpdated', {'status': 'ok', 'updatedCard': data}, broadcast=True)
    send_flashcards()
# Server starten
if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=port)

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
        time.sleep(30)  

@socketio.on('getCards')
def handle_get_cards(data):
    set_name = data.get('set_name')
    if not set_name:
        print("⚠️ Kein Set-Name angegeben!")
        return

    flashcards = db.get_flashcards_by_set(set_name)
    for card in flashcards:
        socketio.emit('card', {'card': card})

@socketio.on('connect')
def handle_connect():
    print("Neuer Client verbunden.")
    

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
      'marked' : 'true'
    }
    """
    db.update_flashcard(
        card_id=data['id'],
        front=data['front'],
        back=data['back'],
        title=data['title'],
        creator=data['creator'],
        set_name=data['set_name'],
        timestamp=data['timestamp'],
        marked = data['marked']
    )
    
    # Schicke eine Bestätigung oder die aktualisierten Daten zurück
    emit('cardUpdated', {'status': 'ok', 'updatedCard': data}, broadcast=True)
    
@socketio.on('insertCard')
def handle_insert_card(data):
    # Erstelle eine neue Flashcard in der DB
    new_id = db.insert_flashcard(
        front=data['front'],
        back=data['back'],
        title=data['title'],
        creator=data['creator'],
        set_name=data['set_name'],
        timestamp=data['timestamp'],
        marked = data['marked']
    )

    # Dann schickst du die neue ID zurück
    # oder gleich die gesamte neue Karte 
    new_card = {
      'id': new_id,
      'front': data['front'],
      'back': data['back'],
      'title': data['title'],
      'creator': data['creator'],
      'set_name': data['set_name'],
      'timestamp': data['timestamp'],
      'marked' : data['marked']
    }
    emit('cardUpdated', {'status': 'ok', 'updatedCard': new_card}, broadcast=True)

@socketio.on('deleteCard')
def handle_delete_card(data):
    # data hat z. B. die Struktur { 'id': 123 }
    card_id = data['id']
    print(f"Lösche Karte mit ID {card_id}")

    db.delete_flashcard(card_id)

    # Danach allen Clients mitteilen, dass die Karte gelöscht wurde
    emit('cardDeleted', {'status': 'ok', 'deletedId': card_id}, broadcast=True)

# Server starten
if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=port)


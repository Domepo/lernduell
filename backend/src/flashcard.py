import sqlite3
import os
from functools import wraps

class FlashcardDB:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connection = None
        self.cursor = None

    def start_connection(self):
        self.connection = sqlite3.connect(self.db_name)
        self.cursor = self.connection.cursor()

    def close_connection(self):
        if self.connection:
            self.connection.commit()
            self.connection.close()
            self.connection = None
            self.cursor = None

    def db_connection(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            self.start_connection()
            try:
                result = func(self, *args, **kwargs)
            finally:
                self.close_connection()
            return result
        return wrapper

    @db_connection
    def create_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS flashcards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            front TEXT NOT NULL,
            back TEXT NOT NULL,
            title TEXT NOT NULL,
            creator TEXT NOT NULL,
            set_name TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
        ''')
        print("Tabelle 'flashcards' erstellt (falls nicht vorhanden).")

    @db_connection
    def insert_flashcard(self, front, back, title, creator, set_name, timestamp):
        self.cursor.execute('''
            INSERT INTO flashcards (front, back, title, creator, set_name, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (front, back, title, creator, set_name, timestamp))
        print("Neue Flashcard eingefügt.")
        return self.cursor.lastrowid  # <-- das brauchst du!

    @db_connection
    def get_all_flashcards(self):
        self.cursor.execute("SELECT * FROM flashcards")
        return self.cursor.fetchall()

    @db_connection
    def delete_flashcard(self, flashcard_id):
        self.cursor.execute("DELETE FROM flashcards WHERE id = ?", (flashcard_id,))
        print(f"Karte mit ID {flashcard_id} gelöscht.")
    def delete_all_flashcards(self):
        os.remove(self.db_name)

    # NEU: Methode zum Aktualisieren einer Flashcard
    @db_connection
    def update_flashcard(self, card_id, front, back, title, creator, set_name, timestamp):
        self.cursor.execute('''
            UPDATE flashcards
            SET front = ?,
                back = ?,
                title = ?,
                creator = ?,
                set_name = ?,
                timestamp = ?
            WHERE id = ?
        ''', (front, back, title, creator, set_name, timestamp, card_id))
        print(f"Flashcard mit ID {card_id} aktualisiert.")
        
    @db_connection
    def get_flashcards_by_set(self, set_name):
        self.cursor.execute("SELECT * FROM flashcards WHERE set_name = ?", (set_name,))
        return self.cursor.fetchall()

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
    def delete_table(self):
        self.cursor.execute('''
        DROP TABLE IF EXISTS flashcards;
        )
        ''')
        print("Tabelle 'user' erstellt (falls nicht vorhanden).")

    @db_connection
    def create_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS user (
            UID TEXT PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL
        )
        ''')
        print("Tabelle 'user' erstellt (falls nicht vorhanden).")

    @db_connection
    def create_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS session (
            SID TEXT PRIMARY KEY AUTOINCREMENT,
            sessionname TEXT NOT NULL
        )
        ''')
        print("Tabelle 'session' erstellt (falls nicht vorhanden).")

    @db_connection
    def create_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS karteikarten (
            KID TEXT PRIMARY KEY AUTOINCREMENT,
            front TEXT NOT NULL,
            bront TEXT NOT NULL,
            title TEXT NOT NULL,
            UID TEXT NOT NULL,
            LID TEXT TEXT NOT NULL,
            FOREIGN KEY (UID) REFERENCES user(UID) ON DELETE CASCADE,
            FOREIGN KEY (LID) REFERENCES lernset(LID) ON DELETE CASCADE
        )
        ''')
        print("Tabelle 'karteikarten' erstellt (falls nicht vorhanden).")

    @db_connection
    def create_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS scoreboard (
            SBID TEXT PRIMARY KEY AUTOINCREMENT,
            SID TEXT NOT NULL,
            UID TEXT NOT NULL,
            punkte INTEGER NOT NULL,
            FOREIGN KEY (SID) REFERENCES session(SID) ON DELETE CASCADE,
            FOREIGN KEY (UID) REFERENCES user(UID) ON DELETE CASCADE
        )
        ''')
        print("Tabelle 'scoreboard' erstellt (falls nicht vorhanden).")

    @db_connection
    def create_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS lernset (
            LID TEXT PRIMARY KEY AUTOINCREMENT,
            SID TEXT TEXT NOT NULL,
            UID TEXT TEXT NOT NULL,
            name TEXT NOT NULL,
            FOREIGN KEY (SID) REFERENCES session(SID) ON DELETE CASCADE,
            FOREIGN KEY (UID) REFERENCES user(UID) ON DELETE CASCADE
        )
        ''')
        print("Tabelle 'scoreboard' erstellt (falls nicht vorhanden).")

    @db_connection
    def insert_flashcard(self, front, back, title, creator, LID):
        self.cursor.execute('''
        INSERT INTO karteikarten (front, back, title, creator, UID, LID)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (front, back, title, creator, LID))
        print("Neue Flashcard eingefügt.")

    @db_connection
    def get_all_flashcards(self):
        self.cursor.execute("SELECT * FROM karteikarten")
        return self.cursor.fetchall()

    @db_connection
    def delete_flashcard(self, KID):
        self.cursor.execute("DELETE FROM karteikarten WHERE id = ?", (KID,))
        print(f"Karte mit ID {KID} gelöscht.")
    def delete_all_flashcards(self):
        os.remove(self.db_name)

    # NEU: Methode zum Aktualisieren einer Flashcard
    @db_connection
    def update_flashcard(self, KID, front, back, title, UID, LID):
        self.cursor.execute('''
            UPDATE flashcards
            SET front = ?,
                back = ?,
                title = ?,
                UID = ?,    
                LID = ?,
            WHERE id = ?
        ''', (front, back, title, UID, LID, KID))
        print(f"Flashcard mit ID {KID} aktualisiert.")

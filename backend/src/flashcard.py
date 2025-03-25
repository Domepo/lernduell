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
    def create_user_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS user (
            UID INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL
        )
        ''')
        print("Tabelle 'user' erstellt (falls nicht vorhanden).")

    @db_connection
    def create_session_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS session (
            SID INTEGER PRIMARY KEY AUTOINCREMENT,
            sessionname TEXT NOT NULL
        )
        ''')
        print("Tabelle 'session' erstellt (falls nicht vorhanden).")

    @db_connection
    def create_flashcards_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS karteikarten (
            KID INTEGER PRIMARY KEY AUTOINCREMENT,
            front TEXT NOT NULL,
            back TEXT NOT NULL,
            title TEXT NOT NULL,
            UID INTEGER NOT NULL,
            LID INTEGER TEXT NOT NULL,
            FOREIGN KEY (UID) REFERENCES user(UID) ON DELETE CASCADE,
            FOREIGN KEY (LID) REFERENCES lernset(LID) ON DELETE CASCADE
        )
        ''')
        print("Tabelle 'karteikarten' erstellt (falls nicht vorhanden).")

    @db_connection
    def create_scoreboard_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS scoreboard (
            SBID INTEGER PRIMARY KEY AUTOINCREMENT,
            SID INTEGER NOT NULL,
            UID INTEGER NOT NULL,
            punkte INTEGER NOT NULL,
            FOREIGN KEY (SID) REFERENCES session(SID) ON DELETE CASCADE,
            FOREIGN KEY (UID) REFERENCES user(UID) ON DELETE CASCADE
        )
        ''')
        print("Tabelle 'scoreboard' erstellt (falls nicht vorhanden).")

    @db_connection
    def create_lernset_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS lernset (
            LID INTEGER PRIMARY KEY AUTOINCREMENT,
            SID INTEGER TEXT NOT NULL,
            UID INTEGER TEXT NOT NULL,
            name TEXT NOT NULL,
            FOREIGN KEY (SID) REFERENCES session(SID) ON DELETE CASCADE,
            FOREIGN KEY (UID) REFERENCES user(UID) ON DELETE CASCADE
        )
        ''')
        print("Tabelle 'scoreboard' erstellt (falls nicht vorhanden).")

    @db_connection
    def insert_flashcard(self, front, back, title, UID, LID):
        self.cursor.execute('''
        INSERT INTO karteikarten (front, back, title, UID, LID)
        VALUES (?, ?, ?, ?, ?)
        ''', (front, back, title, UID, LID))
        return self.cursor.lastrowid  # Gibt die ID der neuen Flashcard zurück

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


if __name__ == "__main__":
    # Stelle sicher, dass der Ordner existiert
    os.makedirs("database", exist_ok=True)

    # DB-Instanz erzeugen
    db = FlashcardDB("database/flashcards.db")

    # Tabellen anlegen
    db.create_user_table()
    db.create_session_table()
    db.create_flashcards_table()
    db.create_scoreboard_table()
    db.create_lernset_table()

    print("Datenbank und Tabellen wurden erfolgreich erstellt.")

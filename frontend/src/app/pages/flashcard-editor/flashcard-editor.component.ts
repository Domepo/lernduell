import { Component } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard-editor.component.html',
  styleUrls: ['./flashcard-editor.component.css']
})
export class FlashcardComponent {
  // Hier kannst du Daten und Logik definieren
  cards = ['Karte 1', 'Karte 2', 'Karte 3'];
}

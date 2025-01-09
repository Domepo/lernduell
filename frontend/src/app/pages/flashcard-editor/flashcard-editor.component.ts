import { Component } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard-editor.component.html',
  styleUrls: ['./flashcard-editor.component.css']
})
export class FlashcardComponent {
  // Hier kannst du Daten und Logik definieren
  cards = ['Karte 1', 'Karte 2', 'Karte 3'];
  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Setze die Höhe zurück
    textarea.style.height = `${textarea.scrollHeight}px`; // Passe die Höhe an den Inhalt an
  }
}

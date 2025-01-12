import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { FormsModule } from '@angular/forms'; // <- WICHTIG
import { CommonModule } from '@angular/common';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  title: string;
  creator: string;
  set_name: string;
  timestamp: string;
}

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard-editor.component.html',
  styleUrls: ['./flashcard-editor.component.css'],
  imports: [
    CommonModule,    
    FormsModule,  
  ],
})
export class FlashcardComponent implements OnInit {
  cards: Flashcard[] = [];
  selectedCard: Flashcard | null = null;
  selectedCardId: any;

  constructor(private socketService: SocketService) {}

  

  ngOnInit() {
    // frage nach den aktuellen Karten, wenn auf die Seite gegangen wird
    this.socketService.emit('getCards', {});

    this.socketService.listen('card').subscribe((data: any) => {
      const newCard: Flashcard = {
        id: data.card[0],
        front: data.card[1],
        back: data.card[2],
        title: data.card[3],
        creator: data.card[4],
        set_name: data.card[5],
        timestamp: data.card[6]
      };
    
      const existingCardIndex = this.cards.findIndex(card => card.id === newCard.id);
      // === ist ohne Typumwandlung
      if (existingCardIndex === -1) {
        // Falls nicht vorhanden, neu ins Array pushen
        this.cards.push(newCard);
      } else {
        // Ansonsten bestehende Karte aktualisieren
        this.cards[existingCardIndex] = newCard;
      }


    });

    this.socketService.listen('cardUpdated').subscribe((res: any) => {
      const updatedCard = res.updatedCard;
    
      // 1) Alle Einträge im Array aktualisieren
      const index = this.cards.findIndex((c) => c.id === updatedCard.id);
      if (index !== -1) {
        this.cards[index] = { ...this.cards[index], ...updatedCard };
      }
    
      // 2) Falls diese Karte gerade ausgewählt ist, aktualisiere "selectedCard"
      if (this.selectedCard && this.selectedCard.id === updatedCard.id) {
        this.selectedCard = { ...this.selectedCard, ...updatedCard };
        // Durch das Neusetzen von "this.selectedCard" wird das Template neu gerendert,
        // also auch "card" in *ngIf="selectedCard as card".
      }
    });
  }
  selectCard(card: Flashcard): void {
    // Das ist jetzt die Karte, die in den Textareas editierbar sein soll
    this.selectedCard = card; 
    this.selectedCardId = card.id;
    console.log(card);
    // Wichtig: ggf. eine Kopie erstellen, falls du nicht sofort das Original überschreiben willst
  }
  updateSelectedCard(card: Flashcard){
    const test = this.cards.findIndex(card => card.id === this.selectedCardId)
    this.selectedCard = this.cards[test];
  }

  updateCard(card: Flashcard) {
    this.socketService.emit('updateCard', {
      id: card.id,
      front: card.front,
      back: card.back,
      title: card.title,
      creator: card.creator,
      set_name: card.set_name,
      timestamp: card.timestamp
    });
  }

}

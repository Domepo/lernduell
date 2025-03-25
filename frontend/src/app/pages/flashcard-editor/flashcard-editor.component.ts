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
      const updatedCard = res.updatedCard as Flashcard;
      const idx = this.cards.findIndex((c) => c.id === updatedCard.id);
      if (idx !== -1) {
        this.cards[idx] = { ...this.cards[idx], ...updatedCard };
      } else {
        this.cards.push(updatedCard);
      }
      // falls ausgewählte Karte aktualisiert wird
      if (this.selectedCard && this.selectedCard.id === updatedCard.id) {
        this.selectedCard = { ...this.selectedCard, ...updatedCard };
      }
    });

    this.socketService.listen('cardDeleted').subscribe((res: any) => {
      const deletedId = res.deletedId as number;
      // Lokal aus dem Array entfernen
      this.cards = this.cards.filter((c) => c.id !== deletedId);

      // Falls die gelöschte Karte gerade ausgewählt war
      if (this.selectedCard && this.selectedCard.id === deletedId) {
        this.selectedCard = null;
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
  createNewCard(): void {
    this.selectedCard = {
      id: -1,
      title: '',
      front: '',
      back: '',
      creator: '',
      set_name: '',
      timestamp: ''
    };
  }
  saveCard(card: Flashcard): void {
    if (card.id === -1) {
      // Hier fügst du eine völlig neue Karte hinzu
      // Du könntest ein eigenes Socket-Event 'insertCard' verwenden
      // oder 'updateCard' so programmieren, dass es automatisch ein Insert macht, wenn id=-1
      this.socketService.emit('insertCard', {
        front: card.front,
        back: card.back,
        title: card.title,
        UID: 1,     // oder dynamisch vom eingeloggten User
        LID: 1      // Lernset-ID, ggf. später dynamisch
      });
    } else {
      // Vorhandene Karte aktualisieren
      this.socketService.emit('updateCard', card);
    }
  }
  deleteCard(card: Flashcard): void {
    // Schicke ein deleteCard-Event an den Server
    this.socketService.emit('deleteCard', { id: card.id });
  }
}

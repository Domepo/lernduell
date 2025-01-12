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

  constructor(private socketService: SocketService) {}

  ngOnInit() {
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
      console.log('Update-Response:', res);
    });
  }
  updateArray(){

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
  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}

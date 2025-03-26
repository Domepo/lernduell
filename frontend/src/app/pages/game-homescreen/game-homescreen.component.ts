import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-homescreen',
  standalone: true,
  imports: [CommonModule, ScoreboardComponent],
  templateUrl: './game-homescreen.component.html',
  styleUrls: ['./game-homescreen.component.css']
})
export class GameHomescreenComponent implements OnInit {
  flashcards: any[] = [];
  currentCardIndex = 0;
  showFront = true;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.getFlashcards().subscribe((data: any) => {
      const card = data.card;
      if (card && !this.flashcards.find((c) => c[0] === card[0])) {
        this.flashcards.push(card);
        this.totalCards = this.flashcards.length;
      }
    });
  }
  

  get currentCard() {
    return this.flashcards[this.currentCardIndex];
  }

  flipCard() {
    this.showFront = !this.showFront;
  }

  nextCard() {
    this.currentCardIndex++;
    this.showFront = true;

    if (this.currentCardIndex >= this.flashcards.length) {
      this.currentCardIndex = 0; // oder Spiel beenden?
    }
  }
  totalCards = 0;

get remainingCards(): number {
  return this.totalCards - this.currentCardIndex;
}

}

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
    if (this.currentCardIndex >= this.flashcards.length - 1) {
      if (this.currentCardIndex >= this.flashcards.length - 1) {
        this.currentCardIndex++;  // ← ZÄHLEN!
        this.isFinished = true;
        return;
      }
      this.currentCardIndex++;
      this.showFront = true;
      
    }
  
    this.currentCardIndex++;
    this.showFront = true;
  }
  isFinished = false;
  totalCards = 0;

  restartSet() {
    this.currentCardIndex = 0;
    this.showFront = true;
    this.isFinished = false;
  }
  

get remainingCards(): number {
  return this.totalCards - this.currentCardIndex;
}
get progressPercent(): number {
  if (this.totalCards === 0) return 0;
  if (this.isFinished) return 100;
  return Math.floor((this.currentCardIndex / this.totalCards) * 100);
}

get progressClass(): string {
  if (this.isFinished) return 'bg-success';
  const percent = this.progressPercent;
  if (percent >= 80) return 'bg-success';
  if (percent >= 50) return 'bg-warning';
  return 'bg-danger';
}

get progressTooltip(): string {
  return `${this.currentCardIndex} von ${this.totalCards} Karteikarten gelernt`;
}
}

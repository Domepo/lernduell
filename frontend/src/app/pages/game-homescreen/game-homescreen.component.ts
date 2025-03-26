import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  totalCards = 0;

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
      this.isFinished = true;
      Swal.fire({
        showClass: {
          popup: 'swal-show'
        },
        hideClass: {
          popup: 'swal-hide'
        },
                
        title: 'Super!',
        text: 'Du hast alle Karteikarten geschafft!',
        icon: 'success',
        // Hintergrundfarbe des Pop-ups
        background: '#2e4a7f',
        // Textfarbe im Pop-up
        color: '#FFFFFF',
        // Farbe des Icons (z. B. für den "success"-Haken)
        iconColor: '#FCBF49',
        // Farbe des Bestätigungs-Buttons
        confirmButtonColor: '#FCBF49',
        confirmButtonText: '<span style="color: black; font-weight: bold;">Cool</span>',
        customClass: {
          popup: 'swal-custom-popup'
        }
      }).then(() => {
        this.restartSet();
        this.currentCardIndex = 0;
      });
    }
    const style = document.createElement('style');
style.innerHTML = `
  .swal-show {
    animation: swalFadeIn 0.4s ease forwards;
  }

  .swal-hide {
    animation: swalFadeOut 0.3s ease forwards;
  }

  @keyframes swalFadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
  }

  @keyframes swalFadeOut {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(0.8); }
  }
  `;
document.head.appendChild(style);

    }
    get remainingCards(): number {
      return this.totalCards - this.currentCardIndex;

    
  }
    
  isFinished = false;

  restartSet() {
    this.currentCardIndex = 0;
    this.showFront = true;
    this.isFinished = false;
  }
  

get progressPercent(): number {
  if (this.totalCards === 0) return 0;
  if (this.isFinished) return 100;
  return Math.floor((this.currentCardIndex / this.totalCards) * 100);
}

get progressClass(): string {
  if (this.isFinished) return 'bg-success';
  return 'bg-warning';
}

get progressTooltip(): string {
  return `${this.currentCardIndex} von ${this.totalCards} Karteikarten gelernt`;
}
}

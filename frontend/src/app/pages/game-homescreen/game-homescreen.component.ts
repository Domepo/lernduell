import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-homescreen',
  standalone: true,
  imports: [CommonModule, ScoreboardComponent, RouterModule],
  templateUrl: './game-homescreen.component.html',
  styleUrls: ['./game-homescreen.component.css'],
})
export class GameHomescreenComponent implements OnInit {
  flashcards: any[] = [];
  currentCardIndex = 0;
  showFront = true;
  totalCards = 0;

  currentSet: string = '';

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  goToGame(setName: string) {
    this.router.navigate(['/game', setName]);
  }  
  

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['set_name']) {
        this.currentSet = params['set_name'];
  
        this.flashcards = [];
        this.totalCards = 0;
        this.currentCardIndex = 0;
        this.isFinished = false;
  
        this.socketService.emit('getCards', { set_name: this.currentSet });
  
        this.socketService.listen('card').subscribe((data: any) => {
          const card = data.card;
  
          if (card && card[5] === this.currentSet) {
            const exists = this.flashcards.some(c => c[0] === card[0]);
            if (!exists) {
              this.flashcards.push(card);
              this.totalCards = this.flashcards.length;
            }
          }
        });
      } else {
        // Default-Verhalten bei /game ohne Parameter
        console.log("Kein Set ausgewählt.");
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
        text: 'Du hast alle Karteikarten aus diesem Set geschafft!',
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

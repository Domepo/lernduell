import { Component } from '@angular/core';
import { ScoreboardComponent } from "../game-homescreen/scoreboard/scoreboard.component"
import { Router } from '@angular/router';

@Component({
  selector: 'app-homescreen',
  imports: [ScoreboardComponent],
  templateUrl: './homescreen.component.html',
  styleUrl: './homescreen.component.css'
})
export class HomescreenComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]); 
    //this.router.navigate([`/flashcard/${setId}`]); // Ersetze '/set/' durch deinen gewünschten Pfad
  }
}

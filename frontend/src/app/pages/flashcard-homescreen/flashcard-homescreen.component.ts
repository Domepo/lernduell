import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcard-homescreen',
  templateUrl: './flashcard-homescreen.component.html',
  styleUrl: './flashcard-homescreen.component.css'
})
export class FlashcardHomescreenComponent {
  constructor(private router: Router) {}

  navigateToSet(setName: string) {
    this.router.navigate([`/editor/${setName}`]);
  }
  
}

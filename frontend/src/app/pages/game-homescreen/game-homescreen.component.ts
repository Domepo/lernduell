import { Component } from '@angular/core';
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";

@Component({
  selector: 'app-game-homescreen',
  imports: [ScoreboardComponent],
  templateUrl: './game-homescreen.component.html',
  styleUrl: './game-homescreen.component.css'
})
export class GameHomescreenComponent {

}

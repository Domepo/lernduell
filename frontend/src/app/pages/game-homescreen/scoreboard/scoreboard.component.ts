import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scoreboard',
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  players = [
    { name: 'Dominik Teichröb' },
    { name: 'Sujan Sirimorhan' },
    { name: 'Raul Kirsch' },
    { name: 'Juliane Osterfrau' },
    { name: 'Hanna Bechthold' },
    { name: 'Bernd Zehner' },
    { name: 'Kiara Hesse' },
    { name: 'Uwe Schüler' }
  ];

  addPlayer(playerName: string) {
    if (playerName) {
      this.players.push({ name: playerName });
    }
  }

  removePlayer(index: number) {
    this.players.splice(index, 1);
  }
}
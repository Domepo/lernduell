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
    { name: 'Dominik' },
    { name: 'Sui' },
    { name: 'Raul' },
    { name: 'Jens' },
    { name: 'Rainer Rasche' },
    { name: 'LÖKJASND' },
    { name: 'DOCKER' },
    { name: 'NICKMERCS' }
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
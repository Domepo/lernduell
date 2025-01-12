// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Korrektur: styleUrls im Plural
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],

})
export class AppComponent implements OnInit {

  title= "test";
  flashcard = ''; // Property für die Uhrzeit


  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.listen('card').subscribe((data: any) => {
      this.flashcard = data.card;
      console.log(this.flashcard);
    });
  }
}

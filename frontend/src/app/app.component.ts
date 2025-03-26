// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginWindowComponent } from './pages/login-window/login-window.component';
import { AuthService } from './services/auth.services'; // <-- Pfad ggf. anpassen!


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Korrektur: styleUrls im Plural
  imports: [CommonModule, RouterOutlet, RouterLink,],

})
export class AppComponent implements OnInit {
  loggedInName: string = '';
  loggedInSession: string = '';
  title= "test";
  flashcard = ''; // Property für die Uhrzeit


  constructor(
    private socketService: SocketService,
    public auth: AuthService // <-- Das ist wichtig!
  ) {}

  ngOnInit() {
    this.socketService.listen('card').subscribe((data: any) => {
      this.flashcard = data.card;
      console.log(this.flashcard);
    });
  }
  handleLogin(data: { name: string; session: string }) {
    this.loggedInName = data.name;
    this.loggedInSession = data.session;
  }
}

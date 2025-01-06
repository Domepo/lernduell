// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Korrektur: styleUrls im Plural
})
export class AppComponent implements OnInit {
  currentTime: string = ''; // Property für die Uhrzeit

  constructor(private webSocketService: SocketService) {}

  ngOnInit() {
    this.webSocketService.listen('time').subscribe((data: any) => {
      this.currentTime = data;
      console.log(this.currentTime);
    });
  }
}

// src/app/app.component.ts
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from './socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class AppComponent implements OnDestroy {

  private messageSubscription: Subscription;
  messages: string[] = [];
  newMessage: string = '';
  constructor(private socketService: SocketService) {
    this.messageSubscription = this.socketService
      .on('message')
      .subscribe((data) => {
        console.log(data);
        this.messages.push(data.text);
      });
  }

  sendMessage() {
    this.socketService.emit('message', { text: this.newMessage });
    this.newMessage = '';
    
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
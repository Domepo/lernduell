// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("/", {
      path: "/socket.io", 
    });
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, data => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any = null): void {
    this.socket.emit(eventName, data);
  }

  // NEU: Hilfsmethode zum Abholen der Flashcards
  getFlashcards(): Observable<any> {
    this.emit('getCards'); // Triggert das Backend
    return this.listen('card'); // Hört auf Karten
  }
}

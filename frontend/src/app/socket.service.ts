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
    this.socket = io('http://localhost:3000/');
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, data => {
        subscriber.next(data)
      })
    })
  }
}
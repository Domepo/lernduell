import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // global verfügbar
})
export class AuthService {
  private _name: string = '';
  private _session: string = '';

  get name(): string {
    return this._name;
  }

  get session(): string {
    return this._session;
  }

  setUser(name: string, session: string): void {
    this._name = name;
    this._session = session;
  }

  isLoggedIn(): boolean {
    return !!this._name && !!this._session;
  }
}

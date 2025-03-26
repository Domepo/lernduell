import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.services';

@Component({
  standalone: true,
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css'],
  imports: [FormsModule]
})
export class LoginWindowComponent {
  username: string = '';
  sessionid: string = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    if (this.username.trim() && this.sessionid.trim()) {
      this.authService.setUser(this.username, this.sessionid);
    }
  }
}

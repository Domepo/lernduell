import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import Swal from 'sweetalert2';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';





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

  @Output() loggedIn = new EventEmitter<{ name: string; session: string }>();

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (this.username.trim() && this.sessionid.trim()) {
      // Popup anzeigen
      Swal.fire({
        title: 'Sie sind angemeldet!',
        html: `<b>Angemeldet als:</b> ${this.username}<br><b>in der Session:</b> ${this.sessionid}`,
        icon: 'info',
        background: '#2e4a7f',
        color: '#ffffff',
        iconColor: '#FCBF49',
        confirmButtonColor: '#FCBF49',
        confirmButtonText: '<span style="color: black; font-weight: bold;">Weiter</span>',
        customClass: {
          popup: 'swal-custom-popup'
        },
        showClass: {
          popup: 'swal-show'
        },
        hideClass: {
          popup: 'swal-hide'
        }
      }).then(() => {
        // ✅ Login-Event feuern
        this.loggedIn.emit({
          name: this.username,
          session: this.sessionid
        });
      
        // ✅ Optional speichern im AuthService
        this.authService.setUser(this.username, this.sessionid);
      
        // ✅ Navigation zur Startseite
        this.router.navigate(['/homepage']);
      });
  
      // Animation einfügen (kann auch vorher geladen werden)
      const style = document.createElement('style');
      style.innerHTML = `
        .swal-show {
          animation: swalFadeIn 0.5s ease forwards;
        }
        .swal-hide {
          animation: swalFadeOut 0.4s ease forwards;
        }
        @keyframes swalFadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes swalFadeOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.8); }
        }
      `;
      document.head.appendChild(style);
    }
  }
}  
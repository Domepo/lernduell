import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit {
  configData: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getConfig('http://127.0.0.1:8000/').subscribe(data => {
      this.configData = data;
      console.log(this.configData);
      return this.configData;
    });
  }
}


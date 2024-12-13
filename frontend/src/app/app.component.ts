import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { GameHomescreenComponent } from './pages/game-homescreen/game-homescreen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgbAccordionModule,GameHomescreenComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}

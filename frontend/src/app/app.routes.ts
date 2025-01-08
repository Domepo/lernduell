import { Routes } from '@angular/router';
import { GameHomescreenComponent } from './pages/game-homescreen/game-homescreen.component';
import { FlashcardHomescreenComponent } from './pages/flashcard-homescreen/flashcard-homescreen.component';
import { HomescreenComponent } from './pages/homescreen/homescreen.component';


export const routes: Routes = [
    { path: '', component: HomescreenComponent,pathMatch: 'full' }, // Root-Seite ist AppComponent
    { path: 'homepage', component: HomescreenComponent }, // Root-Seite ist AppComponent
    { path: 'game-homescreen', component: GameHomescreenComponent },
    { path: 'flashcard-homescreen', component: FlashcardHomescreenComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }, 
];

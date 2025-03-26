import { Routes } from '@angular/router';
import { GameHomescreenComponent } from './pages/game-homescreen/game-homescreen.component';
import { FlashcardHomescreenComponent } from './pages/flashcard-homescreen/flashcard-homescreen.component';
import { HomescreenComponent } from './pages/homescreen/homescreen.component';
import { FlashcardComponent } from './pages/flashcard-editor/flashcard-editor.component';
import { LoginWindowComponent } from './pages/login-window/login-window.component';  // Importiere die Login-Komponente

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },  
    { path: 'login', component: LoginWindowComponent },
    { path: 'homepage', component: HomescreenComponent },
    { path: 'game/:set_name', component: GameHomescreenComponent },
    { path: 'game', component: GameHomescreenComponent },
    { path: 'flashcard-homescreen', component: FlashcardHomescreenComponent },
    { path: 'flashcard', component: FlashcardComponent },
    { path: 'editor/:set_name', component: FlashcardComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
  ];
  

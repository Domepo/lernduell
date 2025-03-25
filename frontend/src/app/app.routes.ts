import { Routes } from '@angular/router';
import { GameHomescreenComponent } from './pages/game-homescreen/game-homescreen.component';
import { FlashcardHomescreenComponent } from './pages/flashcard-homescreen/flashcard-homescreen.component';
import { HomescreenComponent } from './pages/homescreen/homescreen.component';
import { FlashcardComponent } from './pages/flashcard-editor/flashcard-editor.component';
import { LoginWindowComponent } from './pages/login-window/login-window.component';  // Importiere die Login-Komponente

export const routes: Routes = [
    { path: '', component: LoginWindowComponent, pathMatch: 'full' }, // Root-Seite ist HomescreenComponent
    { path: 'homepage', component: HomescreenComponent }, // Root-Seite ist HomescreenComponent
    { path: 'game-homescreen', component: GameHomescreenComponent },
    { path: 'flashcard-homescreen', component: FlashcardHomescreenComponent },
    { path: 'flashcard', component: FlashcardComponent },
    { path: 'login', component: LoginWindowComponent },  // Neue Route für das Login
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback für ungültige Routen
];

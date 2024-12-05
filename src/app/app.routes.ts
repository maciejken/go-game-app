import { Routes } from '@angular/router';
import { GoBoardComponent } from './go-board/go-board.component';

export const routes: Routes = [
  { path: '', redirectTo: '/go-board', pathMatch: 'full' },
  { path: 'go-board', component: GoBoardComponent },
];

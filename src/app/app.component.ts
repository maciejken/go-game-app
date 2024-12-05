import { Component } from '@angular/core';
import { GoBoardComponent } from './go-board/go-board.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule],
})
export class AppComponent {
  title = 'go-game-app';
}

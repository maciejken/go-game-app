import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Board, BoardSize } from '../models/go-board.types';
import { GoGameService } from '../go-game.service';

function isStarPoint(index: number, size: BoardSize): boolean {
  let starSet: Set<number>;
  if (size === 9) {
    starSet = new Set([4]);
  } else {
    starSet = new Set([3, 9, 15]);
  }

  const x = index % size;
  const y = Math.floor(index / size);
  return starSet.has(x) && starSet.has(y);
}

@Component({
  selector: 'app-go-board',
  templateUrl: './go-board.component.html',
  styleUrl: './go-board.component.scss',
  imports: [CommonModule],
})
export class GoBoardComponent {
  boardSize$: Observable<BoardSize> | undefined;
  board$: Observable<Board> | undefined;
  gridLines: null[] | undefined;
  starPoints: number[] | undefined;

  private subscriptions: Subscription = new Subscription();

  constructor(private goGameService: GoGameService) {}

  ngOnInit(): void {
    this.boardSize$ = this.goGameService.boardSize$;
    this.board$ = this.goGameService.board$;

    this.subscriptions.add(
      this.boardSize$.subscribe((size: BoardSize) => {
        this.gridLines = Array(Math.pow(size - 1, 2)).fill(null);
        this.starPoints = Array.from(
          { length: Math.pow(size, 2) },
          (_, i) => i
        ).filter((index) => isStarPoint(index, size));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  placeStone(index: number): void {
    this.goGameService.placeStone(index);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player, Board, BoardSize } from './models/go-board.types';

import go, { BLACK, WHITE, addMove, Coordinate, Move } from 'godash';
import { type Coordinate as CoordinateType } from 'godash/types/board';

function toXO(row: Array<string | null>): string {
  return row
    .map(
      (color: string | null) =>
        (color && (color === 'black' ? 'X' : 'O')) || '.'
    )
    .join(' ');
}

function identity<T>(x: T): T {
  return x;
}

@Injectable({
  providedIn: 'root',
})
export class GoGameService {
  private boardSizeSubject: BehaviorSubject<BoardSize> =
    new BehaviorSubject<BoardSize>(19);

  private godashBoardSubject: BehaviorSubject<any> = new BehaviorSubject(
    new go.Board(19)
  );

  private boardSubject: BehaviorSubject<Board> = new BehaviorSubject<Board>(
    this.godashBoardSubject.getValue().toMap().flatMap(identity)
  );

  private currentPlayerSubject: BehaviorSubject<Player> =
    new BehaviorSubject<Player>('black');

  private blackPrisonersSubject: BehaviorSubject<number> = new BehaviorSubject(
    0
  );

  private whitePrisonersSubject: BehaviorSubject<number> = new BehaviorSubject(
    0
  );

  addPrisoners(count: number): void {
    const prisonersSubject: BehaviorSubject<number> =
      this.currentPlayerSubject.getValue() === BLACK
        ? this.blackPrisonersSubject
        : this.whitePrisonersSubject;
    const currentValue = prisonersSubject.getValue();
    prisonersSubject.next(currentValue + count);
  }

  get boardSize$(): Observable<BoardSize> {
    return this.boardSizeSubject.asObservable();
  }

  get board$(): Observable<Board> {
    return this.boardSubject.asObservable();
  }

  get currentPlayer$(): Observable<Player> {
    return this.currentPlayerSubject.asObservable();
  }

  placeStone(index: number): void {
    const boardSize = this.boardSizeSubject.getValue();
    const currentPlayer = this.currentPlayerSubject.getValue();
    const coordinate = new Coordinate(
      index % boardSize,
      Math.floor(index / boardSize)
    );
    const previousGoBoard = this.godashBoardSubject.getValue();
    const currentGoBoard = addMove(
      previousGoBoard,
      new Move(coordinate, currentPlayer)
    );
    this.godashBoardSubject.next(currentGoBoard);
    this.boardSubject.next(
      this.godashBoardSubject.getValue().toMap().flatMap(identity)
    );
    console.log(
      `${currentPlayer?.toUpperCase()} move at ${coordinate}\n\n${currentGoBoard
        .toMap()
        .map(toXO)
        .join('\n')}`
    );
    const diff: Immutable.Set<Immutable.List<CoordinateType>> =
      (previousGoBoard && go.difference(previousGoBoard, currentGoBoard)) || 0;

    this.addPrisoners(diff.size);
    console.log(
      `Prisoners: ${this.blackPrisonersSubject.getValue()} for black, ${this.whitePrisonersSubject.getValue()} for white.`
    );
    this.currentPlayerSubject.next(currentPlayer === BLACK ? WHITE : BLACK);
  }
}

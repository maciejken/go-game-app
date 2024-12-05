import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Point } from '../models/go-board.types';

function isStarPoint(x: number, y: number): boolean {
  const starSet = new Set([3, 9, 15]);
  return starSet.has(x) && starSet.has(y);
}

@Component({
  selector: 'app-go-board',
  templateUrl: './go-board.component.html',
  styleUrl: './go-board.component.scss',
  imports: [CommonModule],
})
export class GoBoardComponent {
  boardSize: number = 19;
  cells: Point[] = [];
  gridLines: null[];
  board: string[][];
  currentPlayer: string;

  constructor() {
    this.cells = Array(Math.pow(this.boardSize, 2))
      .fill('')
      .map((_, i) => {
        const x = i % this.boardSize;
        const y = Math.floor(i / this.boardSize);
        const value = `empty${isStarPoint(x, y) ? ' star' : ''}`;
        return {
          x,
          y,
          value,
        };
      });

    this.gridLines = Array(Math.pow(this.boardSize - 1, 2)).fill('');
    this.board = Array(this.boardSize)
      .fill(null)
      .map((_, i) =>
        this.cells
          .filter((cell) => cell.y === i)
          .map((cell) => cell.value || '')
      );
    this.currentPlayer = 'black';
  }

  ngOnInit(): void {}

  placeStone(index: number): void {
    const isValid = this.cells[index]?.value.includes('empty');
    if (isValid) {
      this.cells[index].value = this.cells[index].value.replace(
        'empty',
        this.currentPlayer
      );
      this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
    }
  }
}

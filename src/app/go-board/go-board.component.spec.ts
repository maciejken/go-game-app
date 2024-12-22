import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoBoardComponent } from './go-board.component';
import { CommonModule } from '@angular/common';

describe('GoBoardComponent', () => {
  let component: GoBoardComponent;
  let fixture: ComponentFixture<GoBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, GoBoardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should place a black stone on the first click', () => {
    const cellIndex = 0;
    const cellElement =
      fixture.nativeElement.querySelectorAll('.grid-item')[cellIndex];
    cellElement.click();
    fixture.detectChanges();

    expect(component.board[cellIndex]).toBe('black');
  });

  it('should place a white stone on the second click', () => {
    const firstCellIndex = 0;
    const secondCellIndex = 1;

    const board = fixture.nativeElement.querySelectorAll('.board-point');
    const firstCellElement = board[firstCellIndex];
    const secondCellElement = board[secondCellIndex];

    firstCellElement.click();
    fixture.detectChanges();

    secondCellElement.click();
    fixture.detectChanges();

    expect(component.board[firstCellIndex]).toBe('black');
    expect(component.board[secondCellIndex]).toBe('white');
  });

  it('should not place a stone on an occupied cell', () => {
    const cellIndex = 0;
    const cellElement =
      fixture.nativeElement.querySelectorAll('.grid-item')[cellIndex];

    cellElement.click();
    fixture.detectChanges();
    cellElement.click();
    fixture.detectChanges();

    expect(component.board[cellIndex]).toBe('black');
  });
});

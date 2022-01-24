import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPieceComponent } from './board-piece.component';

describe('BoardPieceComponent', () => {
  let component: BoardPieceComponent;
  let fixture: ComponentFixture<BoardPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPieceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

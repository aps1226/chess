import { Component, OnInit, Input, OnChanges, SimpleChanges,ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { getPieces, getBoardSquares } from '../state/state.selector';
import { AppState } from '../state/app.state';
import * as PiecesActions from '../state/state.actions'
import {IBoardSquare, IPiece} from '../state/model';

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.css']
})
export class BoardSquareComponent implements OnInit,OnChanges,AfterViewInit {

  @Input('column') column: string = '';
  @Input('row') row: string = '';
  @Input('color') color: string = '';

  piece$: Observable<IPiece[]>;
  boardSquare$: Observable<IBoardSquare[]>;

  piece!:IPiece | null;

  constructor(
    private store: Store<AppState>,
    private ref: ElementRef,
    ) {
      this.piece$ = this.store.select(getPieces);
      this.boardSquare$ = this.store.select(getBoardSquares);
    }

  ngOnInit(): void {
    if(this.piece$) this.renderPiece();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.piece$) this.renderPiece();
  }

  ngAfterViewInit(): void {
    this.updatePosition();
  }

  updatePosition(){
    const {
      top,
      right,
      bottom,
      left,
      height,
      x,
      y,
    } = this.ref.nativeElement.getBoundingClientRect()
    const newBoardSquare:IBoardSquare = {
      square: `${this.column + this.row}`,
      top,
      right,
      bottom,
      left,
      height,
      x,
      y,
    }
    // Update location of respective board square.
    this.store.dispatch(PiecesActions.modifyBoardSquare({boardSquare:newBoardSquare}))

  }

  renderPiece(){
    const index:string = this.column + this.row;
    this.piece$.subscribe((pieces) => {
      this.piece = null;
      pieces.map((piece) => {
        if(piece.location === index){
          this.piece = piece;
        }
      })
    })
  }

}

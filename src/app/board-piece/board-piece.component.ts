import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import {CdkDragDrop, CdkDragMove, CdkDragStart, DragRef, Point, CdkDropListGroup, CdkDragEnter} from '@angular/cdk/drag-drop';

import { PawnService } from '../pawn.service';
import { getPieces, getTurns, getBoardSquares } from '../state/state.selector';
import { AppState } from '../state/app.state';
import * as PiecesActions from '../state/state.actions';
import { pieces } from '../state/pieces';
import { IBoardSquare, IPiece } from '../state/model';

@Component({
  selector: 'app-board-piece',
  templateUrl: './board-piece.component.html',
  styleUrls: ['./board-piece.component.css']
})
export class BoardPieceComponent implements OnInit {

  @Input('piece') piece!:IPiece;

  piece$: Observable<IPiece[]>;
  pieces: IPiece[] = [];
  boardSquare$: Observable<IBoardSquare[]>;
  boardSquares: IBoardSquare[] = [];

  draggable!:boolean;

  constructor(
    private store: Store<AppState>,
    private pawnService: PawnService,
    ) {
      this.piece$ = this.store.select(getPieces);
      this.piece$.subscribe((piece$) =>this.pieces = [...piece$]);
      this.boardSquare$ = this.store.select(getBoardSquares);
      this.boardSquare$.subscribe((boardSquare$) =>this.boardSquares = [...boardSquare$]);
    }

  ngOnInit(): void {
  }

  renderPosition = (point:Point, dragRef:DragRef) => {
    let resPoint:Point;
    resPoint = this.pawnService.move(point, this.piece, this.pieces, this.boardSquares);

    return resPoint;
  }

  handleDragStart(event: CdkDragStart<string>){
    // this.pawnService.move();
  }

  handleDragMove(event: CdkDragMove<IPiece>){
  }

  handleDrop(event: CdkDragDrop<string>){
    // Reposition dropped piece.
    const newPiece: IPiece = {
      ...this.piece,
      ...{location:event.container.data}
    };
    this.store.dispatch(PiecesActions.modifyPiece({piece:newPiece}))
    // Increment turns.
    this.store.dispatch(PiecesActions.incrementTurn());
  }


}

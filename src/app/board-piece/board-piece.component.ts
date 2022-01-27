import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import {CdkDragDrop, CdkDragMove, CdkDragStart, DragRef, Point, CdkDropListGroup, CdkDragEnter} from '@angular/cdk/drag-drop';

import { PawnService } from '../pawn.service';
import { RookService } from '../rook.service';
import { KnightService } from '../knight.service';
import { BishopService } from '../bishop.service';
import { QueenService } from '../queen.service';
import { KingService } from '../king.service';
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
    private rookService: RookService,
    private knightService: KnightService,
    private bishopService: BishopService,
    private queenService: QueenService,
    private kingService: KingService,
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
    const { type } = this.piece;
    switch(type){
      case 'pawn':
        resPoint = this.pawnService.move(point, this.piece, this.pieces, this.boardSquares);
        break;
      case 'rook':
        resPoint = this.rookService.move(point, this.piece, this.pieces, this.boardSquares);
        break;
      case 'knight':
        resPoint = this.knightService.move(point, this.piece, this.pieces, this.boardSquares);
        break;
      case 'bishop':
        resPoint = this.bishopService.move(point, this.piece, this.pieces, this.boardSquares);
        break;
      case 'queen':
        resPoint = this.queenService.move(point, this.piece, this.pieces, this.boardSquares);
        break;
      case 'king':
        resPoint = this.kingService.move(point, this.piece, this.pieces, this.boardSquares);
        break;
      default:
        resPoint = point;
    }

    return resPoint;
  }

  handleDragStart(event: CdkDragStart<string>){
    // this.pawnService.move();
  }

  handleDragMove(event: CdkDragMove<IPiece>){
  }

  handleDrop(event: CdkDragDrop<string>){
    const newLocation: string = event.container.data;
    // Base case if piece is not moved.
    if(this.piece.location === newLocation) return;
    // Reposition dropped piece.
    const newPiece: IPiece = {
      ...this.piece,
      ...{
        location: newLocation,
        moved: true
      }
    };
    this.store.dispatch(PiecesActions.modifyPiece({piece:newPiece}));
    // Determine if a piece has been captured.
    const capturedPiece = this.pieces.filter(({location,name}) =>{
      return (
        location === newLocation &&
        name !== this.piece.name
      )
    })[0];
    // If a piece has been captured, remove from state.
    if(capturedPiece){
      const { name } = capturedPiece;
      this.store.dispatch(PiecesActions.removePiece({pieceName:name}));
    }
    // Determine if opponent's king is now in check.
    //const check = this.kingService.inCheck(this.pieces, this.boardSquares);
    // Increment turns.
    this.store.dispatch(PiecesActions.incrementTurn());
  }

}

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
import { getPieces, getTurns, getBoardSquares, getCheck, getSelection } from '../state/state.selector';
import { AppState } from '../state/app.state';
import * as PiecesActions from '../state/state.actions';
import { pieces } from '../state/pieces';
import { IBoardSquare, IPiece, Selection } from '../state/model';
import { PieceService } from '../piece.service';
import { CheckService } from '../check.service';

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

  turn$: Observable<number>;
  turns: number = 0;

  check$: Observable<boolean>;
  check: boolean = false;

  selection$: Observable<Selection>;
  selection!: Selection;

  constructor(
    private store: Store<AppState>,
    private kingService: KingService,
    private checkService: CheckService,
    private pieceService: PieceService,
    ) {
      this.piece$ = this.store.select(getPieces);
      this.piece$.subscribe((piece$) =>this.pieces = [...piece$]);

      this.boardSquare$ = this.store.select(getBoardSquares);
      this.boardSquare$.subscribe((boardSquare$) =>this.boardSquares = [...boardSquare$]);

      this.turn$ = this.store.select(getTurns);
      this.turn$.subscribe((turn$) => this.turns = turn$);

      this.check$ = this.store.select(getCheck);
      this.check$.subscribe((check$) => this.check = check$);

      this.selection$ = this.store.select(getSelection);
      this.selection$.subscribe((selection$) => this.selection = selection$);
    }

  ngOnInit(): void {
  }

  handleMouseDown(event:any){
    // Get all possible moves for the respective piece.
    const posMoves: IBoardSquare[] = this.pieceService.getPossibleMoves(
      this.piece,
      this.pieces,
      this.boardSquares
    )
    // Filter moves that would be respective king in check.
    const moves = this.checkService.filterMoves(
      this.piece,
      posMoves,
      this.pieces,
      this.boardSquares
    )
    // Add current position to moves array.
    const curPos = this.boardSquares.filter(({square}) => square === this.piece.location)[0];
    moves.push(curPos);
    // Update state of current selection.
    const curSelection = {
      ...this.piece,
      moves:[...moves,]
    }
    this.store.dispatch(PiecesActions.modifySelection({selection:curSelection}));
    console.log(this.selection);
  }

  renderPosition = (point:Point, dragRef:DragRef) => {
    // Render piece in appropriate position based on which move
    // the piece is dragged, or dropped, closest to.
    let resPoint:Point = this.pieceService.renderPosition(
      point,
      this.piece,
      this.selection.moves
    )
    return resPoint;
  }


  handleDrop(event: CdkDragDrop<string>){
    const newLocation: string = event.container.data;
    // Base case if piece is not moved.
    if(this.piece.location === newLocation) return;
    // Increment turns.
    this.store.dispatch(PiecesActions.incrementTurn());
    // Reposition dropped piece.
    const newPiece: IPiece = {
      ...this.piece,
      ...{
        location: newLocation,
        moved: true
      }
    };
    this.store.dispatch(PiecesActions.modifyPiece({piece:newPiece,turns:this.turns}));
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
    const check  = this.kingService.inCheck(this.pieces, this.boardSquares);
    console.log('check: ', check);
    // Update Check state based on result.
    this.store.dispatch(PiecesActions.modifyCheck({check:check}));
    
    // Determine if opponent's king is now in check-mate.
    let checkMate = false;
    if(check){
      checkMate = this.kingService.inCheckMate(this.turns,this.pieces, this.boardSquares);
    };
    console.log('check-mate: ', checkMate);
  }

}

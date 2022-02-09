import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {CdkDragDrop, DragRef, Point} from '@angular/cdk/drag-drop';

import { PieceService } from '../services/piece.service';
import { getPieces, getTurns, getBoardSquares, getGameStatus, getSelection, getCastle } from '../state/state.selector';
import { AppState } from '../state/app.state';
import * as PiecesActions from '../state/state.actions';
import { IBoardSquare, IPiece, Selection, Castle, GameStatus } from '../state/model';

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

  gameStatus$: Observable<GameStatus>;
  gameStatus!: GameStatus;

  selection$: Observable<Selection>;
  selection!: Selection;

  castlePieces$: Observable<Castle>;
  castlePieces!: Castle

  constructor(
    private store: Store<AppState>,
    private pieceService: PieceService,
    ) {
      this.piece$ = this.store.select(getPieces);
      this.piece$.subscribe((piece$) =>this.pieces = [...piece$]);

      this.boardSquare$ = this.store.select(getBoardSquares);
      this.boardSquare$.subscribe((boardSquare$) =>this.boardSquares = [...boardSquare$]);

      this.turn$ = this.store.select(getTurns);
      this.turn$.subscribe((turn$) => this.turns = turn$);

      this.gameStatus$ = this.store.select(getGameStatus);
      this.gameStatus$.subscribe((gameStatus$) => this.gameStatus = gameStatus$);

      this.selection$ = this.store.select(getSelection);
      this.selection$.subscribe((selection$) => this.selection = selection$);

      this.castlePieces$ = this.store.select(getCastle);
      this.castlePieces$.subscribe((castlePieces$) => this.castlePieces = castlePieces$);
    }

  ngOnInit(): void {
  }

  handleMouseDown(event:MouseEvent){
    // Get all possible moves for the respective piece.
    const posMoves: IBoardSquare[] = this.pieceService.getPossibleMoves(
      this.piece,
      this.pieces,
    )
    // Filter moves that would be respective king in check.
    const moves = this.pieceService.filterMoves(
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
    
    this.updateState(newLocation);
  }

  updateState(newLocation:string){
    // Increment turns.
    this.store.dispatch(PiecesActions.incrementTurn());

    // Reposition dropped piece.
    const newPiece: IPiece = {
      ...this.piece,
      location: newLocation,
      moved:true
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

    // Game status state.
    const playersTurn = this.turns % 2 === 0 ? 'white' : 'black';
    const newGameStatus = {
      'white':{
        'check': false,
        'checkMate': false,
      },
      'black':{
        'check': false,
        'checkMate': false,
      },
    };
    // Determine if opponent's king is now in check.
    newGameStatus[playersTurn]['check']  = this.pieceService.inCheck(this.pieces, this.boardSquares);
    // Determine if opponent's king is now in check-mate.
    let checkMate = false;
    if(newGameStatus[playersTurn]['check']){
      checkMate = this.pieceService.inCheckMate(this.turns,this.pieces, this.boardSquares);
    };
    newGameStatus[playersTurn]['checkMate']  = checkMate;
    // Update Check state based on result.
    this.store.dispatch(PiecesActions.modifyGameStatus({gameStatus:newGameStatus}));
  }

  handleDoubleClick(){
    // Update castle state.
    this.store.dispatch(PiecesActions.modifyCastle({piece:this.selection}));
    const playersTurn = this.turns % 2 === 0 ? 'white' : 'black';
    // If not in check, castle.
    const inCheck = this.gameStatus[playersTurn]['check'];
    if(!inCheck ) this.pieceService.castle(this.castlePieces[playersTurn]);
    console.log(this.castlePieces);
  }

}

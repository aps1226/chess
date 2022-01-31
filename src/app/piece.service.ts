import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Point } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { PawnService } from './pawn.service';
import { RookService } from './rook.service';
import { KnightService } from './knight.service';
import { BishopService } from './bishop.service';
import { QueenService } from './queen.service';
import { KingService } from './king.service';
import { AppState } from './state/app.state';
import { getTurns } from './state/state.selector'
import { IBoardSquare, IPiece } from './state/model';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  turn$: Observable<number>;
  turns: number = 0;

  constructor(
    private store: Store<AppState>,
    private pawnService: PawnService,
    private rookService: RookService,
    private knightService: KnightService,
    private bishopService: BishopService,
    private queenService: QueenService,
    private kingService: KingService,
  ) {
    this.turn$ = this.store.select(getTurns);
    this.turn$.subscribe((turn$) => this.turns = turn$);
  }

  renderPosition(
    curPos:Point,
    curPiece: IPiece,
    moves: IBoardSquare[],
  ){
    const{
      x:curX,
      y:curY
    } = curPos;

    let closestPos:Point = {
      x:curX,
      y:curY,
    }
    let closestDist:number = Number.MAX_SAFE_INTEGER;

    for(const move of moves){
      const {x,y} = move;
      const distance = Math.sqrt( 
        Math.pow( Math.abs(x - curX), 2) + Math.pow( Math.abs(y - curY), 2) 
      );
      if(distance < closestDist){
        closestDist = distance;
        closestPos = {x,y};
      }
    }

    return closestPos;
  };

  getPossibleMoves(
    piece:IPiece,
    pieces: IPiece[],
    boardSquares: IBoardSquare[],
  ){
    
    const playersTurn = this.turns % 2 === 0 ? 'white' : 'black';
    
    // Base case for if it is not the piece's respective
    // color's turn.
    if(piece.color !== playersTurn){
      const curSquare = boardSquares.filter(({square}) => square === piece.location)[0];
      return [curSquare];
    }

    const res: IBoardSquare[] = [];
    const {type} = piece;
    switch(type){
      case 'pawn':
        res.push(
          ...this.pawnService.getViablePos(
            piece, 
            pieces, 
            boardSquares,
          )
        );
        break;
      case 'rook':
        res.push(
          ...this.rookService.getViablePos(
            piece, 
            pieces, 
            boardSquares,
          )
        );
        break;
      case 'knight':
        res.push(
          ...this.knightService.getViablePos(
            piece, 
            pieces, 
            boardSquares,
          )
        );
        break;
      case 'bishop':
        res.push(
          ...this.bishopService.getViablePos(
            piece, 
            pieces, 
            boardSquares,
          )
        );
        break;
      case 'queen':
        res.push(
          ...this.queenService.getViablePos(
            piece, 
            pieces, 
            boardSquares,
          )
        );
        break;
      case 'king':
        res.push(
          ...this.kingService.getViablePos(
            piece, 
            pieces, 
            boardSquares,
          )
        );
        break;
    }
    return res;
  }


}

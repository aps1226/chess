import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {Point} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { PawnService } from './pawn.service';
import { RookService } from './rook.service';
import { KnightService } from './knight.service';
import { BishopService } from './bishop.service';
import { QueenService } from './queen.service';
import { AppState } from './state/app.state';
import { getTurns } from './state/state.selector'
import * as PiecesActions from './state/state.actions';
import { columns } from './state/columns'; 
import { IBoardSquare, IPiece, Columns} from './state/model';


interface Memo {
  [key: string]: true;
}
@Injectable({
  providedIn: 'root'
})
export class KingService {

  turn$: Observable<number>;
  turns: number = 0;

  constructor(
    private store: Store<AppState>,
    private pawnService: PawnService,
    private rookService: RookService,
    private knightService: KnightService,
    private bishopService: BishopService,
    private queenService: QueenService,
  ) {
    this.turn$ = this.store.select(getTurns);
    this.turn$.subscribe((turn$) => this.turns = turn$);
  }


  getViablePos(
    curPiece:IPiece,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
    ):IBoardSquare[]
    {
    const {location,color} = curPiece;
    const res:IBoardSquare[] = [];
    const col = location.split('')[0];
    const row = Number(location.split('')[1]);

    const curColNumber = columns[col];
    const cols = Object.values(columns).sort((a,b) => a-b);

    // Add current position.
    const curSquare = boardSquares.filter(({square}) => square === `${col + row}`)[0];
    res.push(curSquare);
    // Check Surrounding squares.
    const posSquares =[
      // Top Right
      `${String.fromCharCode(97 + curColNumber+1)+(row+1)}`,
      // Right
      `${String.fromCharCode(97 + curColNumber+1)+(row)}`,
      // Back Right
      `${String.fromCharCode(97 + curColNumber+1)+(row - 1)}`,
      // Back
      `${String.fromCharCode(97 + curColNumber)+(row - 1)}`,
      // Back Left
      `${String.fromCharCode(97 + curColNumber - 1)+(row - 1)}`,
      // Left
      `${String.fromCharCode(97 + curColNumber - 1)+(row)}`,
      // Front Left
      `${String.fromCharCode(97 + curColNumber + 1)+(row + 1)}`,
      // Front
      `${String.fromCharCode(97 + curColNumber)+(row + 1)}`,
    ]
    for(const posSquare of posSquares){
      const pathObstructed = pieces.filter(({location,color}) =>{
        return(
          location === posSquare &&
          color === curPiece.color
        )
      })[0];
      const squareExists = boardSquares.filter(({square}) => square === posSquare)[0];
      if(!pathObstructed && squareExists){
        res.push(squareExists);
      }
    }

    return res;
  }

  inCheck(
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
  ){
    const playersTurn = this.turns % 2 !== 0 ? 'black' : 'white';
    const posCaptureMoves = this.captureVectors(
      pieces,
      pieces.filter(({color}) => color !== playersTurn),
      boardSquares
    );
    const king = pieces.filter(
      ({color,type}) =>  color === playersTurn && type === 'king'
    )[0];
    const check = posCaptureMoves.filter(({square}) => square === king.location).length > 0;
    return check
  }

  inCheckMate(
    turns:number,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
  ){
    let checkMate = true;
    const playersTurn = this.turns % 2 !== 0 ? 'black' : 'white';
    const resPieces = pieces.filter(({color}) =>  color === playersTurn);
    // Can the checked kings pieces escape the check.
    const checkedPieces = [...pieces.filter(({color}) =>  color !== playersTurn)];
    // Get all possible moves for each checked piece.
    for(let checkedPiece of checkedPieces){
      const moves = [];
      const allPiecesExcluding = pieces.filter(({name}) => name !== checkedPiece.name);
      const { type } = checkedPiece;
      switch(type){
        case 'pawn':
          moves.push(
            ...this.pawnService.getViablePos(
              checkedPiece,
              pieces,
              boardSquares,
            )
          );
          break;
        case 'rook':
          moves.push(
            ...this.rookService.getViablePos(
              checkedPiece,
              pieces,
              boardSquares
            )
          )
          break;
        case 'knight':
          moves.push(
            ...this.knightService.getViablePos(
              checkedPiece,
              pieces,
              boardSquares
            )
          )
          break;
        case 'bishop':
          moves.push(
            ...this.bishopService.getViablePos(
              checkedPiece,
              pieces,
              boardSquares
            )
          )
          break;
        case 'queen':
          moves.push(
            ...this.queenService.getViablePos(
              checkedPiece,
              pieces,
              boardSquares
            )
          )
          break;
        case 'king':
          moves.push(
            ...this.getViablePos(
              checkedPiece,
              pieces,
              boardSquares
            )
          )
          break;
        default:
          break;
      }
      for(const move of moves){
        const curPiece = {
          ...checkedPiece,
          location:move.square
        };
        const newPieces = [
          ...allPiecesExcluding,
          curPiece
        ];
        const stillInCheck = this.inCheck(
          newPieces,
          boardSquares
        )
        if(!stillInCheck){
          checkMate = false;
          break;
        }
      }
      resPieces.push(checkedPiece);
    }
    this.store.dispatch(PiecesActions.modifyPieces({pieces:resPieces}));
    return checkMate;
  }

  captureVectors(
    allPieces: IPiece[],
    attackingPieces:IPiece[],
    boardSquares:IBoardSquare[],
  ){
    const memo:Memo = {};
    const checkVectors:IBoardSquare[] = [];
    for(const piece of attackingPieces){
      const {type,location,moved,color} = piece;
      const col = location.split('')[0];
      const row = Number(location.split('')[1]);
      const res = [];
      switch(type){
        case 'pawn':
          res.push(
            ...this.pawnService.positionsOfCheck(
              piece,
              boardSquares
            )
          );
          break;
        case 'rook':
          res.push(
            ...this.rookService.getViablePos(
              piece,
              allPieces,
              boardSquares
            )
          );
          break;
        case 'knight':
          res.push(
            ...this.knightService.getViablePos(
              piece,
              allPieces,
              boardSquares
            )
          )
          break;
        case 'bishop':
          res.push(
            ...this.bishopService.getViablePos(
              piece,
              allPieces,
              boardSquares
            )
          );
          break;
        case 'queen':
          res.push(
            ...this.queenService.getViablePos(
              piece,
              allPieces,
              boardSquares
            )
          );
          break;
        case 'king':
          res.push(
            ...this.getViablePos(
              piece,
              allPieces,
              boardSquares
            )
          );
          break;
        default:
          break;
      }
      res.map((curSquare) =>{
        if(!memo[curSquare.square]){
          memo[curSquare.square] = true;
          checkVectors.push(curSquare);
        }
      })
    }
    return checkVectors;
  }


}

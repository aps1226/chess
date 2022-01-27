import { Injectable } from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';

import { PawnService } from './pawn.service';
import { RookService } from './rook.service';
import { KnightService } from './knight.service';
import { BishopService } from './bishop.service';
import { QueenService } from './queen.service';
import { columns } from './state/columns'; 
import { IBoardSquare, IPiece, Columns} from './state/model';

@Injectable({
  providedIn: 'root'
})
export class KingService {

  constructor(
    private pawnService: PawnService,
    private rookService: RookService,
    private knightService: KnightService,
    private bishopService: BishopService,
    private queenService: QueenService,
  ) {}

  move(
    curPos:Point,
    curPiece: IPiece,
    pieces: IPiece[],
    boardSquares: IBoardSquare[],
  ){

    const {color,location,moved} = curPiece;

    const viablePos = this.getViablePos(
      curPiece,
      pieces,
      boardSquares,
      location,
      moved,
      color,
    );

    const{
      x:curX,
      y:curY
    } = curPos;

    let closestPos:Point = {
      x:curX,
      y:curY,
    }
    let closestDist:number = Number.MAX_SAFE_INTEGER;

    for(const pos of viablePos){
      const {x,y} = pos;
      const distance = Math.sqrt( 
        Math.pow( Math.abs(x - curX), 2) + Math.pow( Math.abs(y - curY), 2) 
      );
      if(distance < closestDist){
        closestDist = distance;
        closestPos = {x,y};
      }
    }
    return closestPos;
  }

  getViablePos(
    curPiece:IPiece,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
    location:string,
    moved:boolean,
    color:string,
    ):IBoardSquare[]
    {
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
      console.log(posSquares)
      if(!pathObstructed && squareExists){
        res.push(squareExists);
      }
    }
    console.log(res)
    return res;
  }

  inCheck(
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
  ){
    const posCaptureMoves = this.captureVectors(
      pieces.filter(({draggable,type}) => draggable && type === 'king')[0],
      pieces.filter(({draggable}) => draggable),
      boardSquares
    );
    // const posEscapeMoves = this.captureVectors(
    //   pieces.filter(({draggable}) => !draggable),
    //   boardSquares
    // );

  }

  captureVectors(
    king:IPiece,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
  ){
    const checkVectors = [];
    for(const piece of pieces){
      const {type,location,moved,color} = piece;
      const col = location.split('')[0];
      const row = Number(location.split('')[1]);
      switch(type){
        case 'pawn':
          checkVectors.push(
            ...this.pawnService.hasInCheck(
              king.location,
              piece
            )
          );
          break;
        case 'rook':
          checkVectors.push(
            ...this.rookService.hasInCheck(
              king.location,
              piece,
              boardSquares,
              pieces
            )
          )
          break;
        case 'knight':
          checkVectors.push(
            ...this.knightService.hasInCheck(
              king.location,
              piece,
              boardSquares,
              pieces
            )
          )
          break;
        case 'bishop':
          checkVectors.push(
            ...this.bishopService.hasInCheck(
              king.location,
              piece,
              boardSquares,
              pieces
            )
          )
          break;
        case 'queen':
          checkVectors.push(
            ...this.queenService.getViablePos(
              piece,
              pieces,
              boardSquares,
              location,
              moved,
              color,
            )
          )
          break;
        case 'king':
          checkVectors.push(
            ...this.getViablePos(
              piece,
              pieces,
              boardSquares,
              location,
              moved,
              color,
            )
          )
          break;
        default:
          break;
      }
    }

  }


}

import { Injectable } from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';
import { IBoardSquare, IPiece, Columns } from './state/model';
import { columns } from './state/columns';
import { stringify } from 'querystring';
import { pieces } from './state/pieces';

@Injectable()
export class PawnService {

  constructor(){}

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

    res.push(
      ...boardSquares
        .filter(({square}) =>{
          return (
            curPiece.location === square ||
            (color === 'white' && (col+String(row+1)) === square) ||
            (!moved && color === 'white' && (col+String(row+2)) === square) ||
            (color === 'black' && (col+String(row-1)) === square) ||
            (!moved && color === 'black' && (col+String(row-2)) === square) 
          )
        })
        .filter(({square}) => {
          return (
            !pieces.filter(({location}) => 
              (location == square && location !== curPiece.location) ||
              // Stop white pawn from jumping over another.
              (curPiece.color === 'white' && square === `${col+(row+2)}` && location === `${col+(row+1)}` ) ||
              // Stop black pawn from jumping over another.
              (curPiece.color === 'black' && square === `${col+(row-2)}` && location === `${col+(row-1)}` )
            ).length
          )
        }),
      ...this.attackDiagonal(
      curPiece,
      pieces,
      boardSquares,
      color,
      row,
      col,
    ));

    return res;
  }

  attackDiagonal(
    curPiece:IPiece,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
    color:string,
    row:number,
    col:string,
  ){
    let targetRow: number;
    let targetCol1: string|null;
    let targetCol2: string|null;
    const curColNumber = columns[col];
    const targets:string[] = [];

    if(color === 'white'){
      targetRow = row + 1;
    } else {
      targetRow = row - 1;
    }
    const cols = [1,-1];
    for(const col of cols){
      const letter = String.fromCharCode(97 + curColNumber + col);
      if(columns[letter]){
        const targetPos = letter + targetRow;
        targets.push(targetPos);
      }
    }
    const res: IBoardSquare[] = []
    for(const target of targets){
      if(pieces.filter((piece) => piece.location === target).length){
        res.push(
          ...boardSquares.filter(({square}) => square === target)
        );
      }
    }
    return res;
  }

  hasInCheck(
    kingPos:string,
    pawn:IPiece,
  ){
    const {color,location} = pawn;
    const col = location.split('')[0];
    const curColNumber = columns[col];
    const row = Number(location.split('')[1]);

    const checkPos = [];
    
    if(color === 'white' &&
      (`${String.fromCharCode(97 + curColNumber+1)+(row+1)}` === kingPos ||
      `${String.fromCharCode(97 + curColNumber-1)+(row+1)}` === kingPos)
    ) checkPos.push(pawn.location);

    if(
      color === 'black' &&
      (`${String.fromCharCode(97 + curColNumber+1)+(row-1)}` === kingPos ||
      `${String.fromCharCode(97 + curColNumber-1)+(row-1)}` === kingPos)
    ) checkPos.push(pawn.location);

    return checkPos;
  }

}

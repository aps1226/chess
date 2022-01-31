import { Injectable } from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';
import { IBoardSquare, IPiece, Columns } from './state/model';
import { columns } from './state/columns';
import { stringify } from 'querystring';
import { pieces } from './state/pieces';
import { CheckService } from './check.service';

@Injectable()
export class PawnService {

  constructor(){}

  getViablePos(
    curPiece:IPiece,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
    ):IBoardSquare[]
    {
    
    const res: IBoardSquare[] = [];
    const {location,color,moved} = curPiece;
    const col = location.split('')[0];
    const row = Number(location.split('')[1]);

    res.push(
      ...boardSquares
        .filter(({square}) =>{
          return (
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

  positionsOfCheck(
    pawn:IPiece,
    boardSquares:IBoardSquare[],
  ){
    const {color,location} = pawn;
    const col = location.split('')[0];
    const curColNumber = columns[col];
    const row = Number(location.split('')[1]);

    const posOfCheck = [];
    // Add current position.
    const curSquare = boardSquares.filter(({square}) => square === pawn.location)[0];
    posOfCheck.push(curSquare);
    
    const diagonals = [];
    // If the pawn is a white piece, add respective diagonals
    // to the positions of check array.
    if(color === 'white'){
      diagonals.push(
        `${String.fromCharCode(97 + curColNumber+1)+(row+1)}`,
        `${String.fromCharCode(97 + curColNumber-1)+(row+1)}`,
      );
    }
    // If the pawn is a black piece, add respective diagonals
    // to the positions of check array.
    if(color === 'black'){
      diagonals.push(
        `${String.fromCharCode(97 + curColNumber+1)+(row-1)}`,
        `${String.fromCharCode(97 + curColNumber-1)+(row-1)}`,
      );
    }
    for(const diagonal of diagonals){
      const curSquare = boardSquares.filter(({square}) => square === diagonal)[0];
      if(curSquare){
        posOfCheck.push(curSquare);
      }
    }

    return posOfCheck;
  }

}

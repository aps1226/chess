import { Injectable } from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';
import { IBoardSquare, IPiece, Columns} from './state/model';
import { columns } from './state/columns'; 

@Injectable({
  providedIn: 'root'
})
export class KnightService {

  constructor() {}

  getViablePos(
    curPiece:IPiece,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
    ):IBoardSquare[]
    {
    const {location} = curPiece;
    const res:IBoardSquare[] = [];
    const col = location.split('')[0];
    const row = Number(location.split('')[1]);

    const curColNumber = columns[col];
    const cols = Object.values(columns).sort((a,b) => a-b);


    const curSquare = boardSquares.filter(({square}) => square === `${col + row}`)[0];

    const topRightSquares = [
      `${String.fromCharCode(97 + curColNumber+1)+(row+2)}`,
      `${String.fromCharCode(97 + curColNumber+2)+(row+1)}`
    ];
    const backRightSquares = [
      `${String.fromCharCode(97 + curColNumber+1)+(row-2)}`,
      `${String.fromCharCode(97 + curColNumber+2)+(row-1)}`
    ];
    const backLeftSquares = [
      `${String.fromCharCode(97 + curColNumber-1)+(row-2)}`,
      `${String.fromCharCode(97 + curColNumber-2)+(row-1)}`
    ];
    const topLeftSquares = [
      `${String.fromCharCode(97 + curColNumber-1)+(row+2)}`,
      `${String.fromCharCode(97 + curColNumber-2)+(row+1)}`
    ];
    const posSquares = [
      ...topRightSquares,
      ...backRightSquares,
      ...backLeftSquares,
      ...topLeftSquares
    ];
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

}

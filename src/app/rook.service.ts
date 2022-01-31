import { Injectable } from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';
import { IBoardSquare, IPiece, Columns} from './state/model';
import { columns } from './state/columns'; 

@Injectable({
  providedIn: 'root'
})
export class RookService {

  constructor() {}

  getViablePos(
    curPiece:IPiece,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
    ):IBoardSquare[]
    {
    
    const {color,location} = curPiece;
    const res:IBoardSquare[] = [];
    const col = location.split('')[0];
    const row = Number(location.split('')[1]);

    const curColNumber = columns[col];
    const cols = Object.values(columns).sort((a,b) => a-b);

    const curSquare = boardSquares.filter(({square}) => square === `${col + row}`)[0];
    // Check left.
    for(let i = curColNumber - 1; i >= cols[0]; i--){
      const letter = String.fromCharCode(97 + i);
      const curPos = letter + row;
      const curSquare = boardSquares.filter(({square}) => square === curPos)[0];
      const pathObstructed = pieces.filter(({location}) =>{
        return location === curPos;
      })[0];
      // Opponent piece exists in path.
      if(pathObstructed){
        if(pathObstructed.color !== curPiece.color){
          res.push(curSquare);
        }
        break;
      }
      res.push(curSquare)
    }
    // Check right.
    for(let i = curColNumber + 1; i <= cols[cols.length - 1]; i++){
      const letter = String.fromCharCode(97 + i);
      const curPos = letter + row;
      const curSquare = boardSquares.filter(({square}) => square === curPos)[0];
      const pathObstructed = pieces.filter(({location}) =>{
        return location === curPos;
      })[0];
      // Opponent piece exists in path.
      if(pathObstructed){
        if(pathObstructed.color !== curPiece.color){
          res.push(curSquare);
        }
        break;
      }
      res.push(curSquare);
    }
    // Check down.
    for(let i = row - 1; i >= 1; i--){
      const curPos = col + i;
      const curSquare = boardSquares.filter(({square}) => square === curPos)[0];
      const pathObstructed = pieces.filter(({location}) =>{
        return location === curPos;
      })[0];
      // Opponent piece exists in path.
      if(pathObstructed){
        if(pathObstructed.color !== curPiece.color){
          res.push(curSquare);
        }
        break;
      }
      res.push(curSquare);
    }
    // Check up.
    for(let i = row + 1; i <= 8; i++){
      const curPos = col + i;
      const curSquare = boardSquares.filter(({square}) => square === curPos)[0];
      const pathObstructed = pieces.filter(({location}) =>{
        return location === curPos;
      })[0];
      // Opponent piece exists in path.
      if(pathObstructed){
        if(pathObstructed.color !== curPiece.color){
          res.push(curSquare);
        }
        break;
      }
      res.push(curSquare);
    }

    return res;
  }

}

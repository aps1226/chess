import { Injectable } from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';
import { IBoardSquare, IPiece, Columns} from './state/model';
import { columns } from './state/columns'; 

@Injectable({
  providedIn: 'root'
})
export class BishopService {

  constructor() {}

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
    // Check top right diagonal.
    for(let curCol = curColNumber + 1, curRow = row + 1; curCol <= cols[cols.length - 1] && curRow <= 8; curCol++, curRow++){
      const letter = String.fromCharCode(97 + curCol);
      const curPos = letter + curRow;
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
    // Check back right diagonal.
    for(let curCol = curColNumber + 1, curRow = row - 1; curCol <= cols[cols.length - 1] && curRow >= 1; curCol++, curRow--){
      const letter = String.fromCharCode(97 + curCol);
      const curPos = letter + curRow;
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
    // Check back left diagonal.
    for(let curCol = curColNumber - 1, curRow = row - 1; curCol >= cols[0] && curRow >= 1; curCol--, curRow--){
      const letter = String.fromCharCode(97 + curCol);
      const curPos = letter + curRow;
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
    // Check front left diagonal.
    for(let curCol = curColNumber - 1, curRow = row + 1; curCol >= cols[0] && curRow <= 8; curCol--, curRow++){
      const letter = String.fromCharCode(97 + curCol);
      const curPos = letter + curRow;
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
    return res;
  }

  hasInCheck(
    kingPos: string,
    bishop:IPiece,
    boardSquares:IBoardSquare[],
    pieces: IPiece[]
  ){
    const {location,color} = bishop;

    const checkPos:IBoardSquare[] = [];


    return checkPos;
  }

}

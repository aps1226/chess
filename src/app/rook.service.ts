import { Injectable } from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';
import { IBoardSquare, IPiece, Columns} from './state/model';
import { columns } from './state/columns'; 

@Injectable({
  providedIn: 'root'
})
export class RookService {

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

  hasInCheck(
    kingPos: string,
    rook:IPiece,
    boardSquares:IBoardSquare[],
    pieces: IPiece[]
  ){
    const {color,location} = rook;
    const col = location.split('')[0];
    const curColNumber = columns[col];
    const row = Number(location.split('')[1]);
    const cols = Object.values(columns).sort((a,b) => a-b);

    const kingCol =  kingPos.split('')[0];
    const kingColNum = columns[col];
    const kingRow =  Number(kingPos.split('')[1]);

    const checkPos:IBoardSquare[] = [];

    // Base case.
    if(col !== kingCol || row !== kingRow) return checkPos;

    // King is on the right horizontal of the rook.
    if(curColNumber <  kingColNum || row === kingRow){
      // Check right.
      const pos = [];
      for(let i = curColNumber + 1; i <= cols[cols.length - 1]; i++){
        const letter = String.fromCharCode(97 + i);
        const curPos = letter + row;
        const curSquare = boardSquares.filter(({square}) => square === curPos)[0];
        const pathObstructed = pieces.filter(({location}) =>{
          return location === curPos;
        })[0];
        // Opponent piece exists in path.
        if(pathObstructed){
          // If the path contains the king.
          if(pathObstructed.location === kingPos){
            pos.push(curSquare);
            checkPos.push(...pos);
          }
          return checkPos;
        }
        pos.push(curSquare);
      }
    }
    // King is on the below vertical of the rook.
    if(curColNumber ===  kingColNum || row > kingRow){
      // Check down.
      const pos = [];
      for(let i = row - 1; i >= 1; i--){
        const curPos = col + i;
        const curSquare = boardSquares.filter(({square}) => square === curPos)[0];
        const pathObstructed = pieces.filter(({location}) =>{
          return location === curPos;
        })[0];
        // Opponent piece exists in path.
        if(pathObstructed){
          // If the path contains the king.
          if(pathObstructed.location === kingPos){
            pos.push(curSquare);
            checkPos.push(...pos);
          }
          return checkPos;
        }
        pos.push(curSquare);
      }
    }
    // King is on the left horizontal of the rook.
    if(curColNumber > kingColNum || row === kingRow){
      // Check left.
      const pos = [];
      for(let i = curColNumber - 1; i >= cols[0]; i--){
        const letter = String.fromCharCode(97 + i);
        const curPos = letter + row;
        const curSquare = boardSquares.filter(({square}) => square === curPos)[0];
        const pathObstructed = pieces.filter(({location}) =>{
          return location === curPos;
        })[0];
        // Opponent piece exists in path.
        if(pathObstructed){
          // If the path contains the king.
          if(pathObstructed.location === kingPos){
            pos.push(curSquare);
            checkPos.push(...pos);
          }
          return checkPos;
        }
        pos.push(curSquare);
      }
    }
    // King is on the above vertical of the rook.
    if(curColNumber === kingColNum || row < kingRow){
      // Check up.
      const pos = [];
      for(let i = row + 1; i <= 8; i++){
        const curPos = col + i;
        const curSquare = boardSquares.filter(({square}) => square === curPos)[0];
        const pathObstructed = pieces.filter(({location}) =>{
          return location === curPos;
        })[0];
        // Opponent piece exists in path.
        if(pathObstructed){
          // If the path contains the king.
          if(pathObstructed.location === kingPos){
            pos.push(curSquare);
            checkPos.push(...pos);
          }
          return checkPos;
        }
        pos.push(curSquare);
      }
    }
    return checkPos;
  }
  
}

import { Injectable } from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';
import { IBoardSquare, IPiece, Columns} from './state/model';
import { columns } from './state/columns'; 

@Injectable({
  providedIn: 'root'
})
export class KnightService {

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

  hasInCheck(
    kingPos: string,
    knight:IPiece,
    boardSquares:IBoardSquare[],
    pieces: IPiece[]
  ){
    const {color,location} = knight;
    const col = location.split('')[0];
    const curColNumber = columns[col];
    const row = Number(location.split('')[1]);
    const cols = Object.values(columns).sort((a,b) => a-b);

    const kingCol =  kingPos.split('')[0];
    const kingColNum = columns[col];
    const kingRow =  Number(kingPos.split('')[1]);

    const checkPos:IBoardSquare[] = [];

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
      const kingEncountered = pieces.filter(({location}) =>{
        return(
          location === kingPos
        )
      })[0];
      if(kingEncountered){
        const square = boardSquares.filter(({square}) => square === posSquare)[0];
        checkPos.push(square);
        return checkPos;
      }
    }
    return checkPos;
  }

}

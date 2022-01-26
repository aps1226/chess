import { Injectable } from '@angular/core';
import {CdkDragDrop, CdkDragStart, DragRef, Point} from '@angular/cdk/drag-drop';
import { IBoardSquare, IPiece } from './state/model';
import { stringify } from 'querystring';

interface Columns {
  [key: string]: number;
}

@Injectable()
export class PawnService {

  columns:Columns = {
    'a':0,
    'b':1,
    'c':2,
    'd':3,
    'e':4,
    'f':5,
    'g':6,
    'h':7,
  }
  constructor(){ }

  move(
    curPos:Point,
    curPiece: IPiece,
    pieces: IPiece[],
    boadSquares: IBoardSquare[],
    ):Point
    {
    const {color,location,moved} = curPiece;

    const viablePos = this.getViablePos(
      curPiece,
      pieces,
      boadSquares,
      location,
      moved,
      color,
    );
    console.log(viablePos)
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
    boadSquares:IBoardSquare[],
    location:string,
    moved:boolean,
    color:string,
    ):IBoardSquare[]
    {
    const res:IBoardSquare[] = [];
    const col = location.split('')[0];
    const row = Number(location.split('')[1]);

    res.push(
      ...boadSquares.filter(({square}) =>{
        return (
          curPiece.location === square ||
          (!moved && color === 'white' && col+String(row+1) === square) ||
          (!moved && color === 'white' && col+String(row+2) === square) ||
          (!moved && color === 'black' && col+String(row-1) === square) ||
          (!moved && color === 'black' && col+String(row-2) === square) 
        )
      }),
      ...this.canTakePiece(
        curPiece,
        pieces,
        boadSquares,
        color,
        row,
        col,
      )
    );

    return res;
  }

  canTakePiece(
    curPiece:IPiece,
    pieces:IPiece[],
    boadSquares:IBoardSquare[],
    color:string,
    row:number,
    col:string,
  ){
    let targetRow: number;
    let targetCol1: string|null;
    let targetCol2: string|null;
    const curColNumber = this.columns[col];
    const targets:string[] = [];

    if(color === 'white'){
      targetRow = row + 1;
    } else {
      targetRow = row - 1;
    }
    const cols = [1,-1];
    for(const col of cols){
      const letter = String.fromCharCode(97 + curColNumber + col);
      if(this.columns[letter]){
        const targetPos = letter + targetRow;
        targets.push(targetPos);
      }
    }
    const res: IBoardSquare[] = []
    for(const target of targets){
      if(pieces.filter((piece) => piece.location === target).length){
        res.push(
          ...boadSquares.filter(({square}) => square === target)
        );
      }
    }
    return res;
  }
}

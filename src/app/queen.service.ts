import { Injectable } from '@angular/core';
import {Point} from '@angular/cdk/drag-drop';
import { IBoardSquare, IPiece, Columns} from './state/model';
import { columns } from './state/columns'; 

import { RookService } from './rook.service';
import { BishopService } from './bishop.service';

@Injectable({
  providedIn: 'root'
})
export class QueenService {

  constructor(
    private rookService:RookService,
    private bishopService:BishopService,
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

    // Queen movements are a combination of Rook's and bishop's.
    res.push(
      ...this.bishopService.getViablePos(
        curPiece,
        pieces,
        boardSquares,
        location,
        color,
      ),
      ...this.rookService.getViablePos(
        curPiece,
        pieces,
        boardSquares,
        location,
        moved,
        color,
      )
    )
    return res;
  }

}

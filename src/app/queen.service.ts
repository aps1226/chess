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

  getViablePos(
    curPiece:IPiece,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
    ):IBoardSquare[]
    {
    const { location,color } = curPiece;
    const res:IBoardSquare[] = [];
    const col = location.split('')[0];
    const row = Number(location.split('')[1]);

    const curColNumber = columns[col];
    const cols = Object.values(columns).sort((a,b) => a-b);

    const curSquare = boardSquares.filter(({square}) => square === `${col + row}`)[0];
    // Queen movements are a combination of Rook's and bishop's.
    res.push(
      ...this.bishopService.getViablePos(
        curPiece,
        pieces,
        boardSquares,
      ),
      ...this.rookService.getViablePos(
        curPiece,
        pieces,
        boardSquares
      )
    )
    return res;
  }

}

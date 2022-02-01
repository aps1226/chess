import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {Point} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { AppState } from '../state/app.state';
import { getBoardSquares } from '../state/state.selector';
import { IBoardSquare, IPiece, Columns} from '../state/model';
import { columns } from '../state/columns'; 
import { RookService } from './rook.service';
import { BishopService } from './bishop.service';

@Injectable({
  providedIn: 'root'
})
export class QueenService {

  boardSquare$: Observable<IBoardSquare[]>;
  boardSquares: IBoardSquare[] = [];

  constructor(
    private store: Store<AppState>,
    private rookService:RookService,
    private bishopService:BishopService,
    ) {
      this.boardSquare$ = this.store.select(getBoardSquares);
      this.boardSquare$.subscribe((boardSquare$) =>this.boardSquares = [...boardSquare$]);
    }
  getViablePos(
    curPiece:IPiece,
    pieces:IPiece[],
    ){
    const { location,color } = curPiece;
    const res:IBoardSquare[] = [];
    const col = location.split('')[0];
    const row = Number(location.split('')[1]);

    const curColNumber = columns[col];
    const cols = Object.values(columns).sort((a,b) => a-b);

    const curSquare = this.boardSquares.filter(({square}) => square === `${col + row}`)[0];
    // Queen movements are a combination of Rook's and bishop's.
    res.push(
      ...this.bishopService.getViablePos(
        curPiece,
        pieces,
      ),
      ...this.rookService.getViablePos(
        curPiece,
        pieces,
      )
    )
    return res;
  }

}

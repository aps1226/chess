import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {Point} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { AppState } from '../state/app.state';
import { getBoardSquares } from '../state/state.selector';
import { IBoardSquare, IPiece, Columns} from '../state/model';
import { columns } from '../state/columns'; 


@Injectable({
  providedIn: 'root'
})
export class KingService {

  boardSquare$: Observable<IBoardSquare[]>;
  boardSquares: IBoardSquare[] = [];

  constructor(
    private store: Store<AppState>,
  ) {
    this.boardSquare$ = this.store.select(getBoardSquares);
    this.boardSquare$.subscribe((boardSquare$) =>this.boardSquares = [...boardSquare$]);
  }


  getViablePos(
    curPiece:IPiece,
    pieces:IPiece[],
    ){
    const {location,color} = curPiece;
    const res:IBoardSquare[] = [];
    const col = location.split('')[0];
    const row = Number(location.split('')[1]);

    const curColNumber = columns[col];
    const cols = Object.values(columns).sort((a,b) => a-b);

    // Add current position.
    const curSquare = this.boardSquares.filter(({square}) => square === `${col + row}`)[0];
    res.push(curSquare);
    // Check Surrounding squares.
    const posSquares =[
      // Top Right
      `${String.fromCharCode(97 + curColNumber+1)+(row+1)}`,
      // Right
      `${String.fromCharCode(97 + curColNumber+1)+(row)}`,
      // Back Right
      `${String.fromCharCode(97 + curColNumber+1)+(row - 1)}`,
      // Back
      `${String.fromCharCode(97 + curColNumber)+(row - 1)}`,
      // Back Left
      `${String.fromCharCode(97 + curColNumber - 1)+(row - 1)}`,
      // Left
      `${String.fromCharCode(97 + curColNumber - 1)+(row)}`,
      // Front Left
      `${String.fromCharCode(97 + curColNumber + 1)+(row + 1)}`,
      // Front
      `${String.fromCharCode(97 + curColNumber)+(row + 1)}`,
    ]
    for(const posSquare of posSquares){
      const pathObstructed = pieces.filter(({location,color}) =>{
        return(
          location === posSquare &&
          color === curPiece.color
        )
      })[0];
      const squareExists = this.boardSquares.filter(({square}) => square === posSquare)[0];
      if(!pathObstructed && squareExists){
        res.push(squareExists);
      }
    }

    return res;
  }


}

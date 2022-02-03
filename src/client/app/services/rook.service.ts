import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {Point} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { AppState } from '../state/app.state';
import { getBoardSquares } from '../state/state.selector';
import { IBoardSquare, IPiece, GameStatus} from '../state/model';
import { columns } from '../state/columns'; 

@Injectable({
  providedIn: 'root'
})
export class RookService {

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
    
    const {color,location} = curPiece;
    const res:IBoardSquare[] = [];
    const col = location.split('')[0];
    const row = Number(location.split('')[1]);

    const curColNumber = columns[col];
    const cols = Object.values(columns).sort((a,b) => a-b);

    const curSquare = this.boardSquares.filter(({square}) => square === `${col + row}`)[0];
    // Check left.
    for(let i = curColNumber - 1; i >= cols[0]; i--){
      const letter = String.fromCharCode(97 + i);
      const curPos = letter + row;
      const curSquare = this.boardSquares.filter(({square}) => square === curPos)[0];
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
      const curSquare = this.boardSquares.filter(({square}) => square === curPos)[0];
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
      const curSquare = this.boardSquares.filter(({square}) => square === curPos)[0];
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
      const curSquare = this.boardSquares.filter(({square}) => square === curPos)[0];
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

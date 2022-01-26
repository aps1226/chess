import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs'
import { Store } from '@ngrx/store';


import { getPieces, getTurns, getBoardSquares } from '../state/state.selector';
import { AppState } from '../state/app.state';
import { IBoardSquare, IPiece } from '../state/model'


@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {

  columns:string[] = ['a','b','c','d','e','f','g','h'];
  rows:string[] = ['8','7','6','5','4','3','2','1'];
  colors:string[] = ['white','black'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }
  
}

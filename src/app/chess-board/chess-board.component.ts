import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs'
import { Store } from '@ngrx/store';


import { getState} from '../state/pieces.selector';
import { AppState } from '../state/app.state';
import { IPiece } from '../state/pieces.model'


@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {

  columns:string[] = ['a','b','c','d','e','f','g','h'];
  rows:string[] = ['8','7','6','5','4','3','2','1'];
  colors:string[] = ['white','black'];
  whitePieceTurn:boolean = true;

  pieces!: Observable<IPiece[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.pieces = this.store.select(getState)
  }


}

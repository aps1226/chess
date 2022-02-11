import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { SocketioService } from '../services/socketio.service';

import { AppState } from '../state/app.state';
import { IPiece } from '../state/model';
import { getPieces } from '../state/state.selector';


@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {

  columns:string[] = ['a','b','c','d','e','f','g','h'];
  rows:string[] = [];
  colors:string[] = ['white','black'];

  pieces$: Observable<IPiece[]>;
  pieces!: IPiece[];

  userID!: string;

  constructor(
    private store: Store<AppState>,
    private socketService: SocketioService,
    private authService: AuthService,
  ) {
    this.pieces$ = this.store.select(getPieces);
    this.pieces$.subscribe((pieces) =>{
      this.pieces = pieces;
    })
    this.userID = this.authService.getUserID();
  }

  ngOnInit(){
    // Initialize subscription to websocket.
    this.socketService
      .getData()
      .subscribe((data) => {
        this.socketService.updateState(data);
      });
    
    // If the user is playing with the black pieces,
    // reverse the board orientation.
    const rows = ['8','7','6','5','4','3','2','1'];
    if(this.pieces[0].userID === this.userID) this.rows = [...rows.reverse()];
    else this.rows = [...rows];
  }

}

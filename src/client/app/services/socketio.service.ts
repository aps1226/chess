import { Injectable } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Observable, BehaviorSubject} from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { AppState } from '../state/app.state';
import { environment } from '../../environments/environment';
import { getGameID } from '../state/state.selector';
import * as StateActions from '../state/state.actions';
import { pieces } from '../state/pieces';
import { WebSocketSubject } from 'rxjs/webSocket';
import { ignoreElements } from 'rxjs-compat/operator/ignoreElements';

@Injectable({
  providedIn: 'root'
})
export class SocketioService{

  socket!: Socket;

  gameID$:Observable<number>;
  gameID!:number;

  constructor(
    private store: Store<AppState>,
  ) {
    this.gameID$ = this.store.select(getGameID);
    this.gameID$.subscribe((gameID$) =>{
      this.gameID = gameID$;
    });
  }

  setupSocketConnection() {
    // Set up socket connection with the jwt as a credential.
    const auth_tkn = localStorage.getItem('auth_tkn');
    this.socket = io(
      environment.SOCKET_ENDPOINT,
      {
        auth: {
          token:auth_tkn
        }
      });
  }

  sendData(state:AppState){
    if(this.socket){
      const payLoad = {
        gameID: this.gameID,
        state: state
      }
      this.socket.emit('gameUpdate',payLoad);
    }
  }

  getData = () =>{
    return new Observable((observer) => {
      this.socket.on('updateState', (state) => {
          observer.next(state);
      });
      this.socket.on('connect_error', err => this.handleError(err));
      this. socket.on('connect_failed', err => this.handleError(err));
      this.socket.on('error', err => this.handleError(err));
    });
  }

  initializeState(gameState:any){
    // Initialize state for game id.
    const {gameID} = gameState;
    this.store.dispatch(StateActions.modifyGameID({gameID:gameID}));

    // Initialize state for pieces.
    const { playerW, playerB } = gameState;
    const initPiecesState = [...pieces]
      .map((piece) =>{
        // Trailing underscore indicates that the piece has been
        // moved from its initial position.
        const newPiece = {...piece};
        if(gameState[newPiece.name].length === 3){
          newPiece.moved = true;
          newPiece.location = gameState[newPiece.name].split('_')[0];
          return newPiece;
        };
        newPiece.location= gameState[newPiece.name];
        // Assign the piece to the respective player's id.
        if(newPiece.color === 'white') newPiece.userID = playerW;
        else newPiece.userID = playerB;
        return newPiece;
      });
    this.store.dispatch(StateActions.modifyPieces({pieces:initPiecesState}));

    // Initialize state for turns.
    const {turns} = gameState;
    this.store.dispatch(StateActions.incrementTurn({turns:turns}));
  }

  updateState(gameState:any){
    // Update state for pieces.
    const {pieces} = gameState
    const newPieces = [...pieces]
    .map((piece) =>{
      const newPiece = {...piece};
      return newPiece;
    });
    this.store.dispatch(StateActions.modifyPieces({pieces:newPieces}));

    // Initialize state for turns.
    const {turns} = gameState;
    this.store.dispatch(StateActions.incrementTurn({turns:turns}));
  }

  handleError(err:Error){
    console.error('Server-side error: ', err);
  }

}

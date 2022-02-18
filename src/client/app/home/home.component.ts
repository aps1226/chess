import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { SocketioService } from '../services/socketio.service';
import { AuthService } from '../services/authentication.service';
import { AppState } from '../state/app.state';
import * as StateActions from '../state/state.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  matching:boolean = false;

  constructor(
    private socketService: SocketioService,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  playNewGame(event: MouseEvent){
    event.stopPropagation();
    this.socketService.setupSocketConnection();
    this.matching = true;
    const userName = this.authService.getUserName();
    this.socketService.socket.emit('newGame',userName);
    this.socketService.socket.on('gameData', (gameState) => {
      this.socketService.initializeState(gameState);
      this.router.navigateByUrl('/game');
    });
  }

}

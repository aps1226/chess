import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import { piecesReducer, turnsReducer, boardSquaresReducer, selectionReducer, castleReducer, gameStatusReducer, gameIDReducer } from './state/state.reducer';
import { AppComponent } from './app.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { BoardSquareComponent } from './board-square/board-square.component';
import { BoardPieceComponent } from './board-piece/board-piece.component';
import { PawnService } from './services/pawn.service';
import { RookService } from './services/rook.service';
import { KnightService } from './services/knight.service';
import { BishopService } from './services/bishop.service';
import { QueenService } from './services/queen.service';
import { KingService } from './services/king.service';
import { PieceService } from './services/piece.service';
import { SocketioService } from './services/socketio.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChessBoardComponent,
    BoardSquareComponent,
    BoardPieceComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({
      pieces:piecesReducer,
      turns:turnsReducer,
      boardSquares:boardSquaresReducer,
      gameStatus: gameStatusReducer,
      selection: selectionReducer,
      castle: castleReducer,
      gameID: gameIDReducer
    }),
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    // BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    PawnService,
    RookService,
    KnightService,
    BishopService,
    QueenService,
    KingService,
    PieceService,
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

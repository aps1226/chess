import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { piecesReducer, turnsReducer, boardSquaresReducer, selectionReducer, castleReducer, gameStatusReducer } from './state/state.reducer';
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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ChessBoardComponent,
    BoardSquareComponent,
    BoardPieceComponent,
    LoginComponent,
    RegisterComponent
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
    }),
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [
    PawnService,
    RookService,
    KnightService,
    BishopService,
    QueenService,
    KingService,
    PieceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

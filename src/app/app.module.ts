import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { piecesReducer, turnsReducer, boardSquaresReducer } from './state/state.reducer';
import { AppComponent } from './app.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { BoardSquareComponent } from './board-square/board-square.component';
import { BoardPieceComponent } from './board-piece/board-piece.component';
import { PawnService } from './pawn.service';
import { RookService } from './rook.service';
import { KnightService } from './knight.service';
import { BishopService } from './bishop.service';
import { QueenService } from './queen.service';
import { KingService } from './king.service';

@NgModule({
  declarations: [
    AppComponent,
    ChessBoardComponent,
    BoardSquareComponent,
    BoardPieceComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      pieces:piecesReducer,
      turns:turnsReducer,
      boardSquares:boardSquaresReducer,
    }),
    AppRoutingModule,
    DragDropModule,
  ],
  providers: [
    PawnService,
    RookService,
    KnightService,
    BishopService,
    QueenService,
    KingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

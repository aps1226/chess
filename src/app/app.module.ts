import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { piecesReducer, turnsReducer, boardSquaresReducer, checkReducer, selectionReducer } from './state/state.reducer';
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
      check: checkReducer,
      selection: selectionReducer
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
    KingService,
    PieceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

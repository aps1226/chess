import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { piecesReducer } from './state/pieces.reducer';
import { AppComponent } from './app.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { BoardSquareComponent } from './board-square/board-square.component';
import { BoardPieceComponent } from './board-piece/board-piece.component';


@NgModule({
  declarations: [
    AppComponent,
    ChessBoardComponent,
    BoardSquareComponent,
    BoardPieceComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ pieces: piecesReducer}),
    AppRoutingModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

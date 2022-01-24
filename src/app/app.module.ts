import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

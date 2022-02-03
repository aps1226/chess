import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChessBoardComponent } from './chess-board/chess-board.component';

const routes: Routes = [
  { path: '', component: ChessBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

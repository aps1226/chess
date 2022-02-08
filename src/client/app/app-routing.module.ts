import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent,
    pathMatch: 'full',
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    pathMatch: 'full',
  },
  { 
    path: 'game', 
    component: ChessBoardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

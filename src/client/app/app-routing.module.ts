import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
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
    path: 'home', 
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { 
    path: 'game', 
    component: ChessBoardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnDestroy, AfterViewInit, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { AuthService } from './services/authentication.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  title = 'chess';

  userName!:string;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private observer: BreakpointObserver
  ){
    this.router.events.subscribe((val) =>{
      this.userName = this.authService.getUserName();
    });
  }

  ngOnDestroy(): void {
    this.removeTokenData();
  }

  @HostListener('window:beforeunload',['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    this.removeTokenData();
  }

  removeTokenData(){
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
  }

}

import { AfterViewInit, Component, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { transition, trigger, state, style,animate } from "@angular/animations";

const animationParams = {
  menuWidth: "200px",
  animationStyle: "500ms ease"
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('openClose',[
      state('open', style({
        left: '0px',
      })),
      state('closed', style({
        left:'-200px',
      })),
      transition('open => closed', [
        animate('0.75s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class SidebarComponent {

  @Input('userName') userName:string = '';

  show:boolean = false;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    ) {}

  handleClick(route: string){
    console.log(this.router.url)
    if(this.router.url === `/${route}`) return;
    this.router.navigateByUrl(`/${route}`);
  }

  menuToggle(event: MouseEvent){
    this.show = !this.show;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
     if (!this.elementRef.nativeElement.contains(event.target)) {
      this.show = false;
     }
  }
  
}

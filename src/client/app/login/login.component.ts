import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginService } from '.././services/login.service';

const jwt = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private decodedToken:any;

  constructor(
    private router: Router,
    private loginService: LoginService,
    ) {}

  ngOnInit(): void {
  };

  login(
    userNameOrEmail: string, 
    password: string
    ){
    const data = {
      userName: userNameOrEmail,
      password: password
    };
    this.loginService.postRequest(data).subscribe((data:any) =>{
      this.saveToken(data);
      this.router.navigateByUrl('/home');
    })
  };

  saveToken(data:any){
    const { token }= data;
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
  }

  goToRegister(){
    this.router.navigateByUrl('/register');
  };

}

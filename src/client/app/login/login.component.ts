import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      const { token }= data;
      localStorage.setItem('id_token', token);
    })
  };

  goToRegister(){
    this.router.navigateByUrl('/register');
  };

}

import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RegisterService } from '.././services/register.service';

const jwt = new JwtHelperService();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private decodedToken:any;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    ) { }

  ngOnInit(): void {
  }

  handleClick(
    userName: string,
    email: string,
    password: string,
    confirmedPassword: string
  ){

    const body:any = {
      userName: userName,
      email: email,
      password
    };

    this.registerService.postRequest(body).subscribe((data:any) => {
      this.saveToken(data);
      this.router.navigateByUrl('/home');
    })
  }

  saveToken(data:any){
    const { token }= data;
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
  }

}

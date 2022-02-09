import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) { }

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
      console.log(data);
    })
  }

}


import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    const token = localStorage.getItem('auth_tkn');
    if(!token) return false;
    const payload = atob(token.split('.')[1]);
    const parsedPayload = JSON.parse(payload); 
    return parsedPayload.exp > Date.now() / 1000;
  };

  getUserName(){
    const token = localStorage.getItem('auth_tkn');
    if(!token) return false;
    const payload = atob(token.split('.')[1]);
    const parsedPayload = JSON.parse(payload); 
    return parsedPayload.userName;
  }

  getUserID(){
    const token = localStorage.getItem('auth_tkn');
    if(!token) return false;
    const payload = atob(token.split('.')[1]);
    const parsedPayload = JSON.parse(payload); 
    return parsedPayload.userID;
  }

}
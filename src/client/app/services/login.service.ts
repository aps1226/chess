import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private REST_API_ENDPOINT = "http://localhost:8080/api/users/login";

  constructor(private httpClient: HttpClient) { }

  postRequest(data: any){
    return this.httpClient.post(this.REST_API_ENDPOINT, data);
  }

}
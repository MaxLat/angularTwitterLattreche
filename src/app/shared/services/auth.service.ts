import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUsername: string | undefined;
  private loggedUserMail: string | undefined;
  env = environment;
  isLoginSubject = new BehaviorSubject(false)

  constructor(private httpClient : HttpClient, private router : Router) {
    this.isLoggedIn();
   }

  signup(user : {email : string , username : string , password : string}) : Observable<any>{

    return this.httpClient.post(`${environment.api}/api/signup`, user)
  }

  signin(email : string , password : string) : Observable<any>{

    return this.httpClient.post(`${environment.api}/api/signin`, {email : email , password : password})
  }

  doLoginUser(username: string,email :string, token: string) {
    this.loggedUsername = username;
    this.loggedUserMail = email;
    this.storeToken(token);
    this.isLoginSubject.next(true);
  }

  isLoggedIn() {
    this.isLoginSubject.next(!!this.getJwtToken())
    return !!this.getJwtToken()
    
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  goBackToLogin(){
    this.isLoginSubject.next(false);
    this.removeToken()
    this.router.navigate(['/signin'])
  }

  getUsername() {
    return this.loggedUsername;
  }

  getUserMail() {
    return this.loggedUserMail;
  }


}

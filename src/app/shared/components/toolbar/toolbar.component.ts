import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private _authService : AuthService) { }

  isLogin : boolean = false;
  ngOnInit(): void {

    const observer = {
      next : (isLogin : any) => this.isLogin = isLogin,
    }

    this._authService.isLoginSubject.subscribe(observer);
  }

  onLogout() : void {
    this._authService.goBackToLogin();
  }

}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLogin : boolean = false;
  subscription : Subscription = new Subscription();

  constructor(private _authService : AuthService) { }

  ngOnInit(): void {

    const observer = {
      next : (isLogin : any) => this.isLogin = isLogin,
    }

    this.subscription.add(this._authService.isLoginSubject.subscribe(observer));
  }

  onLogout() : void {
    this._authService.goBackToLogin();
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}

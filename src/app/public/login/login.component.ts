import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interface/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  subscription : Subscription = new Subscription();

  constructor(private fb : FormBuilder, private _authService : AuthService, private _snackbarService : SnackBarService, private router : Router) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() : void {
  
    this.loginForm = this.fb.group(
      {
        email : ['', [Validators.required,Validators.email]],
        password : ['', Validators.required]
      }
    );
  }

  onSubmit() : void {
    
    if(!this.loginForm.valid){
      return;
    }

   const observer = {
      next: (user: User)  => {
        this._authService.doLoginUser(user.username,user.email,user.token!);
        this.router.navigate(['home']);
      },
      error: (err : HttpErrorResponse) => this._snackbarService.showErrorSnackBar(err.error.error)
    };

   this.subscription.add(this._authService.signin(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).subscribe(observer));

  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}

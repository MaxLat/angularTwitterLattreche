import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;

  observer = {
    next: (user: any)  => {
      this._authService.doLoginUser(user.username,user.email,user.token);
      this.router.navigate(['home']);
    },
    error: (err : HttpErrorResponse) => this._snackbarService.showErrorSnackBar(err.error.error)
  };

  constructor(private fb : FormBuilder, private _authService : AuthService, private _snackbarService : SnackBarService, private router : Router) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() : void {
  
    this.loginForm = this.fb.group(
      {
        email : ['', Validators.required],
        password : ['', Validators.required]
      }
    );
  }

  onSubmit() : void {
    
    if(!this.loginForm.valid){
      return;
    }

    this._authService.signin(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).subscribe(this.observer);

  }

}

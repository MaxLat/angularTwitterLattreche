import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm! : FormGroup;
  subscription : Subscription = new Subscription();

  observer = {
    next: (x: any)  => {

      this._snackBarService.showSuccessSnackBar("Compte crée avec succès"),
      this.router.navigate(['/signin']);

    },
    error: (err : HttpErrorResponse) => this._snackBarService.showErrorSnackBar(err.error),
  };

  constructor(private fb : FormBuilder, private _authService : AuthService, private _snackBarService : SnackBarService, private router : Router ) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() : void {
  
    this.registerForm = this.fb.group(
      {
        email : ['', [Validators.required,Validators.email]],
        username : ['',Validators.required],
        password : ['', Validators.required]
      }
    )
  }

  onSubmit() : void {
    
    if(!this.registerForm.valid){
      return;
    }

    this.subscription.add(this._authService.signup(this.registerForm.value).subscribe(this.observer));

  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}

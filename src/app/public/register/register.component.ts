import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm! : FormGroup;

  observer = {
    next: (x: any)  => {

      this._snackBarService.showSuccessSnackBar("Compte crée avec succès"),
      this.router.navigate(['/signin']);

    },
    error: (err : HttpErrorResponse) => this._snackBarService.showErrorSnackBar(err.error.error),
    complete: () => console.log('Observer got a complete notification'),
  };

  constructor(private fb : FormBuilder, private _authService : AuthService, private _snackBarService : SnackBarService, private router : Router ) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() : void {
  
    this.registerForm = this.fb.group(
      {
        email : ['', Validators.required],
        username : ['',Validators.required],
        password : ['', Validators.required]
      }
    )
  }

  onSubmit() : void {
    
    if(!this.registerForm.valid){
      return;
    }

    this._authService.signup(this.registerForm.value).subscribe(this.observer)

  }

}

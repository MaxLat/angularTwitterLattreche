import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DraftingService } from 'src/app/shared/services/drafting.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-drafting',
  templateUrl: './drafting.component.html',
  styleUrls: ['./drafting.component.css']
})
export class DraftingComponent implements OnInit {

  draftForm! : FormGroup;

  observer = {
    next: (user: any)  => this._snackbarService.showSuccessSnackBar('Post bien enregistré') ,
    error: (err : HttpErrorResponse) => this._snackbarService.showErrorSnackBar(err.error),
  };

  constructor(private fb : FormBuilder, private _draftingService : DraftingService, private _snackbarService : SnackBarService, private router : Router) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() : void {
  
    this.draftForm = this.fb.group(
      {
        content : ['', Validators.required],
        img : [null]
      }
    )
  }

  onSubmit() : void {
    
    if(!this.draftForm.valid){
      return;
    }

    const formData = new FormData();
    formData.append("content",this.draftForm.get('content')?.value)
    formData.append('img',this.draftForm.get('img')?.value)
    this._draftingService.createPost(formData).subscribe(this.observer)

  }

}

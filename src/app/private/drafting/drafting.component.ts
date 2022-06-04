import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { DraftingService } from 'src/app/shared/services/drafting.service';
import { PostsService } from 'src/app/shared/services/posts.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-drafting',
  templateUrl: './drafting.component.html',
  styleUrls: ['./drafting.component.css']
})
export class DraftingComponent implements OnInit {

  draftForm! : FormGroup;
  ngForm! : any 
  @ViewChild('fileUpload') fileUpload! : FileUploadComponent

  observer = {
    next: (result: any)  => {
      this._snackbarService.showSuccessSnackBar('Post bien enregistré');
      this.ngForm.resetForm();
      this._postService.reloadPost.next(true);
      this.fileUpload.clearUploader()
    }  ,
    error: (err : HttpErrorResponse) => this._snackbarService.showErrorSnackBar(err.error),
  };

  constructor(private fb : FormBuilder, private _draftingService : DraftingService, private _snackbarService : SnackBarService, private _postService : PostsService) { }

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

  onSubmit(ngForm : any) : void {
    
    if(!this.draftForm.valid){
      return;
    }

    const formData = new FormData();
    formData.append("content",this.draftForm.get('content')?.value)
    formData.append('img',this.draftForm.get('img')?.value)
    this._draftingService.createPost(formData).subscribe(this.observer)
    this.ngForm = ngForm;

  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  postForm! : FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb : FormBuilder, public dialogRef: MatDialogRef<EditDialogComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() : void{

    this.postForm = this.fb.group({
      content : [this.data.post.content,Validators.required],
      img : [this.data.post.imageUrl]
    });

  }

  onSubmit() {

    if(!this.postForm.valid){
      return;
    }

    const formData = new FormData();
    if(this.postForm.get('img')?.value && this.postForm.get('img')?.value instanceof File){
      formData.append('img',this.postForm.get('img')?.value);
    }

    if(this.postForm.get('img')?.value && typeof this.postForm.get('img')?.value === 'string' ){
      formData.append('imageUrl',this.postForm.get('img')?.value);
    }

    formData.append('content',this.postForm.get('content')?.value);
    formData.append('id',this.data.post.id);

    this.dialogRef.close(formData)

  }

}

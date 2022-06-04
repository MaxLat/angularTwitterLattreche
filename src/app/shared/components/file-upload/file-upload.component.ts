import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  
  @ViewChild('fileUpload') fileUploadButton! : ElementRef;
  @Input() formGroup! : FormGroup
  fileName = '';
  preview : string | null = null
  environment = environment.api

  constructor() {}

  onFileSelected(event : any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.preview = reader.result as string
      }
      reader.readAsDataURL(file)
      this.fileName = file.name;
      this.formGroup.get('img')?.setValue(file);
    }
  }

  clearUploader() : void {
    this.fileUploadButton.nativeElement.value = null;
    this.preview = null;
    this.fileName = '';
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  
  @Input() formGroup! : FormGroup
  fileName = '';
  preview : string | null = null
  environment = environment.api

  constructor(private http: HttpClient) {}

  onFileSelected(event : any) {
    const file: File = event.target.files[0];

    console.log(file)

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
}

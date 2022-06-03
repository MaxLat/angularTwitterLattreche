import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DraftingService {

  env = environment
  constructor(private httpClient : HttpClient) { }

  createPost(formData : FormData) : Observable<any>{
    return this.httpClient.post(`${environment.api}/api/createpost`, formData);
  }
}

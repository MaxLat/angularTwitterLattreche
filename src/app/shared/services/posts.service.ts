import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  env = environment;
  reloadPost = new Subject()
  constructor(private httpClient : HttpClient) { }

  getAllPosts() : Observable<any>{
    return this.httpClient.get(`${environment.api}/api/getallposts`);
  }

  getTenPreviousPosts(formData : any | null = null) : Observable<any>{
    return this.httpClient.post(`${environment.api}/api/gettenpreviousposts`, formData);
  }

  getPostFromSpecificUser(formData : any | null = null) : Observable<any>{
    return this.httpClient.post(`${environment.api}/api/getpostsfromspecificuser`, formData);
  }

  deletePost(postId : number) : Observable<any> {
    return this.httpClient.delete(`${environment.api}/api/deletepost/${postId}`);
  }

  updatePost(postUpdated:any) : Observable<any> {
    return this.httpClient.put(`${environment.api}/api/updatepost`,postUpdated);
  }

}

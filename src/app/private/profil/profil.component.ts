import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { POST_FROM_SPECIFIC_USER } from 'src/app/shared/Constant';
import { PostsService } from 'src/app/shared/services/posts.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private _snackbarService : SnackBarService , private _postsService : PostsService, private route: ActivatedRoute, private router : Router ) { }

  posts : Array<any> = [];
  typeTimeline : string = POST_FROM_SPECIFIC_USER;
  username : string | null = null
  ngOnInit(): void {

    
      this.username = this.route.snapshot.paramMap.get('username');
      console.log(this.username);
      if(!this.username){
        return;
      }
      this.loadInitPost(this.username);
  }

  loadInitPost(username:string): void {
    
    const initPostObserver = {
      next: (posts: any) => {
        this.posts = posts;
      },
      error: (err: HttpErrorResponse) => {
        this._snackbarService.showErrorSnackBar(err.error),
        this.router.navigate(['/home']);
      }
    };

    const formData = {
      username : username
    }
    this._postsService.getPostFromSpecificUser(formData).subscribe(initPostObserver);
  }

}

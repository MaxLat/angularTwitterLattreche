import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { POST_FROM_SPECIFIC_USER } from 'src/app/shared/Constant';
import { Post } from 'src/app/shared/interface/post.interface';
import { PostsService } from 'src/app/shared/services/posts.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private _snackbarService : SnackBarService , private _postsService : PostsService, private route: ActivatedRoute, private router : Router ) { }

  posts : Array<Post> = [];
  typeTimeline : string = POST_FROM_SPECIFIC_USER;
  username : string | null = null;
  subscription : Subscription = new Subscription();
  
  ngOnInit(): void {
      this.username = this.route.snapshot.paramMap.get('username');
      if(!this.username){
        return;
      }
      this.loadInitPost(this.username);
  }

  loadInitPost(username:string): void {
    
    const initPostObserver = {
      next: (posts: Array<Post>) => {
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
    this.subscription.add(this._postsService.getPostFromSpecificUser(formData).subscribe(initPostObserver));
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}

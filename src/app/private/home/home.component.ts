import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import {TEN_PREVIOUS_POST} from 'src/app/shared/Constant';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interface/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private _snackbarService : SnackBarService , private _postsService : PostsService ) { }

  posts : Array<Post> = [];
  typeTimeline : string = TEN_PREVIOUS_POST;
  subscription : Subscription = new Subscription();

  ngOnInit(): void {
    this._postsService.reloadPost.subscribe({next : (result : any) => result ?  this.loadInitPost() : null})
    this.loadInitPost();
  }

  loadInitPost(): void {
    const initPostObserver = {
      next: (posts: Array<Post>) => {
        this.posts = posts;
      },
      error: (err: HttpErrorResponse) =>
        this._snackbarService.showErrorSnackBar(err.error),
    };

    this.subscription.add(this._postsService.getTenPreviousPosts().subscribe(initPostObserver));
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}

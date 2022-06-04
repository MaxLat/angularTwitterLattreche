import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import {TEN_PREVIOUS_POST} from 'src/app/shared/Constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _snackbarService : SnackBarService , private _postsService : PostsService ) { }

  posts : Array<any> = [];
  typeTimeline : string = TEN_PREVIOUS_POST;

  ngOnInit(): void {
    this._postsService.reloadPost.subscribe({next : (result : any) => result ?  this.loadInitPost() : null})
    this.loadInitPost();
  }

  loadInitPost(): void {
    const initPostObserver = {
      next: (posts: any) => {
        this.posts = posts;
      },
      error: (err: HttpErrorResponse) =>
        this._snackbarService.showErrorSnackBar(err.error),
    };

    this._postsService.getTenPreviousPosts().subscribe(initPostObserver);
  }

}

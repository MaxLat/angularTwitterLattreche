import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditDialogComponent } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import { RemoveDialogComponent } from 'src/app/shared/components/remove-dialog/remove-dialog.component';
import { POST_FROM_SPECIFIC_USER, TEN_PREVIOUS_POST } from 'src/app/shared/Constant';
import { Post } from 'src/app/shared/interface/post.interface';
import { PostsService } from 'src/app/shared/services/posts.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit, OnDestroy {

  @Input() posts : Array<any> = [];
  @Input() typeTimeline : string ='';
  @Input() username : string | null = null;

  notEmptyPost : boolean = true;
  notscrolly : boolean = true;
  showSpinner : boolean= false;
  subscription : Subscription = new Subscription();

  constructor(
    private _snackbarService: SnackBarService,
    private _postsService: PostsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  loadNextPost(): void {

    if(this.posts.length === 0){
      this.showSpinner = false
      return
    }
    const lastPost = this.posts[this.posts.length - 1];
    const lastPostUpdateDate = lastPost.updatedAt;
    let formData : { previousDate : string , username : string | null} =  {
      previousDate :lastPostUpdateDate,
      username : null
    }
    const nextPostObserver = {
    next: (posts: Array<Post>) => {
        if(posts.length === 0){
          
          this.notEmptyPost === false
        }

        this.showSpinner = false
        this.posts = this.posts.concat(posts);
        this.notscrolly = true;
      },
      error: (err: HttpErrorResponse) =>
        this._snackbarService.showErrorSnackBar(err.error),
    };

    switch (this.typeTimeline) {
      case TEN_PREVIOUS_POST:
        this.subscription.add(this._postsService.getTenPreviousPosts(formData).subscribe(nextPostObserver));
        break;
      case POST_FROM_SPECIFIC_USER : 
        formData.username = this.username
        this.subscription.add(this._postsService.getPostFromSpecificUser(formData).subscribe(nextPostObserver));
        break;
      default:
        break;
    }   
  }

  onScroll(): void {
    if (this.notscrolly && this.notEmptyPost) {
      this.showSpinner = true;
      this.notscrolly = false;
      this.loadNextPost();
    }
  }

  openEditDialog(post : Post) : void {
    const dialogRef = this.dialog.open(EditDialogComponent, {restoreFocus: false , data : { post : post }});
    
    dialogRef.afterClosed().subscribe((postUpdated : Post) => {

      const observer = {
        next: (message: string) => {
          this._snackbarService.showSuccessSnackBar(message);
          this._postsService.reloadPost.next(true);
        },
        error: (err: HttpErrorResponse) =>
          this._snackbarService.showErrorSnackBar(err.error),
      };


      if(postUpdated){
       this.subscription.add(this._postsService.updatePost(postUpdated).subscribe(observer))
      }

    });


  }

  openRemoveDialog(postId : number) : void {

    const dialogRef = this.dialog.open(RemoveDialogComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe((result : any) => {

      const observer = {
        next: (message: string) => {

          const indexOfObject = this.posts.findIndex((post) => {
            return post.id === postId;
          });
          
          if (indexOfObject === -1) {
            this._snackbarService.showErrorSnackBar("une erreur est survenu lors de la suppression");
            return;
          }
          
          this.posts.splice(indexOfObject, 1);
          this._snackbarService.showSuccessSnackBar(message);
        },
        error: (err: HttpErrorResponse) =>
          this._snackbarService.showErrorSnackBar(err.error),
      };

      if(result){
        this.subscription.add(this._postsService.deletePost(postId).subscribe(observer))
      }

    });
  }

  onClickLike() : void {
    this._snackbarService.showSuccessSnackBar("Désolé pas eu le temps de le coder :( ")
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import { RemoveDialogComponent } from 'src/app/shared/components/remove-dialog/remove-dialog.component';
import { POST_FROM_SPECIFIC_USER, TEN_PREVIOUS_POST } from 'src/app/shared/Constant';
import { PostsService } from 'src/app/shared/services/posts.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {

  @Input() posts : Array<any> = [];
  @Input() typeTimeline : string ='';
  @Input() username : string | null = null;

  notEmptyPost : boolean = true;
  notscrolly : boolean = true;
  showSpinner : boolean= false

  constructor(
    private _snackbarService: SnackBarService,
    private _postsService: PostsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  loadNextPost(): void {

    const lastPost = this.posts[this.posts.length - 1];
    const lastPostUpdateDate = lastPost.updatedAt;
    let formData : { previousDate : string , username : string | null} =  {
      previousDate :lastPostUpdateDate,
      username : null
    }
    const nextPostObserver = {
      next: (posts: any) => {
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
        this._postsService.getTenPreviousPosts(formData).subscribe(nextPostObserver);
        break;
      case POST_FROM_SPECIFIC_USER : 
        formData.username = this.username
        this._postsService.getPostFromSpecificUser(formData).subscribe(nextPostObserver);
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

  openEditDialog(post : any) : void {
    console.log(post)
    const dialogRef = this.dialog.open(EditDialogComponent, {restoreFocus: false , data : { post : post }});
    
    dialogRef.afterClosed().subscribe((postUpdated : any) => {

      const observer = {
        next: (message: string) => {

          post.content = postUpdated.content
          this._snackbarService.showSuccessSnackBar(message);
        },
        error: (err: HttpErrorResponse) =>
          this._snackbarService.showErrorSnackBar(err.error),
      };


      if(postUpdated){
        this._postsService.updatePost(postUpdated).subscribe(observer)
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
        this._postsService.deletePost(postId).subscribe(observer)
      }

    });
  }

}

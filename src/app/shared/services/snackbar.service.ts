import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar : MatSnackBar) { }

  showErrorSnackBar(error : string) : void {
    this._snackBar.open(error,'Fermer',{
      panelClass : ['warn-snackbar']
    });
  }

  showSuccessSnackBar(message : string) : void {
    this._snackBar.open(message,'Fermer',{
      panelClass : ['success-snackbar']
    });
  }
}

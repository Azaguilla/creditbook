import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomSnackbarService {
  durationInSeconds = 6;

  constructor(private _snackBar: MatSnackBar) {}

  success(message: string, action = "Fermer") {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar', 'snackbar-success']
    });
  }

  warning(message: string, action = "Fermer") {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar', 'snackbar-warning']
    });
  }

  error(message: string, action = "Fermer") {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar', 'snackbar-error']
    });
  }
}

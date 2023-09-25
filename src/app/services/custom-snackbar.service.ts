import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomSnackbarService {
  durationInSeconds = 6;

  constructor(private _snackBar: MatSnackBar) {}

  success(message: string, action: string) {
    this._snackBar.openFromComponent(CustomSnackbarService, {
      duration: this.durationInSeconds * 1000,
    });
  }

  warning(message: string, action: string) {}

  error(message: string, action: string) {}
}

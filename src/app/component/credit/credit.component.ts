import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
  
})
export class CreditComponent implements OnInit {
  creditNumber!: number;
  faBook = faBook;

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.creditNumber=0;
  }

  onCredit(addedCredit: number){
    this.creditNumber += addedCredit;
  }

  onDebit(removeCredit: number){
    if (this.creditNumber>=removeCredit){
      this.creditNumber -= removeCredit;
    } else {
        this._snackBar.open("Pas assez de crédits !", "Fermer")
    }
  }

}

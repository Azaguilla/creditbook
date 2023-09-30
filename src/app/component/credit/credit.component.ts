import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarService } from 'src/app/services/custom-snackbar.service';


@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
  
})
export class CreditComponent implements OnInit {
  creditNumber!: number;


  constructor(private readonly snackbarService: CustomSnackbarService) {
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
        this.snackbarService.warning("Pas assez de crédits !")
    }
  }

}

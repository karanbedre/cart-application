import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sucess-box',
  templateUrl: './sucess-box.component.html',
  styleUrls: ['./sucess-box.component.scss']
})
export class SucessBoxComponent implements OnInit {

  public quantity: any;
  public cost: any;
  public isData: boolean;
  constructor(public dialogRef: MatDialogRef<SucessBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.totalQuantity > 0) {
      this.isData = true;
      this.quantity = this.data.totalQuantity;
      this.cost = this.data.totalCost;
      console.log(this.cost);
    }
    else {
      this.isData = false;
    }
  }

  removeAlert() {
    this.dialogRef.close();
  }
}

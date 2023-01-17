import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialogRef<ConfirmationComponent> ,
    public matDialog:MatDialog,
  ) { }

  ngOnInit(): void {
  }


  confirm(){
    if(this.data=='insure'){

      console.log(this.data);

       this.dialog.close(true)

    }else{
this.matDialog.closeAll()
}
  }
  close(){

this.dialog.close()

  }
}

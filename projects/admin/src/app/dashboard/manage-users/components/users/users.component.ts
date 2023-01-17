import { TransSenderService } from './../../../../core/trans-sender.service';
import { TranslateService } from '@ngx-translate/core';
import { UsersService, changeStatus } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../tasks-admin/confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource:any = [];
page=1
userFilter:any={username:"",email:""}
totalItems:any
langu:any
  constructor(private usersService:UsersService,
               public dialog: MatDialog,
                public matDialog:MatDialog,
                private toastr:ToastrService,
                private translate:TranslateService,
                private transSender:TransSenderService
    ) { this.getDataFromSubject()
      this.transSender.lang.subscribe((trans)=>{
        this.langu=trans
      }
      )}

  ngOnInit(): void {
    this.getUsers()
  }

getUsers(){
  const MODEL={
    page:this.page,
    limit:10,
    name:'',
      }
      this.usersService.getUserData(MODEL)
}

getDataFromSubject(){
  this.usersService.userData.subscribe((res:any)=>{
this.dataSource=res.data
this.totalItems=res.total
  })
}

changePage(event:any){
this.page=event
this.getUsers()
}

deleteTask(id:any,index:number){
  if(this.dataSource[index].assignedTasks > 0){
    this.toastr.error(this.translate.instant("toaster.CantDelete"))
  }else{
  const dialogRef = this.dialog.open(ConfirmationComponent, {
    width:"750px",
    data:'insure',
    });

    dialogRef.afterClosed().subscribe(result => {
if(result==true){
  this.usersService.deleteUser(id).subscribe(res=>{
    this.toastr.success(this.translate.instant("toaster.deleteSucs"))
  this.page=1
  this.getUsers()

  })
}else{
  this.dialog.closeAll()
}
    })}
}



changeUserStatus(id:string,status:string,index:number){
const MODEL:changeStatus={
  id,
  status,
}
if(this.dataSource[index].assignedTasks > 0){
  this.toastr.error(this.translate.instant("toaster.CantDelete"))
}else{
const dialogRef = this.dialog.open(ConfirmationComponent, {
  width:"750px",
  data:'insure',
  });

  dialogRef.afterClosed().subscribe(result => {
if(result==true){
this.usersService.changeStatus(MODEL).subscribe(res=>{
  this.toastr.success(this.translate.instant("toaster.chanStatSucs"))
  this.page=1
  this.getUsers()
})
}else{
this.dialog.closeAll()
}
  });


}}

}

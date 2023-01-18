import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TransSenderService } from './../../../../core/trans-sender.service';
import { TranslateService } from '@ngx-translate/core';
import { UsersService, changeStatus } from './../../services/users.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../tasks-admin/confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

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
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!:MatSort
page=1
totalItems:any
searchText:any
  constructor(private usersService:UsersService,
               public dialog: MatDialog,
                public matDialog:MatDialog,
                private toastr:ToastrService,
                private translate:TranslateService,
                private transSender:TransSenderService
    ) { this.getDataFromSubject()

      }

  ngOnInit(): void {
    this.getUsers()
  }

getUsers(){
  const MODEL={
    page:this.page,
    // limit:10,
    name:'',
      }
      this.usersService.getUserData(MODEL)
}

getDataFromSubject(){
  this.usersService.userData.subscribe((res:any)=>{
    this.dataSource= new MatTableDataSource(res.data)
    this.dataSource.paginator=this.paginator
    this.dataSource.sort=this.sort
    // this.dataSource= res.data
    // this.dataSource=res.data
    this.totalItems=res.total



  })
}

applyFilter(event:Event){
const filterValue =(event.target as HTMLInputElement).value
this.dataSource.filter=filterValue.trim().toLowerCase()

if(this.dataSource.paginator){
  // this.dataSource.paginator.firstpage()
  this.paginator.pageIndex = 0;

}
}

// changePage(event:any){
// this.page=event
// this.getUsers()
// }

deleteTask(id:any,index:number){
  if(index > 0){
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
if(index > 0){
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

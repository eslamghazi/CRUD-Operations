import { UsersService } from './../../../manage-users/services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
export interface PeriodicElement {
  title: string;
  user: string;
  deadline: Date;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource : any=[] ;
  tasksFilter!:FormGroup
  page:any=1

filteration:any ={
  //for pagenation
  limit:10,
  page:this.page,
}
timeOutId:any
total:any
  users:any = [

  ]

  status:any = [
    {name:this.translate.instant("tasks.Complete")  },
    {name:this.translate.instant("tasks.inComplete") },
  ]
  constructor(
private service:TasksService,
public dialog: MatDialog,
public matDialog:MatDialog,
private toastr:ToastrService,
private translate:TranslateService,
private userService:UsersService

    ) { this.getDataFromSubject()}

ngOnInit(): void {
this.getAllTasks()
this.getUser()

}


getAllTasks() {
this.service.getAllTasks(this.filteration).subscribe((res:any)=>{
 this.dataSource= this.mappingTasks(res.tasks)
//Gather total items with getAllTasks() for pagenation
this.total=res.totalItems
})
  }
///////////// For Returning Users //////////////////////////
getUser(){
  this.userService.getUserData()
}
getDataFromSubject(){
  this.userService.userData.subscribe((res:any)=>{
    this.users =this.usersmapping(res.data)
  })
}

usersmapping(data:any[]){
let newArray = data?.map((item)=>{
return{
  name:item.username,
  id:item._id,
}
})
return newArray
}

///////////// For Returning Users //////////////////////////

search(event:any){
    this.filteration['keyword']=event.value
    clearTimeout(this.timeOutId)
   this.timeOutId= setTimeout(() => {
      this.getAllTasks()
    },2000);
    this.page=1
this.filteration['page']=1
    }

selectUsers(event:any){

this.filteration['userId']=event.value
this.getAllTasks()
this.page=1
this.filteration['page']=1

    }

selectStatus(event:any){

  this.filteration['status']=event.value.trim()
  this.getAllTasks()
  this.page=1
  this.filteration['page']=1
}

selectDate(event:any,type:any){

  this.filteration[type]=moment(event.value).format('DD-MM-YYYY')
  if(type=='toDate'&&this.filteration['toDate']!=='Invalid date'){

    this.getAllTasks()

  }else if(this.filteration['fromDate']=='Invalid date'&&this.filteration['toDate']=='Invalid date'){
    this.filteration['fromDate']=''
    this.filteration['toDate']=''
    this.getAllTasks()
  }

  this.page=1
  this.filteration['page']=1
}
  mappingTasks(data:any[]){
    let newTasks=data.map(item=>{
      return{
       ...item,
        user:item.userId.username

      }

    })


    return newTasks

    }


  addTask(){
      const dialogRef = this.dialog.open(AddTaskComponent, {
      width:"750px",
      disableClose:true
      });

      dialogRef.afterClosed().subscribe(result => {
if(result==true){
  this.getAllTasks()

}
      });
  }


  updateTask(element:any){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:"750px",
      data:element,
      disableClose:true
      });

      dialogRef.afterClosed().subscribe(result => {
  if(result==true){
  this.getAllTasks()

  }
      });
  }

deleteTask(id:any){

  const dialogRef = this.dialog.open(ConfirmationComponent, {
    width:"750px",
    data:'insure',
    });

    dialogRef.afterClosed().subscribe(result => {

if(result==true){


  this.service.deleteTask(id).subscribe(res=>{

    this.getAllTasks()
    this.toastr.success("success","Deleted successfully")
  })

}else{
  this.dialog.closeAll()
}
    });

}


changePage(event:any){
this.page=event
this.filteration['page']=event
this.getAllTasks()
}

}





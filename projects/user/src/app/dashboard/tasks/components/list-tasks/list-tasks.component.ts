import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TasksService } from './../../services/tasks.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { TransSenderService } from 'projects/user/src/app/core/trans-sender.service';


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup
titleFilter:any={title:""}

langu:any

  page:any=1
  userData:any
  selectedStatus:string="In-Progress"
  totalItems:any=0
  filteration:any ={

    //for pagenation (params)
    limit:10,
    page:this.page,
    status:this.selectedStatus
  }
  constructor(public dialog: MatDialog ,
              private fb:FormBuilder,
              private tasksService:TasksService,
              private toastr:ToastrService,
              private transSender:TransSenderService,
              private translate:TranslateService
) {
  this.transSender.lang.subscribe((trans)=>{
  this.langu=trans

  }
  )
 }

  ngOnInit(): void {
    this.createform()
    this.getUsersData()
    this.getAllTasks()

  }



  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }

  getUsersData(){
let token = JSON.stringify(localStorage.getItem('token'))
this.userData=JSON.parse(window.atob(token.split('.')[1]))
console.log(this.userData);

  }

  getAllTasks() {
this.tasksService.getAllTasks(this.userData.userId,this.filteration).subscribe((res:any)=>{
  this.dataSource=res.tasks
  this.totalItems=res.totalItems
console.log(this.dataSource);

}
)

  }
  changePage(event:any){

this.page=event
this.filteration['page']=event
this.getAllTasks()
  }
  complete(ele:any){
const MODEL={
id:ele._id
}
this.tasksService.completeTask(MODEL).subscribe((res)=>{
  this.getAllTasks()
  this.toastr.success(this.translate.instant("toaster.complete"))
},error=>this.dataSource=[])
  }
}

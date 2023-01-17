import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
taskDetails:any
  taskId:any
  constructor(private route:ActivatedRoute,
              private taskService:TasksService,
              private toastr:ToastrService,
              private router:Router,
              private translate:TranslateService) {
                this.route.paramMap.subscribe((res:any)=>{
                  console.log(res);
                  this.taskId = res.params['id']
                })
               }
  ngOnInit(): void {
    this.getTaskDetails()
  }

getTaskDetails(){
this.taskService.taskDetails(this.taskId).subscribe((res:any)=>{
  console.log(res);

  this.taskDetails = res.tasks
})
}
complete(){
  const MODEL={
  id:this.taskId
  }
  this.taskService.completeTask(MODEL).subscribe((res)=>{
    this.router.navigate(['/tasks'])
    this.toastr.success(this.translate.instant("toaster.complete"))
  })
    }

}

import { environment } from './../../../../../../admin/src/environments/environment';
import { CreateTask } from './../context/DTOs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

getAllTasks(filter:any){
  let params=new HttpParams()
  Object.entries(filter).forEach(([key,value]:any)=>{
  if (value) {
  params=params.append(key,value)
  }
  })
    if(filter.keyword){

    }

    return this.http.get(environment.baseApi + '/all-tasks',{params})
  }

  createTask(model:any){
return this.http.post(environment.baseApi + '/add-task',model)

  }

  updateTask(model:any,id:any){
    return this.http.put(environment.baseApi + '/edit-task/'+id,model)

      }

  deleteTask(id:any){
    return this.http.delete(environment.baseApi + '/delete-task/'+id)
  }
}

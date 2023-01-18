import { TranslateService } from '@ngx-translate/core';
import { UsersService } from './../../../manage-users/services/users.service';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder ,
    public dialog: MatDialogRef<AddTaskComponent> ,
    public matDialog:MatDialog,
    private service:TasksService,
    private toastr:ToastrService,
    private usersService:UsersService,
    private translate:TranslateService
    ) { this.getDataFromSubject()}

  users:any = [

  ]
newTaskForm!:FormGroup
fileName=""
formValues:any
  ngOnInit(): void {
    this.createForm()
  }

  async  getFileFromUrl(url:any, name:any, defaultType = 'image/jpg'){
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: data.type || defaultType,
    });
  }



  createForm(){

    this.newTaskForm=this.fb.group({
      title:[this.data?.title||'',[Validators.required,Validators.minLength(5)]],
      userId:[this.data?.userId._id||'',[Validators.required]],
      image:[this.data?.image||''],
      description:[this.data?.description||'',[Validators.required]],
      deadline:[this.data ? new Date (this.data?.deadline.split('-').reverse().join('-')):'',[Validators.required]],
    }
    )
    if(!this.data){
      this.getFileFromUrl('assets/no-photo.jpg', 'no-photo.jpg').then(res=>{
        // `await` can only be used in an async body, but showing it here for simplicity.
        this.newTaskForm.get('image')?.patchValue(res)
      });
    }

    //compare between old and new value
this.formValues=this.newTaskForm.value
  }

///////////// For Returning Users //////////////////////////

  getDataFromSubject(){
    this.usersService.userData.subscribe((res:any)=>{
      this.users =this.usersmapping(res.data)
    })
  }

  usersmapping(data:any[]){
  let newArray=data.map((item)=>{
  return{
    name:item.username,
    id:item._id,
  }
  })
  return newArray
  }

///////////// For Returning Users //////////////////////////

  selectImage(event:any){
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
   this.fileName=event.target.files[0].name
  }

  createTask(){

    let model=this.prepareFormData()

    this.service.createTask(model).subscribe(res=>{
    this.toastr.success(this.translate.instant("toaster.createSucs"))
    this.dialog.close(true)
    })
  }

  updateTask(){

    let model=this.prepareFormData()

    this.service.updateTask(model,this.data._id).subscribe(res=>{
    this.toastr.success(this.translate.instant("toaster.updateSucs"))
    this.dialog.close(true)
    })
  }


  prepareFormData(){
    //set value
    let newData= moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')

    //that will make input be empty every time data sent
    // this.newTaskForm.get('deadline')?.setValue(newData)

    // this.newTaskForm.get('deadline')?.setValue(moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY'))

    //set data in one line

   let formData=new FormData()
 Object.entries(this.newTaskForm.value).forEach(([key,value]:any)=>{
if( key == 'deadline'){
  formData.append(key,newData)

}else{

  formData.append(key,value)
}

 })
 return formData
  }

  close(){
    let hasChanged=false
Object.keys(this.formValues).forEach((item)=>{
  if(this.formValues[item] !== this.newTaskForm.value[item]){
hasChanged=true

  }

})
if (hasChanged) {
  const dialogRef = this.matDialog.open(ConfirmationComponent, {
    width:"750px"
    });

    dialogRef.afterClosed().subscribe(result => {
if(result==true){

}
    })
}else{
  this.dialog.close()
}
  }


}

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Register } from '../../context/DTOs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup

  constructor( private fb:FormBuilder,
    private service:LoginService,
    private toaster:ToastrService,
    private router:Router,
    private translate:TranslateService) { }

    ngOnInit() {
      this.createForm()
    }

    createForm(){
      this.registerForm=this.fb.group({
        username:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        confirmPassword:['',[Validators.required]],
        role:['user']

      },{validators:this.checkPassword})
    }


    createAccount(){
      const MODEL:Register={
        email:this.registerForm.value['email'],
        role:'role',
        username:this.registerForm.value['username'],
        password:this.registerForm.value['password'],
      }

      this.service.register(MODEL).subscribe((res:any)=> {
        localStorage.setItem("token",res.token)
        this.toaster.success(this.translate.instant("toaster.registerSuccess"))
        this.router.navigate(['/tasks'])
      })

      }
checkPassword:ValidatorFn = (group:AbstractControl):ValidationErrors|null=>{
let password=group.get('password')?.value
let confirmPassword=group.get('confirmPassword')?.value
return password===confirmPassword?null:{notSame:true}
}

}

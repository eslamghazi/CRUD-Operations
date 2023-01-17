import { TranslateService } from '@ngx-translate/core';
import { LoginService } from './../../../../../../admin/src/app/auth/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private service:LoginService,
    private toaster:ToastrService,
    private router:Router,
    private translate:TranslateService) { }
loginForm!:FormGroup
  ngOnInit(): void {
    this.createForm()
  }

createForm(){
  this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    role:['admin']
  })
}
login(){
this.service.login(this.loginForm.value).subscribe((res:any)=> {
  localStorage.setItem("token",res.token)
  this.toaster.success(this.translate.instant("toaster.loginSucs"))
  this.router.navigate(['/tasks'])
})

}
}

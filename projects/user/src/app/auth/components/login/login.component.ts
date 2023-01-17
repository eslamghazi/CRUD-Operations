import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit,  Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm!:FormGroup


  constructor(
    private fb:FormBuilder,
    private service:LoginService,
    private toaster:ToastrService,
    private router:Router,
    private translate:TranslateService
  ) { }

  ngOnInit() {
    this.createForm()
  }

  createForm(){
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      role:['user']
    })
  }


  login(){
    this.service.login(this.loginForm.value).subscribe((res:any)=> {
      localStorage.setItem("token",res.token)

      this.toaster.success(this.translate.instant("toaster.loginSuccess"))
      this.router.navigate(['/tasks'])
    })

    }


}

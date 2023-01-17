import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private inject:Injector,
    private router:Router,
    private toastr:ToastrService,
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        let toastr=this.inject.get(ToastrService)
        let translate=this.inject.get(TranslateService)

        if(error.error.message=="jwt malformed" ||
        error.error.message=="invalid token"){
       toastr.error(translate.instant("toaster.notAuth"))
     }else if( error.error.message=="jwt must be provided"||
               error.error.message=="Not Authenticated.."){
     toastr.error(translate.instant("toaster.jwtMus"))
     }else if ( error.error.message=="jwt expired" ){
     toastr.error(translate.instant("toaster.jwtEx"))
     }else if (error.error.message=="No Tasks Found Assgined To This ID...")
     {toastr.error(translate.instant("toaster.noTask"))
    }else{toastr.error(translate.instant("toaster.error"))}

           // this.toastr.error(error.error.message)
           // toastr.error(error.error.message)
       // toastr.error(translate.instant("toaster.error"))


if(error.error.message=="Not Authenticated.." ||
   error.error.message=="jwt expired" ||
   error.error.message=="jwt malformed" ||
   error.error.message=="jwt must be provided"||
   error.error.message=="invalid token" ){
   this.router.navigate(['/login'])
localStorage.removeItem('token')
}
throw error
    })
    );
  }
}

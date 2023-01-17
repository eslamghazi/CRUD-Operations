import { Router } from '@angular/router';
import { TransSenderService } from './core/trans-sender.service';
import { LoginService } from './auth/services/login.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  CurrentYear:any
  constructor(private translate: TranslateService,
    private transSender:TransSenderService,
    private router:Router ) {

 this.transSender.lang.subscribe((trans)=>{
  this.translate.use(trans)
localStorage.setItem('language',trans)
}
)


}
  ngOnInit(): void {

  }

  title = 'angulartasks';

}

// if("language" in localStorage){
//   this.lang=localStorage.getItem('language')
//   this.translate.use(this.lang)
// }else{translate.use(this.translate.defaultLang)}

////////////////Default////////////////////

// this.transSender.lang.subscribe((trans)=>{
//   this.translate.use(trans)
// localStorage.setItem('language',trans)
// }
// )

////////////////modified////////////////////
// curr:any=localStorage.getItem('language')

// if(!('language' in localStorage)){

//   this.transSender.lang.subscribe((trans)=>{
//     this.translate.use(trans)
//     localStorage.setItem('language',trans)

//   })
//     }else{

//       this.transSender.lang.subscribe((trans)=>{
//       this.translate.use(this.curr)
//         localStorage.setItem('language',trans)
//         this.translate.use(trans)


//   })
//     }

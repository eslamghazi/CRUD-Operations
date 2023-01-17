import { TransSenderService } from './../../core/trans-sender.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  {

  lang:any = localStorage.getItem('language')||'en'



  constructor(private translate:TranslateService,
              private transSender:TransSenderService) {


  }

  signOut(){
    localStorage.removeItem('token')
  }
changeLanguage(value:string){

  this.lang=value
  this.transSender.langReceiv(value)

}


}

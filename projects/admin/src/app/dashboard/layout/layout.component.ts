import { TransSenderService } from './../../core/trans-sender.service';
import { BehaviorSubject } from 'rxjs';

import { Component  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})


export class LayoutComponent  {


  lang:string = localStorage.getItem('language')||'en'



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



// changeLanguage(){
//   if(this.lang=='en'){
//     localStorage.setItem('language','ar')
// this.transSender.langReceiv('ar')
//   }else{
//     localStorage.setItem('language','en')
// this.transSender.langReceiv('en')
//   }
//   // window.location.reload()
// }


}

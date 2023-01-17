import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransSenderService {


  lang = new BehaviorSubject(localStorage.getItem('language')||'en')
  constructor(private translate:TranslateService) {


   }
langReceiv(lang:string){
//  lang= this.translate.currentLang

  this.lang.next(lang)
}
}

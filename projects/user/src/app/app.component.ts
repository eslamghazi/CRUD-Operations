import { TransSenderService } from './core/trans-sender.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  CurrentYear:any
  curr:any=localStorage.getItem('language')
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
  this.CurrentYear = new Date().getFullYear()
}

title = 'angulartasks';

}

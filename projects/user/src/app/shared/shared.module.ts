import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  exports:[
    TranslateModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule} from '@ngx-translate/core';
import { FilterPipeModule } from 'ngx-filter-pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend:true
    }),
    FilterPipeModule,
  ],
  exports:[
    TranslateModule
  ]
})
export class SharedModule { }

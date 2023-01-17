import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { FilterPipeModule } from 'ngx-filter-pipe';


@NgModule({
  declarations: [
    ListTasksComponent,
TaskDetailsComponent,
  ],
  imports: [
    MaterialModule,
    FormsModule,

    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FilterPipeModule,
    TasksRoutingModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class TasksModule { }

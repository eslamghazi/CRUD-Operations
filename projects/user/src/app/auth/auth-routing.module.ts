import { PrevuserGuard } from './../core/guards/prevuser.guard';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    canActivate:[PrevuserGuard],
  },
  {
    path:'Register',
    component:RegisterComponent,
    canActivate:[PrevuserGuard],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

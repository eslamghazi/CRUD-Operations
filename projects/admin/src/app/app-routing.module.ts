import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'', redirectTo:"/tasks", pathMatch:'full'

},
  {path:'',
  loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule)
  },

  {path:'',
  loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },

  { path: '**', pathMatch: 'full',
  component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { AuthGuard } from './auth.guard';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UpdateempComponent } from './updateemp/updateemp.component';


const routes: Routes = [
  {
    path:"home",
    component:HomeComponent,canActivate:[AuthGuard]
  },
  {
    path:"AddEmployee",
    component:AddemployeeComponent,canActivate:[AuthGuard]
  },
  {
    path:"EmployeeDetails/:id",
    component:EmployeeDetailsComponent,canActivate:[AuthGuard]
  },
 
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:'',
    redirectTo:"/login",pathMatch:"full"
  },
  {
    path:"**",
    component: NotfoundComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const componentImport=[ HomeComponent,
  NotfoundComponent,
  LoginComponent,AddemployeeComponent,
  UpdateempComponent,EmployeeDetailsComponent];

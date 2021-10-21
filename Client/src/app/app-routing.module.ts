import { NgModule, Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { User } from './_models/user';
import { RouteGuardService } from './authServices/route-guard.service';


const routes: Routes = [
  {
    path: '' ,
    component: HomeComponent 
 },
 {
  path: 'user' ,
  component: RegisterComponent ,
  canActivate : [RouteGuardService],
},
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

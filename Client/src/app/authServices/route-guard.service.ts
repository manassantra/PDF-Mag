import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, } from '@angular/router';
import { User } from '../_models/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  userType: any;
  constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.userType = user.rolename;
    if (this.userType !== 'admin'){
      Swal.fire({
        text: "User don't have access on this page !",
        icon: 'warning'
      }).then((ok) => {
        this.router.navigate(['/']);
      });
    } else 
    return true ;
  }
}
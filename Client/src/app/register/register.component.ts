import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { AccessService } from '../_services/access.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userList: any;
  roleList: any;
  userType: any;
  model: any = {};
  model2: any = {};
  // tslint:disable-next-line:typedef-whitespace
  constructor(public accessService: AccessService, public accountService: AccountService , private router: Router, public http:HttpClient) {  }

  ngOnInit(): void {
    this.getUser();
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.userType = user.rolename;
    //console.log(user);
    this.model.modifiedby = user.username;
    this.model2.modifiedby = user.username;
    this.getUserRole();
  }

  getUser() {
    this.http.get('https://localhost:5001/api/users').subscribe(res=>{
      this.userList = res;
    })
  }
  getUserRole() {
    this.http.get('https://localhost:5001/api/roles').subscribe(res=>{
      this.roleList = res;
    })
  }

  // tslint:disable-next-line:typedef
  register() {
    this.accountService.register(this.model).subscribe(response => {
      Swal.fire({
        text: 'User Added Successfully',
        icon: 'success'
      }).then((ok) => {
        location.reload();
      });
    }, error => {
      console.log(error);
      Swal.fire({
        text: 'Please entered correct details',
        icon: 'warning'
      }).then((ok) => {
        location.reload();
      });
    }); 
  }

  // tslint:disable-next-line:typedef
  addrole() {
     this.accessService.addRole(this.model2).subscribe(response => {
      Swal.fire({
        text: 'New Role Added Successfully',
        icon: 'success'
      }).then((ok) => {
        location.reload();
      });
    }, error => {
      console.log(error);
      Swal.fire({
        text: 'Please entered correct details',
        icon: 'warning'
      }).then((ok) => {
        location.reload();
      });
    }); 
  }

  //
  }

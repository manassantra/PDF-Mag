import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  model: any = {} ;
  //users: any ;

  constructor(private http: HttpClient , public accountService: AccountService) { }

  ngOnInit(): void {
    this.setCurrentUser() ;
  }

  // tslint:disable-next-line:typedef
  login() {
      this.accountService.login(this.model).subscribe(response => {
        console.log(response);
        Swal.fire({
          text: 'Login Successfully',
        });
      }, error => {
        console.log(error);
        Swal.fire({
          title: 'Wrong!',
          text: 'Please check your username or password',
          icon: 'warning'
        });
      });
}

  // tslint:disable-next-line:typedef
  /* getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe((response) => {
      this.users = response ;
    }, (error) => {
      console.log(error);
    });
  } */

// tslint:disable-next-line:typedef
setCurrentUser() {
  const user: User = JSON.parse(localStorage.getItem('user'));
  this.accountService.setCurrentUser(user);
}
}

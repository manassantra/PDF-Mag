import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  today: number = Date.now();
 users: any ;
  constructor(private http: HttpClient, public accountService: AccountService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
    this.users = user.username;
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.accountService.logout();
  }



}

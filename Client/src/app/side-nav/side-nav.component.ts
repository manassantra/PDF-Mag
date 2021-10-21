import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  authGurd = true;
  role: any;
  constructor() { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.role = user.rolename;
    if (this.role == 'user') {
      this.authGurd = false;
    }
  }

}

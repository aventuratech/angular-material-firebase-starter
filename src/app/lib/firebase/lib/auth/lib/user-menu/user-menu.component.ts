import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public user;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.current.subscribe(u => this.user = u);
  }

  signOut() {
    this.userService.signOut().subscribe(() => this.router.navigateByUrl('/'));
  }

}

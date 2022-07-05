import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  subscription: Subscription;
  search: Subscription;
  order: Subscription;

  constructor(private usersService: UsersService) {
    this.subscription = this.usersService.onDelete().subscribe(users => this.users = users);
    this.search = usersService.onSearchUsers().subscribe(users => this.users = users);
    this.order = this.usersService.onChangeSortingOrder().subscribe(users => this.users = users)

   }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

}

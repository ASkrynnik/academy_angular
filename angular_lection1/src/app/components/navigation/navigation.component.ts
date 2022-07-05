import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  subscription: Subscription;
  selectedUsers: User[] = [];
  searchValue: string = '';
  selected!: string;

  constructor(private usersService: UsersService) {
    this.subscription = this.usersService.onSelect().subscribe(users => this.selectedUsers = users);
   }

  ngOnInit(): void {
  }

  deleteUsers() {
    this.usersService.deleteUsers(this.selectedUsers);
  }

  selectAll() {
    this.usersService.selectAll()
  }

  search() {
    this.usersService.searchUsers(this.searchValue)
  }

  sort() {
    this.usersService.changeSortingOrder(this.selected as keyof User)
  }

}

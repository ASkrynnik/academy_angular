import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ApiService } from 'src/app/services/api.service';
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

  constructor(private usersService: UsersService, private apiService: ApiService) {
    this.subscription = this.usersService.onSelect().subscribe(users => this.selectedUsers = users);
   }

  ngOnInit(): void {
  }

  deleteUsers() {
    this.selectedUsers.forEach(user => {
      this.apiService.deleteUser(user);
    })
  }

  selectAll() {
    this.usersService.selectAll()
  }
}

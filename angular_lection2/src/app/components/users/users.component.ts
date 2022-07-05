import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  delete: Subscription;
  add: Subscription;

  constructor(private apiService: ApiService) {
    this.delete = apiService.onDelete().subscribe(deletedUser => {
      this.users = this.users.filter(user => {
        if (user.id !== deletedUser.id) {
          return user;
        } else return;
      } )
    });
    this.add = apiService.onAddUser().subscribe(newUser => {
      this.users.push(newUser);
    })
   }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(users => this.users = users);
  }

}

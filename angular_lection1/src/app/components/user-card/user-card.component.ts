import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/User';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  isChecked: boolean = false;
  subscription!: Subscription;
  
  constructor(private usersService: UsersService) {
    this.subscription = usersService.onSelectAll().subscribe(() => {
      this.isChecked = true
      this.usersService.selectUser(this.user);
    });
   }
  ngOnInit(): void {
  }

  toggleIsSelected() {
    this.usersService.selectUser(this.user);
  }

}

import { Injectable } from '@angular/core';
import { User } from '../User';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private selectedUsers: User[] = [];
  private subject = new Subject<any>();
  private select = new Subject<any>();

  constructor() {  }

  selectAll() {
    this.select.next('');
  }

  onSelectAll(): Observable<any> {
    return this.select.asObservable();
  }

  selectUser(user: User): void {
    if (this.selectedUsers.includes(user)) {
      const index = this.selectedUsers.indexOf(user);
      this.selectedUsers = this.selectedUsers.slice(0, index - 1).concat(this.selectedUsers.slice(index + 1))
    } else {
      this.selectedUsers.push(user);
      this.subject.next(this.selectedUsers);
    }
  }

  onSelect(): Observable<any> {
    return this.subject.asObservable();
  }
}

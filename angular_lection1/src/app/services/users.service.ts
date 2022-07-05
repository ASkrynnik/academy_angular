import { Injectable } from '@angular/core';
import { User } from '../User';
import { usersMock, updateUsers } from './../../db-mock'
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private selectedUsers: User[] = [];
  private subject = new Subject<any>();
  private delete = new Subject<any>();
  private select = new Subject<any>();
  private search = new Subject<any>();
  private order = new Subject<any>();

  constructor() {  }

  getUsers(): Observable<User[]> {
    const users = of(usersMock);
    return users;
  }

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

  deleteUsers(users: User[]): void {
    const updatedUsers = usersMock.filter(user => {
      if (!users.includes(user)) {
        return user
      } else return
    })
    updateUsers(updatedUsers);
    this.delete.next(usersMock);
  }

  onDelete(): Observable<any> {
    return this.delete.asObservable();
  }

  searchUsers(string: string) {
    if (string !== '') {
      const res = usersMock.filter(user => {
        if (user.firstname.includes(string) || user.lastname.includes(string)) {
          return user
        } else return
      })
      this.search.next(res)
    } else this.search.next(usersMock);

  }

  onSearchUsers(): Observable<any> {
    return this.search.asObservable()
  }

  changeSortingOrder(order: keyof User) {
    const res = usersMock.sort((a: User, b: User) => {
      if (a[order] > b[order]) {
        return 1
      } else if (a[order] , b[order]) {
        return -1
      } else return 0
    });
    this.order.next(res);
  }

  onChangeSortingOrder(): Observable<any> {
    return this.order.asObservable();
  }
}

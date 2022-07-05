import { catchError, Observable, Subject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private delete = new Subject<any>();
  private add = new Subject<any>();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  handleErr(e: Error) {
    console.log(e);
  }

  addUser(user: User): void {
    this.http.post<User[]>(this.apiUrl, user, httpOptions)
    .pipe(catchError(err => of(this.handleErr(err))))
    this.add.next(user)
  }

  onAddUser(): Observable<any> {
    return this.add.asObservable()
  }

  deleteUser(user: User): void {
    this.http.delete<User[]>(`${this.apiUrl}/${user.id}`, httpOptions)
      .pipe(catchError(err => of(this.handleErr(err))))
    this.delete.next(user);
  }

  onDelete(): Observable<any> {
    return this.delete.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../interfaces/user.interface';
import { baseURL } from '../utils/baseURL';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = `${baseURL}users`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(tap(() => console.log('Can not get users')));
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(tap((newUser: User) => console.log(`Can not add user ${newUser}`)));
  }
}

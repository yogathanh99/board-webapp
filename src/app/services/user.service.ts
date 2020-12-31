import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../interfaces';
import { baseURL, httpOptions } from '../utils/baseURL';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = `${baseURL}users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(tap(() => console.log('get users')));
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, user, httpOptions)
      .pipe(tap((newUser: User) => console.log(`add user ${newUser}`)));
  }
}

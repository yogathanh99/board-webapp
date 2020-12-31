import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((users: User[]) => (this.users = users));
  }

  add(firstname: string, lastname: string): void {
    if (!firstname || !lastname) {
      return;
    }

    this.userService
      .addUser({ firstname, lastname } as User)
      .subscribe((user: User) => {
        this.users = [...this.users, user];
      });
  }
}

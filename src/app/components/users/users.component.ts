import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[];

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  add(firstname: string, lastname: string): void {
    // name = name.trim();
    if (!firstname || !lastname) {
      return;
    }
    this.userService
      .addUser({ firstname, lastname } as User)
      .subscribe((user) => {
        this.users.push(user);
      });
  }

  delete(user: User): void {
    this.users = this.users.filter((h) => h !== user);
    this.userService.deleteUser(user).subscribe();
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }
}

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
  value = 'Clear me';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }
}

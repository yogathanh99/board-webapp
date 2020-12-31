import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { BoardService } from '../../services/board.service';
import { TaskService } from './../../services/task.service';
import { Board, Task, User } from '../../interfaces';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  boardId: string;
  users: User[];
  tasks: Task[];
  task: Task;
  taskId: string;
  board: Board;
  userJoined: string;
  columns = [
    {
      name: 'TODO',
      value: 'TODO',
      tasks: [],
    },
    {
      name: 'IN PROGRESS',
      value: 'IN_PROGRESS',
      tasks: [],
    },
    {
      name: 'DONE',
      value: 'DONE',
      tasks: [],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private userService: UserService,
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('boardId');
    this.boardService.getBoards().subscribe((boards) => {
      this.board = boards.find((board: Board) => board._id === this.boardId);
    });

    this.getTasks();
    this.task = {
      _id: null,
      title: '',
      status: 'TODO',
      joined: null,
      board: this.board,
    };
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  getTasks(): void {
    this.taskService.getTasks(this.boardId).subscribe((tasks) => {
      this.tasks = tasks;
      this.columns[0].tasks = tasks.filter((task) => task.status === 'TODO');
      this.columns[1].tasks = tasks.filter(
        (task) => task.status === 'IN_PROGRESS'
      );
      this.columns[2].tasks = tasks.filter((task) => task.status === 'DONE');
    });
  }

  add(): void {
    const { title, status } = this.task;
    this.taskService
      .addTask({
        title,
        status,
        board: this.boardId,
      } as Task)
      .subscribe((task) => {
        const index = this.columns.findIndex(
          (column) => column.value === task.status
        );
        this.columns[index].tasks.push(task);
      });
  }

  drop(event: CdkDragDrop<any[]>, name: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const newTasks = event.container.data;
      const newStatus = name;

      newTasks.forEach((task) => {
        const currentStatus = task.status;
        if (currentStatus !== newStatus) {
          this.taskService
            .updateTask({
              ...task,
              status: newStatus,
            })
            .subscribe(() => console.log('updated'));
        }
      });
    }
  }
}

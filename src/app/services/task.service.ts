import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Task, Board } from '../interfaces';
import { baseURL, httpOptions } from './../utils/baseURL';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = `${baseURL}tasks`;
  constructor(private http: HttpClient) {}

  getTasks(boardId: string): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.tasksUrl}?boardId=${boardId}`)
      .pipe(tap(() => console.log('Get tasks')));
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.tasksUrl, task, httpOptions)
      .pipe(
        tap((newTask: Task) => console.log(`Added task id=${newTask._id}`))
      );
  }

  updateTask(task: Task): Observable<any> {
    const url = `${this.tasksUrl}/${task._id}`;
    return this.http
      .put(
        url,
        {
          status: task.status,
          title: task.title,
        },
        httpOptions
      )
      .pipe(tap(() => console.log(`Updated task id=${task._id}`)));
  }
}

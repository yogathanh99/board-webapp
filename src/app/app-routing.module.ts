import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './components/board/board.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/board', pathMatch: 'full' },
  { path: 'board', component: BoardComponent },
  { path: 'board/detail/:id', component: TasksComponent },
  { path: 'task/add/:boardId', component: TaskDetailComponent },
  { path: 'task/edit/:id', component: TaskDetailComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

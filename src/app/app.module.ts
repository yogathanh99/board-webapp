import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { UsersComponent } from './components/users/users.component';
import { BoardDetailComponent } from './components/board/board-detail/board-detail.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    UsersComponent,
    BoardDetailComponent,
    TasksComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

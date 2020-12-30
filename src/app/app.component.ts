import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'board-webapp';
  menu = 'board';
}

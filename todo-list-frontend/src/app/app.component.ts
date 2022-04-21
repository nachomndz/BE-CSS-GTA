import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {Observable} from "rxjs";
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="title">
      <h1>
        A list of TODOs
      </h1>
    </div>
    <div class="list">
      <label for="search">Search...</label>
      <input #inputSearch id="search" type="text" (keyup)="changeFilter(inputSearch.value)">
      <app-progress-bar *ngIf="showProgressBar"></app-progress-bar>
      <app-todo-item *ngFor="let todo of todos$ | async | todofilter: filterText" [item]="todo" (delete)="deleteTodo($event)"></app-todo-item>
      <div *ngIf="message" class="message">{{message}}</div>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  todos$: Observable<Todo[]>;
  showProgressBar: boolean = true;
  filterText: string = '';
  message?: string = undefined;

  constructor(private todoService: TodoService) {
    this.todos$ = todoService.getAll();
    this.todos$.subscribe(() => this.showProgressBar = false)
  }

  deleteTodo(todo: Todo) {
    this.message = 'Borrando...';
    this.todoService.remove(todo.id).subscribe(
      () => {
        this.todos$ = this.todoService.getAll();
        this.message = 'Todo borrado correctamente';
      },
      () => this.message = 'Error al borrar el todo');
  }

  changeFilter(text: string) {
    this.filterText = text;
  }
}

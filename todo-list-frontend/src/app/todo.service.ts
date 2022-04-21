import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

export interface Todo {
  id: number;
  task: string;
  priority: 1 | 2 | 3;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient){}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todos');
  }

  remove(id: number): Observable<void> {
    return this.http.delete<any>(`/api/todos/${id}`);
  }
}

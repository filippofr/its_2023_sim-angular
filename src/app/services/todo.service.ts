import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { User } from '../interfaces/user';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { NewTodo } from '../components/modal-new-todo/modal-new-todo.component';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _items$ = new BehaviorSubject<Todo[]>([]);
  items$ = this._items$.asObservable();

  constructor(private http: HttpClient) { }

  list(showCompleted: Boolean = false) {
    return this.http.get<Todo[]>(`/api/todos/?showCompleted=${showCompleted}`);
  }

  userList() {
    return this.http.get<User[]>(`/api/users`);
  }

  setCompleted(id: string) {
    console.log(`check service, id: ${id}`);
    return this.http.patch<Todo>(`/api/todos/${id}/check`, {});
  }

  setUnCompleted(id: string) {
    console.log(`uncheck service, id: ${id}`);
    return this.http.patch<Todo>(`/api/todos/${id}/uncheck`, {});
  }

  add(newTodo: NewTodo) {
    console.log('newTodo: ');
    console.log(newTodo.dueDate);
    return this.http.post<Todo>('/api/todos', {title: newTodo.title,
                                               assignedTo: newTodo.assignedTo?.id,
                                               dueDate: newTodo.dueDate
    });
  }

  assignTo(idTodo: string, idUser: string){
    return this.http.post<Todo>(`/api/todos/${idTodo}/assign`, {userId: idUser});
  }
}

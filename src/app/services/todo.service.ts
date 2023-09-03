import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { User } from '../interfaces/user';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { NewTodo } from '../components/modal-new-todo/modal-new-todo.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this._todos$.asObservable();

  constructor(private http: HttpClient,
              private authSrv: AuthService
  ) { 
    this.authSrv.currentUser$
    .subscribe(user => {
      if (user) {
        this.list();
      } else {
        this._todos$.next([]);
      }
    })
  }

  list(showCompleted: Boolean = false) {
    this.http.get<Todo[]>(`/api/todos/?showCompleted=${showCompleted}`)
      .subscribe(todos => this._todos$.next(todos));
  }

  setCompleted(id: string) {
    this.http.patch<Todo>(`/api/todos/${id}/check`, {})
      .subscribe(updated => {
        const index = this._todos$.value.findIndex(i => i.id === id);
        const clone = structuredClone(this._todos$.value);
        clone[index] = updated;
        this._todos$.next(clone);
      });
  }

  setUnCompleted(id: string) {
    this.http.patch<Todo>(`/api/todos/${id}/uncheck`, {})
      .subscribe(updated => {
        const index = this._todos$.value.findIndex(i => i.id === id);
        const clone = structuredClone(this._todos$.value);
        clone[index] = updated;
        this._todos$.next(clone);
      });
  }

  add(newTodo: NewTodo) {
    this.http.post<Todo>('/api/todos', {title: newTodo.title,
                                        assignedTo: newTodo.assignedTo?.id,
                                        dueDate: newTodo.dueDate
    })
      .pipe(
        catchError(err => {
          console.error(err);
          return of(null);
        })
      )
      .subscribe(todo => {
        const todos = this._todos$.value;
        if (todo) {
          todos.push(todo);
        }
        this._todos$.next(todos);
      });
  }

  assignTo(idTodo: string, idUser: string){
    this.http.post<Todo>(`/api/todos/${idTodo}/assign`, {userId: idUser})
      .pipe(
        catchError(err => {
          console.error(err);
          return of(null);
        })
      )
      .subscribe(todo => {
        const clone = structuredClone(this._todos$.value);
        if (todo) {
          const index = clone.findIndex(i => i.id === todo.id);
          if (index !== -1) {
            clone[index] = todo;
          }
        }
        this._todos$.next(clone);
      });
  }

  remove(id: string) {
    this.http.delete(`/api/todos/${id}`)
      .subscribe(_ => {
        const clone = structuredClone(this._todos$.value);
        const index = clone.findIndex(item => item.id === id);
        clone.splice(index, 1);
        this._todos$.next(clone);
      })
  }
}

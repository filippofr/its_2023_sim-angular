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
    this.http.patch<Todo>(`/api/todos/${id}/check`, {})
      .subscribe(updated => {
        const index = this._items$.value.findIndex(i => i.id === id);
        const clone = structuredClone(this._items$.value);
        clone[index] = updated;
        this._items$.next(clone);
      });
  }

  setUnCompleted(id: string) {
    this.http.patch<Todo>(`/api/todos/${id}/uncheck`, {})
      .subscribe(updated => {
        const index = this._items$.value.findIndex(i => i.id === id);
        const clone = structuredClone(this._items$.value);
        clone[index] = updated;
        this._items$.next(clone);
      });
  }

  add(newTodo: NewTodo) {
    // this.http.post<Todo>('/api/todos', {title})
    //   .pipe(
    //     catchError(err => {
    //       console.error(err);
    //       return of(null);
    //     })
    //   )
    //   .subscribe(itemTodo => {
    //     const items = this._items$.value;
    //     if (itemTodo) {
    //       const index = items.findIndex(i => i.id === itemTodo.id);
    //       if (index !== -1) {
    //         items[index] = itemTodo;
    //       } else {
    //         items.push(itemTodo);
    //       }
    //     }
    //     this._items$.next(items);
    //   });
    console.log(newTodo);
    return this.http.post<Todo>('/api/todos', {title: newTodo.title});

    // this.apiService.addPerson(this.person)
    // .subscribe(data => {
    //   console.log(data)
    //   this.refreshPeople();
    // })  
  }

  assignTo(idTodo: string, idUser: string){
    const body=JSON.stringify(idUser);
    this.http.post<Todo>(`/api/todos/${idTodo}/assign`, body)
    .pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    )
    .subscribe(itemTodo => {
      const items = this._items$.value;
      if (itemTodo) {
        const index = items.findIndex(i => i.id === itemTodo.id);
        if (index !== -1) {
          items[index] = itemTodo;
        } else {
          items.push(itemTodo);
        }
      }
      this._items$.next(items);
    });
  }
}

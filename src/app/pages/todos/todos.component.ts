import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { omitBy } from 'lodash';
import { BehaviorSubject, Subject, debounceTime, map, takeUntil } from 'rxjs';
import { ModalNewTodoComponent, NewTodo } from 'src/app/components/modal-new-todo/modal-new-todo.component';
import { AssignTodoClass, CheckedTodo } from 'src/app/components/todo-card/todo-card.component';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy{
  private showCompleted$ = new BehaviorSubject<boolean>(false)
  
  // todos$ = this.todoSrv.list(this.showCompleted$.value);
  todos: Todo[] = [];

  constructor(private todoSrv: TodoService,
              public dialog: MatDialog
  ) {}

  private destroyed$ = new Subject<void>();
  ngOnInit(): void {
    this.refreshTodos();
    this.showCompleted$
    .pipe(
      takeUntil(this.destroyed$),
      debounceTime(200)
    )
    .subscribe((value) => {
      console.log('value in todos: ' + value);
      this.refreshTodos(value);
    })
  }

  refreshTodos(showCompleted: boolean = false){
    this.todoSrv.list(showCompleted)
      .subscribe(data => {
      this.todos = data;
     })
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  onSwitchChange($event: any){
    console.log('event value: ' + $event)
    this.showCompleted$.next($event);
    console.log(this.showCompleted$.value);
  }

  addTodo(event: NewTodo) {
    console.log(event);
    this.todoSrv.add(event)
      .subscribe( data => {
        this.refreshTodos(this.showCompleted$.value);
      });
  }

  assignTodo(newAssign: AssignTodoClass) {
    this.todoSrv.assignTo(newAssign.todoId, newAssign.userId)
      .subscribe((data) => {
        this.refreshTodos(this.showCompleted$.value);
      });
  }

  checkTodo(event: CheckedTodo) {
    console.log('value checkBox: ' + event.completed);
    if(event.completed){
      this.todoSrv.setCompleted(event.idTodo)
        .subscribe( data => {
          this.refreshTodos(this.showCompleted$.value);
      });
    } else {
      this.todoSrv.setUnCompleted(event.idTodo)
        .subscribe( data => {
          this.refreshTodos(this.showCompleted$.value);
      });
    }
  }
}

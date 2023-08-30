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
  // private showCompleted$ = new BehaviorSubject<boolean>(false)
  private showCompleted = false;
  
  todosList$ = this.todoSrv.todos$;

  constructor(private todoSrv: TodoService,
              public dialog: MatDialog
  ) {}

  private destroyed$ = new Subject<void>();
  ngOnInit(): void {
    this.refreshTodos(this.showCompleted);
    // this.showCompleted$
    // .pipe(
    //   takeUntil(this.destroyed$),
    //   debounceTime(200)
    // )
    // .subscribe((value) => {
    //   console.log('value in todos: ' + value);
    //   this.refreshTodos(value);
    // })
  }

  refreshTodos(showCompleted: boolean){
    console.log('refresh, value: ' + showCompleted);
    this.todoSrv.list(showCompleted);
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  onSwitchChange($event: any){
    console.log('event value: ' + $event)
    // this.showCompleted$.next($event);
    this.showCompleted = $event;
    console.log('showcompleted: ' + this.showCompleted);

    this.refreshTodos($event);
  }

  addTodo(event: NewTodo) {
    console.log(event);
    this.todoSrv.add(event);
  }

  assignTodo(newAssign: AssignTodoClass) {
    this.todoSrv.assignTo(newAssign.todoId, newAssign.userId);
  }

  checkTodo(event: CheckedTodo) {
    console.log('value checkBox: ' + event.completed);
    if(event.completed){
      this.todoSrv.setCompleted(event.idTodo);
      this.refreshTodos(this.showCompleted);
    } else {
      this.todoSrv.setUnCompleted(event.idTodo);
      this.refreshTodos(this.showCompleted);
    }
    
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { omitBy } from 'lodash';
import { BehaviorSubject, Subject, debounceTime, map, takeUntil } from 'rxjs';
import { ModalNewTodoComponent, NewTodo } from 'src/app/components/modal-new-todo/modal-new-todo.component';
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

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private todoSrv: TodoService,
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
    this.showCompleted$.next($event.target.checked);
    console.log(this.showCompleted$.value);
  }

  addTodo(event: NewTodo) {
    console.log(event);
    this.todoSrv.add(event)
      .subscribe( data => {
        this.refreshTodos(this.showCompleted$.value);
      })
  }

  openDialogNewTodo(): void {
    const dialogRef = this.dialog.open(ModalNewTodoComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.addTodo(result);
    });
  }
}

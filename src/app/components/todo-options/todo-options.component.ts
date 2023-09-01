import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject, debounceTime, takeUntil } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { ModalNewTodoComponent, NewTodo } from '../modal-new-todo/modal-new-todo.component';

@Component({
  selector: 'app-todo-options',
  templateUrl: './todo-options.component.html',
  styleUrls: ['./todo-options.component.css']
})
export class TodoOptionsComponent{

  @Output()
  showCompleted = new EventEmitter<Boolean>();

  @Output()
  newTodoEvent = new EventEmitter<NewTodo>();



  private showCompleted$ = new BehaviorSubject<boolean>(false)

  constructor(
    public dialog: MatDialog
  ){}


  onSwitchChange($event: any){
    this.showCompleted.emit($event.target.checked);
  }

  addTodo(value: NewTodo) {
    this.newTodoEvent.emit(value);
  }

  openDialogNewTodo(): void {
    const dialogRef = this.dialog.open(ModalNewTodoComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addTodo(result);
      }
    });
  }
}

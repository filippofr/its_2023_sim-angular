import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';
import { ModalAssignComponent } from '../modal-assign/modal-assign.component';
import { User } from 'src/app/interfaces/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodosComponent } from 'src/app/pages/todos/todos.component';
import { BehaviorSubject } from 'rxjs';

export interface CheckedTodo {
  idTodo: string;
  completed: boolean;
}

export interface AssignTodoClass {
  todoId: string;
  userId: string;
}

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent{

  @Input()
  todo!: Todo;

  @Output()
  check = new EventEmitter<CheckedTodo>();

  @Output()
  assign = new EventEmitter<AssignTodoClass>();

  constructor(
    public dialog: MatDialog,
    private todos: TodosComponent
  ) {}

  openDialogAssign(): void {
    const dialogRef = this.dialog.open(ModalAssignComponent);  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.assign.emit({todoId: this.todo.id, userId: result.id});
      }
    });
  }

  setCheckBox(event: any) {
    this.check.emit({idTodo: this.todo.id, completed: event.target.checked});
  }

}

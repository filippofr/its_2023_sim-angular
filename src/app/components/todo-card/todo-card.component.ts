import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from 'src/app/interfaces/todo';
import { ModalAssignComponent } from '../modal-assign/modal-assign.component';

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
    public dialog: MatDialog
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

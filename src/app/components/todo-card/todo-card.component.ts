import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from 'src/app/interfaces/todo';
import { ModalAssignComponent } from '../modal-assign/modal-assign.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { trigger, transition, style, animate } from '@angular/animations';

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
  styleUrls: ['./todo-card.component.css'],
  animations: [
    trigger('deleteTrigger', [
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class TodoCardComponent{

  currentUser!: User;
  isShown = true;

  @Input()
  todo!: Todo;

  @Input()
  statusDelete!: boolean;

  @Output()
  check = new EventEmitter<CheckedTodo>();

  @Output()
  assign = new EventEmitter<AssignTodoClass>();

  @Output()
  delete = new EventEmitter<string>();


  constructor(
    public dialog: MatDialog,
    authSrv: AuthService
  ) {
    authSrv.currentUser$.subscribe( user => {
      if(user){
        this.currentUser = user;
      }
    })
  }

  openDialogAssign(): void {
    const dialogRef = this.dialog.open(ModalAssignComponent);  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.assign.emit({todoId: this.todo.id, userId: result.id});
      }
    });
  }

  setCheckBox(event: any) {
    this.check.emit({idTodo: this.todo.id, completed: event.target.checked});
  }

  deleteTodo(event: any){
    this.isShown = !this.isShown
  }

  onDeleteAnimationEnd() {
    if (!this.isShown) {
      this.delete.emit(this.todo.id);
    }
  }  

}

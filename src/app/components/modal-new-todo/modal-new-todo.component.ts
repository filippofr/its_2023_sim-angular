import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Todo } from 'src/app/interfaces/todo';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ModalAssignComponent } from '../modal-assign/modal-assign.component';
import { TodoService } from 'src/app/services/todo.service';
import { User } from 'src/app/interfaces/user';

export interface NewTodo {
  title: string;
  assignedTo?: User;
  dueDate?: Date;  
}


@Component({
  selector: 'app-modal-new-todo',
  templateUrl: './modal-new-todo.component.html',
  styleUrls: ['./modal-new-todo.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    MatDatepickerModule, 
    MatNativeDateModule
  ]
})
export class ModalNewTodoComponent {
  quantityInput = new FormControl({validators: [Validators.required]});

  @Output()
  add = new EventEmitter<NewTodo>();

  constructor(
    public dialogRef: MatDialogRef<ModalNewTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewTodo,
    public dialog: MatDialog,
    private todoSrv: TodoService
  ) {}

  openDialogAssign(): void {
    const dialogRef = this.dialog.open(ModalAssignComponent);    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onAdd() {
    this.add.emit({
      title: this.data.title, 
      assignedTo: this.data.assignedTo,
      dueDate: this.data.dueDate
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

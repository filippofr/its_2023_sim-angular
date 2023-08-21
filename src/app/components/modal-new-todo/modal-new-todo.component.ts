import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ModalAssignComponent } from '../modal-assign/modal-assign.component';
import { User } from 'src/app/interfaces/user';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';

export interface NewTodo {
  title: string;
  assignedTo?: User;
  dueDate?: string;  
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
    MatNativeDateModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule
  ]
})
export class ModalNewTodoComponent implements OnInit, OnDestroy {
  newTodoForm = this.fb.group({
    title: ['', {validators: Validators.required}],
    dueDate: ['']
  })

  newTodoErr = "";

  user!: User;
  dueDate!: Date;

  private destroyed$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<ModalNewTodoComponent>,
    @Inject(MAT_DIALOG_DATA) private dataNewTodo: NewTodo,
    public dialog: MatDialog,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newTodoForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.newTodoErr = '';
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  openDialogAssign(): void {
    const dialogRef = this.dialog.open(ModalAssignComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.user = result;
      }
    });
  }

  newTodo() {
    if(this.newTodoForm.valid){
      const { title, dueDate } = this.newTodoForm.value;
      this.dataNewTodo.title = title!
      this.dataNewTodo.assignedTo = this.user;
      if(dueDate) {
        this.dataNewTodo.dueDate = this.formatDate(dueDate);
      }

      this.dialogRef.close(this.dataNewTodo);
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  formatDate(date: string) {
    const stringified = JSON.stringify(date);
    return stringified.substring(1, 11);
  }
}

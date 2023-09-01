import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ModalAssignComponent } from '../modal-assign/modal-assign.component';
import { User } from 'src/app/interfaces/user';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { Subject, takeUntil } from 'rxjs';
import { NgbTimepickerModule, NgbTimeStruct  } from '@ng-bootstrap/ng-bootstrap';
import { dateTimeValidator } from 'src/app/services/datetime-validator';

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
    MatNativeDateModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule,
    NgbTimepickerModule
  ]
})
export class ModalNewTodoComponent implements OnInit, OnDestroy {
  newTodoForm = this.fb.group({
    title: this.fb.control<string|null>('', {validators: Validators.required}),
    dueDate: this.fb.control<Date|null>(null),
    dueTime: this.fb.control<NgbTimeStruct|null>({hour: 0, minute: 0, second: 0})
  }, {
    validators: [dateTimeValidator()]
  })

  newTodoErr = "";

  user!: User;
  

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
      if(result) {
        this.user = result;
      }
    });
  }

  newTodo() {
    if(this.newTodoForm.valid){
      const { title, dueDate, dueTime } = this.newTodoForm.value;
      this.dataNewTodo.title = title!
      this.dataNewTodo.assignedTo = this.user;
      if(dueDate) {
        dueDate?.setHours(dueTime?.hour!);
        dueDate?.setMinutes(dueTime?.minute!);
        this.dataNewTodo.dueDate = dueDate;
      }

      this.dialogRef.close(this.dataNewTodo);
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

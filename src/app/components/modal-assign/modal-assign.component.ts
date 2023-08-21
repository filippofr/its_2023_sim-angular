import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import {MatListModule} from '@angular/material/list';
import { TodoService } from 'src/app/services/todo.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-modal-assign',
  templateUrl: './modal-assign.component.html',
  styleUrls: ['./modal-assign.component.css'],
  standalone: true, 
  imports: [
    MatListModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule, 
    MatFormFieldModule,
    FormsModule
  ]
})
export class ModalAssignComponent{

  users = this.userSrv.userList()

  constructor(
    public dialogRef: MatDialogRef<ModalAssignComponent>,
    private userSrv: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: {userId: string}
  ) {}


  onCloseClick(): void {
    this.dialogRef.close();
  }
}

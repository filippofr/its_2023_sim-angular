import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from 'src/app/services/user.service';


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

  users = this.userSrv.userList();

  constructor(
    public dialogRef: MatDialogRef<ModalAssignComponent>,
    private userSrv: UserService
  ) {}


  onCloseClick(): void {
    this.dialogRef.close();
  }
}

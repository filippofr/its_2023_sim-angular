import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';
import { ModalAssignComponent } from '../modal-assign/modal-assign.component';
import { User } from 'src/app/interfaces/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit{

  @Input()
  todo!: Todo;
  

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
  }

  openDialogAssign(): void {
    const dialogRef = this.dialog.open(ModalAssignComponent, {
      data: {idTodo: this.todo.id}
    });  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

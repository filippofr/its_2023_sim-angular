import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTodo } from 'src/app/components/modal-new-todo/modal-new-todo.component';
import { AssignTodoClass, CheckedTodo } from 'src/app/components/todo-card/todo-card.component';
import { User } from 'src/app/interfaces/user';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent{
  private showCompleted = false;
  statusDelete = false;
  
  todosList$ = this.todoSrv.todos$;

  constructor(private todoSrv: TodoService,
              public dialog: MatDialog
  ) {}

  refreshTodos(showCompleted: boolean){
    this.todoSrv.list(showCompleted);
  }

  onSwitchChange($event: any){
    this.showCompleted = $event;
    this.refreshTodos($event);
  }

  onSwitchDeleteChange($event: any){
    this.statusDelete = $event;
  }

  addTodo(event: NewTodo) {
    this.todoSrv.add(event);
  }

  assignTodo(newAssign: AssignTodoClass) {
    this.todoSrv.assignTo(newAssign.todoId, newAssign.userId);
  }

  checkTodo(event: CheckedTodo) {
    if(event.completed){
      this.todoSrv.setCompleted(event.idTodo);
    } else {
      this.todoSrv.setUnCompleted(event.idTodo);
    }
  }

  deleteTodo(event: string) {
    this.todoSrv.remove(event);
  }
}

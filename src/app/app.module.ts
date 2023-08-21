import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { TodosComponent } from './pages/todos/todos.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModalAssignComponent } from './components/modal-assign/modal-assign.component';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ModalNewTodoComponent } from './components/modal-new-todo/modal-new-todo.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { TodoOptionsComponent } from './components/todo-options/todo-options.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IfAuthenticatedDirective,
    NavUserComponent,
    TodosComponent,
    TodoCardComponent,
    TodoOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatListModule,
    MatFormFieldModule,
    CommonModule,
    ModalAssignComponent,
    ModalNewTodoComponent,
    NgxMatTimepickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IfAuthenticatedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    CurrencyPipe
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }

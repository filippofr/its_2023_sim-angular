import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent {
  @Input()
  user: User | null = null;

  @Output('logout')
  logoutEvent = new EventEmitter<void>();

  logout() {
    this.logoutEvent.emit();
  }
}

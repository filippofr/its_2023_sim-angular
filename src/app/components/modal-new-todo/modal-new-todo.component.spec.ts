import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewTodoComponent } from './modal-new-todo.component';

describe('ModalNewTodoComponent', () => {
  let component: ModalNewTodoComponent;
  let fixture: ComponentFixture<ModalNewTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalNewTodoComponent]
    });
    fixture = TestBed.createComponent(ModalNewTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

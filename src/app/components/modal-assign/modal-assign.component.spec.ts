import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignComponent } from './modal-assign.component';

describe('ModalAssignComponent', () => {
  let component: ModalAssignComponent;
  let fixture: ComponentFixture<ModalAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAssignComponent]
    });
    fixture = TestBed.createComponent(ModalAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

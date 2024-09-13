import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDetailFormComponent } from './generic-detail-form.component';

describe('GenericDetailFormComponent', () => {
  let component: GenericDetailFormComponent;
  let fixture: ComponentFixture<GenericDetailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericDetailFormComponent]
    });
    fixture = TestBed.createComponent(GenericDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

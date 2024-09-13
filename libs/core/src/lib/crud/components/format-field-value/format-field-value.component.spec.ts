import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatFieldValueComponent } from './format-field-value.component';

describe('FormatFieldValueComponent', () => {
  let component: FormatFieldValueComponent;
  let fixture: ComponentFixture<FormatFieldValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormatFieldValueComponent]
    });
    fixture = TestBed.createComponent(FormatFieldValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

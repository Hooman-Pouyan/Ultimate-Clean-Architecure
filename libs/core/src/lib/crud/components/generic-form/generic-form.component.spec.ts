import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFormComponent } from './generic-form.component';

describe('CoreFormComponent', () => {
  let component: CoreFormComponent;
  let fixture: ComponentFixture<CoreFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreFormComponent]
    });
    fixture = TestBed.createComponent(CoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

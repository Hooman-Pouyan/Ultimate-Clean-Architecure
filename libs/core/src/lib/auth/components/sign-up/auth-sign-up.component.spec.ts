import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignUpComponent } from './auth-sign-up.component';

describe('SignUpComponent', () => {
  let component: AuthSignUpComponent;
  let fixture: ComponentFixture<AuthSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthSignUpComponent]
    });
    fixture = TestBed.createComponent(AuthSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

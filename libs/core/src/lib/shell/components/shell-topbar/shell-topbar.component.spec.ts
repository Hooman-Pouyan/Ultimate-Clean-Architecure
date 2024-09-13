import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellTopbarComponent } from './shell-topbar.component';

describe('TopbarComponent', () => {
  let component: ShellTopbarComponent;
  let fixture: ComponentFixture<ShellTopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellTopbarComponent]
    });
    fixture = TestBed.createComponent(ShellTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

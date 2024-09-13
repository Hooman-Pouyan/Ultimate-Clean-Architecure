import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellNavComponent } from './shell-nav.component';

describe('SidebarComponent', () => {
  let component: ShellNavComponent;
  let fixture: ComponentFixture<ShellNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellNavComponent]
    });
    fixture = TestBed.createComponent(ShellNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

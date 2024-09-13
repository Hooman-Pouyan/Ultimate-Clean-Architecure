import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellToolbarComponent } from './shell-toolbar.component';

describe('ToolbarComponent', () => {
  let component: ShellToolbarComponent;
  let fixture: ComponentFixture<ShellToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellToolbarComponent]
    });
    fixture = TestBed.createComponent(ShellToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

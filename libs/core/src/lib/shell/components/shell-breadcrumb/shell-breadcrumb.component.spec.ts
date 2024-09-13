import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellBreadcrumbComponent } from './shell-breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: ShellBreadcrumbComponent;
  let fixture: ComponentFixture<ShellBreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellBreadcrumbComponent]
    });
    fixture = TestBed.createComponent(ShellBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

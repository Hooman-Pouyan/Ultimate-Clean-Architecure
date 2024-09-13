import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellComponent } from './shell.component';

describe('NavComponent', () => {
  let component: SellComponent;
  let fixture: ComponentFixture<SellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellComponent]
    });
    fixture = TestBed.createComponent(SellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

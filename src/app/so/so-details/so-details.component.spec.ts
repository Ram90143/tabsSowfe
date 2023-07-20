import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoDetailsComponent } from './so-details.component';

describe('SoDetailsComponent', () => {
  let component: SoDetailsComponent;
  let fixture: ComponentFixture<SoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoDetailsComponent]
    });
    fixture = TestBed.createComponent(SoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

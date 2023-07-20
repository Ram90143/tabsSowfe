import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoListComponent } from './so-list.component';

describe('SoListComponent', () => {
  let component: SoListComponent;
  let fixture: ComponentFixture<SoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoListComponent]
    });
    fixture = TestBed.createComponent(SoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

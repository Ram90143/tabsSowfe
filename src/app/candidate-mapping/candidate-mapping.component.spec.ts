import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMappingComponent } from './candidate-mapping.component';

describe('CandidateMappingComponent', () => {
  let component: CandidateMappingComponent;
  let fixture: ComponentFixture<CandidateMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateMappingComponent]
    });
    fixture = TestBed.createComponent(CandidateMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

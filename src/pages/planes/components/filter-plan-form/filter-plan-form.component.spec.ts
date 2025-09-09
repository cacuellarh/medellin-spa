import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPlanFormComponent } from './filter-plan-form.component';

describe('FilterPlanFormComponent', () => {
  let component: FilterPlanFormComponent;
  let fixture: ComponentFixture<FilterPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPlanFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

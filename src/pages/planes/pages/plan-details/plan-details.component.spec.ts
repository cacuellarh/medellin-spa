import { TEST_PROVIDERS } from '../../../../test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetailsComponent } from './plan-details.component';

describe('PlanDetailsComponent', () => {
  let component: PlanDetailsComponent;
  let fixture: ComponentFixture<PlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDetailsComponent],
      providers: TEST_PROVIDERS,
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

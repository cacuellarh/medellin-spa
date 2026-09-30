import { TEST_PROVIDERS } from '../../test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesComponent } from './planes.component';

describe('PlanesComponent', () => {
  let component: PlanesComponent;
  let fixture: ComponentFixture<PlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesComponent],
      providers: TEST_PROVIDERS,
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

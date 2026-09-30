import { TEST_PROVIDERS } from '../../test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryComponent } from './galery.component';

describe('GaleryComponent', () => {
  let component: GaleryComponent;
  let fixture: ComponentFixture<GaleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleryComponent],
      providers: TEST_PROVIDERS,
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

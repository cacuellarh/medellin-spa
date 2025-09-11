import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappApiComponent } from './whatsapp-api.component';

describe('WhatsappApiComponent', () => {
  let component: WhatsappApiComponent;
  let fixture: ComponentFixture<WhatsappApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

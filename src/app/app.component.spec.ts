import { TEST_PROVIDERS } from '../test-providers';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WHATSAPP_URL } from './site.config';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: TEST_PROVIDERS,
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'medellin-spa' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('medellin-spa');
  });

  it('should render the WhatsApp button and keep the promo popup closed on first render', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('cc-whatsapp-button a')?.getAttribute('href')).toBe(WHATSAPP_URL);
    // El popup se abre solo en el navegador después de unos segundos, no en el HTML inicial.
    expect(compiled.querySelector('cc-promo-modal .cc-modal')).toBeNull();
  });

  it('should toggle the mobile menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[aria-controls=menu-movil]') as HTMLButtonElement;
    expect(button.getAttribute('aria-expanded')).toBe('false');
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(compiled.querySelector('#menu-movil')).not.toBeNull();
  });
});

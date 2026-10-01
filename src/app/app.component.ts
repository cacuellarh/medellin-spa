import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IsActiveMatchOptions, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, filter, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  ButtonComponent,
  isPromoRunning,
  PromoConfig,
  promoRememberKey,
  PromoModalComponent,
  SocialLinksComponent,
  WhatsappButtonComponent,
  whatsappUrl,
} from '@c-code/c-code-fw/ui';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { NAV_LINKS } from './nav-links';
import { CONTACT, SOCIAL_LINKS, WHATSAPP_PHONE, WHATSAPP_URL } from './site.config';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
    WhatsappButtonComponent,
    PromoModalComponent,
    SocialLinksComponent,
    SiteFooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'medellin-spa';
  readonly whatsappUrl = WHATSAPP_URL;
  readonly contact = CONTACT;
  readonly socialLinks = SOCIAL_LINKS;
  /** The popup as edited in the CMS (`assets/data/promo.json`, written before the build). */
  private readonly promoConfig = toSignal(
    inject(HttpClient).get<PromoConfig>('assets/data/promo.json').pipe(catchError(() => of(null))),
    { initialValue: null }
  );
  /** The popup when it should show today: switched on, with an image and inside its dates. */
  readonly promo = computed(() => {
    const promo = this.promoConfig();
    if (!promo || !isPromoRunning(promo)) return null;
    return {
      ...promo,
      rememberKey: promoRememberKey(promo),
      whatsappUrl: promo.message ? whatsappUrl(WHATSAPP_PHONE, promo.message) : WHATSAPP_URL,
    };
  });
  readonly navLinks = NAV_LINKS;
  readonly menuOpen = signal(false);
  /** Inicio, Horarios y Ubicación comparten la ruta "/": se distinguen por el fragmento. */
  readonly exactMatch: IsActiveMatchOptions = { paths: 'exact', fragment: 'exact', queryParams: 'ignored', matrixParams: 'ignored' };
  readonly prefixMatch: IsActiveMatchOptions = { paths: 'subset', fragment: 'ignored', queryParams: 'ignored', matrixParams: 'ignored' };

  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  /** The plan details page has its own booking bar, so the floating button would cover it. */
  readonly showFloatingWhatsapp = computed(() => !/^\/planes\/[^/?#]+/.test(this.url()));

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}

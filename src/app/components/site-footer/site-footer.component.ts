import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialLinksComponent, whatsappUrl } from '@c-code/c-code-fw/ui';
import { NAV_LINKS } from '../../nav-links';
import { CONTACT, SOCIAL_LINKS } from '../../site.config';

/** Pie de página común: contacto, horario, navegación y redes. */
@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, SocialLinksComponent],
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {
  readonly contact = CONTACT;
  readonly socialLinks = SOCIAL_LINKS;
  readonly navLinks = NAV_LINKS;
  readonly year = new Date().getFullYear();

  phoneHref(phone: { value: string; whatsapp: boolean }): string {
    return phone.whatsapp ? whatsappUrl(phone.value) : `tel:+${phone.value}`;
  }
}

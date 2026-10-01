import { formatPrice, Plan, SocialLink, titleCase, whatsappUrl } from '@c-code/c-code-fw/ui';

/** Datos del sitio que usan varias páginas. Cambia aquí teléfonos, horarios o redes. */
export const SITE_URL = 'https://www.laurelspamedellin.com';
export const SITE_NAME = 'Laurel Spa Medellín';
export const DEFAULT_SEO_IMAGE = '/assets/images/8.jpeg';

/** Número principal de WhatsApp, con código de país. */
export const WHATSAPP_PHONE = '573104948884';

export const CONTACT = {
  /** Teléfonos visibles; `whatsapp` indica si el número recibe chats. */
  phones: [
    { label: '310 494 8884', value: '573104948884', whatsapp: true },
    { label: '322 747 6900', value: '573227476900', whatsapp: true },
    { label: '604 505 6050', value: '576045056050', whatsapp: false },
  ],
  email: 'laurelsparelajacion@gmail.com',
  address: 'Carrera 82A # 37B-5, Simón Bolívar, Medellín',
  hours: 'Lunes a domingo y festivos, 8:00 a. m. – 9:00 p. m.',
  hoursShort: 'Todos los días · 8 a. m. – 9 p. m.',
  mapsUrl: 'https://maps.google.com/?q=Carrera+82A+%2337B-5,+Sim%C3%B3n+Bol%C3%ADvar,+Medell%C3%ADn',
};

export const SOCIAL_LINKS: SocialLink[] = [
  { href: 'https://www.facebook.com/laurelspamed/', iconSrc: 'assets/images/face.png', label: 'Facebook de Laurel Spa' },
  { href: 'https://www.instagram.com/laurelspamed/', iconSrc: 'assets/images/ig.png', label: 'Instagram de Laurel Spa' },
];

/** Enlace general de WhatsApp: barra superior, botón flotante y home. */
export const WHATSAPP_URL = whatsappUrl(
  WHATSAPP_PHONE,
  'Hola Laurel Spa. Necesito más información sobre Somos Laurel Spa Medellin Colombia'
);

/** WhatsApp con el plan elegido, para que el spa no tenga que preguntar cuál es. */
export function planWhatsappUrl(plan: Plan): string {
  return whatsappUrl(
    WHATSAPP_PHONE,
    `Hola Laurel Spa, quiero reservar el ${titleCase(plan.name)} (${formatPrice(plan.price)}). ¿Qué disponibilidad tienen?`
  );
}


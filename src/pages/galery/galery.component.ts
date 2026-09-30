import { Component, inject } from '@angular/core';
import { GalleryComponent, GalleryImage, PageBannerComponent, SeoService } from '@c-code/c-code-fw/ui';

/** Leyendas de las fotos de assets/images/galery/<n>.jpeg, en orden. */
const CAPTIONS = [
  'Amigas brindando en el jacuzzi con espuma',
  'Chocolaterapia en espalda',
  'Relajación en el jacuzzi con cascada',
  'Masaje relajante con velas',
  'Pareja brindando con vino en la sala de descanso',
  'Brindis de pareja con copas de vino',
  'Masaje en pareja con dos terapeutas',
  'Ritual de vela caliente para pareja',
  'Bambuterapia para pareja',
  'Chocolaterapia en pareja',
  'Pareja en el jacuzzi con espuma y vino',
  'Sauna para dos',
  'Brindis con champaña en el jacuzzi',
  'Celebración grupal en el jacuzzi con espuma',
  'Pareja con copas de vino junto al jacuzzi',
  'Pareja en la piscina climatizada',
  'Pareja en batas de baño en la zona húmeda',
  'Brindis junto al jacuzzi con espuma',
];

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [GalleryComponent, PageBannerComponent],
  templateUrl: './galery.component.html',
})
export class GaleryComponent {
  private seo: SeoService = inject(SeoService);

  public images: GalleryImage[] = CAPTIONS.map((caption, i) => ({
    src: `assets/images/galery/${i + 1}.jpeg`,
    caption,
    alt: `${caption} en Laurel Spa Medellín`,
  }));

  ngOnInit(): void {
    this.seo.update({
      title: 'Galería de fotos: jacuzzi, sauna y cabinas de masaje | Laurel Spa Medellín',
      description:
        'Mira las instalaciones de Laurel Spa en Medellín: jacuzzi privado, sauna, cabinas de masaje y espacios decorados para parejas y grupos.',
      path: '/galeria',
    });
  }
}

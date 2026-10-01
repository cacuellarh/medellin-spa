import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { GalleryComponent, GalleryImage, PageBannerComponent, SeoService } from '@c-code/c-code-fw/ui';

/** Photos and captions come from the CMS (`assets/data/gallery.json`, written before the build). */
@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [GalleryComponent, PageBannerComponent],
  templateUrl: './galery.component.html',
})
export class GaleryComponent {
  private seo: SeoService = inject(SeoService);

  readonly images = toSignal(
    inject(HttpClient)
      .get<GalleryImage[]>('assets/data/gallery.json')
      .pipe(
        map((photos) => photos.map((photo) => ({ ...photo, alt: `${photo.caption} en Laurel Spa Medellín` }))),
        catchError(() => of([] as GalleryImage[]))
      ),
    { initialValue: [] as GalleryImage[] }
  );

  ngOnInit(): void {
    this.seo.update({
      title: 'Galería de fotos: jacuzzi, sauna y cabinas de masaje | Laurel Spa Medellín',
      description:
        'Mira las instalaciones de Laurel Spa en Medellín: jacuzzi privado, sauna, cabinas de masaje y espacios decorados para parejas y grupos.',
      path: '/galeria',
    });
  }
}

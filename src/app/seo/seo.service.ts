import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://www.laurelspamedellin.com';
export const SITE_NAME = 'Laurel Spa Medellín';
const DEFAULT_IMAGE = '/assets/images/8.jpeg';

export interface SeoData {
  title: string;
  description: string;
  /** Ruta de la página, por ejemplo '/planes'. */
  path: string;
  /** Ruta de la imagen para la vista previa al compartir. */
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  update({ title, description, path, image = DEFAULT_IMAGE }: SeoData) {
    const url = SITE_URL + path;
    const imageUrl = image.startsWith('http')
      ? image
      : SITE_URL + (image.startsWith('/') ? image : '/' + image);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });

    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.setCanonical(url);
  }

  private setCanonical(url: string) {
    let link = this.document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}

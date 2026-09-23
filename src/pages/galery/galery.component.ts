import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WhatsappApiComponent } from '../../app/components/whatsapp-api/whatsapp-api.component';
import { SeoService } from '../../app/seo/seo.service';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [CommonModule, WhatsappApiComponent],
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css'],
})
export class GaleryComponent {
  public albums: Array<any> = [];
  public selected: number | null = null; // índice de la imagen abierta
  private seo: SeoService = inject(SeoService);

  constructor() {
    // Configuración de las imágenes de la galería
    for (let i = 1; i <= 18; i++) {
      const src = `assets/images/galery/${i}.jpeg`;
      const caption = `Instalaciones de Laurel Spa Medellín - foto ${i}`;
      const thumb = `assets/images/galery/${i}.jpeg`;
      const album = { src, caption, thumb };
      this.albums.push(album);
    }
  }

  ngOnInit(): void {
    this.seo.update({
      title: 'Galería de fotos: jacuzzi, sauna y cabinas de masaje | Laurel Spa Medellín',
      description:
        'Mira las instalaciones de Laurel Spa en Medellín: jacuzzi privado, sauna, cabinas de masaje y espacios decorados para parejas y grupos.',
      path: '/galeria',
    });
  }

  open(index: number): void {
    this.selected = index;
  }

  close(): void {
    this.selected = null;
  }

  next(): void {
    if (this.selected !== null) {
      this.selected = (this.selected + 1) % this.albums.length;
    }
  }

  prev(): void {
    if (this.selected !== null) {
      this.selected = (this.selected - 1 + this.albums.length) % this.albums.length;
    }
  }
}
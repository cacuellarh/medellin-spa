import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css'],
})
export class GaleryComponent {
  public albums: Array<any> = [];
  public selected: number | null = null; // índice de la imagen abierta

  constructor() {
    // Configuración de las imágenes de la galería
    for (let i = 1; i <= 18; i++) {
      const src = `assets/images/galery/${i}.jpeg`;
      const caption = `Imagen ${i}`;
      const thumb = `assets/images/galery/${i}.jpeg`;
      const album = { src, caption, thumb };
      this.albums.push(album);
    }
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
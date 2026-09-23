import { Component, inject } from '@angular/core';
import { ItemInfoComponent } from './item-info/item-info.component';
import { SeoService } from '../../app/seo/seo.service';

@Component({
  selector: 'app-politicas',
  imports: [ItemInfoComponent],
  templateUrl: './politicas.component.html',
  styleUrl: './politicas.component.css',
  standalone: true
})
export class PoliticasComponent {
  private seo: SeoService = inject(SeoService);

  ngOnInit() {
    this.seo.update({
      title: 'Políticas de reserva, cancelación y pagos | Laurel Spa Medellín',
      description:
        'Políticas de Laurel Spa Medellín: reservas, vigencia del bono spa (30 días), cancelación con 24 horas de anticipación, medios de pago (Bancolombia, Nequi, Daviplata y efectivo) y protocolos.',
      path: '/politicas_reserva',
    });
  }
}

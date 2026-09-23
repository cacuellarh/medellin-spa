import { Component, inject } from '@angular/core';
import { DataService } from './data.service';
import { SpaService } from './SpaService';
import { CommonModule } from '@angular/common';
import { whatsappMsgDefault } from '../planes/const';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../app/seo/seo.service';



@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true
})

export class MainComponent {
  public services : SpaService[] | null = null
  message : string = whatsappMsgDefault
  private seo : SeoService = inject(SeoService)
  constructor(private dataService : DataService) {}

  ngOnInit(){
    this.seo.update({
      title: 'Spa en Medellín para parejas | Jacuzzi, sauna y masajes – Laurel Spa',
      description:
        'Laurel Spa Medellín: planes de spa para parejas, individuales y grupales con jacuzzi privado, sauna y masajes relajantes. Abierto todos los días de 8:00 a. m. a 9:00 p. m. Reserva por WhatsApp.',
      path: '/',
    });

    this.dataService.getData().subscribe(data => {
      if (this.services == null){
        this.services = data
      }
    })
  }

}

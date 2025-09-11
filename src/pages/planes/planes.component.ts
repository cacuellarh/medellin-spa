import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WhatsappApiComponent } from '../../app/components/whatsapp-api/whatsapp-api.component';

@Component({
  selector: 'app-planes',
  imports: [CommonModule,FormsModule, RouterOutlet, WhatsappApiComponent],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent {

}

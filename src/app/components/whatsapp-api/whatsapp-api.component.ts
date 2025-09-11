import { Component } from '@angular/core';
import { whatsappMsgDefault } from '../../../pages/planes/const';

@Component({
  selector: 'app-whatsapp-api',
  imports: [],
  templateUrl: './whatsapp-api.component.html',
  styleUrl: './whatsapp-api.component.css'
})
export class WhatsappApiComponent {
  public msg : string = whatsappMsgDefault
}

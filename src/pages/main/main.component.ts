import { Component } from '@angular/core';
import { DataService } from './data.service';
import { SpaService } from './SpaService';
import { CommonModule } from '@angular/common';
import { whatsappMsgDefault } from '../planes/const';
import { RouterLink } from '@angular/router';
import { WhatsappApiComponent } from '../../app/components/whatsapp-api/whatsapp-api.component';



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
  constructor(private dataService : DataService) {}

  ngOnInit(){
    this.dataService.getData().subscribe(data => {
      if (this.services == null){
        this.services = data
      }
    })
  }

}

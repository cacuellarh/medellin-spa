import { Component } from '@angular/core';
import { ItemInfoComponent } from './item-info/item-info.component';

@Component({
  selector: 'app-politicas',
  imports: [ItemInfoComponent],
  templateUrl: './politicas.component.html',
  styleUrl: './politicas.component.css',
  standalone: true
})
export class PoliticasComponent {

}

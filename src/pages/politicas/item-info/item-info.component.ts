import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-info',
  imports: [],
  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.css'
})
export class ItemInfoComponent {
  @Input() tittle:string ="";
  @Input() info:string ="";
}

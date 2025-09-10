import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { whatsappMsgDefault } from '../pages/planes/const';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medellin-spa';
  message : string = whatsappMsgDefault

  menuToggle(){
    const main = document.getElementById("menu")
    const btn = document.getElementById("menu_btn")
    main?.classList.toggle("hidden")
    
  }

}

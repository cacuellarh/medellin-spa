import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { whatsappMsgDefault } from '../pages/planes/const';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'medellin-spa';
  message: string = whatsappMsgDefault;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  menuToggle() {
    if (isPlatformBrowser(this.platformId)) {
      const main = document.getElementById("menu");
      const btn = document.getElementById("menu_btn");
      main?.classList.toggle("hidden");
    }
  }

  ngAfterViewInit() {
    this.menuToggle();
  }
}
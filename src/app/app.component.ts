import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { whatsappMsgDefault } from '../pages/planes/const';
import { WhatsappApiComponent } from './components/whatsapp-api/whatsapp-api.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, WhatsappApiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medellin-spa';
  message: string = whatsappMsgDefault;
  showModal: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router ) {}

  menuToggle() {
    if (isPlatformBrowser(this.platformId)) {
      const main = document.getElementById("menu");
      const btn = document.getElementById("menu_btn");
      main?.classList.toggle("hidden");
    }
  }

  toMain() {
    this.router.navigate(['/']);
  }

  closeModal() {
    this.showModal = false;
  }

}
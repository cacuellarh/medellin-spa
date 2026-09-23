import { Component, DestroyRef, inject } from '@angular/core';
import { planSlug, PlanService } from '../../services/plan.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { whatsappMsgDefault } from '../../const';
import { PlanDto } from '../../dto/plan-dto';
import { CommonModule, DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { SeoService, SITE_URL } from '../../../../app/seo/seo.service';

const JSON_LD_ID = 'plan-json-ld';

@Component({
  selector: 'app-plan-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.css'
})
export class PlanDetailsComponent {

  private planService:PlanService = inject(PlanService);
  private router:Router = inject(Router);
  private route:ActivatedRoute = inject(ActivatedRoute);
  private seo:SeoService = inject(SeoService);
  private document:Document = inject(DOCUMENT);
  private destroyRef:DestroyRef = inject(DestroyRef);
  public msg : string = whatsappMsgDefault

  public planDetails : PlanDto | null = null
  ngOnInit(){
    this.route.paramMap
      .pipe(
        switchMap((params) => this.planService.getPlanBySlug(params.get('slug') ?? '')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((plan) => {
        if (!plan) {
          this.router.navigate(['/planes']);
          return;
        }
        this.planDetails = plan;
        this.updateSeo(plan);
      });

    this.destroyRef.onDestroy(() => this.document.getElementById(JSON_LD_ID)?.remove());
  }

  private updateSeo(plan: PlanDto) {
    const name = this.titleCase(plan.name);
    const price = plan.price.toLocaleString('es-CO');
    const path = '/planes/' + planSlug(plan.name);

    this.seo.update({
      title: `${name} – Spa en Medellín desde $${price} | Laurel Spa`,
      description: this.shorten(`${name} (${plan.duration.toLowerCase()}, ${plan.cuantity} ${plan.cuantity > 1 ? 'personas' : 'persona'}, $${price} COP). ${plan.description}`),
      path,
      image: plan.imgPath,
    });

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description: plan.description,
      image: SITE_URL + plan.imgPath,
      url: SITE_URL + path,
      serviceType: 'Spa',
      areaServed: 'Medellín',
      provider: { '@id': SITE_URL + '/#spa' },
      offers: {
        '@type': 'Offer',
        price: plan.price,
        priceCurrency: 'COP',
        availability: 'https://schema.org/InStock',
      },
    };

    let script = this.document.getElementById(JSON_LD_ID);
    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_ID;
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }

  private titleCase(text: string): string {
    return text.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
  }

  private shorten(text: string, max = 160): string {
    if (text.length <= max) return text;
    return text.slice(0, text.lastIndexOf(' ', max - 1)) + '…';
  }
}

import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import {
  Plan,
  PlanCatalogService,
  PlanDetailsComponent as CcPlanDetailsComponent,
  planSlug,
  SeoService,
  titleCase,
  truncateText,
} from '@c-code/c-code-fw/ui';
import { planWhatsappUrl } from '../../../../app/site.config';

const JSON_LD_ID = 'plan-json-ld';

@Component({
  selector: 'app-plan-details',
  imports: [CcPlanDetailsComponent],
  templateUrl: './plan-details.component.html',
})
export class PlanDetailsComponent {
  private catalog = inject(PlanCatalogService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  private destroyRef = inject(DestroyRef);

  /** WhatsApp con el nombre y el precio del plan en el mensaje. */
  public bookingUrl = planWhatsappUrl;
  public planDetails: Plan | null = null;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => this.catalog.getPlanBySlug(params.get('slug') ?? '')),
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

    this.destroyRef.onDestroy(() => this.seo.removeJsonLd(JSON_LD_ID));
  }

  private updateSeo(plan: Plan) {
    const name = titleCase(plan.name);
    const price = plan.price.toLocaleString('es-CO');
    const path = '/planes/' + planSlug(plan);

    this.seo.update({
      title: `${name} – Spa en Medellín desde $${price} | Laurel Spa`,
      description: truncateText(`${name} (${plan.duration.toLowerCase()}, ${plan.cuantity} ${plan.cuantity > 1 ? 'personas' : 'persona'}, $${price} COP). ${plan.description}`),
      path,
      image: plan.imgPath,
    });

    this.seo.setJsonLd(JSON_LD_ID, {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description: plan.description,
      image: this.seo.absoluteUrl(plan.imgPath),
      url: this.seo.absoluteUrl(path),
      serviceType: 'Spa',
      areaServed: 'Medellín',
      provider: { '@id': this.seo.absoluteUrl('/#spa') },
      offers: {
        '@type': 'Offer',
        price: plan.price,
        priceCurrency: 'COP',
        availability: 'https://schema.org/InStock',
      },
    });
  }
}

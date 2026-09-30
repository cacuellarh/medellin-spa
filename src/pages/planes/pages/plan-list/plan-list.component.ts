import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { PlanCatalogComponent, PlanCatalogService, PlanCategory, SeoService } from '@c-code/c-code-fw/ui';
import { WHATSAPP_URL } from '../../../../app/site.config';
import { CATEGORY_SLUGS, categoryFromSlug } from '../../category-slugs';

@Component({
  selector: 'app-plan-list',
  imports: [PlanCatalogComponent],
  templateUrl: './plan-list.component.html',
})
export class PlanListComponent {
  private catalog = inject(PlanCatalogService);
  private seo = inject(SeoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly whatsappUrl = WHATSAPP_URL;
  /** `null` mientras cargan los planes, para que el catálogo muestre tarjetas de carga. */
  readonly plans = toSignal(this.catalog.getPlans(), { initialValue: null });
  readonly services = toSignal(this.catalog.getAdditionalServices(), { initialValue: [] });
  readonly priceRanges = toSignal(this.catalog.getPriceRanges(), { initialValue: [] });

  /** La categoría vive en la URL (?categoria=pareja); sin ella se muestran los planes de pareja. */
  private readonly slug = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('categoria'))));
  readonly category = computed(() => categoryFromSlug(this.slug()) ?? PlanCategory.Couple);

  ngOnInit() {
    this.seo.update({
      title: 'Planes de spa en Medellín: parejas, individuales y grupales | Laurel Spa',
      description:
        'Conoce los planes de Laurel Spa Medellín: experiencias para parejas, individuales y grupales con jacuzzi privado, sauna, masajes y rituales. Precios y reservas por WhatsApp.',
      path: '/planes',
    });
  }

  onCategoryChange(category: PlanCategory | number | null) {
    if (category === null) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoria: CATEGORY_SLUGS[category] },
      replaceUrl: true,
    });
  }
}

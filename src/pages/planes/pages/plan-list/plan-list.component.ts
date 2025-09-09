import { Component, DestroyRef, effect, inject } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { PlanDto } from '../../dto/plan-dto';
import { CategoryType } from '../../types/category-type';
import {
  ElementActiveDirective,
  ElementActiveService,
  ElementStatusType,
  ElementToggleService,
} from '@c-code/c-code-fw';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilterPlansRequest } from '../../types/filterPlans-request';
import { PlanCardComponent } from '../../components/plan-card/plan-card.component';
import { FilterPlanFormComponent } from '../../components/filter-plan-form/filter-plan-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-plan-list',
  imports: [
    PlanCardComponent,
    FilterPlanFormComponent,
    FormsModule,
    ElementActiveDirective,
    CommonModule,
  ],
  templateUrl: './plan-list.component.html',
  styleUrl: './plan-list.component.css',
  providers: [ElementActiveService, ElementToggleService],
})
export class PlanListComponent {
  private planService: PlanService = inject(PlanService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private elementToggle: ElementToggleService = inject(ElementToggleService);
  public plans: PlanDto[] = [];
  public categorySelected: CategoryType = CategoryType.Individual;
  public CategoryType = CategoryType;
  public filterByPlanName: string = '';
  public ElementStatustype = ElementStatusType;
  public filterStatus: ElementStatusType = ElementStatusType.HIDDEN;

  constructor() {
    effect(
      () => (this.filterStatus = this.elementToggle.elementStatusToggle())
    );
  }
  ngOnInit() {
    this.getPlans(this.categorySelected);
  }

  selectCategory(category: CategoryType) {
    this.categorySelected = category;
    this.getPlans(this.categorySelected);
  }

  getPlans(category: CategoryType) {
    this.planService
      .getPlansByCategory(category)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((plans: PlanDto[]) => {
        this.plans = plans;
        console.log(plans);
      });
  }

  filterPlans(filter: FilterPlansRequest) {
    this.planService
      .getPlansByFilter(filter)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((plans) => {
        this.plans = plans;
      });
  }

  onFilterByPlanName() {
    this.planService
      .getPlansByName(this.filterByPlanName)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((plans) => {
        this.plans = plans;
      });
  }
  openFilterForm() {
    this.elementToggle.toggleByElementStatusType(ElementStatusType.SHOW);
  }
}

import { Component, DestroyRef, inject, Output } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { AdditionalService } from '../../services/additional.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PriceRangeDto } from '../../dto/priceRange-dto';
import { AdditionalServiceDto } from '../../dto/AdditionalService-dto';
import { EventEmitter } from '@angular/core';
import { FilterPlansRequest } from '../../types/filterPlans-request';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-plan-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-plan-form.component.html',
  styleUrl: './filter-plan-form.component.css'
})
export class FilterPlanFormComponent {
  private planService: PlanService = inject(PlanService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private additionalService: AdditionalService = inject(AdditionalService);
  private builder: FormBuilder = inject(FormBuilder);
  public priceRanges: PriceRangeDto[] = [];
  public additionalServices: AdditionalServiceDto[] = [];
  public filterPlanForm!: FormGroup;
  @Output() onSubmitForm = new EventEmitter<FilterPlansRequest>();

  ngOnInit() {
    this.buildForm();
    this.getPriceRanges();
    this.getAdditionalServices();
  }
  getPriceRanges() {
    this.planService
      .getPriceRanges()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ranges) => {
        this.priceRanges = ranges;
      });
  }

  getAdditionalServices() {
    this.additionalService
      .getAdditionalsServices()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((services) => {
        this.additionalServices = services;
      });
  }

  onSumbit() {
    const values = this.filterPlanForm.value;

    const request: FilterPlansRequest = {
      priceRange: values.range,
      service: values.service,
    };
    this.onSubmitForm.emit(request);
  }

  buildForm() {
    this.filterPlanForm = this.builder.group({
      service: [],
      range: [],
    });
  }
}

import { Component, inject, Input } from '@angular/core';
import { PlanDto } from '../../dto/plan-dto';
import { PlanService } from '../../services/plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-card',
  imports: [],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.css'
})
export class PlanCardComponent {
  @Input() imgPath: string = '';
  @Input() name: string = '';
  @Input() plan!: PlanDto;
  private planService: PlanService = inject(PlanService);
  private router : Router = inject(Router);

  openDetails() {
    if (this.plan === null) {
      console.log('no hay plan cargado en la carta de planes.');
    } else {
      this.planService.setPlanDetails(this.plan);
      this.router.navigate(['planes/detalles'])
    }
  }
}

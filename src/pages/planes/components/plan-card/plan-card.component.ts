import { Component, Input } from '@angular/core';
import { PlanDto } from '../../dto/plan-dto';
import { planSlug } from '../../services/plan.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plan-card',
  imports: [RouterLink],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.css'
})
export class PlanCardComponent {
  @Input() imgPath: string = '';
  @Input() name: string = '';
  @Input() plan!: PlanDto;

  get detailsLink(): string {
    return '/planes/' + planSlug(this.name);
  }
}

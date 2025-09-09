import { Component, inject } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { whatsappMsgDefault } from '../../const';
import { PlanDto } from '../../dto/plan-dto';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-plan-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.css'
})
export class PlanDetailsComponent {

  private planService:PlanService = inject(PlanService);
  private router:Router = inject(Router);
  public msg : string = whatsappMsgDefault
  
  public planDetails! : PlanDto | null
  ngOnInit(){
    if(this.planService.planDetails() != null){
      this.planDetails = this.planService.planDetails();
    }else{
      this.router.navigate(['/']);
    }
  }
}
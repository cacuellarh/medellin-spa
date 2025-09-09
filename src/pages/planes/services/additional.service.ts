import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AdditionalServiceDto } from '../dto/AdditionalService-dto';

@Injectable({
  providedIn: 'root'
})
export class AdditionalService {
  private httpService : HttpClient = inject(HttpClient);
  
  getAdditionalsServices(){
    return this.httpService.get<AdditionalServiceDto[]>("assets/data/additionals.json")
  }
}

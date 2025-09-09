import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpaService } from './SpaService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'assets/data/services.json';
  constructor(private http : HttpClient) { }

  getData() : Observable<SpaService[]>{
    return this.http.get<SpaService[]>(this.jsonUrl)
  }
}

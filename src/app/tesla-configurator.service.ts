import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITeslaModel, ITeslaModelOption } from './app/app.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeslaConfiguratorService {

  constructor(private _httpClient: HttpClient) {
   }

   public getModels() : Observable<ITeslaModel[]>{
    return this._httpClient.get<ITeslaModel[]>('/models');
   }

   public getOptions(id: string) : Observable<ITeslaModelOption>{
    return this._httpClient.get<ITeslaModelOption>('/options/' + id);
   }
}

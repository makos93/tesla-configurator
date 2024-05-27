import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITeslaColor, ITeslaConfig, ITeslaInfo, ITeslaModel, ITeslaModelOption } from './app.model';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeslaConfiguratorService {

  private _teslaImageUrl = '';

  constructor(private _httpClient: HttpClient) {
   }

   get teslaImageUrl(){
    return this._teslaImageUrl;
   } 

   public getModels() : Observable<ITeslaModel[]>{
    return this._httpClient.get<ITeslaModel[]>('/models');
   }

   public getOptions(id: string) : Observable<ITeslaModelOption>{
    return this._httpClient.get<ITeslaModelOption>('/options/' + id);
   }

   public getSummaryInfo(): Observable<ITeslaInfo>{
    const configId = localStorage.getItem('configId');
    const modelCode = localStorage.getItem('model');
    const colorCode = localStorage.getItem('color');

    return forkJoin([
      this.getModels(),
      this.getOptions(modelCode as string)
      ]).pipe(
        map(([models, option]) =>{
             const model = models.find((model) => model.code === modelCode) as ITeslaModel;
             const color = model.colors.find((color) => color.code === colorCode) as ITeslaColor;
             const config = option.configs.find((config) => config.id.toString()  === configId) as ITeslaConfig;

             let teslaInfo : ITeslaInfo ={
               modelName: model.description,
               range: config.range,
               speed: config.speed,
               config: config.description,
               configPrice: config.price,
               towhitch: option.towHitch,
               yoke: option.yoke,
               color: color.description,
               colorPrice: color.price
             }

             return teslaInfo;   
        }));
   }

   public setTeslaImageUrl(model: string, color: string){
    this._teslaImageUrl = `https://interstate21.com/tesla-app/images/${model}/${color}.jpg`;
   }
}

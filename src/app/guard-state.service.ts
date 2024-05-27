import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardStateService {

  private _canActivateStepTwo : boolean = false;
  private _canActivateStepThree : boolean = false;

  constructor() { }

  get canActivateStepTwo(){
    return this._canActivateStepTwo;
  }

  get canActivateStepThree(){
    return this._canActivateStepThree;
  }

  public setStepTwoCanActivate(state: boolean){
    this._canActivateStepTwo = state;
  }

  public setStepThreeCanActivate(state: boolean){
    this._canActivateStepThree = state;
  }
}

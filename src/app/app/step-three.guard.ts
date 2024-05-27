import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { GuardStateService } from "../guard-state.service";

export const StepThreeGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree=> {
        const guardStateService = inject(GuardStateService);
        const canActivate = checkCondition();
        guardStateService.setStepThreeCanActivate(canActivate);
        
        return canActivate;

        function checkCondition(){
            if(localStorage.getItem('configId') != null && localStorage.getItem('configId') !== '0') {
                return true;
            }
            return false;
        }
  };
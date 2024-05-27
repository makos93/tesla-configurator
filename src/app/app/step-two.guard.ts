import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Observable } from "rxjs"
import { GuardStateService } from "../guard-state.service";

export const StepTwoGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree=> {
      const guardStateService = inject(GuardStateService);
        const canActivate = checkCondition();
        guardStateService.setStepTwoCanActivate(canActivate);
        
        return canActivate;
  
        function checkCondition() {
          if (
            localStorage.getItem('model') != null &&
            localStorage.getItem('color') != null
          ) {
            return true;
          }
          return false;
        }
  };

  


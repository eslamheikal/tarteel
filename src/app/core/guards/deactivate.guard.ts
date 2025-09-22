import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmService } from '../../features/shared/services/confirm.service';

export interface CanComponentDeactivate {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  
  constructor(private router: Router, private confirmService: ConfirmService) {}
  
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // If the component doesn't implement the interface, show Bootstrap modal
    if (component.canDeactivate() === false) {
      return this.confirmService.confirm({
        message: 'هل أنت متأكد من أنك تريد المغادرة؟ سيتم فقدان أي تغييرات غير محفوظة.',
        title: 'مغادرة',
      });
    }

    return component.canDeactivate();
  }

}

import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized - token expired or invalid
      if (error.status === 401) {
        // Clear stored auth data
        authService.removeToken();
        authService.removeUser();
        
        // Redirect to login page
        router.navigate(['/auth/login']);
      }
      
      // Handle 403 Forbidden - insufficient permissions
      if (error.status === 403) {
        console.error('Access denied: Insufficient permissions');
      }
      
      // Re-throw the error so components can handle it
      return throwError(() => error);
    })
  );
};

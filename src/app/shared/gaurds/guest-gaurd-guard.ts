import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const guestGaurdGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const accessToken = authService.accessToken();

  if(!accessToken){
    return true;
  } else {
    router.navigate(['/todos'])
    return false;
  }
};

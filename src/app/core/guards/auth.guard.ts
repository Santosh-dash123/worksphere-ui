import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStorageService } from '../services/Auth/auth-storage.service';

export const SuperAdminGuard: CanActivateFn = () => {
  const authstorageservice = inject(AuthStorageService);
  const router = inject(Router);

  if (authstorageservice.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/superadminlogin']);
};

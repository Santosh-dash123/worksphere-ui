import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderserviceService } from '../services/loaderservice.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderservice = inject(LoaderserviceService);

  loaderservice.show();

  return next(req).pipe(finalize(() => loaderservice.hide()));
};

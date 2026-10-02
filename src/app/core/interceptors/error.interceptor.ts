import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorTrackingService } from '../services/error.tracking.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorTrackingService = inject(ErrorTrackingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorTrackingService.log({
        message:
          error.message || error.error?.message || 'Unknown error occurred',
        statusCode: error.status,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
      });

      return throwError(() => error);
    }),
  );
};

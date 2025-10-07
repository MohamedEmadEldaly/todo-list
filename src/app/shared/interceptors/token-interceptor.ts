import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { catchError, single, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken();
  const isRefreshing = signal<boolean | null | undefined>(false);
  // Attach access token to every request
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If token expired
      if (error.status === 401 && !isRefreshing()) {
        isRefreshing.set(true);
        return authService.refreshTokens().pipe(
          switchMap(() => {
            isRefreshing.set(false);
            const newToken = authService.accessToken();
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });

            return next(retryReq);
          }),
          catchError((err) => {
            isRefreshing.set(false);
            authService.clearTokens();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};

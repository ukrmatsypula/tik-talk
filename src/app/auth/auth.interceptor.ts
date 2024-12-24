import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing = false;

export const authTokenInterceptop: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) {
    return next(req);
  }

  if (isRefreshing) {
    return refreshAndProcced(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return refreshAndProcced(authService, req, next);
      }

      return throwError(error);
    })
  );
};

const refreshAndProcced = (
  AuthService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (!isRefreshing) {
    isRefreshing = true;

    return AuthService.refreshAuthToken().pipe(
      switchMap((res) => {
        isRefreshing = false;
        return next(addToken(req, res.access_token));
      })
    );
  }

  return next(addToken(req, AuthService.token!));
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};

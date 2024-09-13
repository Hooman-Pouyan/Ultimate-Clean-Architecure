import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CoreMessageService } from '../../common';
import { AuthTokenService } from '../services/auth-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private coreMessageService = inject(CoreMessageService);
  private authTokenService = inject(AuthTokenService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authTokenService.getToken().access_token;
    const authRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });

    return next.handle(authRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.coreMessageService.showError(error.message);
          } else if (error.status === 401 && error.statusText === 'Unauthorized') {
            this.authTokenService.setUserUnauthorized();
          }

          return next.handle(authRequest);
        })
      );
  }
}

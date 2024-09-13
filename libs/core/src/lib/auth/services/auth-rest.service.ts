import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RestApiService } from '../../crud';
import { authDefaultConfig } from '../auth-default.config';
import {
  AuthSignIn,
  AuthSignInResponse,
  AuthSignUp,
  AuthSignUpResponse
} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {
  private httpClient = inject(HttpClient);
  private restApiService = inject(RestApiService);
  readonly endpoint = authDefaultConfig.rest.endpoint;

  buildUrl(paths: string[] = []) {
    return this.restApiService.buildUrl([this.endpoint, ...paths]);
  }

  signIn(data: AuthSignIn) {
    return this.httpClient
      .post(this.buildUrl(['signin']), data)
      .pipe(map(v => ({ token: v }) as AuthSignInResponse));
  }

  signUp(data: AuthSignUp) {
    return this.httpClient.post(this.buildUrl(['signup']), data)
      .pipe(map(v => ({ token: v }) as AuthSignUpResponse));
  }

  signOut() {
    return this.httpClient.post(this.buildUrl(['logout']), {});
  }

  refresh() {
    return this.httpClient.post(this.buildUrl(['logout']), {});
  }
}
